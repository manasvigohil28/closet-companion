// An error that carries an HTTP status code and a message safe to show the user.
export class HttpError extends Error {
  constructor(status, message, fields) {
    super(message)
    this.status = status
    this.fields = fields
  }
}

export const badRequest = (message, fields) => new HttpError(400, message, fields)
export const unauthorized = (message = 'Sign in to continue.') => new HttpError(401, message)
export const conflict = (message, fields) => new HttpError(409, message, fields)
export const notFound = (message = 'Not found.') => new HttpError(404, message)
