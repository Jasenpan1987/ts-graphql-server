import { ClassType, Field, InputType } from "type-graphql";

export const OkMixin = <T extends ClassType>(BaseClass: T) => {
  @InputType()
  class OkInput extends BaseClass {
    @Field()
    ok: boolean;
  }
  return OkInput;
};

// what does this do?
// this is a template to achieve multiple inheritance in typescript.
// how to use it?
// instead of extends, you can copy this mixin and rename it such as
/*

// base class 1
export const passwordInputMixin = <T extends ClassType>(BaseClass: T) => {
  @InputType()
  class PasswordInput extends BaseClass{
    @Field()
    @Min(5)
    @Max(18)
    password: string;
  }
};

// base class 2
export const emailInputMixin = <T extends ClassType>(BaseClass: T) => {
  @InputType()
  class PasswordInput extends BaseClass{
    @Field()
    @Min(5)
    @Max(18)
    password: string;
  }
};

// child class which need to inherit from both of the base classes, mixin is a higher order
// function, you can call it like this, it will generate one single base class to be extended
@InputType()
export class RegisterInput extends passwordInputMixin(emailInputMixin(class{})) {
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
}
*/
