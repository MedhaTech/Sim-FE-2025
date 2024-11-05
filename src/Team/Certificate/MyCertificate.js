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
import { encryptGlobal } from '../../constants/encryptDecrypt';
import axios from 'axios';
const Certificate = ({
  type,
  currentUser,
  postSurveyStatus,
  enableCourse,
  isEnabled,
  certDate,
  course,
  language,
}) => {
  const { t } = useTranslation();
  const pdfRef = useRef(null);
  const partRef = useRef(null);
  const dispatch = useDispatch();
  const handleCertificateDownload = () => {
    // here we can download the certificates //

    const content = type ? partRef.current : pdfRef.current;
    const badge = "the_finisher";
    const size = [298, 220];

    const orientation = "l";
    
    const doc = new jsPDF(orientation, "px", size);
    const certName = `${currentUser?.data[0].full_name}_${
      type ? "idea_certificate" : "course_certificate"
    }`;
    // doc.html(content, {
    //   callback: function (doc) {
    //     doc.save(certName);
    //   },
    // });
    const imgWidth = 298; 
    const imgHeight = 220; 
    doc.addImage(courseCompletionCertificate, "JPEG", 0, 0, imgWidth, imgHeight); 
    doc.addImage(ideaSubmissionCertificate, "JPEG", 0, 0, imgWidth, imgHeight);
    // Create the content using the HTML reference
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
      dispatch(updateStudentCertificate(currentUser?.data[0]?.user_id
      ));
  };
 
  
  const certDateCheck = () => {
    const check =
      type !== "participate"
        ? certDate?.course_completed_date &&
          moment(certDate?.course_completed_date).format("DD-MM-YYYY")
        : "";
    return check ? " on " + check : "";
  };
  return (
    <Card
      className="course-sec-basic p-5 m-4 w-100"
      // style={{
      //   backgroundColor: `${postSurveyStatus ? "" : "lightgrey"}`,
      // }}
      style={{ backgroundColor: `${isEnabled ? "" : "lightgrey"}` }}
    >
     {currentUser?.data[0]?.state !== "Tamil Nadu" ? 
     <CardBody>
        <CardTitle className=" text-left pt-4 pb-4" tag="h2">
          {type
            ? t("teacher_certificate.participate_certificate")
            : t("teacher_certificate.certificate")}
        </CardTitle>
        <div className="common-flex">
          <div
            ref={type ? partRef : pdfRef}
            className="position-relative"
            // style={{ width: "fit-content" }}
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
                type ? ideaSubmissionCertificate : courseCompletionCertificate
              }
              alt="certificate"
              className="img-fluid mx-auto"
              style={{
                width: "297px",
                height: "210px",
                // border: "1px solid #cccccc",
               
              }}
             
            />
          </div>
        </div>
        <div className="text-center">
          <button
            type="submit"
            // disabled={!postSurveyStatus}
            disabled={!isEnabled}
            label={
              type
                ? t("teacher_certificate.download_participate")
                : t("teacher_certificate.download")
            }
          // className={`btn ${postSurveyStatus ? "btn-success" : "btn-secondary"} mt-4`}
          className={`btn ${isEnabled ? "btn-success" : "btn-secondary"} mt-4`}
            style={{ marginRight: "2rem" }}
            onClick={handleCertificateDownload}
          >
            {type
              ? t("teacher_certificate.download_participate")
              : t("teacher_certificate.download")}
          </button>
        </div>
        <div className="mt-3">
  {type ? (
    isEnabled ? (
      <p>
        <span style={{ color: 'green', fontWeight: 'bold' }}>🌟 {t("teacher_certificate.congratulations_innovators")} </span><br />
        {t("teacher_certificate.level_3_evaluation")} <br />
        {t("teacher_certificate.innovation_journey_message")} <br />
        <span style={{ color: 'green', fontWeight: 'bold' }}>{t("teacher_certificate.best_wishes")}</span>
      </p>
    ) : (
      <p>
        <span style={{ color: 'red', fontWeight: 'bold'}}>{t("teacher_certificate.note")}</span>: {t("teacher_certificate.certificate_enabled_on_level_3")}
        <span style={{ color: 'red', fontWeight: 'bold'}}>{t("teacher_certificate.red_msg2")}</span>{t("teacher_certificate.idea_note")}

      </p>
    )
  ) : (
    isEnabled ? (
      <p>
        <span style={{ color: 'green', fontWeight: 'bold' }}>{t("teacher_certificate.congratulations_future_leaders")} </span><br />
        {t("teacher_certificate.completed_course_message")}
        <span style={{ color: 'green', fontWeight: 'bold' }}>
        {t("teacher_certificate.21_century")}</span>
        
        {t("teacher_certificate.additional_message")} <br />
        {t("teacher_certificate.additional_message1")} <br />
        <span style={{ color: 'green', fontWeight: 'bold' }}>{t("teacher_certificate.proud_of_you")}</span>
      </p>
    ) : (
      <p>
        <span style={{ color: 'red', fontWeight: 'bold' }}>{t("teacher_certificate.note")}</span>: {t("teacher_certificate.certificate_enabled_on_100_percent_completion")}
        <span style={{ color: 'red', fontWeight: 'bold'}}>{t("teacher_certificate.red_msg1")}</span>{t("teacher_certificate.course_note")}

      </p>
    )
  )}
</div>



      </CardBody>
      : <h4 style={{color:"#fe9f43"}}>Certificates are coming soon ....</h4>}
    </Card>
  );
};

