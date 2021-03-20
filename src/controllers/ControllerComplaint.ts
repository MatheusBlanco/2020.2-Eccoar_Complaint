import { Request, Response } from "express";
import { Complaint } from '../entity/Complaint';
import { ComplaintRepository } from '../repositories/ComplaintRepository';

export default class ControllerComplaint {

    complaintRepository:ComplaintRepository;

    constructor() {
        this.complaintRepository = new ComplaintRepository();
    }

    async pong (req: Request, res: Response): Promise<void> {
        const pingPong = {
            ping: "pong"
        }
        res.status(200).json(pingPong);
    }

    async create(req: Request, res:Response): Promise<Response>{
        try {
            let missingFields:string[] = [];
            const fields = ['name', 'description', 'latitude', 'longitude', 'userId', 'category'];
            fields.forEach(field => {
                if(!(field in req.body)) missingFields.push(field);
            });

            if(missingFields.length > 0) return res.status(400).json({"msg": `Missing fields [${missingFields}]`})

            const complaint:Complaint = Object.assign(new Complaint(), req.body);
            await this.complaintRepository.createComplaint(complaint);
            return res.sendStatus(201);
        } catch (error) {
            return res.status(400).json({"msg": error});
        }
    }
}
