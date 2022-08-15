import { Email } from "../../common/value-objects/email";
import { Password } from "../../common/value-objects/password";
import { RegistredUserEvent } from "../events/registred-user-event";
import { SignUpService } from "./../sign-up.service";
import { ConfirmingEmailState } from "./confirming-email-state";

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
        maybeTrue => {
          if (maybeTrue.isLeft()) {
            this.service._emiter.emit(maybeTrue.value)
          }

          if (maybeTrue.isRight()) {
            this.service.state = new ConfirmingEmailState(
              this.service
            )
            this.service._emiter.emit(new RegistredUserEvent())
          }
        }
      )
    }
  }
}
