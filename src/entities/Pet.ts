import { ObjectType, Field, Int, registerEnumType } from "type-graphql";
import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import { EntityNode } from "./Node";
import { User } from "./User";
import { Request } from "./Request";

enum Ports {
    GRANDE = "GRANDE",
    MEDIO = "MEDIO",
    PEQUENO = "PEQUENO",
}

registerEnumType(Ports, {
    name: "Ports",
});

@ObjectType()
@Entity("pets", { orderBy: { createdAt: "ASC" } })
export class Pet extends EntityNode {
    @Column("uuid")
    ownerId: string;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    type: string;

    @Field()
    @Column()
    breed: string;

    @Field(() => Int, { nullable: true })
    @Column("int", { nullable: true })
    age: number | null;

    @Field(() => Ports, { nullable: true })
    @Column({
        type: "enum",
        enum: Ports,
    })
    port: Ports | null;

    @Field(() => String, { nullable: true })
    @Column("text", { nullable: true })
    info: string | null;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.pets, {
        onDelete: "CASCADE",
        persistence: false,
    })
    owner: User;

    @Field(() => [Request])
    @OneToMany(() => Request, (request) => request.pet, { persistence: false })
    requests: Request[];

    @Field()
    @Column()
    available: boolean;
}
