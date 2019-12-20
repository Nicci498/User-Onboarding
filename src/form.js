import React, {useState, useEffect} from 'react';
import {withFormik, Field, Form,} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UserForm = ({values, touched, errors, status}) => {
    console.log("values", values);
    console.log("errors", errors);
    console.log("touched", touched);

    const [user, setUser] = useState([]);

    useEffect(() => {
        console.log("status has changed", status);

        status && setUser(users => [...users, status]);
      }, [status]);
    return(
        <div>
            <Form>
                <label>Name:
                <Field type="text" name="name" id="name"/>
                </label><br/>
                {touched.name && errors.name && (
                <p className="errors">{errors.name}</p>
                )}
                <label>Email:
                <Field type="text" name="email" id="email" />
                </label><br/>
                {touched.email && errors.email && (
                <p className="errors">{errors.email}</p>
                )}
                <label>Password:
                <Field type="text" name="password" id="password" />
                </label><br/>
                {touched.password && errors.password && (
                <p className="errors">{errors.password}</p>
                )}
                <label>Comply with Terms:
                <Field type ="checkbox" name="terms" id="terms"/>
                </label><br/>
                {touched.terms && errors.terms && (
                <p className="errors">{errors.terms}</p>
                )}
                <button type="submit">Submit!</button>
            </Form>
            {user.map(user => {
        return (
          <ul key={user.id}>
            <li>Name: {user.name}</li>
            <li>Email: {user.email}</li>
            <li>Password: {user.password}</li>
          </ul>
        );
      })}
        </div>
    );
}; 
const FormikUserForm = withFormik({
    mapPropsToValues(props) {
      return {
        name: props.name || "",
        email: props.email || "",
        password: props.password || "",
        vaccinations: props.termsofservice || false
      };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().min(3).required('Valid name of at least 3 characters needed'),
        email: Yup.string().email().required('Not a vaild email address'),
        password: Yup.string().min(5).required('Please choose a secure password of at least 5 characters'),
        terms: Yup.boolean().oneOf([true], 'Must Accept Terms and Conditions'),
    }),

    handleSubmit(values, { setStatus, resetForm}) {
        console.log("submitting", values);
        axios
            .post("https://reqres.in/api/users/", values)
            .then(response => {
                console.log("success", response);
                setStatus(response.data);
                resetForm();
            })
            .catch(err => console.log(err.response));
    }    
})(UserForm);
export default FormikUserForm;