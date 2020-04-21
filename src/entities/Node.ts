import { ObjectType, Field, ID } from "type-graphql";
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

@ObjectType({ isAbstract: true })
export abstract class EntityNodeWithoutID extends BaseEntity {
  @Field()
  @CreateDateColumn()
  readonly createdAt: Date;

  @Field()
  @UpdateDateColumn()
  readonly updatedAt: Date;
}

@ObjectType({ isAbstract: true })
export abstract class EntityNode extends EntityNodeWithoutID {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;
}
