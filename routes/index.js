const express=require("express")
const {authenticated}=require("../config/auth")

const saveUrl=require("../model/shortenlink");

const router=express.Router()



router.use(express.urlencoded({extended:false}))

router.get("/" ,(req,res)=>{
    res.render("index")
})

router.get("/dashboard",authenticated , async (req,res)=>{
   const sUrl=await saveUrl.find()
    res.render("dashboard",{
        name:req.user.name,
        sUrl:sUrl
    })

})

router.get("/:surl",async (req,res)=>{

   const shortUrl =await saveUrl.findOne({short:req.params.surl})
   if(shortUrl==null)return res.sendStatus(404)

   
   res.redirect(shortUrl.full)
})


router.post("/dashboard" ,async (req,res)=>{

    
  

        await  saveUrl.create({full:req.body.fullUrl})
        res.redirect("/dashboard")


})

// 





module.exports=router;