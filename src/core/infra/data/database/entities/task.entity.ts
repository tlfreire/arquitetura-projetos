import {
  BaseEntity,
  BeforeInsert,
  BeforeRemove,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { ProjectEntity } from "./project.entity";

@Entity({ name: "tasks" })
export class TaskEntity extends BaseEntity {
  @PrimaryColumn()
  uid!: string;

  @Column({ name: "project_uid" })
  projectUid!: string;

  @Column()
  name!: string;

  @Column()
  description?: string;

  @Column({ name: "created_at" })
  createdAt!: Date;

  @Column({ name: "updated_at" })
  updatedAt!: Date;

  @ManyToOne((_) => ProjectEntity, (project) => project.tasks)
  @JoinColumn({ name: "project_uid", referencedColumnName: "uid" })
  project!: ProjectEntity;

  @BeforeInsert()
  private antesDeInserir() {
    this.uid = uuid();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  private atualizaUpdated() {
    this.updatedAt = new Date();
  }
}
