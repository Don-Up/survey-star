import React, {ChangeEvent, useEffect, useState} from "react";
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

/**
 * Component Layers
 *
 * Feature Brief:
 * 1. Drag and drop to change the order of the components
 * 2. Click the title to edit the title of the component
 * 3. Click the lock icon to lock the component
 * 4. Click the eye icon to hide the component
 */
const Layers: React.FC = () => {
    const {components, selectedId} = useGetComponentInfo()
    const dispatch = useDispatch()

    // Record the component whose title is being edited
    const [changeTitleId, setChangeTitleId] = useState("")

    /**
     * Click the title to edit
     * @param uuid
     */
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
        // Edit title
        setChangeTitleId(uuid)
    }

    /**
     * Change the title of the component
     * @param event
     */
    function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
        const newTitle = event.target.value.trim()
        if (!newTitle) return
        if (!selectedId) return
        dispatch(changeComponentTitle({id: selectedId, title: newTitle}))
    }

    /**
     * Change the visibility of the component
     * @param uuid
     * @param isHidden
     */
    function changeHidden(uuid: string, isHidden: boolean){
        dispatch(changeComponentVisibility({
            id: uuid,
            isHidden
        }))
    }

    /**
     * Change the lock state of the component
     * @param uuid
     */
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
                    // When the component is selected, add the selected class
                    [selectedClassName]: uuid === selectedId
                })

                /**
                 * Renders each survey component in the Layers panel as a draggable item.
                 * Each item displays:
                 * - A clickable title that allows editing when selected.
                 * - Action buttons to toggle visibility and lock state of the component.
                 */
                return (
                    <SortableItem key={uuid} id={uuid}>
                        <div className={styles.wrapper}>
                            <div
                                className={titleClassName}
                                onClick={() => handleTitleClick(uuid)}
                            >
                                {uuid === changeTitleId &&
                                    // show the input when the title is being edited(clicked)
                                    // hide the input when the input is clicked or blur or enter is pressed
                                    <Input
                                        value={title}
                                        onChange={handleTitleChange}
                                        autoFocus
                                        onClick={(e) => {
                                            const input = e.target as HTMLInputElement
                                            input.style.display  = "none"
                                        }}
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