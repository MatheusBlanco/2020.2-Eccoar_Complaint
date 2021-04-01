import ControllerComplaint from '@controllers/ControllerComplaint';
import { Request, Response } from 'express';
import { ComplaintRepository } from '@repositories/ComplaintRepository';
import { Complaint } from '@entity/Complaint';
import { VotesRepository } from '@repositories/VotesRepository';
import { Votes } from '@entity/Votes';

jest.mock('@repositories/ComplaintRepository');
jest.mock('@repositories/VotesRepository');

const mockResponse = () => {
	const res: Response = {} as Response;
	res.status = jest.fn().mockReturnValue(res);
	res.sendStatus = jest.fn().mockReturnValue(res);
	res.json = jest.fn().mockReturnValue(res);
	return res;
};

const complaintMock = {
    "id": 11,
    "name": "Geri",
    "description": "Disarticulation of elbow",
    "latitude": -7,
    "longitude": 24,
    "userId": 11,
    "category": "Hole",
    "creationDate": "2020-09-07T03:35:18.000Z",
    "closeDate": "2021-07-11T15:10:00.000Z",
    "status": "open"
} as Complaint;

const voteMock = {
    'id': 10,
    'userId': 200,
    'complaintId': 100,
    'typeVote': 'complaintUpvote'
} as Votes;

const complaintWithVote = {
    "complaint_id": 1,
    "complaint_name": "Geno",
    "complaint_description": "Thyroid vessel ligation",
    "complaint_latitude": 31.975314,
    "complaint_longitude": 35.196042,
    "complaint_userId": 1,
    "complaint_category": "Hole",
    "complaint_creationDate": "2021-03-12T10:02:31.000Z",
    "complaint_closeDate": "2021-11-25T19:05:09.000Z",
    "complaint_status": "open",
    "vote_id": 101,
    "vote_userId": 1,
    "vote_complaintId": 1,
    "vote_typeVote": "complaintConfirmed"
};

const getVote = [    
    complaintWithVote,
{
    "complaint_id": 2,
    "complaint_name": "Doro",
    "complaint_description": "Colostomy NOS",
    "complaint_latitude": -6.85247,
    "complaint_longitude": 111.5587544,
    "complaint_userId": 2,
    "complaint_category": "Hole",
    "complaint_creationDate": "2020-04-20T09:29:31.000Z",
    "complaint_closeDate": "2021-10-01T09:17:05.000Z",
    "complaint_status": "wait",
    "vote_id": 111,
    "vote_userId": 1,
    "vote_complaintId": 2,
    "vote_typeVote": "complaintConfirmed"
}];

const waitVotes = [
    {
        "id": 10,
        "name": "Zamit",
        "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        "latitude": 16.504382,
        "longitude": 104.0304535,
        "userId": 78,
        "category": "Hole",
        "creationDate": "2020-08-27T05:02:38.000Z",
        "closeDate": "2020-10-08T14:23:52.000Z",
        "picture": "http://dummyimage.com/216x100.png/dddddd/000000",
        "status": "wait"
    },
    {
        "id": 11,
        "name": "Matsoft",
        "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        "latitude": -8.4164207,
        "longitude": 115.3459831,
        "userId": 19,
        "category": "Hole",
        "creationDate": "2020-04-01T08:01:32.000Z",
        "closeDate": "2020-12-25T09:44:53.000Z",
        "picture": "http://dummyimage.com/224x100.png/ff4444/ffffff",
        "status": "wait"
    }
] as Complaint[];

describe("complaints", () => {
    test("should take complaints from complaints()", async () => {
        jest.spyOn(ComplaintRepository.prototype, "getAllComplaints").mockImplementationOnce(() => Promise.resolve({
            complaints: [complaintMock],
            count: 100
        }))
        const controller = new ControllerComplaint();
        const mReq = {} as Request;
        mReq.query = {
            "skip": "10",
            "take": "5"
        };
        const mResp = mockResponse();
        await controller.complaints(mReq, mResp);
        expect(mResp.status).toHaveBeenCalledWith(200);
        expect(mResp.json).toHaveBeenCalledWith({
            complaints: [complaintMock],
            count: 100
        });
    });

    test("shouldn't take complaints from complaints()", async () => {
        jest.spyOn(ComplaintRepository.prototype, "getAllComplaints").mockImplementationOnce(() => Promise.reject(new Error()))
        const controller = new ControllerComplaint();
        const mReq = {} as Request;
        mReq.query = {
            "skip": "10",
            "take": "5"
        };
        const mResp = mockResponse();
        await controller.complaints(mReq, mResp);
        expect(mResp.status).toHaveBeenCalledWith(400);
    });
})

