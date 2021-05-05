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

	async saveVote(
		vote: Votes,
		callback: (error: Error) => void,
	): Promise<void> {
		const repository = getRepository(Votes);
		await repository.save(vote).catch((error) => callback(error));
	}
}
