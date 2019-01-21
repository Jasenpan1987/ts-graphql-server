// // // this is a demo for higher order resolvers
// // // to see how to use, checkout the CreateUser.ts and the CreateProduct.ts

import {
  Resolver,
  Mutation,
  Arg,
  ClassType,
  UseMiddleware
} from "type-graphql";
import { Middleware } from "type-graphql/interfaces/Middleware";

export function createResolver<CT extends ClassType, IT extends ClassType>(
  suffix: string,
  returnTypeCls: CT,
  inputTypeCls: IT,
  entity: any,
  middlewares?: Middleware<any>[]
) {
  @Resolver({ isAbstract: true })
  abstract class BaseResolver {
    @UseMiddleware(...(middlewares || [])) // if you want to use @Authorized, use authorize middleware instead, because we can't add decorator at runtime.
    @Mutation(() => returnTypeCls, { name: `create${suffix}` })
    async createUser(
      @Arg("data", () => inputTypeCls) data: typeof inputTypeCls
    ) {
      return entity.create(data).save();
    }
  }

  return BaseResolver;
}
