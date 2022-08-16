import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Error } from 'src/app/features/common/error';
import { CheckedSecurityCodeEvent } from 'src/app/features/sign-up/events/checked-security-code-event';
import { ConfrimedEmailEvent } from 'src/app/features/sign-up/events/confrimed-email-event';
import { RegistredUserEvent } from 'src/app/features/sign-up/events/registred-user-event';
import { Emiter } from 'src/app/features/sign-up/interfaces/emiter';

@Injectable({
  providedIn: 'root'
})
export class EmiterService implements Emiter {
  constructor(
    private readonly _subject: Subject<Error | ConfrimedEmailEvent | CheckedSecurityCodeEvent | RegistredUserEvent>
  ) {}

  emit(e: Error | ConfrimedEmailEvent | CheckedSecurityCodeEvent | RegistredUserEvent): void {
    this._subject.next(e)  
  }
}
