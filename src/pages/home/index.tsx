import React from "react";
import { Button } from "antd";
import {Link, useNavigate} from "react-router-dom";

const Home: React.FC = () => {
    const nav = useNavigate()

    function clickHandler() {
        nav("/login")
    }

    return (
        <div>
            <p>Home</p>
            <div>
                <button onClick={clickHandler}>登录</button>
                <Link to={"/register?a=10"}>注册</Link>
            </div>
        </div>
        // <div
        //     style={{
        //         height: "100%",
        //         display: "flex",
        //         flexDirection: "column",
        //         justifyContent: "center",
        //         alignItems: "center",
        //         background: "linear-gradient(to right, #5BCEFA, #48A9FE)", // 渐变背景
        //         color: "#fff",
        //         textAlign: "center",
        //     }}
        // >
        //     {/* 标题 */}
        //     <h1 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "16px" }}>
        //         问卷调查 | 在线投票
        //     </h1>
        //
        //     {/* 描述文字 */}
        //     <p style={{ fontSize: "16px", marginBottom: "32px" }}>
        //         已累计创建问卷 1090 份，发布问卷 1000 份，收集答卷 10000 份
        //     </p>
        //
        //     {/* 按钮 */}
        //     <Button
        //         type="primary"
        //         size="large"
        //         style={{
        //             backgroundColor: "#1890ff",
        //             borderColor: "#1890ff",
        //             borderRadius: "4px",
        //         }}
        //     >
        //         开始使用
        //     </Button>
        // </div>
    );
};

export default Home;