'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get('token');

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!token) {
      setError('Missing or invalid reset token.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          new_password: password,
          confirm_password: confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || 'Failed to reset password.');
      } else {
        setSuccess('Password reset successfully! Redirecting...');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-white text-black">
      <title>Reset Password</title>
      <div className="bg-white border-2 border-black shadow-md w-full max-w-md p-8 rounded-lg">
        <div className="flex flex-col items-center pb-6">
          <img src="/sw-logo.png" alt="Sceneweaver Logo" className="w-28 mb-4" />
          <h2 className="text-2xl font-bold text-center">Reset Password</h2>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleResetPassword}>
          <div className="relative w-full">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder=" "
              className="peer w-full bg-white border border-gray-300 text-gray-800 placeholder-transparent rounded-md px-3 pt-4 pb-2 focus:outline-none focus:border-black transition-colors"
            />
            <label
              htmlFor="password"
              className="absolute left-3 top-0 -translate-y-1/2 px-1 text-sm bg-white text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-black peer-focus:bg-white"
            >
              New Password
            </label>
          </div>

          <div className="relative w-full">
            <input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder=" "
              className="peer w-full bg-white border border-gray-300 text-gray-800 placeholder-transparent rounded-md px-3 pt-4 pb-2 focus:outline-none focus:border-black transition-colors"
            />
            <label
              htmlFor="confirmPassword"
              className="absolute left-3 top-0 -translate-y-1/2 px-1 text-sm bg-white text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-black peer-focus:bg-white"
            >
              Confirm Password
            </label>
          </div>

          <div className="text-sm">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              Show Password
            </label>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          <button
            type="submit"
            className="bg-black text-white font-semibold py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
