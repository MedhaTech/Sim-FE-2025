/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  getCurrentUser,
  setCurrentUser,
  openNotificationWithIcon,
} from "../helpers/Utils";
// import customer from "../assets/img/customer/customer5.jpg";
import { useLocation } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { encryptGlobal } from "../constants/encryptDecrypt";
import { useNavigate } from "react-router-dom";
import female from "../assets/img/Female_Profile.png";
import male from "../assets/img/Male_Profile.png";
const TeacherEditProfile = () => {
  const location = useLocation();
  const mentorData = location.state || {};
  const navigate = useNavigate();

  const currentUser = getCurrentUser("current_user");
  const getValidationSchema = () => {
    // where data = mentorData //
    const adminValidation = Yup.object({
      //   whatapp_mobile: Yup.string()
      //     .required("required")
      //     .trim()
      //     .matches(/^\d+$/, "Mobile number is not valid (Enter only digits)")
      //     .min(10, "Please enter valid number")
      //     .max(10, "Please enter valid number"),
      //   gender: Yup.string().required("Please select valid gender"),
      title: Yup.string().required(
        <span style={{ color: "red" }}>Please select Title</span>
      ),
      full_name: Yup.string()
        // .matches(/^[A-Za-z]*$/, 'Invalid name ')
        // .min(2, 'Enter a valid name')
        // .required('Name is Required'),
        .trim()
        .min(2, <span style={{ color: "red" }}>Please Enter Full Name</span>)
        .matches(/^[aA-zZ\s]+$/, "Special Characters are not allowed")
        .required(<span style={{ color: "red" }}>Please Enter Full Name</span>),
      //   phone: Yup.string()
      //     .trim()
      //     .matches(/^\d+$/, "Mobile number is not valid (Enter only digits)")
      //     .min(10, "Enter a valid mobile number")
      //     .max(10, "Mobile number must be 10 Digit")
      //     .required("Mobile Number is Required"),
    });
    return adminValidation;
  };
  const getInitialValues = (mentorData) => {
    const commonInitialValues = {
      full_name: mentorData?.full_name,

      //   email: mentorData.name,
      title: mentorData.title,
      //   whatapp_mobile: mentorData.whatapp_mobile,
      //   gender: mentorData.gender,
    };
    return commonInitialValues;
  };
  const formik = useFormik({
    initialValues: getInitialValues(mentorData),
    validationSchema: getValidationSchema(),
    onSubmit: (values) => {
      const full_name = values.full_name;
      // const mobile = values.phone;
      const title = values.title;
      //   const whatapp_mobile = values.whatapp_mobile;
      //   const gender = values.gender;
      //   const mobile = values.phone;
      const body = JSON.stringify({
        full_name: full_name,
        // mobile: mobile,
        title: title,
        // whatapp_mobile: whatapp_mobile,
        // gender: gender,
        // mobile: mobile,
        username: mentorData.username,
      });
      const ment = encryptGlobal(JSON.stringify(mentorData.mentor_id));
      const url = process.env.REACT_APP_API_BASE_URL + "/mentors/" + ment;
      var config = {
        method: "put",
        url: url,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser?.data[0]?.token}`,
        },
        data: body,
      };
      axios(config)
        .then(function (response) {
          if (response.status === 200) {
            openNotificationWithIcon("success", "Updated Successfully");
            currentUser.data[0].full_name = values.full_name;
            currentUser.data[0].title = values.title;

            setCurrentUser(currentUser);
            setTimeout(() => {
              navigate("/mentorprofile");
            }, 2000);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  });

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Teacher Edit Profile</h4>
            <h6>User Profile</h6>
          </div>
        </div>
        {/* /product list */}
        <form onSubmit={formik.handleSubmit}>
          <div className="card">
            <div className="card-body">
              <div className="profile-set">
                <div className="profile-head"></div>
                <div className="profile-top">
                  <div className="profile-content">
                    <div className="profile-contentimg">
                      {currentUser?.data[0]?.gender === "Male" ? (
                        <img src={male} alt="Male" id="blah" />
                      ) : (
                        <img src={female} alt="Female" id="blah" />
                      )}
                    </div>
                    <div className="profile-contentname">
                      <h2>
                        {currentUser?.data[0]?.title +
                          "." +
                          currentUser?.data[0]?.full_name}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="form-login col-lg-6 col-sm-12">
                  <div className="input-blocks">
                    <label>Title</label>
                    <select
                      id="inputState"
                      className="form-select"
                      name="title"
                      value={formik.values.title}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    >
                      <option value="">Title</option>
                      <option value="Dr">Dr</option>
                      <option value="Mr">Mr</option>
                      <option value="Miss">Miss</option>
                      <option value="Mrs">Mrs</option>
                    </select>
                    {formik.touched.title && formik.errors.title ? (
                      <small className="error-cls">{formik.errors.title}</small>
                    ) : null}
                  </div>
                </div>
                <div className="form-login col-lg-6 col-sm-12">
                  <div className="input-blocks">
                    <label className="form-label">Teacher Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="full_name"
                      name="full_name"
                      // onChange={formik.handleChange}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        const lettersOnly = inputValue.replace(
                          /[^a-zA-Z\s]/g,
                          ""
                        );
                        formik.setFieldValue("full_name", lettersOnly);
                      }}
                      onBlur={formik.handleBlur}
                      value={formik.values.full_name}
                    />
                    {formik.touched.full_name && formik.errors.full_name ? (
                      <small className="error-cls">
                        {formik.errors.full_name}
                      </small>
                    ) : null}
                  </div>
                </div>

                <div className="form-login">
                  <button
                    style={{ marginRight: "10px" }}
                    type="submit"
                    className={`btn btn-warning  ${
                      !(formik.dirty && formik.isValid) ? "default" : "primary"
                    }`}
                    disabled={!(formik.dirty && formik.isValid)}
                  >
                    Submit
                  </button>
                  <Link className="btn btn-cancel" to={"/mentorprofile"}>
                    Cancel
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
        {/* /product list */}
      </div>
    </div>
  );
};

export default TeacherEditProfile;
