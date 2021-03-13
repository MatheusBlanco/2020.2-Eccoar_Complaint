import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { IsLatitude, IsLongitude } from 'class-validator';
import { Category } from "./../utils/Category";

@Entity("tb_complaint")
export class Complaint {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 255, nullable: false})
    name: string;

    @Column({length: 255, nullable: false})
    description: string;

    @Column({nullable: false})
    @IsLatitude()
    latitude: number;

    @Column({nullable: false})
    @IsLongitude()
    longitude: number;

    @Column({nullable: false})
    userId: number;

    @Column({type: "enum", enum: Category, nullable: false})
    category: Category;

    @Column({type: "datetime", nullable: false})
    creationDate: string;

    @Column({type: "datetime", nullable: false})
    closeDate: string;

    @Column({nullable: false})
    status: boolean;
}
