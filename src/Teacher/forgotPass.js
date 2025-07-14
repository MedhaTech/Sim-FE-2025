/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/new-logo.png";
import email from "../assets/img/icons/mail.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { URL, KEY } from "../constants/defaultValues";
import { useNavigate } from "react-router-dom";
import { getNormalHeaders, openNotificationWithIcon } from "../helpers/Utils";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FiPlayCircle } from "react-icons/fi";

const Forgotpassword = () => {
  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email(
          <span style={{ color: "red" }}>Must be a valid Email Address</span>
        )
        .required(
          <span style={{ color: "red" }}>
            Please Enter Registered Email Address
          </span>
        )
        .max(255)
        .trim(),
    }),

    onSubmit: async (values) => {
      const axiosConfig = getNormalHeaders(KEY.User_API_Key);
      await axios
        .put(
          `${URL.putResetPassword}`,
          JSON.stringify(values, null, 2),
          axiosConfig
        )
        .then((checkOrgRes) => {
          if (checkOrgRes.status == 202) {
            openNotificationWithIcon(
              "success",
              "For registered users password reset link will be sent to registered email"
            );
            setTimeout(() => {
              navigate("/teacher");
            }, 2000);
            
          }
        })
        .catch((err) => {
          openNotificationWithIcon(
            "error",
            "For registered users password reset link will be sent to registered email"
          );
          return err.response;
        });
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
        <div className="login-wrapper forgot-pass-wrap bg-img">
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
                  <h3>Forgot your SIM password?{" "}
                  <OverlayTrigger placement="top" overlay={renderTooltip}>
                        <a
                          href="https://www.youtube.com/watch?v=D434mJUmGpk"
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
                 
                </div>
                <div className="form-login">
                  <label>Email</label>
                  <div className="form-addons">
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter Your Registered Email Address"
                      className="form- control mb-2"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <small className="error-cls">
                        {" "}
                        {formik.errors.email}
                      </small>
                    ) : null}
                    <img src={email} alt="Email" />
                  </div>
                </div>
               
                <div className="form-login">
                  <button
                    className={`btn btn-login ${
                      !(formik.dirty && formik.isValid) ? "default" : "primary"
                    }`}
                    disabled={!(formik.dirty && formik.isValid)}
                    type="submit"
                  >
                      Send Password
                  </button>
                </div>
                <div className="signinform text-center">
                  <h4>
                    Return to
                    <Link to="/teacher" className="hover-a">
                      {" "}
                      Login{" "}
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

export default Forgotpassword;
