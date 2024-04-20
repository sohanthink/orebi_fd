import React, { useState } from 'react'
import { Card, Space, Button, Checkbox, Form, Input, message } from 'antd';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const OtpPage = () => {

    let [loading, setLoading] = useState(true)
    let { email } = useParams();
    let navigate = useNavigate()

    const onFinish = async (values) => {
        setLoading(false)
        // console.log('Success:', values);
        try {
            let otpdata = {
                otp: values.otp,
                email: email
            }

            // console.log(otpdata.otp, otpdata.email);

            let otpData = await axios.post("http://localhost:8000/api/v1/auth/otpverify", otpdata)
            console.log(otpData.data)
            message.success(otpData.data);
            navigate("/login")

        } catch (error) {
            console.log(error);
            message.error(error.response);

        }
        setLoading(true)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Space direction="vertical" size={16}>
            <Card title="Enter the OTP from your Email" style={{ width: 500 }}>
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
                        display: 'flex'
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >

                    <Form.Item
                        label="Otp"
                        name="otp"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your OTP!',
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
                                Enter
                            </Button>
                        ) : (
                            <Button className='reg_btn' type="primary" loading>
                                Enter
                            </Button>
                        )}
                    </Form.Item>
                </Form>
            </Card>
        </Space>
    )
}

export default OtpPage