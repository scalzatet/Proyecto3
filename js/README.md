# API Delilah Resto

API que permite la creación de un sistema de pedidos online para un restaurante. Como administrador del restaurante, podrás recibir pedidos, actualizarlos y realizarles seguimiento. Como cliente del restaurante, podrás registrarte y realizar pedidos con base a los productos que ofrecemos.

## Descargar el repositorio

Se necesita descargar el repositorio de GitHub. Para esto, se debe acceder al link proporcionado. Luego acceder al botón llamado Code o Código y descargar en ZIP la información. Posteriormente este archivo se debe descomprimir y abrir la carpeta en Visual Studio Code.

## Instalar dependencias

Una vez se abre el archivo descargado, se deben instalar las dependencias que se usaron a lo largo del proyecto. Para esto y una vez en Visual Studio, se debe abrir una nueva terminal y ejecutar el comando:

```bash
npm install
```

## Credenciales de usuario

Por otro lado, se debe de iniciar sesión en MySQL Workbench. En el archivo que se encuentra en la ruta Proyecto3/JS/db/index.js deberás reemplazar el usuario y contraseña que allí se indica (root, ejemplo_password), por tus credenciales para iniciar sesión en MySQL. Adicionalmente es importante aclarar que la api se realizó en el puerto 3307.

## Creación de base de datos

Se debe dirigir al archivo dbresto.sql que se encuentra dentro de la ruta  Proyecto3/JS/db/files/Selecciona todo su contenido, copialo y pegalo en nuevo SQL tab. El último paso es ejecutarlo para que se cree la base de datos y sus respectivas tablas.

## Iniciar el servidor

En Visual Studio, Se debe dirigir a la carpeta JS que fue descargada en los pasos previos. Luego, se debe abrir la terminal nuevamente y ejecutar el siguiente comando

```bash
node index.js
```

## Documentación 

Se debe revisar la información que se encuentra en el archivo yaml para crear, actualizar y / o eliminar usuarios, productos y pedidos utilizando Postman. Allí se aclara cuando es necesario enviar parámetros en peticiones y la información que se debe enviar en el body de las mismas.

## Endpoints

```bash
Pedidos
```

POST --> Crear pedido URL: http://localhost:7000/orders/create

GET  --> Consultar pedido URL: http://localhost:7000/orders/ URL: http://localhost:7000/orders/id

PUT --> Modificar pedido URL: http://localhost:7000/orders/id

DELTE --> Eliminar pedido URL: http://localhost:7000/orders/id

```bash
Productos
```

POST --> Crear producto URL: http://localhost:7000/products/

GET --> Consultar producto URL: http://localhost:7000/products/

PUT --> Modificar producto URL: http://localhost:7000/products/id

DELETE --> Eliminar producto URL: http://localhost:7000/products/id

```bash
Usuarios
```

POST --> Login usuario URL: http://localhost:7000/user/login

POST --> Crear usuario URL: http://localhost:7000/user/createuser

GET --> Consultar usuarios URL: http://localhost:7000/user/










