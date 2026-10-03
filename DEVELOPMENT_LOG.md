# Bitácora de Desarrollo

## Decisiones de arquitectura
(Por qué elegiste MongoDB, por qué esas librerías, cómo organizaste las carpetas)
se creo ya el entorno donde se va a trabajar, elegi las librerias:
express: es el que crea el servidor
mongose: conecta y trabaja con MongoDB 
bcrypt: es para encriptar las contraseñas
jsonwebtoken: genera y verifica los tokens JWT
dotenv: lee el archivo .env 
typescritp: es el lenguaje 
ts-node-dev: ejecuta TypeScript y reinicia el servidor al guardar.
@types/...: le enseñan a TypeScript cómo son esas librerías.

AHORA LA ORGANIZACION DE LA CARPETA SRC
api: define las rutas y los middlewares (la "puerta de entrada").
controllers: recibe la petición y responde.
services: contiene la lógica del negocio.
persistence: habla con la base de datos.
config: guarda la configuración (variables del .env).
utils: funciones de ayuda reutilizables.

en el archivo .env  escribí en el JWT_SECRET puse una frase con nombres reales y palabras sueltas pero eso lo hice por que es una prueba tecnica, pero ya en produccion se usaria de otra manera, la IA  me explico una linea de codigo que no conocia que se puede usar para generarla y es esta:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
## Uso de asistentes de IA
(Una entrada por cada uso significativo. Ver abajo)
me ayudo a crear el repositorio y conectarlo de manera precisa por que hace mucho no usaba git y tampoco github, cometi errores de codificacion y ortografia y me ayude con la IA claude para corregirlos, un ejemplo: escribí git log --online cuando en realidad era git log --oneline.



## Retos y soluciones
(Errores que tuviste y cómo los resolviste)