import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveCategory1731629986110 implements MigrationInterface {
    name = 'RemoveCategory1731629986110'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "description"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ADD "description" character varying NOT NULL`);
    }

}
