import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-[#001529] text-white flex items-center px-4 h-16">
                <div className="text-lg font-bold flex-1">小慕问卷</div>
                <Link to="/login" className="text-white">
                    登录
                </Link>
            </header>

            {/* Main Content */}
            <main className="flex flex-1 flex-col justify-center items-center text-center">
                {/* Illustration */}
                <img
                    src="https://via.placeholder.com/300x200.png?text=404+Illustration"
                    alt="404 Illustration"
                    className="w-72 h-auto mb-4"
                />
                {/* Error Message */}
                <h1 className="text-4xl font-bold mb-2">404</h1>
                <p className="text-lg text-gray-600 mb-6">抱歉，您访问的页面不存在</p>
                {/* Button */}
                <Link to="/">
                    <Button type="primary" size="large">
                        返回首页
                    </Button>
                </Link>
            </main>

            {/* Footer */}
            <footer className="text-center bg-white py-4 h-16">
                小慕问卷 ©2023 - present. Created by 双越老师
            </footer>
        </div>
    );
};

export default NotFound;