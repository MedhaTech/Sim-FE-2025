/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import { Row, Col, Form, Label, FormGroup } from "reactstrap";
import "./style.scss";



import axios from "axios";
import { getCurrentUser } from "../../helpers/Utils";

import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import {
  stateList,
  districtList,
  mandalList,
  SchoolBoard,
  SchoolType,
} from "../../RegPage/ORGData";
import {
  openNotificationWithIcon,
} from "../../helpers/Utils";
import { useDispatch } from "react-redux";

import { encryptGlobal } from "../../constants/encryptDecrypt";
const EditSchool = (props) => {
  const currentUser = getCurrentUser("current_user");
  const navigate = useNavigate();
  const listID = JSON.parse(localStorage.getItem("listId"));
  const listId =
    (history &&
      history.location &&
      history.location.item &&
      history.location.item) ||
    listID;
    const inputDICE1 = {
        type: "text",
        className: "form-control",
      };
  const dispatch = useDispatch();
  const [districts, setDistricts] = useState([]);
  const [mandals, setMandals] = useState([]);

  const boardFromApi = listId?.board || ""; 

  const isPredefined = SchoolBoard.includes(boardFromApi);
  const typeFromApi = listId?.school_type || ""; 

  const isPredefined1 = SchoolType.includes(typeFromApi);
  useEffect(() => {
    if (listId?.state) {
        setDistricts(districtList[listId.state] || []);
    }
    if (listId?.district) {
        setMandals(mandalList[listId.district] || []);
    }
  }, [listId.state,listId?.district]);
  const inputDICE = {
    type: "text",
    className: "form-control",
  };

  const filterCategory = ["ATL", "Non ATL"];
  const categoryDataTn = ["HSS", "HS", "Non ATL"];

  const getInitialValues = (listId) => {
    const commonInitialValues = {
      organization_name: listId?.organization_name || "",
      organization_code: listId?.organization_code || "",
      unique_code: listId?.unique_code || "",
      pin_code: listId?.pin_code || "",
      city: listId?.city || "",
      district: listId?.district || "",
      state: listId?.state || "",
      status: listId?.status || "",
      address: listId?.address || "",
      category: listId?.category || "",
      mandal: listId?.mandal || "",
    
      school_type: isPredefined1 ? typeFromApi : (typeFromApi ? "Others" : ""),
      other_school_type: isPredefined1 ? "" : typeFromApi,
      board: isPredefined ? boardFromApi : (boardFromApi ? "Others" : ""),
      other_board: isPredefined ? "" : boardFromApi,
    };
    if (
      listId?.district &&
      districtList[listId?.state]?.includes(listId?.district)
    ) {
      commonInitialValues.district = listId.district;
    }
    return commonInitialValues;
  };

  const formik = useFormik({
    initialValues: getInitialValues(listId),

    validationSchema: Yup.object({
      organization_code: Yup.string()
        .matches(
          /^[A-Za-z0-9/-]*$/,
          "Please enter only alphanumeric characters"
        )
        .trim()
        .required("UDISE  Code is Required"),
      organization_name: Yup.string()
        .trim()
        .min(2, <span style={{ color: "red" }}>Please Enter School Name</span>)
        .matches(
          /^[a-zA-Z0-9\s]+$/,
          "Special characters are not allowed in the School Name"
        )
        .max(
          40,
          <span style={{ color: "red" }}>
            School Name cannot be more than 40 characters
          </span>
        )
        .required(
          <span style={{ color: "red" }}>Please Enter School Name</span>
        ),
      unique_code: Yup.string()
        .matches(
          /^[A-Za-z0-9/-]*$/,
          "Please enter only alphanumeric characters"
        )
        .optional(),
      address: Yup.string()
        .optional()
        .matches(
          /^[a-zA-Z0-9\s\-,/._-]+$/,
          "Special characters are not allowed in the Address"
        ),

      pin_code: Yup.string()
        .matches(/^[0-9]*$/, "Please enter Numeric values")
        .min(6, "please enter valid pin code")
        .optional(),
      district: Yup.string()
        .required("District is required"),
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
        .matches(/^[aA-zZ\s/^.*$/]+$/, "please enter valid city")
        .optional(),
    }),
    validateOnMount: true, // This validates on mount to show errors even if fields aren't touched
    validateOnChange: true, // Validates on each field change
    validateOnBlur: true, // Validates when fields are blurred
    onSubmit: (values) => {
      const body = {
        organization_code: values.organization_code,
        state: values.state,
        category: values.category,
        district: values.district,
        organization_name: values.organization_name,
        status: values.status,
        mandal: values.mandal.trim(),
        school_type:
          values.school_type === "Others"
            ? values.other_school_type
            : values.school_type,
        board: values.board === "Others" ? values.other_board : values.board,
      };
      if (listId && listId.city !== values.city) {
        body["city"] = values.city;
      }
      if (listId && listId !== values.address) {
        body["address"] = values.address;
      }
      if (listId && listId !== values.unique_code) {
        body["unique_code"] = values.unique_code;
      }
      if (listId && listId !== values.pin_code) {
        body["pin_code"] = values.pin_code;
      }
      const editId = encryptGlobal(JSON.stringify(listId.organization_id));
      var config = {
        method: "put",
        url: process.env.REACT_APP_API_BASE_URL + "/organizations/" + editId,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser?.data[0]?.token}`,
        },
        data: body,
      };
      axios(config)
        .then((checkOrgRes) => {
          if (checkOrgRes.status == 200) {
            openNotificationWithIcon("success", "School Update Successfully");
            navigate("/institution");
          }
        })
        .catch((err) => {
          return err.response;
        });
    },
  });

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const buttonStyle = {
    marginRight: "10px",
  };
  return (
    <div className="page-wrapper">
      <h3
        className="m-2"
        style={{
          position: "sticky",
          top: "70px",
          zIndex: 1000,
          padding: "10px",
          backgroundColor: "white",
          display: "inline-block",
          color: "#fe9f43",
          fontSize: "16px",
        }}
      >
        Overall Schools
      </h3>
      <div className="content">
        <div className="EditPersonalDetails new-member-page">
          <Row>
            <Col className="col-xl-10 offset-xl-1 offset-md-0">
              <h3 className="mb-5">Edit Institutions Details</h3>

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
                          disabled="true"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.organization_code}
                        />
                        {formik.errors.organization_code ? (
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
                          name="state"
                          className="form-select"
                          onBlur={formik.handleBlur}
                          value={formik.values.state}
                          onChange={(e) => {
                            const selectedState = e.target.value;

                            formik.setFieldValue("state", selectedState);
                            formik.setFieldValue("district", "");
                            formik.setFieldValue("mandal", "");

                            setDistricts(districtList[selectedState] || []);
                          }}
                        >
                          <option value="">Select State</option>
                          {stateList.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                        {formik.errors.state ? (
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
                          name="district"
                          className="form-select"
                          onBlur={formik.handleBlur}
                          value={formik.values.district}
                          onChange={(e) => {
                            const selectedDistrict = e.target.value;
                            formik.setFieldValue("district", selectedDistrict);
                            setMandals(mandalList[selectedDistrict] || []);
                           
                          }}
                        >
                          <option value="">Select District</option>
                          {districts.map((district) => (
                            <option key={district} value={district}>
                              {district}
                            </option>
                          ))}
                        </select>

                        {formik.errors.district ? (
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
                          name="mandal"
                          className="form-select"
                          onBlur={formik.handleBlur}
                          value={formik.values.mandal}
                          onChange={(e) => {
                            const selectedMandal = e.target.value;
                            formik.setFieldValue("mandal", selectedMandal);
                          }}
                        >
                          <option value="">Select Mandal / Taluka</option>
                          {mandals.map((mandal) => (
                            <option key={mandal} value={mandal}>
                              {mandal}
                            </option>
                          ))}
                        </select>

                        {formik.errors.mandal && formik.errors.mandal ? (
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
                                            {/* <Col md={3}> */}
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
                     
                      {formik.values.state == "Tamil Nadu" ? (
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
                            {categoryDataTn.map((category) => (
                              <option key={category} value={category}>
                                {category}
                              </option>
                            ))}
                          </select>
                          {formik.errors.category ? (
                            <small
                              className="error-cls"
                              style={{ color: "red" }}
                            >
                              {formik.errors.category}
                            </small>
                          ) : null}
                        </Col>
                      ) : (
                        <Col md={4}>
                          <Label
                            // className="mb-2"
                            className="form-label"
                            htmlFor="category"
                          >
                            Category
                            <span required>*</span>
                          </Label>
                          {/* <Col md={3}> */}{" "}
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
                          {formik.errors.category ? (
                            <small
                              className="error-cls"
                              style={{ color: "red" }}
                            >
                              {formik.errors.category}
                            </small>
                          ) : null}
                        </Col>
                      )}
                      <Col md={4}>
                        <Label
                          className="form-label"
                          htmlFor="organization_name"
                          // style={{ fontSize: 15 }}
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
                        {formik.errors.organization_name ? (
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
                        {formik.errors.address ? (
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
                        {formik.errors.pin_code ? (
                          <small className="error-cls" style={{ color: "red" }}>
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
                        {formik.errors.unique_code ? (
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
                        {formik.errors.city ? (
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
                        className={`btn btn-warning ${
                          !formik.dirty || !formik.isValid
                            ? "default"
                            : "primary"
                        }`}
                        disabled={!formik.dirty || !formik.isValid}
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

export default EditSchool;
