export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
  }
}

export class FetchPriceDataError extends Error {
  constructor(message) {
    super(message);
    this.name = "FetchPriceDataError";
  }
}