describe("Create complaints Tests", () => {
    test("should return status code 201", async () => {

        const controller = new ControllerComplaint();
        const mReq = {} as Request;
        mReq.body = {
            "name": "some-name",
            "description": "some-description",
            "latitude": 10,
            "longitude": -10,
            "userId": 0,
            "category": "Hole"
        };
        const mResp = mockResponse();

        jest.spyOn(ComplaintRepository.prototype, 'createComplaint').mockImplementation();

        await controller.create(mReq, mResp);
        expect(mResp.sendStatus).toHaveBeenCalledWith(201);
    });

    test("should return status code 400", async () => {
        const controller = new ControllerComplaint();
        const mReq = {} as Request;
        const mResp = mockResponse();

        jest.spyOn(ComplaintRepository.prototype, 'createComplaint').mockImplementation(() => { throw new Error() });

        await controller.create(mReq, mResp);
        expect(mResp.status).toHaveBeenCalledWith(400);
    });
});

describe('Create complaints Tests', () => {
	test('should return status code 201', async () => {
		const controller = new ControllerComplaint();
		const mReq = {} as Request;
		mReq.body = {
			name: 'some-name',
			description: 'some-description',
			latitude: 10,
			longitude: -10,
			userId: 0,
			category: 'Hole',
		};
		const mResp = mockResponse();

		jest.spyOn(
			ComplaintRepository.prototype,
			'createComplaint',
		).mockImplementation();

		await controller.create(mReq, mResp);
		expect(mResp.sendStatus).toHaveBeenCalledWith(201);
	});

	test('should return status code 400', async () => {
		const controller = new ControllerComplaint();
		const mReq = {} as Request;
		const mResp = mockResponse();

		jest.spyOn(
			ComplaintRepository.prototype,
			'createComplaint',
		).mockImplementation(() => {
			throw new Error();
		});

		await controller.create(mReq, mResp);
		expect(mResp.status).toHaveBeenCalledWith(400);
	});
});

describe('pong', () => {
	test('should return ping-pong for pong()', async () => {
		const controller = new ControllerComplaint();
		const mReq = {} as Request;
		const mResp = mockResponse();
		await controller.pong(mReq, mResp);
		expect(mResp.status).toHaveBeenCalledWith(200);
		expect(mResp.json).toHaveBeenCalledWith({ ping: 'pong' });
	});
});

