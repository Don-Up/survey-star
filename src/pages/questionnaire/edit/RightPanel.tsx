import React, {useEffect, useState} from "react";
import {FileTextOutlined, SettingOutlined} from "@ant-design/icons";
import {Tabs} from "antd";
import ComponentProp from "./ComponentProp";
import PageSetting from "./PageSetting";
import useGetComponentInfo from "../../../hook/useGetComponentInfo";

enum TAB_KEYS  {
    prop = "prop",
    setting = "setting"
}

/**
 * RightPanel
 * 1. ComponentProp: show and tweak the properties of the selected component.
 * 2. PageSetting: show and tweak the properties of the page.
 * @constructor
 */
const RightPanel: React.FC = () => {

    const [activeKey, setActiveKey] = useState(TAB_KEYS.prop)
    
    const { selectedId } = useGetComponentInfo()

    useEffect(() => {
    	if (selectedId) {
            // show prop tab when selectedId is not null
    		setActiveKey(TAB_KEYS.prop)
    	} else {
    		setActiveKey(TAB_KEYS.setting)
    	}
    }, [selectedId]);
    
    const tabsItems = [
        {
            key: TAB_KEYS.prop,
            label: (
                <span>
                    <FileTextOutlined/> Properties
                </span>
            ),
            children: <ComponentProp/>
        },
        {
            key: TAB_KEYS.setting,
            label: (
                <span>
                    <SettingOutlined/> Setting
                </span>
            ),
            children: <PageSetting/>
        }
    ]
    return (<Tabs activeKey={activeKey} items={tabsItems}/>)
}

export default RightPanel