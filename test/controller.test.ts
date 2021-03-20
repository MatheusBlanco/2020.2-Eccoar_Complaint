import ControllerComplaint from '../src/controllers/ControllerComplaint';
import { Request, Response } from 'express';
import  { ComplaintRepository } from '../src/repositories/ComplaintRepository';

jest.mock('../src/repositories/ComplaintRepository');

const mockResponse = () => {
    const res: Response = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.sendStatus = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};
  

describe("CreateComplaint",() => {
    test("should return status code 201", async() => {

        const controller = new ControllerComplaint();
        const mReq = {} as Request;
        mReq.body = {
            "name": "some-name",
            "description": "some-description",
            "latitude": 10,
            "longitude": -10,
            "userId": 0,
            "category": "Hole",
            "status": false
        };
        const mResp = mockResponse();

        const createComplaint = jest.spyOn(ComplaintRepository.prototype, 'createComplaint').mockImplementation();

        await controller.create(mReq, mResp);
        expect(mResp.sendStatus).toHaveBeenCalledWith(201);
    });

    test("should return status code 400", async () => {
        const controller = new ControllerComplaint();
        const mReq = {} as Request;
        const mResp = mockResponse();

        const createComplaint = jest.spyOn(ComplaintRepository.prototype, 'createComplaint').mockImplementation(() => {throw new Error()});

        await controller.create(mReq, mResp);
        expect(mResp.status).toHaveBeenCalledWith(400);

    });
});


describe("pong", () => {

    test("should return ping-pong for pong()", async () => {
        const controller = new ControllerComplaint();
        const mReq = {} as Request;
        const mResp = mockResponse();
        await controller.pong(mReq, mResp);
        expect(mResp.status).toHaveBeenCalledWith(200);
        expect(mResp.json).toHaveBeenCalledWith({ping: "pong"});
    });

});