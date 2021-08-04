import { Router } from "express";
import { CacheRepository } from "../../../../core/infra/repositories/cache.repository";
import {
  EMvc,
  middlewareAdapter,
  MvcController,
  routerMvcAdapter,
} from "../../../../core/presentation";
import ProjectRepository from "../../infra/repositories/project.repository";
import { ProjectController } from "../controllers";
import { ProjectMiddleware } from "../middlewares";

const makeController = (): MvcController => {
  const repository = new ProjectRepository();
  const cache = new CacheRepository();
  return new ProjectController(repository, cache);
};

export default class ProjectRoutes {
  public init(): Router {
    const routes = Router();

    routes.get("/projects", routerMvcAdapter(makeController(), EMvc.INDEX));
    routes.get("/projects/:uid", routerMvcAdapter(makeController(), EMvc.SHOW));

    routes.post(
      "/projects",
      middlewareAdapter(new ProjectMiddleware()),
      routerMvcAdapter(makeController(), EMvc.STORE)
    );

    routes.put(
      "/projects/:uid",
      routerMvcAdapter(makeController(), EMvc.UPDATE)
    );

    routes.delete(
      "/projects/:uid",
      routerMvcAdapter(makeController(), EMvc.DELETE)
    );

    return routes;
  }
}
