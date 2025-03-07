import React, {useEffect, useState} from "react";
import {Space, Typography} from "antd";
import {FormOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {useGetUserInfo} from "../../hook/useGetUserInfo";
import {MANAGE_INDEX_PATHNAME} from "../../router";
import {useTranslation} from "react-i18next";

const {Title} = Typography
const Logo: React.FC = () => {

    const { t } = useTranslation()

    const {name} = useGetUserInfo()

    const [pathname, setPathname] = useState("/")

    useEffect(() => {
        if(name){
            setPathname(MANAGE_INDEX_PATHNAME)
        }
    }, [name])

    return (<div>
        <Link to={pathname}>
            <Space direction={"horizontal"}>
                <Title level={3}>
                    <FormOutlined/>
                </Title>
                <Title level={3}>{t("xm_questionnaire")}</Title>
            </Space>
        </Link>
    </div>)
}

export default Logo