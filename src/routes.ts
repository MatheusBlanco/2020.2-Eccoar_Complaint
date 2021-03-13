import { Router, Request, Response } from 'express';

import ControllerComplaint from './controllers/ControllerComplaint';

const routers = Router();
const controller = new ControllerComplaint();

routers.get("/ping", (req: Request, resp: Response) => {
    controller.pong(req, resp);
});

export default routers;