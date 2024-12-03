import React from "react";
import {Button, Layout, Menu} from "antd";
import {DeleteOutlined, PlusOutlined, StarOutlined, UnorderedListOutlined} from "@ant-design/icons";
import {Link, Outlet} from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import {Content} from "antd/es/layout/layout";

const SurveyManage:React.FC = () => {
    return  <Layout>
        {/* Sider */}
        <Sider width={200} style={{ backgroundColor: "#f0f2f5", padding: "16px" }}>
            {/* 新建问卷按钮 */}
            <Button
                type="primary"
                icon={<PlusOutlined />}
                block
                style={{ marginBottom: "16px" }}
            >
                新建问卷
            </Button>
            {/* 菜单 */}
            <Menu
                mode="inline"
                defaultSelectedKeys={["/manage/list"]}
                items={[
                    {
                        key: "/manage/list",
                        icon: <UnorderedListOutlined />,
                        label: <Link to="/manage/list">我的问卷</Link>,
                    },
                    {
                        key: "/manage/star",
                        icon: <StarOutlined />,
                        label: <Link to="/manage/star">星标问卷</Link>,
                    },
                    {
                        key: "/manage/trash",
                        icon: <DeleteOutlined />,
                        label: <Link to="/manage/trash">回收站</Link>,
                    },
                ]}
            />
        </Sider>
        <Content>
            <Outlet/>
        </Content>
    </Layout>
}

export default SurveyManage