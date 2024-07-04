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
import { useNavigate } from "react-router-dom";

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
  const [teamId, setTeamId] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  // const [itemDataErrors, setItemDataErrors] = useState([]);
  const tempStudentData = {
    team_id: teamId,
    role: "STUDENT",
    full_name: "",
    Age: "",
    Grade: "",
    Gender: "",
    disability: "",
    // username: "",
  };
  const dispatch = useDispatch();
  const [itemDataErrors, setItemDataErrors] = useState([studentBody]);
  const currentUser = getCurrentUser("current_user");

  //   const history = useHistory();
  const navigate = useNavigate();

  const [isClicked, setIsClicked] = useState(false);
  const [teamname, setTeamname] = useState("");
  const [teamemail, setTeamemail] = useState("");

  const [teamNameError, setTeamNameError] = useState("");

  const handleteamname = (e) => {
    const numericValue = e.target.value;
    const trimmedValue = numericValue.trim();
    setTeamname(trimmedValue);

    if (trimmedValue.length < 1) {
      setTeamNameError("Please Enter Team Name");
    } else {
      setTeamNameError("");
    }
  };
  // const handleteamemail = (e) => {
  //   const numericValue = e.target.value;
  //   const trimmedValue = numericValue.trim();

  //   setTeamemail(trimmedValue);
  // };
  const [emailError, setEmailError] = useState("");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const handleteamemail = (e) => {
    const numericValue = e.target.value;
    const trimmedValue = numericValue.trim();
    setTeamemail(trimmedValue);

    if (!emailPattern.test(trimmedValue)) {
      setEmailError("Enter a valid email address");
    } else {
      setEmailError("");
    }
  };
  const [studentData, setStudentData] = useState([
    {
      team_id: teamId,
      role: "STUDENT",
      full_name: "",
      Age: "",
      Grade: "",
      Gender: "",
      // username: "",
      disability: "",
    },
    {
      team_id: teamId,
      role: "STUDENT",
      full_name: "",
      Age: "",
      Grade: "",
      Gender: "",
      // username: "",
      disability: "",
    },
    {
      team_id: teamId,
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
  const handleChange = (e, i) => {
    let newItem = [...studentData];
    const dataKeys = Object.keys(studentBody);
    if (e.target) {
      dataKeys.some((item) => {
        if (e.target.name === item) {
          newItem[i][e.target.name] = e.target.value;
          let errCopy = [...itemDataErrors];
          if (item === "full_name") {
            let check = e.target.value;
            if (check && check.match(pattern)) {
              const { index } = check.match(pattern);
              if (index) {
                const foo = { ...errCopy[i] };
                foo[e.target.name] = "Only alphanumeric are allowed";
                errCopy[i] = { ...foo };
                setItemDataErrors(errCopy);
                return;
              }
            }
          }
          // if (item === "username") {
          //   let check = e.target.value;
          //   if (check && check.match(emailRegex)) {
          //     const { index } = check.match(emailRegex);
          //     if (index) {
          //       const foo = { ...errCopy[i] };
          //       foo[e.target.name] = "Enter Valid Mail Id";
          //       errCopy[i] = { ...foo };
          //       setItemDataErrors(errCopy);
          //       return;
          //     }
          //   }
          // }
          const foo = { ...errCopy[i] };
          foo[e.target.name] = "";
          errCopy[i] = { ...foo };
          setItemDataErrors(errCopy);
        }
        return;
      });
    }

    setStudentData(newItem);
  };
  const validateItemData = () => {
    const errors = studentData.map((item, i) => {
      let err = {};
      if (!item.full_name.trim()) err["full_name"] = "Please Enter Full Name";
      if (item.full_name && item.full_name.match(pattern)) {
        const { index } = item.full_name.match(pattern);
        if (index) {
          err["full_name"] = "Only alphanumeric are allowed";
        }
      }

      // if (!item.username.trim()) err["username"] = "Email is Required";
      // if (item.username) {
      //     const start = item.username.indexOf('@');
      //     const main = item.username.substring(start);
      //     const checkarry = ['@gmail.com', '@outlook.com', '@yahoo.com'];
      //     const text = checkarry.includes(main);
      //     if (!text) {
      //         err['username'] = 'Enter Valid Mail Id';
      //     }
      // }

      if (!item.Age) err["Age"] = "Please Select Age ";

      if (!item.disability)
        err["disability"] = " Please Select Disability Status";
      if (!item.Grade) err["Grade"] = "Please Select Grade";
      if (!item.Gender) err["Gender"] = "Please Select Gender";
      if (Object.values(err).length === 0) {
        return { ...studentBody, i };
      }
      return { ...err, i };
    });
    // const combinedErrors = [...errors, teamErrors];
    setItemDataErrors(errors.filter((item) => Object.values(item).length > 0));
    const filterEmpty = errors.filter((item) => {
      const ce = { ...item };
      delete ce.i;
      return Object.values(ce).filter(Boolean).length > 0;
    });
    if (filterEmpty.length > 0) {
      return false;
    } else {
      return true;
    }
  };
  const addItem = () => {
    if (!validateItemData()) {
      return;
    } else {
      setStudentData([...studentData, tempStudentData]);
    }
  };
  const containsDuplicates = (array) => {
    if (array.length !== new Set(array).size) {
      return true;
    }
    return false;
  };
  const removeItem = (i) => {
    let newItems = [...studentData];
    newItems.splice(i, 1);
    setStudentData(newItems);
  };
  const handleSumbit = () => {
    // alert("hii");
    if (!validateItemData()) return;
    setIsClicked(true);
    const checkDuplicateName = containsDuplicates(
      studentData.map((item) => item.full_name)
    );
    if (checkDuplicateName) {
      openNotificationWithIcon("error", "Student already exists");
      setIsClicked(false);
      return;
    }
    const body = {
      mentor_id: JSON.stringify(currentUser?.data[0]?.mentor_id),
      team_name: teamname,
      team_email: teamemail,
    };
    var config = {
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/teams",
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${currentUser?.data[0]?.token}`,
      },
      data: body,
    };
    axios(config)
      .then(function (response) {
        if (response.status === 201) {
          console.log(response, "team");
          const newTeamId = response.data.data[0].team_id;
          setTeamId(response.data.data[0].team_id);
          console.log(teamId, "id");
          openNotificationWithIcon("success", "Team Created Successfully");
          const updatedStudentData = studentData.map((student) => ({
            ...student,
            team_id: JSON.stringify(newTeamId),
          }));
          setTimeout(() => {
            dispatch(
              teacherCreateMultipleStudent(
                updatedStudentData,
                navigate,
                setIsClicked
              )
            );
            // ('/teacher/teamlist');
          }, 2000);
          // dispatch(
          //   teacherCreateMultipleStudent(studentData, navigate, setIsClicked)
          // );
        } else {
          openNotificationWithIcon("error", "Opps! Something Wrong");
        }
      })
      .catch(function (error) {
        console.log(error.response.data.status);
        if (error.response.data.status === 400) {
          console.log(error, "eee");
          openNotificationWithIcon("warning", error.response.data.errors);
        }
      });
    // dispatch(teacherCreateMultipleStudent(studentData, navigate, setIsClicked));
  };
  // useEffect(() => {
  //   setButtonDisabled(!validateItemData());
  // }, [studentData, teamname, teamemail]);
  const button = teamname && teamemail && studentData;
  return (
    <div className="page-wrapper">
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
            {teamNameError && <span>{teamNameError}</span>}
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
            {emailError && <span>{emailError}</span>}
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
                {i > 1 && (
                  <button
                    //   label={"Remove"}
                    onClick={() => removeItem(i)}
                    //   btnClass={"secondary float-end"}
                    className="btn btn-primary "
                  >
                    Remove
                  </button>
                )}
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
                    onChange={(e) => {
                      handleChange(e, i);
                    }}
                    value={item.full_name}
                  />
                  {foundErrObject?.full_name ? (
                    <small className="error-cls">
                      {foundErrObject.full_name}
                    </small>
                  ) : null}
                </Col>
                {/* <Col md={6} className="mb-xl-0">
                        <Label className="form-label">
                          Email Address
                          <span required className="p-1">
                            *
                          </span>
                        </Label>
                        <input
                          className="form-control"
                          placeholder="Enter Email Id"
                          id="username"
                          name="username"
                          onChange={(e) => {
                            handleChange(e, i);
                          }}
                          value={item.username}
                        />
                        {foundErrObject?.username ? (
                          <small className="error-cls">
                            {foundErrObject.username}
                          </small>
                        ) : null}
                      </Col> */}
                {/* </Row> */}
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
                <Col md={3} className="mb-xl-0">
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
                    value={item.disability}
                    onChange={(e) => handleChange(e, i)}
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
                    <option value="Hearing Impaired">Hearing Impaired</option>
                    <option value="Autism/Cerebral Palsy/Other">
                      Autism/Cerebral Palsy/Other
                    </option>
                    <option value="Others">Others</option>
                  </select>
                  {foundErrObject?.disability ? (
                    <small className="error-cls">
                      {foundErrObject.disability}
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
                    name="Grade"
                    value={item.Grade}
                    onChange={(e) => handleChange(e, i)}
                  >
                    <option value="">Select Class</option>
                    {grades.map((item) => (
                      <option key={item} value={item}>
                        Class {item}
                      </option>
                    ))}
                  </select>
                  {foundErrObject?.Grade ? (
                    <small className="error-cls">{foundErrObject?.Grade}</small>
                  ) : null}
                </Col>
                <Col md={2} className="mb-5 mb-xl-0">
                  <Label htmlFor="inputState" className="form-label">
                    Gender
                    <span required className="p-1">
                      *
                    </span>
                  </Label>

                  <select
                    id="inputState"
                    className="form-select"
                    name="Gender"
                    value={item.Gender}
                    onChange={(e) => handleChange(e, i)}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="OTHERS">Prefer not to mention</option>
                  </select>
                  {foundErrObject?.Gender ? (
                    <small className="error-cls">
                      {foundErrObject?.Gender}
                    </small>
                  ) : null}
                </Col>
              </Row>
            </div>
          );
        })}
        <Row>
          <Col className="mt-2 text-left">
            {!isClicked ? (
              <button
                type="submit"
                className="btn btn-warning text-left"
                onClick={handleSumbit}
                disabled={!button}
              >
                Submit
              </button>
            ) : (
              <button type="button" className="btn btn-warning text-right">
                Submit
              </button>
            )}
            {/* {studentData.length < 4 && (
                  <div className="">
                    <button
                      // label={"Add More"}
                      onClick={addItem}
                      // btnClass={
                      //   studentData.length != 3 ? "primary" : "default"
                      // }
                      // size="small"
                      disabled={studentData.length === 3}
                    >
                      Add More
                    </button>
                  </div>
                )} */}
          </Col>
          {/* <Col className="mt-2 text-right">
            <button
              type="button"
              className="btn btn-secondary m-2 ml-auto"
              onClick={() => navigate("/mentorteams")}
            >
              Discard
            </button>
          </Col> */}
          <Col className="mt-2 d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-secondary m-2"
              onClick={() => navigate("/mentorteams")}
            >
              Discard
            </button>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default CreateMultipleMembers;
