const { Router } = require("express");
const { check } = require("express-validator");
const { productsGet, productsGetById } = require("../controllers/product.controller");
const { productExists } = require("../helpers/validate-db");
const { validateFields } = require("../middlewares/validate-fields");
const router = Router()

router.get('/', productsGet);

router.get('/:id', [
    check('id', 'No Mongo id').isMongoId,
    check('id').custom(productExists),
    validateFields
] , productsGetById)

module.exports = router
