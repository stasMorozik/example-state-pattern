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
    private readonly _emiter: Emiter,
    private readonly _confirmingEmail: ConfrimingEmail,
    private readonly _validatingCode: ValidatingCode,
    private readonly _registrating: Registrating,
    public state: 
      ConfirmingEmailState 
      | CheckingCodeState
      | RegistratingState
  ) {
    this.state = new ConfirmingEmailState(
      this,
      this._emiter,
      this._confirmingEmail,
      this._validatingCode,
      this._registrating
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
