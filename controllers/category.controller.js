const Category = require("../models/categories")

const categoriesGet = async (req, res) => {

    const {desde=0,limite=5} = req.query;

    const [categories, total]= await Promise.all([
        Category.find({status: true})
            .populate("user","name")
            .skip(Number(desde))
            .limit(Number(limite)),
        Category.countDocuments({status: true})
    ])

    res.json({
        categories,
        total
    })

}

const categoriesPost = async (req, res) => {
    const category = new Category(req.body)

    const existCategory = await Category.findOne({name: category.name});

    if (existCategory) {
        return res.status(400).json({
            "msg": "Esta categoría ya existe"
        })
    }

    await category.save()

    res.json({
        category
    })
}

const categoriesPut = async (req, res) => {

    const {id} = req.params
    const {_id,...resto} = req.body;

    const category = await Category.findByIdAndUpdate(id, resto)

    res.json({
        category
    })

}

const categoriesDelete = async (req, res) => {
    const {id} = req.params

    const category = await Category.findByIdAndUpdate(id, {status: false})

res.json({
    category
})
}

module.exports = {
    categoriesGet,
    categoriesPost,
    categoriesPut,
    categoriesDelete
}