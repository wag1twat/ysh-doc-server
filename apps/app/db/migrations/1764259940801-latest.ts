import { MigrationInterface, QueryRunner } from "typeorm";

export class Latest1764259940801 implements MigrationInterface {
    name = 'Latest1764259940801'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attrs-groups_attributes_attrs" DROP CONSTRAINT "FK_79e9809b9d90d0d03b5eb68e587"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_79e9809b9d90d0d03b5eb68e58"`);
        await queryRunner.query(`ALTER TABLE "attrs-groups_attributes_attrs" RENAME COLUMN "attrsGroupsId" TO "attrs-groupsId"`);
        await queryRunner.query(`ALTER TABLE "attrs-groups_attributes_attrs" RENAME CONSTRAINT "PK_5ce65957416fd9ac70f0a04a616" TO "PK_8c7d91a0f968006933acf7744e5"`);
        await queryRunner.query(`CREATE INDEX "IDX_a42e6a04ec5b8c26cd11e386a6" ON "attrs-groups_attributes_attrs" ("attrs-groupsId") `);
        await queryRunner.query(`ALTER TABLE "attrs-groups_attributes_attrs" ADD CONSTRAINT "FK_a42e6a04ec5b8c26cd11e386a6b" FOREIGN KEY ("attrs-groupsId") REFERENCES "attr_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attrs-groups_attributes_attrs" DROP CONSTRAINT "FK_a42e6a04ec5b8c26cd11e386a6b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a42e6a04ec5b8c26cd11e386a6"`);
        await queryRunner.query(`ALTER TABLE "attrs-groups_attributes_attrs" RENAME CONSTRAINT "PK_8c7d91a0f968006933acf7744e5" TO "PK_5ce65957416fd9ac70f0a04a616"`);
        await queryRunner.query(`ALTER TABLE "attrs-groups_attributes_attrs" RENAME COLUMN "attrs-groupsId" TO "attrsGroupsId"`);
        await queryRunner.query(`CREATE INDEX "IDX_79e9809b9d90d0d03b5eb68e58" ON "attrs-groups_attributes_attrs" ("attrsGroupsId") `);
        await queryRunner.query(`ALTER TABLE "attrs-groups_attributes_attrs" ADD CONSTRAINT "FK_79e9809b9d90d0d03b5eb68e587" FOREIGN KEY ("attrsGroupsId") REFERENCES "attrs-groups"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
