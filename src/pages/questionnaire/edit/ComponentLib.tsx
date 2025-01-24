import React from "react";
import { Typography } from "antd";
import { componentConfGroup, ComponentConfType } from "../../../components/QuestionnaireComponents";
import {useDispatch, useSelector} from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { addComponent } from "../../../store/componentsReducer";
import {StateType} from "../../../store";
import {setSelectedId} from "../../../store/selectIdReducer";

const { Title } = Typography;

// Convert to React component with uppercase name
const ComponentRenderer: React.FC<{ c: ComponentConfType }> = ({ c }) => {
    const { title, type, Component } = c;
    const dispatch = useDispatch();
    const selectedId = useSelector<StateType>(state => state.selectedId) as string
    function handleClick() {
        const uuid = nanoid()
        dispatch(addComponent({
            component: {
                uuid,
                type,
                title,
                props: c.defaultProps,
            },
            selectedId,
        }));
        dispatch(setSelectedId(uuid))
    }

    return (
        <div
            key={type}
            className={"mb-3 cursor-pointer bg-white p-3 border border-solid border-white rounded hover:border-gray-300"}
            onClick={handleClick}
        >
            <div className={"pointer-events-none"}>
                <Component />
            </div>
        </div>
    );
};

const ComponentLib: React.FC = () => {
    return (
        <div>
            {componentConfGroup.map((group) => {
                const { groupId, groupName, components } = group;
                return (
                    <div key={groupId}>
                        <Title level={5}>{groupName}</Title>
                        <div>
                            {/* Render as component with props */}
                            {components.map((c) => (
                                <ComponentRenderer key={c.type} c={c} />
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ComponentLib;