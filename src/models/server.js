const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/dbconfig');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersApiPath = '/api/v1/users';
        this.authPath = '/api/v1/auth';

        //Conexión a bd
        this.connDb();

        //Carga los middlewares
        this.middlewares();

        //Inicia rutas de la app
        this.routes();
    };

    //Método para abrir conexión a mongo
    async connDb() {
        await dbConnection();
    }

    //Método para cargar los middleware ofrecidos por express
    middlewares() {

        //CORS
        this.app.use(cors());

        //Lecutra y parseo de body en peticiones post, put, patch y delete en formato json
        this.app.use(express.json());
    }

    //Método para definir las rutas de express
    routes() {
        this.app.use(this.authPath, require('../v1/routes/authRoutes'));
        this.app.use(this.usersApiPath, require('../v1/routes/userRoutes'));
    }

    //Método para mostrar en qué puerto se sirvió la aplicación
    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`);
        });
    }

}


module.exports = Server;