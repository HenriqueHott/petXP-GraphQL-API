import { ObjectType, Field, Int } from "type-graphql";
import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import { EntityNode } from "./Node";
import { User } from "./User";
import { Request } from "./Request";

@ObjectType()
@Entity("pets", { orderBy: { createdAt: "ASC" } })
export class Pet extends EntityNode {
  @Column("uuid")
  ownerId: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  breed: string;

  @Field()
  @Column()
  type: string;

  @Field(() => Int)
  @Column("int")
  age: number;

  @Field(() => Number, { nullable: true })
  @Column("float", { nullable: true })
  weight: number | null;

  @Field(() => User)
  @ManyToOne(() => User, user => user.pets, {
    onDelete: "CASCADE",
    persistence: false
  })
  owner: User;

  @Field(() => [Request])
  @OneToMany(() => Request, request => request.pet, { persistence: false })
  requests: Request[];
}
