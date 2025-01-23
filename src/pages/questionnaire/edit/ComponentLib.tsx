import React from "react";
import {Typography} from "antd";
import {componentConfGroup, ComponentConfType} from "../../../components/QuestionnaireComponents";

const {Title} = Typography

function getComponent(c: ComponentConfType) {
    const {title, type, Component} = c
    return <div
        className={"mb-3 cursor-pointer bg-white p-3 border border-solid border-white rounded hover:border-gray-300"}>
        <div className={"pointer-events-none"}>
            <Component/>
        </div>
    </div>
}

const ComponentLib: React.FC = () => {
    return (<div>
        {componentConfGroup.map((group, index) => {
            const {groupId, groupName, components} = group
            return (<div key={groupId}>
                    <Title level={5}>{groupName}</Title>
                    <div>
                        {components.map(c => getComponent(c))}
                    </div>
                </div>
            )
        })}
    </div>)
}

export default ComponentLib