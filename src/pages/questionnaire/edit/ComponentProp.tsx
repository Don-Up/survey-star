import React, {FC} from "react";
import useGetComponentInfo from "../../../hook/useGetComponentInfo";
import {getComponentConfByType} from "../../../components/QuestionnaireComponents";

const NoProp: FC = () => {
    return <div className={"text-center"}>No components are selected</div>
}

const ComponentProp: React.FC = () => {
    const {selectedComponent} = useGetComponentInfo()
    if (selectedComponent == null) return <NoProp/>
    const {type, props} = selectedComponent
    const componentConf = getComponentConfByType(type)

    if (componentConf == null) return <NoProp/>
    const {PropComponent} = componentConf
    console.log("props", props)
    return (<PropComponent  { ...props }/>)
}

export default ComponentProp