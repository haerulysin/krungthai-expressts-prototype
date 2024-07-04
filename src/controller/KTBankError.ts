export class KTBankError extends Error {
  constructor(message?: object | string, public queryPath?: string, public httpStatusCode?:number) {
    super(typeof message === 'object' ? JSON.stringify(message) : message)
    this.name = "KTBankLoginError";
    this.queryPath = queryPath;
    this.httpStatusCode = httpStatusCode;
  }
}