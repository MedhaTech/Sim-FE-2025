/* eslint-disable indent */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import ImageWithBasePath from "../core/img/imagewithbasebath";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import Select from "./Select";
import * as Yup from "yup";
import CryptoJS from "crypto-js";

import { useDispatch, useSelector } from "react-redux";

import {
  getStateData,
  getFetchDistData,
} from "../redux/studentRegistration/actions";
import { decryptGlobal, encryptGlobal } from "../constants/encryptDecrypt";
import OtpInput from "react-otp-input-rc-17";
import logo from "../assets/img/logo.png";

const NonAtlPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [diceBtn, setDiceBtn] = useState(true);
  const [diesCode, setDiesCode] = useState("");
  const [orgData, setOrgData] = useState({});
  const [error, setError] = useState("");
  const [btn, setBtn] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [stateData, setStateData] = React.useState("");
  const [district, setdistrict] = React.useState("");
  const [pinCode, setPinCode] = useState("");
  const [schoolname, setSchoolname] = useState("");
  const [newDistrict, setnewDistrict] = useState("");
  const [textData, setTextData] = useState("");
  const [fullStatesNames, setFullStatesNames] = useState([]);
  const [fullDistrictsNames, setFullDistrictsNames] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [schoolBtn, setSchoolBtn] = useState(false);
  const [checkBox, setCheckBox] = useState(false);
  const [change, setChange] = useState("Send OTP");
  const [areInputsDisabled, setAreInputsDisabled] = useState(false);
  const [disable, setDisable] = useState(false);
  const [timer, setTimer] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const [btnOtp, setBtnOtp] = useState(false);
  const [otpRes, setOtpRes] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);
  const [mentorData, setMentorData] = useState({});
  const [wtsNum, setWtsNum] = useState("");

  // const fullStatesNames = useSelector(
  //   (state) => state?.studentRegistration?.regstate
  // );

  // useEffect(() => {
  //   dispatch(getStateData());
  // }, []);

  // useEffect(() => {
  //   if (stateData !== "") {
  //     dispatch(getFetchDistData(stateData));
  //   }
  //   setdistrict("");
  // }, [stateData]);
  // const fiterDistData = useSelector(
  //   (state) => state?.studentRegistration?.fetchdist
  // );
  useEffect(() => {
    stateApi();
  }, []);
  const stateApi = () => {
    var config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + `/organizations/states`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "O10ZPA0jZS38wP7cO9EhI3jaDf24WmKX62nWw870",
      },
    };
    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          setFullStatesNames(response.data.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    if (stateData !== "") {
      districtApi(stateData);
    }
    setdistrict("");
  }, [stateData]);
  const districtApi = (item) => {
    const distParam = encryptGlobal(
      JSON.stringify({
        state: item,
      })
    );

    var config = {
      method: "get",
      url:
        process.env.REACT_APP_API_BASE_URL +
        `/organizations/districts?Data=${distParam}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "O10ZPA0jZS38wP7cO9EhI3jaDf24WmKX62nWw870",
      },
    };
    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          setFullDistrictsNames(response.data.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleOnChange = (e) => {
    const numericValue = e.target.value.replace(/\D/g, "");
    const trimmedValue = numericValue.trim();

    setDiesCode(trimmedValue);

    if (trimmedValue.length === 11) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }

    setOrgData();
    setError("");
  };

  const handleRegister = (e) => {
    const body = JSON.stringify({
      organization_code: diesCode,
    });

    var config = {
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/organizations/checkOrg",
      headers: {
        "Content-Type": "application/json",
        Authorization: "O10ZPA0jZS38wP7cO9EhI3jaDf24WmKX62nWw870",
      },
      data: body,
    };
    axios(config)
      .then(function (response) {
        if (response?.status == 200) {
          setError("Another Teacher is already registered in given School");
          setDiceBtn(true);
          setBtn(false);
        }
      })
      .catch(function (error) {
        if (error?.response?.data?.status === 404) {
          setBtn(true);
          setDiceBtn(false);
        }
      });

    e.preventDefault();
  };

  const handlePincode = (e) => {
    const numericValue = e.target.value.replace(/\D/g, "");
    const trimmedValue = numericValue.trim();

    setPinCode(trimmedValue);
  };
  const handleOnChangeSchool = (e) => {
    let inputValue = e.target.value;
    inputValue = inputValue.replace(/[^a-zA-Z\s]/g, "").slice(0, 40);
    setSchoolname(inputValue);
  };
  const handleOnChangeNewDistrict = (e) => {
    const inputValue = e.target.value;
    const isValidInput = /^[a-zA-Z\s]+$/.test(inputValue) || inputValue === "";
    if (isValidInput) {
      setnewDistrict(e.target.value);
    }
  };
  const handleOnChangeAddress = (e) => {
    const inputValues = e.target.value;
    const isValidInputs =
      /^[a-zA-Z0-9\s\-/_]+$/.test(inputValues) || inputValues === "";
    if (isValidInputs) {
      setTextData(inputValues);
    }
  };
  localStorage.setItem("mentorData", JSON.stringify(mentorData));
  localStorage.setItem("orgData", JSON.stringify(orgData));
  const handleSubmit = (e) => {
    const body = {
      state: stateData,
      district: district,
      pin_code: pinCode,
      category: "Non ATL",
      organization_code: diesCode,
      organization_name: schoolname,
      new_district: newDistrict,
      address: textData,
    };
    setOrgData(body);
    setBtn(false);
    setSchoolBtn(true);

    e.preventDefault();
  };

  useEffect(() => {
    if (stateData && district && pinCode && schoolname && textData) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [stateData, district, pinCode, schoolname, textData]);
  const formik = useFormik({
    initialValues: {
      full_name: "",
      organization_code: diesCode,
      // username: '',
      mobile: "",
      whatapp_mobile: "",
      role: "MENTOR",
      qualification: "-",
      reg_status: false,
      otp: "",
      password: "",
      gender: "",
      title: "",
      email: "",
      click: false,
      checkbox: false,
    },

    validationSchema: Yup.object({
      full_name: Yup.string()
        .trim()
        .min(2, "Enter Name")
        .matches(/^[aA-zZ\s]+$/, "Special Characters are not allowed")
        .required("Please Enter Full Name"),
      mobile: Yup.string()
        .required("Please Enter Your Mobile Number")
        .trim()
        .matches(/^\d+$/, "Mobile number is not valid (Enter only digits)")
        .max(10, "Please enter only 10 digit valid number")
        .min(10, "Number is less than 10 digits"),
      email: Yup.string().email("Must be a valid email").max(255),
      whatapp_mobile: Yup.string()
        .required("Please Enter Your  whatsapp Mobile Number")
        .trim()
        .matches(/^\d+$/, "Mobile number is not valid (Enter only digit)")
        .max(10, "Please enter only 10 digit valid number")
        .min(10, "Number is less than 10 digit"),
      gender: Yup.string().required("Please select valid gender"),
      title: Yup.string().required("Please select Title"),
    }),

    onSubmit: async (values) => {
      if (values.otp.length < 5) {
        setErrorMsg(true);
      } else {
        var pass = values.email.trim();
        var myArray = pass.split("@");
        let newPassword = myArray[0];
        if (values.password !== newPassword) {
          setFieldValue("password", newPassword);
        }
        const key = CryptoJS.enc.Hex.parse("253D3FB468A0E24677C28A624BE0F939");
        const iv = CryptoJS.enc.Hex.parse("00000000000000000000000000000000");
        const encrypted = CryptoJS.AES.encrypt(newPassword, key, {
          iv: iv,
          padding: CryptoJS.pad.NoPadding,
        }).toString();
        const body = {
          full_name: values.full_name.trim(),
          mobile: values.mobile.trim(),
          whatapp_mobile: values.whatapp_mobile.trim(),
          username: values.email.trim(),
          qualification: values.qualification.trim(),
          role: values.role.trim(),
          gender: values.gender,
          title: values.title,
          reg_status: values.reg_status,
          password: encrypted,
        };
        handleRegist(body);
      }
    },
  });

  const handleCheckbox = (e, click) => {
    if (click) {
      setCheckBox(click);
      formik.setFieldValue("whatapp_mobile", formik.values.mobile);
      setWtsNum(formik.values.mobile);
    } else {
      setCheckBox(click);
      formik.setFieldValue("whatapp_mobile", "");
    }
  };
  useEffect(() => {
    setCheckBox(false);
    formik.setFieldValue("whatapp_mobile", "");
  }, [formik.values.mobile.length == 0]);
  const handleEmailChange = (e) => {
    formik.handleChange(e);
    const emailValue = e.target.value;
    const emailParts = emailValue.split("@");
    const newPassword = emailParts[0] || "";

    if (formik.values.password !== newPassword) {
      formik.setFieldValue("password", newPassword);
    }
  };
  const handleSendOtp = async (e) => {
    formik.setFieldValue("mobile", formik.values.mobile);
    setTimer(60);

    setOtpSent(true);
    setChange("Resend OTP");
    setDisable(false);
    setAreInputsDisabled(true);

    const body = JSON.stringify({
      username: formik.values.email,
    });
    var config = {
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/mentors/mobileOtp",
      headers: {
        "Content-Type": "application/json",
        Authorization: "O10ZPA0jZS38wP7cO9EhI3jaDf24WmKX62nWw870",
      },
      data: body,
    };
    axios(config)
      .then(function (response) {
        if (response.status === 202) {
          const UNhashedPassword = decryptGlobal(response?.data?.data);
          console.log(UNhashedPassword, "111111111111111111111111111");
          setOtpRes(JSON.parse(UNhashedPassword));
          // openNotificationWithIcon("success", "Otp send to Email Id");
          setBtnOtp(true);
          // setPerson(false);
          setTimeout(() => {
            setOtpSent("Resend OTP");
            setDisable(true);
            // setHoldKey(false);
            setTimer(0);
          }, 60000);
        }
      })
      .catch(function (error) {
        if (error?.response?.data?.status === 406) {
          setDisable(true);
          setAreInputsDisabled(false);
          setTimer(0);
          // openNotificationWithIcon("error", "Email ID already exists");
          // setTimeout(() => {
          //   setDisable(true);
          //   setHoldKey(false);
          //   setTimer(0);
          // }, 1000);
        }
      });
    e.preventDefault();
  };
  const handleOtpChange = (e) => {
    formik.setFieldValue("otp", e);
    setErrorMsg(false);
  };
  const handleRegist = (mentorregdata) => {
    setMentorData(mentorregdata);
    const body = JSON.stringify({
      state: stateData,
      district: district,
      pin_code: pinCode,
      category: "Non ATL",
      organization_code: diesCode,
      organization_name: schoolname,
      new_district: newDistrict,
      address: textData,
    });

    var config = {
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + `/organizations/createOrg`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "O10ZPA0jZS38wP7cO9EhI3jaDf24WmKX62nWw870",
      },
      data: body,
    };
    axios(config)
      .then(function (response) {
        if (response?.status == 201) {
          mentorregdata["organization_code"] =
            response.data.data[0].organization_code;
          handelMentorReg(mentorregdata);
        }
      })

      .catch(function (error) {
        console.log(error);
      });
  };
  const handelMentorReg = async (body) => {
    var config = {
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/mentors/register",
      headers: {
        "Content-Type": "application/json",
        Authorization: "O10ZPA0jZS38wP7cO9EhI3jaDf24WmKX62nWw870",
      },

      data: JSON.stringify(body),
    };
    await axios(config)
      .then((mentorRegRes) => {
        if (mentorRegRes?.data?.status == 201) {
          navigate("/non-atl-success");
          // setMentorData(mentorRegRes?.data);
        }
      })
      .catch((err) => {
        // openNotificationWithIcon("error", err.response.data?.message);
        // setBtn(false);
        formik.setErrors({
          check: err.response && err?.response?.data?.message,
        });
        return err.response;
      });
  };
  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } else if (timer === 0 && otpSent) {
      setAreInputsDisabled(false);
      setOtpSent(false);
    }
  }, [timer, otpSent]);
  useEffect(() => {
    if (
      formik.values.title.length > 0 &&
      formik.values.full_name.length > 0 &&
      formik.values.gender.length > 0 &&
      formik.values.mobile.length > 0 &&
      formik.values.email.length > 0 &&
      formik.values.whatapp_mobile.length > 0
    ) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [
    formik.values.title,
    formik.values.full_name,
    formik.values.gender,
    formik.values.username,
    formik.values.email,

    formik.values.whatapp_mobile,
  ]);
  useEffect(() => {
    if (Object.keys(mentorData).length > 0) {
      navigate("/non-atl-success");
    }
  }, [mentorData, navigate]);
  return (
    <div className="main-wrapper">
      <div className="account-content">
        <div className="login-wrapper bg-img">
          <div className="login-content">
            <form action="signin" onSubmit={formik.handleSubmit}>
              <div className="login-userset">
                <div className="login-logo logo-normal">
                  <img src={logo} alt="Logo" />
                  {/* <ImageWithBasePath src="assets/img/logo.png" alt="img" /> */}
                </div>
                {/* <Link className="login-logo logo-white">
                  <ImageWithBasePath src="assets/img/logo-white.png" alt />
                </Link> */}
                <div className="login-userheading text-center">
                  <h3> Non ATL School Registration</h3>
                  <h4>Create New Dreamspos Account</h4>
                </div>
                {diceBtn && (
                  <div className="form-row row mb-5">
                    <label>UDISE Code</label>
                    <input
                      type="text"
                      className="form-control"
                      id="organization_code"
                      onChange={(e) => handleOnChange(e)}
                      value={diesCode}
                      maxLength={11}
                      minLength={11}
                      name="organization_code"
                      placeholder="Please Enter UDISE Code"
                    />

                    {error ? (
                      <p
                        style={{
                          color: "red",
                        }}
                      >
                        {error}
                      </p>
                    ) : null}

                    {diceBtn && (
                      <div className="mt-4">
                        <button
                          type="button"
                          className="btn btn-warning m-2"
                          onClick={(e) => handleRegister(e)}
                          disabled={!isButtonEnabled}
                        >
                          {" "}
                          Continue
                        </button>
                      </div>
                    )}
                    <div className="form-row row mb-5 mt-5">
                      <p>
                        {" "}
                        Already a member ?
                        <Link
                          to={"/teacher"}
                          exact
                          className=" m-3 text-center"
                          style={{
                            color: "blue",
                          }}
                        >
                          Login Here
                        </Link>
                      </p>
                    </div>
                  </div>
                )}
                {btn && (
                  <>
                    <div className="col-xl-12">
                      <div className="row g-3 mt-0">
                        <div className="col-md-6">
                          <label htmlFor="inputState" className="form-label">
                            State
                          </label>
                          <Select
                            list={fullStatesNames}
                            setValue={setStateData}
                            placeHolder={"Select State"}
                            value={stateData}
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="inputState" className="form-label">
                            District
                          </label>
                          <Select
                            list={fullDistrictsNames}
                            setValue={setdistrict}
                            placeHolder={"Select District"}
                            value={district}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Pin Code</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Your Pin Code"
                            id="pin_code"
                            name="pin_code"
                            onChange={(e) => handlePincode(e)}
                            value={pinCode}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label"> School Name</label>
                          <input
                            id="organization_name"
                            onChange={(e) => handleOnChangeSchool(e)}
                            value={schoolname}
                            name="organization_name"
                            placeholder="Enter Your School Name"
                            type="text"
                            className="form-control"
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label"> School Address</label>
                          <input
                            id="address"
                            onChange={(e) => handleOnChangeAddress(e)}
                            value={textData}
                            name="address"
                            placeholder="Enter Your School Address"
                            type="text"
                            className="form-control"
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">
                            {" "}
                            New District Name (if applicable)
                          </label>
                          <input
                            id="new_district"
                            onChange={(e) => handleOnChangeNewDistrict(e)}
                            value={newDistrict}
                            name="new_district"
                            placeholder="Enter New District"
                            type="text"
                            className="form-control"
                          />
                        </div>
                        <button
                          type="button"
                          className="btn btn-warning m-2"
                          onClick={(e) => handleSubmit(e)}
                          disabled={!showButton}
                        >
                          {" "}
                          PROCEED
                        </button>
                      </div>
                    </div>
                  </>
                )}
                {schoolBtn && (
                  <div className="col-xl-12">
                    {/* {person && ( */}
                    <div className="card">
                      <div className="card-body">
                        <div className="card-subtitle fw-semibold">
                          School Name : {""}
                          {orgData?.organization_name}
                          <br />
                          {/* City Name : {""}
                          {orgData?.city ? orgData?.city : " N/A"} <br /> */}
                          District Name :{" "}
                          {orgData?.district ? orgData?.district : " N/A"}
                          <br />
                          State Name :{" "}
                          {orgData?.state ? orgData?.state : " N/A"} <br />
                          PinCode :{" "}
                          {orgData?.pin_code ? orgData?.pin_code : " N/A"}{" "}
                          <br />
                        </div>
                      </div>
                    </div>
                    {/* )} */}
                    <div className="card">
                      <div className="card-body">
                        <div className="row g-3 mt-0">
                          {/* {person && ( */}
                          <>
                            <div className="col-md-3">
                              <label
                                htmlFor="inputState"
                                className="form-label"
                              >
                                Title
                              </label>
                              <select
                                id="inputState"
                                className="form-select"
                                // disabled={holdKey ? true : false}
                                disabled={areInputsDisabled}
                                name="title"
                                value={formik.values.title}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                              >
                                <option value="">Title</option>
                                <option value="Dr">Dr</option>
                                <option value="Mr">Mrs</option>
                                <option value="Miss">Miss</option>
                                <option value="Mrs">Mrss</option>
                              </select>
                              {formik.touched.title && formik.errors.title ? (
                                <small className="error-cls">
                                  {formik.errors.title}
                                </small>
                              ) : null}
                            </div>
                            <div className="col-md-6">
                              <label className="form-label">Full Name</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Full Name"
                                id="full_name"
                                disabled={areInputsDisabled}
                                name="full_name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.full_name}
                              />
                              {formik.touched.full_name &&
                              formik.errors.full_name ? (
                                <small className="error-cls">
                                  {formik.errors.full_name}
                                </small>
                              ) : null}
                            </div>
                            <div className="col-md-3">
                              <label
                                htmlFor="inputState"
                                className="form-label"
                              >
                                Gender
                              </label>
                              <select
                                id="inputState"
                                className="form-select"
                                disabled={areInputsDisabled}
                                name="gender"
                                value={formik.values.gender}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                              >
                                <option value="">Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                              </select>
                              {formik.touched.gender && formik.errors.gender ? (
                                <small className="error-cls">
                                  {formik.errors.gender}
                                </small>
                              ) : null}
                            </div>
                            <div className="col-md-6">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label"
                              >
                                Email
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                id="inputEmail4"
                                disabled={areInputsDisabled}
                                name="email"
                                onChange={handleEmailChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                              />
                              {formik.touched.email && formik.errors.email ? (
                                <small className="error-cls">
                                  {formik.errors.email}
                                </small>
                              ) : null}
                            </div>
                            <div className="col-md-6">
                              <label
                                htmlFor="inputPassword4"
                                className="form-label"
                              >
                                Password
                              </label>
                              <input
                                type="text"
                                disabled={true}
                                // isDisabled={true}
                                name="password"
                                id="password"
                                defaultValue="readonly"
                                // readOnly="readonly"
                                className="form-control"
                                value={formik.values.password}
                              />
                              {formik.touched.password &&
                              formik.errors.password ? (
                                <small className="error-cls">
                                  {formik.errors.password}
                                </small>
                              ) : null}
                            </div>
                            <div
                              className="col-md-6"
                              style={{ marginTop: "2.5rem" }}
                            >
                              <label className="form-label">
                                Mobile Number
                              </label>

                              <input
                                type="text"
                                className="form-control"
                                id="inputEmail4"
                                disabled={areInputsDisabled}
                                name="mobile"
                                onChange={(e) => {
                                  const inputValue = e.target.value;
                                  const numericValue = inputValue.replace(
                                    /\D/g,
                                    ""
                                  );
                                  formik.setFieldValue("mobile", numericValue);
                                }}
                                maxLength={10}
                                minLength={10}
                                onBlur={formik.handleBlur}
                                value={formik.values.mobile}
                              />

                              {formik.touched.mobile && formik.errors.mobile ? (
                                <small className="error-cls">
                                  {formik.errors.mobile}
                                </small>
                              ) : null}
                            </div>
                            <div className="col-md-6">
                              <div className="d-flex align-items-center justify-content-between">
                                <div
                                  style={{
                                    display: "flex",
                                  }}
                                >
                                  <span> Same </span>
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="click"
                                    disabled={
                                      (formik.values.mobile.length > 0
                                        ? false
                                        : true) || areInputsDisabled
                                    }
                                    id="click"
                                    checked={checkBox}
                                    onClick={(e) =>
                                      handleCheckbox(e, !checkBox)
                                    }
                                  />
                                </div>
                              </div>
                              <label className="form-label">
                                WhatsApp Number
                              </label>

                              <input
                                type="text"
                                className="form-control"
                                id="inputEmail4"
                                disabled={areInputsDisabled}
                                name="whatapp_mobile"
                                onChange={(e) => {
                                  const inputValue = e.target.value;
                                  const numericValue = inputValue.replace(
                                    /\D/g,
                                    ""
                                  );
                                  formik.setFieldValue(
                                    "whatapp_mobile",
                                    numericValue
                                  );
                                }}
                                maxLength={10}
                                minLength={10}
                                onBlur={formik.handleBlur}
                                value={formik.values.whatapp_mobile}
                              />

                              {formik.touched.whatapp_mobile &&
                              formik.errors.whatapp_mobile ? (
                                <small className="error-cls">
                                  {formik.errors.whatapp_mobile}
                                </small>
                              ) : null}
                            </div>
                          </>
                          {/* )} */}
                          {/* {person && ( */}
                          <div className="col-12">
                            <button
                              type="button"
                              className="btn btn-warning m-2"
                              onClick={(e) => handleSendOtp(e)}
                              disabled={
                                !formik.isValid || !formik.dirty || otpSent
                              }
                            >
                              {otpSent ? `Resend OTP (${timer})` : change}
                            </button>
                          </div>
                          {/* )} */}
                          {btnOtp && (
                            <>
                              <h3>
                                {/* {time}:{counter < 59 ? counter - "0" : counter} */}
                                {/* <h3>{timer > 0 && `00: ${timer} seconds`}</h3> */}
                              </h3>
                              <div className="Otp-expire text-center">
                                <p>
                                  Otp will expire in{" "}
                                  {timer > 0 && `00: ${timer} seconds`}
                                </p>
                              </div>

                              <div className="login-content user-login">
                                <div className="login-logo">
                                  {/* <ImageWithBasePath
                                    src="assets/img/logo.png"
                                    alt="img"
                                  /> */}
                                  <img src={logo} alt="Logo" />
                                  {/* <Link className="login-logo logo-white">
                                    <ImageWithBasePath
                                      src="assets/img/logo-white.png"
                                      alt
                                    />
                                  </Link> */}
                                </div>
                                <div className="login-userset">
                                  <div className="login-userheading">
                                    <h3>Login With Your Email Address</h3>
                                    <h4 className="verfy-mail-content">
                                      We sent a verification code to your email.
                                      Enter the code from the email in the field
                                      below
                                    </h4>
                                  </div>

                                  <div className="wallet-add">
                                    <div className="otp-box">
                                      <div className="forms-block text-center">
                                        <OtpInput
                                          numInputs={6}
                                          // isDisabled={false}
                                          disabled={false}
                                          errorStyle="error"
                                          onChange={handleOtpChange}
                                          separator={<span>{"-"}</span>}
                                          isInputNum={true}
                                          isInputSecure={false}
                                          shouldAutoFocus
                                          value={formik.values.otp}
                                          placeholder={""}
                                          inputStyle={{
                                            border: "1px solid",
                                            borderRadius: "8px",
                                            width: "4rem",
                                            height: "4rem",
                                            fontSize: "2rem",
                                            color: "#000",
                                            fontWeight: "400",
                                            caretColor: "blue",
                                          }}
                                          focusStyle={{
                                            border: "1px solid #CFD3DB",
                                            outline: "none",
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                          {formik.values.otp.length > 5 &&
                            otpRes != formik.values.otp && (
                              <div className="form-row row mb-5 text-center">
                                <span
                                  className=" w-100 mt-3 d-flex justify-content-center"
                                  style={{
                                    color: "red",
                                  }}
                                >
                                  Invalid OTP
                                </span>
                              </div>
                            )}
                          {btnOtp && (
                            <div className="form-login mt-4">
                              <button
                                className="btn btn-login"
                                type="submit"
                                disabled={
                                  !(
                                    formik.values.otp.length === 6 &&
                                    formik.values.otp === otpRes
                                  )
                                }
                              >
                                Verify My Account
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NonAtlPage;
