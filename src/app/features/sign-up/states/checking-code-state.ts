import { Code } from '../../common/value-objects/code';
import { RegistratingState } from './registrating-state';
import { SignUpService } from "./../sign-up.service";
import { CheckedSecurityCodeEvent } from '../events/checked-security-code-event';

export class CheckingCodeState {
  constructor(
    private service: SignUpService
  ){}

  on(code: string | number) {
    const maybeCode = Code.new(code)

    if (maybeCode.isLeft()) {
      this.service._emiter.emit(maybeCode.value)
    }

    if (maybeCode.isRight()) {
      this.service._validatingCode.validate(maybeCode.value).subscribe(
        maybeTrue => {
          if (maybeTrue.isLeft()) {
            this.service._emiter.emit(maybeTrue.value)
          }

          if (maybeTrue.isRight()) {
            this.service.state = new RegistratingState(
              this.service
            )
            this.service._emiter.emit(new CheckedSecurityCodeEvent())
          }
        }
      )
    }
  }
}
