import  { Category } from './Category';

export interface ComplaintWithVote {
    complaint_id: number,
    complaint_name: string,
    complaint_description: string,
    complaint_latitude: number,
    complaint_longitude: number,
    complaint_userId: number,
    complaint_category: Category,
    complaint_creationDate: string,
    complaint_closeDate: string,
    complaint_picture: string,
    complaint_status: string,
    vote_id: number,
    vote_userId: number,
    vote_complaintId: number,
    vote_typeVote: string
}