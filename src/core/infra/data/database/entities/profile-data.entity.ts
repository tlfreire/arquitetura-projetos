import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { UserEntity } from "./user.entity";

@Entity({ name: "profile_data" })
export class ProfileDataEntity extends BaseEntity {
  @PrimaryColumn()
  uid!: string;

  @Column({ name: "user_uid" })
  userUid!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  cpf!: string;

  @Column()
  phone?: string;

  @Column({ name: "created_at" })
  createdAt!: Date;

  @Column({ name: "updated_at" })
  updatedAt!: Date;

  @OneToOne((_) => UserEntity, (user) => user.profileData)
  @JoinColumn({ name: "user_uid", referencedColumnName: "uid" })
  user?: UserEntity;

  @BeforeInsert()
  private beforeInsert() {
    this.uid = uuid();
    this.createdAt = new Date(Date.now());
    this.updatedAt = new Date(Date.now());
  }

  @BeforeUpdate()
  private beforeUpdate() {
    this.updatedAt = new Date(Date.now());
  }
}
