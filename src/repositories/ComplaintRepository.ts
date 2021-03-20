import { getRepository } from "typeorm";
import { Complaint } from "../entity/Complaint";

export class ComplaintRepository {

    getById(id: number): Promise<Complaint> {
        const repository = getRepository(Complaint);
        return repository.findOne({ id });
    }

    createComplaint(complaint: Complaint): Promise<Complaint> {
        const repository = getRepository(Complaint);
        return repository.save(complaint);
    }

}