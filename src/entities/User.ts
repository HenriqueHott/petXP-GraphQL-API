import { ObjectType, Field } from "type-graphql";
import { Entity, Column, BeforeInsert, OneToMany } from "typeorm";
import { EntityNode } from "./Node";
import { hash } from "argon2";
import { Pet } from "./Pet";
import { Request } from "./Request";

@ObjectType()
@Entity("users", { orderBy: { createdAt: "ASC" } })
export class User extends EntityNode {
  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Field()
  @Column()
  state: string;

  @Field()
  @Column()
  city: string;

  @Field(() => [Pet])
  @OneToMany(() => Pet, pet => pet.owner, { persistence: false })
  pets: Pet[];

  @Field(() => [Request])
  @OneToMany(() => Request, request => request.user, { persistence: false })
  requests: Request[];

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = await hash(this.password);
  }
}
