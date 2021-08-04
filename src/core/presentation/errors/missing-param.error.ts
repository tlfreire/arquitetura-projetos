export class MissingParamError extends Error {
  constructor(paramName: string) {
    super(`Faltou o parametro: ${paramName}`);
    this.name = "MissingParamError";
  }
}
