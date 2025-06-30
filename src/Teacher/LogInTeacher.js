/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import CryptoJS from "crypto-js";
import logo from "../assets/img/new-logo.png";
import email from "../assets/img/icons/mail.svg";
import { teacherLoginUser } from "../redux/actions";
import { connect } from "react-redux";
import { openNotificationWithIcon } from "../helpers/Utils";
import { useNavigate } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FiPlayCircle } from "react-icons/fi";

const LogInTeacher = (props) => {
  const navigate = useNavigate();

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const inputUserId = {
    type: "email",
    placeholder: "Please Enter Email Address",
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .required("Please Enter Your Email Address")
        .max(255)
        .trim(),
      password: Yup.string().required("Please Enter Your Password").trim(),
    }),
    // TEACHER ROLE
    onSubmit: (values) => {
      localStorage.clear();

      if (
        localStorage.getItem("current_user") &&
        localStorage.getItem("module")
      ) {
        openNotificationWithIcon(
          "error",
           "Clear your browser cache and try logging in"
         
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
        username: values.email.trim(),
        password: encrypted,
        role: "MENTOR",
      };
      props.teacherLoginUserAction(body, navigate, "MENTOR");
    },
  });
  const handleLogoClick = () => {
    navigate('/');
  };

  const renderTooltip = (props) => (
    <Tooltip id="pdf-tooltip" {...props}>
      Watch Demo
    </Tooltip>
  );

  return (
    <div className="main-wrapper">
      <div className="account-content">
        <div className="login-wrapper login-pass-wrap bg-img">
          <div className="login-content">
            <form onSubmit={formik.handleSubmit} action="index">
              <div className="login-userset">
                <div className="login-logo logo-normal" onClick={handleLogoClick}>
                  <img
                    src={logo}
                    alt="Logo"
                    // className="logo-image"
                  />
                 
                </div>
              
                <div className="login-userheading">
                  <h3> Teacher Login{" "}
                  <OverlayTrigger placement="top" overlay={renderTooltip}>
                        <a
                          href="https://www.youtube.com/watch?v=MIZcxs9pJuA"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                           <span
                                                                                      style={{ backgroundColor: "#1B2850",borderRadius:"2rem",padding:"5px 10px",fontSize:"14px" }}
                                                                                                    className="badge"
                                                                                    
                                                                                    >
                                                                                      <FiPlayCircle style={{ color: "#ffffff",fontSize:"large" }} /> <span style={{ color: "#ffffff",fontSize:"10px" }}>&nbsp;DEMO</span>
                                                                                    </span>
                        </a>
                      </OverlayTrigger>
                  </h3>
                  <h4>
                    Access the teacher panel using your registered email and
                    password.
                  </h4>
                </div>
                <div className="form-login mb-3">
                  <label className="form-label">Email Address</label>
                  <div className="form-addons">
                    <input
                      {...inputUserId}
                      id="email"
                      className="form- control"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <small className="error-cls" style={{ color: "red" }}>
                        {" "}
                        {formik.errors.email}
                      </small>
                    ) : null}
                   
                    <img src={email} alt="Email" />
                  </div>
                </div>
                <div className="form-login mb-3">
                  <label className="form-label">Password</label>
                  <div className="pass-group">
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      id="password"
                      placeholder="Please Enter Password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    <div
                      className={`fas toggle-password ${
                        isPasswordVisible ? "fa-eye" : "fa-eye-slash"
                      }`}
                      onClick={togglePasswordVisibility}
                    ></div>
                  </div>
                  {formik.touched.password && formik.errors.password ? (
                    <small className="error-cls" style={{ color: "red" }}>
                      {formik.errors.password}
                    </small>
                  ) : null}
                </div>
                <div className="form-login authentication-check">
                  <div className="row">
                    <div className="col-12 d-flex align-items-center justify-content-between">
                      <div className="custom-control custom-checkbox">
                        <label className="checkboxs ps-4 mb-0 pb-0 line-height-1">
                          <input type="checkbox" className="form-control" />
                          <span className="checkmarks" />
                          Remember me
                        </label>
                      </div>
                      <div className="text-end">
                        <Link className="forgot-link" to="/teacher-forgot-psw">
                          Forgot Password?
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-login">
                  <button
                    type="submit"
                    className={`btn btn-login ${
                      !(formik.dirty && formik.isValid) ? "default" : "primary"
                    }`}
                    disabled={!(formik.dirty && formik.isValid)}
                  >
                    Sign In
                  </button>
                </div>
                <div className="signinform">
                  <h4>
                    Not a Teacher ?
                    <Link className="hover-a" to={"/login"}>
                      {" "}
                      Click Here
                    </Link>
                  </h4>
                </div>

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = ({ teacher }) => {
  const { loading, error, currentUser } = teacher;
  return { loading, error, currentUser };
};

export default connect(mapStateToProps, {
  teacherLoginUserAction: teacherLoginUser,
})(LogInTeacher);
