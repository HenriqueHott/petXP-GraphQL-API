import { ObjectType, Field } from "type-graphql";
import { Entity, Column, BeforeInsert, OneToMany } from "typeorm";
import { EntityNode } from "./Node";
import { hash } from "argon2";
import { Pet } from "./Pet";
import { Request } from "./Request";
import { Report } from "./Report";

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

  @Column("int", { default: 1 })
  tokenVersion: number;

  @Field(() => [Pet])
  @OneToMany(() => Pet, pet => pet.owner, { persistence: false })
  pets: Pet[];

  @Field(() => [Request])
  @OneToMany(() => Request, request => request.user, { persistence: false })
  requests: Request[];

  // @Field: Verificar se o usuario e o mesmo autor da request
  @OneToMany(() => Report, report => report.source, { persistence: false })
  reports: Report[];

  // @Field: Verificar se o usuario e o mesmo autor da request
  @OneToMany(() => Report, report => report.target, { persistence: false })
  complaints: Report[];
  

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = await hash(this.password);
  }
}
