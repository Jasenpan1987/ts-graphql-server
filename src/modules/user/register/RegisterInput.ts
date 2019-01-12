import { Length, IsEmail } from "class-validator";
import { InputType, Field } from "type-graphql";
import { IsEmailAlreadyExist } from "./IsEmailAlreadyExist";

@InputType()
export class RegisterInput {
  @Field()
  @Length(1, 20)
  firstName: string;

  @Field()
  @Length(1, 20)
  lastName: string;

  @Field()
  @Length(3, 255)
  @IsEmail()
  @IsEmailAlreadyExist({ message: "Email already in use" })
  email: string;

  @Field()
  password: string;
}
