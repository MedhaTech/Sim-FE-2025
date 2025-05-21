/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { RotateCcw } from "feather-icons-react/build/IconComponents";
import { Link } from "react-router-dom";
import VideoModal from "../../HelpVideo/VideoModal";
import { getCurrentUser } from "../../helpers/Utils";
import { encryptGlobal } from "../../constants/encryptDecrypt";
import axios from "axios";
import { useTranslation } from "react-i18next";

import { useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaRoute } from "react-icons/fa";
import { CheckCircle } from "react-feather";
import { FaPlay } from "react-icons/fa";
import LatestNews from "./LatestNews";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { Tooltip } from "react-bootstrap";
import { Eye } from "react-feather";
import { FaBook } from "react-icons/fa";
import { FaLifeRing } from "react-icons/fa";
import { FaPoll } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import TeamsProgDD from "./TeamsProgDD";
import { GiAchievement } from "react-icons/gi";
import { useReactToPrint } from "react-to-print";
import TCertificate from "../Certificate/TCertificate";
import SchoolTeamPDF from "./SchoolTeamPDF";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2/dist/sweetalert2";
import logout from "../../assets/img/support.png";
import FeatherIcon from "feather-icons-react";
import MultiTeacher from "./MultiTeacher";
import { IoArrowDownCircleOutline } from "react-icons/io5";
import { PiLinkSimpleBold } from "react-icons/pi";
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
    <Modal.Body>
  <figure>
    <div className="row">
      {/* Case 1: Only video */}
      {props.youtube && !props.imagedata && (
        <div className="col-md-12">
          <div className="modal-body custom-modal-body">
            <div style={{ width: "100%", height: "50vh" }}>
              <iframe
                src={props.youtube
                  .replace("youtu.be/", "www.youtube.com/embed/")
                  .replace("watch?v=", "embed/")
                  .split("&")[0]}
                title="Video popup"
                style={{ width: "100%", height: "100%" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Case 2: Only image */}
      {props.imagedata && !props.youtube && (
        <div className="col-md-12 d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
          <img
            src={props.imagedata}
            alt="popup image"
            className="img-fluid"
            style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
          />
        </div>
      )}

      {/* Case 3: Both image and video */}
      {props.youtube && props.imagedata && (
        <>
          {/* Image on top */}
          <div className="col-md-12 d-flex justify-content-center align-items-center mb-3" style={{ height: "30vh" }}>
            <img
              src={props.imagedata}
              alt="popup image"
              className="img-fluid"
              style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
            />
          </div>

          {/* Video below */}
          <div className="col-md-12">
            <div className="modal-body custom-modal-body">
              <div style={{ width: "100%", height: "30vh" }}>
                <iframe
                  src={props.youtube
                    .replace("youtu.be/", "www.youtube.com/embed/")
                    .replace("watch?v=", "embed/")
                    .split("&")[0]}
                  title="Video popup"
                  style={{ width: "100%", height: "100%" }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  </figure>
</Modal.Body>

           <Modal.Footer>
           <div className="d-flex justify-content-between align-items-center w-100">

<div>
  {props.file && (
    <a href={props.file} download target="_blank" rel="noopener noreferrer" className="me-3">
      <IoArrowDownCircleOutline size={30}  />
    </a>
  )}

  {props.urlData && (
    <a href={props.urlData} target="_blank" rel="noopener noreferrer">
      <PiLinkSimpleBold size={30} style={{ color: "blue" }} />
    </a>
  )}
</div>


{props.state != null && (
  <div className="d-flex align-items-center justify-content-end">
    <strong className="me-2">Reference Course</strong>
    <Link to={props.state}>
      <button className="btn btn-warning">Navigate</button>
    </Link>
  </div>
)}

</div>

         
 
</Modal.Footer>


    </Modal>
  );
};

const MentorDashboard = () => {
   const { t } = useTranslation();
  const [showsPopup, setShowsPopup] = useState(false);
  
  const [poptype, setPopType] = useState("");

  const [state, setState] = useState("");

  /////////////////NEW CODE//////////////////////////////////

  const renderRefreshTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>
      Refresh
    </Tooltip>
  );
  const renderViewTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>
      Redirect
    </Tooltip>
  );
  const handleRefresh = () => {
    window.location.reload();
  };

  const navigate = useNavigate();
  const [teamCountLoading, setTeamCountLoading] = useState(true);
  const [stuCountLoading, setStuCountLoading] = useState(true);
  const [ideaCountLoading, setIdeaCountLoading] = useState(true);
  const [teacCourseLoading, setTeacCourseLoading] = useState(true);
  const [teacPostSLoading, setTeacPostSLoading] = useState(true);
  const [whatsappLink, setWhatsappLink] = useState("");
const [courseData, setCourseData] = useState("");
  const [message, setMessage] = useState("");

  
  const [file, setFile] = useState("");
  
  const [imagedata, setImageData] = useState("");
  const [urlData, setUrlData] = useState("");
  const [youtube, setYoutube] = useState("");
const [postdata,setPostData]=useState("");
const [teamdata,setTeamData]=useState("");
const [stuData,setStuData]=useState("");


  useEffect(() => {
               // This function fetches mentors popup from the API //
    
    const newListParam = encryptGlobal(
      JSON.stringify({
        state: currentUser.data[0]?.state,
        role: currentUser.data[0]?.role,
      })
    );
    let popupCount = parseInt(localStorage.getItem("popupCount")) || 0;
    if (popupCount < 3) {
    var config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + `/popup?Data=${newListParam}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${currentUser.data[0]?.token}`,
      },
    };
    axios(config)
      .then(function (res) {
        if (res.status === 200 && res.data.data[0]?.on_off === "1") {
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

  const redirectToTeams = () => {
    navigate(`/mentorteams`);
  };
  const redirectToCourse = () => {
    navigate(`/mentorcourse/1`);
  };
  const redirectToPost = () => {
    navigate(`/mentorpostsurvey`);
  };

  const currentUser = getCurrentUser("current_user");

  useEffect(() => {
    if (currentUser?.data[0]?.user_id) {
      mentorTeamsCount();
      mentorIdeaCount();
      mentorStudentCount();
      mentorcoursepercentage();
      mentorpostsurvey();
      fetchwhatsapplink();
      scroll();
    }
  }, [currentUser?.data[0]?.user_id]);

  const [teamsCount, setTeamsCount] = useState();
  const [ideaCount, setIdeaCount] = useState();
  const [studentCount, setStudentCount] = useState();
  const [coursepercentage, setCoursepercentage] = useState();
  const [teacPostSurvey, setTeacPostSurvey] = useState();

  const mentorTeamsCount = () => {
    // Function to fetch the Teams Count from the API

    const teamApi = encryptGlobal(
      JSON.stringify({
        mentor_id: currentUser?.data[0]?.mentor_id,
      })
    );
    var config = {
      method: "get",
      url:
        process.env.REACT_APP_API_BASE_URL +
        `/dashboard/teamCount?Data=${teamApi}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${currentUser.data[0]?.token}`,
      },
    };
    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          
          setTeamsCount(response.data.data[0].teams_count);
          setTeamCountLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const mentorIdeaCount = () => {
    // Function to fetch the Ideas Count from the API

    const ideaApi = encryptGlobal(
      JSON.stringify({
        mentor_id: currentUser?.data[0]?.mentor_id,
      })
    );
    var config = {
      method: "get",
      url:
        process.env.REACT_APP_API_BASE_URL +
        `/dashboard/ideaCount?Data=${ideaApi}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${currentUser.data[0]?.token}`,
      },
    };
    axios(config)
      .then(function (response) {
        if (response.status === 200) {

          setIdeaCount(response.data.data[0].idea_count);
          setIdeaCountLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const mentorStudentCount = () => {
    // Function to fetch the Students Count from the API

    const studentApi = encryptGlobal(
      JSON.stringify({
        mentor_id: currentUser?.data[0]?.mentor_id,
      })
    );
    var config = {
      method: "get",
      url:
        process.env.REACT_APP_API_BASE_URL +
        `/dashboard/studentCount?Data=${studentApi}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${currentUser.data[0]?.token}`,
      },
    };
    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          setStudentCount(response.data.data[0].student_count);
          setStuCountLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const mentorcoursepercentage = () => {
    // Function to fetch the Course % from the API

    const corseApi = encryptGlobal(
      JSON.stringify({
        user_id: currentUser?.data[0]?.user_id,
      })
    );
    var config = {
      method: "get",
      url:
        process.env.REACT_APP_API_BASE_URL +
        `/dashboard/mentorpercentage?Data=${corseApi}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${currentUser.data[0]?.token}`,
      },
    };
    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          const per = Math.round(
            (response.data.data[0].currentProgress /
              response.data.data[0].totalProgress) *
              100
          );
          setCoursepercentage(per);
          setCourseData(per === 100 ? "Completed" :"Not Started");
          setTeacCourseLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const mentorpostsurvey = () => {
    // Function to fetch the Post survey ,Pre Survey status from the API

    const postsurveyApi = encryptGlobal(
      JSON.stringify({
        user_id: currentUser?.data[0]?.user_id,
      })
    );
    var config = {
      method: "get",
      url:
        process.env.REACT_APP_API_BASE_URL +
        `/dashboard/mentorSurveyStatus?Data=${postsurveyApi}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${currentUser.data[0]?.token}`,
      },
    };
    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          const po = response.data.data[0].postSurvey;
          setTeacPostSurvey(po);
          setPostData(response.data.data[0].postSurvey !== "INCOMPLETED" ? "Completed":"Not Stated");

          setTeacPostSLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //////whatsapp/////
  const fetchwhatsapplink = () => {
    // Function to fetch the WhatsApp link from the API
    const statenameApi = encryptGlobal(
      JSON.stringify({
        state_name: currentUser?.data[0]?.state,
      })
    );
    var config = {
      method: "get",
      url:
        process.env.REACT_APP_API_BASE_URL +
        `/dashboard/whatappLink?Data=${statenameApi}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${currentUser.data[0]?.token}`,
      },
    };
    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          setWhatsappLink(response.data.data[0].whatapp_link);
          setMessage(response.data.data[0].mentor_note);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  /////////videoModal////////////////////
  const [video, setVideo] = useState("");
  const [show, setShow] = useState(false);

  const renderTooltip = (props) => (
    <Tooltip id="pdf-tooltip" {...props}>
      Watch Demo
    </Tooltip>
  );
  const handleShow = (i) => {
    setVideo(vimeoId[i]);
    setShow(true);
  };
  const vimeoId = [
    "https://www.youtube.com/embed/sT3I44RzZAI?si=W92OEckd0iS7rHvZ",
    "https://www.youtube.com/embed/dWpG-TMyMrQ?si=J2NcbBCjxeelG2Us",
    "https://www.youtube.com/embed/siaE-HPVvk0?si=GnJZoZgwLjGMmco7",
    "https://www.youtube.com/embed/fse1a6IaeB0?si=DHOB_c2ngQV3C6SX",
    "https://www.youtube.com/embed/LYS2A3ozZRU?si=Ds2b_17nrPiYH1aF",
    "https://www.youtube.com/embed/OIsCwczsT0o?si=I6tpZPCZAMqvwIK-",
  ];

  const handleCertificateDownload = () => {
    handlePrintCertificate();
  };

  const handleNavigation = () => {
    navigate("/instructions", { state: { instruction: message } });
  };

  const scroll = () => {
    const section = document.querySelector("#start");
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };


  const componentRef = useRef();
  const handlePrintCertificate = useReactToPrint({
    content: () => componentRef.current,
  });
  const handleClose = () => {
    setShowsPopup(false);
  };

  const handleWhatsapp = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-submit",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire({
      title: "<h4>Looking for Support?</h4>",
      text: "Pls contact your State Program Officer.",
      imageUrl: `${logout}`,
      confirmButtonText: "Ok",
    });
  };

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
      ></GreetingModal>
      <div style={{ display: "none" }}>
        <TCertificate
          ref={componentRef}
          title={currentUser?.data[0]?.title}
          full_name={currentUser?.data[0]?.full_name}
          organization_name={currentUser?.data[0]?.organization_name}
        />
      </div>
      <div>
        <div className="page-wrapper" id="start">
          <div className="content">
            {/* Welcome user */}
            <div className="welcome d-lg-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center welcome-text">
                <h3 className="d-flex align-items-center">
                  <span style={{ fontSize: "30px" }}>👋</span>
                  &nbsp;Hi {currentUser?.data[0]?.full_name},
                </h3>
                &nbsp;
                <h6>
                 
                  {t('teacherJourney.heading')}
                </h6>
              </div>
            
              <div className="d-flex align-items-center">
                <div className="action-table-data">
                  <div className="edit-delete-action">
                    <OverlayTrigger placement="top" overlay={renderTooltip}>
                      <Link
                        to="#"
                        className="me-2 p-2"
                        onClick={() => handleShow(5)}
                        {...(show
                          ? {
                              "data-bs-toggle": "modal",
                              "data-bs-target": "#add-units",
                            }
                          : {})}
                      >
                        <FaPlay style={{ color: "red" }} />
                      </Link>
                    </OverlayTrigger>
                  </div>
                </div>
                
              </div>
            </div>
            <div className="col-xl-12 col-sm-12 col-12 d-flex">
              <MultiTeacher   
        postdata={postdata} 
        teamsCount={teamsCount}
        studentCount={studentCount}
ideaCount={ideaCount}
        courseData={courseData}  />
            </div>
            {/* Teacher dashboard stats */}
            <div className="row">
              <div className="col-xl-3 col-sm-6 col-12 d-flex">
                <div className="dash-widget dash2 w-100">
                  <div className="dash-widgetimg">
                    <span>
                      <FaChalkboardTeacher
                        size={30}
                        style={{ color: "royalblue" }}
                      />
                    </span>
                  </div>
                  <div className="dash-widgetcontent">
                    {teacCourseLoading ? (
                      <Loader />
                    ) : coursepercentage === 0 ? (
                      <>
                        <h5>{t('teacherJourney.know')}</h5>
                        <a onClick={redirectToCourse} href="#">
                        {t('teacherJourney.clikhere')}
                        </a>
                      </>
                    ) : (
                      <>
                        <h5>
                          <CountUp
                            start={0}
                            end={coursepercentage}
                            duration={2}
                          />{" "}
                          %
                        </h5>
                        <h6>{t('teacherJourney.Dbcourse')}</h6>

                        {/* <h6>Teacher Course</h6> */}
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-12 d-flex">
                <div className="dash-widget w-100">
                  <div className="dash-widgetimg">
                    <span>
                      <FaUsers size={30} style={{ color: "crimson" }} />
                    </span>
                  </div>
                  <div className="dash-widgetcontent">
                    {teamCountLoading ? (
                      <Loader />
                    ) : teamsCount === 0 ? (
                      <>
                        <h5>{t('teacherJourney.noteams')}</h5>
                        <a onClick={redirectToTeams} href="#">
                        {t('teacherJourney.addteamDB')}
                        </a>
                      </>
                    ) : (
                      <>
                        <h5>
                          <CountUp start={0} end={teamsCount} duration={2} />
                        </h5>
                        <h6>  {t('teacherJourney.teamcreate')}</h6>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-12 d-flex">
                <div className="dash-widget dash1 w-100">
                  <div className="dash-widgetimg">
                    <span>
                      <FaUserGraduate
                        size={30}
                        style={{ color: "mediumseagreen" }}
                      />
                    </span>
                  </div>
                  <div className="dash-widgetcontent">
                    {stuCountLoading ? (
                      <Loader />
                    ) : studentCount === 0 ? (
                      <>
                        <h5>{t('teacherJourney.npstudents')}</h5>
                        <a onClick={redirectToTeams} href="#">
                        {t('teacherJourney.clickadd')}
                        </a>
                      </>
                    ) : (
                      <>
                        <h5>
                          <CountUp start={0} end={studentCount} duration={2} />
                        </h5>
                        <h6> {t('teacherJourney.Dbstudents')}</h6>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-12 d-flex">
                <div className="dash-widget dash3 w-100">
                  <div className="dash-widgetimg">
                    <span>
                      <FaPaperPlane size={30} style={{ color: "purple" }} />
                    </span>
                  </div>
                  <div className="dash-widgetcontent">
                    {ideaCountLoading ? (
                      <Loader />
                    ) : ideaCount === 0 ? (
                      <>
                        <h5> {t('teacherJourney.noidea')}</h5>
                        <h6>{t('teacherJourney.kind')}</h6>
                      </>
                    ) : (
                      <>
                        <h5>
                          <CountUp start={0} end={ideaCount} duration={2} />
                        </h5>
                        <h6>{t('teacherJourney.IdeaSubmission')}</h6>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {/* Row two other features */}
              <div className="col-xl-3 col-sm-6 col-12 d-flex">
                <div className="dash-count" onClick={redirectToPost}>
                  <div className="dash-widgetcontent">
                    {teacPostSLoading ? (
                      <Loader />
                    ) : ideaCount != teamsCount || teamsCount === 0 ? (
                      <>
                        <h5>
                        {t('teacherJourney.postnote')}
                        </h5>
                      </>
                    ) : teacPostSurvey === "COMPLETED" ? (
                      <>
                        <h4> {t('teacherJourney.post')}</h4>
                        <h5>
                        {t('teacherJourney.submitted')} <CheckCircle size={15} color="white" />
                        </h5>
                      </>
                    ) : (
                      <>
                        <h4>{t('teacherJourney.post')}</h4>
                        <h5>{t('teacherJourney.submitnote')}</h5>
                      </>
                    )}
                  </div>
                  <div className="dash-imgs">
                    <FaPoll />
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-12 d-flex">
                {!(teacPostSurvey == "COMPLETED" && ideaCount >= 1) ? (
                    <>
                    <div className="dash-count das1">
                      <div className="dash-counts">
                        <h4>{t('teacherJourney.getcertificate')}</h4>
                        <h5>{t('teacherJourney.aftersurvey')}</h5>
                      </div>
                      <div className="dash-imgs">
                        <GiAchievement size={30} />
                      </div>
                    </div>
                  </>
                
                ) : (
                   <div className="dash-count das1">
                    <>
                      <div
                        className="dash-counts"
                        onClick={
                        
                            handleCertificateDownload
                        }
                        style={{
                          // cursor:
                          //   currentUser?.data[0]?.state !== "Tamil Nadu"
                          //     ? "pointer"
                          //     : "not-allowed",
                          // opacity:
                          //   currentUser?.data[0]?.state !== "Tamil Nadu"
                          //     ? 1
                          //     : 0.5,
                        }
                      }
                      >
                        <h4>{t('teacherJourney.Cong')}</h4>
                        {currentUser?.data[0]?.state !== "Tamil Nadu" && (
                          <h5>
                            {t('teacherJourney.Clickhere')}&nbsp;
                            <FeatherIcon icon="arrow-down-circle" size={30} />
                            &nbsp; {t('teacherJourney.Certificate')}
                          </h5>
                        )}
                         {currentUser?.data[0]?.state === "Tamil Nadu" && (
                          <h5>
                            {t('teacherJourney.Clickhere')}&nbsp;
                            <FeatherIcon icon="arrow-down-circle" size={30} />
                            &nbsp; {t('teacherJourney.Certificate')}
                          </h5>
                        )}
                       
                      </div>

                      <div className="dash-imgs">
                        <GiAchievement size={40} />
                      </div>
                    </>
                  </div>
                
                )}
              </div>
              <div className="col-xl-3 col-sm-6 col-12 d-flex">
                <div className="dash-count das2">
                  <div className="dash-counts">
                    <h4> {t('teacherJourney.teamprog')}</h4>
                    <h5> {t('teacherJourney.login')}</h5>
                  </div>
                  <SchoolTeamPDF />
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-12 d-flex">
                <div className="dash-count das3">
                  <div className="dash-counts">
                    <h4> {t('teacherJourney.joinwhtsapp')}</h4>
                    <h5>{t('teacherJourney.supporthere')}</h5>
                  </div>
                  <div className="dash-imgs">
                    {whatsappLink === null ? (
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaWhatsapp
                          onClick={handleWhatsapp}
                          style={{ color: "white" }}
                        />
                      </a>
                    ) : (
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaWhatsapp style={{ color: "white" }} />
                      </a>
                    )}
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
                    <h4 className="card-title mb-0">{t('teacherJourney.roadmap')} </h4>
                    <div className="dropdown" onClick={handleNavigation}>
                      <Link
                        to="/instructions"
                        className="view-all d-flex align-items-center"
                      >
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
                                  to={"/mentorteams"}
                                  className="product-img"
                                >
                                  <FaUsers
                                    size={30}
                                    style={{
                                      marginRight: "10px",
                                      color: "orange",
                                    }}
                                  />
                                </Link>
                                <div className="info">
                                  <Link to={"/mentorteams"}>
                                    <h4>{t('teacherJourney.Teams')} </h4>
                                  </Link>
                                  <p className="dull-text">
                                  {t('teacherJourney.crud')} 
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="action-table-data">
                                <div className="edit-delete-action">
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={renderTooltip}
                                  >
                                    <Link
                                      to="#"
                                      className="me-2 p-2"
                                      onClick={() => handleShow(0)}
                                      {...(show
                                        ? {
                                            "data-bs-toggle": "modal",
                                            "data-bs-target": "#add-units",
                                          }
                                        : {})}
                                    >
                                      <FaPlay style={{ color: "red" }} />
                                    </Link>
                                  </OverlayTrigger>
                                </div>
                              </div>
                            </td>
                            <td>
                              {teamCountLoading ? (
                                <Loader />
                              ) : teamsCount === 0 ? (
                                <>
                                  <span
                                    className={"badge badge-linedangered"}
                                    onClick={redirectToTeams}
                                  >
                                     {t('teacherJourney.NotCreated')} 
                                  </span>
                                </>
                              ) : (
                                <>
                                  <span
                                    className={"badge badge-linesuccess"}
                                    onClick={redirectToTeams}
                                  >
                                     {t('teacherJourney.AddMore')} 
                                  </span>
                                </>
                              )}
                            </td>
                            <td>
                              <div className="action-table-data">
                                <div className="edit-delete-action">
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={renderViewTooltip}
                                  >
                                    <Link
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      className="me-2 p-2"
                                      to={"/mentorteams"}
                                    >
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
                                  to={"/mentorcourse/1"}
                                  className="product-img"
                                >
                                  <FaChalkboardTeacher
                                    size={30}
                                    style={{
                                      marginRight: "10px",
                                      color: "orange",
                                    }}
                                  />
                                </Link>
                                <div className="info">
                                  <Link to={"/mentorcourse/1"}>
                                    <h4> {t('teacherJourney.TeacherCourse')} </h4>
                                  </Link>
                                  <p className="dull-text">
                                  {t('teacherJourney.knowrole')}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="action-table-data">
                                <div className="edit-delete-action">
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={renderTooltip}
                                  >
                                    <Link
                                      to="#"
                                      className="me-2 p-2"
                                      onClick={() => handleShow(1)}
                                      {...(show
                                        ? {
                                            "data-bs-toggle": "modal",
                                            "data-bs-target": "#add-units",
                                          }
                                        : {})}
                                    >
                                      <FaPlay style={{ color: "red" }} />
                                    </Link>
                                  </OverlayTrigger>
                                </div>
                              </div>
                            </td>
                            <td>
                              {teacCourseLoading ? (
                                <Loader />
                              ) : coursepercentage === 0 ? (
                                <>
                                  <span
                                    className={"badge badge-linedangered"}
                                    onClick={redirectToCourse}
                                  >
                                     {t('teacherJourney.NotStarted')}
                                  </span>
                                </>
                              ) : coursepercentage != 100 ? (
                                <>
                                  <span
                                    className={"badge badge-bgdanger"}
                                    onClick={redirectToCourse}
                                  >
                                     {t('teacherJourney.InProgress')}
                                  </span>
                                </>
                              ) : (
                                <>
                                  <span className={"badge badge-linesuccess"}>
                                  {t('teacherJourney.Completed')}
                                  </span>
                                </>
                              )}
                            </td>
                            <td>
                              <div className="action-table-data">
                                <div className="edit-delete-action">
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={renderViewTooltip}
                                  >
                                    <Link
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      className="me-2 p-2"
                                      to={"/mentorcourse/1"}
                                    >
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
                                  to={"/mentorpostsurvey"}
                                  className="product-img"
                                >
                                  <FaPoll
                                    size={30}
                                    style={{
                                      marginRight: "10px",
                                      color: "orange",
                                    }}
                                  />
                                </Link>
                                <div className="info">
                                  <Link to={"/mentorpostsurvey"}>
                                    <h4> {t('teacherJourney.post')}</h4>
                                  </Link>
                                  <p className="dull-text">
                                  {t('teacherJourney.completecert')}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="action-table-data">
                                <div className="edit-delete-action">
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={renderTooltip}
                                  >
                                    <Link
                                      to="#"
                                      className="me-2 p-2"
                                      onClick={() => handleShow(2)}
                                      {...(show
                                        ? {
                                            "data-bs-toggle": "modal",
                                            "data-bs-target": "#add-units",
                                          }
                                        : {})}
                                    >
                                      <FaPlay style={{ color: "red" }} />
                                    </Link>
                                  </OverlayTrigger>
                                </div>
                              </div>
                            </td>
                            <td>
                              {teacPostSLoading ? (
                                <Loader />
                              ) : teacPostSurvey != "COMPLETED" ? (
                                <>
                                  <span
                                    className={"badge badge-linedangered"}
                                    onClick={redirectToPost}
                                  >
                                     {t('teacherJourney.pending')}
                                  </span>
                                </>
                              ) : (
                                <>
                                  <span className={"badge badge-linesuccess"}>
                                  {t('teacherJourney.Completed')}
                                  </span>
                                </>
                              )}
                            </td>
                            <td>
                              <div className="action-table-data">
                                <div className="edit-delete-action">
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={renderViewTooltip}
                                  >
                                    <Link
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      className="me-2 p-2"
                                      to={"/mentorpostsurvey"}
                                    >
                                      <Eye className="feather-view" />
                                    </Link>
                                  </OverlayTrigger>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <hr />
                          <tr>
                            <td>
                              <div className="product-info">
                                <Link
                                  to={"/tecresource"}
                                  className="product-img"
                                >
                                  <FaBook
                                    size={30}
                                    style={{
                                      marginRight: "10px",
                                      color: "orange",
                                    }}
                                  />
                                </Link>
                                <div className="info">
                                  <Link to={"/tecresource"}>
                                    <h4> {t('teacherJourney.Resources')}</h4>
                                  </Link>
                                  <p className="dull-text">
                                  {t('teacherJourney.rescourcetext')}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="action-table-data">
                                <div className="edit-delete-action">
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={renderTooltip}
                                  >
                                    <Link
                                      to="#"
                                      className="me-2 p-2"
                                      onClick={() => handleShow(3)}
                                      {...(show
                                        ? {
                                            "data-bs-toggle": "modal",
                                            "data-bs-target": "#add-units",
                                          }
                                        : {})}
                                    >
                                      <FaPlay style={{ color: "red" }} />
                                    </Link>
                                  </OverlayTrigger>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className={"badge badge-linesuccess"}>
                              {t('teacherJourney.References')}
                              </span>
                            </td>
                            <td>
                              <div className="action-table-data">
                                <div className="edit-delete-action">
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={renderViewTooltip}
                                  >
                                    <Link
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      className="me-2 p-2"
                                      to={"/tecresource"}
                                    >
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
                                  to={"/mentorsupport"}
                                  className="product-img"
                                >
                                  <FaLifeRing
                                    size={30}
                                    style={{
                                      marginRight: "10px",
                                      color: "orange",
                                    }}
                                  />
                                </Link>
                                <div className="info">
                                  <Link to={"/mentorsupport"}>
                                    <h4> {t('teacherJourney.Support')}</h4>
                                  </Link>
                                  <p className="dull-text">
                                  {t('teacherJourney.riseQ')}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="action-table-data">
                                <div className="edit-delete-action">
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={renderTooltip}
                                  >
                                    <Link
                                      to="#"
                                      className="me-2 p-2"
                                      onClick={() => handleShow(4)}
                                      {...(show
                                        ? {
                                            "data-bs-toggle": "modal",
                                            "data-bs-target": "#add-units",
                                          }
                                        : {})}
                                    >
                                      <FaPlay style={{ color: "red" }} />
                                    </Link>
                                  </OverlayTrigger>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className={"badge badge-linesuccess"}>
                              {t('teacherJourney.HelpLine')}
                              </span>
                            </td>
                            <td>
                              <div className="action-table-data">
                                <div className="edit-delete-action">
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={renderViewTooltip}
                                  >
                                    <Link
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      className="me-2 p-2"
                                      to={"/mentorsupport"}
                                    >
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
            </div>
            {/* Teams Progress */}
            <div>
              <TeamsProgDD
                user={currentUser?.data}
                setIdeaCount={setIdeaCount}
              />
            </div>
          </div>
        </div>
      </div>
      {show && <VideoModal v={video} setShow={setShow} />}
    </>
  );
};

export default MentorDashboard;
