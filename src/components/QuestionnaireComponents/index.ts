import QuestionnaireTitleConf, {QuestionnaireTitlePropsType} from "./QuestionnaireTitle";
import QuestionnaireInputConf, {QuestionnaireInputPropsType} from "./QuestionnaireInput";
import {FC} from "react";


export type ComponentPropsType = QuestionnaireTitlePropsType & QuestionnaireInputPropsType

export type ComponentConfType = {
    title: string
    type: string
    Component: FC<ComponentPropsType>
    defaultProps: ComponentPropsType
}

const componentConfList: ComponentConfType[] = [
    QuestionnaireInputConf,
    QuestionnaireTitleConf,
]

export function getComponentConfByType(type: string){
    return componentConfList.find(conf => conf.type === type)
}

export const componentConfGroup = [
    {
        groupId: "text",
        groupName: "Text Display",
        components: [QuestionnaireTitleConf]
    },
    {
        groupId: "input",
        groupName: "User Input",
        components: [QuestionnaireInputConf]
    }
]