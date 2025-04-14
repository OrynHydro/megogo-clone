import express, { Application, RequestHandler } from 'express'
import path from 'node:path'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'

import sendSmsRouter from './routes/send-sms'
import authRouter from './routes/auth'
import usersRouter from './routes/users'
import profilesRouter from './routes/profile'
import uploadRouter from './routes/upload'
import { MongoConnect } from './middleware/mongo-connect'

const app: Application = express()

const port = 5000

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload() as unknown as RequestHandler)

dotenv.config({ path: '.env.local' })

MongoConnect()

app.use('/images', express.static(path.join(__dirname, 'public/images')))
app.use('/send-sms', sendSmsRouter)
app.use('/auth', authRouter)
app.use('/users', usersRouter)
app.use('/profiles', profilesRouter)
app.use('/upload', uploadRouter)

app.listen(port, () => console.log(`Server is running on port ${port}`))
