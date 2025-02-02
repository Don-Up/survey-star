import Component from "./Component";
import {QuestionnaireTextAreaDefaultProps} from "./interface";
import PropComponent from "./PropComponent";

export * from "./interface";

const input = {
    title: "TextArea",
    type: "textarea",
    Component: Component,
    PropComponent: PropComponent,
    defaultProps: QuestionnaireTextAreaDefaultProps
}

export default input