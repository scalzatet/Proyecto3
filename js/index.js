const express = require('express');
const app = express();
app.use(express.json());
const port = 7000;

const rutaUser = require('./rutas/user');
const rutaProducts = require('./rutas/products');

app.use('/user', rutaUser);
app.use('/products', rutaProducts);



app.listen(port, ()=>{
    console.log('Servidor corriendo de manera exitosa por el puerto ' + port);
});