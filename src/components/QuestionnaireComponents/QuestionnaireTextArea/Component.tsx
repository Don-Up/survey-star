import React from "react";
import {QuestionnaireTextAreaDefaultProps, QuestionnaireTextAreaPropsType} from "./interface";
import {Input, Typography} from "antd";

const {Paragraph} = Typography

/**
 * TextArea component contains title and text area
 * @param props
 * @constructor
 */
const QuestionnaireTextArea: React.FC<QuestionnaireTextAreaPropsType> = (props) => {
    const { title, placeholder } = {...QuestionnaireTextAreaDefaultProps, ...props}
    return (<div>
        <Paragraph strong>{title}</Paragraph>
        <div>
            <Input.TextArea placeholder={placeholder}/>
        </div>
    </div>)
}

export default QuestionnaireTextArea