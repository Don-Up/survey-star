import React from "react";
import {QuestionnaireTitleDefaultProps, QuestionnaireTitlePropsType} from "./interface";
import {Typography} from "antd";

const {Title} = Typography
const QuestionnaireTitle:React.FC<QuestionnaireTitlePropsType> = (props) => {
  const { text, level = 1, isCenter } = {...QuestionnaireTitleDefaultProps, ...props}


  const getFontSize = (level: number) => {
    if(level === 1) return "24px"
    if(level === 2) return "20px"
    if(level === 3) return "16px"
    return "14px"
  }

  return (<div>
    <Title level={level} style={{textAlign: isCenter ? "center" : "left", fontSize: getFontSize(level), marginBottom: "0px"}}>
      {text}
    </Title>
  </div>)
}

export default QuestionnaireTitle