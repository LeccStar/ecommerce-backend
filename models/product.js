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
    imgUrls:{
        type:Array,
        default:[]
    },
    category: {
        type:Schema.Types.ObjectId,
        ref: 'Category'
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