import React from "react";
import {AppstoreOutlined, BarsOutlined} from "@ant-design/icons";
import {Tabs} from "antd";
import ComponentLib from "./ComponentLib";
import Layers from "./Layers";

const LeftPanel: React.FC = () => {
    const tabItems = [
        {
            key: 'componentLib',
            label: (
                <span><AppstoreOutlined/> Component Library</span>
            ),
            children: <ComponentLib/>
        },
        {
            key: 'layers',
            label: (
                <span><BarsOutlined/> Layers</span>
            ),
            children: <Layers/>
        }
    ]
    return (<div>
        <Tabs items={tabItems} defaultActiveKey={"componentLib"}/>
    </div>)
}

export default LeftPanel