import { AuthChecker } from "./AuthChecker";
import { buildSchema } from "type-graphql";

export const createSchema = () =>
  buildSchema({
    resolvers: [__dirname + "/../modules/*/*.ts"],
    authChecker: AuthChecker
  });
