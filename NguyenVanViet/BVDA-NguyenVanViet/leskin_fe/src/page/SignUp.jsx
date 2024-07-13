import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { postRequest } from '../hook/api';
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
    const navigate = useNavigate()
    const onFinish = (values) => {
        setLoading(true)
        postRequest('/user/create', { ...values, role: 'user' })
            .then(data => {
                if (data.code == 200) {
                    message.success('Đăng ký thành công, Hãy đăng nhập')
                    localStorage.setItem('accessToken', data.result?.token);
                    navigate("/signin")
                }
                else {
                    message.error(data?.message)
                }
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    };
    const onFinishFailed = () => {
        message.error("Cần điền đủ các trường")
    };
    const [loading, setLoading] = useState(false)
    return (<div className='h-full flex flex-col items-center justify-center'>
        <div className='w-1/2 p-10 shadow-md rounded-xl bg-white'>
            <div className='font-bold text-xl pb-6 text-center'>Đăng ký</div>
            <Form
                layout="vertical"
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Tài khoản"
                    name="userName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Tên đầy đủ"
                    name="fullName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your full name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Số điện thoại"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your phone!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="confirm"
                    label="Xác nhận mật khẩu"
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
                                return Promise.reject(new Error('The new password that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                >
                    <Button type="primary" htmlType="submit" className='w-full' loading={loading}>
                        Đăng ký
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </div>)
};
export default SignUp;