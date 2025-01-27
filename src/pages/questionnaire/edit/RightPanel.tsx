import React from "react";
import {FileTextOutlined, SettingOutlined} from "@ant-design/icons";
import {Tabs} from "antd";
import ComponentProp from "./ComponentProp";

const RightPanel: React.FC = () => {
    const tabsItems = [
        {
            key: "prop",
            label: (
                <span>
                    <FileTextOutlined/>
                    Properties
                </span>
            ),
            children: <ComponentProp/>
        },
        {
            key: "setting",
            label: (
                <span>
                    <SettingOutlined/>
                    Setting
                </span>
            ),
            children: <div>Setting</div>
        }
    ]
    return (<Tabs defaultActiveKey={"prop"} items={tabsItems}/>)
}

export default RightPanel