/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Form, Label, Card } from "reactstrap";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { openNotificationWithIcon, getCurrentUser } from "../../helpers/Utils";
import { useDispatch } from "react-redux";
import { teacherCreateMultipleStudent } from "../store/teacher/actions";
import { useLocation } from "react-router-dom";
import { encryptGlobal } from "../../constants/encryptDecrypt";
import CreateMultipleMembers from "./CreateMultipleMembers";
import { useNavigate } from "react-router-dom";
import {teamLength} from "../../RegPage/ORGData";
import { useTranslation } from "react-i18next";

export const CreateTeamMember = () => {
  const location = useLocation();
 const { t } = useTranslation();
  const teamData = location.state || {};
  const currentUser = getCurrentUser("current_user");
  const navigate = useNavigate();
  const allowedAge = [10, 11, 12, 13, 14, 15, 16, 17, 18];
  const formik = useFormik({
    initialValues: {
      fullName: "",
      age: "",
      grade: "",
      gender: "",
      disability: "",
      email:""
    },

    validationSchema: Yup.object({
      fullName: Yup.string()
        .required(<span style={{ color: "red" }}>Please Enter Full Name</span>)
        .max(40)
        .matches(
          /^[A-Za-z0-9\s]*$/,
          "Please enter only alphanumeric characters"
        )
        .trim(),
      age: Yup.number()
        .integer()
        .min(10, "Min age is 10")
        .max(18, "Max age is 18")
        .required(<span style={{ color: "red" }}>Please Select Age</span>),
      gender: Yup.string().required(
        <span style={{ color: "red" }}>Please Select Gender</span>
      ),
      email: Yup.string().email("Please Enter Valid Email Address").max(255)
      // .required(<span style={{ color: "red" }}>Please Enter Email Address</span>),
      .optional(),
      disability: Yup.string().required(
        <span style={{ color: "red" }}>Please Select Disability Status</span>
      ),
      grade: Yup.string()
        // .matches("", "Please Select Class")
        .max(40)
        .required(<span style={{ color: "red" }}>Please Select Class</span>),
    }),

    onSubmit: (values) => {
      const body = {
        team_id: JSON.stringify(teamData?.team_id),
        role: "STUDENT",
        full_name: values.fullName,
        qualification: "",
        Age: values.age,
        Grade: values.grade,
        Gender: values.gender,
        disability: values.disability,
        state:currentUser?.data[0]?.state,
      };
      if (values.email !== "") {
        body["email"] = values.email;
      } 
      var config = {
        method: "post",
        url: process.env.REACT_APP_API_BASE_URL + "/students/addStudent",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser?.data[0]?.token}`,
        },
        data: body,
      };
      axios(config)
        .then(function (response) {
          if (response.status === 201) {
            openNotificationWithIcon(
              "success",
              "Team Member Created Successfully"
            );
            navigate("/mentorteams");
          } else {
            openNotificationWithIcon("error", "Opps! Something Wrong");
          }
        })
        .catch(function (error) {
          if (error.response.status === 406) {
            openNotificationWithIcon("error", error?.response?.data?.message);
          } else {
            openNotificationWithIcon("error", "Opps! Something Wrong");
          }
        });
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
    <div>
      <div className="page-wrapper">
        <div className="content">
          <div className="EditPersonalDetails new-member-page">
            <Row>
              <Col className="col-xl-10 offset-xl-1 offset-md-0">
                {/* <BreadcrumbTwo {...headingDetails} /> */}

                <>
                  <h3 className="m-4"> {t('teacherJourney.onestudent')}

                  </h3>
                  <div>
                    <Form onSubmit={formik.handleSubmit} isSubmitting>
                      <div className="create-ticket register-blockt">
                        <Row className="mb-3 modal-body-table search-modal-header" >
                          <Col md={4}>
                            <Label className="form-label">
                            {t('teacherJourney.tfullname')}
                              <span required className="p-1">
                                *
                              </span>
                            </Label>
                            <input
                              className="form-control"
                              placeholder="Enter Full Name"
                              id="fullName"
                              name="fullName"
                              onChange={(e) => {
                                const inputValue = e.target.value;
                                const lettersOnly = inputValue.replace(
                                  /[^a-zA-Z\s]/g,
                                  ""
                                );
                                formik.setFieldValue("fullName", lettersOnly);
                              }}
                              // onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.fullName}
                            />
                            {formik.touched.fullName &&
                            formik.errors.fullName ? (
                              <small className="error-cls">
                                {formik.errors.fullName}
                              </small>
                            ) : null}
                          </Col>
                          <Col md={4}>
                            <Label className="form-label">
                            {t('teacherJourney.eamil1')}
                              {/* <span required className="p-1">
                                *
                              </span> */}
                            </Label>
                            <input
                              className="form-control"
                              placeholder="Enter  Email Address"
                              id="email"
                              name="email"
                              // onChange={(e) => {
                              //   const inputValue = e.target.value;
                              //   const lettersOnly = inputValue.replace(
                              //     /[^a-zA-Z\s]/g,
                              //     ""
                              //   );
                              //   formik.setFieldValue("f", lettersOnly);
                              // }}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.email}
                            />
                            {formik.touched.email &&
                            formik.errors.email ? (
                              <small className="error-cls"style={{ color: "red" }}>
                                {formik.errors.email}
                              </small>
                            ) : null}
                          </Col>
                       
                          <Col md={4}>
                            <Label htmlFor="inputState" className="form-label">
                            {t('teacherJourney.disability')}
                              <span required className="p-1">
                                *
                              </span>
                            </Label>
                            <select
                              id="inputState"
                              className="form-select"
                              name="disability"
                              value={formik.values.disability}
                              onChange={formik.handleChange}
                            >
                              <option value="">  {t('teacherJourney.select')}</option>
                              <option value="No">No</option>
                              <option value="Physically Challenged">
                                Physically Challenged
                              </option>
                              <option value="Visually Challenged">
                                Visually Challenged
                              </option>
                              <option value="Locomotor Disability">
                                Locomotor Disability
                              </option>
                              <option value="Intellectual Disability">
                                Intellectual Disability
                              </option>
                              <option value="Learning Disability">
                                Learning Disability
                              </option>
                              <option value="Hearing Impaired">
                                Hearing Impaired
                              </option>
                              <option value="Autism or Cerebral Palsy or Other">
                                Autism/Cerebral Palsy/Other
                              </option>
                              <option value="Others">Others</option>
                            </select>
                            {formik.touched.disability &&
                            formik.errors.disability ? (
                              <small className="error-cls">
                                {formik.errors.disability}
                              </small>
                            ) : null}
                          </Col>
                          <Col md={4}>
                            <Label htmlFor="inputState" className="form-label">
                            {t('teacherJourney.age')}
                              <span required className="p-1">
                                *
                              </span>
                            </Label>
                            <select
                              id="inputState"
                              className="form-select"
                              name="age"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.age}
                            >
                              <option value={""}>Select Age</option>
                              {allowedAge.map((item) => (
                                <option key={item} value={item}>
                                  {item}
                                </option>
                              ))}
                            </select>
                            {formik.touched.age && formik.errors.age ? (
                              <small className="error-cls">
                                {formik.errors.age}
                              </small>
                            ) : null}
                          </Col>
                          <Col md={4}>
                            <Label htmlFor="inputState" className="form-label">
                            {t('teacherJourney.class')}
                              <span required className="p-1">
                                *
                              </span>
                            </Label>
                            <select
                              id="inputState"
                              className="form-select"
                              name="grade"
                              value={formik.values.grade}
                              onChange={formik.handleChange}
                            >
                              <option value="">Select Class..</option>
                              <option value="6">Class 6</option>
                              <option value="7">Class 7</option>
                              <option value="8">Class 8</option>
                              <option value="9">Class 9</option>
                              <option value="10">Class 10</option>
                              <option value="11">Class 11</option>
                              <option value="12">Class 12</option>
                            </select>
                            {formik.touched.grade && formik.errors.grade ? (
                              <small className="error-cls">
                                {formik.errors.grade}
                              </small>
                            ) : null}
                          </Col>
                          <Col md={4} className="mb-5 mb-xl-0">
                            <Label htmlFor="inputState" className="form-label">
                            {t('teacherJourney.gender')}
                              <span required className="p-1">
                                *
                              </span>
                            </Label>

                            <select
                              name="gender"
                              className="form-select"
                              id="inputState"
                              value={formik.values.gender}
                              onChange={formik.handleChange}
                            >
                              <option value="">Select Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Prefer Not to Mention">
                                Prefer Not to Mention
                              </option>
                            </select>

                            {formik.touched.gender && formik.errors.gender ? (
                              <small className="error-cls">
                                {formik.errors.gender}
                              </small>
                            ) : null}
                          </Col>
                        </Row>
                      </div>

                      {/* <hr className="mt-2"></hr> */}
                      <Row>
                        <div style={buttonContainerStyle}>
                          <button type="submit" className="btn btn-warning" style={buttonStyle}>
                          {t('teacherJourney.submit')}
                          </button>
                        
                          <button
                            onClick={() => navigate("/mentorteams")}
                            type="button"
                            className="btn btn-secondary"
                            style={{ marginLeft: 'auto' }} 
                          >
                            {t('teacherJourney.discard')}
                          </button>
                          </div>
                      </Row>
                    </Form>
                  </div>
                </>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateTeamMember;

// export default CreateTeamMember;
