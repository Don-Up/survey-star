import React, {useEffect} from "react";
import useGetPageInfo from "../../../hook/useGetPageInfo";
import {Form, Input} from "antd";
import {useDispatch} from "react-redux";
import {resetPageInfo} from "../../../store/pageInfoReducer";

/**
 * PageSetting Component (Edit → Right Panel → Page Setting)
 *
 * A form component for editing page-level settings of a questionnaire.
 * Allows users to configure:
 * - Title (required field)
 * - Description (optional)
 * - Custom CSS (optional)
 *
 * Features:
 * - Syncs with Redux store using `resetPageInfo` action on value changes
 * - Initializes and updates form fields based on pageInfo from the hook
 * - Vertical layout with validation support for required fields
 *
 * Dependencies:
 * - useGetPageInfo: To retrieve current page data
 * - useDispatch: To dispatch actions for updating global state
 * - Form hooks: Manages form state and synchronization
 */
const PageSetting: React.FC = () => {
    let pageInfo = useGetPageInfo()
    // form
    const [form] = Form.useForm()
    // dispatch
    const dispatch = useDispatch()
    function handleValuesChange() {
        dispatch(resetPageInfo(form.getFieldsValue()))
    }

    // Sync form with pageInfo when it changes
    useEffect(() => {
        form.setFieldsValue(pageInfo);
    }, [pageInfo]);

    return (<Form
        layout={"vertical"}
        initialValues={pageInfo}
        form={form}
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