import { Error } from '../../common/error';
import { Event } from '../../common/event';

export interface Emiter {
  emit(e: Error | Event): void
}
