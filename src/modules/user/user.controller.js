import { nanoid } from 'nanoid'
import bcrypt, { compareSync, hashSync } from 'bcrypt'
import { User } from "../../../db/index.js"
import { AppError } from "../../utils/appError.js"
import { status } from "../../utils/constant/enum.js"
import { messages } from "../../utils/constant/message.js"
import { sendEmail } from "../../utils/email.js"
import { generateToken, verifyToken } from "../../utils/token.js"


//signup
export const signup = async (req , res , next)=>{
    // get data from req
    let {firstname , lastname, username, email, recoveryemail, password, mobilenumber, DOB} = req.body
     // check existance
     const userExist = await User.findOne({$or: [{email}, {password}]})
     if(userExist){
         return next(new AppError(messages.user.alreadyExist , 409))
     }
      // prepare data
    password = bcrypt.hashSync(password , 8) 
    const user = new User({
      firstname ,
      lastname,
      username,
      email,
      recoveryemail,
      password,
      mobilenumber,
      DOB
        
    })
     // add to db
     const createdUser = await user.save()
     if(!createdUser){
         return next(new AppError(messages.user.failToCreate , 500))
     }
       // generate token
    const token = generateToken({payload:{email}})
    // send email
     await sendEmail({to:email, subject:"verify your account",html:`<p>click on link to verify account <a href = "${req.protocol}://${req.headers.host}/user/verify/${token}">link</a></p>`})
     // send response
     return res.status(201).json({
        message:messages.user.createdSuccessfully,
        success:true,
        data:createdUser})

}
//verifyAccount
export const verifyAccount = async (req , res , next)=>{
    // get data from req
    const {token } = req.params
    const payload = verifyToken({token})
    await User.findOne({email:payload.email , status:status.OFFLINE},{status:status.ONLINE})
    return res.status(200).json({message:messages.user.verified , success:true})

}
//login
export const login = async (req,res,next)=>{
    // get data from req
    const {email, mobilenumber,password, recoveryemail} = req.body
    // check existance
    const userExist = await User.findOneAndUpdate({$or:[{email},{recoveryemail},{mobilenumber}]}, {status:status.ONLINE})
    if(!userExist){
        return next(new AppError(messages.user.invalidCredentials , 400))
    }
    // check password exist 
    const match = bcrypt.compareSync(password , userExist.password)
    if(!match){
        return next(new AppError(messages.user.invalidCredentials, 400))
    }
    // generate token 
    const token = generateToken({payload:{_id : userExist._id , email}})
    // send response
    return res.status(200).json({
        message:messages.user.loginSuccessfuly,
        success:true ,
         token
        })
}
//update user
export const updateUser = async(req,res,next)=>{
    // get data from req 
    const {email,mobilenumber,recoveryemail,DOB,lastname,firstname} = req.body
    const {_id} = req.params

    // check existance 
    const userExist = await User.findOne({$or:[{email},{mobilenumber},{_id}], _id:{$ne:req.authUser._id}})
    if(userExist){
        return next(new AppError(messages.user.alreadyExist, 409))
    }
    if(firstname){
        req.body.username = firstname + "" + User.lastname
    }
    else if(lastname){
        req.body.username = firstname + "" + User.lastname
    }
    else if (firstname && lastname){
        req.body.username = firstname + lastname
    }
     // update to db
     const updatedUser= await User.updateOne({_id:req.authUser._id}, req.body)
     if(!updatedUser){
         return next(new AppError(messages.user.failToUpdate, 500))
     }
         // send response
    return res.status(200).json({
        message:messages.user.updatedSuccessfully,
        success:true,
        data:updatedUser})
}
// delete user
export const deleteUser = async (req,res,next)=>{
    // get data from req
    const {_id} = req.params
   
    // check existance
    const userExist = await User.findByIdAndDelete({_id:req.authUser.id})
    if(!userExist){
       return  next(new AppError(messages.user.notFound, 404))
    }
    // send response
    return res.status(200).json({
        message:messages.user.deletedSuccessfully,
        success:true,
    
    })

}
// get user account
export const getUserAccount = async (req,res,next)=>{
    const userAccount = await User.find()
    if(!userAccount){
        next(new AppError(messages.user.notFound, 404))
    }
    return res.status(200).json({message:"Done",
        success:true,
        data:userAccount
    })

}
// get profile user
export const getProfileUser = async (req,res,next)=>{
    const {userId}= req.params 
    const userProfile = await User.findById(userId)
    if(!userProfile){
        next(new AppError(messages.user.notFound, 404))
    }
    return res.status(200).json({message:"Done",
        success:true,
        data:userProfile
    })

}
//update password
export const updatePassword = async (req,res,next)=>{
    let {email, oldPassword, newPassword} = req.body
    let user = await User.findOne({email})
    if(user && compareSync(oldPassword,user.password)){
        newPassword = bcrypt.hashSync(newPassword , 8)
        const updatedPass = await User.findOneAndUpdate({email},{password:newPassword})
        if(!updatedPass){
            next(new AppError("password or email in correct" ,401))
        }
    return res.status(201).json({message:messages.user.updatedSuccessfully,
        success:true,
        data:updatedPass
    })
    }
    

}
//forget password 
export const forgetPassword = async (req,res,next)=>{
    const {email} = req.body
    const otp = nanoid(6)
    await User.findOne({email,otp})
   return res.status(201).json({message:"Done",otp})

}
export const resetPassword = async(req,res,next)=>{
    let{email,otp,password} = req.body
    password = bcrypt.hashSync(password , 8) 
    const resetPass = await User.updateOne({email,otp},{password})
    if(!resetPass){
        next(new AppError("user not found or otp incorrect"))
    }
    return res.status(200).json({message:"Done",success:true,data:resetPass})

}
//get all accounts
export const getAllAccounts = async(req,res,next)=>{
    const {recoveryemail} = req.body
    const getAccounts = await User.find({recoveryemail})
    if(!getAccounts)(
        next(new AppError(messages.user.notFound),404)
    )
    return res.status(201).json({message:"Done",
        success:true,
        data:getAccounts
    })
}

