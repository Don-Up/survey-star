import React from "react";
import {QuestionnaireRadioDefaultProps, QuestionnaireRadioPropsType} from "./interface";
import {Radio, Space, Typography} from "antd";

/**
 * Radio Component
 * @param props
 * @constructor
 */
const QuestionnaireRadio: React.FC<QuestionnaireRadioPropsType> = (props) => {
    const { title, isVertical, options = [], value } = { ...QuestionnaireRadioDefaultProps, ...props };

    return (
        <div>
            <Typography.Paragraph strong>{title}</Typography.Paragraph>
            <Radio.Group value={value}>
                <Space direction={isVertical ? "vertical" : "horizontal"} wrap>
                    {options.map((option) => (
                        <Radio
                            key={option.value}
                            value={option.value}
                        >
                            {option.text}
                        </Radio>
                    ))}
                </Space>
            </Radio.Group>
        </div>
    );
};

export default QuestionnaireRadio;
