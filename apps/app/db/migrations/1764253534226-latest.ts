import { MigrationInterface, QueryRunner } from 'typeorm';

export class Latest1764253534226 implements MigrationInterface {
  name = 'Latest1764253534226';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "credentials" DROP CONSTRAINT "FK_8d3a07b8e994962efe57ebd0f20"`,
    );
    await queryRunner.query(
      `ALTER TABLE "credentials" DROP CONSTRAINT "UQ_8d3a07b8e994962efe57ebd0f20"`,
    );
    await queryRunner.query(`ALTER TABLE "credentials" DROP COLUMN "userId"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "credentialId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_d6d50143a16c49c49bf467ae541" UNIQUE ("credentialId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_d6d50143a16c49c49bf467ae541" FOREIGN KEY ("credentialId") REFERENCES "credentials"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_d6d50143a16c49c49bf467ae541"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_d6d50143a16c49c49bf467ae541"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "credentialId"`);
    await queryRunner.query(`ALTER TABLE "credentials" ADD "userId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "credentials" ADD CONSTRAINT "UQ_8d3a07b8e994962efe57ebd0f20" UNIQUE ("userId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "credentials" ADD CONSTRAINT "FK_8d3a07b8e994962efe57ebd0f20" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
