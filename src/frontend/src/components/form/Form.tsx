import { Formik, Field, Form as FromikForm, FormikHelpers, FormikValues } from 'formik';

import './form.css'

export const Form = <T extends FormikValues>({ initialValues, onSubmit, customButton }
    : {
        initialValues: T,
        onSubmit: (values: T, { setSubmitting, resetForm }: FormikHelpers<T>) => void,
        customButton: JSX.Element
    }
) => {
    return (
        <Formik<T>
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
            <FromikForm className='form'>
                <label htmlFor="name">Name</label>
                <Field id="name" name="name" className="field" placeholder="Doe" />

                <label htmlFor="email">Email</label>
                <Field
                    id="email"
                    name="email"
                    className="field"
                    placeholder="john@acme.com"
                    type="email"
                />

                <label htmlFor="dob">Date of Birth</label>
                <Field
                    id="dob"
                    name="dob"
                    className="field"
                    type="date"
                />

                {customButton}
            </FromikForm>
        </Formik>
    )
}