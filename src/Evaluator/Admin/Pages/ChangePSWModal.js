/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import { Row, Col, Form, Label } from "reactstrap";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

import CryptoJS from "crypto-js";

import { useFormik } from "formik";
import * as Yup from "yup";
import {
  getCurrentUser,
  openNotificationWithIcon,
} from "../../../helpers/Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import "sweetalert2/src/sweetalert2.scss";
import { useNavigate } from "react-router-dom";

const ChangePSWModal = () => {
  const currentUser = getCurrentUser("current_user");
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [error, SetError] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [responce, SetResponce] = useState("");
  const passwordRegex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object({
      oldPassword: Yup.string()
        .required(t("login.error_required"))
        .min(8, "Minimum 8 characters required"),
      newPassword: Yup.string()
        .required(t("login.error_required"))
        .min(8, "Minimum 8 characters required")
        .matches(
          passwordRegex,
          "Password must contains minimum 8 characters, including one letter, one number, and one special character."
        ),
      confirmPassword: Yup.string()
        .required(t("login.error_required"))
        .min(8, "Minimum 8 characters required")
        .matches(
          passwordRegex,
          "Password must contains minimum 8 characters, including one letter, one number, and one special character."
        ),
    }),

    onSubmit: async (values) => {
      if (values.newPassword.length < 8) {
        SetError(
          <span style={{ color: "red" }}>
            New Password must be 8-character minimum
          </span>
        );
      } else if (values.oldPassword === values.newPassword) {
        SetError(
          <span style={{ color: "red" }}>
            Old Password and New Password are same
          </span>
        );
      } else if (values.newPassword !== values.confirmPassword) {
        SetError(
          <span style={{ color: "red" }}>
            New Password and Confirm Password not same
          </span>
        );
      } else {
        const key = CryptoJS.enc.Hex.parse("253D3FB468A0E24677C28A624BE0F939");
        const iv = CryptoJS.enc.Hex.parse("00000000000000000000000000000000");
        const old1 = CryptoJS.AES.encrypt(values.oldPassword, key, {
          iv: iv,
          padding: CryptoJS.pad.NoPadding,
        }).toString();
        const new1 = CryptoJS.AES.encrypt(values.newPassword, key, {
          iv: iv,
          padding: CryptoJS.pad.NoPadding,
        }).toString();
        const body = JSON.stringify({
          user_id: JSON.stringify(currentUser?.data[0]?.user_id),
          old_password: old1,
          new_password: new1,
        });
        var config = {
          method: "put",
          url: process.env.REACT_APP_API_BASE_URL + "/admins/changePassword",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser?.data[0]?.token}`,
          },
          data: body,
        };
        console.warn("config", config);
        axios(config)
          .then(function (response) {
            if (response.status === 202) {
              SetResponce(response.data.message);
              openNotificationWithIcon("success", response?.data?.message);
              setTimeout(() => {
                navigate("/eadmin/evaluationStatus");
              }, 1000);
            }
          })
          .catch(function (error) {
            openNotificationWithIcon("error", error?.response?.data?.message);
            console.log(error);
          });
      }
    },
  });
  useEffect(() => {
    SetError("");
  }, [formik.values]);
  //----password fields initial state and hide show password
  const [oldPassType, setOldPassType] = useState("password");
  const [newPassType, setNewPassType] = useState("password");
  const [confirmPassType, setConfirmPassType] = useState("password");
  const [isOldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setNewPasswordVisible] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const oldPassword = {
    type: oldPassType,
    placeholder: t("changepswd.Enter_current_password_here"),
    className: "defaultInput",
  };

  const newPassword = {
    type: newPassType,
    placeholder: t("changepswd.Create_new_password_here"),
    className: "defaultInput",
  };

  const confirmPassword = {
    type: confirmPassType,
    placeholder: t("changepswd.Verify_New_password"),
    className: "defaultInput",
  };
 
  const handleShowPassword = (name) => {
    // here we can see the password //
    // here name = password //
    switch (name) {
        case oldPassword:
            name?.type === "password"
              ? (setOldPassType("text"), setOldPasswordVisible(true))
              : (setOldPassType("password"), setOldPasswordVisible(false));
            break;
          case newPassword:
            name?.type === "password"
              ? (setNewPassType("text"), setNewPasswordVisible(true))
              : (setNewPassType("password"), setNewPasswordVisible(false));
            break;
          case confirmPassword:
            name?.type === "password"
              ? (setConfirmPassType("text"), setPasswordVisible(true))
              : (setConfirmPassType("password"), setPasswordVisible(false));
            break;
    }
  };
  return (
    <div className="page-wrapper">
    <div className="content">
      <div className="login-wrapper reset-pass-wrap bg-img">
        <div className="login-content">
          <form action="success-3" onSubmit={formik.handleSubmit}>
            <div className="login-userset">
              <div className="login-userheading">
                <h3>Reset password?</h3>
                <h4>
                  A strong password helps prevent unauthorized access to your
                  account.
                </h4>
              </div>
              <div className="form-login mb-2">
                <label>Current Password</label>
                <div className="pass-group">
                  <input
                    className="pass-input"
                    {...oldPassword}
                    id="oldPassword"
                    name="oldPassword"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.oldPassword}
                  />
                  <div
                    className={`fas toggle-password ${
                      isOldPasswordVisible ? "fa-eye" : "fa-eye-slash"
                    }`}
                    onClick={() => {
                      handleShowPassword(oldPassword);
                    }}
                  ></div>
                </div>
                {formik.touched.oldPassword && formik.errors.oldPassword ? (
                  <small className="error-cls" style={{ color: "red" }}>
                    {formik.errors.oldPassword}
                  </small>
                ) : null}
              </div>
              <div className="form-login mb-2">
                <label>New Password</label>
                <div className="pass-group">
                  <input
                    className="pass-inputs"
                    {...newPassword}
                    id="newPassword"
                    name="newPassword"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.newPassword}
                  />
                  <div
                    className={`fas toggle-password ${
                      isNewPasswordVisible ? "fa-eye" : "fa-eye-slash"
                    }`}
                    onClick={() => {
                      handleShowPassword(newPassword);
                    }}
                  ></div>
                </div>
                <small className="mt-2" style={{ color: "red" }}>
                  8-character minimum; case sensitive
                </small>
                <br />
                {formik.touched.newPassword && formik.errors.newPassword ? (
                  <small className="error-cls" style={{ color: "red" }}>
                    {formik.errors.newPassword}
                  </small>
                ) : null}
              </div>
              <div className="form-login mb-2">
                <label> Confirm New Password</label>
                <div className="pass-group">
                  <input
                    className="pass-inputa"
                    {...confirmPassword}
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                  />
                  <div
                    className={`fas toggle-password ${
                      isPasswordVisible ? "fa-eye" : "fa-eye-slash"
                    }`}
                    onClick={() => {
                      handleShowPassword(confirmPassword);
                    }}
                  ></div>
                </div>
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <small className="error-cls" style={{ color: "red" }}>
                    {formik.errors.confirmPassword}
                  </small>
                ) : null}
              </div>
              <b style={{ color: "red" }}>{error}</b>
              <b style={{ color: "#3BB143" }}>{responce}</b>
              <div className="form-login">
                <button className="btn btn-login" type="submit">
                  Change Password{"  "} <FontAwesomeIcon icon={faKey} />
                </button>
              </div>
              <div className="signinform text-center">
                <h4>
                  <Link to={"/eadmin/evaluationStatus"} className="hover-a">
                    {" "}
                    Cancel{" "}
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

export default ChangePSWModal;
