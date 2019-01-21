import { Length } from "class-validator";
import { InputType, Field } from "type-graphql";

@InputType()
export class ProductInput {
  @Field()
  @Length(1, 20)
  name: string;

  @Field()
  @Length(1, 255)
  category: string;
}
