import React from "react";
import "antd/dist/reset.css";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {Layout} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import styles from "./index.module.css"
import Logo from "../../components/Logo";
import UserInfo from "../../components/UserInfo";

const MainLayout: React.FC = () => {

    const {pathname} = useLocation()

    return (<Layout>
        <Header className={styles.header}>
            <Logo/>
            {pathname==="/" && <UserInfo className={"ml-auto"}/>}
        </Header>
        <Content className={styles.content}>
            <Outlet/>
        </Content>
        <Footer className={styles.footer}>XM Questionnaire &copy;2023 - present. Created By Me</Footer>
    </Layout>)
};

export default MainLayout;