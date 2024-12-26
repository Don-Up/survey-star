import React from "react";
import "antd/dist/reset.css";
import {Outlet} from "react-router-dom";
import {Layout} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import styles from "./index.module.css"

const MainLayout: React.FC = () => {
    return (<Layout>
        <Header className={styles.header}>
            <div>Logo</div>
            <div className={"ml-auto"}>Login</div>
        </Header>
        <Content className={styles.content}>
            <Outlet/>
        </Content>
        <Footer className={styles.footer}>XiaoMu Questionnaire &copy;2023 - present. Created By Me</Footer>
    </Layout>)
};

export default MainLayout;