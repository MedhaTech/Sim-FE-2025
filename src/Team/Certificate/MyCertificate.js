/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap";
// import { Button } from '../../../stories/Button';
// import Layout from "../../Layout";
import jsPDF from "jspdf";
import { getCurrentUser } from "../../helpers/Utils";
import courseCompletionCertificate from "../../assets/img/Certificates/CompletionCertificate.jpg";
import ideaSubmissionCertificate from "../../assets/img/Certificates/AppreciationCertificate.jpg";
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
    doc.html(content, {
      callback: function (doc) {
        doc.save(certName);
      },
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
            style={{ width: "fit-content" }}
          >
            <span
              className="text-capitalize"
              style={{
                position: "absolute",
                top: `${type ? "5.9rem" : "5.9rem"}`,
                color: `${type ? "black" : "black"}`,
                left: `${type ? "3rem" : "3rem"}`,
                fontSize: "0.8rem",
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
                top: `${type ? "6.8rem" : "6.8rem"}`,
                left: `${type ? "4rem" : "4rem"}`,
                fontSize: "0.8rem",
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
                border: "1px solid #cccccc",
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
      </CardBody>
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



 useEffect(()=>{
  StateData();
  stuCoursePercent();
  Ideas();
 },[]);
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
  console.log(status,"22");

          setStatus(res.status);
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
      console.log(resList, "resList updated");
      
      if (status !== null && status === "SUBMITTED" && score !== null && score > 6.5 && resList === 1) {
        setIdeaEnabled(true);
        console.log("Certificate Enabled");
      } else {
        setIdeaEnabled(false);
        console.log("Not Enabled");
      }
      console.log(score,"sc","st",status);

    }
  }, [resList, status, score]);
 
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
              <Col className="d-lg-flex justify-content-center">
                <Certificate
                  type={"participate"}
                  currentUser={currentUser}
                  isEnabled={ideaEnabled}
                  language={language}
                />
                <Certificate
                  language={language}
                  currentUser={currentUser}
                  isEnabled={course}
                />
              </Col>
            </Row>
          ) : (
            <Card className="course-sec-basic p-5">
              <div className="text-left">
                <div className="text-center">
                  <img className={`img-fluid imgWidthSize`} src={Congo}></img>
                </div>
                <h6
                  dangerouslySetInnerHTML={{
                    __html: t("dummytext.dear"),
                  }}
                ></h6>
                <div
                  dangerouslySetInnerHTML={{
                    __html: t("dummytext.student_my_cer"),
                  }}
                ></div>
                <h6
                  dangerouslySetInnerHTML={{
                    __html:
                      t("dummytext.name") + currentUser?.data[0].full_name,
                  }}
                ></h6>
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
