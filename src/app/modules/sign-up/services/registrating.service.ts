import { Injectable } from '@angular/core';
import { Either, left, right } from '@sweet-monads/either';
import { Observable, of } from 'rxjs';
import { Error } from '../../../features/common/error';
import { Email } from '../../../features/common/value-objects/email';
import { Password } from '../../../features/common/value-objects/password';
import { Registrating } from '../../../features/sign-up/interfaces/registrating';

@Injectable({
  providedIn: 'root'
})
export class RegistratingService implements Registrating {
  constructor() { }
  
  registrgy(email: Email, password: Password): Observable<Either<Error, boolean>> {
    const maybeJsonUsers = window.localStorage.getItem('users')

    if (maybeJsonUsers) {
      try {
        const maybeUsers = JSON.parse(maybeJsonUsers)

        if (Array.isArray(maybeUsers)) {
          if (!maybeUsers.find(el => el.email == email.value)) { 
            window.localStorage.setItem(
              'users', 
              JSON.stringify([
                ...maybeUsers,
                {email: email.value, password: password.value}
              ])
            )
            return of(right(true))
          }
          return of(left(new Error('User already exists')))
        }
      } catch (e) {
        return of(left(new Error('Failed registration')))
      }
    }

    return of(left(new Error('Failed registration')))
  }
}
