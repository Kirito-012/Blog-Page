import {ConnectDB} from '@/app/lib/config/db'
import BlogModel from '@/app/lib/models/BlogModel'

const {NextResponse} = require('next/server')
import {writeFile} from 'fs/promises'

const fs = require('fs')

const LoadDB = async () => {
	await ConnectDB()
}
LoadDB()

// API endpoint to get all blogs
export async function GET(request) {
	const blogId = request.nextUrl.searchParams.get('id')
	if (blogId) {
		const blog = await BlogModel.findById(blogId)
		return NextResponse.json(blog)
	} else {
		const blogs = await BlogModel.find({})
		return NextResponse.json({blogs})
	}
}

// API endpoint for uploading blogs
export async function POST(request) {
	const formData = await request.formData()
	const timeStamp = Date.now()

	const image = formData.get('image')
	const imageByteData = await image.arrayBuffer()
	const buffer = Buffer.from(imageByteData)

	const path = `./public/${timeStamp}_${image.name}`
	await writeFile(path, buffer)
	const imgURL = `/${timeStamp}_${image.name}`

	const blogData = {
		title: `${formData.get('title')}`,
		description: `${formData.get('description')}`,
		category: `${formData.get('category')}`,
		author: `${formData.get('author')}`,
		image: `${imgURL}`,
		authorImg: `${formData.get('authorImg')}`,
	}

	await BlogModel.create(blogData)
	console.log('Blog Saved')

	return NextResponse.json({success: true, msg: 'Blog added'})
}

// Creating API endpoint to delete Blog
export async function DELETE(request) {
	const id = await request.nextUrl.searchParams.get('id')
	const blog = await BlogModel.findById(id)
	fs.unlink(`./public${blog.image}`, () => {})
	await BlogModel.findByIdAndDelete(id)
}
