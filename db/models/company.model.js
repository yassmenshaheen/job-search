
import { model, Schema } from "mongoose";
// schema
const companySchema =new Schema({
    companyname:{
        type:String,
        unique:true,
        required:true,
        trim:true

    },
    description:{
        type:String,
        required:true,
        trim:true
        
    },
    industry:{
        type:String,
        required:true,
        
    },
    address:{
        type:String,
        required:true,
        
    },
    numberOfEmployees:{
        from:{
            type:String
        },
        to:{
            type:String
        },

    },
    companyemail:{
        type:String,
        unique:true,
        trim:true,
        required:true
    },
    company_HR:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required: true,
        unique:true,

    }
},{timeStamp:true})
// model
export const Company = model('company', companySchema)