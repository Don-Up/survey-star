// index.tsx
import React from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { loginService } from "../../services/user";
import { useNavigate } from "react-router-dom";
import {setEmail, setToken} from "../../utils/user-info";

const Login: React.FC = () => {
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        try {
            const response = await loginService({
                email: values.username, // 假设用户名字段实际上是邮箱
                password: values.password,
            });
            if (response.success) {
                message.success("登录成功");
                const { accessToken, email } = response
                setToken(accessToken)
                setEmail(email)
                // 登录成功后跳转到首页或其他页面
                navigate('/', { replace: true });
            } else {
                message.error(response.message);
            }
        } catch (error) {
            console.error('Login failed:', error);
            message.error('登录过程中发生错误，请重试。');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 bg-white rounded-md shadow-md">
                {/* Title */}
                <div className="text-center mb-6">
                    <UserOutlined className="text-3xl text-gray-700" />
                    <h1 className="text-2xl font-semibold text-gray-800 mt-2">
                        用户登录
                    </h1>
                </div>

                {/* Form */}
                <Form
                    name="login"
                    onFinish={onFinish}
                    layout="vertical"
                    autoComplete="off"
                >
                    {/* Username */}
                    <Form.Item
                        label="用户名："
                        name="username"
                        rules={[{ required: true, message: "请输入用户名！" }]}
                    >
                        <Input
                            placeholder="请输入用户名"
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

                    {/* Remember Me */}
                    <Form.Item name="remember" valuePropName="checked" className="mb-4">
                        <Checkbox>记住我</Checkbox>
                    </Form.Item>

                    {/* Submit Button */}
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full rounded-md bg-blue-500 hover:bg-blue-600 text-white"
                        >
                            登录
                        </Button>
                    </Form.Item>
                </Form>

                {/* Footer */}
                <div className="text-center text-sm text-gray-500">
                    没有账户？<a href="/register" className="text-blue-500">注册新用户</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
