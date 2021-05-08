import { getRepository } from 'typeorm';
import { VoteType } from '@utils/VoteType';
import { Votes } from '@entity/Votes';

export class VotesRepository {
	countVotesInComplaint(
		complaintId: number,
		typeVote: VoteType,
	): Promise<number> {
		const repository = getRepository(Votes);
		return repository.count({ where: { complaintId, typeVote } });
	}

	async removeVote(
		userId: string,
		complaintId: number,
		typeVote: string,
	): Promise<void> {
		const repository = getRepository(Votes);
		const result = await repository
			.createQueryBuilder()
			.delete()
			.from('tb_votes')
			.where(
				'userId = :userId and complaintId = :complaintId and typeVote = :typeVote',
				{ userId, complaintId, typeVote },
			)
			.execute();
		if (result.affected == 0) {
			throw new Error('This vote does not exist!');
		}
	}

	async saveVote(
		vote: Votes,
		callback: (error: Error) => void,
	): Promise<void> {
		const repository = getRepository(Votes);
		await repository.save(vote).catch((error) => callback(error));
	}
}
