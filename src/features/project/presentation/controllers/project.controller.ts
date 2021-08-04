import { Request, response, Response } from "express";
import { CacheRepository } from "../../../../core/infra/repositories/cache.repository";
import {
  DataNotFoundError,
  HttpRequest,
  HttpResponse,
  MvcController,
  notFound,
  ok,
  serverError,
} from "../../../../core/presentation";
import ProjectRepository from "../../infra/repositories/project.repository";

export class ProjectController implements MvcController {
  readonly #repository: ProjectRepository;
  readonly #cache: CacheRepository;

  constructor(repository: ProjectRepository, cache: CacheRepository) {
    this.#repository = repository;
    this.#cache = cache;
  }

  public async index() {
    try {
      // verifico se existe no cache
      const cache = await this.#cache.get("project:all");
      // valido se existe cache
      if (cache) {
        return ok(
          cache.map((project: any) =>
            Object.assign({}, project, {
              cache: true,
            })
          )
        );
      }

      const projects = await this.#repository.getProjects();

      await this.#cache.set("project:all", projects);

      return ok(projects);
    } catch (error) {
      return serverError();
    }
  }

  async delete(request: HttpRequest): Promise<HttpResponse> {
    const { uid } = request.params;

    try {
      const result = await this.#repository.delete(uid);
      return ok(result);
    } catch (error) {
      return serverError();
    }
  }

  async store(request: HttpRequest): Promise<HttpResponse> {
    try {
      const result = await this.#repository.create(request.body);

      await this.#cache.del("project:all");

      return ok(result);
    } catch (error) {
      return serverError();
    }
  }

  public async show(request: HttpRequest): Promise<HttpResponse> {
    const { uid } = request.params;

    try {
      // consulto o cache
      const cache = await this.#cache.get(`project:${uid}`);
      if (cache) {
        return ok(Object.assign({}, cache, { cache: true }));
      }

      const project = await this.#repository.getProject(uid);
      if (!project) {
        return notFound(new DataNotFoundError());
      }

      await this.#cache.setex(`project:${uid}`, project, 20);

      return ok(project);
    } catch (error) {
      return serverError();
    }
  }

  async update(request: HttpRequest): Promise<HttpResponse> {
    const { uid } = request.params;
    console.log(request.body);

    try {
      const result = await this.#repository.update(uid, request.body);

      return ok(result);
    } catch (error) {
      console.log(error);
      return serverError();
    }
  }
}
