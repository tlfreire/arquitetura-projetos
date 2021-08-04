import { Router } from "express";
import { CacheRepository } from "../../../../core/infra/repositories/cache.repository";
import {
  EMvc,
  middlewareAdapter,
  MvcController,
  routerMvcAdapter,
} from "../../../../core/presentation";
import TaskRepository from "../../infra/repositories/task.repository";
import { TaskController } from "../controllers";
import { TaskStoreMiddleware, TaskUpdateMiddleware } from "../middlewares";

const makeController = (): MvcController => {
  const repository = new TaskRepository();
  const cache = new CacheRepository();

  return new TaskController(repository, cache);
};

export default class TaskRoutes {
  public init(): Router {
    const routes = Router();

    routes.get("/tasks", routerMvcAdapter(makeController(), EMvc.INDEX));

    routes.get("/tasks/:uid", routerMvcAdapter(makeController(), EMvc.SHOW));

    routes.post(
      "/tasks", // Rota
      middlewareAdapter(new TaskStoreMiddleware()), // middleware
      routerMvcAdapter(makeController(), EMvc.STORE) // Controller
    );

    routes.put(
      "/tasks/:uid",
      middlewareAdapter(new TaskUpdateMiddleware()), // middleware
      routerMvcAdapter(makeController(), EMvc.UPDATE)
    );

    routes.delete(
      "/tasks/:uid",
      routerMvcAdapter(makeController(), EMvc.DELETE)
    );

    return routes;
  }
}
