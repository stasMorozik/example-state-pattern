import { Either, left, right } from "@sweet-monads/either";
import { Error } from '../error';

export class Email {
  protected constructor(
    readonly value: string
  ) {}

  static new(value: string): Either<Error, Email> {
    if(typeof value != 'string') {
      return left(new Error("Invalid email address"))
    }

    if (!value.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
      return left(new Error("Invalid email address"))
    }
    
    return right(new Email(value))
  }
}
