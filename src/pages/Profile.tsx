import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { getProfile, updateProfile } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { User } from '../types/auth';
import { UserCircle } from 'lucide-react';

export default function Profile() {
  const { user: authUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Partial<User>>();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await getProfile();
        reset(profile);
      } catch (error) {
        toast.error('Failed to load profile');
      }
    };
    loadProfile();
  }, [reset]);

  const onSubmit = async (data: Partial<User>) => {
    try {
      await updateProfile(data);
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-dark-800 shadow-lg rounded-lg p-8 border border-gold-500/20">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-gold-500/10 p-3 rounded-full">
              <UserCircle className="w-8 h-8 text-gold-400" />
            </div>
            <h2 className="text-2xl font-bold text-gold-400">Profile Settings</h2>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-gold-400 hover:text-gold-300 transition-colors"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gold-400">First Name</label>
              <input
                type="text"
                disabled={!isEditing}
                {...register('firstName', { required: 'First name is required' })}
                className="mt-1 block w-full rounded-md border-gold-500/20 bg-dark-700 text-white shadow-sm focus:border-gold-400 focus:ring focus:ring-gold-400/20 disabled:opacity-50 disabled:bg-dark-600"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-400">{errors.firstName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gold-400">Last Name</label>
              <input
                type="text"
                disabled={!isEditing}
                {...register('lastName', { required: 'Last name is required' })}
                className="mt-1 block w-full rounded-md border-gold-500/20 bg-dark-700 text-white shadow-sm focus:border-gold-400 focus:ring focus:ring-gold-400/20 disabled:opacity-50 disabled:bg-dark-600"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-400">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gold-400">Email</label>
            <input
              type="email"
              disabled={!isEditing}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className="mt-1 block w-full rounded-md border-gold-500/20 bg-dark-700 text-white shadow-sm focus:border-gold-400 focus:ring focus:ring-gold-400/20 disabled:opacity-50 disabled:bg-dark-600"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gold-400">Phone Number</label>
            <input
              type="tel"
              disabled={!isEditing}
              {...register('phoneNumber')}
              className="mt-1 block w-full rounded-md border-gold-500/20 bg-dark-700 text-white shadow-sm focus:border-gold-400 focus:ring focus:ring-gold-400/20 disabled:opacity-50 disabled:bg-dark-600"
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-400">{errors.phoneNumber.message}</p>
            )}
          </div>

          {isEditing && (
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-dark-900 bg-gold-400 hover:bg-gold-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          )}
        </form>

        <div className="mt-8 pt-8 border-t border-gold-500/20">
          <h3 className="text-lg font-medium text-gold-400">Account Information</h3>
          <dl className="mt-4 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gold-400/60">Username</dt>
              <dd className="mt-1 text-sm text-white">{authUser?.username}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gold-400/60">Role</dt>
              <dd className="mt-1 text-sm text-white">
                {authUser?.roles.join(', ')}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}