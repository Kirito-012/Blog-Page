import Image from 'next/image'
import React from 'react'
import {assets} from '../assets/assets'

const Footer = () => {
	return (
		<>
			<div className='flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row bg-black p-5 items-center'>
				<Image
					src={assets.logo_light}
					alt=''
					width={120}
				/>
				<p className='text-sm text-white'>
					All Rights Reserved. Copyright @blogger
				</p>
				<div className='flex '>
					<Image
						src={assets.facebook_icon}
						width={40}
						alt=''
					/>
					<Image
						src={assets.twitter_icon}
						width={40}
						alt=''
					/>
					<Image
						src={assets.googleplus_icon}
						width={40}
						alt=''
					/>
				</div>
			</div>
		</>
	)
}

export default Footer
