import React, { useState } from 'react'
import { Card, Space, Button, Checkbox, Form, Input, message } from 'antd';
import axios from "axios";
import { Link, useNavigate, useParams } from 'react-router-dom';

const ChangePassword = () => {

    let navigate = useNavigate()
    let [loading, setLoading] = useState(true)
    let { email } = useParams();


    const onFinish = async (values) => {
        setLoading(false);
        try {
            // Your API call logic goes here

            console.log("token", email, values.password);
            let newpassword = {
                token: email,
                password: values.password
            }
            let data = await axios.post("http://localhost:8000/api/v1/auth/changepassword", newpassword)
            message.success(data.data);
            navigate("/login")

        } catch (error) {
            // console.log(error);
            message.error(error, 'Failed to change password');
        }
        setLoading(true);

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };



    return (
        <Space direction="vertical" size={16}>
            <Card title="Enter New Password" style={{ width: 500 }}>
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
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input new password!',
                            },
                        ]}
                    >
                        <Input.Password />
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
                                Submitting
                            </Button>
                        )}
                    </Form.Item>
                </Form>
            </Card>
        </Space>
    )
}

export default ChangePassword