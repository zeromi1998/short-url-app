const express=require("express")

const User= require("../model/Schema")
const saveUrl= require("../model/shortenlink")
const bcrypt=require("bcrypt")
const router=express.Router()
const {authenticated}=require("../config/auth")
const passport=require("passport")





//register

router.get("/register",(req,res)=>{
    res.render("register");
})

router.post("/register",(req,res)=>{
    const {name,email,password,password2}=req.body

    let errors=[]

    if(password!==password2){
        errors.push({msg:"password does not match"})
    }

    //password length
    if(password.length<6){
        errors.push({msg:"password should be atleast 6 characters"})
    }

    if(errors.length>0){
            res.render("register",{
                errors,
                name,
                email,
                password,
                password2
            })
    }
    else{
        
        User.findOne({email:email})
        .then(user=>{
            if(user){
                errors.push({msg:"Email already exists"});
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                  });
            }
            else{

              
                const newUser=new User({
                    name,
                    email,
                    password
                });

                bcrypt.genSalt(10,(err,salt)=>{

                    bcrypt.hash(newUser.password,salt,(err,hash)=>{

                        if(err)throw err;

                        newUser.password=hash;


                    newUser.save()
                    .then(user=>{

                        req.flash("success_msg","You are now resgitered and can login")
                        res.redirect("/user/login")
                    })
                    .catch(err=>{
                        console.log(err)
                    })

                    })
                });



            }
        })
        
    }
    
})

//login 

router.get("/login" ,(req,res)=>{

    
    if(req.isAuthenticated()){
    res.redirect("/dashboard")

    }
    else{
        res.render("login")
    };
})


router.post("/login",(req,res,next)=>{
   
    const username=req.body.email;

   

    const user={name:username}
  
    
    passport.authenticate("local",{
        successRedirect:"/dashboard",
        failureRedirect:"/user/login",
        failureFlash:true
    })(req,res,next);

  


})


// logout



router.get("/logout",(req,res)=>{
    req.logout();
    req.flash("success_msg","you are logged out");
    res.redirect("/user/login");
})



module.exports=router