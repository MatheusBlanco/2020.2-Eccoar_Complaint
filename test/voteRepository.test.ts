import { Votes } from '@entity/Votes';
import { DeleteResult } from 'typeorm';
import { VotesRepository } from '../src/repositories/VotesRepository';

const deleteMock = {
	raw: {},
	affected: 1,
} as DeleteResult;

const repositoryMock = {
	createQueryBuilder: jest.fn(() => ({
		delete: jest.fn(() => ({
			from: jest.fn(() => ({
				where: jest.fn(() => ({
					execute: jest.fn(() => Promise.resolve(deleteMock)),
				})),
			})),
		})),
	})),
	find: jest.fn(() => {
		return [
			{ userId: 10, complaintId: 73, typeVote: 'complaintUpvote' },
			{ userId: 100, complaintId: 100, typeVote: 'complaintUpvote' },
		] as Votes[];
	}),
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
		Entity: () => {
			null;
		},
		Unique: () => {
			null;
		},
		CreateDateColumn: () => {
			null;
		},
	};
});

describe('VotesRepository test', () => {
	test('Should remove vote', async () => {
		const repository = new VotesRepository();
		await repository.removeVote(10, 73, 'complaintUpvote');
		expect(repositoryMock.createQueryBuilder).toBeCalled();
	});
});
