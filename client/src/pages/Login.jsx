import React from 'react'
import { assets } from '../assets/assets'
import { Star } from 'lucide-react'
import { SignIn } from '@clerk/clerk-react'

const Login = () => {
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <img src={assets.bgImage} alt="" className='absolute top-0 left-0 -z-1 w-full h-full object-cover' />

      {/* Left side */}
      <div className='flex-1 flex flex-col items-start justify-between p-6 md:p-10 lg:pl-40'>
        <div className='flex items-center gap-2 -ml-5'>
          <img onClick={() => navigate('/')} src={assets.logo} alt="" className='w-10 h-10 ml-7 my-2 cursor-pointer' />
          <h1 className='bg-linear-to-r from-cyan-900 to-teal-500 bg-clip-text text-transparent font-bold text-2xl'>Discourse.</h1>
        </div>
        <div >
          <div className='flex items-center gap-3 mb-4 max-md:mt-10'>
            <img src={assets.group_users} alt="" className='h-8 md:h-10' />
            <div>
              <div className='flex'>
                {Array(5).fill(0).map((_, i) => (<Star key={i} className='size-4 md:size-4.5 text-transparent fill-amber-500' />))}
              </div>
              <p>Used by 15k+ Developers</p>
            </div>
          </div>
          <h1 className='text-3xl md:text-6xl md:pb-2 font-bold bg-linear-to-r from-cyan-950 to-teal-800 bg-clip-text text-transparent'>Build Real Connections That Matter</h1>
          <p className='text-xl md:text-3xl text-cyan-900 max-w-72 md:max-w-xl'>Join Discourse to collaborate, share, and grow with a global tech community.</p>
        </div>
        <span className='md:h-10'></span>
      </div>

      {/* Right side */}
      <div className='flex-1 flex items-center justify-center p-6 sm:p-10 '>
        <SignIn />
      </div>
    </div>
  )
}

export default Login