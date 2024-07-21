class ResourceNotFoundError extends Error {
  statusCode: number;

  constructor(msg: string) {
    super(msg);
    this.statusCode = 404;

    Object.setPrototypeOf(this, ResourceNotFoundError.prototype);
  }
}

export default ResourceNotFoundError;
