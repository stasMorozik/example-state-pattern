import { Observable } from "rxjs";
import { Email } from "../../common/value-objects/email";
import { Password } from "../../common/value-objects/password";
import { Error } from '../../common/error';
import { Either } from '@sweet-monads/either';

export interface Registrating {
  registrgy(email: Email, password: Password): Observable<Either<Error, boolean>>
}
