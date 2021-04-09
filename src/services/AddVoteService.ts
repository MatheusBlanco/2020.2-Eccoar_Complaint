import { Request, Response } from "express";
import { Complaint } from "src/entity/Complaint";
import { Votes } from "src/entity/Votes";
import { ComplaintRepository } from "src/repositories/ComplaintRepository";
import { VotesRepository } from "src/repositories/VotesRepository";
import ComplaintUpvote from "src/utils/ComplaintUpvote";
import { ComplaintVote } from "src/utils/ComplaintVote";
import ComplaintVoteConfirmed from "src/utils/ComplaintVoteConfirmed";


class AddVoteService {
  voteRepository: VotesRepository;
  complaintRepository: ComplaintRepository;

  constructor() {
      this.complaintRepository = new ComplaintRepository();
      this.voteRepository = new VotesRepository();
  }

  private buildVoteType(typeVote: string): ComplaintVote {
    if (typeVote == "complaintConfirmed") {
        return new ComplaintVoteConfirmed();
    }
    return new ComplaintUpvote();
  } 

  private async checkComplaintExist(complaintId: number): Promise<Complaint> {
    const complaint = await this.complaintRepository.getById(complaintId);
    if (complaint == undefined || complaint == null) {
        throw new Error('Complaint not found');
    }
    return complaint;
  }

  private queryValidator(fields: string[], req: Request) {
    const missingFields: string[] = [];
    fields.forEach(field => {
        if (!(field in req.body)) missingFields.push(field);
    });
    return missingFields;
  }

  async addVote(req: Request, res: Response): Promise<Response> {
    const fields = ['userId', 'complaintId', 'typeVote'];
    const missingFields = this.queryValidator(fields, req);
    if (missingFields.length > 0) {
        return res.status(400).json({ "msg": `Missing fields [${missingFields}]` });
    }
    try {
        const complaint = await this.checkComplaintExist(req.body.complaintId);
        const vote: Votes = Object.assign(new Votes(), req.body);
        await this.voteRepository.saveVote(vote, (error) => {
            res.status(400).json({ "error": error.message });
        });
        const countVotes = await this.voteRepository.countVotesInComplaint(req.body.complaintId, req.body.typeVote);
        const complaintVote = this.buildVoteType(String(req.body.typeVote));
        complaintVote.validateVote(countVotes, complaint, this.complaintRepository);
        return res.sendStatus(200);
    } catch (error) {
        return res.status(400).json({ "error": error.message });
    }
  }
}

export default new AddVoteService ();