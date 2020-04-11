import { ObjectType, Field, ID } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToMany
} from "typeorm";
import { hash } from "argon2";
import { Pet } from "./Pet";
import { Request } from "./Request";

@ObjectType()
@Entity("users", { orderBy: { id: "ASC" } })
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: string;

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

  @Field()
  @CreateDateColumn()
  readonly createdAt: Date;

  @Field()
  @UpdateDateColumn()
  readonly updatedAt: Date;

  @Field(() => [Pet])
  @OneToMany(() => Pet, pet => pet.owner)
  pets: Pet[];

  @Field(() => [Request])
  @OneToMany(() => Request, request => request.user)
  requests: Request[];

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = await hash(this.password);
  }
}
