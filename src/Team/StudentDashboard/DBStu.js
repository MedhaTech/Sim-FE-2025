
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import {
  ArrowRight,
  Calendar,
  ChevronUp,
  Clock,
  RotateCcw,
} from "feather-icons-react/build/IconComponents";
import React , { useEffect, useState }from "react";
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



const DBStu = () => {

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
  const [coursepercentage, setCoursepercentage] = useState();



  const [video , setVideo] = useState("");
  const [show , setShow] = useState(false);

  const Loader = () => (
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );

  const redirectToPreSurvey = () => {
    navigate(`/studentpresurvey`);
  };
  const redirectToCourse = () => {
    navigate(`#`);
  };
  const redirectToPost = () => {
    navigate(`/studentpostsurvey`);
  };
  const redirectToIdea = () => {
    navigate(`/idea`);
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
  const vimeoId = ["https://www.youtube.com/embed/CiYa_iLdpXo?si=8t7wj1idLOrW4se0",
      "https://www.youtube.com/embed/q40BSRm_cJM?si=ALZHPloc04lqH25O",
      "https://www.youtube.com/embed/eCYCvTu03X4?si=3zA5lyM9UOUoW5Yb",
      "https://www.youtube.com/embed/s-LUZN38Fik?si=rz10HpY0ZqDaYqD6",
      "https://www.youtube.com/embed/1WvwMypdVaY?si=8GPHpUqV7Jdewh__",
      ];

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="welcome d-lg-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center welcome-text">
              <h3 className="d-flex align-items-center">
                <span style={{ fontSize: '30px' }}>👋</span>
                &nbsp;Hi {currentUser?.data[0]?.full_name}&nbsp;
              </h3>
              
              <h6> here&apos;s what&apos;s happening with your School Innovation Marathon 2024 today.</h6>
            </div>
            <div className="d-flex align-items-center">
              <div className="dropdown">
                  <button
                      className="btn btn-primary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                  >
                      {selectedLanguage}
                  </button>
                  <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" onClick={() => handleLanguageChange('English')} to="#">
                              English
                          </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" onClick={() => handleLanguageChange('Hindi')} to="#">
                              Hindi
                          </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" onClick={() => handleLanguageChange('Telugu')} to="#">
                              Telugu
                          </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" onClick={() => handleLanguageChange('Tamil')} to="#">
                              Tamil
                          </Link>
                      </li>
                  </ul>
              </div>
            </div>
          </div>
          <div className="row sales-cards">
            <div className="col-xl-6 col-sm-12 col-12 mb-4">
              <div className="card d-flex align-items-center justify-content-between default-cover" style={{ position: "relative", width: "100%", height: "100%" }}>
                <iframe 
                  src="https://player.vimeo.com/video/762600125?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" 
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }} 
                  allow="autoplay; fullscreen; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card color-info bg-success mb-4 ">
                <h3>
                  {" "}
                  <CountUp end={10000} duration={4}>
                    +
                  </CountUp>
                </h3>
                <p>Course Completion %</p>
                <FeatherIcon icon="monitor" />
              </div>
              <div className="card color-info"  style={{background:"#00CFE8"}}>
                <h3>
                  {" "}
                  <CountUp end={10000} duration={4}>
                    +
                  </CountUp>
                </h3>
                <p>Quizes Passed</p>
                <FeatherIcon icon="thumbs-up" />
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card color-info bg-secondary mb-4">
                <h3>
                  <CountUp end={800} duration={4}>
                    +
                  </CountUp>
                </h3>
                <p>Course Videos Watched</p>
                <FeatherIcon icon="video" />
              </div>
              <div className="card color-info bg-primary">
                <h3>
                  <CountUp end={800} duration={4}>
                    +
                  </CountUp>
                </h3>
                <p>Badges Achieved</p>
                <FeatherIcon icon="award" />
              </div>
            </div>
          </div>
          {/* Quicklinks , Latest News */}
          <div className="row">
            {/* Quick links */}
            <div className="col-xl-6 col-sm-12 col-12 d-flex">
              <div className="card flex-fill default-cover w-100 mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h4 className="card-title mb-0">SIM Road Map<FaRoute size={30} style={{marginLeft:"6px"}} /> </h4>
                  <div className="dropdown">
                    <Link to="#" className="view-all d-flex align-items-center">
                      View
                      <span className="ps-2 d-flex align-items-center">
                        <ArrowRight className="feather-16" />
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
                                <FaPoll size={30} style={{marginRight : "10px", color:"orange"}}/>
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
                              ) : stuPreSurvey != "COMPLETED"  ?  (
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
                                to={"/mentorcourse/1"}
                                className="product-img"
                              >
                                <FaChalkboardTeacher size={30} style={{marginRight : "10px", color:"orange"}} />
                              </Link>
                              <div className="info">
                                <Link to={"/mentorcourse/1"}>
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
                              ) : ((coursepercentage === 0) ?  (
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
                            ):(
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
                                  <Link data-bs-toggle="tooltip" data-bs-placement="top" className="me-2 p-2" to={"#"} >
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
                                to={"/idea"}
                                className="product-img"
                              >
                                <FaLightbulb size={30} style={{marginRight : "10px", color:"orange"}} />
                              </Link>
                              <div className="info">
                                <Link to={"/idea"}>
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
                              ) : stuIdeaSub != "SUBMITTED" ?  (
                              <>
                                <span
                                  className={"badge badge-linedangered"}
                                  onClick={redirectToIdea}
                                >
                                  Not Done!
                                </span>
                              </>
                            ) : (
                              <>
                                <span
                                  className={"badge badge-linesuccess"}
                                >
                                  Submitted
                                </span>
                              </>
                            )}
                          </td>
                          <td>
                            <div className="action-table-data">
                              <div className="edit-delete-action">
                                <OverlayTrigger placement="top" overlay={renderViewTooltip}>
                                  <Link data-bs-toggle="tooltip" data-bs-placement="top" className="me-2 p-2" to={"/idea"} >
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
                                to={"/studentpostsurvey"}
                                className="product-img"
                              >
                                <FaPoll size={30} style={{marginRight : "10px", color:"orange"}} />
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
                            {stuPostSLoading ? ( 
                                <Loader />
                              ) : stuPostSurvey != "COMPLETED" ?  (
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
                                <FaBook size={30} style={{marginRight : "10px", color:"orange"}} />
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
                                  <Link data-bs-toggle="tooltip" data-bs-placement="top" className="me-2 p-2"  to={"/studentresource"} >
                                    <Eye className="feather-view" />
                                  </Link>
                                </OverlayTrigger>
                              </div>
                            </div>
                          </td>
                        </tr>
                        {/* <tr>
                          <td>
                            <div className="product-info">
                              <Link
                                to={"/mentorsupport"}
                                className="product-img"
                              >
                                <FaLifeRing size={30} style={{marginRight : "10px", color:"orange"}} />
                              </Link>
                              <div className="info">
                                <Link to={"/mentorsupport"}>
                                  <h4>Support</h4>
                                </Link>
                                <p className="dull-text">Raise your queries here</p>
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
                              HelpLine
                            </span>
                          </td>
                          <td>
                            <div className="action-table-data">
                              <div className="edit-delete-action">
                                <OverlayTrigger placement="top" overlay={renderViewTooltip}>
                                  <Link data-bs-toggle="tooltip" data-bs-placement="top" className="me-2 p-2" to={"/mentorsupport"} >
                                    <Eye className="feather-view" />
                                  </Link>
                                </OverlayTrigger>
                              </div>
                            </div>
                          </td>
                        </tr> */}
                        
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
          
        </div>
      </div>
      {show &&  <VideoModal v={video} setShow={setShow}/>}
    </>
  );
};

export default DBStu;
