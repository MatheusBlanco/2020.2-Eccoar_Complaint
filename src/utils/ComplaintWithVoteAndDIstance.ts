import { Category } from './Category';

export interface ComplaintWithVoteAndDistance {
	complaint_id: number;
	complaint_name: string;
	complaint_description: string;
	complaint_latitude: number;
	complaint_longitude: number;
	complaint_userId: string;
	complaint_category: Category;
	complaint_creationDate: string;
	complaint_closeDate: string;
	complaint_picture: string;
	complaint_status: string;
	vote_id: number;
	vote_userId: string;
	vote_complaintId: number;
	vote_typeVote: string;
	complaint_distance: number;
}
