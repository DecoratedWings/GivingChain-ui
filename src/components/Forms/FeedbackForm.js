import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";



// const privateMsgUrl = 'http://localhost:5000/api/v1/namespaces/default/messages/private';
const broadcastUrl = 'http://localhost:5002/api/v1/namespaces/default/messages/broadcast';

// Schema for yup
const validationSchema = Yup.object().shape({
  details: Yup.string().required()
});

const FeedbackForm = () => {


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

export default FeedbackForm;