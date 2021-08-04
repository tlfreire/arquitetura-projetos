import {
  badRequest,
  HttpMiddleware,
  HttpResponse,
  ok,
  RequireFieldsValidator,
} from "../../../../core/presentation";

export class TaskStoreMiddleware {
  async handle(req: HttpMiddleware): Promise<HttpResponse> {
    const { body } = req;

    for (const field of ["name", "description", "projectUid"]) {
      const error = new RequireFieldsValidator(field).validate(body);
      if (error) {
        return badRequest(error);
      }
    }

    return ok({});
  }
}

export class TaskUpdateMiddleware {
  async handle(req: HttpMiddleware): Promise<HttpResponse> {
    const { body } = req;

    for (const field of ["name", "projectUid"]) {
      const error = new RequireFieldsValidator(field).validate(body);
      if (error) {
        return badRequest(error);
      }
    }

    return ok({});
  }
}
