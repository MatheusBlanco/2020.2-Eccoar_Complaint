import { Router, Request, Response } from 'express';

import ControllerComplaint from '@controllers/ControllerComplaint';

const routers = Router();
const controller = new ControllerComplaint();

routers.get('/api/ping', (req: Request, res: Response) => {
	controller.pong(req, res);
});

routers.post('/api/complaint/create', (req: Request, res: Response) => {
	controller.create(req, res);
});

routers.get('/api/complaints', (req: Request, resp: Response) => {
	controller.complaints(req, resp);
});

routers.post('/api/vote/add', (req: Request, res: Response) => {
	controller.addVote(req, res);
});

routers.get('/api/vote/list', (req: Request, res: Response) => {
	controller.getUserVote(req, res);
});

routers.get('/api/complaint/votes', (req: Request, res: Response) => {
	controller.complaintWithVote(req, res);
});

routers.get('/api/complaints/wait', (req: Request, res: Response) => {
	controller.waitComplaintsByCategory(req, res);
});

routers.delete('/api/complaint/delete', (req: Request, res: Response) => {
	controller.deleteComplaintController(req, res);
});

export default routers;
