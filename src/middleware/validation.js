import joi from "joi"
import { AppError } from "../utils/appError.js"
const parseArray = (value, helper)=>{
    let data = JSON.parse(value)
    let schema = joi.array().items(joi.string())
    const {error} = schema.validate(data)
    if(error){
        return helper(error.details)
    }
    return true
}
export const generalFields = {
    firstname:joi.string().min(2).max(10),
    lastname:joi.string().min(2).max(10),
    username:joi.string().min(4).max(15),
    description:joi.string(),
    email:joi.string().email(),
    recoveryemail:joi.string().email(),
    mobilenumber:joi.string().pattern(new RegExp(/^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/)),
    password:joi.string().pattern(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)),
    DOB:joi.string(),
    jobtitle:joi.string(),
    joblocation:joi.string(),
    workingtime:joi.string(),
    seniorityLevel:joi.string(),
    jobDescription:joi.string(),
    technicalSkills:joi.string(),
    softSkills:joi.string(),
    industry:joi.string(),
    adress:joi.string(),
    numberOfEmployees:joi.object(),
    companyname:joi.string().min(2).max(5),
    companyemail:joi.string().email(),
    companyHR:joi.string(),
    jobid:joi.string().hex().length(24),
    userid:joi.string().hex().length(24),
    userTechSkills:joi.string(),
    userSoftSkills:joi.string(),
    userResume:joi.string(),
    oldPassword:joi.string(),
    newPassword:joi.string(),
    _id:joi.string()
    
}

export const isValid = (schema)=>{
    return (req,res,next)=>{
        let data = {...req.body,...req.params,...req.query}
        const{error}= schema.validate(data, {abortEarly:false})
        if(error){
            let errArr=[]
            error.details.forEach((err)=>{errArr.push(err.message)})
            return next(new AppError(errArr,400))
        }
        next()
    }

}