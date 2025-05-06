'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setShowPopup(false);

    try {
      const response = await fetch('http://localhost:8000/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || 'Failed to send reset email');
        return;
      }

      setSuccess('Reset link sent! Check your email.');
      setEmail('');
      setShowPopup(true);
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-white text-black relative">
      <title>Reset Password</title>
      <div className="bg-white border-2 border-black shadow-md w-full max-w-md p-8 rounded-lg">
        <div className="flex flex-col items-center pb-6">
          <img src="/sw-logo.png" alt="Sceneweaver Logo" className="w-28 mb-4" />
          <h2 className="text-2xl font-bold text-center">Enter your Email</h2>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="relative w-full">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder=" "
              className="peer w-full bg-white border border-gray-300 text-gray-800 placeholder-transparent rounded-md px-3 pt-4 pb-2 focus:outline-none focus:border-black transition-colors"
            />
            <label
              htmlFor="email"
              className="absolute left-3 top-0 -translate-y-1/2 px-1 text-sm bg-white text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-black peer-focus:bg-white"
            >
              Email
            </label>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          <button
            type="submit"
            className="bg-black text-white font-semibold py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            Send Reset Link
          </button>

          <div className="text-sm mt-2 text-center">
            <Link href="/login" className="text-black hover:underline">
              Already have an account? <b>Login</b>
            </Link>
          </div>
        </form>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white border border-black p-6 rounded-lg shadow-lg relative max-w-sm w-full text-center">
            <button
              className="absolute top-2 right-2 text-black text-xl font-bold"
              onClick={() => setShowPopup(false)}
            >
              &times;
            </button>
            <h3 className="text-lg font-semibold mb-2">Email Sent</h3>
            <p className="text-gray-700">A password reset link has been sent to your email.</p>
          </div>
        </div>
      )}
    </div>
  );
}
