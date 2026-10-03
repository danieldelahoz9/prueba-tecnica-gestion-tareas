# Bitácora de Desarrollo
Hola mi nombre es daniel de la hoz, tengo 32 años vivo en la ciudad de valledupar, tengo dos hijos una niña de 9 años y un bebe de 1 año y 11 meses, actualmente me encuentro desempleado y pues buscando las practicas de este tecgnologo que realice, voy a ser muy sincero yo desde que termine la etapa lectiva se me hizo dificil seguir practicando ya que me toca trabajar de mototaxi para llevar el sustento a mis hijos y es una actividad informal muy desgastante y que acapara mucho tiempo, pero no quiere decir que no tenga el conocimiento solo es falta de practica, si me estare ayudando con las herramientas de IA pero no para copiar y pegar si no para que me expliquen y poder recordar algunas cosas que se han quedado en el camino, tengo todas las ganas de hacer mis practicas y aprender mucho mas, se que le puedo aportar a la empresa y soy una persona comprometida con su trabajo, ahora si aca les dejo la bitacora de lo que se trabajo.

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

El tsconfig.json que generó tsc --init traía opciones que no eran adecuadas para Node con CommonJS (nodenext, types: [], rootDir comentado). Lo simplifiqué dejando solo las opciones que entiendo y necesito. Las quite por que prefiero strict solo, que ya cubre lo importante, y que no quería complicar el proyecto con reglas que no domino aún.

use async/await para la conexion y decidi conectar la base antes de abrir el servidor; porque sin base de datos la API no pued funcionar.
## Decisiones de arquitectura
(Por qué elegiste MongoDB, por qué esas librerías, cómo organizaste las carpetas)

## Uso de asistentes de IA
(Una entrada por cada uso significativo. Ver abajo)
me ayudo a crear el repositorio y conectarlo de manera precisa por que hace mucho no usaba git y tampoco github, cometi errores de codificacion y ortografia y me ayude con la IA claude para corregirlos, un ejemplo: escribí git log --online cuando en realidad era git log --oneline.



## Retos y soluciones
(Errores que tuviste y cómo los resolviste)