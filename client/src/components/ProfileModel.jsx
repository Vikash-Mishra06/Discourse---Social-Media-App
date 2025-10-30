import React, { useState, useRef } from 'react'
import { dummyUserData } from '../assets/assets'
import { Pencil, X, Loader2 } from 'lucide-react'

const ProfileModel = ({ onClose }) => {

  const user = dummyUserData
  const [editForm, setEditForm] = useState({
    username: user.username,
    full_name: user.full_name,
    bio: user.bio,
    location: user.location,
    profile_picture: null
  })
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef(null)

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Profile updated:', editForm)
      handleClose()
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Create a safe close function
  const handleClose = () => {
    if (onClose && typeof onClose === 'function') {
      onClose()
    } else {
      console.warn('onClose is not a function or not provided')
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setEditForm(prev => ({
        ...prev,
        profile_picture: file
      }))
    }
  }

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  const handleCancelClick = (e) => {
    e.preventDefault()
    handleClose()
  }

  const handleCloseButtonClick = (e) => {
    e.preventDefault()
    handleClose()
  }

  return (
    <div
      className='fixed top-0 bottom-0 left-0 right-0 z-50 h-screen overflow-y-auto bg-black/50 flex items-start justify-center p-4'
      onClick={handleBackgroundClick}
    >
      <div className='max-w-2xl w-full sm:py-6 mx-auto'>
        <div className='bg-white rounded-lg shadow-lg p-6'>
          {/* Header */}
          <div className='flex items-center justify-between mb-6'>
            <h1 className='text-2xl font-bold text-gray-900'>Edit Profile</h1>
            <button
              type='button'
              onClick={handleCloseButtonClick}
              className='p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer'
            >
              <X className='w-5 h-5' />
            </button>
          </div>

          <form className='space-y-6' onSubmit={handleSaveProfile}>
            {/* Profile Picture Section */}
            <div className='flex flex-col items-start gap-4'>
              <label className='block text-sm font-medium text-gray-700'>
                Profile Picture
              </label>

              <input
                ref={fileInputRef}
                type="file"
                accept='image/*'
                id='profile_picture'
                className='hidden'
                onChange={handleFileChange}
              />

              <div
                className='group/profile relative cursor-pointer'
                onClick={handleImageClick}
              >
                <img
                  src={
                    editForm.profile_picture
                      ? URL.createObjectURL(editForm.profile_picture)
                      : user.profile_picture
                  }
                  alt="Profile"
                  className='w-24 h-24 rounded-full object-cover border-2 border-gray-200 group-hover/profile:border-gray-300 transition-colors'
                />
                <div className='absolute inset-0 hidden group-hover/profile:flex bg-black/40 rounded-full items-center justify-center transition-opacity'>
                  <Pencil className='w-5 h-5 text-white' />
                </div>
              </div>
              <p className='text-sm text-gray-500'>
                Click the image to upload a new profile picture
              </p>
            </div>

            {/* Form Fields */}
            <div className='space-y-4'>
              <div>
                <label htmlFor="username" className='block text-sm font-medium text-gray-700 mb-1'>
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={editForm.username}
                  onChange={handleInputChange}
                  className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>

              <div>
                <label htmlFor="full_name" className='block text-sm font-medium text-gray-700 mb-1'>
                  Full Name
                </label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={editForm.full_name}
                  onChange={handleInputChange}
                  className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>

              <div>
                <label htmlFor="bio" className='block text-sm font-medium text-gray-700 mb-1'>
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={editForm.bio}
                  onChange={handleInputChange}
                  rows={3}
                  className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none'
                />
              </div>

              <div>
                <label htmlFor="location" className='block text-sm font-medium text-gray-700 mb-1'>
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={editForm.location}
                  onChange={handleInputChange}
                  className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex gap-3 pt-4'>
              <button
                type='button'
                onClick={handleCancelClick}
                className='cursor-pointer flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium'
              >
                Cancel
              </button>
              <button
                type='submit'
                disabled={isLoading}
                className='cursor-pointer flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2'
              >
                {isLoading ? (
                  <>
                    <Loader2 className='w-4 h-4 animate-spin' />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfileModel