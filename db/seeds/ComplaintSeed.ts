import { Votes } from '@entity/Votes';
import { VoteType } from '@utils/VoteType';
import { Complaint } from '@entity/Complaint';
import { Category } from '@utils/Category';

import { jsonData } from './complaintData';
import { voteData } from './voteData';
import { Status } from '@utils/Status';

export class ComplaintSeed {
	seedDatabase() {
		const complaints: Complaint[] = [];
		const votes: Votes[] = [];

		voteData.forEach((data) => {
			const vote = new Votes();
			vote.complaintId = data.complaintId;
			vote.typeVote = data.typeVote as VoteType;
			vote.userId = data.userId;
			votes.push(vote);
		});

		jsonData.forEach((data) => {
			const complaint = new Complaint();
			complaint.latitude = data.latitude;
			complaint.longitude = data.longitude;
			complaint.status = data.status as Status;
			complaint.picture = data.picture;
			complaint.category = data.category as Category;
			complaint.closeDate = data.closeDate;
			complaint.creationDate = data.creationDate;
			complaint.name = data.name;
			complaint.description = data.description;
			complaint.userId = data.userId;
			complaints.push(complaint);
		});
		return { complaints, votes };
	}
}
