import { AuthChecker } from "./AuthChecker";
import { buildSchema } from "type-graphql";
import { ResetPasswordResolver } from "../modules/user/ResetPassword";
import { ConfirmUserResolver } from "../modules/user/ConfirmUser";
import { ForgotPasswordResolver } from "../modules/user/ForgotPassword";
import { LoginResolver } from "../modules/user/Login";
import { RegisterResolver } from "../modules/user/register/Register";
import { LogoutResolver } from "../modules/user/Logout";
import { MeResolver } from "../modules/user/me/Me";
import { CreateUserResolver } from "../modules/user/CreateUser";
import { CreateProductResolver } from "../modules/product/CreateProduct";

export const createSchema = () =>
  buildSchema({
    resolvers: [
      ResetPasswordResolver,
      ConfirmUserResolver,
      ForgotPasswordResolver,
      LoginResolver,
      RegisterResolver,
      LogoutResolver,
      MeResolver,
      CreateUserResolver,
      CreateProductResolver
    ],
    authChecker: AuthChecker
  });
