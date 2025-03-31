import express, { Application } from 'express'
import path from 'node:path'
import dotenv from 'dotenv'
import sendSmsRouter from './routes/send-sms'
import authRouter from './routes/auth'
import { MongoConnect } from './middleware/mongo-connect'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app: Application = express()

const port = 5000

app.use(cors())
app.use(express.json())
app.use(cookieParser())
dotenv.config({ path: '.env.local' })

app.use('/images', express.static(path.join(__dirname, 'public/images')))
app.use('/send-sms', sendSmsRouter)
app.use('/auth', authRouter)

MongoConnect()

app.listen(port, () => console.log(`Server is running on port ${port}`))
