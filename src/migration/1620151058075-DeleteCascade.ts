import { MigrationInterface, QueryRunner } from 'typeorm';

export class DeleteCascade1620151058075 implements MigrationInterface {
	name = 'DeleteCascade1620151058075';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'ALTER TABLE `tb_complaint` CHANGE `creationDate` `creationDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)',
		);
		await queryRunner.query(
			'ALTER TABLE `tb_complaint` CHANGE `closeDate` `closeDate` datetime NULL',
		);
		await queryRunner.query(
			'ALTER TABLE `tb_complaint` CHANGE `picture` `picture` varchar(255) NULL',
		);
		await queryRunner.query(
			'CREATE UNIQUE INDEX `vote` ON `tb_votes` (`userId`, `complaintId`, `typeVote`)',
		);
		await queryRunner.query(
			'ALTER TABLE `tb_votes` ADD CONSTRAINT `FK_23ad7cf3a598ad32e06d630523c` FOREIGN KEY (`complaintId`) REFERENCES `tb_complaint`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'ALTER TABLE `tb_votes` DROP FOREIGN KEY `FK_23ad7cf3a598ad32e06d630523c`',
		);
		await queryRunner.query('DROP INDEX `vote` ON `tb_votes`');
		await queryRunner.query(
			"ALTER TABLE `tb_complaint` CHANGE `picture` `picture` varchar(255) NULL DEFAULT 'NULL'",
		);
		await queryRunner.query(
			"ALTER TABLE `tb_complaint` CHANGE `closeDate` `closeDate` datetime NULL DEFAULT 'NULL'",
		);
		await queryRunner.query(
			'ALTER TABLE `tb_complaint` CHANGE `creationDate` `creationDate` datetime(0) NOT NULL',
		);
	}
}
