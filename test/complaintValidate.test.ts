import ComplaintUpvote from '../src/utils/ComplaintUpvote';
import ComplaintVoteConfirmed from '../src/utils/ComplaintVoteConfirmed';
import { Complaint } from '../src/entity/Complaint';
import { ComplaintRepository } from '../src/repositories/ComplaintRepository';

const complaintMock = {
	id: 11,
	name: 'Geri',
	description: 'Disarticulation of elbow',
	latitude: -7,
	longitude: 24,
	userId: 'J5XePUMKi9XJdrs1L4zbYgB8haUY',
	category: 'Hole',
	creationDate: '2020-09-07T03:35:18.000Z',
	closeDate: '2021-07-11T15:10:00.000Z',
	status: 'open',
} as Complaint;

describe('Complaint Upvote test', () => {
	const complaintVote = new ComplaintUpvote();
	const complaintRepository = new ComplaintRepository();

	test('test validate upvote', async () => {
		complaintRepository.update = jest.fn(() => Promise.resolve());
		await complaintVote.validateVote(
			10,
			complaintMock,
			9,
			complaintRepository,
		);
		expect(complaintRepository.update).toBeCalled();
	});
});

describe('Complaint Confirmed Vote test', () => {
	const complaintVote = new ComplaintVoteConfirmed();
	const complaintRepository = new ComplaintRepository();

	test('test validate upvote', async () => {
		complaintRepository.update = jest.fn(() => Promise.resolve());
		await complaintVote.validateVote(
			10,
			complaintMock,
			9,
			complaintRepository,
		);
		expect(complaintRepository.update).toBeCalled();
	});
});
