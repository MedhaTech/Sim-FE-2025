/* eslint-disable indent */
import React, { useEffect , useState } from 'react';
import CountUp from "react-countup";
import {
  RotateCcw,
  File,
  UserCheck,
} from "feather-icons-react/build/IconComponents";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { ArrowRight } from "react-feather";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import VideoModal from '../../HelpVideo/VideoModal';
import { getCurrentUser } from '../../helpers/Utils';
import { encryptGlobal } from '../../constants/encryptDecrypt';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUsers } from 'react-icons/fa';
import { FaUserGraduate } from 'react-icons/fa';
import { FaPaperPlane } from 'react-icons/fa';
import { FaChalkboardTeacher } from 'react-icons/fa'; 
import { FaLink } from 'react-icons/fa';
import LatestNews from './LatestNews';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { Tooltip } from "react-bootstrap";
import { Eye } from "react-feather";
import { FaBook } from 'react-icons/fa';
import { FaLifeRing } from 'react-icons/fa';
import { FaPoll } from 'react-icons/fa';
import { FaCheckCircle } from 'react-icons/fa';


const MentorDashboard = () => {

  const MySwal = withReactContent(Swal);
  const showConfirmationAlert = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#00ff00",
      confirmButtonText: "Yes, delete it!",
      cancelButtonColor: "#ff0000",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          className: "btn btn-success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      } else {
        MySwal.close();
      }
    });
  };
  // Source code end
