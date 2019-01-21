import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";
import { createResolver } from "../../utils/createResolver";
import { Resolver } from "type-graphql";

export const BaseResolver = createResolver("User", User, RegisterInput, User);

@Resolver()
export class CreateUserResolver extends BaseResolver {}
