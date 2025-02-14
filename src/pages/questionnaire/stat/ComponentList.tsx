import React, {useState} from "react";
import useGetComponentInfo from "../../../hook/useGetComponentInfo";
import {getComponentConfByType} from "../../../components/QuestionnaireComponents";
import styles from "./ComponentList.module.css"
import classNames from "classnames";

type PropsType = {
    selectedComponentId: string
    setSelectedComponentId: (id: string) => void
    setSelectedComponentType: (type: string) => void
}
const ComponentList: React.FC<PropsType> = ({selectedComponentId, setSelectedComponentId, setSelectedComponentType}) => {
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