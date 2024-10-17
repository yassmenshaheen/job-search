import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const signupVal = joi.object({
    firstname:generalFields.firstname.required(),
    lastname:generalFields.lastname.required(),
    username:generalFields.username.required(),
    email:generalFields.email.required(),
    recoveryemail:generalFields.recoveryemail.required(),
    mobilenumber:generalFields.mobilenumber.required(),
    password:generalFields.password.required(),
    DOB:generalFields.DOB
})

export const loginVal = joi.object({
    password:generalFields.password.required(),
    mobilenumber:generalFields.mobilenumber,
    email:generalFields.email,
    recoveryemail:generalFields.recoveryemail
})
export const updateUserVal = joi.object({
    _id:generalFields.userid,
    email:generalFields.email,
    mobilenumber:generalFields.mobilenumber,
    recoveryemail:generalFields.recoveryemail,
    DOB:generalFields.DOB,
    lastname:generalFields.lastname,
    firstname:generalFields.firstname
})
export const updatePasswordVal = joi.object({
    oldPassword:generalFields.oldPassword.required(),
    newPassword:generalFields.newPassword.required(),
    password:generalFields.password,
    email:generalFields.email
})