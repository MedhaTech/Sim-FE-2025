/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap";
// import { Button } from '../../../stories/Button';
// import Layout from "../../Layout";
import jsPDF from "jspdf";
import { getCurrentUser } from "../../helpers/Utils";
import courseCompletionCertificate from "../../assets/img/Certificates/Studentcom.jpg";
import ideaSubmissionCertificate from "../../assets/img/Certificates/StudentApp.jpg";
import participateCertificate from "../../assets/img/Certificates/stuparticipation.jpg";
import TncourseCompletionCertificate from "../../assets/img/Certificates/TNstuCourse1.jpg";
import TnparticipateCertificate from "../../assets/img/Certificates/TNstuParticipate1.jpg";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudentChallengeSubmittedResponse,
  getStudentDashboardStatus,
  studentPostSurveyCertificate,
  updateStudentBadges,
  updateStudentCertificate,
} from "../../redux/studentRegistration/actions";
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
  console.log(courseDate,"cc");
  const pdfRef = useRef(null);
  const partRef = useRef(null);
  const newRef = useRef(null);

  const dispatch = useDispatch();
  const handleCertificateDownload = () => {
    // const content = type ? partRef.current : pdfRef.current;

    const content =
      type === "addon"
        ? newRef.current
        : type === "participate"
        ? partRef.current
        : pdfRef.current;

    const badge = "the_finisher";
    const size = [298, 220];

    const orientation = "l";

    const doc = new jsPDF(orientation, "px", size);
    const certName = `${currentUser?.data[0].full_name}_${
      // type ? "idea_certificate" : "course_certificate"
      type === "participate"
        ? "idea_certificate"
        : type === "addon"
        ? "addon_certificate"
        : "course_certificate"
    }`;

    const imgWidth = 298;
    const imgHeight = 220;
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
    // doc.addImage(
    //   type === "addon"
    //     ? participateCertificate
    //     : type === "participate"
    //     ? ideaSubmissionCertificate
    //     : courseCompletionCertificate,
    //   "JPEG",
    //   0,
    //   0,
    //   imgWidth,
    //   imgHeight
    // );
    doc.html(content, {
      callback: function (doc) {
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
  return (
    <Card
      className="course-sec-basic p-5 m-4 w-100"
      style={{ backgroundColor: `${isEnabled ? "" : "lightgrey"}` }}
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
                  ? t("teacher_certificate.addon_certificate")
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
                ? t("teacher_certificate.addon_certificate")
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
                  : {t("teacher_certificate.addon")}
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
                style={{ width: "100%", maxWidth: "297px" }}
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
                    fontFamily: "Times New Roman",
                  }}
                >
                  {currentUser?.data[0]?.organization_name + certDateCheck()}
                </span>
                <span
                  className="text-capitalize"
                  style={{
                    position: "absolute",
                    top: `${type === "addon" ? "11.5rem" : "11.5rem"}`,
                    color: "black",
                    left: `${type === "addon" ? "14.5rem" : "14.5rem"}`,
                    fontSize: "0.4rem",
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
                    ? t("teacher_certificate.addon_certificate")
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
                  ? t("teacher_certificate.addon_certificate")
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
                    :{t("teacher_certificate.addon")}<span style={{color:"red"}}>{t("teacher_certificate.addonred")}</span>
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
  }, []);
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
            console.log("No data available:", response.data.data);
            setSurveyDates(null);
            setCourseDate(null);
          }
          // console.log(response.data.data);
          // setSurveyDates(response?.data?.data[0]?.postSurvey[0]?.created_at);
          // setCourseDate(response?.data?.data[0]?.course[0]?.created_at);
        }
      })
      .catch(function (error) {
        // if (error.response.status === 404) {
        //   //   seterror4( true);
        // }
      });
  };
  const submittedApi = () => {
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
        `/state_coordinators?Data=${fectchTecParam}`,
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
        console.log("Certificate Enabled");
      } else {
        setIdeaEnabled(false);
        console.log("Certificate Not Enabled");
      }
    }
  }, [resList, score, status]);

  const enableParticipation =
    ideaStatus === "SUBMITTED" && studentStatus === "COMPLETED";
  // console.log(enableParticipation ,"Participation certificate enabled ..");
  return (
    <div className="page-wrapper">
      <div className="content">
        <Container className="presuervey mb-50 mt-5 ">
          <Fragment>
            {showDummypage ? (
              <Row>
                <Row></Row>
                <Col className="d-lg-flex justify-content-center mb-3">
                  {ideaEnabled && (
                    <div className="col-12 col-lg-4">
                      <Certificate
                        type={"participate"}
                        currentUser={currentUser}
                        isEnabled={ideaEnabled}
                        language={language}
                      />
                    </div>
                  )}
                  <div className="col-12 col-lg-4">
                    <Certificate
                      language={language}
                      currentUser={currentUser}
                      isEnabled={course}
                      courseDate={courseDate}
                    />
                  </div>
                  <div className="col-12 col-lg-4">
                    <Certificate
                      type={"addon"}
                      language={language}
                      currentUser={currentUser}
                      isEnabled={enableParticipation}
                      surveyDate={surveyDates}

                    />
                  </div>
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
