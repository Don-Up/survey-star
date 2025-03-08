import Component from "./Component";
import {QuestionnaireRadioDefaultProps} from "./interface";
import PropComponent from "./PropComponent";
import StatComponent from "./StatComponent";

export * from './interface';

const RadioConfig = {
    title: "Radio",
    type: "radio",
    Component: Component,
    PropComponent: PropComponent,
    defaultProps: QuestionnaireRadioDefaultProps,
    StatComponent
};

export default RadioConfig;
