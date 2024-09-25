/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState,useEffect } from "react";
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
import user from "../assets/img/user.png";
import { stateList,districtList } from '../RegPage/ORGData';
import Select from "../Admin/Reports/Helpers/Select";
import { getTeacherByID } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const TeacherEditProfile = () => {
  const { teacher } = useSelector((state) => state.teacher);
  const dispatch = useDispatch();

  const location = useLocation();
  const [districts, setDistricts] = useState([]);
  const mentorData = location.state || {};
  console.log(mentorData,"mentorData");
  const navigate = useNavigate();


 useEffect(()=>{
  setDistricts(
      districtList[
          
        mentorData.state
      ] || []
  );
 },[mentorData.state]);
  const currentUser = getCurrentUser("current_user");
  const getValidationSchema = () => {
    // where data = mentorData //
    const adminValidation = Yup.object({
      title: Yup.string().required(
        <span style={{ color: "red" }}>Please select Title</span>
      ),
      gender:Yup.string().required(
        <span style={{ color: "red" }}>Please select Gender</span>
      ),
      full_name: Yup.string()
      .trim()
      .min(2, <span style={{ color: "red" }}>Please Enter Full Name</span>)
      .matches(
        /^[aA-zZ\s]+$/,
        <span style={{ color: "red" }}>
          Special Characters are not allowed
        </span>
      )
      .required(<span style={{ color: "red" }}>Please Enter Full Name</span>),
      organization_name : Yup.string()
      .trim()
      .min(2, <span style={{ color: "red" }}>Please Enter School Name</span>)
      .matches(
        /^[a-zA-Z0-9\s]+$/,
        'Special characters are not allowed in the School Name'
      )
      .max(
        40,
        <span style={{ color: "red" }}>
          School Name cannot be more than 40 characters
        </span>
      )
      .required(<span style={{ color: "red" }}>Please Enter School Name</span>),
      principal_name: Yup.string()
        .trim()
        .min(2, <span style={{ color: "red" }}>Please Enter Principal Name</span>)
        .matches(
          /^[aA-zZ\s]+$/,
          <span style={{ color: "red" }}>
            Special Characters are not allowed
          </span>
        )
        .required(<span style={{ color: "red" }}>Please Enter Principal Name</span>),
      
      principal_mobile: Yup.string()
          .required(
            <span style={{ color: "red" }}>Please Enter Mobile Number</span>
          )
          .trim()
          .matches(
            /^\d+$/,
            <span style={{ color: "red" }}>
              Mobile number is not valid (Enter only digits)
            </span>
          )
          .max(
            10,
            <span style={{ color: "red" }}>
              Please enter only 10 digit valid number
            </span>
          )
          .min(
            10,
            <span style={{ color: "red" }}>Number is less than 10 digits</span>
          ),
      state: Yup.string().required('State is required'),
      district: Yup.string()
      .required('District not in required format'),
      principal_email: Yup.string()
          .email(
            <span style={{ color: "red" }}>Please Enter Valid Email Address</span>
          )
          .required(
            <span style={{ color: "red" }}>Please Enter Email Address</span>
          )
          .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Email Must be VALID"
          )
          .max(255),
      
      whatapp_mobile: Yup.string()
          .required(
            <span style={{ color: "red" }}>Please Enter WhatsApp Number</span>
          )
          .trim()
          .matches(
            /^\d+$/,
            <span style={{ color: "red" }}>
              Mobile number is not valid (Enter only digit)
            </span>
          )
          .max(
            10,
            <span style={{ color: "red" }}>
              Please enter only 10 digit valid number
            </span>
          )
          .min(
            10,
            <span style={{ color: "red" }}>Number is less than 10 digits</span>
          ),
    });
    return adminValidation;
  };
  const getInitialValues = (mentorData) => {
    const commonInitialValues = {
      full_name: mentorData?.full_name,
      principal_name : mentorData?.principal_name,
      principal_mobile : mentorData?.principal_mobile,
      principal_email : mentorData?.principal_email,
      title: mentorData.title,
      whatapp_mobile: mentorData.whatapp_mobile,
      gender: mentorData.gender,
      district: "",
      state: mentorData?.state || '',
      organization_name : mentorData.organization_name
    };
    if (mentorData?.district && districtList[mentorData?.state]?.includes(mentorData?.district)) {
      commonInitialValues.district = mentorData.district; // Set to mentorData district if valid
    }
    return commonInitialValues;
  };
  const formik = useFormik({
    initialValues: getInitialValues(mentorData),
    validationSchema: getValidationSchema(),
    validateOnMount: true,  // This validates on mount to show errors even if fields aren't touched
    validateOnChange: true, // Validates on each field change
    validateOnBlur: true,   // Validates when fields are blurred
    onSubmit: (values) => {
      const full_name = values.full_name;
      const principal_name = values.principal_name;
      const principal_mobile = values.principal_mobile;
      const principal_email = values.principal_email;
      const title = values.title;
      const whatapp_mobile = values.whatapp_mobile;
      const gender = values.gender;
      const organization_name = values.organization_name;
      const state = values.state;
      const district = values.district;

      const bodyt = JSON.stringify({
        full_name: full_name,
        title: title,
        whatapp_mobile: whatapp_mobile,
        gender: gender,
        username: mentorData.username,
      });
      const bodys = JSON.stringify({
        organization_code : mentorData?.organization_code,
        status : mentorData?.status,
        state: state,
        district: district,

        principal_email : principal_email,
        principal_mobile : principal_mobile,
        principal_name : principal_name,
        organization_name : organization_name,
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
        data: bodyt,
      };
      axios(config)
        .then(function (response) {
          if (response.status === 200) {
            openNotificationWithIcon("success", "Teacher Details Updated Successfully");
            currentUser.data[0].full_name = values.full_name;
            currentUser.data[0].title = values.title;
            currentUser.data[0].gender = values.gender;
            currentUser.data[0].whatapp_mobile = values.whatapp_mobile;

            setCurrentUser(currentUser);
            
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      const editId = encryptGlobal(
          JSON.stringify(mentorData?.organization_id)
      );
      var config2 = {
          method: 'put',
          url:
              process.env.REACT_APP_API_BASE_URL +
              '/organizations/' +
              editId,
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${currentUser?.data[0]?.token}`
          },
          data: bodys
      };
      axios(config2)
          .then((checkOrgRes) => {
              if (checkOrgRes.status == 200) {
                  openNotificationWithIcon(
                      'success',
                      'School Details Updated Successfully'
                  );
                  dispatch(getTeacherByID(currentUser?.data[0]?.mentor_id));
                  setTimeout(() => {
                    navigate("/mentorprofile");
                    window.location.reload();
                  }, 2000);
              }
          })
          .catch((err) => {
              return err.response;
          });
    },
  });
  const formLoginStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };
  const buttonStyle = {
    marginRight: '10px'
  };

  const cancelLinkStyle = {
    marginLeft: 'auto'
  };
  console.log(formik.values.state,"ss");
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
                    {/* currentUser?.data[0]?.gender === "Male" */}
                    {currentUser?.data[0]?.gender === "Male" || currentUser?.data[0]?.gender === "MALE" ? (
                      <img src={male} alt="Male" id="blah" />
                    ) : ((currentUser?.data[0]?.gender === "Female" || currentUser?.data[0]?.gender === "FEMALE")?(
                      <img src={female} alt="Female" id="blah" />):(<img src={user} alt="user" id="blah" />)
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
                <div className="form-login col-lg-3 col-sm-12">
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
                <div className="form-login col-lg-3 col-sm-12">
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
                <div className="form-login col-lg-3 col-sm-12">
                  <div className="input-blocks">
                    <label>Gender</label>
                    <select
                      id="inputState"
                      className="form-select"
                      name="gender"
                      value={formik.values.gender}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    >
                      <option value="">Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Prefer Not to Mention">Prefer Not to Mention</option>
                    </select>
                    {formik.touched.gender && formik.errors.gender ? (
                      <small className="error-cls">{formik.errors.gender}</small>
                    ) : null}
                  </div>
                </div>
                <div className="form-login col-lg-3 col-sm-12">
                  <div className="input-blocks">
                    <label>Whatsapp Number</label>
                    <input
                      type="text"
                      className="form-control"
                      id="whatapp_mobile"
                      name="whatapp_mobile"
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        const numericValue = inputValue.replace(
                          /\D/g,
                          ""
                        );
                        formik.setFieldValue("whatapp_mobile", numericValue);
                      }}
                      maxLength={10}
                      minLength={10}
                      onBlur={formik.handleBlur}
                      value={formik.values.whatapp_mobile}
                    />

                    {formik.touched.whatapp_mobile && formik.errors.whatapp_mobile ? (
                      <small className="error-cls">
                        {formik.errors.whatapp_mobile}
                      </small>
                    ) : null}
                  </div>
                </div>
                {/* New fields  */}
                <div className="form-login col-lg-3 col-sm-12">
                  <div className="input-blocks">
                    <label className="form-label">School Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="organization_name"
                      name="organization_name"
                      // onChange={formik.handleChange}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        const lettersOnly = inputValue.replace(/[^a-zA-Z0-9\s]/g, ""); 
                        formik.setFieldValue("organization_name", lettersOnly);
                      }}
                      maxLength={40}
                      onBlur={formik.handleBlur}
                      value={formik.values.organization_name}
                    />
                    {formik.errors.organization_name ? (
                      <small className="error-cls" style={{ color: "red" }}>
                        {formik.errors.organization_name}
                      </small>
                    ) : null}
                  </div>
                </div>
                <div className="form-login col-lg-6 col-sm-12">
                  <div className="input-blocks">
                    <label className="form-label">State </label>
                    <select
                                                      
                    name="state"
                    className="form-select"
                    onBlur={
                        formik.handleBlur
                    }
                    value={
                        formik.values.state
                    }

                    onChange={(e) => {
                        const selectedState =
                            e.target.value;

                        formik.setFieldValue(
                            'state',
                            selectedState
                        );
                        // formik.setFieldValue(
                        //     'district',
                        //     ''
                        // ); 
                    // {console.log(selectedState)};

                        setDistricts(
                            districtList[
                            selectedState
                            ] || []
                        );
                    }}
                >
                    <option value="">
                        Select State
                    </option>
                    {stateList.map(
                        (state) => (
                            <option
                                key={state}
                                value={
                                    state
                                }
                            >
                                {state}
                            </option>
                        )
                    )}
                </select>
                  {/* <Select
  list={stateList}
  setValue={(value) => {
    formik.setFieldValue("state", value); 
    setDistricts(districtList[value] || []); 
}}
  placeHolder={"Select State"}
  value={formik.values.state}  
/> */}
            {formik.errors.state ? (
                <small className="error-cls" style={{color:"red"}}>
                    {formik.errors.state}
                </small>
            ) : null}
                  </div>
                </div><div className="form-login col-lg-3 col-sm-12">
                  <div className="input-blocks">
                    <label className="form-label">District Name</label>
                    <select                        
                        name="district"
                        className="form-select"
                        onBlur={formik.handleBlur}
                        value={formik.values.district}
                        onChange={(e) => {
                            const selectedDistrict = e.target.value;
                            formik.setFieldValue( 'district', selectedDistrict );
                        }}
                      >
                        <option value={""}> Select District </option>
                        {districts.map( (district) => ( 
                          <option key={district} value={district}>
                                    {district}
                            </option>
                            )
                        )}
                      </select>
                    
                      {formik.errors.district ? (
                          <small className="error-cls" style={{color:"red"}}>
                              Current value : {mentorData?.district}<br/>
                              {formik.errors.district}
                          </small>
                      ) : null}
                  </div>
                </div>

                <div className="form-login col-lg-6 col-sm-12">
                  <div className="input-blocks">
                    <label className="form-label">Principal Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="principal_name"
                      name="principal_name"
                      // onChange={formik.handleChange}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        const lettersOnly = inputValue.replace(
                          /[^a-zA-Z\s]/g,
                          ""
                        );
                        formik.setFieldValue("principal_name", lettersOnly);
                      }}
                      onBlur={formik.handleBlur}
                      value={formik.values.principal_name}
                    />
                    {formik.errors.principal_name ? (
                      <small className="error-cls">
                        {formik.errors.principal_name}
                      </small>
                    ) : null}
                  </div>
                </div>
                <div className="form-login col-lg-6 col-sm-12">
                  <div className="input-blocks">
                    <label className="form-label">Principal Email ID</label>
                    <input
                      type="email"
                      className="form-control"
                      id="principal_email"
                      name="principal_email"
                      // onChange={formik.handleChange}
                      onChange={(e) => {
                        // const inputValue = e.target.value;
                        // const lettersOnly = inputValue.replace(
                        //   /[^a-zA-Z\s]/g,
                        //   ""
                        // );
                        formik.setFieldValue("principal_email", e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                      value={formik.values.principal_email}
                    />
                    {formik.errors.principal_email ? (
                      <small className="error-cls">
                        {formik.errors.principal_email}
                      </small>
                    ) : null}
                  </div>
                </div>
                <div className="form-login col-lg-6 col-sm-12">
                  <div className="input-blocks">
                    <label>Principal Mobile/WhatsApp No</label>
                    <input
                      type="text"
                      className="form-control"
                      id="principal_mobile"
                      name="principal_mobile"
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        const numericValue = inputValue.replace(
                          /\D/g,
                          ""
                        );
                        formik.setFieldValue("principal_mobile", numericValue);
                      }}
                      maxLength={10}
                      minLength={10}
                      onBlur={formik.handleBlur}
                      value={formik.values.principal_mobile}
                    />

                    {formik.errors.principal_mobile ? (
                      <small className="error-cls">
                        {formik.errors.principal_mobile}
                      </small>
                    ) : null}
                  </div>
                </div>
                <div className="form-login" style={formLoginStyle}>
                  <button
                    style={buttonStyle}
                    
                    type="submit"
                    className={`btn btn-warning  ${
                      !(formik.dirty && formik.isValid) ? "default" : "primary"
                    }`}
                    disabled={!(formik.isValid)}
                  >
                    Submit
                  </button>
                  <Link className="btn btn-cancel" to={"/mentorprofile"}  style={cancelLinkStyle}>
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
