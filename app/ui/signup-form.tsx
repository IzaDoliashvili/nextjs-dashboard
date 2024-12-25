'use client'

import { register } from '@/app/supabase/auth/page';
import { useState } from 'react';
import { Button } from './button';
import { useRouter } from 'next/router';

const RegisterForm = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const data = await register({ email, password });

      if (fullname) {
        await fetch('/api/update-profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fullname, userId: data.user?.id }),
        });
      }

      setMessage('Registration successful! Please check your email to verify your account.');

      setTimeout(() => {
        router.push('/auth/logIn');  
      }, 2000);
    } catch (error: any) {
      setMessage(error.message || 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
        <div className="flex-1 rounded-lg  px-6 pb-4 pt-8">
      <h1 className="text-2xl font-bold mb-4">Register</h1>

      <div className="mb-4">
        <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          id="fullname"
          type="text"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2"
      >
        {loading ? 'Registering...' : 'Register'}
      </Button>

      {message && (
        <p className="mt-4 text-sm text-center text-gray-600">
          {message}
        </p>
      )}
      </div>
    </form>
  );
};

export default RegisterForm;