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
import TaskRepository from "../../infra/repositories/task.repository";

export class TaskController implements MvcController {
  readonly #repository: TaskRepository;
  readonly #cache: CacheRepository;

  constructor(repository: TaskRepository, cache: CacheRepository) {
    this.#repository = repository;
    this.#cache = cache;
  }

  async store(request: HttpRequest): Promise<HttpResponse> {
    try {
      const result = await this.#repository.create(request.body);
      return ok(result);
    } catch (error) {
      return serverError();
    }
  }

  async index(request: HttpRequest): Promise<HttpResponse> {
    try {
      const tasks = await this.#repository.getTasks();
      return ok(tasks);
    } catch (error) {
      return serverError();
    }
  }

  async show(request: HttpRequest): Promise<HttpResponse> {
    const { uid } = request.params;

    try {
      const task = await this.#repository.getTask(uid);

      if (!task) {
        return notFound(new DataNotFoundError());
      }

      return ok(task);
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

  async update(request: HttpRequest): Promise<HttpResponse> {
    const { uid } = request.params;

    try {
      const result = await this.#repository.update(uid, request.body);
      return ok(result);
    } catch (error) {
      return serverError();
    }
  }
}
