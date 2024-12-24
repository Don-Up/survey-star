import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Test() {
    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={Yup.object({
                email: Yup.string()
                    .email('Invalid email address')
                    .required('Email is required'),
                password: Yup.string()
                    .min(6, 'Password must be at least 6 characters')
                    .required('Password is required'),
            })}
            onSubmit={(values) => {
                alert(JSON.stringify(values, null, 2));
            }}
        >
            {() => (
                <Form>
                    <div>
                        <label>Email</label>
                        <Field name="email" type="email" /> {/* Simplifies input handling */}
                        <ErrorMessage name="email" component="div" /> {/* Displays validation errors */}
                    </div>
                    <div>
                        <label>Password</label>
                        <Field name="password" type="password" />
                        <ErrorMessage name="password" component="div" />
                    </div>
                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    );
}

export default Test;