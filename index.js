const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()
const connectDatabase = require("./database/data-base-entries.js")
const userRoutes = require("./routes/userRoutes")




const app = express()

// Middlewares
app.use(express.json())

app.use(cors())



const PORT = process.env.PORT || 5010

//Function to connect to Database
connectDatabase()



app.listen(PORT, ()=>{
    console.log(`server started running on ${PORT}`);
})


app.get("/", (req, res)=>{
    return res.status(200).json({message: "welcome To Wallet Server"})
})

app.use("/api", userRoutes)

app.use((req,res)=>{
    res.status(404).json({
        message: "sorry this endpoint does not exists."
    })
})