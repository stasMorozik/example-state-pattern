import { Event } from "../common/event";
import { Email } from "../common/value-objects/email";
import { Password } from "../common/value-objects/password";
import { Emiter } from "./interfaces/emiter";
import { Registrating } from "./interfaces/registrating";

export class RegistratingState {
  constructor(
    private readonly _emiter: Emiter,
    private readonly _registrating: Registrating
  ) {
    
  }

  on(email: string, password: string) {
    const maybeEmail = Email.new(email)
    const maybePassword = Password.new(password)

    if (maybeEmail.isLeft()) {
      this._emiter.emit(maybeEmail.value)
    }

    if (maybePassword.isLeft()) {
      this._emiter.emit(maybePassword.value)
    }

    if (maybeEmail.isRight() && maybePassword.isRight()) {
      this._registrating.registrgy(maybeEmail.value, maybePassword.value).subscribe(
        res => {
          this._emiter.emit(new Event('SIGN_UP'))
        },
        error => {
          this._emiter.emit(new Error('Failed registration'))
        }
      )
    }
  }
}
