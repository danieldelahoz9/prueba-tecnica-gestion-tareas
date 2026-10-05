# API de Gestión de Tareas

API RESTful hecha con Node.js, Express, TypeScript y MongoDB. Permite registrarse, iniciar sesión y administrar tareas personales. Cada usuario solo ve y modifica sus propias tareas.

## Arquitectura

El proyecto está organizado en capas:

- `src/api`: rutas y middlewares (autenticación JWT, validación con AJV, manejo de errores).
- `src/controllers`: reciben la petición y responden.
- `src/services`: lógica de negocio.
- `src/persistence`: modelos y comunicación con MongoDB (Mongoose).
- `src/config`: configuración centralizada (patrón Singleton), base de datos y Swagger.
- `src/utils`: errores personalizados, esquemas de validación y tipos.

## Requisitos

- Node.js 18 o superior
- MongoDB corriendo en local

## Instalación

```bash
git clone https://github.com/danieldelahoz9/prueba-tecnica-gestion-tareas.git
cd prueba-tecnica-gestion-tareas
npm install
```

## Configuración del .env

Copia el archivo de ejemplo y completa los valores:

```bash
cp .env.example .env
```

Variables:

- `PORT`: puerto del servidor (por ejemplo 3000).
- `MONGODB_URI`: dirección de MongoDB (por ejemplo `mongodb://localhost:27017/gestion-tareas`).
- `JWT_SECRET`: texto largo y aleatorio para firmar los tokens.

## Ejecutar

```bash
npm run dev
```

El servidor queda en `http://localhost:3000`.

Otros comandos: `npm run build` compila a `dist`, y `npm start` ejecuta lo compilado.

## Documentación (Swagger)

Con el servidor corriendo: `http://localhost:3000/api-docs`

## Endpoints

| Método | Ruta | Descripción | Requiere token |
|---|---|---|---|
| POST | /auth/register | Registrar usuario | No |
| POST | /auth/login | Iniciar sesión | No |
| POST | /tasks | Crear tarea | Sí |
| GET | /tasks | Listar mis tareas | Sí |
| GET | /tasks/:id | Ver una tarea | Sí |
| PUT | /tasks/:id | Modificar una tarea | Sí |
| DELETE | /tasks/:id | Eliminar una tarea | Sí |

Para rutas protegidas se envía la cabecera `Authorization: Bearer <token>`.

## Decisiones principales

- Contraseñas guardadas con hash de bcrypt, nunca en texto plano.
- El id del usuario sale del token, no del cuerpo de la petición.
- Las consultas filtran por `_id` y por `usuario`, así nadie accede a tareas ajenas (responde 404).
- Errores personalizados y un manejador centralizado con respuesta JSON consistente.
- Validación de entradas con AJV.