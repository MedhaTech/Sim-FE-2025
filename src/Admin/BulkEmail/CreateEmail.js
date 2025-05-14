/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState } from "react";
import { Row, Col, FormGroup, Label, Form } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "../../stories/Button";
import { getCurrentUser, openNotificationWithIcon } from "../../helpers/Utils";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Upload, Download } from 'feather-icons-react/build/IconComponents';
import * as XLSX from 'xlsx';
import EmailsFile from '../../assets/img/emailsFile.xlsx';


const CreateEmail = () => {
  const currentUser = getCurrentUser("current_user");
  const navigate = useNavigate();
  const [fileName, setFileName] = useState('');
  const fileHandler = (e) => {
    // Handles file selection and reads the selected file //
    const file = e.target.files[0];
    setFileName(file.name);
    const reader = new FileReader();

    reader.onload = async (event) => {
      const workbook = XLSX.read(event.target.result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(sheet);

      formik.setFieldValue("file_name", sheetData);
    };
    reader.readAsBinaryString(file);
  };

  const formik = useFormik({
    initialValues: {
      msg: "",
      subject: "",
      file_name: ""

    },
    validationSchema: Yup.object({
      msg: Yup.string().required("Email content is Required"),
      file_name: Yup.mixed().required("File is Required"),
      subject: Yup.string().required("Subject is Required")
    }),
    onSubmit: async (values) => {
      try {

        const body = {
          msg: values.msg,
          subject: values.subject,
          emails: values.file_name
        };

        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/admins/bulkEmail`,
          body,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentUser?.data[0]?.token}`,
            },
          }
        );

        if (response.status === 200) {
          navigate("/emailList");
          openNotificationWithIcon("success", "Email Sent Successfully");
        }
      } catch (error) {
        if (error.response?.status === 400) {
          const errorMessage = error.response?.data?.errors?.[0];

          if (errorMessage?.includes('fails to match the required pattern')) {
            openNotificationWithIcon("error", "Special characters in subject not allowed");
          }
        }
      }
    },

  });



  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const buttonStyle = {
    marginRight: '10px',
  };

  return (
    <div className="page-wrapper">
      <h4 className="m-2"
        style={{ position: 'sticky', top: '70px', zIndex: 1000, padding: '10px', backgroundColor: 'white', display: 'inline-block', color: '#fe9f43', fontSize: "16px" }}
      >Bulk Email
      </h4>
      <div className="content">
        <div className="EditPersonalDetails new-member-page">
          <Row>
            <Col className="col-xl-10 offset-xl-1 offset-md-0">
              <h4 className="mt-2 mb-2">Create Email</h4>
              <div>
                <Form onSubmit={formik.handleSubmit} isSubmitting>
                  <div className="create-ticket register-block">
                    <FormGroup className="form-group" md={12}>
                      <Row className="mb-3 modal-body-table search-modal-header">
                        <Col md={12}>
                          <Label className="form-label" htmlFor="msg">
                            Email Content
                            <span required>*</span>
                          </Label>
                          <ReactQuill
                            style={{
                              backgroundColor: "white",

                            }}
                            id="msg"
                            name="msg"
                            value={formik.values.msg}
                            onChange={(value) => formik.setFieldValue("msg", value)}
                            onBlur={() => formik.setFieldTouched("msg", true)}
                            placeholder="Please enter content for email"
                          />
                          {formik.touched.msg && formik.errors.msg ? (
                            <small className="error-cls" style={{ color: "red" }}>
                              {formik.errors.msg}
                            </small>
                          ) : null}
                        </Col>
                      </Row>
                      <Row className="mb-3 modal-body-table search-modal-header">

                        <Col md={12}>
                          <Label className="form-label" htmlFor="subject">
                            Subject
                            <span required>*</span>
                          </Label>
                          <textarea
                            type="text"
                            className="form-control"
                            id="subject"
                            name="subject"
                            rows={1}
                            placeholder="Please enter Subject"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.subject}
                          />

                          {formik.touched.subject && formik.errors.subject ? (
                            <small className="error-cls" style={{ color: "red" }}>
                              {formik.errors.subject}
                            </small>
                          ) : null}
                        </Col>
                      </Row>
                      <Row className="mb-3 modal-body-table search-modal-header">
                        <Col md={12}>
                          <a href={EmailsFile} target="_blank" rel="noreferrer">
                            <Button
                              label={<>
                                <Download className="me-2" style={{ color: "white" }} />
                                <b>Template</b>
                              </>}
                              btnClass="primary"
                              size="small"
                              shape="btn-square" />
                          </a>
                          <input
                            type="file"
                            id="file_name"
                            className="form-control"
                            name="file_name"
                            style={{
                              display: "none",
                            }}
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                            onChange={(e) => fileHandler(e)}
                            onBlur={formik.handleBlur}
                          />
                          <Button
                            label={<>
                              <Upload className="me-2" style={{ color: "white" }} />
                              <b>Upload Email ids File</b>
                            </>}
                            btnClass="primary m-2"
                            size="small"
                            onClick={() => {
                              document.getElementById("file_name").click();
                            }}
                          />
                          {fileName && (
                            <span className="ml-2 p-3">
                              {fileName}
                            </span>
                          )}
                          {/* </div> */}
                          {formik.touched.file_name &&
                            formik.errors.file_name && (
                              <small
                                className="error-cls"
                                style={{ color: "red" }}
                              >
                                {formik.errors.file_name}
                              </small>
                            )}
                        </Col>
                      </Row>

                    </FormGroup>
                  </div>


                  <Row >
                    <div style={buttonContainerStyle} className='mt-3'>
                      <button
                        label="Submit details"
                        type="submit"
                        className={`btn btn-warning ${!(formik.dirty && formik.isValid)
                          ? "default"
                          : "warning"
                          }`}
                        disabled={!(formik.dirty && formik.isValid)}
                        style={buttonStyle}
                      >
                        Trigger Email
                      </button>

                      <button
                        type="cancel"
                        className="btn btn-secondary"
                        onClick={() => navigate("/emailList")}
                      >
                        Discard
                      </button>
                    </div>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default CreateEmail;
