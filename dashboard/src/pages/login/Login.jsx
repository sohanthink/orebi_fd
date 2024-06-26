import React, { useState } from 'react'
import { Card, Space, Button, Checkbox, Form, Input, message } from 'antd';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    let navigate = useNavigate()
    let [loading, setLoading] = useState(true)


    const onFinish = async (values) => {
        setLoading(false)
        // console.log('Success:', values);
        try {
            let logindata = {
                email: values.email,
                password: values.password,
            }

            let userData = await axios.post("http://localhost:8000/api/v1/auth/login", logindata)
            console.log(userData.data)
            message.success(userData.data);
            // navigate("/dashboard")

        } catch (error) {
            console.log(error.response.data.message);
            console.log(error.response.data)
            message.error(error.response.data);

        }

        // Reset form values to empty strings
        values = {
            email: "",
            password: ""
        };
        setLoading(true)
        // console.log(loading);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Space direction="vertical" size={16}>
            <Card title="Login" style={{ width: 500 }}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
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
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Checkbox className='reg_btn'>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        {loading ? (
                            <Button className='reg_btn' type="primary" htmlType="submit">
                                Login
                            </Button>
                        ) : (
                            <Button className='reg_btn' type="primary" loading>
                                Loading
                            </Button>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 20 }}>
                            <div style={{}}><Link to="/forgotpassword">Click To Reset Pssword?</Link></div>
                            {/* <div style={{}}><Link to="/">Go To Registration?</Link></div> */}
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        </Space>
    )
}

export default Login