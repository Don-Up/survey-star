import React, {useEffect} from "react";
import {QuestionnaireTitlePropsType} from "./interface";
import {Checkbox, Form, Input, Select} from "antd";

const PropComponent: React.FC<QuestionnaireTitlePropsType> = (props) => {
    const { text, level, isCenter, onChange } = props
    const [form] = Form.useForm()
    useEffect(() => {
        form.setFieldsValue({text, level, isCenter})
    }, [text, level, isCenter]);

    function handleValuesChange(){
        if(onChange){
            onChange(form.getFieldsValue())
        }
    }

    return (<Form
        form={form}
        layout={"vertical"}
        onValuesChange={handleValuesChange}
        initialValues={{ text, level, isCenter }}
    >
        <Form.Item label={"Title"} name={"text"} rules={[{ required: true, message: "Please enter a Title." }]}>
            <Input/>
        </Form.Item>
        <Form.Item label={"Level"} name={"level"}>
            <Select options={[
                {value: 1, text: 1},
                {value: 2, text: 2},
                {value: 3, text: 3},
            ]}></Select>
        </Form.Item>
        <Form.Item name={"isCenter"} valuePropName={"checked"}>
            <Checkbox>Center display</Checkbox>
        </Form.Item>
    </Form>)
}

export default PropComponent