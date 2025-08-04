import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDB1754199468251 implements MigrationInterface {
    name = 'InitDB1754199468251'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task" ("id" SERIAL NOT NULL, "title" character varying(255), "description" character varying(255), "position" integer, "is_deleted" boolean NOT NULL DEFAULT false, "column_id" integer, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "task_pkey" ON "task" ("id") `);
        await queryRunner.query(`CREATE TABLE "columns" ("id" SERIAL NOT NULL, "name" character varying(255), "position" integer NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "board_id" integer, CONSTRAINT "PK_4ac339ccbbfed1dcd96812abbd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "columns_pkey" ON "columns" ("id") `);
        await queryRunner.query(`CREATE TABLE "board" ("id" SERIAL NOT NULL, "name" character varying(255), "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "is_deleted" boolean NOT NULL DEFAULT false, "owner_id" integer, CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "board_pkey" ON "board" ("id") `);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(255), "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "users_pkey" ON "users" ("id") `);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_4a2a36bbbaf0cfd82029c9c84d6" FOREIGN KEY ("column_id") REFERENCES "columns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "columns" ADD CONSTRAINT "FK_3f88407849daf390e93035b15ef" FOREIGN KEY ("board_id") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "board" ADD CONSTRAINT "FK_cd3ee1b689dde31c328d2f0cc88" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" DROP CONSTRAINT "FK_cd3ee1b689dde31c328d2f0cc88"`);
        await queryRunner.query(`ALTER TABLE "columns" DROP CONSTRAINT "FK_3f88407849daf390e93035b15ef"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_4a2a36bbbaf0cfd82029c9c84d6"`);
        await queryRunner.query(`DROP INDEX "public"."users_pkey"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP INDEX "public"."board_pkey"`);
        await queryRunner.query(`DROP TABLE "board"`);
        await queryRunner.query(`DROP INDEX "public"."columns_pkey"`);
        await queryRunner.query(`DROP TABLE "columns"`);
        await queryRunner.query(`DROP INDEX "public"."task_pkey"`);
        await queryRunner.query(`DROP TABLE "task"`);
    }

}
