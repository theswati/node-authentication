function custumResponse(res,status,success,message,data){
    res.status(status).json({success:success,message:message,data:data})
}

export default custumResponse