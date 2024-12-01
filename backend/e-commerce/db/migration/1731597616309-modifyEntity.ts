import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyEntity1731597616309 implements MigrationInterface {
    name = 'ModifyEntity1731597616309'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderShipping" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "orderShipping" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "orderShipping" DROP COLUMN "postalCode"`);
        await queryRunner.query(`ALTER TABLE "orderShipping" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "orderShipping" ADD "firstName" character varying NOT NULL DEFAULT ' '`);
        await queryRunner.query(`ALTER TABLE "orderShipping" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orderShipping" ADD "lastName" character varying NOT NULL DEFAULT ' '`);
        await queryRunner.query(`ALTER TABLE "orderShipping" ADD "additionalDirection" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "firstName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "lastName" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "orderShipping" DROP COLUMN "additionalDirection"`);
        await queryRunner.query(`ALTER TABLE "orderShipping" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "orderShipping" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "orderShipping" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orderShipping" ADD "country" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orderShipping" ADD "postalCode" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orderShipping" ADD "address" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orderShipping" ADD "name" character varying NOT NULL DEFAULT ' '`);
    }

}
