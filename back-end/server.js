const express = require('express');
const { default: mongoose } = require('mongoose');
const userRoutes = require("./routes/UserRoutes")
const itemRoutes = require("./routes/ItemRoutes")
const borrowItemsRoutes = require('./routes/BorrowItemsRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express()
app.use(cors())

const port = process.env.PORT
const MONGOURL = process.env.MONGO_URL

mongoose.connect(MONGOURL).then(()=>{
    console.log("Database is connected successfully.")
    app.listen(port, ()=>{
        console.log(`server is running on ${port}`)
    })
}).catch((error) =>{
    console.log(error)
})

app.use(express.json())

app.use(userRoutes)
app.use(itemRoutes)
app.use(borrowItemsRoutes)
