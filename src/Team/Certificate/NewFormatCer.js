/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, getNormalHeaders } from "../../helpers/Utils";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import courseCompletionCertificate from "../../assets/img/Certificates/Studentcom.jpg";
// import ideaSubmissionCertificate from "../../assets/img/Certificates/StudentApp.jpg";
// import participateCertificate from "../../assets/img/Certificates/stuparticipation.jpg";
import jsPDF from "jspdf";
import CourseCertificate from "../../assets/img/Certificates/Studentcom.jpg";
import IdeaCertificate from "../../assets/img/Certificates/stuparticipation.jpg";
import L2Certificate from "../../assets/img/Certificates/StudentApp.jpg";
import { Container, Row, Col, Table } from "reactstrap";
import TncourseCompletionCertificate from "../../assets/img/Certificates/TnStuCourseFinal.jpg";
import TnparticipateCertificate from "../../assets/img/Certificates/TnStuParticipateFinal.jpg";
import users from "../../assets/img/admin.jpg";
import moment from "moment";

import { useTranslation } from "react-i18next";
import { MdOutlineFileDownload } from "react-icons/md";
import {
  updateStudentBadges,
  updateStudentCertificate,
} from "../../redux/studentRegistration/actions";
import { Link } from "react-router-dom";
import { getLanguage } from "../../constants/languageOptions";
import { URL, KEY } from "../../constants/defaultValues";

