class RequestError extends Error {
  constructor (message, status) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status || 400;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  RequestError
};
