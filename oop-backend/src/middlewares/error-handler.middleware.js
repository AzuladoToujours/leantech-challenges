class ErrorHandler extends Error {
  constructor() {
    super();
    this.name = 'ErrorHandler';
    this.error = 'Ni idea qué pasó bro, te lo juro por Dieguito Maradona.';
    this.status = 400;
  }

  errorResponse(res) {
    return res.status(this.status).json({ error: `${this.error}` });
  }
}

module.exports = ErrorHandler;
