import { Observable } from "rxjs";
import { Email } from "../../common/value-objects/email";

export interface ConfrimingEmail {
  confirm(email: Email): Observable<boolean> 
}
