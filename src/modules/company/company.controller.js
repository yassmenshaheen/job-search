import bcrypt from 'bcrypt'
import ExcelJs from 'exceljs'
import { Job } from '../../../db/models/job.model.js';
import { Application } from '../../../db/models/application.model.js';
import { Company } from "../../../db/index.js"
import { AppError } from "../../utils/appError.js"
import { messages } from "../../utils/constant/message.js"

//add company
export const addCompany = async (req,res,next)=>{
    //get data from req
    const {companyname,description,industry,address,numberOfEmployees,companyemail} = req.body
    // check existance
    const companyExist = await Company.findOne({$or:[{companyname},{companyemail},{company_HR:req.authUser._id}]})
    if(companyExist){
        next(new AppError(messages.company.alreadyExist, 409))
    }
    //prepare data 
    const company = new  Company({
        companyname, 
        description,
        industry,
        address,
        numberOfEmployees,
        companyemail,
        company_HR:req.authUser._id

    })
    // add to db
    const createCompany = await company.save()
    if(!createCompany){
        next(new AppError(messages.company.failToCreate, 500))
    }
    // send response
    return res.status(200).json({message:messages.company.createdSuccessfully,
        success:true,
        data:createCompany
        
    })

}
//update company
export const updateCompany = async (req,res,next)=>{
    const companyExist = await Company.findOne({_id:req.authUser._id,company_HR:req.authUser._id})
    if(!companyExist){
        next(new AppError("not athorized" , 409))
    }
    const checkExist = await Company.findOne({$or:[{companyemail},{companyname}]})
    if(checkExist){
        return next(AppError("duplicated", 409))
    }
    const update = await Company.updateOne({_id:req.authUser._id},req.body)
    if(!update){
        return next(AppError(messages.company.notFound, 404))
    }
    return res.status(201).json({message:messages.company.updatedSuccessfully,
        success:true
    })

}
//delete company
export const deleteCompany = async (req,res,next)=>{
    // get data from req
    const {_id} = req.params._id
    //check existance 
    const deleteCompany = await Company.findOneAndDelete({$or:[{_id:_id},{company_HR:req.authUser._id}]})
    if(!deleteCompany){
        next(new AppError(messages.company.notFound, 404))
    }
    return res.status(200).json({message:messages.company.deletedSuccessfully,
        success:true
    })
}
//get company data 
export const getCompanyData = async (req,res,next)=>{
    //get data from req
    const {_id} = req.params
     //check existance
     const companyExist = await Company.findOne({_id:req.authUser._id})
     if(companyExist){
        next(new AppError(messages.company.notFound, 404))
     }
     return res.status(200).json({message:"Done",
        success:true,
        data:companyExist
     })
}
//search company 
export const searchCompany = async (req,res,next)=>{
    //get data from req
    const {companyName} = req.body
    //check existance 
    const companyNameExist = await Company.findOne(companyName)
    if(companyName){
        next(new AppError(messages.company.notFound, 404))
    }
    return res.status(200).json({message:"Done", 
        success:true,
        data:companyNameExist
    })

}
//get all applicatons
export const getAllApplications = async (req,res,next)=>{
    // get data from req
    const {jobid,userid,userTechSkills,userSoftSkills,userResume} = req.body
    const {id} = req.authUser.id
    const getApps = await Company.findOne({$or:[{jobid},{userid},{id}]})
    return res.status(200).json({message:"Done",success:true,
        data:getApps

    })
}

// bonus task

 export const excelsheet = async(req,res,next)=>{
  const company = await Company.findById(req.params.id)
  const jobs = await Job.find({addedBy:company.company_HR})

  let applications = []
  for(let job of jobs){
    let application = await Application.find({jobid:job._id})
    .populate("userid jobid")
    applications.push(application)

  }

  const workbook = new ExcelJs.Workbook()
  const worksheet = workbook.addWorksheet("sheet1")
  worksheet.columns = [
    {header :"user name",key:"user",width:20},
    {header :"resume link",key:"resume",width:100},
    {header :"job applied to",key:"job",width:20}

  ]
let data = []
for(const inApplication of applications){
  for(const application of inApplication){
    let dataentry = {user:application.userid.username,
      resume:application.userResume,
      job:application.jobid.jobtitle
    }
    data.push(dataentry)
  }
}

worksheet.addRows(data)
await workbook.xlsx.writeFile("sheet1.xlsx").catch((error)=>{
  console.log(error);
  
})
return res.json({applications})

}
