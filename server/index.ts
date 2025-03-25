import express, { Application } from 'express'
import path from 'path'

const app: Application = express()

const port = 5000

app.use('/images', express.static(path.join(__dirname, 'public/images')))

app.listen(port, () => console.log(`Server is running on port ${port}`))
