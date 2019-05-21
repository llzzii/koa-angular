module.exports={
    err (err,data){
      return {
          msg:err,
          isok:false,
          data:data
      }
    },
  
    suc (suc,data){
        return{
            msg:suc,
            isok:true,
            data:data
        }
    }
  
  }