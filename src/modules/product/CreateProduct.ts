import { Product } from "../../entity/Product";
import { ProductInput } from "./CreateProductInput";
import { createResolver } from "../../utils/createResolver";
import { Resolver } from "type-graphql";

const BaseResolver = createResolver("Product", Product, ProductInput, Product);

@Resolver()
export class CreateProductResolver extends BaseResolver {}
