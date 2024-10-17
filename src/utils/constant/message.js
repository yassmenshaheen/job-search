const generateMessage = (entity)=>({
    alreadyExist:`${entity} already exist`,
    notFound:`${entity} not found`,
    createdSuccessfully:`${entity} created successfully`,
    updatedSuccessfully:`${entity} updated successfully`,
    deletedSuccessfully:`${entity} deleted successfully`,
    failToCreate:`fail to create ${entity}`,
    failToUpdate:`fail to update ${entity}`,
    failToDelete:`fail to delete ${entity}`

  })
  export const messages = {
    application:generateMessage('application'),
    job:generateMessage('job'),
    company:generateMessage('company'),
    user:{...generateMessage('user') , verified:"user verified successfully" , 
      invalidCredentials:"invalidCredentials",
      loginSuccessfuly:"loginSuccessfuly",
      notAuthorized:"not authorized to access this api"
    }

       
    }