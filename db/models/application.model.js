import { model, Schema } from "mongoose";
// schema
const applicationSchema = new Schema({
    jobid:{
        type:Schema.Types.ObjectId,
        ref:"Job",
        required:true

    },
    userid:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true

    },
    userTechSkills:[{
        type:String,
        required:true
    }],
    userSoftSkills:[{
        type:String,
        required:true
    }],
    userResume:{
        type:Object,
    }
},{timeStamp:true})
// model
export const Application = model('application', applicationSchema)