import { Router, Request, Response } from 'express'
import { UploadedFile } from 'express-fileupload'
import path from 'node:path'
import { v4 as uuidv4 } from 'uuid'

const router = Router()

router.post('/', async (req: Request, res: Response): Promise<any> => {
	try {
		const uploaded = req.files?.file as UploadedFile | undefined

		if (!uploaded) {
			return res.status(400).send('No file uploaded.')
		}

		const ext =
			path.extname(uploaded.name) || `.${uploaded.mimetype.split('/')[1]}`
		const fileName = `${uuidv4()}${ext}`

		const uploadPath = path.join(
			__dirname,
			'../public/images/storage',
			fileName
		)

		uploaded.mv(uploadPath, err => {
			if (err) return res.status(500).send(err)
			res.send(fileName)
		})
	} catch (error) {
		console.error('Error uploading file:', error)
		res.status(500).json({ error: 'Error uploading file' })
	}
})

export default router
