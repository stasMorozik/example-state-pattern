import { Injectable } from '@angular/core';
import { Either } from '@sweet-monads/either';
import { Observable } from 'rxjs';
import { Error } from '../features/common/error';
import { Email } from '../features/common/value-objects/email';
import { ConfirmingEmail } from '../features/sign-up/interfaces/confirming-email';

@Injectable({
  providedIn: 'root'
})
export class ConfirmingEmailService implements ConfirmingEmail {
  constructor() { }

  confirm(email: Email): Observable<Either<Error, true>> {
    
  }
}
