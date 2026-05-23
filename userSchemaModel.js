//userSchema.js

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const {Schema, model} = mongoose;


const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Must be name assign']
    },
    email: {
        type: String,
        required: [true, 'must be assign email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Must be assign password'],
        minlength: [6, 'password must 6 character or greater than 6 character'],
        select: false
    }
});


userSchema.pre('save', async function (next) {

    if(!this.isModified('password')) return;

    this.password = await bcrypt.hash(this.password, 12);

    


});


userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword,  userPassword);

};

userSchema.methods.createJWT = function () {
    const JWT_SECRET = '1f825ac907bbf7eecd3b06a63ea3e6086133d9a7af97d21922e1638878ad2bed';
    return jwt.sign({id: this._id, name: this.name}, JWT_SECRET, {expiresIn: '90d'});

};

const User = model('User', userSchema);

export default User;
