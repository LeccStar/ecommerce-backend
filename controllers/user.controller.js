const User = require(`../models/user`)
const bcryptjs = require('bcryptjs')


const usersGet = async (req, res) => {
    //objeto con todos los usuarios v
    //const users = await User.find();
    const { desde = 0, limite = 5 } = req.query;

    /*     const users = await User.find()
            .sort(Number(desde))
            .limit(Number(limite));
    
        const total = await User.countDocuments(); */
    const [users, total] = await Promise.all(
        [
            User.find({ status: true })
                .skip(Number(desde))
                .limit(Number(limite)),
            User.countDocuments({ status: true })
        ]
    )

    res.json({
        users,
        total
    })
}
const usersPost = async (req, res) => {

    const user = new User(req.body)

    const existEmail = await User.findOne({ email: user.email })

    if (existEmail) {
        return res.status(400).json({
            "msg": "Ese correo ya está registrado"
        })
    }

    const salt = bcryptjs.genSaltSync()
    user.password = bcryptjs.hashSync(user.password, salt)

    //const crypto = require("crypto"), salt ="10";
    //user.password = crypto.pbkdf2Sync(user.password, salt, 10,512, "sha512").toString("hex")

    await user.save()

    res.json({
        "msg": "post",
        user
    })
}
const usersPut = async (req, res) => {

    const { id } = req.params
    const { _id, password, ...resto } = req.body;
    /*     if(password){
            const salt = bcryptjs.genSaltDync();
            resto.password = bcryptjs.hashSync(password,salt);
        }
     */

    const user = await User.findByIdAndUpdate(id, resto)

    res.json({
        "msg": "put",
        user
    })
}
const usersDelete = async (req, res) => {

    const { id } = req.params

    /*     const user = await User.findByIdAndDelete(id)
    */
    const user = await User.findByIdAndUpdate(id, { status: false })
    res.json({
        user,
        "msg": "delete"
    })
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete
}