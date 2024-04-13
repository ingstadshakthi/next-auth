'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState('');

  async function logout() {
    try {
      await axios.get('/api/users/logout');
      toast.success('Logout Success');
      router.push('/login');
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  }

  useEffect(() => {
    async function getUserDetail() {
      try {
        const res = await axios.get('/api/users/me');
        console.log(res.data.data._id);
        setData(res.data.data._id);
      } catch (error: any) {
        toast.error(error.response.data.error);
        router.push('/login');
      }
    }
    getUserDetail();
  }, []);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>ProfilePage</h1>
      <button className='bg-orange-500 rounded-md py-2 px-4' onClick={logout}>
        logout
      </button>
      <p>{data}</p>
    </div>
  );
}
