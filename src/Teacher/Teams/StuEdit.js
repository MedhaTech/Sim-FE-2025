/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Row, Col, Label } from "reactstrap";

import {
  getCurrentUser,
  setCurrentUser,
  openNotificationWithIcon,
} from "../../helpers/Utils";
import {
  getAdminTeamMembersList,
  // studentResetPassword
} from "../../redux/actions";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { connect, useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import * as Yup from "yup";
import { useFormik } from "formik";
import { encryptGlobal } from "../../constants/encryptDecrypt";
import { useNavigate } from "react-router-dom";
import female from "../../assets/img/Female_Profile.png";
import male from "../../assets/img/Male_Profile.png";
import user from "../../assets/img/user.png";
const StuEdit = () => {
  const location = useLocation();
  const studentData = location.state || {};
   const { t } = useTranslation();
  
  //   console.log(studentData, "111");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = getCurrentUser("current_user");
  const allowedAge = [10, 11, 12, 13, 14, 15, 16, 17, 18];
  const formik = useFormik({
    initialValues: {
      fullName: studentData && studentData.full_name,
      age: JSON.stringify(studentData && studentData.Age),
      grade: studentData && studentData.Grade,
      gender: studentData && studentData.Gender,
      disability: studentData && studentData.disability,
        email: studentData && studentData.email,
    },

    validationSchema: Yup.object({
      fullName: Yup.string()
        .required(
          <span style={{ color: "red" }}>Please Enter valid Full Name</span>
        )
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
       .optional(),
            // .required(<span style={{ color: "red" }}>Please Enter Email Address</span>),
      //   username: Yup.string().email("Must be a valid email").max(255),
      disability: Yup.string().required(
        <span style={{ color: "red" }}>Please Select Disability Status</span>
      ),
      grade: Yup.string()
        .max(40)
        .required(<span style={{ color: "red" }}>Please Select Class</span>),
    }),

    onSubmit: (values) => {
      const body = {
        team_id: studentData.team_id,
        role: "STUDENT",
        //full_name: values.fullName,
        // email: values.email,

        Age: values.age,
        Grade: values.grade,
        disability: values.disability,
        Gender: values.gender,
      };
      console.log(values.fullName,"values");
      if (studentData && studentData.full_name !== values.fullName) {
        body["full_name"] = values.fullName;
        console.log(studentData,studentData.full_name,values.fullName,"inside if");
      }
      if (studentData && studentData.email !== values.email) {
        body["email"] = values.email;
      }
      const teamparamId = encryptGlobal(JSON.stringify(studentData.student_id));
      var config = {
        method: "put",
        url: process.env.REACT_APP_API_BASE_URL + "/students/" + teamparamId,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser?.data[0]?.token}`,
        },
        data: body,
      };
      axios(config)
        .then(function (response) {
          if (response.status === 200) {
            openNotificationWithIcon(
              "success",
              "Student details updated Successfully"
            );
            dispatch(getAdminTeamMembersList(studentData.team_id));
            navigate("/mentorteams");
            // handleView(studentData);
          } else {
            openNotificationWithIcon("error", "Opps! Something Wrong");
          }
        })
        .catch(function (error) {
          openNotificationWithIcon("error", error?.response?.data?.message);
        });
    },
  });
  return (
    <div className="page-wrapper">
      <div className="content">
        <div>
          <Form onSubmit={formik.handleSubmit} isSubmitting>
            {/* <div className="card"> */}
            <div className="card-body">
              <div className="profile-set">
                <div className="profile-head"></div>
                <div className="profile-top">
                  <div className="profile-content">
                    <div className="profile-contentimg">
                      {studentData.Gender === "Male" || studentData.Gender === "MALE" ? (
                        <img src={male} alt="Male" id="blah" />
                      ) : ((studentData.Gender === "Female" || studentData.Gender === "FEMALE")?(
                        <img src={female} alt="Female" id="blah" />):(<img src={user} alt="user" id="blah" />)
                      )}
                      {/* {studentData.Gender === "MALE" || studentData.Gender === "Male" ? (
                        <img src={male} alt="Male" id="blah" />
                      ) : (
                        <img src={female} alt="Female" id="blah" />
                      )} */}
                      <div className="profileupload"></div>
                    </div>
                    <div className="profile-contentname">
                      <h2>{studentData.full_name}</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="create-ticket register-blockt">
                  <Row>
                    <Col md={4}>
                      <Label className="form-label">
                      {t('teacherJourney.tfullname')}
                        <span required className="p-1">
                          *
                        </span>
                      </Label>
                      <input
                        className="form-control"
                        placeholder="Please Enter Your Full Name"
                        id="fullName"
                        name="fullName"
                        // onChange={formik.handleChange}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          const lettersOnly = inputValue.replace(
                            /[^a-zA-Z\s]/g,
                            ""
                          );
                          formik.setFieldValue("fullName", lettersOnly);
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.fullName}
                      />
                      {formik.touched.fullName && formik.errors.fullName ? (
                        <small className="error-cls" style={{color:"red"}}>
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
                        <option value="">Select Status</option>
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
                      {formik.touched.disability && formik.errors.disability ? (
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
                        <small className="error-cls">{formik.errors.age}</small>
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
                        id="inputState"
                        className="form-select"
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Prefer Not to Mention">Prefer Not to Mention</option>
                      </select>

                      {formik.touched.gender && formik.errors.gender ? (
                        <small className="error-cls">
                          {formik.errors.gender}
                        </small>
                      ) : null}
                    </Col>

                  
                  
                  </Row>
                </div>
                <Row>
                  <Col className="mt-2" >
                    <button
                      // type="submit" className="btn btn-warning"
                      // style={{ marginRight: "10px" }}
                      type="submit"
                      className={`btn btn-warning  ${
                        !(formik.dirty && formik.isValid)
                          ? "default"
                          : "primary"
                      }`}
                      disabled={!(formik.dirty && formik.isValid)}
                    >
                       {t('teacherJourney.submit')}
                    </button>
                  </Col>
                  <Col className="mt-2 d-flex justify-content-end">
                    <button
                      onClick={() => navigate("/mentorteams")}
                      type="button"
                      className="btn btn-secondary"
                    >
                       {t('teacherJourney.discard')}
                    </button>
                  </Col>
                </Row>
              </div>
            </div>
            {/* </div> */}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default StuEdit;
