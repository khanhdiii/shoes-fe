import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Form, Input, message, Row, Col, Spin } from 'antd';
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';

import { auth } from '../firebase/firebase';
import useAuth from '../hooks/useAuth';

import github from '../public/icon/Github.png';
import google from '../public/icon/Google.webp';
import facebook from '../public/icon/Facebook.png';

function Login() {
  const [login, setLogin] = useState(false);

  const [formLogin] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();

  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      await signIn(values?.email, values?.password);
      message.success('Login successful');
      setLogin(true);
    } catch (error) {
      message.error('Email or password is not valid');
    }
  };

  const providerGoogle = new GoogleAuthProvider();
  const providerGithub = new GithubAuthProvider();
  const providerFacebook = new FacebookAuthProvider();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, providerGoogle);

      if (result) {
        // const user = result.user;
        // // Save user data to Firestore
        // const userDoc = await db
        //   .collection('customers')
        //   .doc(user.uid)
        //   .set({
        //     uid: user.uid,
        //     email: user.email,
        //     stripeId: '', // You can set other fields here
        //     stripeLink: '',
        //     provider: user.providerData[0]?.providerId || '',
        //     photoURL: user.providerData[0]?.photoURL || '',
        //   });

        message.success('Login successful');
        router.push('/');
      } else {
        message.warning('Login failed');
      }
    } catch (error) {
      message.error('Google sign-in failed');
    }
  };

  const signInWithGithub = async () => {
    const result = await signInWithPopup(auth, providerGithub);
    if (result) {
      message.success('login Successfull');
      router.push('/');
    } else {
      message.warning('email existed or login failed ');
    }
  };

  const signInWithFacebook = async () => {
    const result = await signInWithPopup(auth, providerFacebook);
    if (result) {
      message.success('login Successfull');
      router.push('/');
    } else {
      message.warning('email existed or login failed ');
    }
  };

  useEffect(() => {
    if (login) router.push('/');
  }, [login]);

  return (
    <div className="relative flex h-screen w-screen flex-col md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Image
        alt=""
        src="/img/background.jpeg"
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
      />

      <Row justify="center">
        <Col xs={24} sm={24} md={24} lg={24}>
          <Spin spinning={loading}>
            <Form
              layout="vertical"
              form={formLogin}
              name="login"
              onFinish={onFinish}
              className="form-register relative space-y-4 rounded bg-white py-10 w-[500px] px-20"
            >
              <h1 className="text-4xl font-semibold text-center text-black mb-10">
                Login
              </h1>
              <Form.Item
                className="inline-block w-full text-white"
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Email!',
                  },
                  {
                    type: 'email',
                    message: 'Please input a valid email!',
                  },
                ]}
              >
                <Input className="custom-input" />
              </Form.Item>

              <Form.Item
                className="inline-block w-full"
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  {
                    min: 6,
                    max: 30,
                    message: 'Please input between 6-30 characters',
                  },
                ]}
              >
                <Input.Password className="custom-input" />
              </Form.Item>
              <div>
                <button
                  className="w-full rounded bg-black text-white py-2 mt-1 mb-1 font-medium capitalize"
                  onClick={() => formLogin.submit()}
                >
                  Sign In
                </button>

                <label className="mb-1">
                  <div className="text-sm">
                    <div
                      onClick={() => router.push('/forgot-password')}
                      className="cursor-pointer font-normal text-lg text-black hover:text-blue-500"
                    >
                      Forgot password?
                    </div>
                  </div>
                </label>
                <h3 className="flex justify-center my-1 text-lg font-medium text-gray-300">
                  Or Login With
                </h3>
                <div className="flex justify-center">
                  <div className="flex justify-around items-center bg-white w-3/6 rounded-md">
                    <Image
                      width={30}
                      height={30}
                      className=" rounded bg-transparent py-3 font-semibold capitalize cursor-pointer border-black"
                      onClick={() => signInWithGoogle()}
                      src={google}
                      alt="google"
                    />
                    <Image
                      width={30}
                      height={30}
                      className=" rounded bg-white py-3 font-semibold capitalize cursor-pointer"
                      onClick={() => signInWithGithub()}
                      src={github}
                      alt="github"
                    />
                    <Image
                      width={30}
                      height={30}
                      className=" rounded bg-white py-3 font-semibold capitalize cursor-pointer"
                      onClick={() => signInWithFacebook()}
                      src={facebook}
                      alt="facebook"
                    />
                  </div>
                </div>
              </div>

              <div className="text-[gray]">
                New a Account?{' '}
                <button
                  type="submit"
                  className="text-black font-semibold hover:underline"
                  onClick={() => router.push('/register')}
                >
                  Sign up now
                </button>
              </div>
            </Form>
          </Spin>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
