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

export const CreateTeamMember = () => {
  const location = useLocation();

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
      // username: "",
    },

    validationSchema: Yup.object({
      fullName: Yup.string()
        .required("Please Enter valid Full Name")
        .max(40)
        .required()
        .matches(
          /^[A-Za-z0-9\s]*$/,
          "Please enter only alphanumeric characters"
        )
        .trim(),
      age: Yup.number()
        .integer()
        .min(10, "Min age is 10")
        .max(18, "Max age is 18")
        .required("required"),
      gender: Yup.string().required("Please select valid gender"),
      // username: Yup.string().email("Must be a valid email").max(255),
      disability: Yup.string().required("Please select disability"),
      grade: Yup.string()
        .matches("", "Please enter valid class")
        .max(40)
        .required("Please enter valid class"),
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
      };
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
  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <div className="EditPersonalDetails new-member-page">
            <Row>
              <Col className="col-xl-10 offset-xl-1 offset-md-0">
                {/* <BreadcrumbTwo {...headingDetails} /> */}

                <>
                  <h3 className="m-4">Add Student</h3>
                  <div>
                    <Form onSubmit={formik.handleSubmit} isSubmitting>
                      <div className="create-ticket register-blockt">
                        <Row>
                          <Col md={3}>
                            <Label className="form-label">
                              Full Name
                              <span required className="p-1">
                                *
                              </span>
                            </Label>
                            <input
                              className="form-control"
                              placeholder="Please Enter Your Full Name"
                              id="fullName"
                              name="fullName"
                              onChange={formik.handleChange}
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
                          <Col md={2}>
                            <Label htmlFor="inputState" className="form-label">
                              Age
                              <span required className="p-1">
                                *
                              </span>
                            </Label>
                            <div className="dropdown CalendarDropdownComp ">
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
                            </div>
                            {formik.touched.age && formik.errors.age ? (
                              <small className="error-cls">
                                {formik.errors.age}
                              </small>
                            ) : null}
                          </Col>

                          <Col md={2} className="mb-5 mb-xl-0">
                            <Label
                              className="name-req-create-member"
                              htmlFor="gender"
                            >
                              Gender
                              <span required className="p-1">
                                *
                              </span>
                            </Label>

                            <select
                              name="gender"
                              className="form-control custom-dropdown"
                              value={formik.values.gender}
                              onChange={formik.handleChange}
                            >
                              <option value="">Select Gender</option>
                              <option value="MALE">Male</option>
                              <option value="FEMALE">Female</option>
                              <option value="OTHERS">
                                Prefer not to mention
                              </option>
                            </select>

                            {formik.touched.gender && formik.errors.gender ? (
                              <small className="error-cls">
                                {formik.errors.gender}
                              </small>
                            ) : null}
                          </Col>

                          <Col md={3}>
                            <Label htmlFor="inputState" className="form-label">
                              Disability
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
                              <option value="Autism/Cerebral Palsy/Other">
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
                          <Col md={2}>
                            <Label htmlFor="inputState" className="form-label">
                              Class
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
                        </Row>
                      </div>

                      <hr className="mt-4 mb-4"></hr>
                      <Row>
                        <Col className="mt-2" xs={12} sm={6} md={6} xl={6}>
                          <button type="submit" className="btn btn-warning">
                            Submit
                          </button>
                        </Col>
                        <Col className="mt-2 d-flex justify-content-end">
                          <button
                            onClick={() => navigate("/mentorteams")}
                            type="button"
                            className="btn btn-secondary"
                          >
                            Discard
                          </button>
                        </Col>
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
