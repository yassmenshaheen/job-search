import { AppError } from "../utils/appError.js"
import { deleteCloudImage } from "../utils/cloud.js"


export const asyncHandler = (fn)=>{
    return (req,res,next)=>{
        fn(req,res,next).catch((err)=>{
            next(new AppError(err.message,err.statusCode))
        })
    }

}
export const globalErrorHandling = async (err,req,res,next)=>{
    // rollback cloud
    // if(req.failImage){
    //    await deleteCloudImage(req.failImage.public_id)
    // }
    // if(req.failImages?.length > 0){
    //     for (const public_id of req.failImages){
    //         await deleteCloudImage(public_id)
    //     }
    // }
    return res.status(err.statusCode|| 500).json({message:err.message ,success:false,
        code:err.statusCode || 500 , stack: err.stack
    })

}