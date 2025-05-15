/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState ,useEffect} from "react";
import { Link } from "react-router-dom";
import {
  getCurrentUser,
  openNotificationWithIcon,
} from "../../helpers/Utils";
import { Row, Col, Form, Label, FormGroup } from 'reactstrap';
import Select from "react-select";

import { useLocation } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { encryptGlobal } from "../../constants/encryptDecrypt";
import { useNavigate } from "react-router-dom";

const DiesShift = () => {
  const location = useLocation();
  const mentorData = location.state || {};
  const navigate = useNavigate();
const [diesCodeList,setDiesCodeList]=useState([]);
  const currentUser = getCurrentUser("current_user");
  const getValidationSchema = () => {
    const adminValidation = Yup.object({
    
      organization_code: Yup.string().optional(),
     
    
    });
    return adminValidation;
  };
  
  
  const getInitialValues = (mentorData) => {
    const commonInitialValues = {
        full_name: mentorData.full_name,
        organization_code: mentorData?.organization_code,
    };
    return commonInitialValues;
  };
  const formik = useFormik({
    initialValues: getInitialValues(mentorData),
    validationSchema: getValidationSchema(),
    onSubmit: (values) => {
      const organization_code = values.organization_code;
     
      const body = {
        full_name: mentorData.full_name,
        
        organization_code: organization_code,
      }
      ;
    
      const ment = encryptGlobal(JSON.stringify(mentorData.mentor_id));
      const url = process.env.REACT_APP_API_BASE_URL + "/mentors/" + ment;
      var config = {
        method: "put",
        url: url,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser?.data[0]?.token}`,
        },
        data: JSON.stringify(body),
      };
      axios(config)
        .then(function (response) {
          if (response.status === 200) {
            openNotificationWithIcon("success", "Updated Successfully");
           
            navigate("/coo-search");
           
          }
        })
        .catch(function (error) {
          if (error?.response?.data?.status === 400) {
            const apiErrors = error?.response?.data?.errors || [];
            
            if (apiErrors.includes('"username" must be a valid email')) {
              openNotificationWithIcon("error", "Please Enter Valid Email Address");
            } else {
              openNotificationWithIcon("error", "Bad Request");
            }
          } 
          else if (error?.response?.data?.status === 420) {
            if (error?.response?.data?.message === "mobile must be unique") {
              openNotificationWithIcon("error", "Mobile number entered is already in use");
            } else {
              openNotificationWithIcon("error", "Email ID entered is already in use");
            }
          }
        });
    },
  });
   useEffect(() => {
        // This function fetches list of Registered DiesCodes from the API //

    let enParamDatas = encryptGlobal(
      JSON.stringify({
       
        state: currentUser.data[0]?.state_name,
      })
    );
          var config = {
              method: 'get',
              url:
                  process.env.REACT_APP_API_BASE_URL +
                  `/organizations/allcodes?Data=${enParamDatas}`,
              headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                  Authorization: `Bearer ${currentUser.data[0]?.token}`
              }
          };
          axios(config)
              .then(function (response) {
                  if (response.status === 200) {
                    const raw = response.data.data; 
      const options = raw.map(item => ({
        value: item.organization_code,
        label: item.organization_code   
      }));
                      setDiesCodeList(options);
                  }
              })
              .catch(function (error) {
                  console.log(error);
              });
      }, []);
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
       <h3 className="m-2" 
        style={{ position: 'sticky', top: '70px', zIndex: 1000, padding: '10px',backgroundColor: 'white', display: 'inline-block' , color: '#fe9f43',fontSize:"16px" }}
        >Mentors
        </h3>
      <div className="content">
      <div className="EditPersonalDetails new-member-page">
                <Row>
                    <Col className="col-xl-10 offset-xl-1 offset-md-0">
                        <h3 className="mb-5">Shifting Mentor to Udisecode  </h3>
                        <div>
        <Form onSubmit={formik.handleSubmit} isSubmitting >
          <div className="create-ticket register-block">
             
          <Row  className="mb-3 modal-body-table search-modal-header">
          <div className={`col-md-6`}>
                            <label htmlFor="organization_code" className="form-label">
                            UDISE Code
                            </label>&nbsp;
                           
                            <input
                      type="text"
                      className="form-control"
                      id="full_name"
                      name="full_name"
                       defaultValue={mentorData?.organization_code}
                    readOnly="readonly"
                   
                    />
                          </div>
          <div className={`col-md-6`}>
                            <label htmlFor="organization_code" className="form-label">
                              UDISE Code
                            </label>&nbsp;
                           
                              <Select
        classNamePrefix="react-select"
        options={diesCodeList}
        placeholder=" Type here to Select Your UDISE Code"
        value={diesCodeList.find(option => option.value === formik.values.organization_code)}
        onChange={(selectedOption) => formik.setFieldValue("organization_code", selectedOption?.value)}
        onBlur={formik.handleBlur}
      />
                            {formik.touched.organization_code && formik.errors.organization_code ? (
                              <small className="error-cls">
                                {formik.errors.organization_code}
                              </small>
                            ) : null}
                          </div>
                 
                 
                  </Row>
                 
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
                  <Link className="btn btn-cancel" to={"/coo-search"}  style={cancelLinkStyle}>
                    Cancel
                  </Link>
                </div>
          </div>
        </Form>
      </div>
</Col>
</Row>
</div>

      </div>
    </div>
  );
};

export default DiesShift;
