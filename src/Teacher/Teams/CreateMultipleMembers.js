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
import { teamLength } from "../../RegPage/ORGData";
import { useTranslation } from "react-i18next";

const studentBody = {
  full_name: "",
  Age: "",
  Grade: "",
  Gender: "",
  disability: "",
  email: "",
};

const grades = [6, 7, 8, 9, 10, 11, 12];
const allowedAge = [10, 11, 12, 13, 14, 15, 16, 17, 18];

const CreateMultipleMembers = ({ id, teamLengthValue }) => {
  const { t } = useTranslation();
  const [teamId, setTeamId] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const tempStudentData = {
    team_id: teamId,
    role: "STUDENT",
    full_name: "",
    Age: "",
    Grade: "",
    Gender: "",
    disability: "",
    // email: "",
  };
  const dispatch = useDispatch();
  const [itemDataErrors, setItemDataErrors] = useState([studentBody]);
  const currentUser = getCurrentUser("current_user");
  const loginState = currentUser?.data[0]?.state;
  const getTeamLength = (loginState) => {
    if (loginState === "Tamil Nadu") {
      return teamLength["Tamil Nadu"];
    } else {
      return teamLength.default;
    }
  };

  const navigate = useNavigate();

  const [isClicked, setIsClicked] = useState(false);
  const [teamname, setTeamname] = useState("");
  const [teamemail, setTeamemail] = useState("");

  const [teamNameError, setTeamNameError] = useState("");

  const handleteamname = (e) => {
    const inputValue = e.target.value;
    const patternOnlyalfa = /^[a-zA-Z0-9\s]*$/;
    setTeamname(inputValue);

    if (inputValue.trim().length < 1) {
      setTeamNameError(t('teacherJourney.vali23'));
    } else if (!patternOnlyalfa.test(inputValue)) {
      setTeamNameError(t('teacherJourney.vali24'));
    } else {
      setTeamNameError("");
    }
  };

  const [emailError, setEmailError] = useState("");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const handleteamemail = (e) => {
    const numericValue = e.target.value;
    const trimmedValue = numericValue.trim();
    setTeamemail(trimmedValue);

    if (trimmedValue && !emailPattern.test(trimmedValue)) {
      setEmailError(t('teacherJourney.vali13'));
    } else {
      setEmailError("");
    }
  };
  const numberOfFields = getTeamLength(loginState);
  const initialStudentData = Array.from({ length: numberOfFields }, () => ({
    team_id: teamId,
    role: "STUDENT",
    full_name: "",
    Age: "",
    Grade: "",
    Gender: "",
    // email: "",
    disability: "",
  }));
  const MIN_STUDENTS = loginState === "Tamil Nadu" ? 2 : 2;
  const MAX_STUDENTS = loginState === "Tamil Nadu" ? 5 : 2;
  // Initialize state with the calculated initialStudentData
  const [studentData, setStudentData] = useState(initialStudentData);
  useEffect(() => {
    const updatedStudentData = Array.from({ length: numberOfFields }, () => ({
      team_id: teamId,
      role: "STUDENT",
      full_name: "",
      Age: "",
      Grade: "",
      Gender: "",
      // email: "",
      disability: "",
    }));
    setStudentData(updatedStudentData);
  }, [loginState, numberOfFields, teamId]);

  let pattern = /^[A-Za-z\s]+$/;
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
                // foo[e.target.name] = "Only alphanumeric characters are allowed";
                foo[e.target.name] =  t('teacherJourney.vali4');

                errCopy[i] = { ...foo };
                setItemDataErrors(errCopy);
                return;
              }
            }
          }
          if (item === "email") {
            let check = e.target.value;
            if (check && check.match(emailRegex)) {
              const { index } = check.match(emailRegex);
              if (index) {
                const foo = { ...errCopy[i] };
                // foo[e.target.name] = "Enter Valid Email Address";
                foo[e.target.name] = t('teacherJourney.vali13');

                errCopy[i] = { ...foo };
                setItemDataErrors(errCopy);
                return;
              }
            }
          }
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
      if (!item.full_name.trim()) {
        err["full_name"] = (
          <span style={{ color: "red" }}>{t('teacherJourney.vali3')}</span>
        );
      } else if (!/^[A-Za-z\s]+$/i.test(item.full_name)) {
        err["full_name"] = (
          <span style={{ color: "red" }}>
            {t('teacherJourney.vali25')}
          </span>
        );
      }

      const emailRegex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
      // if (item.email && item.email.trim() !== "") {
      //   if (!emailRegex.test(item.email)) {
      //     err["email"] = (
      //       <span style={{ color: "red" }}>{t('teacherJourney.vali13')}</span>
      //     );
      //   }
      // }
      if (!item.Age)
        err["Age"] = <span style={{ color: "red" }}>{t('teacherJourney.vali17')}</span>;

      if (!item.disability)
        err["disability"] = (
          <span style={{ color: "red" }}>{t('teacherJourney.vali19')}</span>
        );
      if (!item.Grade)
        err["Grade"] = (
          <span style={{ color: "red" }}>{t('teacherJourney.vali20')}</span>
        );
      if (!item.Gender)
        err["Gender"] = (
          <span style={{ color: "red" }}>{t('teacherJourney.vali18')}</span>
        );
      if (Object.values(err).length === 0) {
        return { ...studentBody, i };
      }
      return { ...err, i };
    });
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
    if (!validateItemData()) return;
    //setIsClicked(true);
    const checkDuplicateName = containsDuplicates(
      studentData.map((item) => item.full_name)
    );
    if (checkDuplicateName) {
      openNotificationWithIcon("error", t("teacherJourney.popup3"));
      setIsClicked(false);
      return;
    }
    const body = {
      mentor_id: JSON.stringify(currentUser?.data[0]?.mentor_id),
      team_name: teamname,
      team_email: teamemail ? teamemail : "",
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
          const newTeamId = response.data.data[0].profile.team_id;
          setTeamId(response.data.data[0].profile.team_id);
          openNotificationWithIcon("success", t("teacherJourney.popup2"));
          setIsClicked(true);

          const updatedStudentData = studentData.map((student) => {
            let updatedStudent = {
              ...student,
              team_id: JSON.stringify(newTeamId),
              state: currentUser?.data[0]?.state,
            };

            // if (student.email && student.email.trim() !== "") {
            //   updatedStudent.email = student.email;
            // }

            return updatedStudent;
          });

          setTimeout(() => {
            dispatch(
              teacherCreateMultipleStudent(
                updatedStudentData,
                navigate,
                setIsClicked,
                t
              )
            );
          }, 2000);
        } else {
          openNotificationWithIcon("error", "Opps! Something Wrong");
        }
      })
      .catch(function (error) {
        if (error.response.data.status === 400) {
          openNotificationWithIcon("error", t("teacherJourney.popup4"));
        }
      });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email ? emailRegex.test(email) : true;
  };

  const button = teamname && studentData && isValidEmail(teamemail);

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="add-item d-flex">
          <div className="page-title">
            <h4>{t("teacherJourney.addstudentheading")}</h4>
            <h6>{t("teacherJourney.subheading")}</h6>
          </div>
        </div>
        <ul className="table-top-head">
          <li>
            <div className="page-btn">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/mentorteams")}
              >
                <i className="fas fa-arrow-left"></i>{" "}
                {t("teacherJourney.backtoteams")}
              </button>
            </div>
          </li>
        </ul>
      </div>

      <div className="card">
        <div className="card-body pb-0">
          <div className="card-title-head">
            <h6>{t("teacherJourney.teamdetails")}</h6>
          </div>
          <Row className="mb-3 modal-body-table search-modal-header">
            <Col md={6}>
              <Label className="form-label">
                {t("teacherJourney.tname")}
                <span required className="p-1">
                  *
                </span>
              </Label>
              <input
                className="form-control mb-2"
                placeholder={t("teacherJourney.place7")}
                id="teamname"
                name="teamname"
                onChange={(e) => handleteamname(e)}
                value={teamname}
              />
              {teamNameError && (
                <span style={{ color: "red" }}>{teamNameError}</span>
              )}
            </Col>
            <Col md={6} className="mb-xl-0">
              <Label className="form-label">{t("teacherJourney.temail")}</Label>
              <input
                className="form-control mb-2"
                placeholder={t("teacherJourney.place2")}
                id="teamemail"
                name="teamemail"
                type="email"
                onChange={(e) => handleteamemail(e)}
                value={teamemail}
              />
              {emailError && <span style={{ color: "red" }}>{emailError}</span>}
            </Col>
          </Row>
          <div className="card-title-head">
            <h6> {t("teacherJourney.addteamdetails")}</h6>
          </div>
          {studentData.map((item, i) => {
            const foundErrObject = { ...itemDataErrors[i] };

            const showRemoveButton =
              (loginState === "Tamil Nadu" &&
                studentData.length > MIN_STUDENTS &&
                i >= MIN_STUDENTS) ||
              (loginState !== "Tamil Nadu" &&
                studentData.length > MIN_STUDENTS &&
                i >= MIN_STUDENTS);
            return (
              <div key={i} className="mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="mt-2 mb-2">
                    {t("teacherJourney.addteamdetails2")} {i + 1}{" "}
                    {t("teacherJourney.addteamdetails1")}
                  </h6>
                  {showRemoveButton && (
                    <button
                      onClick={() => removeItem(i)}
                      className="btn btn-sm btn-square btn-soft-danger"
                    >
                      <i className="fa-solid fa-xmark"></i>{" "}
                      {t("teacherJourney.remove")}
                    </button>
                  )}
                </div>
                {/* <hr /> */}
                <Row className="mb-3 modal-body-table search-modal-header">
                  {/* <Row> */}
                  <Col md={6}>
                    <Label className="form-label">
                      {t("teacherJourney.tfullname")}
                      <span required className="p-1">
                        *
                      </span>
                    </Label>
                    <input
                      className="form-control mb-2"
                      placeholder={t("teacherJourney.place1")}
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

                  {/* <Col md={4} className="mb-xl-0">
                    <Label className="form-label">
                      {t("teacherJourney.eamil1")}
                    </Label>
                    <input
                      className="form-control mb-2"
                      placeholder={t("teacherJourney.place2")}
                      id="email"
                      name="email"
                      onChange={(e) => {
                        handleChange(e, i);
                      }}
                      value={item.email}
                    />
                    {foundErrObject?.email ? (
                      <small className="error-cls">
                        {foundErrObject.email}
                      </small>
                    ) : null}
                  </Col> */}
                  {/* </Row> */}
                  <Col md={6} className="mb-xl-0">
                    <Label htmlFor="inputState" className="form-label">
                      {t("teacherJourney.disability")}
                      <span required className="p-1">
                        *
                      </span>
                    </Label>
                    <select
                      id="inputState"
                      className="form-select mb-2"
                      name="disability"
                      value={item.disability}
                      onChange={(e) => handleChange(e, i)}
                    >
                      <option value="">{t("teacherJourney.place3")}</option>
                      <option value="No">{t("teacherJourney.option4")}</option>
                      <option value="Physically Challenged">
                        {t("teacherJourney.option5")}
                      </option>
                      <option value="Visually Challenged">
                        {t("teacherJourney.option6")}
                      </option>
                      <option value="Locomotor Disability">
                        {t("teacherJourney.option7")}
                      </option>
                      <option value="Intellectual Disability">
                        {t("teacherJourney.option8")}
                      </option>
                      <option value="Learning Disability">
                        {t("teacherJourney.option9")}
                      </option>
                      <option value="Hearing Impaired">
                        {t("teacherJourney.option10")}
                      </option>
                      <option value="Autism or Cerebral Palsy or Other">
                        {t("teacherJourney.option11")}
                      </option>
                      <option value="Others">
                        {t("teacherJourney.option12")}
                      </option>
                    </select>
                    {foundErrObject?.disability ? (
                      <small className="error-cls">
                        {foundErrObject.disability}
                      </small>
                    ) : null}
                  </Col>
                  <Col md={4} className="mb-xl-0">
                    <Label htmlFor="inputState" className="form-label">
                      {t("teacherJourney.age")}
                      <span required className="p-1">
                        *
                      </span>
                    </Label>
                    <select
                      id="inputState"
                      className="form-select mb-2"
                      name="Age"
                      value={item.Age}
                      onChange={(e) => handleChange(e, i)}
                    >
                      <option value={""}>{t("teacherJourney.place4")}</option>
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

                  <Col md={4}>
                    <Label htmlFor="inputState" className="form-label">
                      {t("teacherJourney.class")}
                      <span required className="p-1">
                        *
                      </span>
                    </Label>
                    <select
                      id="inputState"
                      className="form-select mb-2"
                      name="Grade"
                      value={item.Grade}
                      onChange={(e) => handleChange(e, i)}
                    >
                      <option value="">
                        {t("teacherJourney.place5")}..
                      </option>
                      {grades.map((item) => (
                        <option key={item} value={item}>
                          {t("teacherJourney.vali26")} {item}
                        </option>
                      ))}
                    </select>
                    {foundErrObject?.Grade ? (
                      <small className="error-cls">
                        {foundErrObject?.Grade}
                      </small>
                    ) : null}
                  </Col>
                  <Col md={4} className="mb-5 mb-xl-0">
                    <Label htmlFor="inputState" className="form-label">
                      {t("teacherJourney.gender")}
                      <span required className="p-1">
                        *
                      </span>
                    </Label>

                    <select
                      id="inputState"
                      className="form-select mb-2"
                      name="Gender"
                      value={item.Gender}
                      onChange={(e) => handleChange(e, i)}
                    >
                      <option value="">{t("teacherJourney.place6")}</option>
                      <option value="Male">
                        {t("teacherJourney.option1")}
                      </option>
                      <option value="Female">
                        {t("teacherJourney.option2")}
                      </option>
                      <option value="Prefer Not to Mention">
                        {t("teacherJourney.option3")}
                      </option>
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
        </div>
      </div>

      <Row>
        <Col className="mt-2 text-left">
          {!isClicked ? (
            <button
              type="submit"
              className="btn btn-warning text-left"
              onClick={handleSumbit}
              disabled={!button}
            >
              {t("teacherJourney.createteam")}
            </button>
          ) : (
            <button type="button" className="btn btn-warning text-right">
              {t("teacherJourney.createteam")}
            </button>
          )}
        </Col>

        <Col className="mt-2 d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-secondary "
            onClick={() => navigate("/mentorteams")}
          >
            {t("teacherJourney.discard")}
          </button>
        </Col>
      </Row>
    </div>
  );
};
export default CreateMultipleMembers;
