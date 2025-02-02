import Component from "./Component";
import { QuestionnaireParagraphDefaultProps } from "./interface";
import PropComponent from "./PropComponent";

export * from './interface';

const ParagraphConfig = {
    title: "Paragraph",
    type: "paragraph",
    Component: Component,
    PropComponent: PropComponent,
    defaultProps: QuestionnaireParagraphDefaultProps
};

export default ParagraphConfig;
