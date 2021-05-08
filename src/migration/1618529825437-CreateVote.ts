import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateVote1618529825437 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'tb_votes',
				columns: [
					{
						name: 'id',
						type: 'int(11)',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment',
					},
					{
						name: 'userId',
						type: 'varchar(255)',
						isNullable: false,
					},
					{
						name: 'complaintId',
						type: 'int(11)',
						isNullable: false,
					},
					{
						name: 'typeVote',
						type: 'enum',
						enum: ['complaintUpvote', 'complaintConfirmed'],
						isNullable: false,
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		queryRunner.dropTable('tb_votes');
	}
}
