# Master

### Instalación

```sh
$ cd oop-backend
$ npm i --save
$ npm run dev
```

Para el uso es necesario un .env con lo siguiente:

```sh
PORT=4000
MONGO_URI=mongodb://localhost:27017/party? 
```

La aplicación correrá por defecto en:

```sh
localhost:4000/api/
```

Se divide depende su funcionalidad, es decir:

```sh
localhost:4000/api/challenge1/users/
localhost:4000/api/challenge2/users/
localhost:4000/api/challenge3/users/
```

(Tanto el challenge2 como el challenge3 comparten misma DB, por lo tanto tener cuidado en las validaciones)

Se hubiera podido hacer un Swagger peeero, la pereza me ganó :(


* [Reto1] - Usando ExpressJS 
* [Reto2] - Persistencia de datos
* [Reto3] - Validación de datos

**Esto ha sido todo,!Gracias por los retos, nos vemos pronto!**


[Reto1]: <https://github.com/MrTrukiny/wwc-backend-challenge-201-unresolved>
[Reto2]: <https://github.com/MrTrukiny/wwc-backend-challenge-202-unresolved>
[Reto3]: <https://github.com/MrTrukiny/wwc-backend-challenge-203-unresolved>


