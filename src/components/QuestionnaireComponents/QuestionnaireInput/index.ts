import Component from "./Component";
import {QuestionnaireInputDefaultProps} from "./interface";
import PropComponent from "./PropComponent";

export * from "./interface";

const input = {
    title: "Input",
    type: "input",
    Component: Component,
    PropComponent: PropComponent,
    defaultProps: QuestionnaireInputDefaultProps
}

export default input