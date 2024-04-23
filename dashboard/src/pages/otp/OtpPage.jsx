import React, { useEffect, useState } from 'react'
import { Card, Space, Button, Checkbox, Form, Input, message } from 'antd';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const OtpPage = () => {
    let { email } = useParams();
    let [data, setData] = useState("")
    let navigate = useNavigate()
    let [loading, setLoading] = useState(true)

    useEffect(() => {
        let fetcheddata = async () => {
            const response = await axios.get(`http://localhost:8000/api/v1/auth/otpverify/${email}`);
            setData(response.data);
        }
        fetcheddata();
        // console.log(data);
    }, [email])

    console.log(data);

    if (data == "Invalid Link") {
        return navigate("/")
    }

    if (data.varified == true && data.otp === "" || data.varified == "false") {
        return navigate("/login"); // Navigate to "/login" if verified is true and otp is empty
    }



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
            if (otpData.data == "Wrong OTP!!") {
                setLoading(true)
                return message.success(otpData.data);
            } else {
                message.success(otpData.data);
                navigate("/login")
            }

        } catch (error) {
            console.log(error);
            message.error(error.response);
            // if (error.response == "Already Verified")

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