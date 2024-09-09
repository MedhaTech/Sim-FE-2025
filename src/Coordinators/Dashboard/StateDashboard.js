/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState ,useEffect} from "react";
import CountUp from "react-countup";
import {
  File,
  User,
  UserCheck,
} from "feather-icons-react/build/IconComponents";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
// import { all_routes } from "../../Router/all_routes";
import {
  getCurrentUser,
 
} from '../../helpers/Utils';
import { encryptGlobal } from '../../constants/encryptDecrypt';

import axios from 'axios';
import { FaChalkboardTeacher } from 'react-icons/fa'; 
import { FaPaperPlane } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa';
import { FaUserGraduate } from 'react-icons/fa';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMale, faFemale, faSchool } from '@fortawesome/free-solid-svg-icons';
import { FcLibrary } from "react-icons/fc";
const Dashboard = () => {
  const currentUser = getCurrentUser('current_user');
  // const route = all_routes;
  useEffect(() => {
    adminTeamsCount();
    adminSudentCount();
    adminideasCount();
    adminMentorCount();
    adminSudentbygenderCount();
    adminSchoolCount();
    adminmentorCourseCount();
    adminStudentCourseCount();
    nonAtlCount();
}, []);
const [totalteamsCount, setTotalteamsCount] = useState('-');
const [totalStudentCount, setTotalStudentCount] = useState('-');
const [totalideasCount, setTotalideasCount] = useState('-');
const [totalSubmittedideasCount, setTotalSubmittedideasCount] =
    useState('-');
const [totalMentorCount, setTotalMentorCount] = useState('-');
const [totalMentorMaleCount, setTotalMentorMaleCount] = useState('-');
const [totalStudentMaleCount, setTotalStudentMaleCount] = useState('-');
const [totalStudentFemaleCount, setTotalStudentFemaleCount] = useState('-');
const [totalSchoolCount, setTotalSchoolCount] = useState('-');
const [nonAtl, setNonAtl] = useState('-');
const [atl, setAtl] = useState('-');
const [mentorCoursesCompletedCount, setMentorCoursesCompletedCount] =
    useState('-');
const [studentCoursesCompletedCount, setStudentCoursesCompletedCount] =
    useState('-');
const [totalstudentCoursesCount, setTotalstudentCoursesCount] =
    useState('-');

const nonAtlCount = () => {
  const newParam = encryptGlobal(
    JSON.stringify({
        state: currentUser?.data[0]?.state_name
    })
);
    var config = {
        method: 'get',
        url:
            process.env.REACT_APP_API_BASE_URL +
            `/dashboard/ATLNonATLRegCount?Data=${newParam}`,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${currentUser.data[0]?.token}`
        }
    };
    axios(config)
        .then(function (response) {
            if (response.status === 200) {

                setAtl(response.data.data[0].ATLCount);
                setNonAtl(response.data.data[0].NONATLCount);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
};
const adminTeamsCount = () => {
  const newParam1 = encryptGlobal(
    JSON.stringify({
        state: currentUser?.data[0]?.state_name
    })
);
    var config = {
        method: 'get',
        url: process.env.REACT_APP_API_BASE_URL + `/dashboard/teamCount?Data=${newParam1}`,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${currentUser.data[0]?.token}`
        }
    };
    axios(config)
        .then(function (response) {
            if (response.status === 200) {
                setTotalteamsCount(response.data.data[0].teams_count);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
};
const adminSudentCount = () => {
  const newParam2 = encryptGlobal(
    JSON.stringify({
        state: currentUser?.data[0]?.state_name
    })
);
    var config = {
        method: 'get',
        url: process.env.REACT_APP_API_BASE_URL + `/dashboard/studentCount?Data=${newParam2}`,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${currentUser.data[0]?.token}`
        }
    };
    axios(config)
        .then(function (response) {
            if (response.status === 200) {

                setTotalStudentCount(response.data.data[0].student_count);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
};
const adminideasCount = () => {
  const newParam3 = encryptGlobal(
    JSON.stringify({
        state: currentUser?.data[0]?.state_name
    })
);
    var config = {
        method: 'get',
        url: process.env.REACT_APP_API_BASE_URL + `/dashboard/ideasCount?Data=${newParam3}`,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${currentUser.data[0]?.token}`
        }
    };
    axios(config)
        .then(function (response) {
            if (response.status === 200) {

                setTotalideasCount(response.data.data[0].initiated_ideas);
                setTotalSubmittedideasCount(
                    response.data.data[0].submitted_ideas
                );
            }
        })
        .catch(function (error) {
            console.log(error);
        });
};
const adminMentorCount = () => {
  const newParam4 = encryptGlobal(
    JSON.stringify({
        state: currentUser?.data[0]?.state_name
    })
);
    var config = {
        method: 'get',
        url: process.env.REACT_APP_API_BASE_URL + `/dashboard/mentorCount?Data=${newParam4}`,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${currentUser.data[0]?.token}`
        }
    };
    axios(config)
        .then(function (response) {
            if (response.status === 200) {

                setTotalMentorCount(response.data.data[0].mentorCount);
                setTotalMentorMaleCount(response.data.data[0].mentorMale);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
};
const adminSudentbygenderCount = () => {
  const newParam5 = encryptGlobal(
    JSON.stringify({
        state: currentUser?.data[0]?.state_name
    })
);
    var config = {
        method: 'get',
        url:
            process.env.REACT_APP_API_BASE_URL +
            `/dashboard/studentCountbygender?Data=${newParam5}`,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${currentUser.data[0]?.token}`
        }
    };
    axios(config)
        .then(function (response) {
            if (response.status === 200) {

                setTotalStudentMaleCount(response.data.data[0].studentMale);
                setTotalStudentFemaleCount(
                    response.data.data[0].studentFemale
                );
            }
        })
        .catch(function (error) {
            console.log(error);
        });
};
const adminSchoolCount = () => {
  const newParam6 = encryptGlobal(
    JSON.stringify({
        state: currentUser?.data[0]?.state_name
    })
);
    var config = {
        method: 'get',
        url: process.env.REACT_APP_API_BASE_URL + `/dashboard/schoolCount?Data=${newParam6}`,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${currentUser.data[0]?.token}`
        }
    };
    axios(config)
        .then(function (response) {
            if (response.status === 200) {

                setTotalSchoolCount(response.data.data[0].schoolCount);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
};
const adminmentorCourseCount = () => {
  const newParam7 = encryptGlobal(
    JSON.stringify({
        state: currentUser?.data[0]?.state_name
    })
);
    var config = {
        method: 'get',
        url:
            process.env.REACT_APP_API_BASE_URL +
            `/dashboard/mentorCourseCount?Data=${newParam7}`,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${currentUser.data[0]?.token}`
        }
    };
    axios(config)
        .then(function (response) {
            if (response.status === 200) {

                setMentorCoursesCompletedCount(
                    response.data.data[0].mentorCoursesCompletedCount
                );
            }
        })
        .catch(function (error) {
            console.log(error);
        });
};
const adminStudentCourseCount = () => {
  const newParam8 = encryptGlobal(
    JSON.stringify({
        state: currentUser?.data[0]?.state_name
    })
);
    var config = {
        method: 'get',
        url:
            process.env.REACT_APP_API_BASE_URL +
            `/dashboard/studentCourseCount?Data=${newParam8}`,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${currentUser.data[0]?.token}`
        }
    };
    axios(config)
        .then(function (response) {
            if (response.status === 200) {
              // console.log(response,"11");

                setStudentCoursesCompletedCount(
                    response.data.data[0].StudentCoursesCompletedCount
                );
                setTotalstudentCoursesCount(response.data.data[0].started);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
};

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-xl-3 col-sm-6 col-12 d-flex">
              <div className="dash-widget w-100">
                <div className="dash-widgetimg">
                  <span>
                    {/* <ImageWithBasePath
                      src="assets/img/icons/dash1.svg"
                      alt="img"
                    /> */}
                    <FcLibrary size={30} style={{ color: 'crimson' }}  />
                  </span>
                
                </div>
                <div className="dash-widgetcontent">
                  <h5>
                    {/* <CountUp start={0} end={307144} duration={3} prefix="$" /> */}
                    {totalSchoolCount}

                  </h5>
                  <h6>Total Eligible Schools</h6>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12 d-flex">
              <div className="dash-widget dash1 w-100">
                <div className="dash-widgetimg">
                  {/* <span>
                    <ImageWithBasePath
                      src="assets/img/icons/dash2.svg"
                      alt="img"
                    />
                  </span> */}
                  <span>
                    <FaUsers size={30} style={{ color: 'crimson' }} />
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  <h5>
                    
                    {/* <CountUp
                      start={0}
                      end={4385}
                      duration={3} // Duration in seconds
                    /> */}
                    {totalteamsCount}
                  </h5>
                  <h6>Total Teams</h6>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12 d-flex">
              <div className="dash-widget dash2 w-100">
                <div className="dash-widgetimg">
                  {/* <span>
                    <ImageWithBasePath
                      src="assets/img/icons/dash3.svg"
                      alt="img"
                    />
                  </span> */}
                  <span>
                    <FaUserGraduate size={30} style={{color:"mediumseagreen"}} />
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  <h5>
                  {totalStudentCount}

                    {/* $
                    <CountUp
                      start={0}
                      end={385656.5}
                      duration={3} // Duration in seconds
                      decimals={1}
                    /> */}
                  </h5>
                  <h6>Total Students</h6>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12 d-flex">
              <div className="dash-widget dash3 w-100">
                <div className="dash-widgetimg">
                  <span>
                    <ImageWithBasePath
                      src="assets/img/icons/dash4.svg"
                      alt="img"
                    />
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  <h5>
                    {/* $
                    <CountUp
                      start={0}
                      end={40000}
                      duration={3} // Duration in seconds
                    /> */}
                                                {totalMentorMaleCount}

                  </h5>
                  <h6>Total Male Teachers</h6>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12 d-flex">
              <div className="dash-widget w-100">
                <div className="dash-widgetimg">
                  <span>
                    <ImageWithBasePath
                      src="assets/img/icons/dash1.svg"
                      alt="img"
                    />
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  <h5>
                    {totalMentorCount}
                    {/* <CountUp start={0} end={307144} duration={3} prefix="$" /> */}
                  </h5>
                  <h6>Total Reg Schools</h6>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12 d-flex">
              <div className="dash-widget dash1 w-100">
                <div className="dash-widgetimg">
                  {/* <span>
                    <ImageWithBasePath
                      src="assets/img/icons/dash2.svg"
                      alt="img"
                    />
                  </span> */}
                  <span>
                    <FaPaperPlane size={30} style={{ color: 'purple' }}/>
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  <h5>
                    {/* $
                    <CountUp
                      start={0}
                      end={4385}
                      duration={3} // Duration in seconds
                    /> */}
                    { totalSubmittedideasCount}
                  </h5>
                  <h6>Total Teams Submitted Ideas</h6>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12 d-flex">
              <div className="dash-widget dash2 w-100">
                <div className="dash-widgetimg">
                  <span>
                    <ImageWithBasePath
                      src="assets/img/icons/dash3.svg"
                      alt="img"
                    />
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  <h5>
                    {/* $ */}
                    {/* <CountUp
                      start={0}
                      end={385656.5}
                      duration={3} // Duration in seconds
                      decimals={1}
                    /> */}
                                                {studentCoursesCompletedCount}

                  </h5>
                  <h6>Students course completed</h6>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12 d-flex">
              <div className="dash-widget dash3 w-100">
                <div className="dash-widgetimg">
                  <span>
                    <ImageWithBasePath
                      src="assets/img/icons/dash4.svg"
                      alt="img"
                    />
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  <h5>
                    {/* $
                    <CountUp
                      start={0}
                      end={40000}
                      duration={3} // Duration in seconds
                    /> */}
                      {totalMentorCount -
                                                    totalMentorMaleCount}
                  </h5>
                  <h6>Total Female Teachers</h6>
                </div>
              </div>
            </div><div className="col-xl-3 col-sm-6 col-12 d-flex">
              <div className="dash-widget w-100">
                <div className="dash-widgetimg">
                  <span>
                    <ImageWithBasePath
                      src="assets/img/icons/dash1.svg"
                      alt="img"
                    />
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  <h5>
                    {/* <CountUp start={0} end={307144} duration={3} prefix="$" /> */}
                    {totalMentorCount}
                  </h5>
                  <h6>Total Reg Teachers</h6>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12 d-flex">
              <div className="dash-widget dash1 w-100">
                <div className="dash-widgetimg">
                  <span>
                    <ImageWithBasePath
                      src="assets/img/icons/dash2.svg"
                      alt="img"
                    />
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  <h5>
                    {/* $ */}
                    {/* <CountUp
                      start={0}
                      end={4385}
                      duration={3} // Duration in seconds
                    /> */}
                     {totalideasCount -
                                                    totalSubmittedideasCount}
                  </h5>
                  <h6>Total Teams Ideas in Draft</h6>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12 d-flex">
              <div className="dash-widget dash2 w-100">
                <div className="dash-widgetimg">
                  <span>
                    <ImageWithBasePath
                      src="assets/img/icons/dash3.svg"
                      alt="img"
                    />
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  <h5>
                    {/* $
                    <CountUp
                      start={0}
                      end={385656.5}
                      duration={3} // Duration in seconds
                      decimals={1}
                    /> */}
                      {totalstudentCoursesCount -
                                                    studentCoursesCompletedCount}
                  </h5>
                  <h6>Students course in progress</h6>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12 d-flex">
              <div className="dash-widget dash3 w-100">
                <div className="dash-widgetimg">
                  {/* <span>
                    <ImageWithBasePath
                      src="assets/img/icons/dash4.svg"
                      alt="img"
                    />
                  </span> */}
                  <span>
                  <FontAwesomeIcon icon={faMale} size={30} style={{ color: 'green' }}/>
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  <h5>
                    {/* $ */}
                    {/* <CountUp
                      start={0}
                      end={40000}
                      duration={3} // Duration in seconds
                    /> */}
                                                {totalStudentMaleCount}

                  </h5>
                  <h6>Total Male Students</h6>
                </div>
              </div>
            </div><div className="col-xl-3 col-sm-6 col-12 d-flex">
              <div className="dash-widget w-100">
                <div className="dash-widgetimg">
                  {/* <span>
                    <ImageWithBasePath
                      src="assets/img/icons/dash1.svg"
                      alt="img"
                    />
                  </span> */}
                  <span>
                    <FaChalkboardTeacher size={30} style={{color:"royalblue"}}/>
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  <h5>
                    {/* <CountUp start={0} end={307144} duration={3} prefix="$" /> */}
                    {mentorCoursesCompletedCount}

                  </h5>
                  <h6>Teachers Course Completed</h6>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12 d-flex">
              <div className="dash-widget dash1 w-100">
                <div className="dash-widgetimg">
                  <span>
                    <ImageWithBasePath
                      src="assets/img/icons/dash2.svg"
                      alt="img"
                    />
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  <h5>
                    {/* $
                    <CountUp
                      start={0}
                      end={4385}
                      duration={3} // Duration in seconds
                    /> */}
                     {totalteamsCount -
                                                    totalideasCount}
                  </h5>
                  <h6>Total Teams Not initiated Ideas</h6>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12 d-flex">
              <div className="dash-widget dash2 w-100">
                <div className="dash-widgetimg">
                  <span>
                    <ImageWithBasePath
                      src="assets/img/icons/dash3.svg"
                      alt="img"
                    />
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  <h5>
                    {/* $
                    <CountUp
                      start={0}
                      end={385656.5}
                      duration={3} // Duration in seconds
                      decimals={1}
                    /> */}
                      {totalStudentCount -
                                                    totalstudentCoursesCount}
                  </h5>
                  <h6>Students Course not started</h6>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12 d-flex">
              <div className="dash-widget dash3 w-100">
                <div className="dash-widgetimg">
                  {/* <span>
                    <ImageWithBasePath
                      src="assets/img/icons/dash4.svg"
                      alt="img"
                    />
                  </span> */}
                  <span>
                  <FontAwesomeIcon icon={faFemale} size={100} style={{ color: 'red' }}/>
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  <h5>
                    {/* $
                    <CountUp
                      start={0}
                      end={40000}
                      duration={3} // Duration in seconds
                    /> */}
                                                {totalStudentFemaleCount}

                  </h5>
                  <h6>Total Female Students</h6>
                </div>
              </div>
            </div>
           {currentUser?.data[0]?.state_name !== "Tamil Nadu" && (
    <><div className="col-xl-6 col-sm-6 col-12 d-flex">
                <div className="dash-widget w-100">
                  <div className="dash-widgetimg">
                    <span>
                      <ImageWithBasePath
                        src="assets/img/icons/dash1.svg"
                        alt="img" />
                    </span>
                  </div>
                  <div className="dash-widgetcontent">
                    <h5>
                      {nonAtl}

                    </h5>
                    <h6>Total Non ATL Count</h6>
                  </div>
                </div>
              </div><div className="col-xl-6 col-sm-6 col-12 d-flex">
                  <div className="dash-widget dash1 w-100">
                    <div className="dash-widgetimg">
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/dash2.svg"
                          alt="img" />
                      </span>
                    </div>
                    <div className="dash-widgetcontent">
                      <h5>

                        {atl}

                      </h5>
                      <h6>Total Atl Count</h6>
                    </div>
                  </div>
                </div></>
           )}
           
          </div>
          {/* Button trigger modal */}

        
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
