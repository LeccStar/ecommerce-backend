const Product = require('../models/product')


const productsGet = async (req, res) => {
    const { desde = 0, limite = 5 } = req.query;
    const [products, total] = await Promise.all(
        [
            Product.find({ status: true })
                .populate('category','name')
                .skip(Number(desde))
                .limit(Number(limite)),
            User.countDocuments({ status: true })
        ]
    ) 
    res.json({
        products,
        total
    })
}

const productsGetById = async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id).populate('category','name')
    ;

    res.json(product)
}

module.exports = {
    productsGet,
    productsGetById
}