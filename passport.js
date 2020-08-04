const localPassport=require("passport-local").Strategy
const bcrypt=require("bcrypt")
async function  initPassport(passport,getuserByEmail){
    const authenticateUser=async (email,password,done)=>{
            const user=getuserByEmail(email)
            if(user==null){
                return done(null,false,{message:"No user with that user"})
            }

            try {
                if(await bcrypt.compare(password,user.passport)){

                }
                else{
                    return done(null,false,{message:"Password Incorrect"})
                }
            } catch (error) {
                return done(error)
            }
    } 

    passport.use(new localPassport({usernamefield:"email"},
    authenticateUser))

    passport.serializeUser((user,done)=>{})
    passport.deserializeUser((id,done)=>{})

}

module.exports=initPassport