import React, {ChangeEvent, useState} from "react";
import useGetComponentInfo from "../../../hook/useGetComponentInfo";
import {useDispatch} from "react-redux";
import {Input, message} from "antd";
import {setSelectedId} from "../../../store/selectIdReducer";
import styles from "./Layers.module.css"
import classNames from "classnames";
import {changeComponentTitle} from "../../../store/componentsReducer";

const Layers: React.FC = () => {
    const { components, selectedId } = useGetComponentInfo()
    const dispatch = useDispatch()

    // Record the component whose title is being edited
    const [changeTitleId, setChangeTitleId] = useState("")

    function handleTitleClick(uuid: string){
        const currentComponent = components.find(c => c.uuid === uuid)
        if(currentComponent && currentComponent.isHidden){
            message.info("该组件已被隐藏，请先修改组件属性")
            return
        }
        if(uuid !== selectedId){
            dispatch(setSelectedId(uuid))
            setChangeTitleId("")
            return
        }

        setChangeTitleId(uuid)
    }

    function handleTitleChange(event: ChangeEvent<HTMLInputElement>){
        const newTitle = event.target.value.trim()
        if(!newTitle) return
        if(!selectedId) return
        dispatch(changeComponentTitle({id: selectedId, title: newTitle}))
    }

    return (<>
        {
            components.map(c => {
                const { uuid, title, isHidden, isLocked } = c

                const titleDefaultClassName = styles.title
                const selectedClassName = styles.selected
                const titleClassName = classNames({
                    [titleDefaultClassName]: true,
                    [selectedClassName]: uuid === selectedId
                })

                return (
                    <div key={uuid} className={styles.wrapper}>
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
                        <div className={styles.handler}>Button</div>
                    </div>
                )
            })
        }
    </>)
}

export default Layers