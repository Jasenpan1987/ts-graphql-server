import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import { LoginContext } from "../../types/LoginContext";

@Resolver()
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: LoginContext
  ): Promise<User | null> {
    const userInDb = await User.findOne({ where: { email } });
    if (!userInDb) {
      return null;
    }

    const valid = await bcrypt.compare(password, userInDb.password);
    if (!valid) {
      return null;
    }

    ctx.req.session!.userId = userInDb.id;
    console.log("userInDb.id:: ", userInDb.id);

    return userInDb;
  }
}
