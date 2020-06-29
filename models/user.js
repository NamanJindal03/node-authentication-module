const mongoose = require('mongoose');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true,
    },
    encry_password:{
        type: String,
        required: true,
    },
    salt: String
},{
    timestamps: true
})
userSchema.virtual("password")
    .set(function(password){
        this._password = password;
        this.salt = uuidv4();;
        //console.log(this.securePassword(password));
        this.encry_password = this.securePassword(password);
        //console.log(this.salt);
        //console.log(this.encry_password);
    })
    .get(function(){
        return this._password;
    })
userSchema.methods = {

    //compares the plainpassword with excrypted pass and returns true or false
    authenticate: function(plainpassword) {
        return this.securePassword(plainpassword) === this.encry_password;
    },
    //converts the plainpassword to encrypted using crypto
    securePassword: function(plainPassword){
        if(!plainPassword){
            return "";
        }
        try{
            return crypto.createHmac('sha256', this.salt)
            .update(plainPassword)
            .digest('hex')
        }catch(err){
            return "";
        }
    }
}
const User= mongoose.model('User',userSchema);
module.exports = User;