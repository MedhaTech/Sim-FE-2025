/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
// import ImageWithBasePath from "../core/img/imagewithbasebath";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import CryptoJS from "crypto-js";
import logo from "../assets/img/new-logo.png";
import user from "../assets/img/icons/user-icon.svg";
import { teamloginUser } from "../redux/actions";
import { connect } from "react-redux";
import { openNotificationWithIcon } from "../helpers/Utils";
import { useNavigate } from "react-router-dom";

const LogInTeam = (props) => {
  const navigate = useNavigate();

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const inputUserId = {
    type: "text",
    placeholder: "Please Enter Team ID",
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
        // .email("Must be a valid email")
        .required("Please Enter Team Username")
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
        username: values.email.trim(),
        password: encrypted,
        // role: "TEAM",
      };
      props.teamLoginUserAction(body, navigate, "TEAM");
    },
  });

  return (
    <div className="main-wrapper">
      <div className="account-content">
        <div className="login-wrapper email-veri-wrap bg-img">
          <div className="login-content">
            <form onSubmit={formik.handleSubmit} action="index">
              <div className="login-userset">
                <div className="login-logo logo-normal">
                  <img
                    src={logo}
                    alt="Logo"
                    // className="logo-image"
                  />
                  {/* <ImageWithBasePath src="assets/img/logo.png" alt="img" /> */}
                </div>
                {/* <Link className="login-logo logo-white">
                  <ImageWithBasePath src="assets/img/logo-white.png" alt />
                </Link> */}
                <div className="login-userheading">
                  <h3> Team Login</h3>
                  {/* <h3>
                   Student Team Journey coming soon ...
                  </h3> */}
                  <h4>
                    Access the teacher panel using your Team ID and password.
                  </h4>
                </div>
                <div className="form-login mb-3">
                  <label className="form-label">Team ID</label>
                  <div className="form-addons">
                    <input
                      {...inputUserId}
                      name="email"
                      className="form- control"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <small className="error-cls">Required</small>
                    ) : null}
                   
                    <img src={user} alt="user" />
                  </div>
                </div>
                <div className="form-login mb-3">
                  <label className="form-label">Password</label>
                  <div className="pass-group">
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      id="password"
                      placeholder="Please Enter password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <small className="error-cls">Required</small>
                    ) : null}
                    <span
                      className={`fas toggle-password ${
                        isPasswordVisible ? "fa-eye" : "fa-eye-slash"
                      }`}
                      onClick={togglePasswordVisibility}
                    ></span>
                  </div>
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
                    Login In
                  </button>
                </div>
                <div className="signinform">
                  <h4>
                    Not a Team ?
                    <Link className="hover-a" to={"/login"}>
                      {" "}
                      Click Here
                    </Link>
                  </h4>
                </div> 
                {/* <div className="signinform">
                  <h4>
                    New on our platform?
                    <Link className="hover-a" to={"/registration"}>
                      {" "}
                      Create an account
                    </Link>
                  </h4>
                </div> */}
                {/* <div className="form-setlogin or-text">
                  <h4>OR</h4>
                </div>
                <div className="form-sociallink">
                  <ul className="d-flex">
                    <li>
                      <Link to="#" className="facebook-logo">
                        <ImageWithBasePath
                          src="assets/img/icons/facebook-logo.svg"
                          alt="Facebook"
                        />
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <ImageWithBasePath
                          src="assets/img/icons/google.png"
                          alt="Google"
                        />
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="apple-logo">
                        <ImageWithBasePath
                          src="assets/img/icons/apple-logo.svg"
                          alt="Apple"
                        />
                      </Link>
                    </li>
                  </ul>
                  <div className="my-4 d-flex justify-content-center align-items-center copyright-text">
                    <p>Copyright © 2023 DreamsPOS. All rights reserved</p>
                  </div>
                </div> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = ({ teamUser }) => {
  const { loading, error, currentUser } = teamUser;
  return { loading, error, currentUser };
};

export default connect(mapStateToProps, {
  teamLoginUserAction: teamloginUser,
})(LogInTeam);
