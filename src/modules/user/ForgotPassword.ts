import { Resolver, Mutation, Arg } from "type-graphql";
import { User } from "../../entity/User";
import { createForgotPasswordUrl } from "../../utils/createUrl";
import { sendEmail } from "../../utils/sendEmail";

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(@Arg("email") email: string): Promise<boolean> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return true;
    }

    const link = await createForgotPasswordUrl(user.id);
    sendEmail(
      email,
      link,
      "Reset Password",
      "Click here to reset your password"
    );

    return true;
  }
}
