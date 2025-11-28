import { MigrationInterface, QueryRunner } from "typeorm";

export class Latest1764259797694 implements MigrationInterface {
    name = 'Latest1764259797694'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attr_group_attributes" DROP CONSTRAINT "FK_3a360b0e26502604c49d81b7774"`);
        await queryRunner.query(`ALTER TABLE "attr_group_attributes" ADD CONSTRAINT "FK_3a360b0e26502604c49d81b7774" FOREIGN KEY ("attr_id") REFERENCES "attrs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attr_group_attributes" DROP CONSTRAINT "FK_3a360b0e26502604c49d81b7774"`);
        await queryRunner.query(`ALTER TABLE "attr_group_attributes" ADD CONSTRAINT "FK_3a360b0e26502604c49d81b7774" FOREIGN KEY ("attr_id") REFERENCES "attrs"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
