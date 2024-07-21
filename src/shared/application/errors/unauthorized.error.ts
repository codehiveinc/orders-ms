class UnauthorizedError extends Error {
  statusCode: number;
  constructor(msg: string) {
    super(msg);
    this.statusCode = 401;

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export default UnauthorizedError;
