import {Entity, PrimaryColumn} from "typeorm";

@Entity("tb_votes")
export class Votes {

    @PrimaryColumn()
    userId: number;

    @PrimaryColumn()
    complaintId: number;
}
