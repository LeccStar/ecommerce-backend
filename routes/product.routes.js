const { Router } = require("express");
const { check } = require("express-validator");
const { productsGet, productsGetById, productsPut } = require("../controllers/product.controller");
const { productExists } = require("../helpers/validate-db");
const { validateFields } = require("../middlewares/validate-fields");
const router = Router()

router.get('/', productsGet);

router.get('/:id', [
    check('id', 'No Mongo id').isMongoId(),
    check('id').custom(productExists),
    validateFields
] , productsGetById)

router.put('/:id',[
    check('id','No MongoId').isMongoId(),
    check('id').custom(productExists),
    validateFields
], productsPut)

module.exports = router
