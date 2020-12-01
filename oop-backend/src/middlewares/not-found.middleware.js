class NotFoundError extends Error {
  constructor() {
    super();
    this.name = 'NotFoundError';
    this.error = 'Información no encontrada';
    this.status = 404;
  }

  errorResponse(res) {
    return res.status(this.status).json({ error: `${this.error}` });
  }
}

module.exports = NotFoundError;
