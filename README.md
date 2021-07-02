<p align="center">
  <img src="https://i.imgur.com/uhlBciY.png" alt="logo" width="400">
</p>
<br>

Officium Nest.js API es un servicio de backend desarrollado para la aplicación Officium elaborado utilizando los conceptos de "Arquitectura Hexagonal" o "Puertos y Adaptadores" para obtener una capa de dominio y capa de aplicación que se desacopla del framework principal, en este caso "Nest.js" y de otros detalles de implementación, como lo es la utilización de "TypeORM" incluido en "Nest.js" y "PostgreSQL".

### :page_facing_up: Tabla de Contenidos

---

Este README consiste de las siguientes partes, listadas a continuación:

- [Colaboradores de Desarrollo](#man_technologist-colaboradores-de-desarrollo)
- [Stack de Tecnologías](#computer-stack-de-tecnologías)
- [Instalación de la Aplicación](#wrench-instalación-de-la-aplicación)
- [Construcción de la Aplicación (build)](#hammer-construcción-de-la-aplicación-build)
- [Ejecución de la Aplicación](#electric_plug-ejecución-de-la-aplicación)
- [Ejecución de las Pruebas Automatizadas](#test_tube-ejecución-de-las-pruebas-automatizadas)
- [Referencias](#mag_right-referencias)

Adicionalmente, se utilizan las siguientes plantillas para el repositorio:

- [Commit](https://github.com/OrangeSoft-Team/readme-guide/blob/main/Commit.md)
- [Pull Request](https://github.com/OrangeSoft-Team/readme-guide/blob/main/Pull_Request.md)
- [Issue](https://github.com/OrangeSoft-Team/readme-guide/blob/main/Issue.md)

### :man_technologist: Colaboradores de Desarrollo

---

| Nombre y Apellido    | Usuario    | Enlace                        |
| -------------------- | ---------- | ----------------------------- |
| Ricardo Salvatorelli | rsca7213   | https://github.com/rsca7213   |
| Brayan Quintero      | baquintero | https://github.com/baquintero |
| Daniel Jaspe         | danijaspe  | https://github.com/danijaspe  |

### :computer: Stack de Tecnologías

---

| Logo                                                                                                                                        | Tipo                       | Nombre     | Enlace de Descarga                       | Versión |
| ------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ---------- | ---------------------------------------- | ------- |
| <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" width="24">                                         | Lenguaje                   | TypeScript | https://www.typescriptlang.org/download  | 4.3     |
| <img src="https://nodejs.org/static/images/logo.svg" width="24">                                                                            | Ambiente de ejecución      | Node.js    | https://nodejs.org/en/download/          | 14.17.1 |
| <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Npm-logo.svg/1200px-Npm-logo.svg.png" width="24">                       | Manejador de Dependencias  | NPM        | https://www.npmjs.com/get-npm            | 6.4.13  |
| <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1200px-Postgresql_elephant.svg.png" width="24"> | Manejador de base de datos | PostgreSQL | https://www.postgresql.org/download/     | 13.1    |
| <img src="https://d33wubrfki0l68.cloudfront.net/e937e774cbbe23635999615ad5d7732decad182a/26072/logo-small.ede75a6b.svg" width="24">         | Framework                  | Nest.js    | https://docs.nestjs.com/#installation    | 7.16.5  |
| <img src="https://avatars.githubusercontent.com/u/32196900?s=400&v=4" width="24">                                                           | Testing                    | Jest       | https://jestjs.io/docs/getting-started   | 26.6.3  |
| <img src="https://prettier.io/icon.png" width="24">                                                                                         | Linter                     | Prettier   | https://prettier.io/docs/en/install.html | 7.1.1   |

### :wrench: Instalación de la Aplicación

---

Para realizar la instalación de la aplicación, es necesario realizar los siguientes pasos:

- Previo a la instalación de la aplicación, debe crear 2 bases de datos, para la misma, una base de datos de producción y una base de datos de testing.

  > El sistema provee soporte "out of the box" para PostgreSQL y SQLite. Se pueden agregar otros tipos de bases de datos, pero requerirá la instalación de sus librerías JavaScript/TypeScript respectivas.

  > **NOTA:** En caso de usar PostgreSQL, cree la base de datos previamente.

- Cree una copia local del repositorio en su dispositivo.

- Luego de descargar el repositorio, cambie el nombre del archivo `ejemplo.env` a `.env`, en este deberá colocar los datos de la base de datos de producción y la base de datos de pruebas o testing.

- Luego, ejecute el siguiente comando dentro de la carpeta para obtener el stack tecnológico de frameworks y librerías de las cuales depende la infraestructura de la aplicación:
  `npm install`

- Opcionalmente puede ejecutar el comando (en caso de que no se detecte el framework de testing al momento de ejecutarlos):
  `npm install -g jest`

### :hammer: Construcción de la Aplicación (build)

---

Para llevar a cabo la puesta en producción de esta aplicación, debe realizar los siguientes pasos:

- Ejecute el siguiente comando en una consola de comandos cualquiera situada en la carpeta de la aplicación:

  **Nota:** Este comando se encargara de preparar la aplicación para production, generando los archivos y colocándolos en la carpeta `/dist`

  `npm run build`

### :electric_plug: Ejecución de la Aplicación

---

Para la ejecución de la aplicación debe sencillamente escribir alguno de los siguientes dos comandos en una consola de comandos situada en la carpeta de la aplicación:

- Aplicación en modo desarrollo (development):

  `npm run start:dev`

- Aplicación en modo producción (production):

  `npm run start:prod`

### :test_tube: Ejecución de las Pruebas Automatizadas

---

Esta aplicación consta de tres tipos de pruebas automatizables ejecutables, las cuales se pueden ejecutar de manera individual o en conjunto a través de los siguientes comandos en una consola de comandos situada en la carpeta del proyecto:

- Todas las pruebas (unitarias, integración, aceptación):

  `npm run test`

- Pruebas unitarias:

  `npm run test:unit`

- Pruebas de integración:

  `npm run test:int`

- Pruebas de aceptación:

  `npm run test:acp`

- Ejecutar archivos especifico:

  `jest rutaArchivo/rutaCarpeta`

### :mag_right: Referencias

---

- [Domain Driven Design en TypeScript](https://khalilstemmler.com/articles/categories/domain-driven-design)
- [Documentación oficial de Nest.js](https://docs.nestjs.com/)
- [Ejemplo de "Clean Arquitecture" en Nest.js](https://github.com/hvpaiva/clean-architecture-nestjs)
- [Como crear "Value Objects" en TypeScript](http://xurxodev.com/como-crear-value-object-en-typescript/)
- [Ejemplos de código del libro "Essential TypeScript 4"](https://github.com/Apress/essential-typescript-4)
- [Implementación ejemplo de "Arquitectura Hexagonal" del libro "Get Your Hands Dirty On Clean Arquitecture" y estructura de carpetas recomendada](https://github.com/thombergs/buckpal)
- [Explicación de principios SOLID con ejemplos de código](https://www.baeldung.com/solid-principles)
- [Implementación de "Arquitectura Hexagonal" y explicación de conceptos utilizando código Dart](https://pub.dev/packages/flutter_clean_architecture)
- [Pruebas de integración de la base de datos utilizando Nest.js](https://medium.com/@salmon.3e/integration-testing-with-nestjs-and-typeorm-2ac3f77e7628)
- [Probar PostgreSQL, Nest.js y autentificación utilizando E2E testing](https://firxworx.com/blog/coding/nestjs-integration-and-e2e-tests-with-typeorm-postgres-and-jwt/)
- [Prueba E2E utilizando una base de datos de testing](https://github.com/igern/Nestjs-Typeorm-e2e-testing/blob/master/test/app.e2e-spec.ts)
