import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateComplaint1618526567509 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'tb_complaint',
				columns: [
					{
						name: 'id',
						type: 'int(11)',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment',
					},
					{
						name: 'name',
						type: 'varchar(255)',
						isNullable: false,
					},
					{
						name: 'description',
						type: 'varchar(255)',
						isNullable: false,
					},
					{
						name: 'latitude',
						type: 'double',
						isNullable: false,
					},
					{
						name: 'longitude',
						type: 'double',
						isNullable: false,
					},
					{
						name: 'userId',
						type: 'int(11)',
						isNullable: false,
					},
					{
						name: 'category',
						type: 'enum',
						enum: ['Hole', 'Water', 'Electricity'],
						isNullable: false,
					},
					{
						name: 'creationDate',
						type: 'datetime',
						isNullable: false,
						default: null,
					},
					{
						name: 'closeDate',
						type: 'datetime',
						isNullable: false,
					},
					{
						name: 'status',
						type: 'enum',
						enum: ['open', 'wait', 'finished'],
						default: "'open'",
						isNullable: false,
					},
					{
						name: 'picture',
						type: 'varchar(255)',
						isNullable: false,
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		queryRunner.dropTable('tb_complaint');
	}
}
