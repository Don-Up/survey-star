import React from "react";
import {QuestionnaireParagraphDefaultProps, QuestionnaireParagraphPropsType} from "./interface";
import {Typography} from "antd";

const {Paragraph} = Typography
const QuestionnaireParagraph: React.FC<QuestionnaireParagraphPropsType> = (props) => {
    const {text = "", isCenter = false} = {...QuestionnaireParagraphDefaultProps, ...props}

    const textList = text.split("\n")


    return (<Paragraph style={{textAlign: isCenter ? "center" : "left", marginBottom: 0}}>
        {
            // implement the line break by using <br/> and split the text by \n
            // dangerouslySetInnerHTML is not recommended, because it can be used to execute JavaScript code
            textList.map((item, index) => {
                return <span key={index}>
                    {index > 0 && <br/>}
                    {item}
                </span>
            })
        }
    </Paragraph>)
}

export default QuestionnaireParagraph