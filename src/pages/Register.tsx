import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { register as registerApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { RegisterData } from '../types/auth';
import { UserPlus } from 'lucide-react';

export default function Register() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterData>();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterData) => {
    try {
      const response = await registerApi(data);
      login(response);
      toast.success('Registration successful!');
      navigate('/profile');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Registration failed');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center">
      {/* Left side - Welcome Message */}
      <div className="hidden lg:flex flex-1 flex-col justify-center p-12 animate-fade-in">
        <h1 className="text-4xl font-bold text-primary-500 mb-6">
          Join Our Banking Family
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-md">
          Start your journey to financial success. Create an account today and unlock a world of smart banking features.
        </p>
        <div className="space-y-4 text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary-500"></div>
            <p>Easy account management</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary-500"></div>
            <p>Personalized financial insights</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary-500"></div>
            <p>24/7 secure banking</p>
          </div>
        </div>
      </div>

      {/* Right side - Registration Form */}
      <div className="w-full lg:w-1/2 p-4 lg:p-12 animate-slide-left">
        <div className="max-w-md mx-auto">
          <div className="bg-white shadow-lg rounded-lg p-8 border border-primary-500/20">
            <div className="flex justify-center mb-8">
              <div className="bg-primary-500/10 p-3 rounded-full">
                <UserPlus className="w-8 h-8 text-primary-500" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Create an Account</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    {...register('firstName', { required: 'First name is required' })}
                    className="mt-1 block w-full rounded-md border border-primary-500/20 bg-white text-gray-900 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500/20"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    {...register('lastName', { required: 'Last name is required' })}
                    className="mt-1 block w-full rounded-md border border-primary-500/20 bg-white text-gray-900 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500/20"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  {...register('username', { required: 'Username is required' })}
                  className="mt-1 block w-full rounded-md border border-primary-500/20 bg-white text-gray-900 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500/20"
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className="mt-1 block w-full rounded-md border border-primary-500/20 bg-white text-gray-900 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500/20"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters'
                    }
                  })}
                  className="mt-1 block w-full rounded-md border border-primary-500/20 bg-white text-gray-900 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500/20"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  {...register('phoneNumber')}
                  className="mt-1 block w-full rounded-md border border-primary-500/20 bg-white text-gray-900 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500/20"
                />
                {errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-500">{errors.phoneNumber.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 transition-colors"
              >
                {isSubmitting ? 'Creating account...' : 'Register'}
              </button>

              <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-primary-500 hover:text-primary-400">
                  Sign in here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}