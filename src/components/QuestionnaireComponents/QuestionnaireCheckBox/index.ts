import Component from "./Component";
import PropComponent from "./PropComponent";
import {QuestionnaireCheckBoxDefaultProps} from "./interface";
import StatComponent from "./StatComponent";


export * from './interface'

const CheckBoxConfig = {
  title: "CheckBox",
  type: "checkbox",
  Component: Component,
  PropComponent: PropComponent,
  defaultProps: QuestionnaireCheckBoxDefaultProps,
  StatComponent
}

export default CheckBoxConfig