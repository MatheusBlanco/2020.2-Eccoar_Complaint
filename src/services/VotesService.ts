/*
import { Complaint } from "../entity/Complaint";
import { ComplaintRepository } from "../repositories/ComplaintRepository";
import { Optional } from "../utils/Optional";

export class ComplaintService {
    votesRepository: ComplaintRepository;

    constructor() {
        this.complaintRepository = new ComplaintRepository();
    }

    async create(complaint: Optional<Complaint, 'id'>): Promise<Complaint> {
        try {
            const response = await this.complaintRepository.createComplaint(complaint);
            return response;
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
*/