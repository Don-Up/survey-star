import Component from "./Component";
import {QuestionnaireTitleDefaultProps} from "./interface";
import PropComponent from "./PropComponent";

export * from "./interface";

const title = {
    title: "Title",
    type: "title",
    Component: Component,
    PropComponent: PropComponent,
    defaultProps: QuestionnaireTitleDefaultProps
}

export default title