import { encryptGlobal } from "../../constants/encryptDecrypt";
const Instructions = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const pdfRef = useRef(null);
  const currentUser = getCurrentUser("current_user");

  const handleCertificateDownload = () => {
    // Handles downloading the certificate using the full name and organization name

    const fullName = currentUser?.data[0]?.full_name;
    const collegeName = currentUser?.data[0]?.organization_name;

    const finalCollegeName = currentUser?.data[0]?.organization_name;
    const userState = currentUser?.data[0]?.state;
    const doc = new jsPDF("l", "mm", [298, 211]);
    doc.addImage(CourseCertificate, "JPEG", 0, 0, 298, 211);
    doc.setFont("Times New Roman");
    doc.setFontSize(15);
    doc.setTextColor("black");
    const badge = "the_finisher";
    const fullNameWidth =
      (doc.getStringUnitWidth(fullName) * doc.getFontSize()) /
      doc.internal.scaleFactor;
    const x = (298 - fullNameWidth) / 2;
    const y = 110;
    doc.text(fullName, x, y);

    const collegeNameWidth =
      (doc.getStringUnitWidth(collegeName) * doc.getFontSize()) /
      doc.internal.scaleFactor;
    const collegeNameY = y + 15;
    const leftMargin = 85;
    doc.text(finalCollegeName, leftMargin, collegeNameY);

    


    const certName = `${fullName.replace(/\s+/g, "_")}.pdf`;
    doc.save(certName);
    cerificateData();
      dispatch(
        updateStudentBadges(
          { badge_slugs: [badge] },
          currentUser?.data[0]?.user_id,
          language,
          t
        )
      );
  };
  const handleCertificateDownloadTN = () => {
    // Handles downloading the certificate using the full name and organization name

    const fullName = currentUser?.data[0]?.full_name;
    const collegeName = currentUser?.data[0]?.organization_name;

    const finalCollegeName = currentUser?.data[0]?.organization_name;
    const userState = currentUser?.data[0]?.state;
    const doc = new jsPDF("l", "mm", [298, 211]);
    doc.addImage(TncourseCompletionCertificate, "JPEG", 0, 0, 298, 211);
    doc.setFont("Times New Roman");
    doc.setFontSize(15);
    doc.setTextColor("black");
    const badge = "the_finisher";
    const formattedCourseDate1 = courseDate ? moment(courseDate).format("DD-MM-YYYY") : "No Date";
   
    const pageWidth1 = doc.internal.pageSize.getWidth();
    const fullNameWidth =
  (doc.getStringUnitWidth(fullName) * doc.getFontSize()) /
  doc.internal.scaleFactor;
const x = pageWidth1 - fullNameWidth - 110;
const y = 95;
doc.setFontSize(15);
doc.text(fullName, x, y);

const collegeNameY = y + 14;
const pageWidth = doc.internal.pageSize.getWidth();

const finalCollegeNameWidth =
  (doc.getStringUnitWidth(finalCollegeName) * doc.getFontSize()) / doc.internal.scaleFactor;
const xRightAlign = pageWidth - finalCollegeNameWidth - 160; 
doc.text(finalCollegeName, xRightAlign, collegeNameY);

const pageWidth2 = doc.internal.pageSize.getWidth();

const courseDateWidth = (doc.getStringUnitWidth(formattedCourseDate1) * doc.getFontSize()) / doc.internal.scaleFactor;
const xCourseDate1 = pageWidth2 - courseDateWidth - 40; 
const yCourseDate1 = 190; 
doc.setFontSize(12);
doc.text(formattedCourseDate1, xCourseDate1, yCourseDate1);

    const certName = `${fullName.replace(/\s+/g, "_")}.pdf`;
    doc.save(certName);
    cerificateData();
      dispatch(
        updateStudentBadges(
          { badge_slugs: [badge] },
          currentUser?.data[0]?.user_id,
          language,
          t
        )
      );
  };
  const handleCertificateDownloadTN1 = () => {
    // Handles downloading the certificate using the full name and organization name

    const fullName = currentUser?.data[0]?.full_name;
    const collegeName = currentUser?.data[0]?.organization_name;

    const finalCollegeName = currentUser?.data[0]?.organization_name;
    const userState = currentUser?.data[0]?.state;
    const doc = new jsPDF("l", "mm", [298, 211]);
    doc.addImage(TnparticipateCertificate, "JPEG", 0, 0, 298, 211);
    doc.setFont("Times New Roman");
    doc.setFontSize(15);
    doc.setTextColor("black");
    const badge = "the_finisher";
    const formattedCourseDate = surveyDates ? moment(surveyDates).format("DD-MM-YYYY") : "No Date";
   
    const pageWidth1 = doc.internal.pageSize.getWidth();
    const fullNameWidth =
  (doc.getStringUnitWidth(fullName) * doc.getFontSize()) /
  doc.internal.scaleFactor;
const x = pageWidth1 - fullNameWidth - 110;
const y = 95;
doc.text(fullName, x, y);

const collegeNameY = y + 14;
const pageWidth = doc.internal.pageSize.getWidth();
const finalCollegeNameWidth =
  (doc.getStringUnitWidth(finalCollegeName) * doc.getFontSize()) / doc.internal.scaleFactor;
const xRightAlign = pageWidth - finalCollegeNameWidth - 160; 
doc.text(finalCollegeName, xRightAlign, collegeNameY);

const pageWidth2 = doc.internal.pageSize.getWidth();
const courseDateWidth = (doc.getStringUnitWidth(formattedCourseDate) * doc.getFontSize()) / doc.internal.scaleFactor;
const xCourseDate = pageWidth2 - courseDateWidth - 40; 
const yCourseDate = 190; 
doc.setFontSize(12);
doc.text(formattedCourseDate, xCourseDate, yCourseDate);

    const certName = `${fullName.replace(/\s+/g, "_")}.pdf`;
    doc.save(certName);
     
  };
  const handleCertificateDownload1 = () => {
    // Handles downloading the certificate using the full name and organization name

    const content = pdfRef.current;
    const fullName = currentUser?.data[0]?.full_name;
    const collegeName = currentUser?.data[0]?.organization_name;

    const finalCollegeName = currentUser?.data[0]?.organization_name;
    const doc = new jsPDF("l", "mm", [298, 211]);

    doc.addImage(IdeaCertificate, "JPEG", 0, 0, 298, 211);
    doc.setFont("Times New Roman");
    doc.setFontSize(15);
    doc.setTextColor("black");

    const fullNameWidth =
      (doc.getStringUnitWidth(fullName) * doc.getFontSize()) /
      doc.internal.scaleFactor;
    const x = (298 - fullNameWidth) / 2;
    const y = 111;
    doc.text(fullName, x, y);

    const collegeNameWidth =
      (doc.getStringUnitWidth(finalCollegeName) * doc.getFontSize()) /
      doc.internal.scaleFactor;
    const collegeNameY = y + 13;
    const leftMargin = 85;
    doc.text(finalCollegeName, leftMargin, collegeNameY);

    const certName = `${fullName.replace(/\s+/g, "_")}.pdf`;
    doc.save(certName);
  };
 
  const handleCertificateDownload2 = () => {
    // Handles downloading the certificate using the full name and organization name

    const fullName = currentUser?.data[0]?.full_name;
    const collegeName = currentUser?.data[0]?.organization_name;
    const doc = new jsPDF("l", "mm", [298, 211]);
    const finalCollegeName = currentUser?.data[0]?.organization_name;
    doc.addImage(L2Certificate, "JPEG", 0, 0, 298, 211);
    doc.setFont("Times New Roman");
    doc.setFontSize(15);
    doc.setTextColor("black");

    const fullNameWidth =
      (doc.getStringUnitWidth(fullName) * doc.getFontSize()) /
      doc.internal.scaleFactor;
    const x = (298 - fullNameWidth) / 2;
    const y = 107;
    doc.text(fullName, x, y);

    const collegeNameWidth =
      (doc.getStringUnitWidth(collegeName) * doc.getFontSize()) /
      doc.internal.scaleFactor;
    const collegeNameY = y + 15;
    const leftMargin = 85;
    doc.text(finalCollegeName, leftMargin, collegeNameY);

    const certName = `${fullName.replace(/\s+/g, "_")}.pdf`;
    doc.save(certName);
  };
  const currentUser1 = getCurrentUser("current_user");
  const userID = currentUser?.data[0]?.user_id;
  const [postSurveyStatus, setPostSurveyStatus] = useState("");
  const [ideaStatus, setIdeaStatus] = useState("");

  const [resList, setResList] = useState("");
  const [status, setStatus] = useState("");
  const [score, setScore] = useState("");
  const [surveyDates, setSurveyDates] = useState(null);
  const [courseDate, setCourseDate] = useState(null);
  const [course, setCourse] = useState(false);
  const [data, setData] = useState({});
  const [ideaEnabled, setIdeaEnabled] = useState(false);

  const language = useSelector(
    (state) => state?.studentRegistration?.studentLanguage
  );
  const user = currentUser.data[0]?.student_id;
 
  useEffect(() => {
    StateData();
    stuCoursePercent();
    Ideas();
    submittedApi();
    certificateApi();
    apiData(language);
  }, []);



 
  const StateData = async () => {
               // This function fetches states specific list from the API //

    const fectchTecParam = encryptGlobal(
      JSON.stringify({
        state: currentUser?.data[0]?.state,
      })
    );
    var config = {
      method: "get",
      url:
        process.env.REACT_APP_API_BASE_URL +
        `/states/specific?Data=${fectchTecParam}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${currentUser.data[0]?.token}`,
      },
    };
    await axios(config)
      .then(function (response) {
        if (response.status === 200) {
          setResList(response.data.data[0].certificate);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const apiData = (language) => {
    const locale = getLanguage(language);

    let enDataone = encryptGlobal("4");
    let axiosConfig = getNormalHeaders(KEY.User_API_Key);

    let enParamData = encryptGlobal(
      JSON.stringify({
        role: "STUDENT",
        locale,
        user_id: userID,
      })
    );
    axiosConfig["params"] = {
      Data: enParamData,
    };

    axios
      .get(`${URL.getPostSurveyList}/${enDataone}`, axiosConfig)
      .then((postSurveyRes) => {
        if (postSurveyRes?.status == 200) {
          setPostSurveyStatus(postSurveyRes.data.data[0].progress);
        }
      })
      .catch((err) => {
        return err.response;
      });
  };
  const cerificateData = () => {
    let enParamData = encryptGlobal(
      JSON.stringify(currentUser?.data[0]?.user_id)
    );
    var config = {
      method: "get",
      url:
        process.env.REACT_APP_API_BASE_URL +
        `/students/${enParamData}/studentCertificate`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${currentUser.data[0]?.token}`,
      },
    };
    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          // console.log(response, "res");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const certificateApi = () => {
               // This function fetches Certificate dates from the API //

    const Param = encryptGlobal(JSON.stringify(currentUser?.data[0]?.user_id));
    var configidea = {
      method: "get",
      url:
        process.env.REACT_APP_API_BASE_URL +
        `/students/certificateDates/${Param}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${currentUser.data[0]?.token}`,
      },
    };
    axios(configidea)
      .then(function (response) {
        if (response.status === 200) {
          if (response.data.data.length > 0) {
            const postSurveyDate =
              response?.data?.data[0]?.postSurvey[0]?.created_at;
            const courseDateValue =
              response?.data?.data[0]?.course[0]?.created_at;

            setSurveyDates(postSurveyDate || null);
            setCourseDate(courseDateValue || null);
          } else {
            // console.log("No data available:", response.data.data);
            setSurveyDates(null);
            setCourseDate(null);
          }
        }
      })
      .catch(function (error) {
        // if (error.response.status === 404) {
        //   //   seterror4( true);
        // }
      });
  };
  const TeamId =
    currentUser?.data[0]?.type_id === 0
      ? currentUser?.data[0]?.student_id
      : currentUser?.data[0]?.type_id;
  const submittedApi = () => {
               // This function fetches idea submission details from the API //

    const Param = encryptGlobal(
      JSON.stringify({
        team_id: currentUser?.data[0]?.team_id,
      })
    );
    var configidea = {
      method: "get",
      url:
        process.env.REACT_APP_API_BASE_URL +
        `/challenge_response/submittedDetails?Data=${Param}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${currentUser.data[0]?.token}`,
      },
    };
    axios(configidea)
      .then(function (response) {
        if (response.status === 200) {
          if (response.data.data && response.data.data.length > 0) {
            const data = response.data.data[0];

            setIdeaStatus(response?.data?.data[0]?.status);
          }
        }
      })
      .catch(function (error) {
        if (error.response.status === 404) {
          //   seterror4( true);
        }
      });
  };

  const stuCoursePercent = () => {
               // This function fetches students Course percentage from the API //

    const corseApi = encryptGlobal(
      JSON.stringify({
        user_id: currentUser?.data[0]?.user_id,
      })
    );
    var config = {
      method: "get",
      url:
        process.env.REACT_APP_API_BASE_URL +
        `/dashboard/stuCourseStats?Data=${corseApi}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${currentUser.data[0]?.token}`,
      },
    };
    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          const per =
            response.data.data[0].topics_completed_count ===
            response.data.data[0].all_topics_count;
          setCourse(per);
        } else {
          setCourse(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const Ideas = async (resList) => {
               // This function fetches L2 score and Idea status from the API //

    const corseApi1 = encryptGlobal(
      JSON.stringify({
        team_id: currentUser?.data[0]?.team_id,
      })
    );
    var config = {
      method: "get",
      url:
        process.env.REACT_APP_API_BASE_URL +
        `/students/IsCertificate?Data=${corseApi1}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${currentUser.data[0]?.token}`,
      },
    };
    await axios(config)
      .then(function (response) {
        if (response.status === 200) {
          const res = response.data.data[0];
          setScore(res.score);

          setStatus(res.status);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const isEligible = resList === 1 && status === "SUBMITTED" && score !== null && score >= 6.5;

  const componentRef = useRef();
  const handlePrintCertificate = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${currentUser?.data[0]?.full_name}`,
  });
 
const colClass = isEligible
  ? "col-12 col-md-4 col-lg-4 col-xl-4 col-xxl-3"
  : "col-12 col-md-6 col-lg-6 col-xl-4 col-xxl-3";


  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row g-5">
            <div className={colClass}>
              <div className="employee-grid-profile" style={{ height: "auto" }}>
                <div className="profile-info">
                  <img
                    src={users}
                    alt="Profile"
                    style={{ width: "150px", height: "150px" }}
                  />
                  <h5>{t("teacher_certificate.certificate")}</h5>
                  <div style={{ textAlign: "left", marginTop: "1rem" }}>
                    <Link
                      to="#"
                      className="btn btn-lg text-bold"
                      style={{
                        backgroundColor: (course === true && resList === 1 ) ? "#007e33" : "#aaa",
                        color: "#fff",
                        padding: "1rem",
                        borderRadius: "20px",
                       
                      }}
                      disabled={!(course === true && resList === 1)}

onClick={(e) => {
  if (!(course === true && resList === 1)) {
    e.preventDefault();
    return;
  }

  if (currentUser?.data[0]?.state  !== "Tamil Nadu") {
    handleCertificateDownload();
  } else {
    handleCertificateDownloadTN(); 
  }
}}
                    >
                      <MdOutlineFileDownload size="27" /> {t("teacher_certificate.download")}
                    </Link>
                  </div>
                 {(course === true && resList === 1) ? (
                    <p style={{ marginTop: "1rem" }}>
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        {t("teacher_certificate.congratulations_future_leaders")}
                      </span>
                      <br />
                      {t("teacher_certificate.completed_course_message")}
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        {t("teacher_certificate.21_century")}
                      </span>
                      {t("teacher_certificate.additional_message")} <br />
                      {t("teacher_certificate.additional_message1")} <br />
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        {t("teacher_certificate.proud_of_you")}
                      </span>
                    </p>
                  ) : (
                    <p style={{ marginTop: "1rem" }}>
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        {t("teacher_certificate.note")}
                      </span>
                      :{" "}
                      {t("teacher_certificate.certificate_enabled_on_100_percent_completion")}
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        {t("teacher_certificate.red_msg1")}
                      </span>
                      {t("teacher_certificate.course_note")}
                    </p>
                  )}
                  
                </div>
              </div>
            </div>
            <div className={colClass}>
              <div
                className="employee-grid-profile"
                style={{ height: "auto" }}
              >
                <div className="profile-info">
                  <img
                    src={users}
                    alt="Profile"
                    style={{ width: "150px", height: "150px" }}
                  />
                  <h5>{t("teacher_certificate.addon_certificate")}</h5>
                  <div style={{ textAlign: "left", marginTop: "1rem" }}>
                    <Link
                      to="#"
                      className="btn btn-lg text-bold"
                      style={{
                        backgroundColor:
                          ideaStatus === "SUBMITTED" && resList ===1  ? "#007e33" : "#aaa",
                        color: "#fff",
                        padding: "1rem",
                        borderRadius: "20px",
                      }}
                      disabled={ideaStatus !== "SUBMITTED" && resList !==1 }
                    
                      onClick={(e) => {
                        if (ideaStatus === "SUBMITTED" && resList === 1 ) {
                          if (currentUser?.data[0]?.state !== "Tamil Nadu") {
                            handleCertificateDownload1();
                          } else {
                            handleCertificateDownloadTN1();
                          }
                        } else {
                          e.preventDefault();
                        }
                      }}
                      
                    >
                      <MdOutlineFileDownload size="27" /> { t("teacher_certificate.downloadaddon_certificate")}
                    </Link>
                  </div>
                  {(resList ===1 && ideaStatus === "SUBMITTED") ?
                  ( <p style={{marginTop:"1rem"}}>
                   <span style={{ color: "green", fontWeight: "bold" }}>
                    
                   </span>
                   <br />
                   <span style={{ color: "green", fontWeight: "bold" }}>
                     {t("teacher_certificate.best_wishes")}
                   </span>
                 </p>
               ) : (
                 <p style={{marginTop:"1rem"}}>
                   <span style={{ color: "red", fontWeight: "bold" }}>
                     {t("teacher_certificate.note")}
                   </span>
                   :{t("teacher_certificate.addon")}<span style={{color:"red", fontWeight: "bold"}}>{t("teacher_certificate.addonred")}</span>
                 </p>)}
                </div>
              </div>
            </div>
            {isEligible && (
            <div className={colClass}>
              <div
                className="employee-grid-profile"
                style={{ height: "auto" }}
              >
                <div className="profile-info">
                  <img
                    src={users}
                    alt="Profile"
                    style={{ width: "150px", height: "150px" }}
                  />
                  <h5>{ t("teacher_certificate.participate_certificate")}</h5>
                  <div style={{ textAlign: "left", marginTop: "1rem" }}>
                    <Link
                      to="#"
                      className="btn btn-lg text-bold"
                      style={{
                        backgroundColor: isEligible ? "#007e33" : "#aaa",
                        color: "#fff",
                        padding: "1rem",
                        borderRadius: "20px",
                      }}
                      onClick={
                        isEligible
                          ? handleCertificateDownload2
                          : (e) => e.preventDefault()
                      }
                    >
                      <MdOutlineFileDownload size="27" />{t("teacher_certificate.downloadn")} { t("teacher_certificate.participate_certificate")}
                    </Link>
                  </div>
                  {isEligible ? (
  <p>
    <span style={{ color: "green", fontWeight: "bold" }}>
      🌟 {t("teacher_certificate.congratulations_innovators")}{" "}
    </span>
    <br />
    {t("teacher_certificate.level_3_evaluation")} <br />
    {t("teacher_certificate.innovation_journey_message")} <br />
    <span style={{ color: "green", fontWeight: "bold" }}>
      {t("teacher_certificate.best_wishes")}
    </span>
  </p>
) : (
  <p>
    <span style={{ color: "red", fontWeight: "bold" }}>
      {t("teacher_certificate.note")}
    </span>
    : {t("teacher_certificate.certificate_enabled_on_level_3")}{" "}
    <span style={{ color: "red", fontWeight: "bold" }}>
      {t("teacher_certificate.red_msg2")}
    </span>{" "}
    {t("teacher_certificate.idea_note")}
  </p>
)}

                </div>
              </div>
            </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Instructions;
