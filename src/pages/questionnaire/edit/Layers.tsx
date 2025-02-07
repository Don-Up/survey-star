import React, {ChangeEvent, useState} from "react";
import useGetComponentInfo from "../../../hook/useGetComponentInfo";
import {useDispatch} from "react-redux";
import {Button, Input, message, Space} from "antd";
import {setSelectedId} from "../../../store/selectIdReducer";
import styles from "./Layers.module.css"
import classNames from "classnames";
import {
    changeComponentTitle,
    changeComponentVisibility,
    swapComponent,
    toggleComponentLock
} from "../../../store/componentsReducer";
import {EyeInvisibleOutlined, LockOutlined} from "@ant-design/icons";
import SortableContainer from "../../../components/DragSortable/SortableContainer";
import SortableItem from "../../../components/DragSortable/SortableItem";

const Layers: React.FC = () => {
    const {components, selectedId} = useGetComponentInfo()
    const dispatch = useDispatch()

    // Record the component whose title is being edited
    const [changeTitleId, setChangeTitleId] = useState("")

    function handleTitleClick(uuid: string) {
        const currentComponent = components.find(c => c.uuid === uuid)
        if (currentComponent && currentComponent.isHidden) {
            message.info("该组件已被隐藏，请先修改组件属性")
            return
        }
        if (uuid !== selectedId) {
            dispatch(setSelectedId(uuid))
            setChangeTitleId("")
            return
        }

        setChangeTitleId(uuid)
    }

    function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
        const newTitle = event.target.value.trim()
        if (!newTitle) return
        if (!selectedId) return
        dispatch(changeComponentTitle({id: selectedId, title: newTitle}))
    }
    
    function changeHidden(uuid: string, isHidden: boolean){
        dispatch(changeComponentVisibility({
            id: uuid,
            isHidden
        }))
    }

    function changeLocked(uuid: string){
        dispatch(toggleComponentLock({id: uuid}))
    }

    const componentListWithId = components.map(c => {
        return {
            ...c,
            id: c.uuid,
        }
    })

    function handleDragEnd(oldIndex: number, newIndex: number) {
        dispatch(swapComponent({ oldIndex, newIndex }))
    }

    return (<SortableContainer
        items={componentListWithId}
        onDragEnd={handleDragEnd}
    >
        {
            components.map(c => {
                const {uuid, title, isHidden, isLocked} = c

                const titleDefaultClassName = styles.title
                const selectedClassName = styles.selected
                const titleClassName = classNames({
                    [titleDefaultClassName]: true,
                    [selectedClassName]: uuid === selectedId
                })

                return (
                    <SortableItem key={uuid} id={uuid}>
                        <div className={styles.wrapper}>
                            <div
                                className={titleClassName}
                                onClick={() => handleTitleClick(uuid)}
                            >
                                {uuid === changeTitleId &&
                                    <Input
                                        value={title}
                                        onChange={handleTitleChange}
                                        onPressEnter={() => setChangeTitleId("")}
                                        onBlur={() => setChangeTitleId("")}/>}
                                {uuid !== changeTitleId && title}
                            </div>
                            <div className={styles.handler}>
                                <Space>
                                    <Button icon={<EyeInvisibleOutlined/>}
                                            size={"small"}
                                            shape={"circle"}
                                            className={!isHidden ? styles.btn : ""}
                                            onClick={() => changeHidden(uuid, !isHidden)}
                                            type={isHidden ? "primary" : "text"}/>
                                    <Button icon={<LockOutlined/>}
                                            size={"small"}
                                            shape={"circle"}
                                            className={!isLocked ? styles.btn : ""}
                                            onClick={() => changeLocked(uuid)}
                                            type={isLocked ? "primary" : "text"}/>
                                </Space>
                            </div>
                        </div>
                    </SortableItem>
                )
            })
        }
    </SortableContainer>)
}

export default Layers