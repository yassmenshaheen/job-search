import { Router } from "express";
import { isAthorized } from "../../middleware/authorization.js";
import { roles } from "../../utils/constant/enum.js";
import { isValid } from "../../middleware/validation.js";
import { addJobVal, updateJobVal } from "./job.validation.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { addJob, applyToJob, deleteJob, filterJobs, getAllJobs, getSpecificJob, updateJob } from "./job.controller.js";
import { isAuthenticated } from "../../middleware/authentication.js";

const jobRouter = Router()
// add job
jobRouter.post('/addJob',isAuthenticated(),isAthorized([roles.COMPANY_HR]),
isValid(addJobVal),asyncHandler(addJob))
//update job
jobRouter.put('/updateJob/:_id',isAuthenticated(),isAthorized([roles.COMPANY_HR]),
isValid(updateJobVal),
asyncHandler(updateJob))
// delete job
jobRouter.delete('/deleteJob/:_id',isAuthenticated(),isAthorized([roles.COMPANY_HR]),
asyncHandler(deleteJob))
// get all jobs
jobRouter.get('/getAllJobs',isAuthenticated(),isAthorized([roles.COMPANY_HR,roles.USER]),
asyncHandler(getAllJobs))
//get Get all Jobs for a specific 
jobRouter.get('/getSpecificJob',isAuthenticated(),isAthorized([roles.COMPANY_HR,roles.USER]),
asyncHandler(getSpecificJob)
)
//Get all Jobs that match the following filters
jobRouter.get('/filterJobs',isAuthenticated(),isAthorized([roles.COMPANY_HR,roles.USER]),
asyncHandler(filterJobs))
//Apply to Job
jobRouter.get('/applyToJob',isAuthenticated(),isAthorized([roles.USER]),
asyncHandler(applyToJob))

export default jobRouter