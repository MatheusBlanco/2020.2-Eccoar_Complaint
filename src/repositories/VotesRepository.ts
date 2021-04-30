import { getRepository } from 'typeorm';
import { VoteType } from '@utils/VoteType';
import { Votes } from '@entity/Votes';
import { Complaint } from '@entity/Complaint';

export class VotesRepository {
	countVotesInComplaint(
		complaint: Complaint,
		typeVote: VoteType,
	): Promise<number> {
		const repository = getRepository(Votes);
		return repository.count({ complaint, typeVote });
	}

	async saveVote(
		vote: Votes,
		callback: (error: Error) => void,
	): Promise<void> {
		const repository = getRepository(Votes);
		await repository.save(vote).catch((error) => callback(error));
	}
}
