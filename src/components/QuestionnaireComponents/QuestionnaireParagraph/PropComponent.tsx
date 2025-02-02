import React, {useEffect} from "react";
import {QuestionnaireParagraphPropsType} from "./interface";
import {Checkbox, Form, Input} from "antd";

const {TextArea} = Input
const PropComponent: React.FC<QuestionnaireParagraphPropsType> = (props) => {
    const {text, isCenter, onChange, disabled} = props
    const [form] = Form.useForm()
    console.log("props", props.text)

    function handleValuesChange() {
        if (onChange) {
            onChange(form.getFieldsValue())
        }
    }

    useEffect(() => {
    	form.setFieldsValue({text, isCenter})
    }, [text, isCenter]);

    return (<Form
        layout={"vertical"}
        initialValues={{text, isCenter}}
        onValuesChange={handleValuesChange}
        disabled={disabled}
        form={form}
    >
        <Form.Item label={"Paragraph Content"} name={"text"}
                   rules={[{required: true, message: "Please enter a paragraph."}]}>
            <TextArea/>
        </Form.Item>
        <Form.Item name={"isCenter"} valuePropName={"checked"}>
            <Checkbox>Center display</Checkbox>
        </Form.Item>
    </Form>)
}

export default PropComponent