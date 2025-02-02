import Component from "./Component";
import PropComponent from "./PropComponent";
import {QuestionnaireCheckBoxDefaultProps} from "./interface";


export * from './interface'

const CheckBoxConfig = {
  Component: Component,
  PropComponent: PropComponent,
  defaultProps: QuestionnaireCheckBoxDefaultProps,
  title: "CheckBox",
  type: "checkbox",
}

export default CheckBoxConfig