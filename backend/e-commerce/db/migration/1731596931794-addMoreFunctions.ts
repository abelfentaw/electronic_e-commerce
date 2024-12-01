import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMoreFunctions1731596931794 implements MigrationInterface {
    name = 'AddMoreFunctions1731596931794'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orderProduct" ("id" SERIAL NOT NULL, "product_unit_price" numeric(10,2) NOT NULL DEFAULT '0', "product_quantity" integer NOT NULL, "orderId" integer, "productsId" integer, CONSTRAINT "PK_8c89300e91ad0ff68f67e7037a9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orderShipping" ("id" SERIAL NOT NULL, "phone" character varying NOT NULL, "name" character varying NOT NULL DEFAULT ' ', "address" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "postalCode" character varying NOT NULL, "country" character varying NOT NULL, CONSTRAINT "PK_249140a703c9c2ff196586af172" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."order_status_enum" AS ENUM('processing', 'shipped', 'delivered', 'canceled')`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "orderAt" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."order_status_enum" NOT NULL DEFAULT 'processing', "shippedAt" TIMESTAMP, "deliveredAt" TIMESTAMP, "txRef" character varying, "total" numeric, "userId" integer, "addressShippingId" integer, CONSTRAINT "REL_0dc5cfb1aea2df54f5a2a31740" UNIQUE ("addressShippingId"), CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "review" ("id" SERIAL NOT NULL, "rating" integer NOT NULL, "comment" character varying NOT NULL, "userId" integer, "productsId" integer, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notification" ("id" SERIAL NOT NULL, "message" character varying NOT NULL, "read" boolean NOT NULL DEFAULT false, "userId" integer, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_roles_enum" AS ENUM('Admin', 'User')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "roles" "public"."users_roles_enum" array NOT NULL DEFAULT '{User}', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart_entity" ("id" SERIAL NOT NULL, "userId" integer, CONSTRAINT "PK_7ec8a182dc29da3b1df23408149" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart_item_entity" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "cartId" integer, "productId" integer, CONSTRAINT "PK_78ae62a20293127e6032c631762" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "price" numeric(10,2) NOT NULL DEFAULT '0', "stock" integer NOT NULL, "images" text array, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "categoryId" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "upload" ("id" SERIAL NOT NULL, "filename" character varying NOT NULL, "filepath" character varying NOT NULL, "size" integer NOT NULL, "mimetype" character varying NOT NULL, "productId" integer, CONSTRAINT "PK_1fe8db121b3de4ddfa677fc51f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_13e8b2a21988bec6fdcbb1fa741" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orderProduct" ADD CONSTRAINT "FK_16ed2dd2152e905b788b4302180" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orderProduct" ADD CONSTRAINT "FK_1849f50aa2369002d09f4e03ca6" FOREIGN KEY ("productsId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_0dc5cfb1aea2df54f5a2a31740e" FOREIGN KEY ("addressShippingId") REFERENCES "orderShipping"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_1337f93918c70837d3cea105d39" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_0b88ffc46a510d3298e14ac1cb8" FOREIGN KEY ("productsId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_1ced25315eb974b73391fb1c81b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_entity" ADD CONSTRAINT "FK_8edda4b36869b45de9624747e8a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_item_entity" ADD CONSTRAINT "FK_eabcbd5dff337a605c509c85abf" FOREIGN KEY ("cartId") REFERENCES "cart_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_item_entity" ADD CONSTRAINT "FK_f5ba5991f20d1b82b8d88d193fb" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_329b8ae12068b23da547d3b4798" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "upload" ADD CONSTRAINT "FK_ca00886c4e5467e6bd92f31dc68" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "upload" DROP CONSTRAINT "FK_ca00886c4e5467e6bd92f31dc68"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_329b8ae12068b23da547d3b4798"`);
        await queryRunner.query(`ALTER TABLE "cart_item_entity" DROP CONSTRAINT "FK_f5ba5991f20d1b82b8d88d193fb"`);
        await queryRunner.query(`ALTER TABLE "cart_item_entity" DROP CONSTRAINT "FK_eabcbd5dff337a605c509c85abf"`);
        await queryRunner.query(`ALTER TABLE "cart_entity" DROP CONSTRAINT "FK_8edda4b36869b45de9624747e8a"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_1ced25315eb974b73391fb1c81b"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_0b88ffc46a510d3298e14ac1cb8"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_1337f93918c70837d3cea105d39"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_0dc5cfb1aea2df54f5a2a31740e"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`);
        await queryRunner.query(`ALTER TABLE "orderProduct" DROP CONSTRAINT "FK_1849f50aa2369002d09f4e03ca6"`);
        await queryRunner.query(`ALTER TABLE "orderProduct" DROP CONSTRAINT "FK_16ed2dd2152e905b788b4302180"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_13e8b2a21988bec6fdcbb1fa741"`);
        await queryRunner.query(`DROP TABLE "upload"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "cart_item_entity"`);
        await queryRunner.query(`DROP TABLE "cart_entity"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_roles_enum"`);
        await queryRunner.query(`DROP TABLE "notification"`);
        await queryRunner.query(`DROP TABLE "review"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TYPE "public"."order_status_enum"`);
        await queryRunner.query(`DROP TABLE "orderShipping"`);
        await queryRunner.query(`DROP TABLE "orderProduct"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
