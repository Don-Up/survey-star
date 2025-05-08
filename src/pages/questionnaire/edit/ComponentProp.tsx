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
 *
 * display the properties of the selected component in real-time
 * @constructor
 */
const ComponentProp: React.FC = () => {
    const {selectedComponent} = useGetComponentInfo()

    const dispatch = useDispatch()

    if (selectedComponent == null) {
        return null
    }
    const {type, props, isLocked, isHidden} = selectedComponent
    const componentConf = getComponentConfByType(type)

    if (componentConf == null) {
        return <NoProp/>
    }

    function changeProps(newProps: ComponentPropsType) {
        if (selectedComponent == null) return
        const {uuid} = selectedComponent
        // When the user modifies the props, dispatch the action to change the component properties,
        // so that the component will be updated in the EditCanvas.
        dispatch(changeComponentProps({id: uuid, newProps}))
    }

    // Destructuring the componentConf object to get the PropComponent.
    // The PropComponent is in components/QuestionnaireComponents/Xxxx/PropComponent.tsx
    const {PropComponent} = componentConf
    return (<PropComponent
        {...props}
        onChange={changeProps}
        disabled={isLocked || isHidden}
    />)
}

export default ComponentProp