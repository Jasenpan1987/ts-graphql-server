import { MiddlewareFn } from "type-graphql";
import { LoginContext } from "../types/LoginContext";

export const isAuth: MiddlewareFn<LoginContext> = async ({ context }, next) => {
  if (!context.req.session || !context.req.session.userId) {
    throw new Error("You are not authorized");
  }

  return next();
};
