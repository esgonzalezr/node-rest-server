const express = require('express');
const cors = require('cors');

class Server {

    //Nota: Las variables en JS por constructor se inicial y declaran sólo en el constructor.
    //no como en java que primero se declaran en la calse y luego se inicializan
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersApiPath = '/api/usuarios';

        //Middlewares
        this.middlewares();

        //Rutas de la app
        this.routes();
    }

    //Método para cargar los middleware ofrecidos por express
    middlewares() {

        //CORS
        this.app.use(cors());

        //Lecutra y parseo de body en peticiones post, put, patch y delete
        this.app.use( express.json() );

        // Se sirve la carpeta public 
        this.app.use(express.static('public'));
    }

    //Método para definir las rutas de express
    routes() {
        this.app.use(this.usersApiPath, require('../routes/user'));
    }

    //Método para mostrar en qué puerto se sirvió la aplicación
    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`);
        });
    }
}


module.exports = Server;