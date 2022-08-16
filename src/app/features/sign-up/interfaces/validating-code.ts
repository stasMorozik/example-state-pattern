import { Observable } from "rxjs";
import { Either } from '@sweet-monads/either';
import { Code } from "../../common/value-objects/code";
import { Error } from '../../common/error';

export interface ValidatingCode {
  validate(code: Code): Observable<Either<Error, boolean>> 
}
