// // // this is a demo for higher order resolvers
// // // to see how to use, checkout the CreateUser.ts and the CreateProduct.ts

import { Resolver, Mutation, Arg, ClassType } from "type-graphql";

export function createResolver<CT extends ClassType, IT extends ClassType>(
  suffix: string,
  returnTypeCls: CT,
  inputTypeCls: IT,
  entity: any
) {
  @Resolver({ isAbstract: true })
  abstract class BaseResolver {
    @Mutation(() => returnTypeCls, { name: `create${suffix}` })
    async createUser(
      @Arg("data", () => inputTypeCls) data: typeof inputTypeCls
    ) {
      return entity.create(data).save();
    }
  }

  return BaseResolver;
}
