import React, {useEffect} from "react";
import {QuestionnaireInputPropsType} from "./interface";
import {Form, Input} from "antd";

const PropComponent: React.FC<QuestionnaireInputPropsType>
    = (props) => {
    const {title, placeholder, onChange, disabled} = props
    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue({title, placeholder})
    }, [title, placeholder]);

    function handleValuesChange(){
        if(onChange){
            onChange(form.getFieldsValue())
        }
    }

    return (<Form
        form={form}
        layout={"vertical"}
        onValuesChange={handleValuesChange}
        initialValues={{title, placeholder}}
        disabled={disabled}
    >
        <Form.Item label={"Title"} name={"title"} rules={[{required: true, message: "Please enter a title."}]}>
            <Input/>
        </Form.Item>
        <Form.Item label={"Placeholder"} name={"placeholder"}>
            <Input/>
        </Form.Item>
    </Form>)
}

export default PropComponent