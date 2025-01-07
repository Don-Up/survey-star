import React from "react";
import {Space, Typography} from "antd";
import {FormOutlined} from "@ant-design/icons";
import {useTranslationHelper} from "../../hook/useTranslationHelper";
import {Link} from "react-router-dom";

const {Title} = Typography
const Logo:React.FC = () => {
    
   const t = useTranslationHelper()
    
  return (<div>
      <Link to={"/"}>
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