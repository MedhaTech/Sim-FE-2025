/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap";
// import { Button } from '../../../stories/Button';
// import Layout from "../../Layout";
import jsPDF from "jspdf";
import { getCurrentUser , getNormalHeaders,} from "../../helpers/Utils";
import courseCompletionCertificate from "../../assets/img/Certificates/Studentcom.jpg";
import ideaSubmissionCertificate from "../../assets/img/Certificates/StudentApp.jpg";
import participateCertificate from "../../assets/img/Certificates/stuparticipation.jpg";
import TncourseCompletionCertificate from "../../assets/img/Certificates/TnStuCourseFinal.jpg";
import TnparticipateCertificate from "../../assets/img/Certificates/TnStuParticipateFinal.jpg";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { URL, KEY } from "../../constants/defaultValues";

import {
  
  updateStudentBadges,
  updateStudentCertificate,
} from "../../redux/studentRegistration/actions";
import { getLanguage } from '../../constants/languageOptions';

import moment from "moment";
import Congo from "../../assets/img/survey-success.jpg";
import { encryptGlobal } from "../../constants/encryptDecrypt";
import axios from "axios";
const Certificate = ({
  type,
  currentUser,
  postSurveyStatus,
  enableCourse,
  isEnabled,
  certDate,
  course,
  courseDate,
  surveyDate,
  language,
}) => {
  const { t } = useTranslation();
  const displayDate = type === "addon" ? surveyDate : courseDate; 
  const pdfRef = useRef(null);
  const partRef = useRef(null);
  const newRef = useRef(null);

  const dispatch = useDispatch();
  const handleCertificateDownload = () => {

    const content =
      type === "addon"
        ? newRef.current
        : type === "participate"
        ? partRef.current
        : pdfRef.current;

    const badge = "the_finisher";
    const size = [298, 220];

    const orientation = "l";

    const doc = new jsPDF("landscape", "mm", "a4");

    const certName = `${currentUser?.data[0].full_name}_${
      type === "participate"
        ? "idea_certificate"
        : type === "addon"
        ? "addon_certificate"
        : "course_certificate"
    }`;

    const imgWidth = 298;
    const imgHeight = 210;
    let selectedImage;

    if (currentUser?.data[0]?.state === "Tamil Nadu") {
      selectedImage =
        type === "addon"
          ? TnparticipateCertificate
          : type === "participate"
          ? TnideaSubmissionCertificate
          : TncourseCompletionCertificate;
    } else {
      selectedImage =
        type === "addon"
          ? participateCertificate
          : type === "participate"
          ? ideaSubmissionCertificate
          : courseCompletionCertificate;
    }
    doc.addImage(selectedImage, "JPEG", 0, 0, imgWidth, imgHeight);
   
    doc.deletePage(2);
  
    doc.html(content, {
      callback: function (doc) {
        const totalPages = doc.getNumberOfPages();
        if (totalPages > 1) {
          for (let i = totalPages; i > 1; i--) {
            doc.deletePage(i);
          }
        }
        doc.save(certName);
      },
      x: 0,
      y: 0,
      width: imgWidth,
      windowWidth: imgWidth,
    });

    if (!type)
      dispatch(
        updateStudentBadges(
          { badge_slugs: [badge] },
          currentUser?.data[0]?.user_id,
          language,
          t
        )
      );
    if (!type)
      dispatch(updateStudentCertificate(currentUser?.data[0]?.user_id));
  };

  // const certDateCheck = () => {
  //   const check =
  //     type !== "participate"
  //       ? certDate?.course_completed_date &&
  //         moment(certDate?.course_completed_date).format("DD-MM-YYYY")
  //       : "";
  //   return check ? " on " + check : "";
  // };
  const certDateCheck = () => {
    const check =
      type !== "participate"
        ? certDate?.course_completed_date &&
          moment(certDate?.course_completed_date).format("DD-MM-YYYY")
        : certDate?.course_completed_date &&
          moment(certDate?.course_completed_date).format("DD-MM-YYYY");
    return check ? " on " + check : "";
  };
  // const isMobile = window.innerWidth <= 768;
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Update the state when window is resized
    };
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener when the component is unmounted
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  // const getTopPosition = () => {
  //   if (type === "participate") {
  //     return isMobile ? "4rem" : "5.5rem";  // Example for mobile vs desktop
  //   } else if (type === "addon") {
  //     return isMobile ? "4.5rem" : "6.5rem";
  //   }
  //   return isMobile ? "5rem" : "6.5rem";
  // };

  // const getLeftPosition = () => {
  //   if (type === "participate") {
  //     return isMobile ? "8rem" : "6rem";  // Adjust for mobile and desktop
  //   } else if (type === "addon") {
  //     return isMobile ? "4rem" : "6rem";
  //   }
  //   return isMobile ? "4rem" : "6rem";
  // };
 
  return (
    <Card
      className="course-sec-basic p-5 m-4 w-100"
      style={{ backgroundColor: `${isEnabled ? "" : "lightgrey"}`, height: isEnabled
      ? (isMobile ? "1300px" : "900px")  //(1300px for mobile, 900px for desktop)
      : (isMobile ? "400px" : "600px")   // (400px for mobile, 600px for desktop)
     }}
    >
      {currentUser?.data[0]?.state !== "Tamil Nadu" ? (
        <CardBody>
          <CardTitle className=" text-left pt-4 pb-4" tag="h2">
            {type === "addon"
              ? t("teacher_certificate.addon_certificate")
              : type === "participate"
              ? t("teacher_certificate.participate_certificate")
              : t("teacher_certificate.certificate")}
          </CardTitle>
          <div className="common-flex">
            <div
              // ref={type ? partRef : pdfRef}
              ref={
                type === "addon"
                  ? newRef
                  : type === "participate"
                  ? partRef
                  : pdfRef
              }
              className="position-relative"
              style={{ width: "100%", maxWidth: "297px" }}
            >
              <span
                className="text-capitalize"
                style={{
                  position: "absolute",
                  top: `${type ? "6.4rem" : "6.4rem"}`,
                  color: `${type ? "black" : "black"}`,
                  left: `${type ? "4rem" : "4rem"}`,
                  
                  fontSize: "0.4rem",
                  fontFamily: "Times New Roman",
                }}
              >
                {currentUser?.data[0]?.full_name}
              </span>
              <span
                className="text-capitalize"
                style={{
                  position: "absolute",
                  color: `${type ? "black" : "black"}`,
                  top: `${type ? "7.3rem" : "7.3rem"}`,
                  left: `${type ? "4.4rem" : "4.4rem"}`,
                  fontSize: "0.4rem",
                  fontFamily: "Times New Roman",
                }}
              >
                {currentUser?.data[0]?.organization_name + certDateCheck()}
              </span>
              <img
                src={
                  type === "addon"
                    ? participateCertificate
                    : type === "participate"
                    ? ideaSubmissionCertificate
                    : courseCompletionCertificate
                }
                alt="certificate"
                className="img-fluid mx-auto"
                style={{
                  width: "297px",
                  height: "210px",
                }}
              />
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              disabled={!isEnabled}
              label={
                type === "addon"
                  ? t("teacher_certificate.downloadaddon_certificate")
                  : type === "participate"
                  ? t("teacher_certificate.download_participate")
                  : t("teacher_certificate.download")
              }
              className={`btn ${
                isEnabled ? "btn-success" : "btn-secondary"
              } mt-4`}
              style={{ marginRight: "2rem" }}
              onClick={handleCertificateDownload}
            >
              {type === "addon"
                ? t("teacher_certificate.downloadaddon_certificate")
                : type === "participate"
                ? t("teacher_certificate.download_participate")
                : t("teacher_certificate.download")}
              {/* {type
                ? t("teacher_certificate.download_participate")
                : t("teacher_certificate.download")} */}
            </button>
          </div>
          <div className="mt-3">
            {type === "addon" ? (
              isEnabled ? (
                <p>
                  <span style={{ color: "green", fontWeight: "bold" }}>
                    {/* 🌟 {t("teacher_certificate.congratulations_addon")}{" "} */}
                    {/* participation Add - on Certificate */}
                  </span>
                  <br />
                  {/* {t("teacher_certificate.addon_completion_message")} <br /> */}
                  <span style={{ color: "green", fontWeight: "bold" }}>
                    {t("teacher_certificate.best_wishes")}
                  </span>
                </p>
              ) : (
                <p>
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    {t("teacher_certificate.note")}
                  </span>
                  :{t("teacher_certificate.addon")}<span style={{color:"red", fontWeight: "bold"}}>{t("teacher_certificate.addonred")}</span>
                  {/* {t("teacher_certificate.addon_certificate_not_ready")} */}
                </p>
              )
            ) : type ? (
              isEnabled ? (
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
                  : {t("teacher_certificate.certificate_enabled_on_level_3")}
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    {t("teacher_certificate.red_msg2")}
                  </span>
                  {t("teacher_certificate.idea_note")}
                </p>
              )
            ) : isEnabled ? (
              <p>
                <span style={{ color: "green", fontWeight: "bold" }}>
                  {t("teacher_certificate.congratulations_future_leaders")}{" "}
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
              <p>
                <span style={{ color: "red", fontWeight: "bold" }}>
                  {t("teacher_certificate.note")}
                </span>
                :{" "}
                {t(
                  "teacher_certificate.certificate_enabled_on_100_percent_completion"
                )}
                <span style={{ color: "red", fontWeight: "bold" }}>
                  {t("teacher_certificate.red_msg1")}
                </span>
                {t("teacher_certificate.course_note")}
              </p>
            )}
          </div>
        </CardBody>
      ) : (
        <>
          {/* <h4 style={{ color: "#fe9f43" }}>Tamil Nadu State</h4> */}
          <CardBody>
            <CardTitle className=" text-left pt-4 pb-4" tag="h2">
              {type === "addon"
                ? t("teacher_certificate.addon_certificate") 
                : type === "participate"
                ? t("teacher_certificate.participate_certificate")
                : t("teacher_certificate.certificate")}
            </CardTitle>
            <div className="common-flex">
              <div
                // ref={type ? partRef : pdfRef}
                ref={
                  type === "addon"
                    ? newRef
                    : type === "participate"
                    ? partRef
                    : pdfRef
                }
                className="position-relative"
                style={{ width: "100%", maxWidth: "297px"}}
              >
                <span
                  className="text-capitalize"
                  style={{
                    position: "absolute",
                    top: `${
                      type == "participate"
                        ? "5.5rem"
                        : type === "addon"
                        ? "5.5rem"
                        : "5.5rem"
                    }`,
                    color: `${type ? "black" : "black"}`,
                    left: `${
                      type == "participate"
                        ? "10.5rem"
                        : type === "addon"
                        ? "10.5rem"
                        : "10.5rem"
                    }`,
                    fontSize: "0.4rem",
                    fontFamily: "Times New Roman",
                  }}
                >
                  {currentUser?.data[0]?.full_name}
                </span>
                <span
                  className="text-capitalize"
                  style={{
                    position: "absolute",
                    top: `${
                      type == "participate"
                        ? "6.4rem"
                        : type === "addon"
                        ? "6.4rem"
                        : "6.4rem"
                    }`,
                    color: `${type ? "black" : "black"}`,
                    left: `${
                      type == "participate"
                        ? "6rem"
                        : type === "addon"
                        ? "6rem"
                        : "6rem"
                    }`,
                    fontSize: "0.4rem",
                    // top: getTopPosition(),
                    // left: getLeftPosition(),
                    // fontSize: isMobile ? "0.1rem" : "0.4rem",
                    fontFamily: "Times New Roman",
                  }}
                >
                  {currentUser?.data[0]?.organization_name + certDateCheck()}
                </span>
                <span
                  className="text-capitalize"
                  style={{
                    position: "absolute",
                    top: `${type === "addon" ? "11.7rem" : "11.7rem"}`,
                    color: "black",
                    left: `${type === "addon" ? "14.5rem" : "14.5rem"}`,
                    fontSize: "3px",
                    fontFamily: "Times New Roman",
                  }}
                 
                >
                  {displayDate && moment(displayDate).isValid()
    ? moment(displayDate).format("DD-MM-YYYY")
    : ""}
                  {/* {moment(displayDate).format("DD-MM-YYYY")} */}
                </span>
                <img
                  src={
                    type === "addon"
                      ? TnparticipateCertificate
                      : type === "participate"
                      ? TnideaSubmissionCertificate
                      : TncourseCompletionCertificate
                  }
                  alt="certificate"
                  className="img-fluid mx-auto"
                  style={{
                    width: "297px",
                    height: "210px",
                 
                  }}
                />
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                disabled={!isEnabled}
                label={
                  type === "addon"
                    ? t("teacher_certificate.downloadaddon_certificate")
                    : type === "participate"
                    ? t("teacher_certificate.download_participate")
                    : t("teacher_certificate.download")
                }
                className={`btn ${
                  isEnabled ? "btn-success" : "btn-secondary"
                } mt-4`}
                style={{ marginRight: "2rem" }}
                onClick={handleCertificateDownload}
              >
                {type === "addon"
                  ? t("teacher_certificate.downloadaddon_certificate")
                  : type === "participate"
                  ? t("teacher_certificate.download_participate")
                  : t("teacher_certificate.download")}
                {/* {type
      ? t("teacher_certificate.download_participate")
      : t("teacher_certificate.download")} */}
              </button>
            </div>
            <div className="mt-3">
              {type === "addon" ? (
                isEnabled ? (
                  <p>
                    <span style={{ color: "green", fontWeight: "bold" }}>
                      {/* 🌟 {t("teacher_certificate.congratulations_addon")}{" "} */}
                      {/* participation Add - on Tamil Nadu Certificate */}
                    </span>
                    <br />
                    {/* {t("teacher_certificate.addon_completion_message")} <br /> */}
                    <span style={{ color: "green", fontWeight: "bold" }}>
                      {t("teacher_certificate.best_wishes")}
                    </span>
                  </p>
                ) : (
                  <p>
                    <span style={{ color: "red", fontWeight: "bold" }}>
                      {t("teacher_certificate.note")}
                    </span>
                    :{t("teacher_certificate.addon")}<span style={{color:"red", fontWeight: "bold"}}>{t("teacher_certificate.addonred")}</span>
                  </p>
                )
              ) : type ? (
                isEnabled ? (
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
                    : {t("teacher_certificate.certificate_enabled_on_level_3")}
                    <span style={{ color: "red", fontWeight: "bold" }}>
                      {t("teacher_certificate.red_msg2")}
                    </span>
                    {t("teacher_certificate.idea_note")}
                  </p>
                )
              ) : isEnabled ? (
                <p>
                  <span style={{ color: "green", fontWeight: "bold" }}>
                    {t("teacher_certificate.congratulations_future_leaders")}{" "}
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
                <p>
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    {t("teacher_certificate.note")}
                  </span>
                  :{" "}
                  {t(
                    "teacher_certificate.certificate_enabled_on_100_percent_completion"
                  )}
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    {t("teacher_certificate.red_msg1")}
                  </span>
                  {t("teacher_certificate.course_note")}
                </p>
              )}
            </div>
          </CardBody>
        </>
      )}
    </Card>
  );
};