/////////////////NEW CODE//////////////////////////////////

  const renderRefreshTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>
      Refresh
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
  
  const Loader = () => (
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );

  const redirectToTeams = () => {
    navigate(`/mentorteams`);
  };
  const redirectToCourse = () => {
    navigate(`/mentorteams`);
  };
  const redirectToPost = () => {
    navigate(`/mentorpostsurvey`);
  };
  
  const currentUser = getCurrentUser('current_user');

  useEffect(() => {
    if (currentUser?.data[0]?.user_id) {
        mentorTeamsCount();
        mentorIdeaCount();
        mentorStudentCount();
        mentorcoursepercentage();
        mentorpostsurvey();
    }
  }, [currentUser?.data[0]?.user_id]);
  const [teamsCount, setTeamsCount] = useState();
  const [ideaCount, setIdeaCount] = useState();
  const [studentCount, setStudentCount] = useState();
  const [coursepercentage, setCoursepercentage] = useState();
  const [teacPostSurvey, setTeacPostSurvey] = useState();

  const mentorTeamsCount = () => {
    const teamApi = encryptGlobal(
        JSON.stringify({
            mentor_id: currentUser?.data[0]?.mentor_id
        })
    );
    var config = {
        method: 'get',
        url:
            process.env.REACT_APP_API_BASE_URL +
            `/dashboard/teamCount?Data=${teamApi}`,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${currentUser.data[0]?.token}`
        }
    };
    axios(config)
        .then(function (response) {
            if (response.status === 200) {
                console.log(response);
                setTeamsCount(response.data.data[0].teams_count);
                setTeamCountLoading(false);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
  };
  const mentorIdeaCount = () => {
      const ideaApi = encryptGlobal(
          JSON.stringify({
              mentor_id: currentUser?.data[0]?.mentor_id
          })
      );
      var config = {
          method: 'get',
          url:
              process.env.REACT_APP_API_BASE_URL +
              `/dashboard/ideaCount?Data=${ideaApi}`,
          headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${currentUser.data[0]?.token}`
          }
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
      const studentApi = encryptGlobal(
          JSON.stringify({
              mentor_id: currentUser?.data[0]?.mentor_id
          })
      );
      var config = {
          method: 'get',
          url:
              process.env.REACT_APP_API_BASE_URL +
              `/dashboard/studentCount?Data=${studentApi}`,
          headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${currentUser.data[0]?.token}`
          }
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
      const corseApi = encryptGlobal(
          JSON.stringify({
              user_id: currentUser?.data[0]?.user_id
          })
      );
      var config = {
          method: 'get',
          url:
              process.env.REACT_APP_API_BASE_URL +
              `/dashboard/mentorpercentage?Data=${corseApi}`,
          headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${currentUser.data[0]?.token}`
          }
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
                  setTeacCourseLoading(false);
              }
          })
          .catch(function (error) {
              console.log(error);
          });
  };
  const mentorpostsurvey = () => {
    const postsurveyApi = encryptGlobal(
        JSON.stringify({
            user_id: currentUser?.data[0]?.user_id
        })
    );
    var config = {
        method: 'get',
        url:
            process.env.REACT_APP_API_BASE_URL +
            `/dashboard/mentorSurveyStatus?Data=${postsurveyApi}`,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${currentUser.data[0]?.token}`
        }
    };
    axios(config)
        .then(function (response) {
            if (response.status === 200) {
                console.log(response);
                const po = (response.data.data[0].currentProgress);
                setTeacPostSurvey(po);
                setTeacPostSLoading(false);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
};


  //////////////////////////////////////////////

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          {/* Welcome user */}
          <div className="welcome d-lg-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center welcome-text">
              <h3 className="d-flex align-items-center">
                <span style={{ fontSize: '30px' }}>👋</span>
                &nbsp;Hi {currentUser?.data[0]?.full_name},
              </h3>
              &nbsp;
              <h6>here&apos;s what&apos;s happening with your School Innovation Marathon 2024 today.</h6>
            </div>
            <div className="d-flex align-items-center">
              <OverlayTrigger placement="top" overlay={renderRefreshTooltip}>
                <Link data-bs-toggle="tooltip" data-bs-placement="top" onClick={handleRefresh} >
                  <RotateCcw className="feather feather-rotate-ccw feather-16" />
                </Link>
              </OverlayTrigger>
            </div>
          </div>
          {/* Teacher dashboard stats */}
          <div className="row">
            <div className="col-xl-3 col-sm-6 col-12 d-flex">
              <div className="dash-widget dash3 w-100">
                <div className="dash-widgetimg">
                  <span>
                    <FaChalkboardTeacher size={30} />
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  {teacCourseLoading ? ( 
                            <Loader />
                        ) : coursepercentage === 0 ? (
                      <>
                        <h5>To know about SIM</h5>
                        <button onClick={redirectToCourse} className="btn btn-primary">
                          Start Course
                        </button>
                      </>
                    ) : (
                      <>
                        <h5>
                          <CountUp start={0} end={coursepercentage} duration={2} /> %
                        </h5> 
                        <h6>Teacher Course</h6>
                      </>
                  )}
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12 d-flex">
              <div className="dash-widget w-100">
                <div className="dash-widgetimg">
                  <span>
                    <FaUsers size={30} />
                  </span>
                </div>
                <div className="dash-widgetcontent">
                    {teamCountLoading ? ( 
                      <Loader />
                    ) : teamsCount === 0 ?  (
                    <>
                      <h5>Yet to Create Teams?</h5>
                      <button onClick={redirectToTeams} className="btn btn-primary">
                        Create Team
                      </button>
                    </>
                  ) : (
                    <>
                      <h5>
                        <CountUp start={0} end={teamsCount} duration={2} />
                      </h5>
                      <h6>Teams Created</h6>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12 d-flex">
              <div className="dash-widget dash1 w-100">
                <div className="dash-widgetimg">
                  <span>
                    <FaUserGraduate size={30} />
                  </span>
                </div>
                <div className="dash-widgetcontent">
                    {stuCountLoading ? ( 
                        <Loader />
                      ) : studentCount === 0 ? (
                        <>
                          <h5>No student enrolled?</h5>
                          <button onClick={redirectToTeams} className="btn btn-primary">
                            Enrol Students
                          </button>
                        </>
                      ) : (
                        <>
                          <h5>
                            <CountUp start={0} end={studentCount} duration={2} />
                          </h5>
                          <h6>Students Enrolled</h6>
                        </>
                      )}
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12 d-flex">
              <div className="dash-widget dash2 w-100">
                <div className="dash-widgetimg">
                  <span>
                    <FaPaperPlane size={30} />
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  {ideaCountLoading ? ( 
                          <Loader />
                      ) : ideaCount === 0 ? (
                      <>
                        <h5>Yet to submit ideas!</h5>
                        <h6>Kindly nurture your students</h6>
                      </>
                    ) : (
                      <>
                        <h5>
                          <CountUp start={0} end={ideaCount} duration={2} />
                        </h5>
                        <h6>Ideas Submissions</h6>
                      </>
                    )}
                </div>
              </div>
            </div>
            {/* Row two other features */}
            <div className="col-xl-3 col-sm-6 col-12 d-flex">
              <div className="dash-count">
                  <div className="dash-widgetcontent">
                    {teacPostSLoading ? ( 
                        <Loader />
                      ) : ideaCount === 0 ? (
                        <>
                          <h5>Teams yet to submit ideas for your Post-Survey to enable</h5>
                        </>
                      ) : (teacPostSurvey? (
                        <>
                          <FaCheckCircle style={{ color: 'green' }} />
                          <h6>Post Survey</h6>
                        </>
                      ):(
                        <>
                          <h5>Yet to take survey?</h5>
                        </>
                      ))}
                  </div>
                <div className="dash-imgs"onClick={redirectToPost} >
                  <FaPoll />
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12 d-flex">
              <div className="dash-count das1">
                <div className="dash-counts">
                  <h4>110</h4>
                  <h5>Suppliers</h5>
                </div>
                <div className="dash-imgs">
                  <UserCheck />
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12 d-flex">
              <div className="dash-count das2">
                <div className="dash-counts">
                  <h4>150</h4>
                  <h5>Purchase Invoice</h5>
                </div>
                <div className="dash-imgs">
                  <ImageWithBasePath
                    src="assets/img/icons/file-text-icon-01.svg"
                    className="img-fluid"
                    alt="icon"
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12 d-flex">
              <div className="dash-count das3">
                <div className="dash-counts">
                  <h4>170</h4>
                  <h5>Sales Invoice</h5>
                </div>
                <div className="dash-imgs">
                  <File />
                </div>
              </div>
            </div>
          </div>
          {/* Quicklinks , Latest News */}
          <div className="row">
            {/* Quick links */}
            <div className="col-xl-7 col-sm-12 col-12 d-flex">
              <div className="card flex-fill default-cover w-100 mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h4 className="card-title mb-0">Quick Links <FaLink size={15} style={{color : "blue", marginLeft:"6px"}} /> </h4>
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
                                to={"/mentorteams"}
                                className="product-img"
                              >
                                <FaUsers size={30} style={{marginRight : "10px", color:"orange"}}/>
                              </Link>
                              <div className="info">
                                <Link to={"/mentorteams"}>
                                  <h4>Teams</h4>
                                </Link>
                                <p className="dull-text">Create , View , Edit , Delete</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <VideoModal videoId="3" />
                          </td>
                          <td>
                            {teamCountLoading ? ( 
                                <Loader />
                              ) : teamsCount === 0 ?  (
                              <>
                                <span
                                  className={"badge badge-linedangered"}
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
                                <Link className="me-2 p-2" to={"/mentorteams"}>
                                  <Eye className="feather-view" />
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="product-info">
                              <Link
                                to={"/mentorteams"}
                                className="product-img"
                              >
                                <FaChalkboardTeacher size={30} style={{marginRight : "10px", color:"orange"}} />
                              </Link>
                              <div className="info">
                                <Link to={"/mentorteams"}>
                                  <h4>Teacher Course</h4>
                                </Link>
                                <p className="dull-text">Know more about your role</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <VideoModal videoId="3" />
                          </td>
                          <td>
                            {teacCourseLoading ? ( 
                                <Loader />
                              ) : coursepercentage === 0 ?  (
                              <>
                                <span
                                  className={"badge badge-linedangered"}
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
                                <Link className="me-2 p-2" to={"/mentorteams"}>
                                  <Eye className="feather-view" />
                                </Link>
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
                                <FaPoll size={30} style={{marginRight : "10px", color:"orange"}} />
                              </Link>
                              <div className="info">
                                <Link to={"/mentorpostsurvey"}>
                                  <h4>Post Survey</h4>
                                </Link>
                                <p className="dull-text">Complete survey & Get Certificate</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <VideoModal videoId="3" />
                          </td>
                          <td>
                            {teacPostSLoading ? ( 
                                <Loader />
                              ) : teacPostSurvey ?  (
                              <>
                                <span
                                  className={"badge badge-linedangered"}
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
                                <Link className="me-2 p-2" to={"/mentorpostsurvey"}>
                                  <Eye className="feather-view" />
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="product-info">
                              <Link
                                to={"/tecresource"}
                                className="product-img"
                              >
                                <FaBook size={30} style={{marginRight : "10px", color:"orange"}} />
                              </Link>
                              <div className="info">
                                <Link to={"/tecresource"}>
                                  <h4>Resources</h4>
                                </Link>
                                <p className="dull-text">Find supportive docs here</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <VideoModal videoId="3" />
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
                                <Link className="me-2 p-2" to={"/tecresource"}>
                                  <Eye className="feather-view" />
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="product-info">
                              <Link
                                to={"/tecresource"}
                                className="product-img"
                              >
                                <FaLifeRing size={30} style={{marginRight : "10px", color:"orange"}} />
                              </Link>
                              <div className="info">
                                <Link to={"/tecresource"}>
                                  <h4>Support</h4>
                                </Link>
                                <p className="dull-text">Raise your queries here</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <VideoModal videoId="3" />
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
                                <Link className="me-2 p-2" to={"/tecresource"}>
                                  <Eye className="feather-view" />
                                </Link>
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
            <div className="col-xl-5 col-sm-12 col-12 d-flex">
              <LatestNews />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Expired Products</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive dataview">
                <table className="table dashboard-expired-products">
                  <thead>
                    <tr>
                      <th className="no-sort">
                        <label className="checkboxs">
                          <input type="checkbox" id="select-all" />
                          <span className="checkmarks" />
                        </label>
                      </th>
                      <th>Product</th>
                      <th>SKU</th>
                      <th>Manufactured Date</th>
                      <th>Expired Date</th>
                      <th className="no-sort">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <label className="checkboxs">
                          <input type="checkbox" />
                          <span className="checkmarks" />
                        </label>
                      </td>
                      <td>
                        <div className="productimgname">
                          <Link to="#" className="product-img stock-img">
                            <ImageWithBasePath
                              src="assets/img/products/expire-product-01.png"
                              alt="product"
                            />
                          </Link>
                          <Link to="#">Red Premium Handy </Link>
                        </div>
                      </td>
                      <td>
                        <Link to="#">PT006</Link>
                      </td>
                      <td>17 Jan 2023</td>
                      <td>29 Mar 2023</td>
                      <td className="action-table-data">
                        <div className="edit-delete-action">
                          <Link className="me-2 p-2" to="#">
                            <i data-feather="edit" className="feather-edit" />
                          </Link>
                          <Link
                            className=" confirm-text p-2"
                            to="#"
                            onClick={showConfirmationAlert}
                          >
                            <i
                              data-feather="trash-2"
                              className="feather-trash-2"
                            />
                          </Link>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className="checkboxs">
                          <input type="checkbox" />
                          <span className="checkmarks" />
                        </label>
                      </td>
                      <td>
                        <div className="productimgname">
                          <Link to="#" className="product-img stock-img">
                            <ImageWithBasePath
                              src="assets/img/products/expire-product-02.png"
                              alt="product"
                            />
                          </Link>
                          <Link to="#">Iphone 14 Pro</Link>
                        </div>
                      </td>
                      <td>
                        <Link to="#">PT007</Link>
                      </td>
                      <td>22 Feb 2023</td>
                      <td>04 Apr 2023</td>
                      <td className="action-table-data">
                        <div className="edit-delete-action">
                          <Link className="me-2 p-2" to="#">
                            <i data-feather="edit" className="feather-edit" />
                          </Link>
                          <Link
                            className="confirm-text p-2"
                            to="#"
                            onClick={showConfirmationAlert}
                          >
                            <i
                              data-feather="trash-2"
                              className="feather-trash-2"
                            />
                          </Link>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className="checkboxs">
                          <input type="checkbox" />
                          <span className="checkmarks" />
                        </label>
                      </td>
                      <td>
                        <div className="productimgname">
                          <Link to="#" className="product-img stock-img">
                            <ImageWithBasePath
                              src="assets/img/products/expire-product-03.png"
                              alt="product"
                            />
                          </Link>
                          <Link to="#">Black Slim 200 </Link>
                        </div>
                      </td>
                      <td>
                        <Link to="#">PT008</Link>
                      </td>
                      <td>18 Mar 2023</td>
                      <td>13 May 2023</td>
                      <td className="action-table-data">
                        <div className="edit-delete-action">
                          <Link className="me-2 p-2" to="#">
                            <i data-feather="edit" className="feather-edit" />
                          </Link>
                          <Link
                            className=" confirm-text p-2"
                            to="#"
                            onClick={showConfirmationAlert}
                          >
                            <i
                              data-feather="trash-2"
                              className="feather-trash-2"
                            />
                          </Link>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className="checkboxs">
                          <input type="checkbox" />
                          <span className="checkmarks" />
                        </label>
                      </td>
                      <td>
                        <div className="productimgname">
                          <Link to="#" className="product-img stock-img">
                            <ImageWithBasePath
                              src="assets/img/products/expire-product-04.png"
                              alt="product"
                            />
                          </Link>
                          <Link to="#">Woodcraft Sandal</Link>
                        </div>
                      </td>
                      <td>
                        <Link to="#">PT009</Link>
                      </td>
                      <td>29 Mar 2023</td>
                      <td>27 May 2023</td>
                      <td className="action-table-data">
                        <div className="edit-delete-action">
                          <Link className="me-2 p-2" to="#">
                            <i data-feather="edit" className="feather-edit" />
                          </Link>
                          <Link
                            className=" confirm-text p-2"
                            to="#"
                            onClick={showConfirmationAlert}
                          >
                            <i
                              data-feather="trash-2"
                              className="feather-trash-2"
                            />
                          </Link>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className="checkboxs">
                          <input type="checkbox" />
                          <span className="checkmarks" />
                        </label>
                      </td>
                      <td>
                        <div className="productimgname">
                          <Link to="#" className="product-img stock-img">
                            <ImageWithBasePath
                              src="assets/img/products/stock-img-03.png"
                              alt="product"
                            />
                          </Link>
                          <Link to="#">Apple Series 5 Watch </Link>
                        </div>
                      </td>
                      <td>
                        <Link to="#">PT010</Link>
                      </td>
                      <td>24 Mar 2023</td>
                      <td>26 May 2023</td>
                      <td className="action-table-data">
                        <div className="edit-delete-action">
                          <Link
                            className="me-2 p-2"
                            to="#"
                            data-bs-toggle="modal"
                            data-bs-target="#edit-units"
                          >
                            <i
                              data-feather="edit"
                              className="feather-edit"
                            />
                          </Link>
                          <Link
                            className=" confirm-text p-2"
                            onClick={showConfirmationAlert}
                          >
                            <i
                              data-feather="trash-2"
                              className="feather-trash-2"
                            />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;
