import { NextFunction, Request, Response } from 'express';
import { Votes } from '../entity/Votes';
import { VotesRepository } from '../repositories/VotesRepository';
import ComplaintUpvote from '../utils/ComplaintUpvote';
import { ComplaintVote } from '../utils/ComplaintVote';
import ComplaintVoteConfirmed from '../utils/ComplaintVoteConfirmed';
import { Complaint } from '../entity/Complaint';
import { ComplaintRepository } from '../repositories/ComplaintRepository';
import { ComplaintService } from '../services/ComplaintService';
import { CheckFields } from '../utils/CheckFields';

export default class ControllerComplaint {
	complaintRepository: ComplaintRepository;
	voteRepository: VotesRepository;
	complaintService: ComplaintService;

	constructor() {
		this.complaintRepository = new ComplaintRepository();
		this.voteRepository = new VotesRepository();
		this.complaintService = new ComplaintService();
	}

	private async checkComplaintExist(complaintId: number): Promise<Complaint> {
		const complaint = await this.complaintRepository.getById(complaintId);
		if (complaint == undefined || complaint == null) {
			throw new Error('Complaint not found');
		}
		return complaint;
	}

	private buildVoteType(typeVote: string): ComplaintVote {
		if (typeVote == 'complaintConfirmed') {
			return new ComplaintVoteConfirmed();
		}
		return new ComplaintUpvote();
	}

	async pong(req: Request, res: Response): Promise<void> {
		const pingPong = {
			ping: 'pong',
		};
		res.status(200).json(pingPong);
	}

	async create(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response> {
		try {
			await this.complaintService.create(req.body);
			return res.sendStatus(201);
		} catch (error) {
			console.log('Catch da create ');
			next(error);
		}
	}

	async complaints(req: Request, res: Response): Promise<void> {
		try {
			const response = await this.complaintRepository.getAllComplaints(
				Number(req.query.skip),
				Number(req.query.take),
				String(req.query.orderDate),
			);
			res.status(200).json(response);
		} catch (error) {
			res.status(400);
			res.json({
				error,
			});
		}
	}

	async complaintWithVote(req: Request, res: Response): Promise<void> {
		try {
			const response = await this.complaintRepository.getComplaintById(
				Number(req.query.userId),
				Number(req.query.complaintId),
			);
			res.status(200).json(response);
		} catch (error) {
			res.status(400);
			res.json({
				error,
			});
		}
	}

	async addVote(req: Request, res: Response): Promise<Response> {
		const fields = ['userId', 'complaintId', 'typeVote'];
		const missingFields = CheckFields(fields, req.body);
		if (missingFields.length > 0) {
			return res
				.status(400)
				.json({ msg: `Missing fields [${missingFields}]` });
		}
		try {
			const complaint = await this.checkComplaintExist(
				req.body.complaintId,
			);
			const vote: Votes = Object.assign(new Votes(), req.body);
			await this.voteRepository.saveVote(vote, (error) => {
				res.status(400).json({ error: error.message });
			});
			const countVotes = await this.voteRepository.countVotesInComplaint(
				req.body.complaintId,
				req.body.typeVote,
			);
			const complaintVote = this.buildVoteType(String(req.body.typeVote));
			complaintVote.validateVote(
				countVotes,
				complaint,
				this.complaintRepository,
			);
			return res.sendStatus(200);
		} catch (error) {
			return res.status(400).json({ error: error.message });
		}
	}

	async getUserVote(req: Request, res: Response): Promise<Response> {
		const userId = req.query.userId;
		const skip = 0;
		const take = 0;
		try {
			if (userId == null || userId == undefined) {
				throw new Error('User not found');
			}
			const userVotes = await this.complaintRepository.getComplaintsWithVotes(
				Number(userId),
				skip,
				take,
			);
			return res.status(200).json(userVotes);
		} catch (error) {
			return res.status(400).json({ error: error.message });

			console.log(this.getUserVote);
		}
	}
}
