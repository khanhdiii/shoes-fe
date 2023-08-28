import { auth } from '@/firebase';
import useAuth from '@/hooks/useAuth';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { Form, Input, message, Row, Col, Button, Spin } from 'antd';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

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
      }
    } catch (error: any) {
      setLoading(false);
      message.error(error.message);
    }
  };

  const handleRouter = () => {
    {
      router.push('/login');
    }
  };

  useEffect(() => {
    if (user && user.emailVerified) {
      router.push('/');
    }
  }, [user, router]);

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Register - NetFlix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        alt=""
        src="https://rb.gy/p2hphi"
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
      />
      <img
        src="https://rb.gy/ulxxee"
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
        width={150}
        height={150}
        onClick={handleRouter}
      />
      <Row justify="center">
        <Col xs={24} sm={24} md={24} lg={24}>
          <Spin spinning={loading}>
            <Form
              layout="vertical"
              form={formRegister}
              name="register"
              onFinish={onFinish}
              className="form-register relative mt-24 space-y-4 rounded bg-black/75 py-10 w-500 px-20"
            >
              <h1 className="text-4xl font-semibold text-center text-white mb-10">
                Register
              </h1>
              <span className="text-white text-xl">Email</span>{' '}
              <span className="text-red-700">*</span>
              <Form.Item
                className="inline-block w-full text-white"
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
              <span className="text-white text-xl">Password</span>{' '}
              <span className="text-red-700">*</span>
              <Form.Item
                className="inline-block w-full"
                name="password"
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
              <span className="text-white text-xl">Confirm Password</span>{' '}
              <span className="text-red-700">*</span>
              <Form.Item
                name="confirm"
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
                <Button
                  type="primary"
                  htmlType="submit"
                  className="flex w-full h-10 rounded bg-[#e50914] py-3 font-semibold capitalize justify-center items-center !hover:bg-black mt-10"
                  disabled={loading}
                >
                  <p className="justify-center items-center text-lg">
                    {loading ? 'Registering...' : 'Register'}
                  </p>
                </Button>
              </div>
              <div className="flex flex-row py-3 font-semibold capitalize justify-start items-center text-red-500 text-lg hover:text-white">
                <ArrowLeftIcon className="left-icon" />{' '}
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
