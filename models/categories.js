const {Schema, model} = require("mongoose")

const categorieSchema = Schema({
    name: {
        type: String,
        required: [true, "Name required"]
    },
    subcategories: {
        type: Array
    },
    status:{
        type: Boolean,
        default: true
    },
    imgUrl:{
        type:String,
        default:""
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:"User"
    }
});

module.exports = model ("Category", categorieSchema)