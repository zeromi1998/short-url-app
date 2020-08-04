const express=require("express")
const mongoose=require("mongoose");
const uProfile=require("./model/Schema")
const bcrypt=require("bcrypt");
const expressLayouts  =require("express-ejs-layouts")
const session =require("express-session")
const flash =require("connect-flash")
const passport=require("passport")
const app=express();

require("./config/passport")(passport);

app.use(expressLayouts);

app.set("view engine","ejs")

app.use(express.urlencoded({extended:false}));

//session



app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
 
}))

app.use(passport.initialize());
app.use(passport.session());
//flash

app.use(flash());

app.use((req,res,next)=>{
    res.locals.success_msg=req.flash("success_msg")
    res.locals.error_msg=req.flash("error_msg")
    res.locals.error=req.flash("error")
    next();
})


const dburl ="mongodb+srv://doshi98:doshi98@cluster0.dlbb4.mongodb.net/user?retryWrites=true&w=majority"

mongoose.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex: true})
.then(result=>{
    console.log("Connected");
})
.catch(err=>{
    console.log(err);
})





app.use("/",require("./routes/index"))

//**** user route handlers */

app.use("/user",require("./routes/user"))








app.listen(process.env.PORT||9000);