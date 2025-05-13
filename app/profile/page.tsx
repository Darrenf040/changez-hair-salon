'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../utils/supabase/supabaseClient'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editMode, setEditMode] = useState(true)
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: ''
  })
  const [userDataOrginalState, setUserDataOrginalState] = useState({
    full_name: '',
    phone: '',
    email: ''
  })
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }

    const fetchUserProfile =  () => {
      try {
          const userData = {
            full_name: user.user_metadata.full_name || '',
            phone: user.user_metadata.phone || '',
            email: user.email || ''  
          }
        setFormData(userData)
        setUserDataOrginalState(userData)

      } catch (error) {
        console.error('Error fetching profile:', error)
        setMessage({ type: 'error', text: 'Error loading profile' })
      } finally {
        setLoading(false)
      }
    }

    fetchUserProfile()
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage({ type: '', text: '' })

    try {
      // Update user in auth table
      const { data: updateData, error: updateError } = await supabase.auth.updateUser({
        data: { full_name: formData.full_name, phone: formData.phone }
      })

      
      if (updateError) throw updateError

      const userData = {
        full_name: formData.full_name || '',
        phone: formData.phone || '',
        email: formData.email || ''
      }

    

      setMessage({ type: 'success', text: 'Profile updated successfully' })
      setEditMode(true)
      setUserDataOrginalState(userData)
    } catch (error) {
      console.error('Error updating profile:', error)
      setMessage({ type: 'error', text: 'Error updating profile' })
    } finally {
      setSaving(false)
    }
  }
  const handleCancel = () => {
    setFormData(userDataOrginalState)
    setEditMode((mode) => !mode)
  }
  const handleEditToggle = () => {
    setEditMode((mode) => !mode)
  }

  const handleAccountDelete = async () => {
    const {data, error} = await supabase.auth.admin.deleteUser(
      user.id, false
    )
    if(error){
      setMessage({type: "error", text: "Error deleting account"})
      console.error(error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-primary">
              {formData.full_name ? formData.full_name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-900">{formData.full_name || 'Your Name'}</div>
              <div className="text-gray-500 text-sm">{formData.email}</div>
            </div>
          </div>
            {editMode ? (
              <button
              onClick={handleEditToggle}
              className="mt-4 sm:mt-0 px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Edit
            </button>) : 
            (
            <button
            onClick={handleCancel}
              className="mt-4 sm:mt-0 px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Cancel
            </button>)
            }       
        </div>

        {message.text && (
          <div
            className={`mb-4 p-4 rounded-md ${
              message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow">
          <div>
            <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="full_name"
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-gray-50 py-3 px-4"
              disabled={editMode}
              placeholder="Your Name"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-gray-50 py-3 px-4"
              disabled={editMode}
              placeholder="Your Phone Number"
            />
          </div>
          {!editMode && (
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </form>
        {/* <button
              onClick={handleAccountDelete}
              className="mt-4 px-5 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-500 transition w-full"
            >
              Delete Account
            </button> */}
          
      </div>
    </div>
  )
} 