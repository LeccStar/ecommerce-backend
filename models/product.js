const { Schema, model } = require("mongoose");

const productsSchema = Schema({
    name: {
        type: String,
        required: [true, 'name required']
    },
    description: {
        type: String,
        required: [true,'description required']
    },
    status:{
        type:Boolean,
        default: true
    },
    imgUrl1:{
        type:String,
        default:""
    },
    imgUrl2:{
        type:String,
        default:""
    },
    imgUrl3:{
        type:String,
        default:""
    },
    price:{
        type: Number,
        required: [true, 'price required']
    },
    discount:{
        type: Boolean,
        default: false
    },
    discount_percentaje:{
    type: Number,
    default: 0
    }
});

module.exports = model ("Product", productsSchema)