import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import TokenService from "../../FireflyServices/TokenService";

const dataUrl = "http://localhost:5000/api/v1/namespaces/default/data";
const privateMsgUrl =
  "http://localhost:5000/api/v1/namespaces/default/messages/private";
const mintUrl =
  "http://localhost:5000/api/v1/namespaces/default/tokens/erc1155/pools/donations/mint";
const broadcastUrl =
  "http://localhost:5000/api/v1/namespaces/default/messages/broadcast";

// Schema for yup
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  address: Yup.string().required(),
  city: Yup.string().required(),
  state: Yup.string().required(),
  zip: Yup.string().required(),
  file: Yup.mixed().required(),
  email: Yup.string()
    .email("*Must be a valid email address")
    .max(100, "*Email must be less than 100 characters")
    .required("*Email is required"),
  phone: Yup.string().required("*Phone number required"),
  details: Yup.string().required(),
});

const tokenService = new TokenService("http://localhost:5000/api/v1");

const DonorForm = (props) => {
  const [imgUpload, setImgUpload] = React.useState(``);

  async function onChange(e) {
    const file = e.target.files[0];
    try {
      setImgUpload(file);
      console.log("Image uploaded: ", file);
    } catch (error) {
      console.log(" Error uploading file: ", error);
    }
  }

  function sendPrivateMessage(values, org) {
    axios
      .post(privateMsgUrl, {
        data: [
          {
            value: `${JSON.stringify(values, null, 2)}`,
          },
        ],
        group: {
          members: [
            {
              identity: `${org}`,
            },
          ],
        },
      })
      .then((response) => {
        // alert(`Private Message Sent! ${response}`);
        console.log(`Private Message Sent! ${response}`);
      })
      .catch((error) => console.log(error));
  }

  async function uploadData() {
    var bodyFormData = new FormData();
    bodyFormData.append("autometa", "true");
    bodyFormData.append("file", imgUpload);

    try {
      const response = await axios.post(dataUrl, bodyFormData);
      console.log("data uploaded with:", response);
      console.log("data uploaded 2:", response.data);
      console.log("data uploaded 3:", response.data.id);
      console.log("response ID IS: ::::", response.data.id);
      return response.data.id;
    } catch (e) {
      console.log(e);
    }
  }

  return (
    // <h1>Example Formik Form</h1>
    <Formik
      initialValues={{
        address: "",
        email: "",
        phone: "",
        details: "",
        firstName: "",
        lastName: "",
        city: "",
        state: "",
        zip: "",
        file: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        // When button submits form and form is in the process of submitting, submit button is disabled
        setSubmitting(true);
        // alert(JSON.stringify(values, null, 2));
        /////MAJOR TODO: Make this process 1 method with failure conditions
        const dataId = await uploadData();
        await tokenService.mintNft(dataId);
        setSubmitting(false);
        if (props.onSubmit) {
          props.onSubmit();
        }
        await tokenService.broadcastNft(dataId);
        //TODO: INSERT CALL TO SEND PRIVATE MESSAGE
        sendPrivateMessage(values, "org_1");

        resetForm();
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
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

          <Form.Group controlId="formName">
            <Form.Label>Address: </Form.Label>
            <Form.Control
              type="textarea"
              name="address"
              placeholder="Enter Details"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.address}
              rows={3}
              className={touched.address && errors.address ? "has-error" : null}
            />
            {touched.address && errors.address ? (
              <div className="error-message">{errors.address}</div>
            ) : null}
          </Form.Group>

          <Row className="mb-3">
            <Form.Group
              as={Col}
              md="6"
              controlId="validationFormik103"
              className="position-relative"
            >
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="City"
                name="city"
                value={values.city}
                onChange={handleChange}
                isInvalid={!!errors.city}
              />

              <Form.Control.Feedback type="invalid" tooltip>
                {errors.city}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              md="3"
              controlId="validationFormik104"
              className="position-relative"
            >
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="State"
                name="state"
                value={values.state}
                onChange={handleChange}
                isInvalid={!!errors.state}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.state}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              md="3"
              controlId="validationFormik105"
              className="position-relative"
            >
              <Form.Label>Zip</Form.Label>
              <Form.Control
                type="text"
                placeholder="Zip"
                name="zip"
                value={values.zip}
                onChange={handleChange}
                isInvalid={!!errors.zip}
              />

              <Form.Control.Feedback type="invalid" tooltip>
                {errors.zip}
              </Form.Control.Feedback>
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
            ) : null}
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
            ) : null}
          </Form.Group>
          <Form.Group controlId="formBlog">
            <Form.Label>Donation Details :</Form.Label>
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
            ) : null}
          </Form.Group>

          <Form.Group className="position-relative mb-3">
            <Form.Label>File Upload</Form.Label>
            <br />
            <Form.Control
              type="file"
              required
              name="file"
              onChange={(e) => {
                handleChange(e);
                onChange(e);
                console.log("UPLOAD!!!!!", imgUpload);
              }}
              isInvalid={!!errors.file}
            />
            {/* <Form.Control.Feedback type="invalid" tooltip>
                                {errors.file}
                            </Form.Control.Feedback> */}
          </Form.Group>
          {/*Submit button that is disabled after button is clicked/form is in the process of submitting*/}
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default DonorForm;
