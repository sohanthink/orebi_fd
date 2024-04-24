import React, { useState } from 'react'
import { Card, Space, Button, Checkbox, Form, Input, message } from 'antd';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';


const ForgotPassword = () => {

    let navigate = useNavigate()
    let [loading, setLoading] = useState(true)


    const onFinish = async (values) => {
        setLoading(false)
        // console.log('Success:', values);
        try {
            let forgotData = {
                email: values.email
            }

            let userData = await axios.post("http://localhost:8000/api/v1/auth/forgotpassword", forgotData)
            console.log(userData.data)
            message.success(userData.data);

            // navigate(`/changepassword/${values.email}`)

        } catch (error) {
            console.log(error.response.data.message);
            console.log(error.response.data)
            message.error(error.response.data);

        }


        setLoading(true)
        // console.log(loading);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <Space direction="vertical" size={16}>
            <Card title="Enter Your Email To Change the Password" style={{ width: 500 }}>
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
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 20 }}>
                            {/* <div style={{}}><Link to="/">Click To Reset Pssword?</Link></div> */}
                            {/* <div style={{}}><Link to="/">Go To Registration?</Link></div> */}
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        </Space>
    )
}

export default ForgotPassword