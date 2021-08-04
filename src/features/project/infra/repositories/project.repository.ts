import { ProjectEntity } from "../../../../core/infra";
import { serverError } from "../../../../core/presentation";
import { Project } from "../../domain/models";

export default class ProjectRepository {
  private readonly teste = "";

  async getProjects(): Promise<Project[]> {
    const projects = await ProjectEntity.find();

    return projects.map((project) => {
      return {
        uid: project.uid,
        name: project.name,
        description: project.description,
        startDate: project.startDate,
        endDate: project.endDate,
        userUid: project.userUid,
      } as Project;
    });
  }

  async getProject(uid: string): Promise<Project | undefined> {
    const project = await ProjectEntity.findOne(uid);

    if (!project) return undefined;

    return {
      uid: project.uid,
      name: project.name,
      description: project.description,
      startDate: project.startDate,
      endDate: project.endDate,
      userUid: project.userUid,
    };
  }

  async create(params: Project): Promise<Project> {
    const { name, description, startDate, endDate, userUid } = params;

    const project = await ProjectEntity.create({
      name,
      description,
      startDate,
      endDate,
      userUid,
    }).save();

    return Object.assign({}, params, project);
  }

  async update(id: string, params: Project) {
    const { name, description, startDate, endDate, userUid } = params;

    const result = await ProjectEntity.update(id, {
      name,
      description,
      startDate,
      endDate,
      userUid,
    });

    return Object.assign({}, params, result);
  }

  async delete(id: string) {
    return await ProjectEntity.delete(id);
  }
}
