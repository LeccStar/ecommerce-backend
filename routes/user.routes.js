const bodyParser = require("body-parser");
const { Router } = require(`express`)
const router = Router();
const jsonParser = bodyParser.json()
const { verifyUser, usersPost, usersPut, usersDelete, usersGetById } = require("../controllers/user.controller")
const {body, check}= require("express-validator");
const { validateFields, validateJWT } = require("../middlewares/");
const {categoryExists} = require("../helpers/validate-db");
const { verify } = require("jsonwebtoken");

router.get("/",validateJWT, verifyUser);
router.get('/:id',[
    validateJWT,
    check('id', 'No Mongo id').isMongoId(),
    validateFields
],usersGetById )
router.post("/",
 [
    jsonParser,
    body(`email`,`Email invalid`).isEmail(),
    body(`name`, `Name is required`).not().isEmpty(),
    body(`lastName`, `LastName is required`).not().isEmpty(),
    body(`password`, `Password must contain more than 6 characters`).isLength({min: 6}),
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