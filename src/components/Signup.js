import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { SignupAction } from '../actions';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const initialValues = {
    name: '',
    phNo: '',
    email: '',
    cAddress: '',
    pAddress: '',
  };
  const validationSchema = Yup.object({
    name: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    phNo: Yup.string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    cAddress: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    pAddress: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
            dispatch(SignupAction(values, navigate));
            // setSubmitting(false);
        }}
      >
        <Form>
          <div>
            <div>
              <Field name="name" type="text" placeholder="Name" />
              <ErrorMessage name="name" />
            </div>

            <div>
              <Field name="phNo" type="text" placeholder="Phone Number" />
              <ErrorMessage name="phNo" />
            </div>

            <div>
              <Field name="email" type="email" placeholder="Email Address" />
              <ErrorMessage name="email" />
            </div>

            <div>
              <Field
                name="cAddress"
                as="textarea"
                placeholder="Current Address"
              />
              <ErrorMessage name="cAddress" />
            </div>
            <div>
              <Field
                name="pAddress"
                as="textarea"
                placeholder="Present Address"
              />
              <ErrorMessage name="pAddress" />
            </div>

            <button type="submit">Submit</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Signup;
