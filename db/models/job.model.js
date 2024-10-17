import { model, Schema } from "mongoose";
import { location, seniorityLevel, workingTime } from "../../src/utils/constant/enum.js";


// schema
const jobSchema =new Schema({
    jobtitle:{
        type:String,
        required:true,
    },
    joblocation:{
        type:String,
        enum:Object.values(location),
        default:location.ONSITE
    },
    workingtime:{
        type:String,
        emun:Object.values(workingTime),
        default:workingTime.FULL_TIME

    },
    seniorityLevel:{
        type:String,
        enum:Object.values(seniorityLevel),
        default:seniorityLevel.SENIOR
    },
    jobDescription:{
        type:String,
        required:true

    },
    technicalSkills:[{
        type:String,
        required:true

    }],
    softSkills:[{
        type:String,
        required:true
    }],
    addedBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timeStamp:true})
// model
export const Job = model('job',jobSchema)