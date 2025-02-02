import React from "react";
import {QuestionnaireCheckBoxPropsType} from "./interface";
import {useForm} from "antd/es/form/Form";
import {Checkbox, Form, Input} from "antd";

const PropComponent: React.FC<QuestionnaireCheckBoxPropsType> = (props) => {
    const {title, isVertical, list = [], disabled} = props
    const [form] = useForm()

    function handleValuesChange() {

    }

    return (<Form
        layout={"vertical"}
        form={form}
        initialValues={{title, isVertical, list}}
        disabled={disabled}
        onValuesChange={handleValuesChange}
    >
        <Form.Item label={"Title"} name={"title"} rules={[{required: true, message: "Please enter a title."}]}>
            <Input/>
        </Form.Item>

        <Form.Item name={"isVertical"} valuePropName={"checked"}>
            <Checkbox>Vertical Display</Checkbox>
        </Form.Item>
    </Form>)
}

export default PropComponent