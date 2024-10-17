import { Router } from "express";
import { isValid } from "../../middleware/validation.js";
import { loginVal, signupVal, updatePasswordVal, updateUserVal } from "./user.validation.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { deleteUser, forgetPassword, getAllAccounts, getProfileUser, getUserAccount, login, resetPassword, signup, updatePassword, updateUser, verifyAccount } from "./user.controller.js";
import { isAuthenticated } from "../../middleware/authentication.js";

const userRouter = Router()
// signUp
userRouter.post('/signup',isValid(signupVal),asyncHandler(signup))
userRouter.get('/verify/:token',asyncHandler(verifyAccount))
// signIn
userRouter.post('/login' , isValid(loginVal),asyncHandler(login))
// update user
userRouter.put('/updateUser/:_id',isAuthenticated(),isValid(updateUserVal),updateUser)
// delete user
userRouter.delete('/deleteUser/:_id',isAuthenticated(),asyncHandler(deleteUser))
// get all users data
userRouter.get('/getUserAccount',asyncHandler(getUserAccount))
// get users profile
userRouter.get('/getProfileUser/:userId',asyncHandler(getProfileUser))
// update password  todo
userRouter.put('/updatePassword',isValid(updatePasswordVal),asyncHandler(updatePassword))
// for get password
userRouter.post('/forgetPassword',asyncHandler(forgetPassword))
 // reset password
userRouter.post('/resetPassword',asyncHandler(resetPassword))
 // get all account
userRouter.get('/getAllAccounts',asyncHandler(getAllAccounts))

export default userRouter