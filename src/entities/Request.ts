import { ObjectType, Field, ID } from "type-graphql";
import { Entity, Column, PrimaryColumn, Generated, ManyToOne } from "typeorm";
import { User } from "./User";
import { Pet } from "./Pet";
import { EntityNodeWithoutID } from "./Node";

export type RequestStatus = "PENDING" | "COMPLETED" | "CANCELED";

@ObjectType()
@Entity("requests", { orderBy: { id: "ASC" } })
export class Request extends EntityNodeWithoutID {
  @Field(() => ID)
  @Column("int", { unique: true })
  @Generated("increment")
  readonly id: string;

  @Field()
  @PrimaryColumn("int")
  readonly userId: string;

  @Field()
  @PrimaryColumn("int")
  readonly petId: string;

  @Field()
  @Column({
    type: "enum",
    enum: ["PENDING", "COMPLETED", "CANCELED"],
    default: "PENDING"
  })
  status: RequestStatus;

  @Field(() => Date, { nullable: true })
  @Column("datetime", { nullable: true })
  completedAt: Date | null;

  @Column({ default: false })
  locked: boolean;

  @Field(() => User)
  @ManyToOne(() => User, user => user.requests, {
    onDelete: "CASCADE",
    persistence: false
  })
  user: User;

  @Field(() => Pet)
  @ManyToOne(() => Pet, pet => pet.requests, {
    onDelete: "CASCADE",
    persistence: false
  })
  pet: Pet;
}
