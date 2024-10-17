import { Router } from "express";
import { isAthorized } from "../../middleware/authorization.js";
import { roles } from "../../utils/constant/enum.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { addCompany, deleteCompany, getAllApplications, getCompanyData, searchCompany, updateCompany } from "./company.controller.js";
import { isValid } from "../../middleware/validation.js";
import { addCompanyVal, updateCompanyVal } from "./company.validation.js";
import { isAuthenticated } from "../../middleware/authentication.js";


const companyRouter = Router()
// add company
companyRouter.post('/addCompany',isAuthenticated(),isAthorized([roles.COMPANY_HR]),isValid(addCompanyVal),
asyncHandler(addCompany))
// update company
companyRouter.put('/updateCompany/:_id',isAuthenticated(),isAthorized([roles.COMPANY_HR]),isValid(updateCompanyVal),
asyncHandler(updateCompany))
// delete company
companyRouter.delete('/deleteCompany/:_id',isAuthenticated(),isAthorized([roles.COMPANY_HR]),
asyncHandler(deleteCompany))
  // get company data
companyRouter.get('/getCompanyData',isAuthenticated(),isAthorized([roles.COMPANY_HR]),
asyncHandler(getCompanyData))
// search company
companyRouter.get('/searchCompany',isAuthenticated(),isAthorized([roles.COMPANY_HR,roles.USER]),
asyncHandler(searchCompany))
// get all applications
companyRouter.get('/getAllApplication',isAuthenticated(),isAthorized([roles.COMPANY_HR]),
asyncHandler(getAllApplications))
export default companyRouter