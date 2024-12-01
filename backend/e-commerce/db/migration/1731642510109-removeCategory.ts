import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveCategory1731642510109 implements MigrationInterface {
    name = 'RemoveCategory1731642510109'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderProduct" DROP CONSTRAINT "FK_1849f50aa2369002d09f4e03ca6"`);
        await queryRunner.query(`ALTER TABLE "orderProduct" ADD CONSTRAINT "FK_1849f50aa2369002d09f4e03ca6" FOREIGN KEY ("productsId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderProduct" DROP CONSTRAINT "FK_1849f50aa2369002d09f4e03ca6"`);
        await queryRunner.query(`ALTER TABLE "orderProduct" ADD CONSTRAINT "FK_1849f50aa2369002d09f4e03ca6" FOREIGN KEY ("productsId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
