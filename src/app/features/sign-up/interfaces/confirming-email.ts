import { Observable } from "rxjs";
import { Either } from '@sweet-monads/either';
import { Email } from "../../common/value-objects/email";
import { Error } from '../../common/error';

export interface ConfirmingEmail {
  confirm(email: Email): Observable<Either<Error, true>> 
}
