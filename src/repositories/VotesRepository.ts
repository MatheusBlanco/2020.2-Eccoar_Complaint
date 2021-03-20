import { getRepository } from "typeorm";
import { Votes } from "../entity/Votes";

export class VotesRepository {

    countVotesInComplaint(complaintId: number): Promise<number> {
        const repository = getRepository(Votes);
        return repository.count({complaintId});
    }

}