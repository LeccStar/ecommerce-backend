const Category = require("../models/categories");
const Product = require("../models/product");


const categoryExists = async (id) => {
    const categoryExist = await Category.findById(id);

    if (!categoryExist) {
        throw new Error(`id does not exist ${id}`)
    }
}

const productExists = async (id) => {
    const productExist = await Product.findById(id);

    if (!productExist) {
        throw new Error(`id does not exist ${id}`)
    }
}

module.exports = {categoryExists, productExists}