describe('addVotes tests', () => {
	test('Success addVote case', async () => {
		const controller = new ControllerComplaint();
		const mReq = {} as Request;
		mReq.body = {
			complaintId: 32,
			typeVote: 'complaintConfirmed',
			userId: 65,
		};
		const mResp = mockResponse();
		jest.spyOn(VotesRepository.prototype, 'saveVote').mockImplementation();
		jest.spyOn(
			VotesRepository.prototype,
			'countVotesInComplaint',
		).mockImplementationOnce(() => Promise.resolve(10));
		jest.spyOn(
			ComplaintRepository.prototype,
			'update',
		).mockImplementation();
		jest.spyOn(
			ComplaintRepository.prototype,
			'getById',
		).mockImplementationOnce(() => Promise.resolve(complaintMock));
		await controller.addVote(mReq, mResp);
		expect(mResp.sendStatus).toHaveBeenCalledWith(200);
	});

	test('Wrong addVote case: missing field', async () => {
		const controller = new ControllerComplaint();
		const mReq = {} as Request;
		mReq.body = {
			complaintId: 32,
			typeVote: 'complaintConfirmed',
		};
		const mResp = mockResponse();
		await controller.addVote(mReq, mResp);

		expect(mResp.status).toHaveBeenCalledWith(400);
		expect(mResp.json).toHaveBeenCalledWith({
			msg: `Missing fields [userId]`,
		});
	});

	test('Wrong addVote case: Not found', async () => {
		const controller = new ControllerComplaint();
		const mReq = {} as Request;
		mReq.body = {
			complaintId: 32,
			typeVote: 'complaintConfirmed',
			userId: 65,
		};
		const mResp = mockResponse();
		await controller.addVote(mReq, mResp);
		jest.spyOn(ComplaintRepository.prototype, 'getById').mockImplementation(
			() => null,
		);
		expect(mResp.status).toHaveBeenCalledWith(400);
		expect(mResp.json).toHaveBeenCalledWith({
			error: 'Complaint not found',
		});
	});

	test('Success upVote case', async () => {
		const controller = new ControllerComplaint();
		const mReq = {} as Request;
		mReq.body = {
			complaintId: 32,
			typeVote: 'complaintUpvote',
			userId: 65,
		};
		const mResp = mockResponse();
		jest.spyOn(VotesRepository.prototype, 'saveVote').mockImplementation();
		jest.spyOn(
			VotesRepository.prototype,
			'countVotesInComplaint',
		).mockImplementationOnce(() => Promise.resolve(10));
		jest.spyOn(
			ComplaintRepository.prototype,
			'update',
		).mockImplementation();
		jest.spyOn(
			ComplaintRepository.prototype,
			'getById',
		).mockImplementationOnce(() => Promise.resolve(complaintMock));
		await controller.addVote(mReq, mResp);
		expect(mResp.sendStatus).toHaveBeenCalledWith(200);
	});

	test('Wrong addUpVote case: missing field', async () => {
		const controller = new ControllerComplaint();
		const mReq = {} as Request;
		mReq.body = {
			complaintId: 32,
			typeVote: 'complaintUpvote',
		};
		const mResp = mockResponse();
		await controller.addVote(mReq, mResp);

		expect(mResp.status).toHaveBeenCalledWith(400);
		expect(mResp.json).toHaveBeenCalledWith({
			msg: `Missing fields [userId]`,
		});
	});

	test('Wrong addUpVote case: Not found', async () => {
		const controller = new ControllerComplaint();
		const mReq = {} as Request;
		mReq.body = {
			complaintId: 32,
			typeVote: 'complaintUpvote',
			userId: 65,
		};
		const mResp = mockResponse();
		await controller.addVote(mReq, mResp);
		jest.spyOn(ComplaintRepository.prototype, 'getById').mockImplementation(
			() => null,
		);
		expect(mResp.status).toHaveBeenCalledWith(400);
		expect(mResp.json).toHaveBeenCalledWith({
			error: 'Complaint not found',
		});
	});
});

describe('getUserVotes test', () => {
	test('Wrong getUserVotes: null field', async () => {
		const controller = new ControllerComplaint();
		const mReq = {} as Request;
		mReq.query = {};
		const mResp = mockResponse();

		await controller.getUserVote(mReq, mResp);
		expect(mResp.status).toHaveBeenCalledWith(400);
		expect(mResp.json).toHaveBeenCalledWith({ error: 'User not found' });
	});
});

describe('list upvotes tests', () => {
	test('Success getUserVote case', async () => {
		const controller = new ControllerComplaint();
		const mReq = {} as Request;
		mReq.query = {
			userId: '1',
			take: '0',
			skip: '0',
		};
		const mResp = mockResponse();
		jest.spyOn(
			ComplaintRepository.prototype,
			'getComplaintsWithVotes',
		).mockImplementationOnce(() => Promise.resolve(getVote));
		await controller.getUserVote(mReq, mResp);
		expect(mResp.status).toHaveBeenCalledWith(200);
		expect(mResp.json).toHaveBeenCalledWith(getVote);
	});

	test('Wrong getUserVote case: missing userId', async () => {
		const controller = new ControllerComplaint();
		const mReq = {} as Request;
		mReq.query = {};
		const mResp = mockResponse();
		await controller.getUserVote(mReq, mResp);

		expect(mResp.status).toHaveBeenCalledWith(400);
		expect(mResp.json).toHaveBeenCalledWith({ error: 'User not found' });
	});
});

describe("Wait Complaints by Category", () => {
    test("Should return waiting complaints", async () => {
        const controller = new ControllerComplaint();
        const mReq = {} as Request;
        mReq.query = {
            "category": "Hole"
        };
        const mResp = mockResponse();
        jest.spyOn(ComplaintRepository.prototype, 'getWaitComplaints').mockImplementationOnce(() => Promise.resolve(waitVotes));
        await controller.waitComplaintsByCategory(mReq, mResp);
        expect(mResp.status).toHaveBeenCalledWith(200);
        expect(mResp.json).toHaveBeenCalledWith(waitVotes);
    });

    test("Should return error status", async () => {
        const controller = new ControllerComplaint();
        const mReq = {} as Request;
        mReq.query = {};
        const mResp = mockResponse();
        await controller.waitComplaintsByCategory(mReq, mResp);
        expect(mResp.status).toHaveBeenCalledWith(400);
        expect(mResp.json).toHaveBeenCalledWith({ "error": "Category is missing" });
    });
});
