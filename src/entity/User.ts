import { PrimaryGeneratedColumn, Column, Entity, BaseEntity } from "typeorm";
import { ObjectType, Field, ID, Root } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  fullName(@Root() parent: User): string {
    return parent.firstName + " " + parent.lastName;
  }

  @Column()
  password: string;

  @Field()
  @Column("text", { unique: true })
  email: string;
}
