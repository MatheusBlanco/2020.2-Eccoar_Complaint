import { getRepository } from 'typeorm';
import { Votes } from '@entity/Votes';
import { Complaint } from '@entity/Complaint';
import { Category } from '../utils/Category';
import { ComplaintWithVote } from '../utils/ComplaintWithVote';
import { ComplaintWithVoteAndDistance } from '@utils/ComplaintWithVoteAndDIstance';

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

	async getNearbyComplaints(
		userId: string,
		latitude: number,
		longitude: number,
		maxDistance: number,
		skip?: number,
		take?: number,
	): Promise<ComplaintWithVoteAndDistance[]> {
		const repository = getRepository(Complaint);
		const getNearbyComplaints: ComplaintWithVoteAndDistance[] = await repository
			.createQueryBuilder('complaint')
			.leftJoinAndSelect(
				Votes,
				'vote',
				'vote.complaintId = complaint.id and vote.userId = :userId',
				{ userId },
			)
			.addSelect(
				`SQRT(POW(69.1 * (latitude - ${latitude}), 2) +POW(69.1 * (${longitude} - longitude) * COS(latitude / 57.3), 2))`,
				'complaint_distance',
			)
			.having('complaint_distance < :maxDistance', { maxDistance })
			.orderBy('complaint_distance')
			.take(take)
			.skip(skip * take)
			.getRawMany<ComplaintWithVoteAndDistance>();
		return getNearbyComplaints;
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
		userId: string,
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
			.take(take)
			.skip(skip * take)
			.getRawMany<ComplaintWithVote>();
		return getComplaintsVotes;
	}

	async getComplaintById(
		userId: string,
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
