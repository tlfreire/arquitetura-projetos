import { TaskEntity } from "../../../../core/infra/data/database/entities/task.entity";
import { Task } from "../../domain/models/taskmodel";

export default class TaskRepository {
  async getTasks(): Promise<Task[]> {
    const tasks = await TaskEntity.find();

    return tasks.map((task) => {
      return {
        uid: task.uid,
        name: task.name,
        description: task.description,
        projectUid: task.projectUid,
      };
    });
  }

  async getTask(uid: string): Promise<Task | undefined> {
    const task = await TaskEntity.findOne(uid);
    if (!task) {
      return undefined;
    }

    return {
      uid: task.uid,
      name: task.name,
      description: task.description,
      projectUid: task.projectUid,
    };
  }

  async create(params: Task): Promise<Task> {
    const { name, description, projectUid } = params;

    const task = await TaskEntity.create({
      name,
      description,
      projectUid,
    }).save();

    return Object.assign({}, params, task);
  }

  async update(uid: string, params: Task) {
    const { name, description, projectUid } = params;

    const result = await TaskEntity.update(uid, {
      name,
      description,
      projectUid,
    });
  }

  async delete(uid: string) {
    return await TaskEntity.delete(uid);
  }
}
