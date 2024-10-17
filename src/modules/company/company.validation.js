import joi from 'joi'
import { generalFields } from '../../middleware/validation.js'
export const addCompanyVal = joi.object({
    companyname:generalFields.companyname.required(),
    description:generalFields.description.required(),
    industry:generalFields.industry.required(),
    address:generalFields.adress.required(),
    numberOfEmployees:generalFields.numberOfEmployees.required(),
    companyemail:generalFields.companyemail.required()
})
//update company
export const updateCompanyVal = joi.object({
    _id:generalFields._id,
    companyname:generalFields.companyname,
    description:generalFields.description,
    industry:generalFields.industry,
    address:generalFields.adress,
    numberOfEmployees:generalFields.numberOfEmployees,
    companyemail:generalFields.companyemail
 
})