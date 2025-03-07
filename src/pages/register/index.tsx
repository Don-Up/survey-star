// Component.tsx
import React from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import {registerService} from "../../services/user";
import {useNavigate} from "react-router-dom";

const Register: React.FC = () => {

    const nav = useNavigate()
    const onFinish = async (values: any) => {
        try {
            const response = await registerService({
                email: values.email,
                name: values.username,
                password: values.password,
            });
            if (response.success) {
                message.success(response.message);
                nav("/login", {replace: true})
            } else {
                message.error(response.message);
            }
        } catch (error) {
            console.error('Registration failed:', error);
            message.error('注册过程中发生错误，请重试。');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 bg-white rounded-md shadow-md">
                {/* Title */}
                <div className="text-center mb-6">
                    <UserOutlined className="text-3xl text-gray-700" />
                    <h1 className="text-2xl font-semibold text-gray-800 mt-2">
                        注册新用户
                    </h1>
                </div>

                {/* Form */}
                <Form
                    name="register"
                    onFinish={onFinish}
                    layout="vertical"
                    autoComplete="off"
                >
                    {/* Username */}
                    <Form.Item
                        label="邮箱："
                        name="email"
                        rules={[{ required: true, message: "请输入邮箱！" }]}
                    >
                        <Input
                            placeholder="请输入邮箱"
                            prefix={<UserOutlined />}
                            className="rounded-md"
                        />
                    </Form.Item>

                    {/* Password */}
                    <Form.Item
                        label="密码："
                        name="password"
                        rules={[{ required: true, message: "请输入密码！" }]}
                    >
                        <Input.Password
                            placeholder="请输入密码"
                            prefix={<LockOutlined />}
                            className="rounded-md"
                        />
                    </Form.Item>

                    {/* Confirm Password */}
                    <Form.Item
                        label="确认密码："
                        name="confirmPassword"
                        rules={[
                            { required: true, message: "请确认密码！" },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue("password") === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error("两次密码输入不一致！"));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            placeholder="请再次输入密码"
                            prefix={<LockOutlined />}
                            className="rounded-md"
                        />
                    </Form.Item>

                    {/* Nickname */}
                    <Form.Item
                        label="用户名："
                        name="username"
                        rules={[{ required: true, message: "请输入用户名！" }]}
                    >
                        <Input
                            placeholder="请输入用户名"
                            className="rounded-md"
                        />
                    </Form.Item>

                    {/* Submit Button */}
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full rounded-md bg-blue-500 hover:bg-blue-600 text-white"
                        >
                            注册
                        </Button>
                    </Form.Item>
                </Form>

                {/* Footer */}
                <div className="text-center text-sm text-gray-500">
                    已有账户？<a href="/login" className="text-blue-500">登录</a>
                </div>
            </div>
        </div>
    );
};

export default Register;
