import React, { useState, useRef } from 'react'
import { dummyUserData } from '../assets/assets'
import { Pencil, X, Loader2 } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { updateUser } from '../features/users/usersSlice'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'

const ProfileModel = ({ onClose }) => {

  const user = useSelector((state) => state.users.value)
  const dispatch = useDispatch()
  const { getToken } = useAuth()

  const [editForm, setEditForm] = useState({
    username: user.username,
    full_name: user.full_name,
    bio: user.bio,
    location: user.location,
    profile_picture: null,
    cover_photo: null
  })
  const [isLoading, setIsLoading] = useState(false)
  const profileInputRef = useRef(null)
  const coverInputRef = useRef(null)

  const handleSaveProfile = async () => {
    setIsLoading(true)
    try {
      const userData = new FormData()
      const {full_name, username, bio, location, profile_picture, cover_photo} = editForm
      userData.append('full_name', full_name)
      userData.append('username', username)
      userData.append('bio', bio)
      userData.append('location', location)
      profile_picture && userData.append('profile', profile_picture)
      cover_photo && userData.append('cover', cover_photo)

      const token = await getToken()
      const result = await dispatch(updateUser({ userData, token })).unwrap()
      if (!result) {
        throw new Error('Failed to update profile')
      }
      handleClose()
      return result // Return for toast.promise
    } catch (error) {
      throw error // Throw for toast.promise to catch
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

  const handleProfileImageClick = () => {
    profileInputRef.current?.click()
  }

  const handleCoverImageClick = () => {
    coverInputRef.current?.click()
  }

  const handleProfileFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setEditForm(prev => ({
        ...prev,
        profile_picture: file
      }))
    }
  }

  const handleCoverFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setEditForm(prev => ({
        ...prev,
        cover_photo: file
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

          <form className='space-y-6' onSubmit={(e) => {
            e.preventDefault();
            toast.promise(
              handleSaveProfile(e),
              {
                loading: 'Saving changes...',
                success: 'Profile updated successfully!',
                error: (err) => err.message || 'Failed to update profile'
              }
            );
          }}>
            {/* Profile Picture Section */}
            <div className='flex flex-col items-start gap-4'>
              <label className='block text-sm font-medium text-gray-700'>
                Profile Picture
              </label>

              <input
                ref={profileInputRef}
                type="file"
                accept='image/*'
                id='profile_picture'
                className='hidden'
                onChange={handleProfileFileChange}
              />

              <input
                ref={coverInputRef}
                type="file"
                accept='image/*'
                id='cover_photo'
                className='hidden'
                onChange={handleCoverFileChange}
              />

              <div
                className='group/profile relative cursor-pointer'
                onClick={handleProfileImageClick}
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

            {/* Cover Photo Section */}
            <div className='flex flex-col items-start gap-4'>
              <label className='block text-sm font-medium text-gray-700'>
                Cover Photo
              </label>

              <div
                className='group/cover relative cursor-pointer w-full'
                onClick={handleCoverImageClick}
              >
                <div className='aspect-3/1 w-full overflow-hidden rounded-lg'>
                  <img
                    src={
                      editForm.cover_photo
                        ? URL.createObjectURL(editForm.cover_photo)
                        : user.cover_photo || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="400" viewBox="0 0 1200 400"><rect width="1200" height="400" fill="%23e5e7eb"/><text x="600" y="200" font-family="system-ui" font-size="24" fill="%236b7280" text-anchor="middle" dominant-baseline="middle">Add Cover Photo</text></svg>'
                    }
                    alt="Cover"
                    className='w-full h-full object-cover border-2 border-gray-200 group-hover/cover:border-gray-300 transition-colors'
                  />
                  <div className='absolute inset-0 hidden group-hover/cover:flex bg-black/40 items-center justify-center transition-opacity'>
                    <Pencil className='w-5 h-5 text-white' />
                  </div>
                </div>
              </div>
              <p className='text-sm text-gray-500'>
                Click the image to upload a new cover photo
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