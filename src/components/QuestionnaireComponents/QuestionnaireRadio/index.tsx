import Component from "./Component";
import {QuestionnaireRadioDefaultProps} from "./interface";
import PropComponent from "./PropComponent";

export * from './interface';

const RadioConfig = {
    title: "Radio",
    type: "radio",
    Component: Component,
    PropComponent: PropComponent,
    defaultProps: QuestionnaireRadioDefaultProps
};

export default RadioConfig;
