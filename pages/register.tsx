import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { Form, Input, message, Row, Col, Spin } from 'antd';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { auth } from '../firebase/firebase';
import useAuth from '../hooks/useAuth';

function Register() {
  const [formRegister] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      );

      if (userCredential && auth.currentUser) {
        // Send email verification
        await sendEmailVerification(auth.currentUser);

        message.success(
          'Account registered successfully! Please check your email for verification. And back to login',
        );
        setLoading(false);
        router.push('/login');
      }
    } catch (error: any) {
      setLoading(false);
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (user && user.emailVerified) {
      router.push('/');
    }
  }, [user, router]);

  return (
    <div className="relative flex h-screen w-screen flex-col md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Register</title>
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
              form={formRegister}
              name="register"
              onFinish={onFinish}
              className="form-register relative space-y-4 rounded bg-white py-10 w-[500px] px-20"
            >
              <h1 className="text-4xl font-semibold text-center text-black mb-10">
                Register
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

              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          'The passwords that you entered do not match!',
                        ),
                      );
                    },
                  }),
                ]}
              >
                <Input.Password className="custom-input" />
              </Form.Item>
              <div>
                <button
                  className="w-full rounded bg-black text-white py-1 mt-2 mb-1 font-medium capitalize"
                  disabled={loading}
                >
                  <p className="justify-center items-center text-lg">
                    {loading ? 'Registering...' : 'Register'}
                  </p>
                </button>
              </div>
              <div className="flex flex-row py-3 font-normal capitalize justify-start items-center text-black text-lg hover:text-blue-500">
                <ArrowLeftIcon className="left-icon w-5 mx-3" />
                <button onClick={() => router.push('/login')}>
                  Back to login
                </button>
              </div>
            </Form>
          </Spin>
        </Col>
      </Row>
    </div>
  );
}

export default Register;
