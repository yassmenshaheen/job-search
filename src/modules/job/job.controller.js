import path from 'path'
import { Application, Company, Job } from "../../../db/index.js"
import { AppError } from "../../utils/appError.js"
import { messages } from "../../utils/constant/message.js"
import cloudinary from "../../utils/cloud.js"

// add job
export const addJob = async(req,res,next)=>{
    // get data from req
    const {jobtitle,joblocation,workingtime,seniorityLevel,jobDescription,technicalSkills,softSkills} = req.body
    //check exsitance
    const jobExist = await Job.findOne({$or:[{jobtitle,joblocation},{addedBy:req.authUser._id}]})
    if(jobExist){
        next(new AppError(messages.job.alreadyExist, 409))
    }
    // prepare data
    const job = new Job({
        jobtitle,
        joblocation,
        workingtime,
        seniorityLevel,
        jobDescription,
        technicalSkills,
        softSkills,
        addedBy:req.authUser._id

    })
    // add to db
    const createJob = await job.save()
    if(!createJob){
        next(new AppError(messages.job.failToCreate, 500))
    }
    //send response
    return res.status(200).json({message:messages.job.createdSuccessfully,
        success:true,
        data:createJob
    })


}
// update job
export const updateJob = async (req,res,next)=>{
        // get data from req
        const id = req.pramas
        const checkOwner = await Job.findOne({_id:id,addedBy:req.authUser._id})
        if(checkOwner){
            next(new AppError("noy athorized", 409))

        }
        // update
        const updateJob = await Job.updateOne({id},req.body)
        return res.status(201).json({message:messages.job.updatedSuccessfully,
            success:true,
            data:updateJob
        })
    
}
// delete job
export const deleteJob = async (req,res,next)=>{
    // get data from req
    const _id = req.params._id
    const job = await Job.findOne({_id:_id,addedBy:req.authUser._id})
    if(!job){
        next(new AppError("job not found", 404))

    }
    // delete
    const deleteJob = await Job.deleteOne({_id:_id,addedBy:req.authUser._id})
    return res.status(201).json({message:messages.job.deletedSuccessfully,
        success:true,
        data:deleteJob
    })

}
// Get all Jobs 
export const getAllJobs = async (req,res,next)=>{
    // get data from req
    const jobs = await Job.find()
        if(!jobs){
            next(new AppError(messages.job.notFound , 404))
        }
        let results = []
        for(const job of jobs){
            const company = await Company.find({company_HR:job.addedBy})
            const objJob = job.toObject
            objJob.companise = company
            results.push = objJob
        }
        return res.status(200).json({message:"done",
            success:true,
            
        })
            
}
// Get all Jobs for a specific company
export const getSpecificJob = async (req,res,next)=>{
    // get data from req
    const {companyName} = req.body
    const company = await Company.findById(companyName)
    if(company){
        next(new AppError("no companies found"))
    }
    const jobs = await Job.find({addedBy:company?.company_HR})
    return res.status(200).json({message:"Done",
        success:true,
        data:jobs
    })
}
// Get all Jobs that match the following filters 
export const filterJobs = async (req,res,next)=>{
    let filterQuery = {}
    if(req.query?.jobtitle){
        filterQuery.jobtitle = req.query.jobtitle
    }
    if(req.query?.workingtime){
        filterQuery.workingtime = req.query.workingtime
    }
    if(req.query?.seniorityLevel){
        filterQuery.seniorityLevel = req.query.seniorityLevel
    }
    if(req.query?.technicalSkills){
        filterQuery.technicalSkills = req.query.technicalSkills
    }
    const jobs = await Job.find(filterQuery)
    return res.status(200).json({message:"Done",
        success:true,
        data:jobs
    })

}
// Apply to Job
export const applyToJob = async (req,res,next)=>{
    //get data from req
    const {technicalSkills,softSkills,jobId} = req.body
    const userId = req.authUser._id
    const job = await Job.find({_id:jobId})
    if(!job){
        next(new AppError("job not exist", 404))
    }
    const isExist = await Application.find({userId:jobId})
    if(isExist){
        next(new AppError("you already aplied for this job"))
    }
      //upload pdf
      const {secure_url, public_id} = await cloudinary.uploader.upload(req.file.path,{
        folder:"job-search/userResumes"
    })
    //prepare data
    const jobs = new Job({
        technicalSkills,
        softSkills,
        userId,
        jobId,
        userResume :{secure_url, public_id},
        

    })
    const application = application.save()
    // send response
    return res.status(201).json({message:"Done",
        success:true,
        data:application
    })

}


