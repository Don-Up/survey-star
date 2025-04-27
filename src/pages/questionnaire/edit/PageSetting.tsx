import React from "react";
import useGetPageInfo from "../../../hook/useGetPageInfo";
import {Form, Input} from "antd";
import {useDispatch} from "react-redux";
import {resetPageInfo} from "../../../store/pageInfoReducer";

/**
 * Edit → Right Panel → Page Setting
 * @constructor
 */
const PageSetting: React.FC = () => {
    const pageInfo = useGetPageInfo()
    // form
    const [form] = Form.useForm()
    // dispatch
    const dispatch = useDispatch()
    function handleValuesChange() {
        dispatch(resetPageInfo(form.getFieldsValue()))
    }

    return (<Form
        layout={"vertical"}
        initialValues={pageInfo}
        onValuesChange={handleValuesChange}
    >
        <Form.Item label={"Title"} name={"title"} rules={[{required: true, message: "Please enter a title."}]}>
            <Input placeholder="Title"/>
        </Form.Item>
        <Form.Item label={"Description"} name={"description"}>
            <Input.TextArea placeholder="Description"/>
        </Form.Item>
        <Form.Item label={"CSS"} name={"css"}>
            <Input.TextArea placeholder="CSS code"/>
        </Form.Item>
    </Form>)
}

export default PageSetting