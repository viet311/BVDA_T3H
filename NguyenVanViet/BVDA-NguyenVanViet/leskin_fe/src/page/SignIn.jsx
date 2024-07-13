import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { postRequest } from '../hook/api';
import { useNavigate } from 'react-router-dom';
const SignIn = () => {
    const navigate = useNavigate()
    const onFinish = (values) => {
        setLoading(true)
        postRequest('/user/login', values)
            .then(data => {
                if (data.code == 200) {
                    message.success('Đăng nhập thành công')
                    localStorage.setItem('accessToken', data.result?.token);
                    localStorage.setItem('role', data.result?.role);
                    localStorage.setItem('id', data.result?.userId);
                    navigate("/")
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
            <div className='font-bold text-xl pb-6 text-center'>Đăng nhập</div>
            <Form
                layout="vertical"
                name="basic"
                initialValues={{
                    remember: true,
                }}
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
                    name="remember"
                    valuePropName="checked"
                >
                    <Checkbox>Nhớ tài khoản</Checkbox>
                </Form.Item>

                <Form.Item
                >
                    <Button type="primary" htmlType="submit" className='w-full' loading={loading}>
                        Đăng nhập
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </div>)
};
export default SignIn;