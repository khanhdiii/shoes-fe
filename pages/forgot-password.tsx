import { message } from 'antd';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { auth } from '../firebase/firebase';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const router = useRouter();

  const resetEmail = () => {
    sendPasswordResetEmail(auth, email);
    message.info('Please check your email');
  };

  const handleRouter = () => {
    router.push('/login');
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            onClick={handleRouter}
            src="https://rb.gy/ulxxee"
            className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
            width={150}
            height={150}
          />
          <h1 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-white">
            Forgot Password
          </h1>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-xl font-medium leading-6 text-white"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={() => resetEmail()}
                disabled={!email}
                className="disabled:opacity-40 flex w-full text-lg justify-center rounded-md  bg-[#e50914] px-3 py-1.5 font-semibold leading-6 text-white shadow-sm hover:bg-white-400"
              >
                Send Forgot Password Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
