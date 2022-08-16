import { Injectable } from '@angular/core';
import { Either, left, right } from '@sweet-monads/either';
import { Observable, of } from 'rxjs';
import { Error } from '../../../features/common/error';
import { Code } from '../../../features/common/value-objects/code';
import { ValidatingCode } from '../../../features/sign-up/interfaces/validating-code';

@Injectable({
  providedIn: 'root'
})
export class ValidatingCodeService implements ValidatingCode {
  constructor() { }

  validate(code: Code): Observable<Either<Error, boolean>> {
    const maybeJsonCodes = window.localStorage.getItem('security_code_sign_up')

    if (maybeJsonCodes) {
      try {
        const maybeSecurityCodes = JSON.parse(maybeJsonCodes)

        if (Array.isArray(maybeSecurityCodes)) {
          if (maybeSecurityCodes.find(el => el.code == code.value)) {
            return of(right(true))
          }

          return of(left(new Error('Invalid code')))
        }
      } catch(e) {
        return of(left(new Error('Failed check security code')))
      }
    }

    return of(left(new Error('Failed check security code')))
  }
}
