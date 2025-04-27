import React, {FC} from "react";
import useGetComponentInfo from "../../../hook/useGetComponentInfo";
import {ComponentPropsType, getComponentConfByType} from "../../../components/QuestionnaireComponents";
import {useDispatch} from "react-redux";
import {changeComponentProps} from "../../../store/componentsReducer";

const NoProp: FC = () => {
    return <div className={"text-center"}>No components are selected</div>
}

/**
 * Component property panel
 * @constructor
 */
const ComponentProp: React.FC = () => {
    const {selectedComponent} = useGetComponentInfo()

    const dispatch = useDispatch()

    if (selectedComponent == null) return <NoProp/>
    const {type, props, isLocked, isHidden} = selectedComponent
    const componentConf = getComponentConfByType(type)

    if (componentConf == null) return <NoProp/>

    function changeProps(newProps: ComponentPropsType) {
        if (selectedComponent == null) return
        const {uuid} = selectedComponent
        // Dispatch the action to change the component properties.
        dispatch(changeComponentProps({id: uuid, newProps}))
    }

    // The specific component is in components/QuestionnaireComponents/Xxxx/PropComponent.tsx
    const {PropComponent} = componentConf
    return (<PropComponent
        {...props}
        onChange={changeProps}
        disabled={isLocked || isHidden}
    />)
}

export default ComponentProp