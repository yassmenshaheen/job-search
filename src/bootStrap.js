import { globalErrorHandling } from "./middleware/asyncHandler.js";
import { companyRouter, jobRouter, userRouter } from "./modules/index.js";
export const bootStrap=(app,express) => {
    //parse req
    app.use(express.json())
    //public folder
    app.use('/uploads',express.static('uploads'))
    //routeing
    app.use('/user',userRouter)
    app.use('/company',companyRouter)
    app.use('/job',jobRouter)
   
    // global error handling
    app.use(globalErrorHandling)


}