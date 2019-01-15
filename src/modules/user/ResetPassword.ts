import { Resolver, Mutation, Arg } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import { ResetPasswordInput } from "./resetPassword/ResetPasswordInput";
import { redis } from "../../redis";
import { forgotPasswordPrefix } from "../constants/redisPrefixes";

@Resolver()
export class ResetPasswordResolver {
  @Mutation(() => User, { nullable: true })
  async resetPassword(@Arg("resetPasswordInput")
  {
    token,
    password
  }: ResetPasswordInput): Promise<User | null> {
    const userId = await redis.get(forgotPasswordPrefix + token);
    if (!userId) {
      return null;
    }

    const user = await User.findOne(userId);
    if (!user) {
      return null;
    }

    await redis.del(forgotPasswordPrefix + token);

    user.password = await bcrypt.hash(password, 12);
    await user.save();

    return user;
  }
}
