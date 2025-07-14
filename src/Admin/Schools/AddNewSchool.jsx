/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import { Row, Col, Form, Label, FormGroup } from "reactstrap";
import "./style.scss";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  openNotificationWithIcon,
} from "../../helpers/Utils";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { stateList, districtList ,mandalList,SchoolBoard,SchoolType} from "../../RegPage/ORGData";
const AddNewSchool = (props) => {
  const filterCategory = ["ATL", "Non ATL"];
  const categoryDataTn = [
    "HSS",
    "HS",
    "Non ATL",
  ];
  const navigate = useNavigate();
  const [districts, setDistricts] = useState([]);
 const [mandals, setMandals] = useState([]);
  const dispatch = useDispatch();
  const inputDICE = {
    type: "text",
    className: "form-control",
  };
  const inputDICE1 = {
    type: "text",
    className: "form-control",
  };

  
  const formik = useFormik({
    initialValues: {
      organization_name: "",
      organization_code: "",
      city: "",
      district: "",
      state: "",
      status: "ACTIVE",
      category: "",
      unique_code: "",
      pin_code: "",
      address: "",
      mandal:"",
      school_type:"",
      board:"",
      other_school_type:"",
      other_board:""
    },

    validationSchema: Yup.object({
      unique_code: Yup.string()
        .matches(
          /^[A-Za-z0-9/-]*$/,
          "Please enter only alphanumeric characters"
        )
        .trim()
        .optional(),
      organization_name: Yup.string()
        .max(40, "Please Enter Valid Organization Name")
        .matches(
          /^[a-zA-Z0-9\s]+$/,
          "Organization Name can only contain letters, numbers, and spaces"
        )
        .required("Organization Name is Required"),
      organization_code: Yup.string()
        .max(11, "Please enter only 11 digit valid UDISE code")
        .min(11, "UDISE code is less than 11 digits")
        .required("UDISE Code is Required"),
      address: Yup.string()
        .optional()
        .matches(/^[a-zA-Z0-9\s\-,/._-]+$/, "Special characters are not allowed in the Address"
),
      pin_code: Yup.string()
        .matches(/^[0-9]*$/, "Please enter Numeric values")
        .optional(),
      district: Yup.string()
        .required("District is Required"),
      category: Yup.string()
        .required("Category is Required"),
      state: Yup.string().required("State is required"),
      mandal: Yup.string().required("Mandal / Taluka is required"),

      school_type: Yup.string().required("School Type is required"),
      other_school_type: Yup.string().test(
        "other-school-type-required",
        "Please Enter School Type",
        function (value) {
          const { school_type } = this.parent;
          if (school_type === "Others") {
            return !!value; 
          }
          return true; 
        }
      ),
board: Yup.string().required("School Board is required"),
other_board: Yup.string().test(
  "other-board-required",
  "Please Enter School Board",
  function (value) {
    const { board } = this.parent;
    if (board === "Others") {
      return !!value; 
    }
    return true; 
  }
),
     
      city: Yup.string()
        .matches(/^[aA-zZ\s/^.*$/]+$/, "please enter valid city name")
        .optional(),
    }),

    onSubmit: async (values) => {
      const body = {
        organization_code: values.organization_code.trim(),
        organization_name: values.organization_name.trim(),
        state: values.state.trim(),
        category: values.category.trim(),
        district: values.district.trim(),
        mandal: values.mandal.trim(),
        school_type: values.school_type === "Others"
    ? values.other_school_type
    : values.school_type,
    board: values.board === "Others"
    ? values.other_board
    : values.board,
      };
      if (values.city !== "") {
        body["city"] = values.city;
      } 
      if (values.address !== "") {
        body["address"] = values.address;
      } 
       if (values.unique_code !== "") {
        body["unique_code"] = values.unique_code;
      } 
      if (values.pin_code !== "") {
        body["pin_code"] = values.pin_code;
      }
      var config = {
        method: "post",
        url: process.env.REACT_APP_API_BASE_URL + "/organizations/createOrg",
        headers: {
          "Content-Type": "application/json",
          Authorization: "O10ZPA0jZS38wP7cO9EhI3jaDf24WmKX62nWw870",
        },
        data: body,
      };
      await axios(config)
        .then(async function (response) {
          if (response.status == 201) {
            openNotificationWithIcon("success", "School Create Successfully");
            navigate("/institution");
          }
        })
        .catch((err) => {
          openNotificationWithIcon("error", "Udise code must be unique");
          return err.response;
        });
     
    },
  });

  const handleStateChange = (event) => {
    const state = event.target.value;
    formik.setFieldValue("state", state);
    formik.setFieldValue("district", "");
    setDistricts(districtList[state] || []);
    setMandals([]);
    formik.setFieldValue("mandal", "");
  };

  const handleDistrictChange = (event) => {
    const dist = event.target.value;
    formik.setFieldValue("district", dist);
    setMandals(mandalList[dist] || []);
  };

  const handleMandalChange = (e) => {
    formik.setFieldValue("mandal", e.target.value);
  };
  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const buttonStyle = {
    marginRight: "10px",
  };
  const handleInputChange = (e) => {
    const numericValue = e.target.value
      .replace(/[^a-zA-Z0-9]/g, "")
      .slice(0, 11);
    formik.setFieldValue("organization_code", numericValue);
  };

  return (
    <div className="page-wrapper">
       <h4 className="m-2" 
        style={{ position: 'sticky', top: '70px', zIndex: 1000, padding: '10px',backgroundColor: 'white', display: 'inline-block' , color: '#fe9f43',fontSize:"16px" }}
        >Overall Schools
        </h4>
      <div className="content">
        <div className="EditPersonalDetails new-member-page">
          <Row>
            <Col className="col-xl-10 offset-xl-1 offset-md-0">
              <h3 className="mb-5"> Add New Institution Details</h3>

              <div>
                <Form onSubmit={formik.handleSubmit} isSubmitting>
                  <div className="create-ticket register-block">
                    <Row className="mb-3 modal-body-table search-modal-header">
                      <Col md={3}>
                        <Label
                          className="form-label"
                          htmlFor="organization_code"
                        >
                          UDISE Code
                          <span required>*</span>
                        </Label>
                        <input
                          {...inputDICE}
                          id="organization_code"
                          name="organization_code"
                          placeholder="Please enter UDISE Code"
                          onChange={(e) => handleInputChange(e)}
                          onBlur={formik.handleBlur}
                          value={formik.values.organization_code}
                        />
                        {formik.touched.organization_code &&
                        formik.errors.organization_code ? (
                          <small className="error-cls" style={{ color: "red" }}>
                            {formik.errors.organization_code}
                          </small>
                        ) : null}
                      </Col>
                      <Col md={3}>
                        <Label className="form-label" htmlFor="state">
                          State
                          <span required>*</span>
                        </Label>
                        <select
                          id="inputState"
                          className="form-select"
                          onChange={(e) => handleStateChange(e)}
                        >
                          <option value="">Select State</option>
                          {stateList.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>

                        {formik.touched.state && formik.errors.state ? (
                          <small className="error-cls" style={{ color: "red" }}>
                            {formik.errors.state}
                          </small>
                        ) : null}
                      </Col>
                      <Col md={3}>
                        <Label className="form-label" htmlFor="district">
                          District
                          <span required>*</span>
                        </Label>
                        <select
                          id="inputState"
                          className="form-select"
                          value={formik.values.district}
                          onChange={(e) => handleDistrictChange(e)}
                        >
                          <option value="">Select District</option>
                          {districts.map((district) => (
                            <option key={district} value={district}>
                              {district}
                            </option>
                          ))}
                        </select>

                        {formik.touched.district && formik.errors.district ? (
                          <small className="error-cls" style={{ color: "red" }}>
                            {formik.errors.district}
                          </small>
                        ) : null}
                      </Col>
                      <Col md={3}>
                        <Label className="form-label" htmlFor="district">
                        Mandal / Taluka
                          <span required>*</span>
                        </Label>
                        <select
                          id="mandal"
                          className="form-select"
                          value={formik.values.mandal}
                          onChange={handleMandalChange }
                        >
                          <option value="">Select Mandal / Taluka</option>
                          {mandals.map((mandal) => (
                              <option key={mandal} value={mandal}>
                                {mandal}
                              </option>
                            ))}
                        </select>

                        {formik.touched.mandal && formik.errors.mandal ? (
                          <small className="error-cls" style={{ color: "red" }}>
                            {formik.errors.mandal}
                          </small>
                        ) : null}
                      </Col>
                      </Row>
                      <Row className="mb-3 modal-body-table search-modal-header">
                    
                      <Col md={formik.values.school_type === "Others" ? 3 : 6}>
                        <Label className="form-label" htmlFor="district">
                        School Type
                          <span required>*</span>
                        </Label>
                        <select
                          id="school_type"
                          className="form-select"
                          value={formik.values.school_type}
                          onChange={formik.handleChange}
                        >
                          <option value="">Select School Type</option>
                                                     {SchoolType.map((item) => (
                                                       <option key={item} value={item}>
                                                         {item}
                                                       </option>
                                                     ))}
                        </select>

                        {formik.touched.school_type && formik.errors.school_type ? (
                          <small className="error-cls" style={{ color: "red" }}>
                            {formik.errors.school_type}
                          </small>
                        ) : null}
                      </Col>
                      {formik.values.school_type === "Others" && (
                      <Col md={3}>
                        <Label className="form-label" htmlFor="district">
                        School Type
                          <span required>*</span>
                        </Label>
                        <input
            type="text"
             id="other_school_type"
             {...inputDICE}
        name="other_school_type"
            placeholder="Please Enter School Type"
            value={formik.values.other_school_type}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
           
          />

                        {formik.touched.other_school_type && formik.errors.other_school_type ? (
                          <small className="error-cls" style={{ color: "red" }}>
                            {formik.errors.other_school_type}
                          </small>
                        ) : null}
                      </Col>
                      )}
                      <Col md={formik.values.board === "Others" ? 3 : 6}>
                        <Label className="form-label" htmlFor="district">
                        School Board
                          <span required>*</span>
                        </Label>
                        <select
                          id="board"
                          className="form-select"
                          value={formik.values.board}
                          onChange={formik.handleChange}
                        >
                             <option value="">Select School Board</option>
                                                      {SchoolBoard.map((item) => (
                                                        <option key={item} value={item}>
                                                          {item}
                                                        </option>
                                                      ))}
                        </select>

                        {formik.touched.board && formik.errors.board ? (
                          <small className="error-cls" style={{ color: "red" }}>
                            {formik.errors.board}
                          </small>
                        ) : null}
                      </Col>
                      {formik.values.board === "Others" && (
                      <Col md={3}>
                        <Label className="form-label" htmlFor="district">
                        School Board
                          <span required>*</span>
                        </Label>
                        <input
             id="other_board"
        name="other_board"
        {...inputDICE1}
            placeholder="Please Enter School Board"
            value={formik.values.other_board}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
           
          />

                        {formik.touched.other_board && formik.errors.other_board ? (
                          <small className="error-cls" style={{ color: "red" }}>
                            {formik.errors.other_board}
                          </small>
                        ) : null}
                      </Col>
                      )}
                      </Row>
                     
                   
                     
                    <Row className="mb-3 modal-body-table search-modal-header">
                     {formik.values.state == "Tamil Nadu" ? (<Col md={4}>
                        <Label
                          className="form-label"
                          htmlFor="category"
                        >
                          Category
                          <span required>*</span>
                        </Label>
                        
                        <select
                          id="inputState"
                          name="category"
                          className="form-select"
                          onBlur={formik.handleBlur}
                          value={formik.values.category}
                          onChange={formik.handleChange}
                        >
                          <option value="">Select Category</option>
                          {categoryDataTn.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                        {formik.touched.category && formik.errors.category ? (
                          <small className="error-cls" style={{ color: "red" }}>
                            {formik.errors.category}
                          </small>
                        ) : null}
                      </Col>) :(
                      <Col md={4}>
                        <Label
                          className="form-label"
                          htmlFor="category"
                        >
                          Category
                          <span required>*</span>
                        </Label>
                        
                        <select
                          id="inputState"
                          name="category"
                          className="form-select"
                          onBlur={formik.handleBlur}
                          value={formik.values.category}
                          onChange={formik.handleChange}
                        >
                          <option value="">Select Category</option>
                          {filterCategory.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                        {formik.touched.category && formik.errors.category ? (
                          <small className="error-cls" style={{ color: "red" }}>
                            {formik.errors.category}
                          </small>
                        ) : null}
                      </Col>)}

                      <Col md={4}>
                        <Label
                          className="form-label"
                          htmlFor="organization_name"
                        >
                          Institute/School Name
                          <span required>*</span>
                        </Label>
                        <input
                          {...inputDICE}
                          id="organization_name"
                          name="organization_name"
                          placeholder="Please enter Institute/School name"
                          onChange={(e) => {
                            let inputValue = e.target.value;
                            inputValue = inputValue.slice(0, 40);
                            formik.setFieldValue(
                              "organization_name",
                              inputValue
                            );
                          }}
                          onBlur={formik.handleBlur}
                          value={formik.values.organization_name}
                        />
                        {formik.touched.organization_name &&
                        formik.errors.organization_name ? (
                          <small className="error-cls" style={{ color: "red" }}>
                            {formik.errors.organization_name}
                          </small>
                        ) : null}
                      </Col>
                      <Col md={4}>
                        <Label className="form-label" htmlFor="address">
                          Address
                        </Label>
                        <input
                          {...inputDICE}
                          id="address"
                          name="address"
                          placeholder="Please enter Address"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.address}
                        />
                        {formik.touched.address && formik.errors.address ? (
                          <small className="error-cls" style={{ color: "red" }}>
                            {formik.errors.address}
                          </small>
                        ) : null}
                      </Col>
                    </Row>

                    <Row className="mb-3 modal-body-table search-modal-header">
                      <Col md={4}>
                        <Label
                          className="form-label"
                          htmlFor="pin_code"
                        >
                          PinCode
                        </Label>
                        <input
                          {...inputDICE}
                          id="pin_code"
                          name="pin_code"
                          placeholder="Please enter PinCode"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.pin_code}
                        />
                        {formik.touched.pin_code && formik.errors.pin_code ? (
                          <small className="error-cls">
                            {formik.errors.pin_code}
                          </small>
                        ) : null}
                      </Col>
                      <Col md={4}>
                        <Label
                          className="form-label"
                          htmlFor="unique_code"
                        >
                          ATL Code
                        </Label>
                        <input
                          {...inputDICE}
                          id="unique_code"
                          name="unique_code"
                          maxLength={11}
                          placeholder="Please enter Atl Code"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.unique_code}
                        />
                        {formik.touched.unique_code &&
                        formik.errors.unique_code ? (
                          <small className="error-cls" style={{ color: "red" }}>
                            {formik.errors.unique_code}
                          </small>
                        ) : null}
                      </Col>

                      <Col md={4}>
                        <Label className="form-label" htmlFor="city">
                          City
                        </Label>
                        <input
                          {...inputDICE}
                          id="city"
                          name="city"
                          placeholder="Please enter city"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.city}
                        />
                        {formik.touched.city && formik.errors.city ? (
                          <small className="error-cls" style={{ color: "red" }}>
                            {formik.errors.city}
                          </small>
                        ) : null}
                      </Col>
                    </Row>
                  </div>

                  <Row>
                    <div style={buttonContainerStyle}>
                      <button
                        type="submit"
                        className="btn btn-warning"
                        style={buttonStyle}
                      >
                        Submit
                      </button>

                      <button
                        onClick={() => navigate("/institution")}
                        type="button"
                        className="btn btn-secondary"
                        style={{ marginLeft: "auto" }}
                      >
                        Discard
                      </button>
                    </div>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default AddNewSchool;
