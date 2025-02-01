import React from "react";
import {Button, Space, Tooltip} from "antd";
import {DeleteOutlined, EyeInvisibleOutlined, LockOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {
    changeComponentVisibility,
    ComponentInfoType,
    removeSelectedComponent,
    toggleComponentLock
} from "../../../store/componentsReducer";
import {getNextSelectedId} from "../../../store/utils";
import {setSelectedId} from "../../../store/selectIdReducer";
import useGetComponentInfo from "../../../hook/useGetComponentInfo";

const EditToolbar: React.FC = () => {
    const dispatch = useDispatch()
    const {selectedId, selectedComponent, components} = useGetComponentInfo()
    const {isLocked} = ( selectedComponent as ComponentInfoType) || {}

    function handleDelete() {
        dispatch(removeSelectedComponent(selectedId))
        const newSelectedId = getNextSelectedId(selectedId, components)
        // update selectedId
        if (newSelectedId) {
            dispatch(setSelectedId(newSelectedId))
        }
    }

    function handleHide() {
        dispatch(changeComponentVisibility({id: selectedId, isHidden: true}))
        // todo If you want to display it, do it separately.
        const newSelectedId = getNextSelectedId(selectedId, components)
        // update selectedId
        if (newSelectedId) {
            dispatch(setSelectedId(newSelectedId))
        }
    }

    function handleLock() {
        dispatch(toggleComponentLock({id: selectedId}))
    }

    return (<div>
        <Space>
            <Tooltip title={"Del"}>
                <Button shape={"circle"} icon={<DeleteOutlined/>} onClick={handleDelete}/>
            </Tooltip>
            <Tooltip title={"Hide"}>
                <Button shape={"circle"} icon={<EyeInvisibleOutlined/>} onClick={handleHide}/>
            </Tooltip>
            <Tooltip title={"Lock"}>
                <Button shape={"circle"} icon={<LockOutlined/>} onClick={handleLock}
                    type={isLocked ? "primary" : "default"}/>
            </Tooltip>
        </Space>
    </div>)
}

export default EditToolbar