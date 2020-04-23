import { ObjectType, Field, ID } from "type-graphql";
import { Entity, Column, PrimaryColumn, Generated, ManyToOne } from "typeorm";
import { EntityNodeWithoutID } from "./Node";
import { User } from "./User";
import { Pet } from "./Pet";

export type RequestStatus = "PENDING" | "COMPLETED" | "CANCELED";

@ObjectType()
@Entity("requests", { orderBy: { createdAt: "ASC" } })
export class Request extends EntityNodeWithoutID {
  @Field(() => ID)
  @Column("uuid", { unique: true })
  @Generated("uuid")
  readonly id: string;

  @Field()
  @PrimaryColumn("uuid")
  readonly userId: string;

  @Field()
  @PrimaryColumn("uuid")
  readonly petId: string;

  @Field()
  @Column({
    type: "enum",
    enum: ["PENDING", "COMPLETED", "CANCELED"],
    default: "PENDING"
  })
  status: RequestStatus;

  @Field(() => Date, { nullable: true })
  @Column("timestamp", { nullable: true })
  completedAt: Date | null;

  @Column({ default: false })
  locked: boolean;

  @Field(() => String, { nullable: true })
  @Column("text", { nullable: true })
  cancelReason: string | null;

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
