import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTableTasks1628099865079 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: "tasks",
            columns: [
              {
                name: "uid",
                type: "uuid",
                isPrimary: true,
              },
              {
                name: "name",
                type: "varchar",
                length: "150",
                isNullable: false,
              },
              {
                name: "description",
                type: "varchar",
                length: "500",
                isNullable: false,
                comment: "Descrição da tarefa",
              },
              {
                name: "project_uid",
                type: "uuid",
                isNullable: false,
              },
              { name: "created_at", type: "timestamp", isNullable: false },
              { name: "updated_at", type: "timestamp", isNullable: false },
            ],
            foreignKeys: [
              new TableForeignKey({
                columnNames: ["project_uid"],
                referencedColumnNames: ["uid"],
                referencedTableName: "projects",
                name: "fk_task_project",
              }),
            ],
          })
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("tasks", true, true, true);
      }
    }
    