const MyCertificate = () => {
  const showDummypage = true;
  const { t } = useTranslation();
  const currentUser = getCurrentUser("current_user");
  const [course, setCourse] = useState(false);
  const [ideaEnabled, setIdeaEnabled] = useState(false);
  const [ideaStatus, setIdeaStatus] = useState("");
  const language = useSelector(
    (state) => state?.studentRegistration?.studentLanguage
  );
  const studentStatus = localStorage.getItem("studentpostsurveystatus");
  const userID = currentUser?.data[0]?.user_id;
  const [postSurveyStatus, setPostSurveyStatus] = useState("");

  const [resList, setResList] = useState("");
  const [status, setStatus] = useState("");
  const [score, setScore] = useState("");
  const [surveyDates, setSurveyDates] = useState(null);
  const [courseDate, setCourseDate] = useState(null);
  // console.log(courseDate,"course");
  useEffect(() => {
    StateData();
    stuCoursePercent();
    Ideas();
    submittedApi();
    certificateApi();
    apiData(language);

  }, []);
  const apiData=(language)=>{
    const locale = getLanguage(language);

    let enDataone = encryptGlobal("4");
    let axiosConfig = getNormalHeaders(KEY.User_API_Key);
   
    let enParamData = encryptGlobal(
      JSON.stringify({
        role: "STUDENT",
        locale,
        user_id : userID,
      })
    );
    axiosConfig["params"] = {
      Data: enParamData,
    };

    axios
      .get(`${URL.getPostSurveyList}/${enDataone}`, axiosConfig)
      .then((postSurveyRes) => {
        if (postSurveyRes?.status == 200) {
          // console.log(postSurveyRes,"response");
          setPostSurveyStatus(postSurveyRes.data.data[0].progress);

        }
      })
      .catch((err) => {
        return err.response;
      });
    };
  const certificateApi = () => {
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
            const postSurveyDate = response?.data?.data[0]?.postSurvey[0]?.created_at;
            const courseDateValue = response?.data?.data[0]?.course[0]?.created_at;
          
            setSurveyDates(postSurveyDate || null); 
            setCourseDate(courseDateValue || null); 
          } else {
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
          // console.log(response.data.data);
          if (response.data.data && response.data.data.length > 0) {
            const data = response.data.data[0];

            setIdeaStatus(response.data.data[0].status);
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
          // console.log(response,"111");
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
  const StateData = async () => {
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
          // console.log(response,"111");
          setResList(response.data.data[0].certificate);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const Ideas = async (resList) => {
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
  useEffect(() => {
    if (resList !== null) {
      if (
        status !== null &&
        status === "SUBMITTED" &&
        score !== null &&
        score >= 6.5 &&
        resList === 1
      ) {
        setIdeaEnabled(true);
        // console.log("Certificate Enabled");
      } else {
        setIdeaEnabled(false);
        // console.log("Certificate Not Enabled");
      }
    }
  }, [resList, score, status]);

  const enableParticipation =
    ideaStatus === "SUBMITTED" && postSurveyStatus === "COMPLETED" && resList === 1;
  return (
    <div className="page-wrapper">
      <div className="content">
        <Container className="presuervey mb-50 mt-5 ">
          <Fragment>
            {showDummypage ? (
              <Row>
                <Row></Row>
                <Col className="d-lg-flex justify-content-center mb-3">
                  <div className="col-12 col-lg-4">
                    <Certificate
                      language={language}
                        //Course certificate //
                      currentUser={currentUser}
                      isEnabled={course && resList == 1}
                      courseDate={courseDate}
                    />
                  </div>
                  <div className="col-12 col-lg-4">
                    <Certificate
                      type={"addon"}
                        //Idea certificate //
                      language={language}
                      currentUser={currentUser}
                      isEnabled={enableParticipation}
                      surveyDate={surveyDates}
                    />
                  </div>
                  {ideaEnabled && (
                    <div className="col-12 col-lg-4">
                      <Certificate
                        type={"participate"}
                          //3rd certificate //
                        currentUser={currentUser}
                        isEnabled={ideaEnabled}
                        language={language}
                      />
                    </div>
                  )}
                </Col>
              </Row>
            ) : (
              <Card className="course-sec-basic p-5">
                <div className="text-left">
                  <div className="text-center">
                    <img className={`img-fluid imgWidthSize`} src={Congo}></img>
                  </div>
                  <h2
                    dangerouslySetInnerHTML={{
                      __html: t("dummytext.dear"),
                    }}
                  ></h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: t("dummytext.student_my_cer"),
                    }}
                  ></div>
                  <h2
                    dangerouslySetInnerHTML={{
                      __html:
                        t("dummytext.name") + currentUser?.data[0].full_name,
                    }}
                  ></h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: t("dummytext.certificate_msg"),
                    }}
                  ></div>
                </div>
              </Card>
            )}
          </Fragment>
        </Container>
      </div>
    </div>
  );
};

export default MyCertificate;
{
  /* <div className="mt-3">
            {type ? (
              isEnabled ? (
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
                  : {t("teacher_certificate.certificate_enabled_on_level_3")}
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    {t("teacher_certificate.red_msg2")}
                  </span>
                  {t("teacher_certificate.idea_note")}
                </p>
              )
            ) : isEnabled ? (
              <p>
                <span style={{ color: "green", fontWeight: "bold" }}>
                  {t("teacher_certificate.congratulations_future_leaders")}{" "}
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
              <p>
                <span style={{ color: "red", fontWeight: "bold" }}>
                  {t("teacher_certificate.note")}
                </span>
                :{" "}
                {t(
                  "teacher_certificate.certificate_enabled_on_100_percent_completion"
                )}
                <span style={{ color: "red", fontWeight: "bold" }}>
                  {t("teacher_certificate.red_msg1")}
                </span>
                {t("teacher_certificate.course_note")}
              </p>
            )}
          </div> */
}
