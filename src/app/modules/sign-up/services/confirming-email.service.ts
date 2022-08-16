import { Injectable } from '@angular/core';
import { Either, left, right } from '@sweet-monads/either';
import { Observable, of } from 'rxjs';
import { Error } from '../../../features/common/error';
import { Email } from '../../../features/common/value-objects/email';
import { ConfirmingEmail } from '../../../features/sign-up/interfaces/confirming-email';

@Injectable({
  providedIn: 'root'
})
export class ConfirmingEmailService implements ConfirmingEmail {
  constructor() {}

  confirm(email: Email): Observable<Either<Error, boolean>> {
    const maybeJsonCodes = window.localStorage.getItem('security_code_sign_up')
    const maybeJsonUsers = window.localStorage.getItem('users')

    if (maybeJsonCodes && maybeJsonUsers) {
      try {
        const maybeSecurityCodes = JSON.parse(maybeJsonCodes)
        const maybeUsers = JSON.parse(maybeJsonUsers)
        
        if (Array.isArray(maybeSecurityCodes) && Array.isArray(maybeUsers)) {
          if (!maybeUsers.find(el => el.email == email.value)) { 
            window.localStorage.setItem(
              'security_code_sign_up', 
              JSON.stringify([
                ...maybeSecurityCodes.filter(el => el.email != email.value), 
                {email: email.value, code: this.getRandomInt(1000, 9999)}
              ])
            )
            return of(right(true))
          }

          return of(left(new Error('User already exists')))
        }

        return of(left(new Error('Failed confirm email address')))
        
      } catch (e) {
        return of(left(new Error('Failed confirm email address')))
      }
    }

    return of(left(new Error('Failed confirm email address')))
  }

  private getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min
  }
}
