import React, {useEffect} from "react";
import {QuestionnaireInfoPropsType} from "./interface";
import {Form, Input} from "antd";

/**
 * Info component property component containing the title and description of the component
 * @param props
 * @constructor
 */
const PropComponent: React.FC<QuestionnaireInfoPropsType> = (props) => {
    const { title = "", desc = "", onChange, disabled } = props
    const [form] = Form.useForm()

    function handleValuesChange() {
        if(onChange){
            onChange(form.getFieldsValue())
        }
    }

    useEffect(() => {
    	form.setFieldsValue({title, desc})
    }, [title, desc]);

    return (<Form
        layout={"vertical"}
        initialValues={{title, desc}}
        onValuesChange={handleValuesChange}
        disabled={disabled}
        form={form}
    >
        <Form.Item label={"Title"} name={"title"} rules={[{required: true, message: "Please enter a title."}]}>
            <Input/>
        </Form.Item>
        <Form.Item label={"Desc"} name={"desc"}>
            <Input.TextArea/>
        </Form.Item>
    </Form>)
}

export default PropComponent