
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import Chart from "react-apexcharts";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import "bootstrap-daterangepicker/daterangepicker.css";
import DateRangePicker from "react-bootstrap-daterangepicker";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { Link } from "react-router-dom";
import { setToogleHeader } from "../../core/redux/action";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "react-bootstrap";
import { all_routes } from "../../Router/all_routes";
////////my code/////////////
import { getCurrentUser } from "../../helpers/Utils";
import FeatherIcon from "feather-icons-react";
import LatestNews from './LatestNews';
import { Eye } from "react-feather";
import { FaBook, FaLightbulb } from 'react-icons/fa';
import { FaLifeRing } from 'react-icons/fa';
import { FaPoll } from 'react-icons/fa';
import { FaRoute } from 'react-icons/fa';
import { FaPlay } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import VideoModal from '../../HelpVideo/VideoModal';
import { encryptGlobal } from '../../constants/encryptDecrypt';
import axios from 'axios';
import { Modal } from 'react-bootstrap';

import LanguageSelectorComp from '../../components/LanguageSelectorComp/index.js';
import MultiProgressBar from "./Multiprogessbar.js";
const GreetingModal = (props) => {
  return (
    <Modal
      show={props.show}
      size="lg"
      centered
      className="modal-popup text-center"
      onHide={props.handleClose}
      backdrop={true}
    >
      {/* <Modal.Header closeButton></Modal.Header> */}

        <Modal.Body>
         <figure>
             <div className="row">
                 {/* YouTube Video Section */}
                 {props.youtube && (
                     <div className="col-md-6">
                         <div className="modal-body custom-modal-body">
                             <div style={{ width: "100%", height: "400px" }}>
                                 <iframe
                                     src={props.youtube
                                         .replace("youtu.be/", "www.youtube.com/embed/")
                                         .replace("watch?v=", "embed/")
                                         .split("&")[0]}
                                     title="Video popup"
                                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                     allowFullScreen
                                 ></iframe>
                             </div>
                         </div>
                     </div>
                 )}
     
                 {/* Image Section */}
                 {props.imagedata && (
                     <div className="col-md-6 d-flex justify-content-center align-items-center"  style={{ height: "400px" }}>
                         <img
                             src={props.imagedata}
                             alt="popup image"
                             className="img-fluid"
                             style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
                         />
                     </div>
                 )}
             </div>
         </figure>
     </Modal.Body>
      <Modal.Footer>
        <div>
        {props.state != null && <>
          <Link
            to={props.state}
            type="button"
            //className="product-img"
          >
            <button
              label={"Navigate"}
              className="btn btn-warning"
            >
              Navigate
            </button>
          </Link>
          <span style={{paddingLeft:'1rem'}}>Click here to redirect to Reference Course</span></>
          }
          </div>
          <div>
          {props.file && (<div>
            <a
        href={props.file}
        download
        target="_blank"
        rel="noopener noreferrer"
        //className="product-img"
    >
        <button className="btn btn-warning">
         File
        </button>
        
    </a>
    <span style={{paddingLeft:'1rem'}}>{props.fileName}</span>
    
          </div>
    
)}
        </div>
        
<div>
{props.urlData && (<div>
  <a
        href={props.urlData}
        download
        target="_blank"
        rel="noopener noreferrer"
        //className="product-img"
    >
        <button className="btn btn-warning">
          Link
        </button>
    </a>
    <span style={{paddingLeft:'1rem'}}>{props.urlData}</span>
    
</div>
    
)}
</div>

      </Modal.Footer>
    </Modal>
  );
};

