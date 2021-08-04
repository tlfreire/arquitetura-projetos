import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableUser1625771064395 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          { name: "uid", type: "uuid", isPrimary: true },
          {
            name: "login",
            type: "varchar",
            length: "100",
            isUnique: true,
            isNullable: false,
          },
          {
            name: "password",
            type: "varchar",
            length: "100",
            isNullable: false,
          },
          { name: "created_at", type: "timestamp", isNullable: false },
          { name: "updated_at", type: "timestamp", isNullable: false },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users", true, true, true);
  }
}
