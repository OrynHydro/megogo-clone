import { Router, Request, Response } from 'express'
import fileUpload, { UploadedFile } from 'express-fileupload'
import path from 'node:path'
import { v4 as uuidv4 } from 'uuid'

const router = Router()

router.post('/', async (req: Request, res: Response): Promise<any> => {
	try {
		if (!req.files || Object.keys(req.files).length === 0) {
			return res.status(400).send('No files were uploaded.')
		}

		const inputName = req.body.inputName
		if (!inputName || !req.files[inputName]) {
			return res.status(400).send('Invalid input name or file not found.')
		}

		const files = req.files as fileUpload.FileArray
		const sampleFile = files[inputName] as UploadedFile

		const genFileName = uuidv4()
		const fileType = sampleFile.mimetype.split('/')[1]

		const fileName = `${genFileName}.${fileType}`

		const uploadPath = path.join(__dirname, '../public/storage', fileName)

		sampleFile.mv(uploadPath, function (err) {
			if (err) return res.status(500).send(err)
			res.send(fileName)
		})
	} catch (error) {
		console.error('Error uploading file:', error)
		res.status(500).json({ error: 'Error uploading file' })
	}
})

export default router
