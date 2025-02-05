import React, {useState} from "react";
import {Button, Input, Space, Typography} from "antd";
import {EditOutlined, LeftOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import EditToolbar from "./EditToolbar";
import useGetPageInfo from "../../../hook/useGetPageInfo";
import {useDispatch} from "react-redux";
import {changePageTitle} from "../../../store/pageInfoReducer";

const { Title } = Typography

// TitleElement FC
const TitleElement: React.FC = () => {
    const { title } = useGetPageInfo()
    const dispatch = useDispatch()
    const [editState, setEditState] = useState(false)

    function handleChange(event: React.ChangeEvent<HTMLInputElement>){
        const newTitle = event.target.value.trim()
        if(!newTitle) return
        dispatch(changePageTitle(newTitle))
    }

    if(editState){
        return (
            <Input type="text" value={title}
                   onPressEnter={() => setEditState(false)}
                   onBlur={() => setEditState(false)}
                   onChange={handleChange}
            />
        )
    }

    return (
        <Space>
            <Title level={4}>
                {title}
            </Title>
            <Button icon={<EditOutlined/>} type={"text"} onClick={() => setEditState(true)}>
            </Button>
        </Space>
    )
}
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
                    <TitleElement/>
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