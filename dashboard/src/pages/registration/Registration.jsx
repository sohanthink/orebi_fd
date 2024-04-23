import React, { useState } from 'react'
import { Card, Space, Button, Checkbox, Form, Input, message } from 'antd';
import axios from "axios";
import { Link, NavLink, useNavigate } from 'react-router-dom';



const Registration = () => {

    let [loading, setLoading] = useState(true)


    let navigate = useNavigate()
    const onFinish = async (values) => {
        setLoading(false)
        // console.log('Success:', values);
        try {
            let regdata = {
                name: values.name,
                email: values.email,
                password: values.password,
            }

            let userData = await axios.post("http://localhost:8000/api/v1/auth/registration", regdata)
            console.log(userData.data)
            message.error(userData.data.message);
            navigate(`/otp/${values.email}`)

        } catch (error) {
            console.log(error.response.data.message);
            message.error(error.response.data.message);

        }

        // Reset form values to empty strings
        values = {
            name: "",
            email: "",
            password: ""
        };
        setLoading(true)
        console.log(loading);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Space direction="vertical" size={16}>
            <Card title="Registration" style={{ width: 500 }}>
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
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Name!',
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
                                Submit
                            </Button>
                        ) : (
                            <Button className='reg_btn' type="primary" loading>
                                Loading
                            </Button>
                        )}

                        <div style={{ display: 'flex', paddingTop: 15 }}><Link to="/login">Already An User??</Link></div>
                    </Form.Item>
                </Form>
            </Card>
        </Space>
    )
}

export default Registration