const { Router } = require("express");
const { productsGet, productsGetById } = require("../controllers/product.controller");
const router = Router()

router.get('/', productsGet);
router.get('/:id', productsGetById)

module.exports = router
