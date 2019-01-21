import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Authorized,
  UseMiddleware
} from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../../entity/User";
import { RegisterInput } from ".././register/RegisterInput";
import { isAuth } from "../../../middleware/isAuth";
import { logger } from "../../../middleware/logger";
import { sendEmail } from "../../../utils/sendEmail";
import { createConfirmationUrl } from "../../../utils/createUrl";

@Resolver()
export class RegisterResolver {
  @Query(() => String, { name: "SayHello", nullable: true })
  @Authorized() // authorized decorator to authenticate
  async hello() {
    return await "Hello world";
  }

  @Query(() => String, { name: "SayHelloAgain", nullable: true })
  @UseMiddleware(isAuth, logger) // middleware to authenticate
  async hello2() {
    return await "Hello world222...";
  }

  @Mutation(() => User)
  async register(@Arg("data")
  {
    firstName,
    lastName,
    email,
    password
  }: RegisterInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    }).save();

    await sendEmail(
      email,
      await createConfirmationUrl(user.id),
      "Activate your account",
      "Click here to activate your account"
    );
    return user;
  }
}
