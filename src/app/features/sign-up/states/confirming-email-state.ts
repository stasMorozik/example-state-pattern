import { Email } from "../../common/value-objects/email";
import { Error } from "../../common/error";
import { CheckingCodeState } from "./checking-code-state";
import { SignUpService } from "./../sign-up.service";
import { ConfrimedEmailEvent } from "../events/confrimed-email-event";

export class ConfirmingEmailState {
  constructor(
    private service: SignUpService
  ){}

  on(email: string) {
    const maybeEmail = Email.new(email)

    if (maybeEmail.isLeft()) {
      this.service._emiter.emit(new Error('Invalid email'))
    }

    if (maybeEmail.isRight()) {
      this.service._confirmingEmail.confirm(maybeEmail.value).subscribe(
        maybeTrue => {
          if (maybeTrue.isLeft()) {
            this.service._emiter.emit(maybeTrue.value)
          }

          if (maybeTrue.isRight()) {
            this.service.state = new CheckingCodeState(
              this.service,
            )
            this.service._emiter.emit(new ConfrimedEmailEvent())
          }
        }
      )
    }
  }
}
