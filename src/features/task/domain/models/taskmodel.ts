import { Project } from "../../../project/domain/models";

export interface Task {
  uid: string;
  name: string;
  description?: string;
  projectUid: string;
}
