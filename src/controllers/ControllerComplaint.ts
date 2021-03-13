import { Request, Response } from "express";
import { ComplaintRepository } from '../repositories/ComplaintRepository';

export default class ControllerComplaint {

    complaintRepository:ComplaintRepository;

    constructor() {
        this.complaintRepository = new ComplaintRepository();
    }

    async pong (req: Request, resp: Response): Promise<void> {
        const pingPong = {
            ping: "pong"
        }
        resp.status(200).json(pingPong);
    }

}
