import { Observable } from "rxjs";
import { Email } from "../../common/value-objects/email";
import { Password } from "../../common/value-objects/password";

export interface Registrating {
  registrgy(email: Email, password: Password): Observable<boolean>
}
