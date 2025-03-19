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
  getCurrentUser,
  openNotificationWithIcon,
} from "../../../../helpers/Utils";
import { useNavigate } from "react-router-dom";
// import { getAdminEvalutorsList } from "../../../redux/actions";
// import { getAdmin } from '../store/admin/actions';
import { useDispatch } from "react-redux";
// import Select from "../../Admin/Challenges/pages/Select";
// import { getDistrictData } from '../../redux/studentRegistration/actions';
import {themesList} from "../../../../Team/IdeaSubmission/themesData";
import {languageOptions} from "../../../../RegPage/ORGData";
import { useSelector } from "react-redux";
import { encryptGlobal } from "../../../../constants/encryptDecrypt";
const EditProfile = (props) => {
  // here we can edit the users details //
  const phoneRegExp = /^[0-9]+$/;
const allDataLanguages= ["All Languages",...languageOptions];
const allDataThemes= ["All Themes",...themesList];


  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = getCurrentUser("current_user");
  const dispatch = useDispatch();
  const mentorData = location.state || {};
  console.log(mentorData, "mentorData");

 

  const getValidationSchema = (data) => {
    // where data = mentorData //
    const adminValidation = Yup.object({
     
        language: Yup.string()
                // .max(40)
                .required(<span style={{ color: "red" }}>Please Select Language</span>),
                theme: Yup.string()
                // .max(40)
                .required(<span style={{ color: "red" }}>Please Select Theme</span>),
     
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
     
      language :mentorData?.language || "",
      theme :mentorData?.theme || ""

    };
    
    return commonInitialValues;
  };
  const formik = useFormik({
    initialValues: getInitialValues(mentorData),
    validationSchema: getValidationSchema(mentorData),
    onSubmit: (values) => {
    
        const evalid = encryptGlobal(JSON.stringify(mentorData.evaluation_process_id));
      
        // const body = {
                   
        //   language: values.language === "All Languages" ? languageOptions.join(", ") : values.language,
        //   theme: values.theme === "All Themes"
        //     ? themesList.join(", ")      
        //     : values.theme,             
        // };
        const body = {
          language: values.language.trim() === "All Languages"
            ? languageOptions.map(lang => lang.trim()).join(",")
            : values.language.trim(),
        
          theme: values.theme.trim() === "All Themes"
            ? themesList.map(theme => theme.trim()).join(",")
            : values.theme.trim(),
        };
        console.log(body,"body");
        // const body = {
        //   language: selectedLanguage === "All Languages" ? languageOptions : [selectedLanguage],
        //     theme: selectedTheme === "All Themes" ? themesList : [selectedTheme],
        //   };
    //   if (mentorData?.language !== values.language) {
    //     body["language"] = values.language;
    //   }
    //   if (mentorData?.theme !== values.theme) {
    //     body["theme"] = values.theme;
    //   }

      const url = process.env.REACT_APP_API_BASE_URL + `/evaluationProcess/${evalid}`;

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
           openNotificationWithIcon(
                                  'success',
                                  'Theme and  Update Successfully'
                              );
                              navigate('/eadmin/evaluationProcess');
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
    if (mentorData.language ) {
      const allLanguagesSelected = mentorData.language.split(",").sort().join(",") === languageOptions.sort().join(",");
      formik.setFieldValue("language", allLanguagesSelected ? "All Languages" : mentorData.language);
      
    }
    
  }, [mentorData.language]);
  
  useEffect(() => {
    if (mentorData.theme) {
      const allThemes = themesList.join(","); 
      const allThemesSelected = mentorData.theme === allThemes;
      formik.setFieldValue("theme", allThemesSelected ? "All Themes" : mentorData.theme);
    }
  }, [mentorData.theme, themesList]);
  
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
            <h4>Update Theme and Language</h4>
            {/* <h6>User Profile</h6> */}
          </div>
        </div>
        {/* /product list */}
        <form onSubmit={formik.handleSubmit}>
          <div className="card">
            <div className="card-body">
              {/* <div className="profile-set">
                <div className="profile-head"></div>
                <div className="profile-top">
                  <div className="profile-content">
                    <div className="profile-contentimg">
                      <img src={male} alt="Female" id="blah" />
                    </div>
                    <div className="profile-contentname">
                      <h2>{mentorData?.full_name}</h2>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="row">
               

               
                <div className="form-login col-lg-6 col-sm-12">
                  <div className="input-blocks">
                    <label>Language</label>
                    <select
                        id="inputState"
                        className="form-select"
                        name="language"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.language}
                      >
                        <option value={""}>Select Language</option>
                        {allDataLanguages.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    {formik.touched.language && formik.errors.language ? (
                      <small className="error-cls">
                        {formik.errors.language}
                      </small>
                    ) : null}
                  </div>
                </div>
                <div className="form-login col-lg-6 col-sm-12">
                  <div className="input-blocks">
                    <label>Theme</label>
                    <select
                        id="inputState"
                        className="form-select"
                        name="theme"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.theme}
                      >
                        <option value={""}>Please Select Theme</option>
                        {allDataThemes.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    {formik.touched.theme && formik.errors.theme ? (
                      <small className="error-cls">
                        {formik.errors.theme}
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
                    onClick={() => navigate("/eadmin/evaluationProcess")}
                    type="button"
                    className="btn btn-secondary"
                    style={{ marginLeft: "auto" }}
                    // className="btn btn-cancel"
                    // to={"/eadmin/evaluator"}
                    // style={cancelLinkStyle}
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

export default EditProfile;
