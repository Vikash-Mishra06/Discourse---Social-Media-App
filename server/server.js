import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './db/db.js'
connectDb()

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => res.send("Server is running"))

const PORT = process.env.PORT || 3000

app.listen(PORT,() => console.log(`Server is running on port: ${PORT}`))