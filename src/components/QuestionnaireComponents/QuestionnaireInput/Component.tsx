import React from "react";
import {QuestionnaireInputDefaultProps, QuestionnaireInputPropsType} from "./interface";
import {Input, Typography} from "antd";


const {Paragraph} = Typography

/**
 * Input component
 * @param props
 * @constructor
 */
const QuestionnaireInput: React.FC<QuestionnaireInputPropsType> = (props) => {
    const { title, placeholder } = {...QuestionnaireInputDefaultProps, ...props}
    return (<div>
        <Paragraph strong>{title}</Paragraph>
        <div>
            <Input placeholder={placeholder}/>
        </div>
    </div>)
}

export default QuestionnaireInput