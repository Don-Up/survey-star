import React from "react";
import {QuestionnaireParagraphDefaultProps, QuestionnaireParagraphPropsType} from "./interface";
import {Typography} from "antd";

const { Paragraph } = Typography
const QuestionnaireParagraph: React.FC<QuestionnaireParagraphPropsType> = (props) => {
    const { text = "", isCenter = false } = {...QuestionnaireParagraphDefaultProps, ...props}

    return (<Paragraph style={{textAlign: isCenter ? "center" : "left", marginBottom: 0}}>
        {text}
    </Paragraph>)
}

export default QuestionnaireParagraph