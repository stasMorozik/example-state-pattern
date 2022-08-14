import { Observable } from "rxjs";
import { Code } from "../../common/value-objects/code";

export interface ValidatingCode {
  validate(code: Code): Observable<boolean>
}
