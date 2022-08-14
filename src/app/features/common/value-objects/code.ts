import { Either, left, right } from "@sweet-monads/either";
import { Error } from '../error';

export class Code {
  protected constructor(
    readonly value: number
  ) {}

  static new(code: number | string): Either<Error, Code> {
    if (typeof code != 'number') {
      code = parseInt(code)
      if (!code) {
        return left(new Error('Code is invalid'))
      } 
      if (code > 9999 || code < 1000) {
        return left(new Error('Code is invalid'))
      }
      return right(new Code(code))
    } 
    if (code > 9999 || code < 1000) {
      return left(new Error('Code is invalid'))
    }
    return right(new Code(code))
  }
}
