import { ObjectType, Field, Int } from "type-graphql";
import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Request } from "./Request";
import { EntityNode } from "./Node";

@ObjectType()
@Entity("pets", { orderBy: { id: "ASC" } })
export class Pet extends EntityNode {
  @Column("int", { nullable: true })
  ownerId: string | null;

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

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, user => user.pets, {
    onDelete: "CASCADE",
    persistence: false
  })
  owner: User | null;

  @Field(() => [Request])
  @OneToMany(() => Request, request => request.pet, { persistence: false })
  requests: Request[];
}
