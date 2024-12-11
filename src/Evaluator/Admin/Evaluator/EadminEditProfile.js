/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useEffect } from 'react';
import { Row, Col, Form, Label } from 'reactstrap';
// import { withRouter } from 'react-router-dom';
// import '../../Admin/Userli';
// import Layout from '../Pages/Layout';
import { Button } from '../../../stories/Button';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { Link } from "react-router-dom";
import male from "../../../assets/img/admin.jpg";
import { useLocation } from "react-router-dom";

// import { InputBox } from '../../../stories/InputBox/InputBox';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
    getCurrentUser,
    openNotificationWithIcon
} from '../../../helpers/Utils';
import { useNavigate } from 'react-router-dom';
import { getAdminEvalutorsList } from '../../../redux/actions';
// import { getAdmin } from '../store/admin/actions';
import { useDispatch } from 'react-redux';
import Select from '../../Admin/Challenges/pages/Select';
// import { getDistrictData } from '../../redux/studentRegistration/actions';

import { useSelector } from 'react-redux';
import { encryptGlobal } from '../../../constants/encryptDecrypt';
const EditProfile = (props) => {
    // here we can edit the users details //
    const location = useLocation();
    const navigate = useNavigate();
    const currentUser = getCurrentUser('current_user');
    const dispatch = useDispatch();
    const mentorData = location.state || {};
  console.log(mentorData,"mentorData");
  


    const inputPassword = {
        placeholder: 'Enter Password',
        showEyeIcon: true
        // className: 'defaultInput'
    };

    const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    const getValidationSchema = (data) => {
        // where data = mentorData //
        const adminValidation = Yup.object({
            name: Yup.string()
                .matches(/^[aA-zZ\s]+$/, 'Invalid name ')
                .min(2, 'Enter a valid name')
                .required('Name is Required'),
            email: Yup.string()
                .required('required')
                .trim()
                .email('Please Enter Valid Email Id'),
                password: Yup.string()
                .trim()
                // .required('Please enter Password')
                .matches(
                    passwordRegex,
                    'Password must contains minimum 8 characters, including one letter, one number, and one special character.'
                )
         
        });
        if (data?.mentor_id)
            if (data?.evaluator_id)
                // adminValidation['phone'] = Yup.string()
                //     .matches(phoneRegExp, 'Mobile number is not valid')
                //     .min(10, 'Enter a valid mobile number')
                //     .max(10, 'Enter a valid mobile number')
                //     .required('Mobile Number is Required');
                adminValidation['district'] = Yup.string()
                    .matches(/^[aA-zZ\s]+$/, 'Invalid District Name ')
                    .min(2, 'Enter a valid district')
                    .required('District is Required');
        return adminValidation;
    };
    const getInitialValues = (data) => {
        const commonInitialValues = {
            name: mentorData?.full_name || mentorData?.user?.full_name,
            email: mentorData?.username || mentorData?.user?.username,
            password: mentorData?.mobile || mentorData?.user?.mobile
        };
        if (!data?.admin_id) {
            commonInitialValues['phone'] = mentorData.mobile;
            if (!data?.mentor_id)
                commonInitialValues['district'] = mentorData.district;
        }
        return commonInitialValues;
    };
    const formik = useFormik({
        initialValues: getInitialValues(mentorData),
        validationSchema: getValidationSchema(mentorData),
        onSubmit: (values) => {
            var pass = values.password ? values.password.trim() : '';
            const key = CryptoJS.enc.Hex.parse(
                '253D3FB468A0E24677C28A624BE0F939'
            );
            const iv = CryptoJS.enc.Hex.parse(
                '00000000000000000000000000000000'
            );
            const encrypted = CryptoJS.AES.encrypt(pass, key, {
                iv: iv,
                padding: CryptoJS.pad.NoPadding
            }).toString();
            // values.password = encrypted;
            const full_name = values.name;
            const email = values.email;
            const password = values.password;

            // const mobile = values.phone;
            // const district = values.district;
            const evlId = encryptGlobal(
                JSON.stringify(mentorData.evaluator_id)
            );
            const admId = encryptGlobal(JSON.stringify(mentorData.admin_id));
            const mentId = encryptGlobal(JSON.stringify(mentorData.mentor_id));
            const body = mentorData?.evaluator_id
                ? {
                      full_name: full_name,
                      username: email,
                        // password: encrypted
                      //   district: district
                  }
                : mentorData?.admin_id
                ? JSON.stringify({
                      full_name: full_name,
                      username: email
                  })
                : JSON.stringify({
                      full_name: full_name,
                      username: email,
                      mobile: email
                  });
            if (mentorData && mentorData.mobile !== password) {
                body['password'] = encrypted;
            }

            const url = mentorData?.evaluator_id
                ? process.env.REACT_APP_API_BASE_URL + '/evaluators/' + evlId
                : mentorData?.admin_id
                ? process.env.REACT_APP_API_BASE_URL + '/admins/' + admId
                : process.env.REACT_APP_API_BASE_URL + '/mentors/' + mentId;
            var config = {
                method: 'put',
                url: url,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${currentUser?.data[0]?.token}`
                },
                data: body
            };
            axios(config)
                .then(function (response) {
                    if (response.status === 200) {
                        mentorData?.evaluator_id
                            ? dispatch(getAdminEvalutorsList())
                            : mentorData?.admin_id && dispatch(getAdmin());
                        openNotificationWithIcon(
                            'success',
                            'Updated Successfully'
                        );
                        setTimeout(() => {
                            navigate('/eadmin/evaluator');
                        }, 200);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
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
    return (
        <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>Evaluator Edit Profile</h4>
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
                     
                       <img src={male} alt="Female" id="blah" />
                      </div>
                      <div className="profile-contentname">
                        <h2>
                          {
                            mentorData?.full_name}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                 
                  <div className="form-login col-lg-4 col-sm-12">
                    <div className="input-blocks">
                      <label className="form-label">Evaluator Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        // onChange={formik.handleChange}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          const lettersOnly = inputValue.replace(
                            /[^a-zA-Z\s]/g,
                            ""
                          );
                          formik.setFieldValue("name", lettersOnly);
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                      />
                      {formik.touched.name && formik.errors.name ? (
                        <small className="error-cls">
                          {formik.errors.name}
                        </small>
                      ) : null}
                    </div>
                  </div>
                  {/* </div> */}

                {/* <div className="row"> */}
                  
                  <div className="form-login col-lg-4 col-sm-12">
                    <div className="input-blocks">
                      <label>Email Address</label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        onChange={formik.handleChange}

                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                      />
  
                      {formik.touched.whatapp_mobile && formik.errors.whatapp_mobile ? (
                        <small className="error-cls">
                          {formik.errors.whatapp_mobile}
                        </small>
                      ) : null}
                    </div>
                  </div>
                  <div className="form-login col-lg-4 col-sm-12">
                    <div className="input-blocks">
                      <label>Password</label>
                      <input
                        type="text"
                        className="form-control"
                        id="reg-password"
                                                // type="password"
                                                name="password"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.password}
                                                // maxLength={8}
                                                minLength={8}
                      />
  
  {formik.touched.password &&
                                            formik.errors.password ? (
                                                <small className="error-cls">
                                                    {formik.errors.password}
                                                </small>
                                            ) : null}
                    </div>
                  </div>
                  {/* New fields  */}
                  <div className="form-login" style={formLoginStyle}>
  <button
    style={buttonStyle}
    type="submit"
    className={`btn btn-warning  ${
      !(formik.dirty && formik.isValid) ? "default" : "primary"
    }`}
    disabled={!(formik.dirty && formik.isValid)}
  >
    Submit
  </button>
  <Link className="btn btn-cancel" to={"/eadmin/evaluator"} style={cancelLinkStyle}>
    Cancel
  </Link>
</div>

                  {/* <div className="form-login" style={formLoginStyle}>
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
                    <Link className="btn btn-cancel" to={"/eadmin/evaluator"}  style={cancelLinkStyle}>
                      Cancel
                    </Link>
                  </div> */}
                </div>
              </div>
            </div>
          </form>
          {/* /product list */}
        </div>
      </div>

    );
};

export default EditProfile;
