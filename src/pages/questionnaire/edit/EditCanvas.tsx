import React, {useEffect} from "react";
import QuestionnaireTitle from "../../../components/QuestionnaireComponents/QuestionnaireTitle/Component";
import QuestionnaireInput from "../../../components/QuestionnaireComponents/QuestionnaireInput/Component";
import styles from "./index.module.css"
import {Spin} from "antd";
import useGetComponentInfo from "../../../hook/useGetComponentInfo";
import {ComponentInfoType, swapComponent} from "../../../store/componentsReducer";
import classNames from 'classnames'
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../../store";
import {setSelectedId} from "../../../store/selectIdReducer";
import useBindCanvasKey from "../../../hook/useBindCanvasKey";
import QuestionnaireParagraph from "../../../components/QuestionnaireComponents/QuestionnaireParagraph/Component";
import QuestionnaireInfo from "../../../components/QuestionnaireComponents/QuestionnaireInfo/Component";
import QuestionnaireTextArea from "../../../components/QuestionnaireComponents/QuestionnaireTextArea/Component";
import QuestionnaireRadio from "../../../components/QuestionnaireComponents/QuestionnaireRadio/Component";
import QuestionnaireCheckBox from "../../../components/QuestionnaireComponents/QuestionnaireCheckBox/Component";
import SortableContainer from "../../../components/DragSortable/SortableContainer";
import SortableItem from "../../../components/DragSortable/SortableItem";
import {getComponentConfByType} from "../../../components/QuestionnaireComponents";

type PropsType = {
    loading: boolean
}

/**
 * Get a component by the specified type
 * @param componentInfo
 */
function getComponent(componentInfo: ComponentInfoType) {
    const {type, props} = componentInfo
    const componentConf = getComponentConfByType(type)
    if(!componentConf) return null
    const { Component } = componentConf
    return <Component {...props}/>

    // The code's intuitive version is like this:
    // switch (type) {
    //     case "title":
    //         return <QuestionnaireTitle {...props}/>
    //     case "input":
    //         return <QuestionnaireInput {...props}/>
    //     case  "paragraph":
    //         return <QuestionnaireParagraph {...props}/>
    //     case "info":
    //         return <QuestionnaireInfo {...props}/>
    //     case "textarea":
    //         return <QuestionnaireTextArea {...props}/>
    //     case "radio":
    //         return <QuestionnaireRadio {...props}/>
    //     case "checkbox":
    //         return <QuestionnaireCheckBox {...props}/>
    //     default:
    //         return null
    // }
}

/**
 * Edit canvas
 * @param loading
 * @constructor
 */
const EditCanvas: React.FC<PropsType> = ({loading}) => {

    const {components} = useGetComponentInfo()
    const selectedId = useSelector<StateType>(state => state.selectedId)
    const dispatch = useDispatch()

    useEffect(() => {
        if (components.length > 0) {
            // Select the first component by default
            dispatch(setSelectedId(components[0].uuid))
        }
    }, []);

    useBindCanvasKey()

    function handleClick(event: React.MouseEvent<HTMLDivElement>, id: string) {
        if (id !== selectedId) {
            // Prevent the event from bubbling up to the parent element leading to clear the selection
            event.stopPropagation()
            // Select the component
            dispatch(setSelectedId(id))
        }
    }

    if (loading) {
        return <div className={"text-center mt-6"}><Spin/></div>
    }

    // Add id to each component
    const componentListWithId = components.map(c => {
        return {
            ...c,
            id: c.uuid,
        }
    })

    function handleDragEnd(oldIndex: number, newIndex: number) {
        // Swap the component
        dispatch(swapComponent({oldIndex, newIndex}))
    }

    return (
        <SortableContainer items={componentListWithId}
                           onDragEnd={handleDragEnd}>
            <div className={"min-h-full bg-white overflow-hidden"}>
                {components
                    .filter(c => !c.isHidden) // Filter hidden components
                    .map(c => {
                        const {uuid, isLocked} = c
                        const wrapperDefClassName = styles["component-wrapper"]
                        const selectedClassName = styles.selected
                        const lockedClassName = styles.locked
                        // Create a class name
                        const wrapperClassName = classNames({
                            [wrapperDefClassName]: true,
                            [selectedClassName]: selectedId === uuid,
                            [lockedClassName]: isLocked
                        })
                    return <SortableItem id={uuid} key={uuid}>
                            <div
                                className={wrapperClassName}
                                onClick={(e) => handleClick(e, uuid)}>
                                <div className={styles["component"]}>
                                    {
                                        getComponent(c)
                                    }
                                </div>
                            </div>
                        </SortableItem>
                })}
            </div>
        </SortableContainer>
    )
}

export default EditCanvas