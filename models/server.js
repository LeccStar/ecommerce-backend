const express = require("express");
const cors = require(`cors`);
const dbConnection = require("../database/config");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.connectDB();
        this.middlewares();
        this.routes()
    }

    async connectDB(){
        await dbConnection();
    }
    routes(){
        this.app.use(`/api/auth`, require(`../routes/auth.routes`));
        this.app.use(`/api/categories`, require(`../routes/category.routes`));
        this.app.use(`/api/users`, require(`../routes/user.routes`));
        this.app.use('/api/products',require('../routes/product.routes'))
    }
    middlewares(){
        this.app.use(cors())
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Este servidor está corriendo en el puerto ${this.port}`)
        })
    }
}

module.exports = Server