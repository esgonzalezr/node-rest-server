const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        //Esta conexión retorna una promesa
        await mongoose.connect(process.env.MONGODB);
        console.log('Conexión establecida a MongoDB');
    } catch (error) {
        console.log(error);
        throw new Error('Error conectándose a la base de datos.');
    }

}

module.exports = {
    dbConnection
}