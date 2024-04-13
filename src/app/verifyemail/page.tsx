'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tokenParam = searchParams.get('token') || '';

  const [error, setError] = useState(false);

  async function verifyEmail() {
    try {
      await axios.post('/api/users/verifyemail', { token: tokenParam });
      toast.success('user verified successfully');
      router.push('/login');
    } catch (error: any) {
      setError(true);
      console.log(error);
      toast.error(error.response.data.error);
    }
  }

  return (
    <div className='flex min-h-screen flex-col max-w-xs justify-center items-center mx-auto'>
      <h1 className='text-4xl'>Verify Email</h1>
      <button
        className='bg-green-500 py-2 px-4 rounded-md text-white'
        onClick={verifyEmail}
      >
        Click here to verify
      </button>
      {error && (
        <div>
          <h2 className='text-xl text-red-500'>Error</h2>
        </div>
      )}
    </div>
  );
}