const MyCertificate = () => {
  const showDummypage = true;
  const { t } = useTranslation();
  const currentUser = getCurrentUser("current_user");
  const [course,setCourse]=useState(false);
  const [ideaEnabled, setIdeaEnabled] = useState(false);
  const language = useSelector(
    (state) => state?.studentRegistration?.studentLanguage
  );
  const [resList,setResList]=useState("");
  const [status,setStatus]=useState("");
  const [score,setScore]=useState("");

// const TnSpecific=currentUser?.data[0]?.state;

 useEffect(()=>{
  StateData();
  stuCoursePercent();
  Ideas();
  // submittedApi();
 },[]);
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
          // setStatus(response.data.data[0].status);

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
        user_id: currentUser?.data[0]?.user_id
      })
    );
    var config = {
      method: 'get',
      url:
        process.env.REACT_APP_API_BASE_URL +
        `/dashboard/stuCourseStats?Data=${corseApi}`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${currentUser.data[0]?.token}`
      }
    };
    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          // console.log(response,"111");
          const per = 
            (response.data.data[0].topics_completed_count === response.data.data[0].all_topics_count);
            setCourse(per);
            
        }else{
          setCourse(false);

        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const StateData =async () => {
    const fectchTecParam = encryptGlobal(
      JSON.stringify({
        state: currentUser?.data[0]?.state,
      })
    );
    var config = {
      method: 'get',
      url:
        process.env.REACT_APP_API_BASE_URL +
        `/state_coordinators?Data=${fectchTecParam}`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${currentUser.data[0]?.token}`
      }
    };
   await axios(config)
      .then (function (response) {
        if (response.status === 200) {
          // console.log(response,"111");
          setResList(response.data.data[0].
            certificate
            );

        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const Ideas = async(resList) => {
    const corseApi1 = encryptGlobal(
      JSON.stringify({
        team_id: currentUser?.data[0]?.team_id
      })
    );
    var config = {
      method: 'get',
      url:
        process.env.REACT_APP_API_BASE_URL +
        `/students/IsCertificate?Data=${corseApi1}`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${currentUser.data[0]?.token}`
      }
    };
   await axios(config)
      .then(function (response) {
        if (response.status === 200) {
          // console.log(response,"111");
          const res = response.data.data[0];
          setScore(res.score);
          
          setStatus(res.status);
          // console.log(status,"22");
        //   if (status === "SUBMITTED" && score !== null && score > 6.5 && resList === 1) {
        //     console.log(resList,"res");
        //     setIdeaEnabled(true);
        //     console.log("certificate Enabled");
        //   } else {
        //     setIdeaEnabled(false);
        //     console.log("Not Enabled");
        //     console.log(resList,"res");

        //   }
        // } else {
        //   setIdeaEnabled(false);

        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    if (resList !== null) {
      // console.log(resList, "resList updated");
      
      if (status !== null && status === "SUBMITTED" && score !== null && score >= 6.5 && resList === 1) {
        setIdeaEnabled(true);
        console.log("Certificate Enabled");
      } else {
        setIdeaEnabled(false);
        console.log("Certificate Not Enabled");
      }
      // console.log(score,"sc","st",status);

    }
  }, [resList, status, score]);
        // console.log(resList, "resList",status,"status",TnSpecific,"state");

//   useEffect(() => {
//     if (resList !== null) {

//         if (status !== null && status === "SUBMITTED" && resList === 1) {
//             if (TnSpecific === "Tamil Nadu") {
//                 setIdeaEnabled(true);
//                 console.log("Certificate Enabled for Tamil Nadu");
//             } else if (score !== null && score >= 6.5) {
//                 setIdeaEnabled(true);
//                 // console.log("Certificate Enabled");
//                 console.log("Certificate Enabled for other states");
//             } else {
//                 setIdeaEnabled(false);
//                 // console.log("Certificate Not Enabled");
//                 console.log("Certificate Not Enabled due to score");
//             }
//         } else {
//             setIdeaEnabled(false);
//             // console.log("Certificate Not Enabled");
//             console.log("Certificate Not Enabled due to status or resList");
//         }
//         // console.log(score, "sc", "st", status);
//     }
// }, [resList, status, score, TnSpecific]);

 
  return (
    <div className="page-wrapper">
      <div className="content">
      <Container className="presuervey mb-50 mt-5 ">
        <Fragment>
          {showDummypage ? (
            <Row>
              <Row>
                {/* <div
                  className="m-4 text-center"
                  dangerouslySetInnerHTML={{
                    __html: t("student_course.my_cer_note"),
                  }}
                ></div> */}
              </Row>
              {/* className="d-lg-flex justify-content-center" previous one */}
              <Col 
              //  xs={12}
              //  lg={ideaEnabled ? 6 : 12}
              className="d-lg-flex justify-content-center mb-3"
              // className={`d-lg-flex ${ideaEnabled ? 'justify-content-center align-items-center' : 'justify-content-around'} text-center`}
              >
              {ideaEnabled &&( 
                <div className="col-12 col-lg-6" >
                 <Certificate
                  type={"participate"}
                  currentUser={currentUser}
                  isEnabled={ideaEnabled}
                  language={language}
                />
                </div>
              )}
                <div className="col-12 col-lg-6">

                <Certificate
                  language={language}
                  currentUser={currentUser}
                  isEnabled={course}
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
