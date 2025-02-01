import React from "react";
import {Button, Space, Typography} from "antd";
import {LeftOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import EditToolbar from "./EditToolbar";

const { Title } = Typography
const EditHeader: React.FC = () => {
    const nav = useNavigate()
    return (
    <div className="bg-white border-b border-solid border-amber-50">
        <div className="flex mx-6 h-[50px] items-center">
            <div className="flex-1">
                <Space>
                    <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
                        Back
                    </Button>
                    <Title level={4} className=" mt-2">
                        Edit Title
                    </Title>
                </Space>
            </div>
            <div className="flex-1 text-center"><EditToolbar/></div>
            <div className="flex-1 text-right">
                <Space>
                    <Button type="default">Save</Button>
                    <Button type="primary">Publish</Button>
                </Space>
            </div>
        </div>
    </div>
);

}

export default EditHeader