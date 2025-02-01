import React from "react";
import {Button, Space, Tooltip} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {ComponentInfoType, removeSelectedComponent} from "../../../store/componentsReducer";
import {StateType} from "../../../store";
import {getNextSelectedId} from "../../../store/utils";
import {setSelectedId} from "../../../store/selectIdReducer";

const EditToolbar: React.FC = () => {
    const dispatch = useDispatch()
    const selectedId = useSelector<StateType>(state => state.selectedId) as string;
    const components = useSelector<StateType>(state => state.components) as ComponentInfoType[]

    function handleDelete() {
        dispatch(removeSelectedComponent(selectedId))
        const newSelectedId = getNextSelectedId(selectedId, components)
        // update selectedId
        if(newSelectedId){
            dispatch(setSelectedId(newSelectedId))
        }
    }

    return (<div>
        <Space>
        <Tooltip title={"Del"}>
            <Button shape={"circle"} icon={<DeleteOutlined />} onClick={handleDelete}/>
        </Tooltip>
    </Space>
    </div>)
}

export default EditToolbar