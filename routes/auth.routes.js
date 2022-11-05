const { body } = require("express-validator");
const {Router} = require(`express`);
const { validateFields } = require("../middlewares/validate-fields");
const bodyParser = require("body-parser");
const { login } = require("../controllers/auth.controller");
const jsonParser = bodyParser.json();
const router = Router();


router.post(`/login`, [jsonParser,
    body(`email`,`Email invalid`).isEmail(),
    body(`password`, `Password is required`).not().isEmpty(),
    validateFields], login)

module.exports = router