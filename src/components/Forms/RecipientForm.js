import React from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Alert from '@mui/material/Alert';
import axios from "axios";



const privateMsgUrl = 'http://localhost:5000/api/v1/namespaces/ngoRequests/messages/private';
const broadcastUrl = 'http://localhost:5002/api/v1/namespaces/ngoRequests/messages/broadcast';

// Schema for yup
const validationSchema = Yup.object().shape({

  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  email: Yup.string()
  .email("*Must be a valid email address")
  .max(100, "*Email must be less than 100 characters")
  .required("*Email is required"),
  phone: Yup.string().required("*Phone number required"),
  details: Yup.string().required()
});

const RecipientForm = () => {


function broadcastInfo(values){
  axios.post(broadcastUrl, 
    {
      "data": [
          {
              "value": {
                  "Message": `${JSON.stringify(values)}`,
              }
          }
      ]
  }).then(response=>{
    console.log("broadcast response is",response)
    alert(JSON.stringify(response))
  })
  .catch(error=>console.log(error))

}


function sendPrivateMessage(values, org) {
  
  axios.post(privateMsgUrl, 
    {
      "data": [
          {
              "value": `${JSON.stringify(values,null,2)}`
          }
      ],
      "group": {
          "members": [
              {
                  "identity": `${org}`
              }
          ]
      }
  }).then(response => {
    // alert(`Private Message Sent! ${response}`);
    console.log(`Private Message Sent! ${response}`)
  })
  .catch(error=>console.log(error))
  
}


  return(
    // <h1>Example Formik Form</h1>
    <Formik
      initialValues={{  email:"", phone:"", details:"",
                        firstName:"", lastName:""}}
      validationSchema={validationSchema}
      onSubmit={(values, {setSubmitting, resetForm}) => {
          // When button submits form and form is in the process of submitting, submit button is disabled
          setSubmitting(true);
          // Simulate submitting to database, shows us values submitted, resets form
          setTimeout(() => {
                 
          broadcastInfo(values);
        
            resetForm();
            setSubmitting(false);
          }, 500);
      }}
    >
      {( {values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting }) => (
        <Form onSubmit={handleSubmit} className="mx-auto">
            <Row className="mb-3">
                <Form.Group
                        as={Col}
                        md="4"
                        controlId="validationFormik101"
                        className="position-relative"
                >
                <Form.Label>First name</Form.Label>
                            <Form.Control
                                type="text"
                                name="firstName"
                                value={values.firstName}
                                onChange={handleChange}
                                isValid={touched.firstName && !errors.firstName}
                                />
                                <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group
                                as={Col}
                                md="4"
                                controlId="validationFormik102"
                                className="position-relative"
                            >
                                <Form.Label>Last name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="lastName"
                                    value={values.lastName}
                                    onChange={handleChange}
                                    isValid={touched.lastName && !errors.lastName}
                                />

                                <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    </Row>
          

          <Form.Group controlId="formEmail">
            <Form.Label>Email :</Form.Label>
            <Form.Control
              type="text"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              className={touched.email && errors.email ? "has-error" : null}
               />
               {touched.email && errors.email ? (
                 <div className="error-message">{errors.email}</div>
               ): null}
          </Form.Group>
          <Form.Group controlId="formPhone">
            <Form.Label>Phone :</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              placeholder="Phone"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phone}
              className={touched.phone && errors.phone ? "has-error" : null}
               />
             {touched.phone && errors.phone ? (
                 <div className="error-message">{errors.phone}</div>
               ): null}
          </Form.Group>
          <Form.Group controlId="formBlog">
              <br/>
            <Form.Label>Donation Feedback/Comments :</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="details"
              placeholder="donation details"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.details}
              className={touched.details && errors.details ? "has-error" : null}
              />
            {touched.blog && errors.details ? (
                <div className="error-message">{errors.details}</div>
              ): null}
          </Form.Group>
          <br/>

     
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>

  );
}

export default RecipientForm;