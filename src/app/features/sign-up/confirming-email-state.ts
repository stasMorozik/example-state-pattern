import { Email } from "../common/value-objects/email";
import { Event } from "../common/event";
import { Error } from "../common/error";
import { CheckingCodeState } from "./checking-code-state";
import { ConfrimingEmail } from "./interfaces/confriming-email";
import { Emiter } from './interfaces/emiter';
import { ValidatingCode } from "./interfaces/validating-code";
import { SignUpService } from "./sign-up.service";
import { Registrating } from "./interfaces/registrating";

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
        res => {
          this.service.state = new CheckingCodeState(
            this.service,
          )
          this.service._emiter.emit(new Event('NEXT_STATE_CHECKING_CODE'))
        },
        error => {
          this.service._emiter.emit(new Error('Failed confirm your email address'))
        }
      )
    }
  }
}
