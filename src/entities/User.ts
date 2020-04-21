import { ObjectType, Field } from "type-graphql";
import { Entity, Column, BeforeInsert, OneToMany } from "typeorm";
import { hash } from "argon2";
import { Pet } from "./Pet";
import { Request } from "./Request";
import { EntityNode } from "./Node";

@ObjectType()
@Entity("users", { orderBy: { id: "ASC" } })
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
  surname: string;

  @Field()
  @Column()
  taxRegistry: string;

  @Field(() => String, { nullable: true })
  @Column("varchar", { nullable: true })
  address: string | null;

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
