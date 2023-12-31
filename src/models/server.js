const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/dbconfig');

class Server {

    constructor() {
        
        this.app = express();
        this.port = process.env.PORT;
        
        this.authPath = '/api/v1/auth';
        this.categoriesPath = '/api/v1/categories'
        this.productsPath = '/api/v1/products'
        this.usersPath = '/api/v1/users';

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

        //Servir contenido estático
        this.app.use(express.static('src/public'));
    }

    //Método para definir las rutas de express
    routes() {
        this.app.use(this.authPath, require('../v1/routes/authRoutes'));
        this.app.use(this.categoriesPath, require('../v1/routes/categoriesRoutes'));
        this.app.use(this.productsPath, require('../v1/routes/productsRoutes'));
        this.app.use(this.usersPath, require('../v1/routes/userRoutes'));
        this.app.use('*', require('../v1/routes/resourceNotFoundRoutes'));
    }

    //Método para mostrar en qué puerto se sirvió la aplicación
    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`);
        });
    }
}


module.exports = Server;