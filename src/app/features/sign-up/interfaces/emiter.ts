import { Error } from '../../common/error';
import { CheckedSecurityCodeEvent } from '../events/checked-security-code-event';
import { ConfrimedEmailEvent } from '../events/confrimed-email-event';
import { RegistredUserEvent } from '../events/registred-user-event';

export interface Emiter {
  emit(e: Error | ConfrimedEmailEvent | CheckedSecurityCodeEvent | RegistredUserEvent): void
}
