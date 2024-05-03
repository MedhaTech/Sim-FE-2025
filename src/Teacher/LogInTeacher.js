/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useLayoutEffect, useState, useEffect } from "react";
import { Row, Col, Form, Label } from "reactstrap";
import { Link } from "react-router-dom";
import { InputBox } from "../stories/InputBox/InputBox";
import { Button } from "../stories/Button";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import logo from "../assets/media/UPSHIFT_BLACK.png";
import CryptoJS from "crypto-js";
import { openNotificationWithIcon } from "../helpers/Utils";
// import i18next from "i18next";

const LoginNew = (props) => {
  const history = useHistory();

  useLayoutEffect(() => {
    // i18next.changeLanguage("en");
    const moduleName = localStorage.getItem("module");
    const loginTime = localStorage.getItem("time");

    if (
      localStorage.getItem("current_user") &&
      localStorage.getItem("module")
    ) {
      moduleName === "MENTOR"
        ? history.push("/teacher/dashboard")
        : moduleName === "ADMIN"
        ? history.push("/admin/dashboard")
        : moduleName === "EVALUATOR"
        ? history.push("/evaluator/submitted-ideas")
        : moduleName === "EADMIN"
        ? history.push("/eadmin/dashboard")
        : history.push("/dashboard");
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      phone: "",
      password: "",
    },

    validationSchema: Yup.object({
      phone: Yup.string()
        .email("Must be a valid email")
        .required("required")
        .max(255)
        .trim(),
      password: Yup.string().required("Required password").trim(),
    }),
    // TEACHER ROLE
    onSubmit: (values) => {
      if (
        localStorage.getItem("current_user") &&
        localStorage.getItem("module")
      ) {
        openNotificationWithIcon(
          "error",
          `Another User(${localStorage.getItem(
            "module"
          )}) has already logged in`
        );
        return;
      }
      const key = CryptoJS.enc.Hex.parse("253D3FB468A0E24677C28A624BE0F939");
      const iv = CryptoJS.enc.Hex.parse("00000000000000000000000000000000");
      const encrypted = CryptoJS.AES.encrypt(values.password.trim(), key, {
        iv: iv,
        padding: CryptoJS.pad.NoPadding,
      }).toString();
      const body = {
        username: values.phone.trim(),
        password: encrypted,
        role: "MENTOR",
      };
      props.teacherLoginUserAction(body, history, "MENTOR");
    },
  });

  const inputUserId = {
    type: "mobile",
    placeholder: "Enter your Email Address",
  };

  const inputPassword = {
    placeholder: "Enter your password",
    showEyeIcon: true,
  };

  const logInBtn = {
    label: "Log in",
    size: "large",
  };

  return (
    <React.Fragment>
      <div
        className="container-fluid "
        style={{ margin: "2rem", padding: "2rem" }}
      >
        {/* <UsersPage /> */}
        <Row className="row-flex height-100">
          <Col xs={12} sm={12} md={8} xl={8}>
            <Row className="logo">
              <a href={process.env.REACT_APP_LANDING_PAGE_URL}>
                <Col
                  md={12}
                  className="d-flex justify-content-center align-items-center"
                >
                  <img src={logo} alt="Logo" className="logo-image" />
                </Col>
              </a>
            </Row>
            <Row className="login-options">
              <Col md={12} className="text-right"></Col>
            </Row>
            <Row className=" article-header mb-4">
              <div className="d-flex mt-4 login-div justify-content-center align-items-center">
                <Link
                  className="landing-page-actions "
                  exact="true"
                  to="/teacher"
                >
                  <button className="storybook-button storybook-button--small storybook-button--loginBtn active">
                    {/* <img
                      src={teacherIcon}
                      alt="login icon"
                      className="img-fluid"
                    />{" "} */}
                    Teacher Login
                  </button>
                </Link>
                <Link className="landing-page-actions" exact="true" to="/login">
                  <button className="storybook-button storybook-button--small storybook-button--loginBtn ">
                    {/* <img
                      src={studentIcon}
                      alt="login icon"
                      className="img-fluid"
                    />{" "} */}
                    Student Login
                  </button>
                </Link>
              </div>
            </Row>

            <Row className="my-2">
              <Col md={12}>
                <Form onSubmit={formik.handleSubmit}>
                  <div className="form-row row mb-5">
                    <Col className="form-group" xs={12} sm={12} md={12} xl={12}>
                      <Label className="mb-2" htmlFor="phone">
                        Email Address
                      </Label>
                      <InputBox
                        {...inputUserId}
                        id="phone"
                        name="phone"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone}
                        keyboardType="numberFormat"
                      />

                      {formik.touched.phone && formik.errors.phone ? (
                        <small className="error-cls">
                          {formik.errors.phone}
                        </small>
                      ) : null}
                    </Col>
                  </div>
                  <div className="w-100 clearfix" />

                  <div className="form-row row mb-5">
                    <Col className="form-group" xs={12} sm={12} md={12} xl={12}>
                      <Label className="mb-2" htmlFor="Password">
                        Password
                      </Label>
                      <InputBox
                        {...inputPassword}
                        type="password"
                        id="password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                      />

                      {formik.touched.password && formik.errors.password ? (
                        <small className="error-cls">
                          {formik.errors.password}
                        </small>
                      ) : null}
                    </Col>

                    <div className="form-group">
                      <Row className="keepme_login">
                        <Col className="forgotp d-flex ">
                          <div className="text-link pt-1 text-primary">
                            <Link
                              exact="true"
                              to="/teacher/forgotpassword"
                              className="text-link pt-1"
                            >
                              Forgot password
                            </Link>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>

                  <div className="form-row row mb-5">
                    <Col className="form-group" xs={12} sm={12} md={12} xl={12}>
                      <Button
                        {...logInBtn}
                        type="submit"
                        btnClass={
                          !(formik.dirty && formik.isValid)
                            ? "default"
                            : "primary"
                        }
                        disabled={!(formik.dirty && formik.isValid)}
                        style={{
                          borderRadius: "0",
                          width: "7rem",
                          margin: "2rem",
                        }}
                      />
                    </Col>
                  </div>
                  <div className="form-row row mb-5">
                    <Link
                      to={"/registration"}
                      exact
                      className="w-100 d-block text-center"
                    >
                      <strong>Click Here To Register</strong>
                    </Link>
                  </div>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default LoginNew;
