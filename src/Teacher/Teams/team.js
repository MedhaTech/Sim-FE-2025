/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Form, Label, Card } from "reactstrap";
import { useLocation, withRouter } from 'react-router-dom';

import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { openNotificationWithIcon, getCurrentUser } from "../../helpers/Utils";
import { useDispatch } from "react-redux";
import { teacherCreateMultipleStudent } from "../store/teacher/actions";
import { encryptGlobal } from "../../constants/encryptDecrypt";

// import { all_routes } from "../../Router/all_routes";
const studentBody = {
  full_name: "",
  Age: "",
  Grade: "",
  Gender: "",
  disability: "",
  // username: "",
};
const grades = [6, 7, 8, 9, 10, 11, 12];
const allowedAge = [10, 11, 12, 13, 14, 15, 16, 17, 18];

const CreateMultipleMembers = ({ id }) => {
  const dispatch = useDispatch();
  const [itemDataErrors, setItemDataErrors] = useState([studentBody]);
  //   const history = useHistory();
  const [isClicked, setIsClicked] = useState(false);
  const [teamname, setTeamname] = useState("");
  const [teamemail, setTeamemail] = useState("");
  const handleteamname = (e) => {
    const numericValue = e.target.value.replace(/\D/g, "");
    const trimmedValue = numericValue.trim();

    setTeamname(trimmedValue);
  };
  const handleteamemail = (e) => {
    const numericValue = e.target.value;
    const trimmedValue = numericValue.trim();

    setTeamemail(trimmedValue);
  };
  const [studentData, setStudentData] = useState([
    {
      team_id: id,
      role: "STUDENT",
      full_name: "",
      Age: "",
      Grade: "",
      Gender: "",
      // username: "",
      disability: "",
    },
    {
      team_id: id,
      role: "STUDENT",
      full_name: "",
      Age: "",
      Grade: "",
      Gender: "",
      username: "",
      disability: "",
    },
    {
      team_id: id,
      role: "STUDENT",
      full_name: "",
      Age: "",
      Grade: "",
      Gender: "",
      // username: "",
      disability: "",
    },
  ]);
  let pattern = /[A-Za-z0-9\s]*$/;
  // const emailRegex = /[A-Za-z-@+.-]*$/;
  const emailRegex = /^[\w.]+@([\w-]+\.)+[\w-]{2,4}$/;

  return (
    <div className="page-wrapper">
      <div className="content">
        {/* <div className="page-header"> */}
        <div className="page-title">
          <h3 style={{ marginBottom: "1rem" }}>Team And Student Creation</h3>
          <div />
          <Row>
            <Col md={6}>
              <Label className="form-label">
                Team Name
                <span required className="p-1">
                  *
                </span>
              </Label>
              <input
                className="form-control"
                placeholder="Please Enter Your Team Name"
                id="teamname"
                name="teamname"
                onChange={(e) => handleteamname(e)}
                value={teamname}
              />
            </Col>
            <Col md={6} className="mb-xl-0">
              <Label className="form-label">
                Team Email Address
                <span required className="p-1">
                  *
                </span>
              </Label>
              <input
                className="form-control"
                placeholder="Please Enter Your Email Address"
                id="teamemail"
                name="teamemail"
                type="email"
                onChange={(e) => handleteamemail(e)}
                value={teamemail}
              />
              {/* {foundErrObject?.username ? (
                          <small className="error-cls">
                            {foundErrObject.username}
                          </small>
                        ) : null} */}
            </Col>
          </Row>
          {studentData.map((item, i) => {
            const foundErrObject = { ...itemDataErrors[i] };
            return (
              <div key={i + item} className="mb-5">
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="mt-2">Student {i + 1} Details</h6>
                  {/* {i > 1 && (
                      <button
                        //   label={"Remove"}
                        onClick={() => removeItem(i)}
                        //   btnClass={"secondary float-end"}
                        className="btn btn-primary "
                      >
                        Remove
                      </button>
                    )} */}
                </div>
                <hr />
                <Row className="mb-3">
                  {/* <Row> */}
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
                      id="full_name"
                      name="full_name"
                      value={item.full_name}
                    />
                    {foundErrObject?.full_name ? (
                      <small className="error-cls">
                        {foundErrObject.full_name}
                      </small>
                    ) : null}
                  </Col>

                  <Col md={2} className="mb-xl-0">
                    <Label htmlFor="inputState" className="form-label">
                      Age
                      <span required className="p-1">
                        *
                      </span>
                    </Label>
                    <select
                      id="inputState"
                      className="form-select"
                      name="Age"
                      value={item.Age}
                      onChange={(e) => handleChange(e, i)}
                    >
                      <option value={""}>Select Age</option>
                      {allowedAge.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    {foundErrObject?.Age ? (
                      <small className="error-cls">{foundErrObject.Age}</small>
                    ) : null}
                  </Col>
                </Row>
              </div>
            );
          })}
          <Row>
            <Col className="mt-2" xs={12} sm={6} md={6} xl={6}>
              <button type="Submit" className="btn btn-primary m-2">
                Submit
              </button>
              <button type="button" className="btn btn-secondary m-2">
                Discard
              </button>
            </Col>
            <Col className="mt-2" xs={12} sm={6} md={6} xl={6}></Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export const CreateTeamMember = (props) => {
  const loc = useLocation();
  const params = loc.pathname.split("/");
  const pl = params.length;
  const id = params[pl - 2];
  const studentCount = params[pl - 1];
  const currentUser = getCurrentUser("current_user");
  const [teamMemberData, setTeamMemberData] = useState({});
  const [isClicked, setIsClicked] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      age: "",
      grade: "",
      gender: "",
      disability: "",
      username: "",
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
    }),

    onSubmit: (values) => {
      if (process.env.REACT_APP_TEAM_LENGTH == teamMemberData.student_count) {
        openNotificationWithIcon(
          "warning",
          "Team Members Maximum Count All Ready Exist"
        );
      } else {
        setIsClicked(true);
        const body = {
          team_id: id,
          role: "STUDENT",
          full_name: values.fullName,
          qualification: "",
          Age: values.age,
          Grade: values.grade,
          Gender: values.gender,
          disability: values.disability,
          username: values.username,
          country: values.country,
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
              props.history.push("/teacher/teamlist");
            } else {
              openNotificationWithIcon("error", "Opps! Something Wrong");
              setIsClicked(false);
            }
          })
          .catch(function (error) {
            if (error.response.status === 406) {
              openNotificationWithIcon("error", error?.response?.data?.message);
            } else {
              openNotificationWithIcon("error", "Opps! Something Wrong");
            }
            setIsClicked(false);
          });
      }
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
                {studentCount && studentCount === "new" ? (
                  <CreateMultipleMembers id={id} />
                ) : (
                  <div>
                    <Form onSubmit={formik.handleSubmit} isSubmitting>
                      <div className="create-ticket register-blockt">
                        <Row>
                          <Col md={6}>
                            <Label
                              className="name-req-create-member"
                              htmlFor="fullName"
                            >
                              Full Name
                              <span required className="p-1">
                                *
                              </span>
                            </Label>
                            <input
                              className={"defaultInput"}
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
                          <Col md={3} className="mb-0">
                            <Label
                              className="name-req-create-member"
                              htmlFor="age"
                            >
                              Age
                              <span required className="p-1">
                                *
                              </span>
                            </Label>
                            <div className="dropdown CalendarDropdownComp ">
                              <select
                                className="form-control custom-dropdown"
                                id="age"
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
                        </Row>
                      </div>

                      <hr className="mt-4 mb-4"></hr>
                      <Row>
                        <Col className="mt-2" xs={12} sm={6} md={6} xl={6}>
                          <button type="button" className="btn btn-warning">
                            Discard
                          </button>
                        </Col>
                        <Col className="mt-2" xs={12} sm={6} md={6} xl={6}>
                          {!isClicked ? (
                            <button type="submit" className="btn btn-secondary">
                              Submit
                            </button>
                          ) : (
                            <button type="button">Submit</button>
                          )}
                        </Col>
                      </Row>
                    </Form>
                  </div>
                )}
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};
export default withRouter(CreateTeamMember);

