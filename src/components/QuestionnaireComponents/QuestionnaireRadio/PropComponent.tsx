import React, {useEffect} from "react";
import {OptionType, QuestionnaireRadioPropsType} from "./interface";
import {Button, Checkbox, Form, Input, Select, Space} from "antd";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {nanoid} from "@reduxjs/toolkit";

/**
 * Radio Component Property Editor
 * @param props
 * @constructor
 */
const PropComponent: React.FC<QuestionnaireRadioPropsType> = (props) => {
    const {title, isVertical, options = [], value, onChange, disabled} = props;
    const [form] = Form.useForm();

    function handleValuesChange() {
        if (onChange) {
            // Get the current form values
            const newValues = form.getFieldsValue() as QuestionnaireRadioPropsType;

            // if (newValues.options) {
            //     newValues.options = newValues.options.filter(opt => !(opt.text == null))
            // }

            const {options = []} = newValues
            options.forEach((opt: OptionType) => {
                if (!opt.value) {
                    // If the value is empty, generate a new value
                    opt.value = nanoid(5)
                }
            })
            onChange(newValues)
        }
    }

    useEffect(() => {
        // Set the initial form values whenever the props change
        form.setFieldsValue({title, isVertical, options, value});
    }, [title, isVertical, options, value]);

    return (
        <Form
            layout="vertical"
            initialValues={{title, isVertical, options, value: undefined}}
            onValuesChange={handleValuesChange}
            disabled={disabled}
            form={form}
        >
            {/* Title */}
            <Form.Item label="Title" name="title" rules={[{required: true, message: "Please enter a title."}]}>
                <Input/>
            </Form.Item>

            {/* Options */}
            <Form.Item label="Options">
                <Form.List name="options">
                    {(fields, {add, remove}) => (
                        <>
                            {fields.map(({key, name}, index) => {
                                return (
                                    <Space key={key} align="baseline">
                                        {/* Option Text */}
                                        <Form.Item
                                            name={[name, "text"]}
                                            rules={[
                                                {required: true, message: "Please enter a text."},
                                                {
                                                    // Check for duplicate option text
                                                    // text represents the current option text typed by the user
                                                    validator: (_, text) => {
                                                        // Get the current form values
                                                        const {options = []} = form.getFieldsValue()
                                                        let number = 0
                                                        options.forEach((opt: OptionType) => {
                                                            if (text === opt.text) {
                                                                // If the text is the same as the current option, increment the number
                                                                number++
                                                            }
                                                        })
                                                        if (number > 1) {
                                                            // If there are duplicate options, return an error
                                                            // The error message will be displayed under the option text input
                                                            return Promise.reject(new Error("Duplicate option text."));
                                                        } else {
                                                            // If there are no duplicate options, resolve the promise
                                                            return Promise.resolve();
                                                        }
                                                    }
                                                }
                                            ]}
                                        >
                                            <Input placeholder="Option Text"/>
                                        </Form.Item>
                                        {/* Delete Button */}
                                        {index > 1 && <MinusCircleOutlined onClick={() => remove(name)}/>}
                                    </Space>
                                );
                            })}

                            {/* A button to add a new option */}
                            <Form.Item>
                                <Button
                                    type="link"
                                    onClick={() => {
                                        // Add a new option with an empty text and value
                                        add({text: "", value: ""});
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

            {/* A select to select the default selected option */}
            <Form.Item label="Selected" name="value">
                <Select
                    value={value}
                    options={options.map(({text, value}) => ({
                        value,
                        label: text || "",
                    }))}
                ></Select>
            </Form.Item>

            {/* A checkbox to toggle vertical display */}
            <Form.Item name="isVertical" valuePropName="checked">
                <Checkbox>Vertical Display</Checkbox>
            </Form.Item>
        </Form>
    );
};

export default PropComponent;
