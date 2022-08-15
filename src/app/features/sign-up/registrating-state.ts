import { Event } from "../common/event";
import { Email } from "../common/value-objects/email";
import { Password } from "../common/value-objects/password";
import { Emiter } from "./interfaces/emiter";
import { Registrating } from "./interfaces/registrating";
import { SignUpService } from "./sign-up.service";

export class RegistratingState {
  constructor(
    private service: SignUpService
  ) {}

  on(email: string, password: string) {
    const maybeEmail = Email.new(email)
    const maybePassword = Password.new(password)

    if (maybeEmail.isLeft()) {
      this.service._emiter.emit(maybeEmail.value)
    }

    if (maybePassword.isLeft()) {
      this.service._emiter.emit(maybePassword.value)
    }

    if (maybeEmail.isRight() && maybePassword.isRight()) {
      this.service._registrating.registrgy(maybeEmail.value, maybePassword.value).subscribe(
        res => {
          this.service._emiter.emit(new Event('SIGN_UP'))
        },
        error => {
          this.service._emiter.emit(new Error('Failed registration'))
        }
      )
    }
  }
}
