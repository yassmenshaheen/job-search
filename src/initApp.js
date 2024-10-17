import { globalErrorHandling } from "./middleware/asyncHandler.js"
import { companyRouter, jobRouter, userRouter } from "./modules/index.js"


export const initApp = (app , express) =>{
    //parse req
    app.use(express.json())
    app.use('/uploads',express.static('uploads'))
    
    // routing
    app.use('/user',userRouter)
    app.use('/company',companyRouter)
    app.use('/job',jobRouter)
   

    
    //lobalErrorHandling
   app.use(globalErrorHandling)

}