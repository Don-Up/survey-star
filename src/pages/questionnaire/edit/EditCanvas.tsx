import React, {useEffect} from "react";
import QuestionnaireTitle from "../../../components/QuestionnaireComponents/QuestionnaireTitle/Component";
import QuestionnaireInput from "../../../components/QuestionnaireComponents/QuestionnaireInput/Component";
import styles from "./index.module.css"
import {Spin} from "antd";
import useGetComponentInfo from "../../../hook/useGetComponentInfo";
import {ComponentInfoType} from "../../../store/componentsReducer";
import classNames from 'classnames'
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../../store";
import {setSelectedId} from "../../../store/selectIdReducer";
import useBindCanvasKey from "../../../hook/useBindCanvasKey";
import QuestionnaireParagraph from "../../../components/QuestionnaireComponents/QuestionnaireParagraph/Component";

type PropsType = {
    loading: boolean
}

function getComponent(componentInfo: ComponentInfoType) {
    const {type, props} = componentInfo
    switch (type) {
        case "title":
            return <QuestionnaireTitle {...props}/>
        case "input":
            return <QuestionnaireInput {...props}/>
        case  "paragraph":
            return <QuestionnaireParagraph {...props}/>
        default:
            return null
    }
}

const EditCanvas: React.FC<PropsType> = ({loading}) => {

    const {components} = useGetComponentInfo()
    const selectedId = useSelector<StateType>(state => state.selectedId)
    const dispatch = useDispatch()
    useEffect(() => {
        if(components.length>0){
            dispatch(setSelectedId(components[0].uuid))
        }
    }, []);

    useBindCanvasKey()

    function handleClick(event: React.MouseEvent<HTMLDivElement>, id: string) {
        console.log("id", id)

        if (id !== selectedId) {
            event.stopPropagation()
            // 123
            dispatch(setSelectedId(id))
        }
    }

    if (loading) {
        return <div className={"text-center mt-6"}><Spin/></div>
    }
    return (<div className={"min-h-full bg-white overflow-hidden"}>
        {components.filter(c => !c.isHidden).map(c => {
            const {uuid, isLocked} = c
            const wrapperDefClassName = styles["component-wrapper"]
            const selectedClassName = styles.selected
            const lockedClassName = styles.locked
            const wrapperClassName = classNames({
                [wrapperDefClassName]: true,
                [selectedClassName]: selectedId === uuid,
                [lockedClassName]: isLocked
            })
            return <div key={uuid} className={wrapperClassName} onClick={(e) => handleClick(e, uuid)}>
                <div className={styles["component"]}>
                    {
                        getComponent(c)
                    }
                </div>
            </div>
        })}
    </div>)
}

export default EditCanvas