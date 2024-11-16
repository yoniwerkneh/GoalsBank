import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { login } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { LoginCredentials } from '../types/auth';
import { Lock, ChevronRight } from 'lucide-react';

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginCredentials>();
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginCredentials) => {
    try {
      const response = await login(data.username, data.password);
      authLogin(response);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center bg-dark-900">
      {/* Left side - Welcome Message */}
      <div className="hidden lg:flex flex-1 flex-col justify-center p-12 animate-fade-in">
        <div className="space-y-6 animate-slide-up">
          <h1 className="text-5xl font-bold text-white mb-6">
            Welcome to <span className="text-primary-400">NextGen</span> Banking
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-md leading-relaxed">
            Experience the future of banking with our secure and intuitive platform.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-gray-300 animate-slide-left" style={{ animationDelay: '0.2s' }}>
              <div className="w-2 h-2 rounded-full bg-primary-400"></div>
              <p className="text-lg">Secure and encrypted banking</p>
            </div>
            <div className="flex items-center gap-4 text-gray-300 animate-slide-left" style={{ animationDelay: '0.4s' }}>
              <div className="w-2 h-2 rounded-full bg-primary-400"></div>
              <p className="text-lg">Real-time transaction tracking</p>
            </div>
            <div className="flex items-center gap-4 text-gray-300 animate-slide-left" style={{ animationDelay: '0.6s' }}>
              <div className="w-2 h-2 rounded-full bg-primary-400"></div>
              <p className="text-lg">Smart savings goals</p>
            </div>
          </div>
          <div className="pt-8 animate-bounce-slow">
            <ChevronRight className="w-8 h-8 text-primary-400" />
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 p-4 lg:p-12 animate-slide-left bg-dark-800 min-h-[calc(100vh-4rem)]">
        <div className="max-w-md mx-auto">
          <div className="bg-dark-700 shadow-lg rounded-lg p-8 border border-primary-500/20">
            <div className="flex justify-center mb-8">
              <div className="bg-primary-500/10 p-3 rounded-full">
                <Lock className="w-8 h-8 text-primary-400" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-center mb-8 text-white">Login to Your Account</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300">Username</label>
                <input
                  type="text"
                  {...register('username', { required: 'Username is required' })}
                  className="mt-1 block w-full rounded-md border border-primary-500/20 bg-dark-600 text-white shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-400/20"
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-400">{errors.username.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">Password</label>
                <input
                  type="password"
                  {...register('password', { required: 'Password is required' })}
                  className="mt-1 block w-full rounded-md border border-primary-500/20 bg-dark-600 text-white shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-400/20"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 transition-colors"
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>

              <p className="text-center text-sm text-gray-400">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary-400 hover:text-primary-300">
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}