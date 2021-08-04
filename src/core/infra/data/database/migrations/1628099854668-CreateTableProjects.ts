import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTableProjects1628099854668 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: "projects",
            columns: [
              { name: "uid", type: "uuid", isPrimary: true },
              { name: "name", type: "varchar", length: "150", isNullable: false },
              {
                name: "description",
                type: "varchar",
                length: "100",
                isNullable: true,
              },
              { name: "start_date", type: "timestamp", isNullable: true },
              { name: "end_date", type: "timestamp", isNullable: true },
              { name: "user_uid", type: "uuid", isNullable: false },
              { name: "created_at", type: "timestamp", isNullable: false },
              { name: "updated_at", type: "timestamp", isNullable: false },
            ],
            foreignKeys: [
              new TableForeignKey({
                columnNames: ["user_uid"],
                referencedColumnNames: ["uid"],
                referencedTableName: "users",
                name: "project_users",
              }),
            ],
          })
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("projects", true, true, true);
      }
    }
    