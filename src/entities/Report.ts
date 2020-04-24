import { ObjectType, Field, Int, registerEnumType } from "type-graphql";
import { Entity, Column, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { EntityNode } from "./Node";
import { User } from "./User";

enum ReportStatus {
    PENDING = "PENDING",
    DEFERRED = "DEFERRED",
    REJECTED = "REJECTED",
}

@ObjectType()
@Entity("reports", { orderBy: { createdAt: "ASC" } })
export class Report extends EntityNode {
    @Column("uuid")
    sourceId: string;

    @Column("uuid")
    targetId: string;

    @OneToOne(() => User, (user) => user.reports)
    source: User;

    @OneToMany(() => User, (user) => user.complaints)
    target: User;

    @Field()
    @Column("text")
    info: string;

    @Field(() => ReportStatus, { nullable: true })
    @Column({
        type: "enum",
        enum: ReportStatus,
    })
    status: ReportStatus;
}
