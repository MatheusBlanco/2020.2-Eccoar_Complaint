import { ComplaintWithVoteAndDistance } from '@utils/ComplaintWithVoteAndDIstance';
import { Complaint } from '../src/entity/Complaint';
import { ComplaintRepository } from '../src/repositories/ComplaintRepository';
import { Category } from '../src/utils/Category';

const complaintMock = {
	id: 11,
	name: 'Geri',
	description: 'Disarticulation of elbow',
	latitude: -7,
	longitude: 24,
	userId: 'DdZBkbNTDypv7Jg83jhPTZIEHwsQ',
	category: 'Hole',
	creationDate: '2020-09-07T03:35:18.000Z',
	closeDate: '2021-07-11T15:10:00.000Z',
	status: 'open',
	picture: null,
} as Complaint;

const getVoteWithDistance = [
	{
		complaint_id: 1,
		complaint_name: 'Sub-Ex',
		complaint_description:
			'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
		complaint_latitude: 36.275231,
		complaint_longitude: 113.310158,
		complaint_userId: 'J5XePUMKi9XJdrs1L4zbYgB8haUY',
		complaint_category: 'Water',
		complaint_creationDate: '2021-02-21T18:52:45.000Z',
		complaint_closeDate: '2020-11-11T05:41:31.000Z',
		complaint_picture: 'http://dummyimage.com/237x100.png/cc0000/ffffff',
		complaint_status: 'open',
		vote_id: null,
		vote_userId: null,
		vote_complaintId: null,
		vote_typeVote: null,
		complaint_distance: 0,
	},
] as ComplaintWithVoteAndDistance[];

const repositoryMock = {
	findOne: jest.fn(async () =>
		Promise.resolve({
			name: 'mockName',
			description: 'mockDescription',
			latitude: 10.0,
			longitude: 10.0,
			userId: 'DdZBkbNTDypv7Jg83jhPTZIEHwsQ',
			category: 'Hole' as Category,
			picture: null,
			status: 'open',
		} as Complaint),
	),

	save: jest.fn(async () => Promise.resolve(complaintMock)),

	createQueryBuilder: jest.fn(() => ({
		leftJoinAndSelect: jest.fn().mockReturnThis(),
		addSelect: jest.fn().mockReturnThis(),
		having: jest.fn().mockReturnThis(),
		orderBy: jest.fn().mockReturnThis(),
		take: jest.fn().mockReturnThis(),
		skip: jest.fn().mockReturnThis(),
		getRawMany: jest
			.fn()
			.mockReturnValueOnce(Promise.resolve(getVoteWithDistance)),
	})),

	find: jest.fn(async () => {
		return [
			{
				name: 'Stronghold',
				description:
					'suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus',
				latitude: 93.338,
				longitude: 68.8749,
				userId: 'DdZBkbNTDypv7Jg83jhPTZIEHwsQ',
				category: 'Hole',
				picture: 'http://dummyimage.com/221x100.png/5fa2dd/ffffff',
				status: 'wait',
			},
			{
				name: 'Hatity',
				description:
					'velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum',
				latitude: 24.081,
				longitude: 77.0881,
				userId: 'J5XePUMKi9XJdrs1L4zbYgB8haUY',
				category: 'Hole',
				picture: 'http://dummyimage.com/102x100.png/cc0000/ffffff',
				status: 'wait',
			},
		] as Complaint[];
	}),

	delete: jest.fn(async () => Promise.resolve()),
};

jest.mock('typeorm', () => {
	return {
		getRepository: () => repositoryMock,
		PrimaryGeneratedColumn: () => {
			null;
		},
		Column: () => {
			null;
		},
		OneToMany: () => {
			null;
		},
		ManyToOne: () => {
			null;
		},
		Entity: () => {
			null;
		},
		Unique: () => {
			null;
		},
		CreateDateColumn: () => {
			null;
		},
		JoinColumn: () => {
			null;
		},
	};
});

describe('Testing geolocation repository services', () => {
	test('should return nearby complaints', async () => {
		const result = await repositoryMock
			.createQueryBuilder()
			.leftJoinAndSelect()
			.addSelect()
			.having()
			.orderBy()
			.take()
			.skip()
			.getRawMany();
		const repository = new ComplaintRepository();
		repository.getNearbyComplaints('asdasdsa', -7, 24, 2 / 1.6, 0, 0);
		expect(result).toBe(getVoteWithDistance);
	});
});

describe('Get complaint by Id', () => {
	test('Should return complaint', async () => {
		const repository = new ComplaintRepository();
		const result = await repository.getById(1);
		expect(result).toStrictEqual({
			name: 'mockName',
			description: 'mockDescription',
			latitude: 10.0,
			longitude: 10.0,
			userId: 'DdZBkbNTDypv7Jg83jhPTZIEHwsQ',
			category: 'Hole' as Category,
			picture: null,
			status: 'open',
		});
	});
});

describe('Delete complaint', () => {
	test('Should delete complaint', async () => {
		const repository = new ComplaintRepository();
		await repository.deleteComplaint(1);
		expect(repositoryMock.delete).toHaveBeenCalled();
	});
});

describe('Get wait complaints', () => {
	test('Should return complaints of type hole and with status waiting', async () => {
		const repository = new ComplaintRepository();
		const result = await repository.getWaitComplaints('Hole' as Category);
		expect(result).toBeTruthy();
	});
});

describe('Create complaint', () => {
	test('Should create complaint', async () => {
		const repository = new ComplaintRepository();
		const result = await repository.createComplaint(complaintMock);
		expect(result).toBeTruthy();
	});
});
