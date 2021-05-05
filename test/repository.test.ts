import { Complaint } from '../src/entity/Complaint';
import { ComplaintRepository } from '../src/repositories/ComplaintRepository';
import { Category } from '../src/utils/Category';

const complaintMock = {
	id: 11,
	name: 'Geri',
	description: 'Disarticulation of elbow',
	latitude: -7,
	longitude: 24,
	userId: 11,
	category: 'Hole',
	creationDate: '2020-09-07T03:35:18.000Z',
	closeDate: '2021-07-11T15:10:00.000Z',
	status: 'open',
} as Complaint;

const repositoryMock = {
	findOne: jest.fn(async () =>
		Promise.resolve({
			name: 'mockName',
			description: 'mockDescription',
			latitude: 10.0,
			longitude: 10.0,
			userId: 1,
			category: 'Hole' as Category,
			picture: null,
			status: 'open',
		} as Complaint),
	),

	save: jest.fn(async () => Promise.resolve(complaintMock)),

	find: jest.fn(async () => {
		return [
			{
				name: 'Stronghold',
				description:
					'suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus',
				latitude: 93.338,
				longitude: 68.8749,
				userId: 33,
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
				userId: 50,
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

describe('Get complaint by Id', () => {
	test('Should return complaint', async () => {
		const repository = new ComplaintRepository();
		const result = await repository.getById(1);
		expect(result).toStrictEqual({
			name: 'mockName',
			description: 'mockDescription',
			latitude: 10.0,
			longitude: 10.0,
			userId: 1,
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
