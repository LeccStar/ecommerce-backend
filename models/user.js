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
    age: {
        type: String
    },
    email: {
        type: String,
        unique: [true, `Email has been already used`]
    },
    password: {
        type: String,
        required: [true, `Password required`]
    },
    status: {
        type: Boolean
    }
});

userSchema.methods.toJSON = function () {
    const {__v, password,_id, ...user} = this.toObject();
    user.uid = _id
    return user
}

module.exports = model(`User`, userSchema);