import React from "react";
import {QuestionnaireInputDefaultProps, QuestionnaireInputType} from "./interface";
import {Input, Typography} from "antd";


const {Paragraph} = Typography
const QuestionnaireInput: React.FC<QuestionnaireInputType> = (props) => {
    const { title, placeholder } = {...QuestionnaireInputDefaultProps, ...props}
    return (<div>
        <Paragraph strong>{title}</Paragraph>
        <div>
            <Input placeholder={placeholder}/>
        </div>
    </div>)
}

export default QuestionnaireInput