import { ObjectType, Field, ID, registerEnumType } from "type-graphql";
import {
  Entity,
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  Generated,
  ManyToOne
} from "typeorm";
import { User } from "./User";
import { Pet } from "./Pet";

export enum RequestStatus {
  PENDING = "PENDING",
  CANCELED = "CANCELED",
  COMPLETED = "COMPLETED"
}

registerEnumType(RequestStatus, {
  name: "RequestStatus",
  description: "Request status options"
});

@ObjectType()
@Entity("requests", { orderBy: { id: "ASC" } })
export class Request extends BaseEntity {
  @Field(() => ID)
  @Column("int", { unique: true })
  @Generated("increment")
  readonly id: string;

  @Field()
  @PrimaryColumn()
  readonly userId: string;

  @Field()
  @PrimaryColumn()
  readonly petId: string;

  @Field()
  @Column({
    type: "enum",
    enum: RequestStatus,
    default: RequestStatus.PENDING
  })
  status: RequestStatus;

  @Field()
  @CreateDateColumn()
  readonly createdAt: Date;

  @Field()
  @UpdateDateColumn()
  readonly updatedAt: Date;

  @Field(() => Date, { nullable: true })
  @Column("datetime", { nullable: true })
  completedAt: Date | null;

  @Field(() => User)
  @ManyToOne(() => User, user => user.requests, { onDelete: "CASCADE" })
  user: User;

  @Field(() => Pet)
  @ManyToOne(() => Pet, pet => pet.requests, { onDelete: "CASCADE" })
  pet: Pet;
}
