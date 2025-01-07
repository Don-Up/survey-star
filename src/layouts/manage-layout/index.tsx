import React, {useState} from "react";
import {Button, Layout, Menu, message} from "antd";
import {DeleteOutlined, FormOutlined, PlusOutlined, StarOutlined, UnorderedListOutlined} from "@ant-design/icons";
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import {createQuestionnaireService} from "../../services/questionnaire";
import {useRequest} from "ahooks";
import Logo from "../../components/Logo";
import Title from "antd/es/skeleton/Title";
import {calc} from "antd/es/theme/internal";
import styles from "../main-layout/index.module.css";
import UserInfo from "../../components/UserInfo";

const { Header, Footer, Content,
    Sider } = Layout;

const SurveyManage:React.FC = () => {
    const nav = useNavigate()
    const {pathname} = useLocation()

    const {loading, run: handleCreateClick} = useRequest(createQuestionnaireService, {
        manual: true,
        onSuccess: (res) => {
            if (res) {
                const {id} = res.data.data || {}
                if (id) {
                    nav(`/questionnaire/edit/${id}`)
                    message.success("Questionnaire created successfully")
                }
            }
        },
    })

    return  <Layout>
        <Header>
            <div className={"flex"}>
                <Logo/>
                <UserInfo className={"ml-auto"}/>
            </div>
        </Header>
        <Layout style={{height: "calc(100vh - 64px*2)"}}>
            <Sider width={250} style={{ backgroundColor: "#f0f2f5", padding: "16px" }}>
                {/* 新建问卷按钮 */}
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    block
                    className={"mb-4"}
                    onClick={handleCreateClick}
                    disabled={loading}
                    size={"large"}
                >
                    New Questionnaire
                </Button>
                {/* 菜单 */}
                <Menu
                    mode="inline"
                    defaultSelectedKeys={["/manage/list"]}
                    items={[
                        {
                            key: "/manage/list",
                            icon: <UnorderedListOutlined />,
                            label: <Link to="/manage/list">My Questionnaire</Link>,
                        },
                        {
                            key: "/manage/star",
                            icon: <StarOutlined />,
                            label: <Link to="/manage/star">Starred Questionnaire</Link>,
                        },
                        {
                            key: "/manage/trash",
                            icon: <DeleteOutlined />,
                            label: <Link to="/manage/trash">Recycle bin</Link>,
                        },
                    ]}
                />
            </Sider>
            <Content style={{width: "calc(100vw - 250px)"}}>
                <Outlet/>
            </Content>
        </Layout>
        <Footer className={styles.footer}>XiaoMu Questionnaire &copy;2023 - present. Created By Me</Footer>
    </Layout>
}

export default SurveyManage