import { Complaint } from '../entity/Complaint';
import { ComplaintRepository } from '../repositories/ComplaintRepository';
import { ComplaintVote } from './ComplaintVote';
import { Status } from './Status';

export default class ComplaintUpvote implements ComplaintVote {
	async validateVote(
		count: number,
		complaint: Complaint,
		repository: ComplaintRepository,
	): Promise<void> {
		if (count > 15 && complaint.status == 'open') {
			complaint.status = Status.wait;
			repository.update(complaint);
		}
	}
}
