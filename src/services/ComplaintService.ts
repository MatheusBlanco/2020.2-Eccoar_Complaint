import { Complaint } from '@entity/Complaint';
import { ComplaintRepository } from '../repositories/ComplaintRepository';
import { Optional } from '@utils/Optional';
import { CheckFields } from '@utils/CheckFields';
import { BadRequest, NotFound } from '@utils/Error';

export class ComplaintService {
	complaintRepository: ComplaintRepository;

	constructor() {
		this.complaintRepository = new ComplaintRepository();
	}

	async create(complaint: Optional<Complaint, 'id'>): Promise<Complaint> {
		const missingFields = CheckFields(
			[
				'name',
				'description',
				'latitude',
				'longitude',
				'userId',
				'category',
			],
			complaint,
		);

		if (missingFields.length > 0) {
			throw new NotFound('Not Found');
		}
		const response = await this.complaintRepository.createComplaint(
			complaint,
		);
		return response;
	}
}
