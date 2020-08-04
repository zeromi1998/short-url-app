const localStrategy=require("passport-local").Strategy;

const mongoose=require("mongoose")
const bcrypt=require("bcrypt")


const User=require("../model/Schema")

module.exports=function(passport){
    passport.use(
        new localStrategy({usernameField:"email"},(email,password,done)=>{
                // matching user 
                User.findOne({email:email})
                .then(user=>{
                    if(!user){
                        return done(null,false,{message:"Email is not register"});
                    }
                    //checking password
                    bcrypt.compare(password,user.password,(err,isMatch)=>{
                        if(err) throw err;

                        if(isMatch){
                            return done(null,user);
                        }
                        else{
                            return done(null,false,{message:"password is not correct"})
                        }
                    });
                })
                .catch(err=>console.log(err))
        })
    )
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
}