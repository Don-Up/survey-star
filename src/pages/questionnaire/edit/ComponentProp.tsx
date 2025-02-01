import React, {FC} from "react";
import useGetComponentInfo from "../../../hook/useGetComponentInfo";
import {ComponentPropsType, getComponentConfByType} from "../../../components/QuestionnaireComponents";
import {useDispatch} from "react-redux";
import {changeComponentProps} from "../../../store/componentsReducer";

const NoProp: FC = () => {
    return <div className={"text-center"}>No components are selected</div>
}

const ComponentProp: React.FC = () => {
    const {selectedComponent} = useGetComponentInfo()

    const dispatch = useDispatch()

    if (selectedComponent == null) return <NoProp/>
    const {type, props, isLocked, isHidden} = selectedComponent
    const componentConf = getComponentConfByType(type)

    if (componentConf == null) return <NoProp/>
    
    function changeProps(newProps: ComponentPropsType){
        if(selectedComponent == null) return
        const { uuid } = selectedComponent
        dispatch(changeComponentProps({id: uuid, newProps}))
    }
    
    const {PropComponent} = componentConf
    return (<PropComponent  { ...props } onChange={changeProps} disabled={isLocked || isHidden}/>)
}

export default ComponentProp