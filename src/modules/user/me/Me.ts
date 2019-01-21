import { Resolver, Query, Ctx } from "type-graphql";
import { User } from "../../../entity/User";
import { LoginContext } from "src/types/LoginContext";

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: LoginContext): Promise<User | null | undefined> {
    if (ctx && ctx.req.session && ctx.req.session!.userId) {
      return User.findOne(ctx.req.session!.userId);
    }

    return null;
  }
}
