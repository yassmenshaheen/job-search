import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const addJobVal = joi.object({
    jobtitle:generalFields.jobtitle.required(),
    joblocation:generalFields.joblocation.required(),
    workingtime:generalFields.workingtime.required(),
    seniorityLevel:generalFields.seniorityLevel,
    jobDescription:generalFields.description.required(),
    technicalSkills:generalFields.technicalSkills.required(),
    softSkills:generalFields.softSkills.required()
    

})
export const updateJobVal = joi.object({
    _id:generalFields._id,
    jobtitle:generalFields.jobtitle,
    joblocation:generalFields.joblocation,
    workingtime:generalFields.workingtime,
    seniorityLevel:generalFields.seniorityLevel,
    jobDescription:generalFields.description,
    technicalSkills:generalFields.technicalSkills,
    softSkills:generalFields.softSkills

})