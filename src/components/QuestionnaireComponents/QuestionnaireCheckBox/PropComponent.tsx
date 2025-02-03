import React from "react";
import {QuestionnaireCheckBoxPropsType} from "./interface";
import {useForm} from "antd/es/form/Form";
import {Button, Checkbox, Form, Input, Space} from "antd";
import {OptionType} from "../QuestionnaireRadio";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {nanoid} from "@reduxjs/toolkit";

const PropComponent: React.FC<QuestionnaireCheckBoxPropsType> = (props) => {
    const {title, isVertical, list = [], disabled, onChange} = props
    const [form] = useForm()

    function handleValuesChange() {
        if(onChange == null) return
        const newValues = form.getFieldsValue() as QuestionnaireCheckBoxPropsType
        if(newValues.list){
            newValues.list = newValues.list.filter(opt => !(opt.text == null))
        }

        const { list = [] } = newValues
        list.forEach((opt: OptionType) => {
            if(!opt.value){
                opt.value = nanoid(5)
            }
        })

        onChange(newValues)
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

        <Form.Item label="Options">
            <Form.List name="list">
                {(fields, {add, remove}) => (
                    <>
                        {fields.map(({key, name}, index) => {
                            return (
                                <Space key={key} align="baseline">
                                    <Form.Item name={[name, "checked"]} valuePropName={"checked"}>
                                        <Checkbox/>
                                    </Form.Item>
                                    {/* Option Text */}
                                    <Form.Item
                                        name={[name, "text"]}
                                        rules={[
                                            {required: true, message: "Please enter a text."},
                                            {
                                                validator: (_, text) => {
                                                    const {list = []} = form.getFieldsValue()
                                                    let number = 0
                                                    list.forEach((opt: OptionType) => {
                                                        if (text === opt.text) {
                                                            // If the text is the same as the current option, increment the number
                                                            number++
                                                        }
                                                    })
                                                    if (number > 1) {
                                                        return Promise.reject(new Error("Duplicate option text."));
                                                    } else {
                                                        return Promise.resolve();
                                                    }
                                                }
                                            }
                                        ]}
                                    >
                                        <Input placeholder="Option Text"/>
                                    </Form.Item>
                                    {/* Delete Button */}
                                    {index > 0 && <MinusCircleOutlined onClick={() => remove(name)}/>}
                                </Space>
                            );
                        })}
                        <Form.Item>
                            <Button
                                type="link"
                                onClick={() => {
                                    add({text: "", value: "", checked: false});
                                    // Optionally reset the selected value if needed
                                    form.setFieldValue("value", undefined);
                                }}
                                block
                                icon={<PlusOutlined/>}
                            >
                                Add Option
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
        </Form.Item>

        <Form.Item name={"isVertical"} valuePropName={"checked"}>
            <Checkbox>Vertical Display</Checkbox>
        </Form.Item>
    </Form>)
}

export default PropComponent