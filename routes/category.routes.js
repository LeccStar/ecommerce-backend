const bodyParser = require("body-parser");
const {Router} = require("express")
const router = Router();
const jsonParser = bodyParser.json()
const {body} = require("express-validator");
const { categoriesGet, categoriesPost, categoriesPut, categoriesDelete } = require("../controllers/category.controller");
const{validateFields}= require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

router.get("/",categoriesGet);
router.post("/",[
    validateJWT,
    jsonParser,
    body("name", "Name is required").not().isEmpty(),
    validateFields
],categoriesPost);
router.put("/:id",jsonParser,categoriesPut);
router.delete("/:id",validateJWT,categoriesDelete)

module.exports = router