import { Complaint } from '@entity/Complaint';
import { ComplaintRepository } from '@repositories/ComplaintRepository';
import { ComplaintVote } from './ComplaintVote';
import { Status } from './Status';

export default class ComplaintVoteConfirmed implements ComplaintVote {
	async validateVote(
		count: number,
		complaint: Complaint,
		voteFlag: number,
		repository: ComplaintRepository,
	): Promise<void> {
		if (count > voteFlag && complaint.status !== 'finished') {
			const closeDate = new Date();
			complaint.status = Status.finished;
			complaint.closeDate = closeDate.toISOString();
			repository.update(complaint);
		}
	}
}