const DBStu = () => {
  
  const [showsPopup, setShowsPopup] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const [popLink, setPopLink] = useState('');
  const [poptype, setPopType] = useState('');
  const [state, setState] = useState("");

  /////////my code//////////////////
  const currentUser = getCurrentUser("current_user");
  const [selectedLanguage, setSelectedLanguage] = useState('Select Language');
  const navigate = useNavigate();
  const [stuPreSLoading, setStuPreSLoading] = useState(true);
  const [stuCourseLoading, setStuCourseLoading] = useState(true);
  const [stuPostSLoading, setStuPostSLoading] = useState(true);
  const [stuIdeaLoading, setStuIdeaLoading] = useState(true);
  const [stuPostSurvey, setStuPostSurvey] = useState("");
  const [stuPreSurvey, setStuPreSurvey] = useState("");
  const [stuIdeaSub, setStuIdeaSub] = useState("");
  const [courseData, setCourseData] = useState("");

  const [coursepercentage, setCoursepercentage] = useState();
  const [video, setVideo] = useState("");
  const [message, setMessage] = useState("");

  const [show, setShow] = useState(false);


   const [file, setFile] = useState("");
   const fileName = file.substring(file.lastIndexOf('/') + 1);
   const decodedFileName = decodeURIComponent(fileName);
    const [imagedata, setImageData] = useState("");
    const [urlData, setUrlData] = useState("");
    const [youtube, setYoutube] = useState("");


  const language = useSelector(
    (state) => state?.studentRegistration?.studentLanguage
  );
  useEffect(() => {
    const popParam = encryptGlobal(
      JSON.stringify({
        state: currentUser.data[0]?.state,
        role: currentUser.data[0]?.role
      })
    );
    let popupCount = parseInt(localStorage.getItem("popupCount")) || 0;
    if (popupCount < 3) {
    var config = {
      method: 'get',
      url: process.env.REACT_APP_API_BASE_URL + `/popup?Data=${popParam}`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${currentUser.data[0]?.token}`
      }
    };
    axios(config)
      .then(function (res) {
        if (res.status === 200 && res.data.data[0]?.on_off === '1') {
          // console.log(res,"res");
          setShowsPopup(true);
          setFile(res?.data?.data[0]?.file);
          setImageData(res?.data?.data[0]?.image);
          setUrlData(res?.data?.data[0]?.url);
          setYoutube(res?.data?.data[0]?.youtube);
          
          setState(res?.data?.data[0]?.navigate);
          localStorage.setItem("popupCount", popupCount + 1);
        }
      })
      .catch(function (error) {
        setShowsPopup(false);
        console.log(error);
      });
    }
  }, []);
  const Loader = () => (
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );

  const redirectToPreSurvey = () => {
    navigate(`/studentpresurvey`);
  };
  const redirectToCourse = () => {
    navigate(`/studentcourse/1`);
  };
  const redirectToPost = () => {
    navigate(`/studentpostsurvey`);
  };

  const renderTooltip = (props) => (
    <Tooltip id="pdf-tooltip" {...props} >
      Watch Demo
    </Tooltip>
  );
  const renderViewTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>
      Redirect
    </Tooltip>
  );

  const handleShow = (i) => {
    setVideo(vimeoId[i]);
    setShow(true);
  };
  const vimeoId = ["https://www.youtube.com/embed/WxafskPsMog",
    "https://www.youtube.com/embed/g5bDS1x5C4g",
    "https://www.youtube.com/embed/0sG7Ew1fr6A",
    "https://www.youtube.com/embed/mDkYsD1ZxYA",
    "https://www.youtube.com/embed/NYxbFvjG8vQ",
    "https://www.youtube.com/embed/A5vvpfnVvcE",

  ];

  // const handleLanguageChange = (language) => {
  //   setSelectedLanguage(language);
  // };

  const scroll = () => {
    const section = document.querySelector('#start');
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    if (currentUser?.data[0]?.user_id) {
      stuCoursePercent();
      stuBadgesCount();
      stuQuizCount();
      stuVideosCount();
      stuSurveyStatus();
      stuIdeaSubStatus();
      fetchInstructions();
      scroll();
      // fetchData();
    }
  }, [currentUser?.data[0]?.user_id]);
  const [badges, setBadges] = useState(0);
  const [quiz, setQuiz] = useState(0);
  const [videos, setVideos] = useState(0);
const [predata,setPreData]=useState("");
const [postdata,setPostData]=useState("");
// console.log(predata,"pre");
  const handleNavigation = () => {
    navigate("/instructionstu", { state: { instruction: message } });
  };

  const fetchInstructions = () => {
    // Function to fetch the WhatsApp link from the API
    const statenameApi = encryptGlobal(
      JSON.stringify({
        state_name: currentUser?.data[0]?.state
      })
    );
    var config = {
      method: 'get',
      url:
        process.env.REACT_APP_API_BASE_URL +
        `/dashboard/whatappLink?Data=${statenameApi}`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${currentUser.data[0]?.token}`
      }
    };
    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          //console.log(response);
          setMessage(response.data.data[0].student_note);
          // console.log(response.data.data[0].student_note,"message");
        }
      })
      .catch(function (error) {
        console.log(error);
      }
      );
  };
  const fetchData = () => {
    // Function to fetch the WhatsApp link from the API
    const idParam = encryptGlobal(JSON.stringify(currentUser.data[0].user_id));
    var config = {
      method: 'get',
      url:
        process.env.REACT_APP_API_BASE_URL +
        `/students/${idParam}/studentCertificate`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${currentUser.data[0]?.token}`
      }
    };
    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          console.log(response,"Certificte");
         
        }
      })
      .catch(function (error) {
        console.log(error);
      }
      );
  };
  const stuSurveyStatus = () => {
    const surveyApi = encryptGlobal(
      JSON.stringify({
        user_id: currentUser?.data[0]?.user_id
      })
    );
    var config = {
      method: 'get',
      url:
        process.env.REACT_APP_API_BASE_URL +
        `/dashboard/stuPrePostStats?Data=${surveyApi}`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${currentUser.data[0]?.token}`
      }
    };
    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          // console.log(response);
          const po = (response.data.data[0].post_survey_completed_date);
          const pre = (response.data.data[0].pre_survey_completed_date);
          setStuPostSurvey(po);

          setStuPreSurvey(pre);
          setStuPostSLoading(false);
          setStuPreSLoading(false);
          setPreData(response.data.data[0].pre_survey_completed_date !== null ? "Completed":"Not Stated");
          setPostData(response.data.data[0].post_survey_completed_date !== null ? "Completed":"Not Stated");

        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const stuIdeaSubStatus = () => {
    const ideaSubApi = encryptGlobal(
      JSON.stringify({
        team_id: currentUser?.data[0]?.team_id
      })
    );
    var config = {
      method: 'get',
      url:
        process.env.REACT_APP_API_BASE_URL +
        `/challenge_response/submittedDetails?Data=${ideaSubApi}`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${currentUser.data[0]?.token}`
      }
    };
    axios(config)
      .then(function (response) {
        // console.log(response, "res");
        if (response.status === 200) {
          // console.log(response, "ideaSubApi");
          setStuIdeaSub(response.data.data[0].status);
          setStuIdeaLoading(false);
        }
      })
      .catch(function (error) {
        // console.log(error,"error");
        if (error.response.data.status === 404) {
          setStuIdeaSub("Not Started");
          setStuIdeaLoading(false);
        }

      });
  };
  const [ideaEnableStatus, setIdeaEnableStatus] = useState(0);

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
          const per = Math.round(
            (response.data.data[0].topics_completed_count /
              response.data.data[0].all_topics_count) *
            100
          );
          // console.log(per,"per");
        let anyCompleted = false;
        if (per === 100) {
          anyCompleted = true;
        }
        const ideaStatus = anyCompleted ? 1 : 0;
        localStorage.setItem("ideaenablestatus", ideaStatus);
        setIdeaEnableStatus(ideaStatus); 
        // console.log(ideaEnableStatus,"11");

          // if (per === 100) {
          //   const ideaStatus = "enabled"; // You can set any value based on your logic
          //   localStorage.setItem("ideaenablestatus", ideaStatus);
          // }
          // console.log(per);
          setCoursepercentage(per);
          setCourseData(per === 100 ? "Completed" :"Not Started");
          setStuCourseLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
// console.log(courseData,"%%");
  const stuBadgesCount = () => {
    const badgeApi = encryptGlobal(
      JSON.stringify({
        user_id: currentUser?.data[0]?.user_id
      })
    );
    var config = {
      method: 'get',
      url:
        process.env.REACT_APP_API_BASE_URL +
        `/dashboard/stuBadgesStats?Data=${badgeApi}`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${currentUser.data[0]?.token}`
      }
    };
    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          // console.log(response);
          setBadges(response.data.data[0].badges_earned_count);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const stuQuizCount = () => {
    const quizApi = encryptGlobal(
      JSON.stringify({
        user_id: currentUser?.data[0]?.user_id
      })
    );
    var config = {
      method: 'get',
      url:
        process.env.REACT_APP_API_BASE_URL +
        `/dashboard/stuQuizStats?Data=${quizApi}`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${currentUser.data[0]?.token}`
      }
    };
    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          // console.log(response);
          setQuiz(response.data.data[0].quiz_completed_count);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const stuVideosCount = () => {
    const videoApi = encryptGlobal(
      JSON.stringify({
        user_id: currentUser?.data[0]?.user_id
      })
    );
    var config = {
      method: 'get',
      url:
        process.env.REACT_APP_API_BASE_URL +
        `/dashboard/stuVideoStats?Data=${videoApi}`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${currentUser.data[0]?.token}`
      }
    };
    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          // console.log(response);
          setVideos(response.data.data[0].videos_completed_count);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleClose = () => {
    setShowsPopup(false);
  };
  // console.log(stuPostSurvey,"post");
  return (
    <>
      <GreetingModal
        handleClose={handleClose}
        show={showsPopup}
        file={file}
        imagedata={imagedata}
        urlData={urlData}
        youtube={youtube}
        state={state}
        fileName={decodedFileName}
      ></GreetingModal>
      <div className="page-wrapper" id="start">
        <div className="content">
          <div className="welcome d-lg-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center welcome-text">
              <h3 className="d-flex align-items-center">
                <span style={{ fontSize: '30px' }}>👋</span>
                &nbsp;Hi {currentUser?.data[0]?.full_name}&nbsp;
              </h3>

              <h6> here&apos;s what&apos;s happening with your School Innovation Marathon 2025 today.</h6>
            </div>
           
            {/* <div className="d-flex align-items-center">
              <div className="dropdown">
                  <LanguageSelectorComp module="student" />
              </div>
            </div> */}
          </div>
          <div className="col-xl-12 col-sm-12 col-12 d-flex">
              <MultiProgressBar  predata={predata} 
        postdata={postdata} 
        stuIdeaSub={stuIdeaSub}
        courseData={courseData} 
         />
            </div>
          <div className="row sales-cards">
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card color-info bg-success mb-4 ">
                <h3>
                  {" "}
                  <CountUp end={coursepercentage} duration={4}>
                    +
                  </CountUp> / 100
                </h3>
                <p>Course Completion %</p>
                <FeatherIcon icon="monitor" />
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card color-info" style={{ background: "#00CFE8" }}>
                <h3>
                  {" "}
                  <CountUp end={quiz} duration={4}>
                    +
                  </CountUp> / 5
                </h3>
                <p>Quizes Passed</p>
                <FeatherIcon icon="thumbs-up" />
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card color-info bg-secondary mb-4">
                <h3>
                  <CountUp end={videos} duration={4}>
                    +
                  </CountUp> / 24
                </h3>
                <p>Course Videos Watched</p>
                <FeatherIcon icon="video" />
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card color-info bg-primary">
                <h3>
                  <CountUp end={badges} duration={4}>
                    +
                  </CountUp> / 8
                </h3>

                <div className="info">
                  <Link to={"/badges"}>
                    <p>Badges Achieved</p>

                  </Link>
                  <FeatherIcon icon="award" />
                </div>
              </div>
            </div>
          </div>
          {/* Quicklinks , Latest News */}
          <div className="row">
            {/* Quick links */}
            <div className="col-xl-6 col-sm-12 col-12 d-flex">
              <div className="card flex-fill default-cover w-100 mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h4 className="card-title mb-0">SIM Road Map{""}
                  <OverlayTrigger placement="top" overlay={renderTooltip}>
                                  <Link
                                      to="#"
                                      className="me-2 p-2"
                                      onClick={() => handleShow(5)}
                                      {...(show ? { 'data-bs-toggle': 'modal', 'data-bs-target': '#add-units' } : {})}
                                      
                                  >
                                    <FaPlay  style={{color:"red"}} />
                                  </Link>
                                </OverlayTrigger>
                  </h4>
                  <div className="dropdown" onClick={handleNavigation}>
                    <Link to="/instructionstu" className="view-all d-flex align-items-center">
                      <span className="ps-2 d-flex align-items-center">
                        <FaRoute size={30} />
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-borderless best-seller">
                      <tbody>
                        <tr>
                          <td>
                            <div className="product-info">
                              <Link
                                to={"/studentpresurvey"}
                                className="product-img"
                              >
                                <FaPoll size={30} style={{ marginRight: "10px", color: "orange" }} />
                              </Link>
                              <div className="info">
                                <Link to={"/studentpresurvey"}>
                                  <h4>Pre Survey</h4>
                                </Link>
                                <p className="dull-text">Quick Short Survey</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="action-table-data">
                              <div className="edit-delete-action">
                                <OverlayTrigger placement="top" overlay={renderTooltip}>
                                  <Link
                                      to="#"
                                      className="me-2 p-2"
                                      onClick={() => handleShow(0)}
                                      {...(show ? { 'data-bs-toggle': 'modal', 'data-bs-target': '#add-units' } : {})}
                                      
                                  >
                                    <FaPlay  style={{color:"red"}} />
                                  </Link>
                                </OverlayTrigger>
                              </div>
                            </div>
                          </td>
                          <td>
                            {stuPreSLoading ? (
                              <Loader />
                            ) : stuPreSurvey === null ? (
                              <>
                                <span
                                  className={"badge badge-linedangered"}
                                  onClick={redirectToPreSurvey}
                                >
                                  Yet to Take
                                </span>
                              </>
                            ) : (
                              <>
                                <span
                                  className={"badge badge-linesuccess"}
                                  onClick={redirectToPreSurvey}
                                >
                                  Completed
                                </span>
                              </>
                            )}
                          </td>
                          <td>
                            <div className="action-table-data">
                              <div className="edit-delete-action">
                                <OverlayTrigger placement="top" overlay={renderViewTooltip}>
                                  <Link data-bs-toggle="tooltip" data-bs-placement="top" className="me-2 p-2" to={"/studentpresurvey"} >
                                    <Eye className="feather-view" />
                                  </Link>
                                </OverlayTrigger>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="product-info">
                              <Link
                                to={"/studentcourse/1"}
                                className="product-img"
                              >
                                <FaChalkboardTeacher size={30} style={{ marginRight: "10px", color: "orange" }} />
                              </Link>
                              <div className="info">
                                <Link to={"/studentcourse/1"}>
                                  <h4>Student Course</h4>
                                </Link>
                                <p className="dull-text">On Problem Solving Journey</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="action-table-data">
                              <div className="edit-delete-action">
                                <OverlayTrigger placement="top" overlay={renderTooltip}>
                                  <Link
                                      to="#"
                                      className="me-2 p-2"
                                      onClick={() => handleShow(1)}
                                      {...(show ? { 'data-bs-toggle': 'modal', 'data-bs-target': '#add-units' } : {})}
                                      
                                  >
                                    <FaPlay  style={{color:"red"}} />
                                  </Link>
                                </OverlayTrigger>
                              </div>
                            </div>
                          </td>
                          <td>
                            {stuCourseLoading ? (
                              <Loader />
                            ) : ((coursepercentage === 0) ? (
                              <>
                                <span
                                  className={"badge badge-linedangered"}
                                  onClick={redirectToCourse}
                                >
                                  Not Started
                                </span>
                              </>
                            ) : ((coursepercentage != 100) ? (
                              <>
                                <span
                                  className={"badge badge-bgdanger"}
                                  onClick={redirectToCourse}
                                >
                                  InProgress
                                </span>
                              </>
                            ) : (
                              <>
                                <span
                                  className={"badge badge-linesuccess"}
                                >
                                  Completed
                                </span>
                              </>
                            )))}
                          </td>
                          <td>
                            <div className="action-table-data">
                              <div className="edit-delete-action">
                                <OverlayTrigger placement="top" overlay={renderViewTooltip}>
                                  <Link data-bs-toggle="tooltip" data-bs-placement="top" className="me-2 p-2" to={"/studentcourse/1"} >
                                    <Eye className="feather-view" />
                                  </Link>
                                </OverlayTrigger>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="product-info">
                              <Link
                                // to="/instruction"
                                to="#"
                                className="product-img"
                              >
                                <FaLightbulb size={30} style={{ marginRight: "10px", color: "orange" }} />
                              </Link>
                              <div className="info">
                                <Link 
                                  to="#"
                                // to="/instruction"
                                >
                                  <h4>Idea Submission</h4>
                                </Link>
                                <p className="dull-text">Select a theme & submit idea</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="action-table-data">
                              <div className="edit-delete-action">
                                <OverlayTrigger placement="top" overlay={renderTooltip}>
                                  <Link
                                      to="#"
                                      className="me-2 p-2"
                                      onClick={() => handleShow(2)}
                                      {...(show ? { 'data-bs-toggle': 'modal', 'data-bs-target': '#add-units' } : {})}
                                      
                                  >
                                    <FaPlay  style={{color:"red"}} />
                                  </Link>
                                </OverlayTrigger>
                              </div>
                            </div>
                          </td>
                          <td>
                            {stuIdeaLoading ? (
                              <Loader />
                            ) : stuIdeaSub == "SUBMITTED" ? (
                              <>
                                <span
                                  className={"badge badge-linesuccess"}
                                >
                                  Submitted
                                </span>
                              </>

                            ) : stuIdeaSub == "DRAFT" ? (
                              <>
                                <span
                                  className={"badge badge-bgdanger"}
                                >
                                  In Draft
                                </span>
                              </>
                            ) : (
                              <>
                                <span
                                  className={"badge badge-linedangered"}
                                >
                                  Not Initiated
                                </span>
                              </>

                            )}
                          </td>
                          <td>
                            <div className="action-table-data">
                              <div className="edit-delete-action">
                                <OverlayTrigger placement="top" overlay={renderViewTooltip}>
                                  {stuIdeaSub == "SUBMITTED" ? <Link data-bs-toggle="tooltip" data-bs-placement="top" className="me-2 p-2" to={"/idea"} >
                                    <Eye className="feather-view" />
                                  </Link> :
                                    <Link data-bs-toggle="tooltip" data-bs-placement="top" className="me-2 p-2" to={"/instruction"} >
                                      <Eye className="feather-view" />
                                    </Link>}
                                </OverlayTrigger>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="product-info">
                              <Link
                                to={"/studentpostsurvey"}
                                className="product-img"
                              >
                                <FaPoll size={30} style={{ marginRight: "10px", color: "orange" }} />
                              </Link>
                              <div className="info">
                                <Link to={"/studentpostsurvey"}>
                                  <h4>Post Survey</h4>
                                </Link>
                                <p className="dull-text">Take survey & Get Certificate</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="action-table-data">
                              <div className="edit-delete-action">
                                <OverlayTrigger placement="top" overlay={renderTooltip}>
                                  <Link
                                      to="#"
                                      className="me-2 p-2"
                                      onClick={() => handleShow(3)}
                                      {...(show ? { 'data-bs-toggle': 'modal', 'data-bs-target': '#add-units' } : {})}
                                      
                                  >
                                    <FaPlay  style={{color:"red"}} />
                                  </Link>
                                </OverlayTrigger>
                              </div>
                            </div>
                          </td>
                          <td>
                            {stuPostSLoading ? (
                              <Loader />
                            ) : stuPostSurvey === null ? (
                              <>
                                <span
                                  className={"badge badge-linedangered"}
                                  onClick={redirectToPost}
                                >
                                  Pending
                                </span>
                              </>
                            ) : (
                              <>
                                <span
                                  className={"badge badge-linesuccess"}
                                >
                                  Completed
                                </span>
                              </>
                            )}
                          </td>
                          <td>
                            <div className="action-table-data">
                              <div className="edit-delete-action">
                                <OverlayTrigger placement="top" overlay={renderViewTooltip}>
                                  <Link data-bs-toggle="tooltip" data-bs-placement="top" className="me-2 p-2" to={"/studentpostsurvey"} >
                                    <Eye className="feather-view" />
                                  </Link>
                                </OverlayTrigger>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="product-info">
                              <Link
                                to={"/studentresource"}
                                className="product-img"
                              >
                                <FaBook size={30} style={{ marginRight: "10px", color: "orange" }} />
                              </Link>
                              <div className="info">
                                <Link to={"/studentresource"}>
                                  <h4>Resources</h4>
                                </Link>
                                <p className="dull-text">Find supportive docs here</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="action-table-data">
                              <div className="edit-delete-action">
                                <OverlayTrigger placement="top" overlay={renderTooltip}>
                                  <Link
                                      to="#"
                                      className="me-2 p-2"
                                      onClick={() => handleShow(4)}
                                      {...(show ? { 'data-bs-toggle': 'modal', 'data-bs-target': '#add-units' } : {})}
                                      
                                  >
                                    <FaPlay  style={{color:"red"}} />
                                  </Link>
                                </OverlayTrigger>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span
                              className={"badge badge-linesuccess"}
                            >
                              References
                            </span>
                          </td>
                          <td>
                            <div className="action-table-data">
                              <div className="edit-delete-action">
                                <OverlayTrigger placement="top" overlay={renderViewTooltip}>
                                  <Link data-bs-toggle="tooltip" data-bs-placement="top" className="me-2 p-2" to={"/studentresource"} >
                                    <Eye className="feather-view" />
                                  </Link>
                                </OverlayTrigger>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* Latest News */}
            <div className="col-xl-6 col-sm-12 col-12 d-flex">
              <LatestNews />
            </div>
           


            
            {/* <div className="col-xl-6 col-sm-12 col-12 d-flex">
              <MultiStepProgressBar predata={predata} 
        postdata={postdata} 
        stuIdeaSub={stuIdeaSub}
        courseData={courseData}  />
            </div> */}
          </div>

        </div>
      </div>
      {show && <VideoModal v={video} setShow={setShow} />}
    </>
  );
};

export default DBStu;
