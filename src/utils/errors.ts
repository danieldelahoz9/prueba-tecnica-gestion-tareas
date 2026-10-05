// Clase base: todos nuestros errores tienen un mensaje y un código HTTP
export class AppError extends Error {
  public readonly statusCode: number;

  constructor(mensaje: string, statusCode: number) {
    super(mensaje);
    this.statusCode = statusCode;
    // El nombre de la clase servirá para identificar el tipo de error
    this.name = this.constructor.name;
  }
}

// 400: los datos enviados no son correctos
export class ValidationError extends AppError {
  constructor(mensaje: string = "Datos no válidos") {
    super(mensaje, 400);
  }
}

// 401: no está autenticado o el token no sirve
export class AuthenticationError extends AppError {
  constructor(mensaje: string = "No autenticado") {
    super(mensaje, 401);
  }
}

// 404: lo que se busca no existe (o no es del usuario)
export class NotFoundError extends AppError {
  constructor(mensaje: string = "Recurso no encontrado") {
    super(mensaje, 404);
  }
}

// 409: conflicto, por ejemplo un email ya registrado
export class ConflictError extends AppError {
  constructor(mensaje: string = "Conflicto con los datos existentes") {
    super(mensaje, 409);
  }
}