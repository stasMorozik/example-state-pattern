import { Event } from '../common/event';
import { Code } from '../common/value-objects/code';
import { Emiter } from './interfaces/emiter';
import { Registrating } from './interfaces/registrating';
import { ValidatingCode } from "./interfaces/validating-code";
import { RegistratingState } from './registrating-state';
import { SignUpService } from "./sign-up.service";

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
        res => {
          this.service.state = new RegistratingState(
            this.service
          )
          this.service._emiter.emit(new Event('NEXT_STATE_REGISTRATION'))
        },
        error => {
          this.service._emiter.emit(new Error('Failed ckeck security code'))
        }
      )
    }
  }
}
