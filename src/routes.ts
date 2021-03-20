import { Router, Request, Response } from 'express';

import ControllerComplaint from './controllers/ControllerComplaint';

const routers = Router();
const controller = new ControllerComplaint();

routers.get("/api/ping", (req: Request, res: Response) => {
    controller.pong(req, res);
});

routers.post("/api/complaint/create", (req:Request, res: Response) => {
    controller.create(req, res);
});
export default routers;