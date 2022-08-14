import { Either, left, right } from "@sweet-monads/either";
import { Error } from '../error';

export class Password {
  protected constructor(
    readonly value: string
  ){}

  static new(value: string): Either<Error, Password> {
    if(typeof value != 'string') {
      return left(new Error("Invalid password"))
    }

    if (value.length > 10) {
      return left(new Error("Password is too long"))
    }

    if (value.length < 5) {
      return left(new Error("Password is too short"))
    }
    
    return right(new Password(value))
  }
}