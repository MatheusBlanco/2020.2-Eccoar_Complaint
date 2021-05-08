import { VoteType } from '@utils/VoteType';
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	Unique,
} from 'typeorm';
import { Complaint } from './Complaint';

@Entity('tb_votes')
@Unique('vote', ['userId', 'complaintId', 'typeVote'])
export class Votes {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: false })
	userId: string;

	@Column({ nullable: false })
	complaintId: number;

	@Column({ type: 'enum', enum: VoteType, nullable: false })
	typeVote: VoteType;

	@ManyToOne(() => Complaint, (complaint) => complaint.votes, {
		nullable: false,
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'complaintId' })
	complaint: Complaint;
}
