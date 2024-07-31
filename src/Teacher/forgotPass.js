/* eslint-disable indent */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/new-logo.png";
import email from "../assets/img/icons/mail.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { URL, KEY } from "../constants/defaultValues";

import { getNormalHeaders, openNotificationWithIcon } from "../helpers/Utils";

const Forgotpassword = () => {
  const [errorMsg, seterrorMsg] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email(
          <span style={{ color: "red" }}>Must be a valid email address</span>
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
              "Password sent to your registered email address"
            );
            seterrorMsg("");
          }
        })
        .catch((err) => {
          seterrorMsg(err.response.data.message);
          return err.response;
        });
    },
  });
  return (
    <div className="main-wrapper">
      <div className="account-content">
        <div className="login-wrapper forgot-pass-wrap bg-img">
          <div className="login-content">
            <form onSubmit={formik.handleSubmit} action="index">
              <div className="login-userset">
                <div className="login-logo logo-normal">
                  <img
                    src={logo}
                    alt="Logo"
                    // className="logo-image"
                  />
                </div>
                {/* <Link to={route.dashboard} className="login-logo logo-white">
                  <ImageWithBasePath src="assets/img/logo-white.png" alt />
                </Link> */}
                <div className="login-userheading">
                  <h3>Forgot your SIM password?</h3>
                  {/* <h4>
                    If you forgot your password, well, then we’ll email you
                    instructions to reset your password.
                  </h4> */}
                </div>
                <div className="form-login">
                  <label>Email</label>
                  <div className="form-addons">
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter Your Registered Email Address"
                      className="form- control"
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
                {errorMsg === "User not found" && (
                  <b className="text-danger m-3">
                    Please Enter Registered Email Address
                  </b>
                )}
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
