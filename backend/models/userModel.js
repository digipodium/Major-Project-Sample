const {Schema, model} = require('../connection');

const myschema = new Schema({
    name : String,
    email : String,
    password : String,
    avatar: String,
    email_verified: {type : Boolean, default : false},
});



module.exports = model('users', myschema);