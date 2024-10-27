import express from 'express'

const app = express();

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))

//rouets import
import bookRoute from "./routes/book.routes.js"

//routes declaration 
app.use("/api/v1/book",bookRoute)
export default app