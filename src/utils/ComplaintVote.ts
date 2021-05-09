import { ComplaintRepository } from '@repositories/ComplaintRepository';
import { Complaint } from '@entity/Complaint';

export interface ComplaintVote {
	validateVote(
		count: number,
		complaint: Complaint,
		voteFlag: number,
		repository: ComplaintRepository,
	): Promise<void>;
}
