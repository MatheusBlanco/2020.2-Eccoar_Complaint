import { getRepository } from 'typeorm';
import { Votes } from '@entity/Votes';
import { Complaint } from '@entity/Complaint';
import { Category } from '../utils/Category';
import { ComplaintWithVote } from '../utils/ComplaintWithVote';

export class ComplaintRepository {
	getById(id: number): Promise<Complaint> {
		const repository = getRepository(Complaint);
		return repository.findOne({ id });
	}

	createComplaint(complaint: Complaint): Promise<Complaint> {
		const repository = getRepository(Complaint);
		return repository.save(complaint);
	}

	async deleteComplaint(id: number): Promise<void> {
		const repository = getRepository(Complaint);
		repository.delete(id);
	}

	async update(complaint: Complaint): Promise<void> {
		const repository = getRepository(Complaint);
		repository.update(complaint.id, complaint);
	}

	async getAllComplaints(
		skip: number,
		take: number,
		orderDate: string,
	): Promise<{ complaints: Complaint[]; count: number }> {
		const repository = getRepository(Complaint);
		const [result, count] = await repository.findAndCount({
			skip: skip * take,
			take: take,
			order: {
				creationDate: orderDate as 'ASC' | 'DESC',
			},
		});
		const response = {
			complaints: result,
			count,
		};
		return response;
	}

	async getComplaintsWithVotes(
		userId: number,
		skip: number,
		take: number,
	): Promise<ComplaintWithVote[]> {
		const repository = getRepository(Complaint);
		const getComplaintsVotes: ComplaintWithVote[] = await repository
			.createQueryBuilder('complaint')
			.leftJoinAndSelect(
				Votes,
				'vote',
				'vote.complaintId = complaint.id and vote.userId = :userId',
				{ userId },
			)
			.limit(take)
			.offset(skip * take)
			.getRawMany<ComplaintWithVote>();
		return getComplaintsVotes;
	}

	async getComplaintById(
		userId: number,
		complaintId: number,
	): Promise<ComplaintWithVote> {
		const repository = getRepository(Complaint);

		const getComplaintVote = await repository
			.createQueryBuilder('complaint')
			.leftJoinAndSelect(
				Votes,
				'vote',
				'vote.complaintId = complaint.id and vote.userId = :userId',
				{ userId },
			)
			.where('complaint.id = :complaintId', { complaintId })
			.getRawOne<ComplaintWithVote>();

		return getComplaintVote;
	}

	async getWaitComplaints(category: Category): Promise<Complaint[]> {
		const repository = getRepository(Complaint);
		return await repository.find({
			where: { category: category, status: 'wait' },
		});
	}
}
