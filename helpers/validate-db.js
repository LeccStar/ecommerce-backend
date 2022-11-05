const Category = require("../models/categories")


const categoryExists = async (id) => {
    const categoryExist = await Category.findById(id);

    if (!categoryExist) {
        throw new Error(`id does not exist ${id}`)
    }
}

module.exports = categoryExists