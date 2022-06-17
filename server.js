const express = require("express")
const {resolve} = require("path")
const app = express()
app.use(
    express.static(
        resolve(__dirname,'./build')
    )
)


app.listen(process.env.PORT ||4000,(err)=>{
     if(err){
        console.log("fail")
        return 
     }
     console.log('sucess')
})