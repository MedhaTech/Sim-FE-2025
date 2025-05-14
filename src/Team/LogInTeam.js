/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
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
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import play from "../assets/img/playicon.png";
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
        .required("Please Enter Your Team Id")
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
           "Clear your browser cache and try logging in"
         
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
      };
      props.teamLoginUserAction(body, navigate, "TEAM");
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
        <div className="login-wrapper email-veri-wrap bg-img">
          <div className="login-content">
            <form onSubmit={formik.handleSubmit} action="index">
              <div className="login-userset">
                <div className="login-logo logo-normal" onClick={handleLogoClick}>
                  <img
                    src={logo}
                    alt="Logo"
                  />
                  
                </div>
               
                <div className="login-userheading">
                  <h3> Team Login{" "}
                  <OverlayTrigger placement="top" overlay={renderTooltip}>
                        <a
                          href="https://youtu.be/WxafskPsMog"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={play}
                            className="icon"
                            alt="play"
                            style={{ verticalAlign: "middle", width: "7%" }}
                          />
                        </a>
                      </OverlayTrigger>
                  </h3>
                 
                  <h4>
                    Access the Team panel using your Team ID and password.
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
                      <small className="error-cls" style={{ color: "red" }}>{formik.errors.email}</small>
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
                      <small className="error-cls" style={{ color: "red" }}>{formik.errors.password}</small>
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
                    Not a Team ?
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
const mapStateToProps = ({ teamUser }) => {
  const { loading, error, currentUser } = teamUser;
  return { loading, error, currentUser };
};

export default connect(mapStateToProps, {
  teamLoginUserAction: teamloginUser,
})(LogInTeam);
