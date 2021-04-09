import { Request, Response } from "express";
import { ComplaintRepository } from "src/repositories/ComplaintRepository";


class GetUserVoteService {
  complaintRepository: ComplaintRepository;

  constructor() {
      this.complaintRepository = new ComplaintRepository();
  }

  async getUserVote(req: Request, res: Response): Promise<Response> {
    const userId = req.query.userId;
    const skip = 0;
    const take = 0;
    try {
        if (userId == null || userId == undefined) {
            throw new Error('User not found');
        }
        const userVotes = await this.complaintRepository.getComplaintsWithVotes(Number(userId), skip, take);
        return res.status(200).json(userVotes);
    } catch (error) {
        return res.status(400).json({ "error": error.message });
    }
  }
}

export default new GetUserVoteService();