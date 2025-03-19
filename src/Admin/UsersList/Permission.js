/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useEffect } from "react";

// import { Button } from "../../../stories/Button";
import axios from "axios";
import CryptoJS from "crypto-js";
// import { Link } from "react-router-dom";
// import male from "../../../assets/img/admin.jpg";
import { useLocation } from "react-router-dom";

// import { InputBox } from '../../../stories/InputBox/InputBox';
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  getCurrentUser,setCurrentUser,
  openNotificationWithIcon,
} from "../../helpers/Utils";
import { useNavigate } from "react-router-dom";
// import { getAdminEvalutorsList } from "../../../redux/actions";
// import { getAdmin } from '../store/admin/actions';
import { useDispatch } from "react-redux";
// import Select from "../../Admin/Challenges/pages/Select";
// import { getDistrictData } from '../../redux/studentRegistration/actions';
// import {themesList} from "../../../../Team/IdeaSubmission/themesData";
import {menusList} from "../../RegPage/ORGData";
import { useSelector } from "react-redux";
import { encryptGlobal } from "../../constants/encryptDecrypt";
const Permission = (props) => {
  // here we can edit the users details //
  const phoneRegExp = /^[0-9]+$/;
// const allDataLanguages= ["All Languages",...languageOptions];
// const allDataThemes= ["All Themes",...themesList];
const allDataMenus= ["ALL",...menusList];


  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = getCurrentUser("current_user");
  const dispatch = useDispatch();
  const mentorData = location.state || {};
  console.log(mentorData, "mentorData");

 

  const getValidationSchema = (data) => {
    // where data = mentorData //
    const adminValidation = Yup.object({
     
      permission : Yup.string()
                // .max(40)
                .required(<span style={{ color: "red" }}>Please Select Permission</span>),
               
     
    });
    if (data?.mentor_id)
      if (data?.evaluator_id)
       
        adminValidation["district"] = Yup.string()
          .matches(/^[aA-zZ\s]+$/, "Invalid District Name ")
          .min(2, "Enter a valid district")
          .required("District is Required");
    return adminValidation;
  };
  const getInitialValues = (data) => {
    const commonInitialValues = {
     
      permission :mentorData?.permission || "",

    };
    
    return commonInitialValues;
  };
  const formik = useFormik({
    initialValues: getInitialValues(mentorData),
    validationSchema: getValidationSchema(mentorData),
    onSubmit: (values) => {
    console.log(mentorData.admin_id,"adminId");
        const evalid = encryptGlobal(JSON.stringify(mentorData.admin_id));
      
        const body = {
                   
          permission : values.permission  === "ALL" ? menusList.join(",") : values.permission,
          full_name: mentorData.user.full_name,
          username: mentorData.user.username,        

        };
        // console.log(body,"body");
      

      const url = process.env.REACT_APP_API_BASE_URL + `/admins/${evalid}`;

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
            // currentUser.data[0].permission = values.permission;
            //  setCurrentUser(currentUser);

           openNotificationWithIcon(
                                  'success',
                                  'Permission Update Successfully'
                              );
                              navigate('/admins');
          }
        })
        .catch(function (error) {
          console.log(error);
          if(error?.response?.data?.status === 400){
            openNotificationWithIcon("error", error.response.data?.message !== "Bad Request" ?  error.response.data?.message :"Email Id is Invalid");
            }else{
              openNotificationWithIcon("error", "Email Id is Invalid");
            }
        });
    },
  });
  useEffect(() => {
    if (mentorData.permission ) {
      const allLanguagesSelected = mentorData.permission.split(",").sort().join(",") === menusList.sort().join(",");
      formik.setFieldValue("permission", allLanguagesSelected ? "ALL" : mentorData.permission);
      
    }
    
  }, [mentorData.permission]);
  
 
  
  const formLoginStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };
  const buttonStyle = {
    marginRight: "10px",
  };

  const cancelLinkStyle = {
    marginLeft: "auto",
  };
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Update Permission</h4>
            {/* <h6>User Profile</h6> */}
          </div>
        </div>
        {/* /product list */}
        <form onSubmit={formik.handleSubmit}>
          <div className="card">
            <div className="card-body">
             
              <div className="row">
               

               
                <div className="form-login col-lg-6 col-sm-12">
                  <div className="input-blocks">
                    <label>Menus</label>
                    <select
                        id="inputState"
                        className="form-select"
                        name="permission"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.permission}
                      >
                        <option value={""}>Select Permission</option>
                        {allDataMenus.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    {formik.touched.permission && formik.errors.permission ? (
                      <small className="error-cls">
                        {formik.errors.permission}
                      </small>
                    ) : null}
                  </div>
                </div>
              
             

                <div className="form-login" style={formLoginStyle}>
                  <button
                    style={buttonStyle}
                    type="submit"
                    className={`btn btn-warning  ${
                      !formik.dirty || !formik.isValid ? "default" : "primary"
                    }`}
                    disabled={!formik.dirty || !formik.isValid}
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => navigate("/admins")}
                    type="button"
                    className="btn btn-secondary"
                    style={{ marginLeft: "auto" }}
                    
                  >
                    Cancel
                  </button>
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

export default Permission;
