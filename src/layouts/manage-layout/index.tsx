import React, {useState} from "react";
import {Button, Layout, Menu, message} from "antd";
import {DeleteOutlined, PlusOutlined, StarOutlined, UnorderedListOutlined} from "@ant-design/icons";
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import {Content} from "antd/es/layout/layout";
import {createQuestionnaireService} from "../../services/questionnaire";
import {useRequest} from "ahooks";

const SurveyManage:React.FC = () => {
    const nav = useNavigate()
    const {pathname} = useLocation()
    // const [loading, setLoading] = useState(false)
    // async function handleCreateClick() {
    //     setLoading(true)
    //     const data = await createQuestionnaireService()
    //     setLoading(false)
    //     const {id} = data || {}
    //     if (id){
    //         nav(`/questionnaire/edit/${id}`)
    //         message.success("问卷创建成功")
    //     }
    // }

    const {loading, run: handleCreateClick} = useRequest(createQuestionnaireService, {
        manual: true,
        onSuccess: (data) => {
            if (data) {
                const {id} = data || {}
                if (id) {
                    nav(`/questionnaire/edit/${id}`)
                    message.success("问卷创建成功")
                }
            }
        },
    })

    return  <Layout>
        {/* Sider */}
        <Sider width={200} style={{ backgroundColor: "#f0f2f5", padding: "16px" }}>
            {/* 新建问卷按钮 */}
            <Button
                type="primary"
                icon={<PlusOutlined />}
                block
                style={{ marginBottom: "16px" }}
                onClick={handleCreateClick}
                disabled={loading}
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