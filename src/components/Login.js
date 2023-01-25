import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { loginAction } from '../actions';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  return (
    <div>
      <Formik
        initialValues={{ email: '', pswd: '' }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          pswd: Yup.string().required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(loginAction(values, history));
          // setSubmitting(false);
        }}
      >
        <Form>
          <div>
            <label htmlFor="email">Email Address</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" />
          </div>

          <div>
            <label htmlFor="pswd">Password</label>
            <Field name="pswd" type="password" />
            <ErrorMessage name="pswd" />
          </div>

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
