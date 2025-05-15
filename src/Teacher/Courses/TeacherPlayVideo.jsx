/* eslint-disable no-undef */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
// import TeacherCertificate from '../../assets/media/img/teachers_certificate.png';
import "./style.scss";
import { BsChevronRight, BsFilter } from "react-icons/bs";
import { RiAwardFill } from "react-icons/ri";
import { Card, CardBody, CardTitle } from "reactstrap";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import {
  getTeacherCourseDetails,
  getAdminCourseDetails,
  getMentorCourseAttachments,
} from "../../redux/actions";

import Confetti from "react-confetti";

import Vimeo from "@u-wave/react-vimeo";



import { getCurrentUser } from "../../helpers/Utils";
import axios from "axios";
import { connect, useSelector } from "react-redux";


import jsPDF from "jspdf";
import { useLayoutEffect } from "react";
import { FaBullseye } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { encryptGlobal } from "../../constants/encryptDecrypt";

//VIMEO REFERENCE
//https://github.com/u-wave/react-vimeo/blob/default/test/util/createVimeo.js
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import FeatherIcon from "feather-icons-react";

const TeacherPlayVideo = (props) => {
  const { t } = useTranslation();
  const pdfRef = useRef(null);
  const [id, setResponce] = useState([]);
  const { id: paramId } = useParams();
  const course_id = paramId ? paramId : 1;

  const currentUser = getCurrentUser("current_user");
  const [condition, setCondition] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [quizId, setQizId] = useState("");
  const [worksheetId, setWorksheetId] = useState("");
  const [backToQuiz, setBackToQuiz] = useState(false);

  const [coursesId, setCourseId] = useState("");
  const [fileName, setFileName] = useState("");
  const [topicObj, setTopicObj] = useState({});
  const [currentTopicId, setCourseTopicId] = useState("");
  const [handbook, setHandbook] = useState(false);

  const [firstObj, setFirstObj] = useState([]);
  const [moduleResponce, setUpdateModuleResponce] = useState([]);
  const [worksheetResponce, SetWorksheetResponce] = useState([]);
  const [videosList, setVideosList] = useState({
    videoTitle: "",
    videoLink: "",
  });

  const [url, setUrl] = useState("");
  const [image, setImage] = useState();
  const [videoId, setVideoId] = useState("");
  const [setArrays, setArray] = useState([]);
  const [setTopicArrays, setTopicArray] = useState([]);
  const [isVideo, setIsVideo] = useState(false);
  const [modulesList, setModulesList] = useState({
    questionType: "",
    question: "",
    choice: "",
  });
  const [videoIndex, setVideoIndex] = useState(0);
  const [volume, setVolume] = useState(1);
  const [paused, setPaused] = useState(false);
  const [item, setItem] = useState("");
  const [adminCourseDetails, setAdminCourseDetails] = useState("");
  const [adminCourse, setAdminCourse] = useState([]);
  const [teacherCourseDetails, setTeacherCourseDetails] = useState("");
  const [teacherCourse, setTeacherCourse] = useState([]);
  const [worksheet, setWorksheetByWorkSheetId] = useState([]);
  const [certificate, setCertificate] = useState(false);
  const [instructions, setInstructions] = useState(false);
  const [continueObj, setContinueObj] = useState([]);
  const [courseData, setCourseData] = useState(null);
  const [isquizcompleted, setisquizcompleted] = useState(false);
  const [finalPage, setFinalPage] = useState(false);
  const scrollRef = React.createRef();
  const [quizStart, setQuizStart] = useState(false);

  const dispatch = useDispatch();

  const getLastCourseStatus = (data = []) => {
    const length = data && data.length > 0 ? data.length - 1 : 0;
    if (length) {
      return data[length]?.progress === "INCOMPLETE" ? false : true;
    }
    return false;
  };
  useEffect(() => {
    props.getTeacherCourseDetailsActions(course_id);
  }, [course_id]);

  useLayoutEffect(() => {
    props.getMentorCourseAttachmentsActions();
  }, []);
  useEffect(() => {
    var topicArrays = [];
    var firstObjectArray = [];
    var continueArrays = [];
    var continueObjectArrays = [];

    setAdminCourse(props.adminCoursesDetails && props.adminCoursesDetails[0]);
    setAdminCourseDetails(
      props.adminCoursesDetails[0] &&
        props.adminCoursesDetails[0].course_modules
    );
    setTeacherCourse(
      props.teaherCoursesDetails && props.teaherCoursesDetails[0]
    );
    setTeacherCourseDetails(
      props.teaherCoursesDetails[0] &&
        props.teaherCoursesDetails[0].mentor_course_topics
    );
    props.teaherCoursesDetails[0] &&
      props.teaherCoursesDetails[0].mentor_course_topics.map(
        (course, index) => {
          topicArrays.push(course);
        }
      );
    setTopicArray(topicArrays);
    if (topicArrays.length > 0) {
      topicArrays.forEach((item, i) => {
        if (item.progress == "COMPLETED") {
          continueArrays.push(item);
        }
      });
      firstObjectArray.push(topicArrays[0]);
      continueObjectArrays.push(continueArrays[continueArrays.length - 1]);
      setContinueObj(continueObjectArrays);
      firstObjectArray.push(topicArrays[0]);
      setFirstObj(firstObjectArray);
    }
  }, [props.teaherCoursesDetails]);

  async function fetchData(videoId) {
    const fetchParam = encryptGlobal(JSON.stringify(videoId));
    // here videoId = videoId //
    setVideoId(videoId);
    var config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + "/videos/" + fetchParam,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.data[0]?.token}`,
      },
    };
    await axios(config)
      .then(function (response) {
        if (response.status === 200) {
          setResponce(response.data && response.data.data[0]);
          setCondition("Video1");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function getWorkSheetApi(worksheetId) {
    const worksheetIdParam = encryptGlobal(JSON.stringify(worksheetId));
    // here worksheetId = worksheetId //
    var config = {
      method: "get",
      url:
        process.env.REACT_APP_API_BASE_URL +
        "/mentorAttachments/" +
        worksheetIdParam,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.data[0]?.token}`,
      },
    };
    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          const worksheet = response.data.data[0]?.attachments.split("{{}}");
          SetWorksheetResponce(worksheet);
          setWorksheetByWorkSheetId(worksheet[0]);
          setFinalPage(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
 
  // async function getisquizcompleted() {
  //   let quizParamData = encryptGlobal(
  //     JSON.stringify({
  //       attempts: 1,
  //       locale: "en",
  //     })
  //   );
  //   const quiZEnId = encryptGlobal("8");
  //   var config = {
  //     method: "get",

  //     url:
  //       process.env.REACT_APP_API_BASE_URL +
  //       `/quiz/${quiZEnId}/nextQuestion?Data=${quizParamData}`,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${currentUser?.data[0]?.token}`,
  //     },
  //   };
  //   axios(config)
  //     .then(function (response) {
  //       if (response.status === 200) {
  //         if (
  //           response.data.data ===
  //           "Quiz has been completed no more questions to display"
  //         ) {
  //           setisquizcompleted(true);
  //           setQuizStart(false);
  //         } else if (response?.data?.data[0]?.question_no === 1) {
  //           setQuizStart(true);
  //           setisquizcompleted(false);
  //         } else {
  //           setQuizStart(false);
  //           setisquizcompleted(false);
  //         }
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  const handleNxtVideo = (id) => {
    // here id = course_id //
    fetchData(id);
    setItem("VIDEO");
  };

  async function modulesListUpdateApi(courseTopicId) {
    // here courseTopicId = courseTopicId //
    // here we can see the mentorTopicProgress //
    const body1 = JSON.stringify({
      user_id: JSON.stringify(currentUser?.data[0]?.user_id),
      mentor_course_topic_id: JSON.stringify(courseTopicId),
      status: "Completed",
    });
    var config = {
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/mentorTopicProgress",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.data[0]?.token}`,
      },
      data: body1,
    };
    await axios(config)
      .then(function (response) {
        if (response.status === 201) {
          setUpdateModuleResponce(response.data && response.data.data[0]);
          props.getTeacherCourseDetailsActions(course_id);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handlePause = (event) => {
    // console.log(event.seconds, "see");
    // here we can pause the video //
    setPaused(event.target.checked);
  };

  const handlePlayerPause = (event) => {
    setPaused(true);
  };
  const handlePlayerPlay = (event) => {
    setPaused(false);
  };

  const handleVolume = (event) => {
    // here we can increase  volume //
    setVolume(parseFloat(false));
  };

  const selectVideo = (index) => {
    setVideoIndex(index);
  };

  const SearchProps = {
    size: "small",
    placeholder: "Search Course",
  };

  const handleItem = (item) => {
    setItem(item);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setVideosList({
      ...videosList,
      [name]: value,
    });
  };

  const handleModulesOnChange = (e) => {
    const { name, value } = e.target;
    setModulesList({
      ...modulesList,
      [name]: value,
    });
  };

  const handleSeeked = (event) => {
    // console.log("428 event fired: ", event);
  };

 

  const handleTimeUpdate = (event) => {
    const videoLength = event.duration; //500
    const halfTrimmedLength = videoLength / 2; //250
    const calculatePercentage = halfTrimmedLength / videoLength; //0.5
    const eventSeconds = Math.floor(event.seconds);
    const calculatedSeconds = Math.floor(halfTrimmedLength);
  };

  const handleVimeoOnEnd = (event) => {
    modulesListUpdateApi(topicObj.mentor_course_topic_id);
    handleSelect(
      topicObj.topic_type_id,
      topicObj.mentor_course_topic_id,
      topicObj.topic_type
    );
    handlePlayerPlay();
    setHandbook(true);
    setCourseData(topicObj);
  };

  const handleSelect = (topicId, couseId, type) => {
    // here topicId = topicId //
    // here couseId = couseId  //
    // here type = Attachment ,Video ,Quiz //
    scrollRef.current.scrollIntoView();
    setCourseTopicId(couseId);
    const topic_Index =
      setTopicArrays &&
      setTopicArrays.findIndex(
        (data) =>
          data.topic_type_id === topicId &&
          data.mentor_course_topic_id === couseId
      );
    const topicObj = setTopicArrays[topic_Index + 1];
    setTopicObj(topicObj);
    if (type === "ATTACHMENT") {
      setWorksheetId(topicId);
      getWorkSheetApi(topicId);
      setItem("ATTACHMENT");
      // setHideQuiz(false);
    } else if (type === "VIDEO") {
      setItem("VIDEO");
      fetchData(topicId);
      // setHideQuiz(false);
      // } else if (type === "QUIZ") {
      //   getisquizcompleted();
      //   setItem("QUIZ");
      //   setQizId(topicId);
    } else {
      setItem("");
      // setHideQuiz(false);
    }
  };

  const videoStatus = (type, status) => {
    // console.log(type, "type", status, "status");
    // here we can see the videoStatus //

    // type = video ,attachment ,quiz, certificates  //
    //  where status = completed /incomplete //
    const done = (
      <FeatherIcon
        className="mx-2 done"
        icon="play-circle"
        style={{ color: "#4bae4f" }}
      />
    );
    const notDone = (
      <FeatherIcon
        className="mx-2"
        icon="play-circle"
        style={{ color: "#c0c0c0" }}
      />
    );

    // const done = <IoCheckmarkDoneCircleSharp className="done" />;
    // const notDone = <IoCheckmarkDoneCircleSharp />;
    if (type === "VIDEO" && status === "COMPLETED") {
      return done;
    } else if (type === "VIDEO" && status === "INCOMPLETE") {
      return notDone;
    }
    if (type === "ATTACHMENT" && status === "COMPLETED") {
      return done;
    } else if (type === "ATTACHMENT" && status === "INCOMPLETE") {
      return notDone;
    }
    // if (type === "QUIZ" && status === "COMPLETED") {
    //   return done;
    // } else if (type === "QUIZ" && status === "INCOMPLETE") {
    //   return notDone;
    // }
    if (type === "CERTIFICATE" && status === "COMPLETED") {
      return done;
    } else if (type === "CERTIFICATE" && status === "INCOMPLETE") {
      return notDone;
    }
  };

  const handleClose = (item) => {
    setItem("WORKSHEET");
    setModalShow(item);
    setHideQuiz(false);
  };
  const handleQuiz = () => {
    // here we can see Quiz //
    modulesListUpdateApi(topicObj.mentor_course_topic_id);
    handleSelect(
      topicObj.topic_type_id,
      topicObj.mentor_course_topic_id,
      topicObj.topic_type
    );
  };

  const handleAssesmentClose = (item) => {
    setItem("VIDEO");
    // const video_Id_Index =
    //   setArrays && setArrays.findIndex((data) => data === videoId);
    // const Video_id = setArrays[video_Id_Index + 1];
    // setVideoId(Video_id);
    setModalShow(item);
    setHideQuiz(false);
  };

  const changeHandler = (event) => {
    const file = event.target.files[0].name.split(".", 2);
    if (file[1] === "csv" || file[1] === "pdf") {
      let img = event.target.files[0];
      setUrl(file[1]);
      setImage(img);
      setFileName(event.target.files[0].name);
    }
  };
  const removeSelectedImage = () => {
    // here we can remove the selected image //
    setImage();
    setFileName();
    setUrl();
  };

  const handleSubmit = (e) => {
    // here we can submit the worksheets  responses//
    const data = new FormData();
    const ID = encryptGlobal(JSON.stringify(worksheetId));
    data.append("attachment_1", image);
    var config = {
      method: "post",
      url:
        process.env.REACT_APP_API_BASE_URL + "/worksheets/" + ID + "/response",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.data[0]?.token}`,
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          getWorkSheetApi(worksheetId);
          setImage();
          setFileName();
          setUrl();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleNextCourse = () => {
    // here we can go for next course //
    // here course_topic_id = course_topic_id //
    modulesListUpdateApi(topicObj.course_topic_id);
    handleSelect(
      topicObj.topic_type_id,
      topicObj.course_topic_id,
      topicObj.topic_type
    );
  };

  const startFirstCourse = (e) => {
    // here we can start the course //
    setCourseData(firstObj[0]);
    modulesListUpdateApi(firstObj[0].mentor_course_topic_id);
    handleSelect(
      firstObj[0].topic_type_id,
      firstObj[0].mentor_course_topic_id,
      firstObj[0].topic_type
    );
  };

  const startContinueCourse = (e) => {
    // here we can continue the course //
    setCourseData(continueObj[0]);
    modulesListUpdateApi(continueObj[0].mentor_course_topic_id);
    handleSelect(
      continueObj[0].topic_type_id,
      continueObj[0].mentor_course_topic_id,
      continueObj[0].topic_type
    );
    if (
      continueObj[0].title.toLowerCase() === "handbook" ||
      continueObj[0].title === "கையேடு"
    ) {
      setHandbook(true);
      setInstructions(false);
    }
    // toggle(continueObj[0].course_module_id);
  };

  const handlenextend = () => {
    // here we can see continue button , go to the next course //
    handleVimeoOnEnd();
    setInstructions(true);
    setHandbook(false);
  };

  const handleDownload = (path) => {
    // here we can download teacher handbook //
    let a = document.createElement("a");
    a.target = "_blank";
    //a.href = process.env.REACT_APP_API_IMAGE_BASE_URL + path;
    a.href = path;
    a.click();
    handleVimeoOnEnd();
    setInstructions(true);
    setHandbook(false);
  };
  const handleInstructionDownload = (path) => {
    // here we can download the instructions  //
    let a = document.createElement("a");
    a.target = "_blank";
    //a.href = process.env.REACT_APP_API_IMAGE_BASE_URL + path;
    a.href = path;
    a.click();
  };
  const handleCertificateDownload = () => {
    // here we can download the certificate //
    const content = pdfRef.current;
    const doc = new jsPDF("l", "px", [210, 297]);
    doc.html(content, {
      callback: function (doc) {
        doc.save("certificate.pdf");
      },
    });
  };
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4> {t("teacherJourney.Course")}</h4>
              <h6>{t("teacherJourney.headingcourse")}</h6>
            </div>
          </div>
        </div>
        <div className="courses-page" ref={scrollRef}>
          <div className="container-fluid" style={{ minHeight: "72vh" }}>
            <Row className="m-0 courser-video-section ">
              <Col
                xl={4}
                className="sidebars-right theiaStickySidebar section-bulk-widget course-assement"
              >
                <div className="notes-dash assement-info">
                  <div className="notes-top-head">
                    <h5>
                      {" "}
                      <i
                        data-feather="file-text"
                        className="feather-file-text"
                      ></i>{" "}
                      Lessons
                    </h5>
                  </div>
                  <div
                    className="notes-top-head-submenu assement-item"
                    id="scrollbar"
                  >
                    {teacherCourseDetails &&
                      teacherCourseDetails.length &&
                      teacherCourseDetails.map((course, index) => {
                        return (
                          <div
                            key={index}
                            className={`course-sec-list ${
                              course.progress === "COMPLETED"
                                ? "hHover"
                                : "noHover"
                            }`}
                          >
                            <Row
                              style={{
                                background:
                                  currentTopicId ===
                                    course.mentor_course_topic_id && "#f0f3f8",
                              }}
                              className={`justify-content-between w-100 px-0 py-3 my-0 ${
                                course.progress === "COMPLETED"
                                  ? "hHover"
                                  : "noCurser"
                              }`}
                            >
                              <Col
                                md={12}
                                className="my-auto"
                                onClick={() => {
                                  setCourseData(course);
                                  handleSelect(
                                    course.topic_type_id,
                                    course.mentor_course_topic_id,
                                    course.topic_type
                                  );
                                  if (
                                    course.title.toLowerCase() === "handbook" ||
                                    course.title === "கையேடு"
                                  ) {
                                    setHandbook(true);
                                    setInstructions(false);
                                  } else if (
                                    course.title.toLowerCase() ===
                                      "congratulations" ||
                                    course.title === "வழிமுறைகள்"
                                  ) {
                                    setInstructions(true);
                                    setHandbook(false);
                                  } else if (
                                    course.title.toLowerCase() === "certificate"
                                  ) {
                                    setCertificate(true);
                                    setItem("CERTIFICATE");
                                  }
                                }}
                              >
                                <p className="course-icon mb-0">
                                  {videoStatus(
                                    course.topic_type,
                                    course.progress
                                  )}

                                  <span
                                    className="course-title"
                                    style={{ "font-weight": "600" }}
                                  >
                                    {course.title}
                                  </span>
                                </p>
                              </Col>
                            </Row>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </Col>


              <Col xl={8} className="course-video mb-5 order-1 order-xl-2">
                {
                 
                  item === "ATTACHMENT" &&
                  !instructions &&
                  handbook &&
                  props.mentorAttachments.length > 0 &&
                  props.mentorAttachments[0]?.attachments?.split("{{}}") ? (
                    <Fragment>
                      <Card className="course-sec-basic p-2">
                        <CardBody>
                          <CardTitle
                            className="text-left text-primary"
                            tag="h2"
                          >
                            {t("teacherJourney.teacherhand")}
                          </CardTitle>
                          <CardBody>
                            <p>
                              <b> {t("teacherJourney.dear")}</b>
                            </p>
                            <p>{t("teacherJourney.hand1")}</p>
                            <p className="text-success">
                              <b>{t("teacherJourney.hnad2")}</b>
                            </p>

                            <ul>
                              <li> {t("teacherJourney.hand3")}</li>
                              <li> {t("teacherJourney.hand4")}</li>
                              <li>{t("teacherJourney.hand5")}</li>
                              <li>{t("teacherJourney.hand6")}</li>
                              <li>{t("teacherJourney.hand7")}</li>
                              <li>{t("teacherJourney.hand8")}</li>
                              <li>{t("teacherJourney.hand9")}</li>
                            </ul>
                            <br></br>
                            <p>{t("teacherJourney.hand10")}</p>

                            <p>
                              {t("teacherJourney.hand11")}

                          
                            </p>

                           
                          </CardBody>
                          <div className="text-left mb-2">
                            <div>
                              {worksheetResponce &&
                                worksheetResponce?.length > 0 &&
                                worksheetResponce.map((item, i) => (
                                  <button
                                    style={{
                                      margin: "5px",
                                    }}
                                    key={i}
                                    className="btn btn-secondary"
                                    
                                    onClick={() => handleDownload(item)}
                                  >
                                    {`Download ${item
                                      .split("/")
                                      [item.split("/").length - 1].split(".")[0]
                                      .replace("_", " ")}`}
                                  </button>
                                ))}
                            </div>
                          </div>
                          <Col className="text-right">
                            <button
                              // label={"Continue"}
                              onClick={() => handlenextend()}
                              className="btn btn-warning"
                            >
                              Continue
                            </button>
                          </Col>
                        </CardBody>
                      </Card>
                    </Fragment>
                  ) : item === "VIDEO" && condition === "Video1" ? (
                    <Card className="embed-container">
                      <CardTitle className="text-left p-1 d-flex justify-content-between align-items-center">
                        <h3>{courseData.title}</h3>
                       
                      </CardTitle>
                      <Vimeo
                        video={id.video_stream_id}
                        volume={volume}
                        paused={paused}
                        onPause={handlePlayerPause}
                        onPlay={handlePlayerPlay}
                        onSeeked={handleSeeked}
                        onTimeUpdate={handleTimeUpdate}
                        onEnd={handleVimeoOnEnd}
                      />
                    </Card>
                  ) : (
                    
                    !instructions &&
                    !handbook && (
                      <Fragment>
                        <Card className="course-sec-basic ">
                          <CardBody>
                            {getLastCourseStatus(teacherCourseDetails) &&
                            !finalPage ? (
                              <div>
                                <Confetti className="w-100" />;
                                <h3 className="text-success text-center">
                                  🎉 {t("teacherJourney.coursecom")}
                                  🎉
                                </h3>
                                <br />
                                <p>
                                  <b style={{ color: "green" }}>
                                    {t("teacherJourney.text1")}
                                  </b>
                                </p>
                                <ol className="text-left">
                                  <li>{t("teacherJourney.tex2")}</li>
                                  <li>{t("teacherJourney.text3")}</li>
                                  <li>{t("teacherJourney.text4")}</li>
                                  <li>{t("teacherJourney.tex5")}</li>
                                  <li>{t("teacherJourney.text6")}</li>
                                  <li>{t("teacherJourney.text7")}</li>
                                </ol>
                                <br />
                                <p>{t("teacherJourney.text8")}</p>
                              </div>
                            ) : (
                              <div>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      "<h3 class='text-success'>Welcome Teachers! </h3></br>We’re excited that you will be part of the program in guiding your student through it.</br><p>Now it’s time to start the program.</p><ol>We would like you all to go through the following in order.</br><li>1. Watch the instructional videos for overview of the program.</li><li>2. Read the teacher's handbook for a summary of the course and other important instructions.</li></ol></br><p>You have one week to do these. Afterwards, you and your students will be ready to start their problem solving journey!</p><p>We hope you enjoy guiding the students as they embark on this new journey!</p>Wishing you all the best!",
                                  }}
                                ></div>
                                <br />
                                {firstObj[0] &&
                                firstObj[0].progress == "INCOMPLETE" ? (
                                  <div className="mt-2">
                                    <button
                                      className="btn btn-warning mt-2"
                                      onClick={(e) => startFirstCourse(e)}
                                    >
                                      {t("teacherJourney.sCourse")}
                                    </button>
                                  </div>
                                ) : (
                                  <div>
                                    {getLastCourseStatus(
                                      teacherCourseDetails
                                    ) ? (
                                      <button
                                        className="btn btn-warning"
                                        onClick={(e) => startContinueCourse(e)}
                                      >
                                        {t("teacherJourney.CONTINUECOURSE")}
                                      </button>
                                    ) : (
                                      <button
                                        className="btn btn-warning"
                                        onClick={(e) => startContinueCourse(e)}
                                      >
                                        {t("teacherJourney.CONTINUECOURSE")}
                                      </button>
                                    )}
                                  </div>
                                )}
                              </div>
                            )}
                          </CardBody>
                        </Card>
                      </Fragment>
                    )
                  )
                }
               
                {item === "ATTACHMENT" &&
                  instructions &&
                  !handbook &&
                  props.mentorAttachments.length > 0 &&
                  props.mentorAttachments[1]?.attachments?.split("{{}}") && (
                    // .length > 2
                    <Fragment>
                      <Card className="course-sec-basic p-2">
                        <CardBody>
                          <CardTitle>
                            <h3 className="text-success">
                              🎉 {t("teacherJourney.coursecom")} 🎉
                            </h3>
                          </CardTitle>

                          <CardBody>
                            <p>
                              <b style={{ color: "green" }}>
                                {t("teacherJourney.text1")}
                              </b>
                            </p>

                            <ol className="text-left">
                              <li>{t("teacherJourney.tex2")}</li>
                              <li> {t("teacherJourney.text3")}</li>
                              <li>{t("teacherJourney.text4")}</li>
                              <li>{t("teacherJourney.tex5")}</li>
                              <li>{t("teacherJourney.text6")}</li>
                              <li>{t("teacherJourney.text7")}</li>
                            </ol>
                            <br />

                            <p>{t("teacherJourney.text8")}</p>
                          </CardBody>
                        </CardBody>
                      </Card>
                    </Fragment>
                  )}

              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ teacherCourses, adminCourses }) => {
  const { teaherCoursesDetails, loading, mentorAttachments } = teacherCourses;
  const { adminCoursesDetails } = adminCourses;
  return {
    teaherCoursesDetails,
    loading,
    adminCoursesDetails,
    mentorAttachments,
  };
};

export default connect(mapStateToProps, {
  getTeacherCourseDetailsActions: getTeacherCourseDetails,
  getAdminCourseDetailsActions: getAdminCourseDetails,
  getMentorCourseAttachmentsActions: getMentorCourseAttachments,
})(TeacherPlayVideo);
