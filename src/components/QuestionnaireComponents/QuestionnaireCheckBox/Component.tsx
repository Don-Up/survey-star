import React from "react";
import {QuestionnaireCheckBoxDefaultProps, QuestionnaireCheckBoxPropsType} from "./interface";
import {Checkbox, Space, Typography} from "antd";

const QuestionnaireCheckBox: React.FC<QuestionnaireCheckBoxPropsType> = (props) => {
    const {title, isVertical, list = []} = {...QuestionnaireCheckBoxDefaultProps, ...props};

    return (<div>
        <Typography.Paragraph strong>{title}</Typography.Paragraph>
        <Space direction={isVertical ? "vertical" : "horizontal"}>
            {list.map((option) => {
                const {text, value, checked} = option
                return <Checkbox key={value} value={value} checked={checked}>{text}</Checkbox>
            })}
        </Space>
    </div>)
}

export default QuestionnaireCheckBox