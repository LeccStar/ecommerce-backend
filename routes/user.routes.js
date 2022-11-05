const bodyParser = require("body-parser");
const { Router } = require(`express`)
const router = Router();
const jsonParser = bodyParser.json()
const { usersGet, usersPost, usersPut, usersDelete } = require("../controllers/user.controller")
const {body, check}= require("express-validator");
const { validateFields, validateJWT } = require("../middlewares/");
const categoryExists = require("../helpers/validate-db");

router.get("/",validateJWT, usersGet);
router.post("/",
 [
    validateJWT,
    jsonParser,
    body(`email`,`Email invalid`).isEmail(),
    body(`name`, `Name is required`).not().isEmpty(),
    body(`lastName`, `lastName is required`).not().isEmpty(),
    body(`password`, `password must contain more than 6 characters`).isLength({min: 6}),
    validateFields
/* body(`sex`,`sex invalid`).isIn([`Hombre`,`Mujer`]) */
] ,
usersPost);
router.put("/:id",[
    check("id","No MongoId").isMongoId(),
    check("id").custom(categoryExists),
    validateJWT,
    jsonParser
], usersPut);
router.delete("/:id",validateJWT, usersDelete);

module.exports = router;