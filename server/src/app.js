const express = require ('express');
const morgan = require('morgan');
const createError = require('http-errors');
const rateLimit = require('express-rate-limit');
const userRouter = require('./routers/userRouter');
const seedRouter = require('./routers/seedRouter');
const app = express()

const rateLimiter = rateLimit({
    windowMs: 1*60*1000, // 1 Minute
    limit: 5, // Limit 5 Times
    message: 'Too Many Requests from this IP. Please try again later' // Message
})


app.use(rateLimiter)
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// const isLoggedIn = (req, res, next) =>{
//     const login = true;
//     if(login){
//         req.userId = 101;
//         next()
//     }else{
//         return res.status(401).send({message: 'User not Loggedin or unauthorized'})
//     }
//     console.log('isLoggedIn Middleware');
// }

app.use("/api/user", userRouter);
app.use("/api/seed", seedRouter);

app.get("/test", (req, res) => {
    res.status(200).send({message:"GET: API is Working Fine"});
});


//Client Error Handling
app.use((req,res,next) =>{
    next(createError(404, 'Route Not Found'));
})

//Server Error Handling -> All the errors come here
app.use((err,req,res,next) =>{
    return res.status(err.status || 500). json({
        success:false,
        message: err.message,
    })
});


module.exports = app;