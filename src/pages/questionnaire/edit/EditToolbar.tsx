import React from "react";
import {Button, Space, Tooltip} from "antd";
import {
    BlockOutlined,
    CopyOutlined,
    DeleteOutlined, DownOutlined,
    EyeInvisibleOutlined,
    LockOutlined, RedoOutlined, UndoOutlined,
    UpOutlined
} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {
    addComponent,
    changeComponentVisibility,
    ComponentInfoType,
    removeSelectedComponent,
    toggleComponentLock
} from "../../../store/componentsReducer";
import {getNextSelectedId} from "../../../store/utils";
import {setSelectedId} from "../../../store/selectIdReducer";
import useGetComponentInfo from "../../../hook/useGetComponentInfo";
import {copySelectedComponent} from "../../../store/copyReducer";
import {nanoid} from "@reduxjs/toolkit";
import {ActionCreators as UndoActionCreators} from "redux-undo";

const EditToolbar: React.FC = () => {
    const dispatch = useDispatch()
    const {selectedId, selectedComponent, components, copiedComponent} = useGetComponentInfo()
    const {isLocked} = (selectedComponent as ComponentInfoType) || {}

    const length = components.length
    const selectedIndex = components.findIndex(item => item.uuid === selectedId)
    const isFirst = selectedIndex === 0
    const isLast = selectedIndex === length - 1

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

    function handleCopy() {
        dispatch(copySelectedComponent(selectedComponent))
    }

    function handlePaste() {
        if (copiedComponent != null) {
            const newId = nanoid()
            dispatch(addComponent({
                component: {...copiedComponent, uuid: newId},
                selectedId,
            }))
        }
    }

    function selectPrevious() {
        if(isFirst) return
        const selectIndex = components.findIndex(item => item.uuid === selectedId)
        // If the current index is 0, there is no previous component.
        if (selectIndex <= 0) return
        dispatch(setSelectedId(components[selectIndex - 1].uuid))
    }

    function selectNext() {
        if(isLast) return
        const selectIndex = components.findIndex(item => item.uuid === selectedId)
        // If the current index is the last index, there is no next component.
        if (selectIndex < 0 || selectIndex >= components.length - 1) return
        dispatch(setSelectedId(components[selectIndex + 1].uuid))
    }

    // undo
    function undo() {
        dispatch(UndoActionCreators.undo())
    }

    // redo
    function redo() {
        dispatch(UndoActionCreators.redo())
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
            <Tooltip title={"Copy"}>
                <Button shape={"circle"} icon={<CopyOutlined/>} onClick={handleCopy}
                        disabled={selectedComponent == null}/>
            </Tooltip>
            <Tooltip title={"Paste"}>
                <Button shape={"circle"} icon={<BlockOutlined/>}
                        onClick={handlePaste}
                        disabled={copiedComponent == null}
                />
            </Tooltip>
            <Tooltip title={"MoveUp"}>
                <Button shape={"circle"}
                        icon={<UpOutlined/>}
                        onClick={selectPrevious}
                        disabled={isFirst}
                />
            </Tooltip>
            <Tooltip title={"MoveDown"}>
                <Button shape={"circle"}
                        icon={<DownOutlined/>}
                        onClick={selectNext}
                        disabled={isLast}
                />
            </Tooltip>
            <Tooltip title={"Undo"}>
                <Button shape={"circle"} icon={<UndoOutlined/>}
                        onClick={undo}
                />
            </Tooltip>
            <Tooltip title={"Redo"}>
                <Button shape={"circle"} icon={<RedoOutlined/>}
                        onClick={redo}
                />
            </Tooltip>
        </Space>
    </div>)
}

export default EditToolbar