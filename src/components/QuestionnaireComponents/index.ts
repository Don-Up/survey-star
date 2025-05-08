import QuestionnaireTitleConf, {QuestionnaireTitlePropsType} from "./QuestionnaireTitle";
import QuestionnaireInputConf, {QuestionnaireInputPropsType} from "./QuestionnaireInput";
import QuestionnaireParagraphConf, {QuestionnaireParagraphPropsType} from "./QuestionnaireParagraph";
import QuestionnaireInfoConf, {QuestionnaireInfoPropsType} from "./QuestionnaireInfo";
import QuestionnaireTextAreaConf, {QuestionnaireTextAreaPropsType} from "./QuestionnaireTextArea";
import QuestionnaireRadioConf, {
    QuestionnaireRadioPropsType,
    QuestionnaireRadioStatPropsType
} from "./QuestionnaireRadio";
import QuestionnaireCheckBoxConf, {
    QuestionnaireCheckBoxPropsType,
    QuestionnaireCheckBoxStatPropsType
} from "./QuestionnaireCheckBox";
import {FC} from "react";

/**
 * Component Props
 * 1. Title
 * 2. Input
 * 3. Paragraph
 * 4. Info
 * 5. TextArea
 * 6. Radio
 * 7. CheckBox
 */
export type ComponentPropsType = QuestionnaireTitlePropsType & QuestionnaireInputPropsType & QuestionnaireParagraphPropsType
    & QuestionnaireInfoPropsType & QuestionnaireTextAreaPropsType & QuestionnaireRadioPropsType & QuestionnaireCheckBoxPropsType;

/**
 * Component Stat Props
 */
type ComponentStatPropsType = QuestionnaireRadioStatPropsType & QuestionnaireCheckBoxStatPropsType

/**
 * Component Configuration
 */
export type ComponentConfType = {
    title: string
    // Need to be unified with the backend component type
    type: string
    // Display in the Component Library Tab (Left Panel)
    Component: FC<ComponentPropsType>
    // Display in the Properties Tab (Right Panel)
    PropComponent: FC<ComponentPropsType>
    defaultProps: ComponentPropsType
    StatComponent?: FC<ComponentStatPropsType>
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

/**
 * Rendered By Component Library Tab Page
 */
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