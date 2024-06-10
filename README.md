# Desafio modulo Backend

## Descripción general: 
La API tiene como objetivo crear, modificar y eliminar usuarios y publicaciones de haciendo uso de los conocimientos adquiridos durante el módulo de backend. 
Se implementas las herramientas de de JavaScript, Node, Express, Mongo, Mongoose y JWT.

## Instalación: 
Para inicialización del proyecto es necesario instalar algunas dependencias y paquetes:
-	**npm init -y** :   inicializa un nuevo proyecto de Node.js con valores predeterminados
-	**npm i express**: instala el framework Express.js para desarrollo de aplicaciones web para Node.js
-	**npm i mongoose**: instala la biblioteca de Mongoose, para modelado de datps para MongoDB y Node.js
-	**npm i dotenv**: instala la biblioteca dotenv, carga variables de entorno desde un archivo .env a process.env, permite configurar credenciales de base de datos o tokes de API.
-	**npm i http-errors**: instala biblioteca de http-errors, para crear errores HTTP, con diferentes códigos y mensajes personalizados.
-	**npm i bcryptjs**: es una biblioteca utilizada para el hashing de contraseñas en aplicaciones Node.js. Proporciona funciones para cifrar contraseñas utilizando el algoritmo de cifrado bcrypt.
-	**npm i jsonwebtoken**: es una biblioteca que permite generar y verificar tokens de autenticación JSON Web Tokens (JWT) en aplicaciones Node.js
-	**npm i cors**: permitiéndote manejar las solicitudes de origen cruzado

## Estructura: 
El proyecto esta divido en las siguientes carpetas y archivos. 

A primer nivel se encuentra el archivo index.js, donde se configura las rutas para servidor, base de datos, puerto y conexión al puerto.

El archivo example.env muestra un ejemplo de las variables que deberían incluir sen el archivo .env que contiene las credenciales para la  base de datos.

En segundo nivel se encuentra el archivo server.js contiene las rutas para el servidor. A este nivel se encuentran las carpetas: 

-	**lib**:  en el se encuentran los archivos de librerías para conexión con el servidor y archivos para encriptación de contraseñas de usuario. 
-	**middleware**:  contiene archivo middleware de autorización, verifica y valida el token de autorización.
-	**models**: guarda los esquemas de modelo para las publicaciones y usuarios. 
-	**routes**:  tiene los códigos de enrutador de express para realizar la autorización, crear y modificar usuarios y publicaciones. 
-	**usecases**: incluye los programas para los casos de uso relacionados con la gestión de usuarios y publicaciones.

## Funcionamiento de API y Endpoints: 
1.	**GET /post**: muestra las publicaciones realizadas, es posible realizar la petición con o sin autorización. Soporta el filtrado de los títulos con query params. Ej:
```
 http://localhost:PORT/posts/?title=title
 ```
2.	**POST /user**: se crea un nuevo usuario
```
{
    "name":"user_name",
    "ProfilePic":"http://url.img",
    "email":"user@email.com",
    "password":"user_pasword"
}
```
3.	**POST /auth/login**: ingreso de usuario, crea token de autorización.
```
{
    "email":" user@email.com ",
    "password":" user_pasword "
}
```
4.	**POST /post**: una vez ingresado el usuario puede crear una nueva publicación. 
```
{
    "title": "title",
    "image": " http://url.img ",
    "body": " user_pasword "
}
```
5.	PATCH /posts/:id : con la autorización de usuario también es posible editas el contenido de las publicaciones. Ej. edicion de titulo:
```
http://localhost:PORT/posts/ID
{
    "title": "title",
}
```
Sin embargo no se pueden editar los usuarios en las publicaciones. 

6.	**DELETE /posts/:id**: se puede eliminar una publicación si se inicio sesión (auth/login) y si se es el usuario que publico dicho post. 
```
http://localhost:PORT/posts/ID
```
