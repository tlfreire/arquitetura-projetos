import { CacheRepository } from "../../../../../src/core/infra/repositories/cache.repository";
import {
  HttpRequest,
  ok,
  serverError,
} from "../../../../../src/core/presentation";
import ProjectRepository from "../../../../../src/features/project/infra/repositories/project.repository";
import { ProjectController } from "../../../../../src/features/project/presentation/controllers";

// SUT
// System under test
const makeSut = (): ProjectController =>
  new ProjectController(new ProjectRepository(), new CacheRepository());

// Request do STORE para reaproveitar código
const makeRequestStore = (): HttpRequest => ({
  body: {
    name: "any_name",
    description: "any_description",
    startDate: new Date("2021-07-22"),
    endDate: new Date("2021-07-22"),
    userUid: "any_uid",
  },
  params: {},
});

describe("Project Controller", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  // Testar o STORE do Project Controller
  describe("Store", () => {
    test("Deveria retornar status 500 se houver erro", async () => {
      // Criar um metodo pro JEST ficar espionado um metodo ou resultado
      jest
        .spyOn(ProjectRepository.prototype, "create")
        .mockRejectedValue(new Error());

      // Criar o SUT
      const sut = makeSut();
      const result = await sut.store(makeRequestStore());
      expect(result).toEqual(serverError());
    });

    test("Deveria chamar o Repositorio com valores corretos", async () => {
      const createSpy = jest.spyOn(ProjectRepository.prototype, "create");
      // Criar o SUT
      const sut = makeSut();
      await sut.store(makeRequestStore());

      expect(createSpy).toHaveBeenCalledWith(makeRequestStore().body);
    });
  });
});
