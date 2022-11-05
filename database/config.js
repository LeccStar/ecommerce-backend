const mongoose = require (`mongoose`)

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Base de datos en linea`);
    } catch (error) {
        throw new Error (`Error al conectar a la Base de Datos`)
    }
}

module.exports = dbConnection