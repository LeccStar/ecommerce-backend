const { Schema, model } = require(`mongoose`)

const userSchema = Schema({
    name: {
        type: String,
        required: [true, `Name required`],
    },
    lastName: {
        type: String,
        required: [true, `Last name required`]
    },
    email: {
        type: String,
        unique: [true, `Email has been already used`]
    },
    address: {
        type: String,
        default:''
    },
    cp: {
        type: String,
        default:''
    },
    city: {
        type: String,
        default:''
    },
    state: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default:''
    },
    password: {
        type: String,
        required: [true, `Password required`]
    },
    status: {
        type: Boolean,
        default: true
    }
});

userSchema.methods.toJSON = function () {
    const {__v, password,_id, ...user} = this.toObject();
    user.uid = _id
    return user
}

module.exports = model(`User`, userSchema);