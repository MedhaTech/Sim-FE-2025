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
        .required(<span style={{ color: "red" }}>{t('teacherJourney.vali3')}</span>)
        .max(40)
        .matches(
          /^[A-Za-z0-9\s]*$/,
          t('teacherJourney.vali24')
        )
        .trim(),
      age: Yup.number()
        .integer()
        .min(10,  t('teacherJourney.vali21'))
        .max(18, t('teacherJourney.vali22'))
        .required(<span style={{ color: "red" }}>{t('teacherJourney.vali17')}</span>),
      gender: Yup.string().required(
        <span style={{ color: "red" }}>{t('teacherJourney.vali18')}</span>
      ),
      email: Yup.string().email(t('teacherJourney.vali13')).max(255)
      .optional(),
      disability: Yup.string().required(
        <span style={{ color: "red" }}>{t('teacherJourney.vali19')}</span>
      ),
      grade: Yup.string()
        .max(40)
        .required(<span style={{ color: "red" }}>{t('teacherJourney.vali20')}</span>),
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
              t('teacherJourney.popup1'),
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
                              className="form-control mb-2"
                              placeholder={t('teacherJourney.place1')}
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
                             
                            </Label>
                            <input
                              className="form-control mb-2"
                              placeholder={t('teacherJourney.place2')}
                              id="email"
                              name="email"
                             
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
                              className="form-select mb-2"
                              name="disability"
                              value={formik.values.disability}
                              onChange={formik.handleChange}
                            >
                              <option value="">{t('teacherJourney.place3')}</option>
                              <option value="No">{t('teacherJourney.option4')}</option>
                              <option value="Physically Challenged">
                                {t('teacherJourney.option5')}
                              </option>
                              <option value="Visually Challenged">
                                {t('teacherJourney.option6')}
                              </option>
                              <option value="Locomotor Disability">
                                {t('teacherJourney.option7')}
                              </option>
                              <option value="Intellectual Disability">
                                {t('teacherJourney.option8')}
                              </option>
                              <option value="Learning Disability">
                                {t('teacherJourney.option9')}
                              </option>
                              <option value="Hearing Impaired">
                                {t('teacherJourney.option10')}
                              </option>
                              <option value="Autism or Cerebral Palsy or Other">
                                {t('teacherJourney.option11')}
                              </option>
                              <option value="Others">{t('teacherJourney.option12')}</option>
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
                              className="form-select mb-2"
                              name="age"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.age}
                            >
                              <option value={""}>{t('teacherJourney.place4')}</option>
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
                              className="form-select mb-2"
                              name="grade"
                              value={formik.values.grade}
                              onChange={formik.handleChange}
                            >
                              <option value="">{t('teacherJourney.place5')}..</option>
                              <option value="6">{t('teacherJourney.vali26')} 6</option>
                              <option value="7">{t('teacherJourney.vali26')} 7</option>
                              <option value="8">{t('teacherJourney.vali26')} 8</option>
                              <option value="9">{t('teacherJourney.vali26')} 9</option>
                              <option value="10">{t('teacherJourney.vali26')} 10</option>
                              <option value="11">{t('teacherJourney.vali26')} 11</option>
                              <option value="12">{t('teacherJourney.vali26')} 12</option>
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
                              className="form-select mb-2"
                              id="inputState"
                              value={formik.values.gender}
                              onChange={formik.handleChange}
                            >
                              <option value="">{t('teacherJourney.place6')}</option>
                              <option value="Male">{t('teacherJourney.option1')}</option>
                              <option value="Female">{t('teacherJourney.option2')}</option>
                              <option value="Prefer Not to Mention">
                                {t('teacherJourney.option3')}
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
