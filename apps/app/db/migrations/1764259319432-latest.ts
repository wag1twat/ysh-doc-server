import { MigrationInterface, QueryRunner } from "typeorm";

export class Latest1764259319432 implements MigrationInterface {
    name = 'Latest1764259319432'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attrs" DROP CONSTRAINT "FK_e7a990b84b7e72fc8f68b22317d"`);
        await queryRunner.query(`CREATE TABLE "attrs-groups_attributes_attrs" ("attrsGroupsId" uuid NOT NULL, "attrsId" uuid NOT NULL, CONSTRAINT "PK_5ce65957416fd9ac70f0a04a616" PRIMARY KEY ("attrsGroupsId", "attrsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_79e9809b9d90d0d03b5eb68e58" ON "attrs-groups_attributes_attrs" ("attrsGroupsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_cc9046349cfb9bfd5e136bd85b" ON "attrs-groups_attributes_attrs" ("attrsId") `);
        await queryRunner.query(`ALTER TABLE "attrs" DROP COLUMN "groupId"`);
        await queryRunner.query(`ALTER TABLE "attrs-groups_attributes_attrs" ADD CONSTRAINT "FK_79e9809b9d90d0d03b5eb68e587" FOREIGN KEY ("attrsGroupsId") REFERENCES "attrs-groups"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "attrs-groups_attributes_attrs" ADD CONSTRAINT "FK_cc9046349cfb9bfd5e136bd85be" FOREIGN KEY ("attrsId") REFERENCES "attrs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attrs-groups_attributes_attrs" DROP CONSTRAINT "FK_cc9046349cfb9bfd5e136bd85be"`);
        await queryRunner.query(`ALTER TABLE "attrs-groups_attributes_attrs" DROP CONSTRAINT "FK_79e9809b9d90d0d03b5eb68e587"`);
        await queryRunner.query(`ALTER TABLE "attrs" ADD "groupId" uuid`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cc9046349cfb9bfd5e136bd85b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_79e9809b9d90d0d03b5eb68e58"`);
        await queryRunner.query(`DROP TABLE "attrs-groups_attributes_attrs"`);
        await queryRunner.query(`ALTER TABLE "attrs" ADD CONSTRAINT "FK_e7a990b84b7e72fc8f68b22317d" FOREIGN KEY ("groupId") REFERENCES "attrs-groups"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
