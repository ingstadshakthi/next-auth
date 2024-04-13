'use client';

import { SyntheticEvent, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const { username, email, password }: any = e.target;

    console.log(username.value, email.value, password.value);
    // return;

    if (
      !username.value.trim() ||
      !email.value.trim() ||
      !password.value.trim()
    ) {
      console.log('toast');
      return toast.error('Fields are empty');
    }
    const user = {
      username: username.value,
      email: email.value,
      password: password.value,
    };
    try {
      setLoading(true);
      const response = await axios.post('/api/users/signup', user);
      console.log('signup success', response.data);
      toast.success('signup successful');
      setLoading(false);
      router.push('/login');
    } catch (error: any) {
      toast.error('SignUp failed');
      setLoading(false);
    }
  }
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col p-8 max-w-4xl border border-gray-400 rounded-md'
      >
        <h1 className='text-4xl py-2'>{loading ? 'Processing' : 'Signup'}</h1>
        <div className='border border-black mb-4'></div>
        <div className='form-control'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            name='username'
            placeholder='Enter username'
            required
            className='border border-gray-500 rounded-sm placeholder:font-light px-2 outline-none'
          />
        </div>
        <div className='form-control'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='Enter Email'
            required
            className='border border-gray-500 rounded-sm placeholder:font-light px-2 outline-none'
          />
        </div>
        <div className='form-control'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='Enter password'
            required
            className='border border-gray-500 rounded-sm placeholder:font-light px-2 outline-none'
          />
        </div>

        <button
          disabled={loading}
          type='submit'
          className='border bg-cyan-500 text-white py-2 my-2 rounded-md duration-300 active:scale-95'
        >
          SignIn
        </button>
      </form>
    </div>
  );
}
