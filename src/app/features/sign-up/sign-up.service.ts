import { ConfrimingEmail } from './interfaces/confriming-email';
import { Emiter } from './interfaces/emiter';
import { ValidatingCode } from './interfaces/validating-code';
import { ConfirmingEmailState } from './confirming-email-state';
import { CheckingCodeState } from './checking-code-state';
import { Error } from '../common/error';
import { Registrating } from './interfaces/registrating';
import { RegistratingState } from './registrating-state';

export class SignUpService {
  constructor(
    readonly _emiter: Emiter,
    readonly _confirmingEmail: ConfrimingEmail,
    readonly _validatingCode: ValidatingCode,
    readonly _registrating: Registrating,
    public state: 
      ConfirmingEmailState 
      | CheckingCodeState
      | RegistratingState
  ) {
    this.state = new ConfirmingEmailState(
      this
    )
  }

  confirmEmail(email: string) {
    if (this.state instanceof ConfirmingEmailState){
      this.state.on(email)
    } else {
      this._emiter.emit(new Error('You cannot confirm email at current state'))
    }
  }

  checkCode(code: string | number) {
    if (this.state instanceof CheckingCodeState) {
      this.state.on(code)
    } else {
      this._emiter.emit(new Error('You cannot check your security code at current state'))
    }
  }

  registry(email: string, password: string) {
    if (this.state instanceof RegistratingState) {
      this.state.on(email, password)
    } else {
      this._emiter.emit(new Error('You cannot registry at current state'))
    }
  }
}
