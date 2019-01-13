import { MiddlewareFn } from "type-graphql";
import { LoginContext } from "../types/LoginContext";

export const logger: MiddlewareFn<LoginContext> = async (
  { root, args },
  next
) => {
  console.log("root:: ", root);
  console.log("args:: ", args);

  return next();
};
