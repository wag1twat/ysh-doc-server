import { MigrationInterface, QueryRunner } from "typeorm";

export class Latest1764256519431 implements MigrationInterface {
    name = 'Latest1764256519431'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "attrs-groups" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, CONSTRAINT "UQ_27daaeaffcbeb8f0b926eee2b4f" UNIQUE ("name"), CONSTRAINT "PK_64f408c9e67249b0deee087ead8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "attrs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "groupId" uuid, CONSTRAINT "UQ_1babf53fb9bb2fb696af65ebc88" UNIQUE ("name"), CONSTRAINT "PK_b1392f8b269a234780eb6a50074" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "attrs" ADD CONSTRAINT "FK_e7a990b84b7e72fc8f68b22317d" FOREIGN KEY ("groupId") REFERENCES "attrs-groups"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attrs" DROP CONSTRAINT "FK_e7a990b84b7e72fc8f68b22317d"`);
        await queryRunner.query(`DROP TABLE "attrs"`);
        await queryRunner.query(`DROP TABLE "attrs-groups"`);
    }

}
