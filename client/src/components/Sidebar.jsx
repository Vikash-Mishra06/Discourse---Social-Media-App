import React from 'react'
import { assets, dummyUserData } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { CirclePlus, LogOut, SidebarOpen, User } from 'lucide-react'
import MenuItems from './MenuItems'
import { UserButton, useClerk } from '@clerk/clerk-react'
import { useSelector } from 'react-redux'

const Sidebar = ({ SidebarOpen, setSidebarOpen }) => {
    const navigate = useNavigate()
    const user = useSelector((state) => state.users.value)

    const { signOut } = useClerk()

    return (
        <div className={`w-60 xl:w-72 bg-white border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute top-0 bottom-0 z-20 ${SidebarOpen ? 'translate-x-0' : 'max-sm:-translate-x-full'} transition-all duration-300 ease-in-out`}>
            <div className='w-full'>
                <div className='flex items-center gap-2'>
                    <img onClick={() => navigate('/')} src={assets.logo} alt="" className='w-9 h-9 ml-7 my-2 cursor-pointer' />
                    <h1 className='bg-linear-to-r from-cyan-900 to-teal-500 bg-clip-text text-transparent font-bold text-2xl'>Discourse.</h1>

                </div>
                <hr className='border-gray-200 mb-8' />

                <MenuItems setSidebarOpen={setSidebarOpen} />
                <Link to='/create-post' className='flex items-center justify-center gap-2 py-2.5 mt-6 mx-6 rounded-lg bg-linear-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 active:scale-95 transition text-white cursor-pointer'>
                    <CirclePlus className='w-5 h-5' />
                    Create Post
                </Link>
            </div>

            <div className='w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between'>
                <div className='flex gap-2 items-center cursor-pointer'>
                    <UserButton />
                    <div>
                        <h1 className='text-sm font-medium'>{user.full_name}</h1>
                        <p className='text-xs text-gray-500'>@{user.username}</p>
                    </div>
                </div>
                <LogOut onClick={signOut} className='w-4.5 text-gray-500 hover:text-gray-700 transition cursor-pointer' />
            </div>
        </div>
    )
}

export default Sidebar