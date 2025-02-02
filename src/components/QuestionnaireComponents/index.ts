import QuestionnaireTitleConf, {QuestionnaireTitlePropsType} from "./QuestionnaireTitle";
import QuestionnaireInputConf, {QuestionnaireInputPropsType} from "./QuestionnaireInput";
import QuestionnaireParagraphConf, {QuestionnaireParagraphPropsType} from "./QuestionnaireParagraph";
import QuestionnaireInfoConf, {QuestionnaireInfoPropsType} from "./QuestionnaireInfo";
import QuestionnaireTextAreaConf, {QuestionnaireTextAreaPropsType} from "./QuestionnaireTextArea";
import QuestionnaireRadioConf, {QuestionnaireRadioPropsType} from "./QuestionnaireRadio";
import QuestionnaireCheckBoxConf, {QuestionnaireCheckBoxPropsType} from "./QuestionnaireCheckBox";
import {FC} from "react";


export type ComponentPropsType = QuestionnaireTitlePropsType & QuestionnaireInputPropsType & QuestionnaireParagraphPropsType
    & QuestionnaireInfoPropsType & QuestionnaireTextAreaPropsType & QuestionnaireRadioPropsType & QuestionnaireCheckBoxPropsType;

export type ComponentConfType = {
    title: string
    type: string
    Component: FC<ComponentPropsType>
    PropComponent: FC<ComponentPropsType>
    defaultProps: ComponentPropsType
}

const componentConfList: ComponentConfType[] = [
    QuestionnaireInputConf,
    QuestionnaireTitleConf,
    QuestionnaireParagraphConf,
    QuestionnaireInfoConf,
    QuestionnaireTextAreaConf,
    QuestionnaireRadioConf,
    QuestionnaireCheckBoxConf
]

export function getComponentConfByType(type: string){
    return componentConfList.find(conf => conf.type === type)
}

export const componentConfGroup = [
    {
        groupId: "text",
        groupName: "Text Display",
        components: [QuestionnaireInfoConf, QuestionnaireTitleConf, QuestionnaireParagraphConf]
    },
    {
        groupId: "input",
        groupName: "User Input",
        components: [QuestionnaireInputConf, QuestionnaireTextAreaConf]
    },
    {
        groupId: "changeGroup",
        groupName: "User Selection",
        components: [QuestionnaireRadioConf, QuestionnaireCheckBoxConf]
    }
]