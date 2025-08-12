const multer=require('multer');


const multerErrorHndler=(error,req,res,next)=>{
  if(multer instanceof multerError || error.message==='only images are allowed'){//instance means its an object 
    return res.status(400).json({status:"fail",message:error.message})

  }
  next();
}

module.exports=multerErrorHndler