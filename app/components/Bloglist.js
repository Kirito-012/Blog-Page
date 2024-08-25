import React, {useEffect, useState} from 'react'
import {blog_data} from '../assets/assets'
import Blogitem from './Blogitem'
import axios from 'axios'

const Bloglist = () => {
	const [menu, setMenu] = useState('All')
	const [blogs, setBlogs] = useState([])

	const fetchBlogs = async () => {
		const response = await axios.get('/api/blog')
		setBlogs(response.data.blogs)
		console.log(response.data.blogs)
	}

	useEffect(() => {
		fetchBlogs()
	}, [])

	return (
		<div>
			<div className='flex justify-center gap-6 my-10'>
				<button
					onClick={() => {
						setMenu('All')
					}}
					className={
						menu === 'All' ? 'bg-black text-white py-1 px-4 rounded-sm' : ''
					}>
					All
				</button>
				<button
					className={
						menu === 'Technology'
							? 'bg-black text-white py-1 px-4 rounded-sm'
							: ''
					}
					onClick={() => {
						setMenu('Technology')
					}}>
					Technology
				</button>
				<button
					className={
						menu === 'Startup' ? 'bg-black text-white py-1 px-4 rounded-sm' : ''
					}
					onClick={() => {
						setMenu('Startup')
					}}>
					Startup
				</button>
				<button
					className={
						menu === 'Lifestyle'
							? 'bg-black text-white py-1 px-4 rounded-sm'
							: ''
					}
					onClick={() => {
						setMenu('Lifestyle')
					}}>
					Lifestyle
				</button>
			</div>
			<div className='flex justify-around gap-1 flex-wrap gap-y-10 mb-16 xl:mx-24'>
				{blogs
					.filter((item) => (menu === 'All' ? true : item.category === menu))
					.map((item, index) => {
						return (
							<Blogitem
								key={index}
								id={item._id}
								title={item.title}
								image={item.image}
								desc={item.desc}
								category={item.category}
							/>
						)
					})}
			</div>
		</div>
	)
}

export default Bloglist
