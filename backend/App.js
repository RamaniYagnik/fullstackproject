import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import DBconnection from './config/Database.js'
import userSingupRouter from './Routes/usersignupRoutes.js' 
import userLoginRouter from './Routes/userLoginRoutes.js'
import cookieParser from 'cookie-parser'
import userDetailRouter from './Routes/userDetailsRoutes.js'
import userLogoutRouter from './Routes/userLogoutRoutes.js'
import AllUsersRouter from './Routes/AdminpanelRoutes/AllUsersRoutes.js'
import updateUserRouter from './Routes/AdminpanelRoutes/updateUserRouter.js'
import UploadProductRouter from './Routes/UploadProductRuoutes.js'
import cartRouter from './Routes/cartRoutes.js'
import orderRouter from './Routes/orderRoutes/OrderRoutes.js'
import wishlistRouter from './Routes/wishlistRoutes.js'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: "*",        
    credentials: true
  })
);



app.use("/user",userSingupRouter)
app.use("/user",userLoginRouter)
app.use("/userDetail",userDetailRouter)
app.use("/userLogout",userLogoutRouter)
app.use("/Allusers",AllUsersRouter) 
app.use("/updateuser",updateUserRouter)
app.use("/products",UploadProductRouter)
app.use("/cart",cartRouter)
app.use("/order",orderRouter)
app.use("/wishlist",wishlistRouter)

app.get("/checkCookies", (req, res) => {
    res.json({ cookies: req.cookies });
});  

DBconnection.then(() => {

    app.listen(4000,() => {
        console.log("Connectd to database successfully...");
        console.log("Server Running On 4000...");
    })

})