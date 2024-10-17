import { model, Schema } from "mongoose";
import { roles, status } from "../../src/utils/constant/enum.js";
// schema
const userSchema = new Schema({
    firstname:{
        type:String,
        required:true,
        minLingth:2,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        minLingth:2,
        trim:true

    },
    username:{
        type:String,
        required:true,
        minLingth:4,
        trim:true
        
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    recoveryemail:{
        type:String,
        required:true,
        lowercase:true, 
        trim:true

    },
    DOB:{type:String ,
        required:true,
         }, 
    mobilenumber:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    role:{
        type:String,
        enum:Object.values(roles),
        default:roles.USER 
    },
    status:{
        type:String,
        enum:Object.values(status),
        default:status.OFFLINE
}

},{timeStamp:true})
userSchema.pre("save", function(next){
    this.username = this.firstname + "" + this.lastname
    next()
})

// model
export const User= model('user' , userSchema)