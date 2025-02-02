import Component from "./Component";
import PropComponent from "./PropComponent";
import { QuestionnaireInfoDefaultProps } from "./interface";

export * from './interface';

const InfoModule = {
    title: 'Info',
    type: 'info',
    Component: Component,
    PropComponent: PropComponent,
    defaultProps: QuestionnaireInfoDefaultProps,
};

export default InfoModule;
