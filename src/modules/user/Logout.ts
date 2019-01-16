import { Resolver, Mutation, Ctx } from "type-graphql";
import { LoginContext } from "../../types/LoginContext";

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() context: LoginContext): Promise<boolean> {
    return new Promise((resolve, reject) => {
      return context.req.session!.destroy(error => {
        if (error) {
          console.log("logoutError:: ", error);
          return reject(false);
        }

        context.res.clearCookie("qid");
        return resolve(true);
      });
    });
  }
}
