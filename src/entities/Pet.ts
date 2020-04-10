import { ObjectType, Field, ID, Int } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import { User } from "./User";
import { Request } from "./Request";

@ObjectType()
@Entity("pets", { orderBy: { id: "ASC" } })
export class Pet extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: string;

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

  @Field()
  @CreateDateColumn()
  readonly createdAt: Date;

  @Field()
  @UpdateDateColumn()
  readonly updateAt: Date;

  @Field(() => User)
  @ManyToOne(() => User, user => user.pets, { onDelete: "CASCADE" })
  owner: User;

  @Field(() => [Request])
  @OneToMany(() => Request, request => request.pet)
  requests: Request[];
}
