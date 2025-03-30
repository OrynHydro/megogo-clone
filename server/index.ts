import express, { Application } from 'express'
import path from 'path'
import dotenv from 'dotenv'
import sendSmsRouter from './routes/send-sms'
import authRouter from './routes/auth'

dotenv.config({ path: '.env.local' })

const app: Application = express()

const port = 5000

app.use(express.json())

app.use('/images', express.static(path.join(__dirname, 'public/images')))
app.use('/send-sms', sendSmsRouter)
app.use('/auth', authRouter)

app.listen(port, () => console.log(`Server is running on port ${port}`))
