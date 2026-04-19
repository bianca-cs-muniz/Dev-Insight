export default class AppException extends Error {
  constructor(public readonly status: number, public readonly message: string) {
    super(message);
    this.name = 'AppException';
  }
}

export class RateLimitException extends AppException {
  constructor() {
    super(403, 'Limite de requisições ao GitHub atingido. Tente novamente mais tarde.');
  }
}

export class NotFoundException extends AppException {
  constructor(message: string) {
    super(404, message);
  }
}
