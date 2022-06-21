const express = require('express');
const cors = require('cors')
const { dbConnection } = require('./database/config');
require('dotenv').config();

// !Crear el servidor de express  1
const app = express();


// !Base de datos
dbConnection();

// !CORS
app.use( cors() )

// !Directorio público
app.use( express.static('public') );


// !Lectura y parseo del body
app.use( express.json() );

// !Rutas 3
// TODO: auth => crear, login, renew (token)
app.use('/register', require('./routes/auth'));

// TODO: CRUD => Eventos

// !Escuchar peticiones 2
app.listen(process.env.PORT, () => {
    console.log('servidor corriendo en puerto 3005')
})

