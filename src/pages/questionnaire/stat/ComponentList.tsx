import React, {useState} from "react";
import useGetComponentInfo from "../../../hook/useGetComponentInfo";
import {getComponentConfByType} from "../../../components/QuestionnaireComponents";
import styles from "./ComponentList.module.css"
import classNames from "classnames";
import useLoadQuestionnaireData1 from "../../../hook/useLoadQuestionnaireData";

type PropsType = {
    selectedComponentId: string
    setSelectedComponentId: (id: string) => void
    setSelectedComponentType: (type: string) => void
}

/**
 * Renders a list of questionnaire components with selection capability.
 *
 * This component fetches and displays all non-hidden components from the questionnaire data.
 * Each component is rendered using its respective configuration, and clicking on a component
 * selects it by updating the selected component ID and type via the provided callback functions.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.selectedComponentId - The currently selected component's UUID.
 * @param {function} props.setSelectedComponentId - Callback to set the selected component's UUID.
 * @param {function} props.setSelectedComponentType - Callback to set the selected component's type.
 * @returns {React.ReactNode} The rendered ComponentList UI.
 */
const ComponentList: React.FC<PropsType> = ({selectedComponentId, setSelectedComponentId, setSelectedComponentType}) => {
    useLoadQuestionnaireData1()
    const {components} = useGetComponentInfo()

    return (<div className={styles.container}>
        {components.filter(c => !c.isHidden)
            .map(c => {
                const {uuid, props, type} = c

                const componentConf = getComponentConfByType(type)

                if (componentConf == null) return null

                const {Component} = componentConf

                const wrapperDefaultClassName = styles["component-wrapper"]
                const wrapperClassName = classNames({
                    [wrapperDefaultClassName]: true,
                    [selectedComponentId]: uuid === selectedComponentId
                })

                return (
                    <div className={wrapperClassName}
                         key={uuid}
                         onClick={() => {
                             setSelectedComponentId(uuid)
                             setSelectedComponentType(type)
                         }}>
                        <div className={styles.component}>
                            <Component {...props} />
                        </div>
                    </div>
                )
            })
        }
    </div>)
}

export default ComponentList