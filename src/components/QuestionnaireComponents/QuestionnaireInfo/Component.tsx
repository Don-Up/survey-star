import React from "react";
import {QuestionnaireInfoDefaultProps, QuestionnaireInfoPropsType} from "./interface";
import {Typography} from "antd";

/**
 * Info component contains title and description
 * @param props
 * @constructor
 */
const QuestionnaireInfo: React.FC<QuestionnaireInfoPropsType> = (props) => {
    const {title = "", desc = ""} = {...QuestionnaireInfoDefaultProps, ...props}

    const descTextList = desc.split("\n")

    return (<div className={"text-center"}>
        <Typography.Title style={{fontSize: "24px"}}>{title}</Typography.Title>
        <Typography.Paragraph>
            {
                descTextList.map((text, index) => {
                    return <span key={index}>{index > 0 && <br/>}{text}</span>
                })
            }
        </Typography.Paragraph>
    </div>)
}

export default QuestionnaireInfo