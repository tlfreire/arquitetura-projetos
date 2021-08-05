import { CacheRepository } from "../../../../../src/core/infra/repositories/cache.repository";
import {
  DataNotFoundError,
  HttpRequest,
  notFound,
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

const makeProjectResult = () => ({
  uid: "any_uid",
  name: "any_name",
  description: "any_description",
  startDate: new Date("2021-07-22"),
  endDate: new Date("2021-07-22"),
  userUid: "any_uid",
});

const makeRequestShow = (): HttpRequest => ({
  params: { uid: "any_uid" },
  body: {},
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
      const dataStore = makeRequestStore();
      await sut.store(dataStore);

      expect(createSpy).toHaveBeenCalledWith(dataStore.body);
    });

    test("Deve apagar o Cache quando chamar o store com valores corretos", async () => {
      const delSpy = jest.spyOn(CacheRepository.prototype, "del");

      const sut = makeSut();
      const dataStore = makeRequestStore();
      await sut.store(dataStore);

      expect(delSpy).toHaveBeenCalledWith("project:all");
    });
  });

  // Testar o INDEX do Project Controller
  describe("Index", () => {
    test("Deveria retornar 500 quando acontece um error", async () => {
      jest
        .spyOn(CacheRepository.prototype, "get")
        .mockRejectedValue(new Error());

      // SUT
      const sut = makeSut();
      const result = await sut.index();

      expect(result).toEqual(serverError());
    });

    test("Deveria retornar a lista de Projetos", async () => {
      jest
        .spyOn(ProjectRepository.prototype, "getProjects")
        .mockResolvedValue([makeProjectResult()]);

      const getSpy = jest
        .spyOn(CacheRepository.prototype, "get")
        .mockResolvedValue(null);

      const setSpy = jest.spyOn(CacheRepository.prototype, "set");

      // SUT
      const sut = makeSut();
      await sut.index();

      expect(getSpy).toHaveBeenCalledWith("project:all");
      expect(setSpy).toHaveBeenCalledWith("project:all", [makeProjectResult()]);
    });

    test("Deveria retornar 200 se houver projetos em cache", async () => {
      jest
        .spyOn(CacheRepository.prototype, "get")
        .mockResolvedValue([makeProjectResult()]);

      // SUT
      const sut = makeSut();
      const result = await sut.index();

      expect(result).toEqual(
        ok([Object.assign({}, makeProjectResult(), { cache: true })])
      );
    });
  });

  describe("Show", () => {
    test("Deveria retornar 500 quando acontece um error", async () => {
      jest
        .spyOn(CacheRepository.prototype, "get")
        .mockRejectedValue(new Error());

      // SUT
      const sut = makeSut();
      const result = await sut.show(makeRequestShow());

      expect(result).toEqual(serverError());
    });

    test("Deveria retornar 404 se o projeto não existir", async () => {
      jest.spyOn(CacheRepository.prototype, "get").mockResolvedValue(null);

      jest
        .spyOn(ProjectRepository.prototype, "getProject")
        .mockResolvedValue(undefined);

      const sut = makeSut();
      const result = await sut.show(makeRequestShow());

      expect(result).toEqual(notFound(new DataNotFoundError()));
    });

    test("Deveria retornar 200 se o projeto existir", async () => {
      const getSpy = jest
        .spyOn(CacheRepository.prototype, "get")
        .mockResolvedValue(null);

      const setSpy = jest.spyOn(CacheRepository.prototype, "setex");

      jest
        .spyOn(ProjectRepository.prototype, "getProject")
        .mockResolvedValue(makeProjectResult());

      const sut = makeSut();
      const result = await sut.show(makeRequestShow());

      expect(result).toEqual(ok(makeProjectResult()));
      expect(getSpy).toHaveBeenLastCalledWith(
        `project:${makeProjectResult().uid}`
      );
      expect(setSpy).toHaveBeenLastCalledWith(
        `project:${makeProjectResult().uid}`,
        makeProjectResult(),
        20
      );
    });

    test("Deveria retornar 200 se o projeto existir", async () => {
      const getSpy = jest
        .spyOn(CacheRepository.prototype, "get")
        .mockResolvedValue(makeProjectResult());

      const sut = makeSut();
      const result = await sut.show(makeRequestShow());

      expect(result).toEqual(
        ok(Object.assign({}, makeProjectResult(), { cache: true }))
      );

      expect(getSpy).toHaveBeenLastCalledWith(
        `project:${makeProjectResult().uid}`
      );
    });
  });
});
