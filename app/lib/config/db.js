import mongoose from 'mongoose'

export const ConnectDB = async () => {
	await mongoose.connect(
		'mongodb+srv://kirito012:Akshat2005@cluster0.sfid5.mongodb.net/blog-page'
	)
	console.log('DB Connected')
}
