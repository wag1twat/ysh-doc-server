import { MigrationInterface, QueryRunner } from "typeorm";

export class Latest1764259479064 implements MigrationInterface {
    name = 'Latest1764259479064'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "attr_groups" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, CONSTRAINT "UQ_f779764bad9668c272329a9bd8e" UNIQUE ("name"), CONSTRAINT "PK_1ce8a8916abb34c52ae1fbb5f8b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "attr_group_attributes" ("attr_group_id" uuid NOT NULL, "attr_id" uuid NOT NULL, CONSTRAINT "PK_d77cfea51d958fbfe289bd1d6e3" PRIMARY KEY ("attr_group_id", "attr_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8a733d2e00fc92d4d638fd0b88" ON "attr_group_attributes" ("attr_group_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_3a360b0e26502604c49d81b777" ON "attr_group_attributes" ("attr_id") `);
        await queryRunner.query(`ALTER TABLE "attr_group_attributes" ADD CONSTRAINT "FK_8a733d2e00fc92d4d638fd0b881" FOREIGN KEY ("attr_group_id") REFERENCES "attr_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "attr_group_attributes" ADD CONSTRAINT "FK_3a360b0e26502604c49d81b7774" FOREIGN KEY ("attr_id") REFERENCES "attrs"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attr_group_attributes" DROP CONSTRAINT "FK_3a360b0e26502604c49d81b7774"`);
        await queryRunner.query(`ALTER TABLE "attr_group_attributes" DROP CONSTRAINT "FK_8a733d2e00fc92d4d638fd0b881"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3a360b0e26502604c49d81b777"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8a733d2e00fc92d4d638fd0b88"`);
        await queryRunner.query(`DROP TABLE "attr_group_attributes"`);
        await queryRunner.query(`DROP TABLE "attr_groups"`);
    }

}
