/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState, useEffect } from "react";

import {
  getCurrentUser,

} from '../../helpers/Utils';
import { encryptGlobal } from '../../constants/encryptDecrypt';

import axios from 'axios';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { FaPaperPlane } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa';
import { FaUserGraduate } from 'react-icons/fa';

import { FcLibrary } from "react-icons/fc";
import { FaMapMarkerAlt } from 'react-icons/fa';

const Dashboard = () => {
  const currentUser = getCurrentUser('current_user');
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
  const [totalMentorFeMaleCount, setTotalMentorFeMaleCount] = useState('-');

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
  const statename = localStorage.getItem("stateName");
  const nonAtlCount = () => {
     // This function fetches atl and nonatl count from the API //
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
        // This function fetches teamcounts count from the API //

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
        // This function fetches students count count from the API //

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
        // This function fetches ideas count count from the API //

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
        // This function fetches mentors count count from the API //

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
          setTotalMentorFeMaleCount(response.data.data[0].mentorFemale
          );

          setTotalMentorMaleCount(response.data.data[0].mentorMale);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const adminSudentbygenderCount = () => {
        // This function fetches students gender count  from the API //

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
        // This function fetches schools count  from the API //

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
        // This function fetches mentors course completed count  from the API //

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
        // This function fetches students course completed count  from the API //

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
            <div className="col-xl-4 col-sm-6 col-12 d-flex">
              <div className="dash-widget w-100">
                <div className="dash-widgetimg">
                  <span>
                    
                    <FaMapMarkerAlt size={30} style={{ color: 'crimson' }} />
                  </span>

                </div>
                <div className="dash-widgetcontent">
                  <h5>
                    
                    {statename}

                  </h5>
                  <h6>State Statistics</h6>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-sm-6 col-12 d-flex">
              <div className="dash-widget w-100">
                <div className="dash-widgetimg">
                  <span>
                    <FcLibrary size={30} style={{ color: "mediumseagreen" }} />
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  <h5>
                    {Number(atl) + Number(nonAtl)}
                  </h5>
                  <h6>Total Reg Schools</h6>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6 col-12 d-flex">
              <div className="dash-widget dash2 w-100">
                <div className="dash-widgetimg">
                  <span>
                    <FaChalkboardTeacher size={30} style={{ color: "royalblue" }} />
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  <h5>
                   
                    {studentCoursesCompletedCount}

                  </h5>
                  <h6>Students Course Completed</h6>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6 col-12 d-flex">
              <div className="dash-widget w-100">
                <div className="dash-widgetimg">
                  <span>
                    <FaUserGraduate size={30} style={{ color: "mediumseagreen" }} />
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  <h5>
                    {totalMentorCount}
                  </h5>
                  <h6>Total Reg Teachers</h6>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-sm-6 col-12 d-flex">
              <div className="dash-widget dash1 w-100">
                <div className="dash-widgetimg">
                 
                  <span>
                    <FaUsers size={30} style={{ color: 'crimson' }} />
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  <h5>

                   
                    {totalteamsCount}
                  </h5>
                  <h6>Total Teams</h6>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6 col-12 d-flex">
              <div className="dash-widget dash2 w-100">
                <div className="dash-widgetimg">
                  <span>
                    <FaChalkboardTeacher size={30} style={{ color: "royalblue" }} />
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  <h5>
                   
                    {totalstudentCoursesCount -
                      studentCoursesCompletedCount}
                  </h5>
                  <h6>Students course in progress</h6>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6 col-12 d-flex">
              <div className="dash-widget dash3 w-100">
                <div className="dash-widgetimg">
                  <span>
                    <FaUserGraduate size={30} style={{ color: "mediumseagreen" }} />
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  <h5>
                   
                    {totalMentorMaleCount}

                  </h5>
                  <h6>Total Male Teachers</h6>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-sm-6 col-12 d-flex">
              <div className="dash-widget dash2 w-100">
                <div className="dash-widgetimg">
                 
                  <span>
                    <FaUsers size={30} style={{ color: 'crimson' }} />
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  <h5>
                    {totalStudentCount}

                  
                  </h5>
                  <h6>Total Students</h6>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6 col-12 d-flex">
              <div className="dash-widget dash2 w-100">
                <div className="dash-widgetimg">
                  <span>
                    <FaChalkboardTeacher size={30} style={{ color: "royalblue" }} />
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  <h5>
                  
                    {totalStudentCount -
                      totalstudentCoursesCount}
                  </h5>
                  <h6>Students Course not started</h6>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6 col-12 d-flex">
              <div className="dash-widget dash3 w-100">
                <div className="dash-widgetimg">
                  <span>
                    <FaUserGraduate size={30} style={{ color: "mediumseagreen" }} />
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  <h5>
                   
                    {totalMentorFeMaleCount
                    }
                  </h5>
                  <h6>Total Female Teachers</h6>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6 col-12 d-flex">
              <div className="dash-widget dash3 w-100">
                <div className="dash-widgetimg">
                 
                  <span>
                    <FaUsers size={30} style={{ color: 'crimson' }} />
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  <h5>
                   
                    {totalStudentMaleCount}

                  </h5>
                  <h6>Total Male Students</h6>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6 col-12 d-flex">
              <div className="dash-widget dash1 w-100">
                <div className="dash-widgetimg">
                 
                  <span>
                    <FaPaperPlane size={30} style={{ color: 'purple' }} />
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  <h5>
                   
                    {totalSubmittedideasCount}
                  </h5>
                  <h6>Total Teams Submitted Ideas</h6>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6 col-12 d-flex">
              <div className="dash-widget dash3 w-100">
                <div className="dash-widgetimg">
                  <span>
                    <FaUserGraduate size={30} style={{ color: "mediumseagreen" }} />
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  <h5>
                    
                    {(Number(totalMentorCount) - (Number(totalMentorMaleCount) + Number(totalMentorFeMaleCount)))}

                  </h5>
                  <h6>Total Others Teachers</h6>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6 col-12 d-flex">
              <div className="dash-widget dash3 w-100">
                <div className="dash-widgetimg">
                 
                  <span>
                    <FaUsers size={30} style={{ color: 'crimson' }} />
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  <h5>
                   
                    {totalStudentFemaleCount}

                  </h5>
                  <h6>Total Female Students</h6>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6 col-12 d-flex">
              <div className="dash-widget dash1 w-100">
                <div className="dash-widgetimg">
                  <span>
                    <FaPaperPlane size={30} style={{ color: 'purple' }} />
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  <h5>
                   
                    {totalideasCount -
                      totalSubmittedideasCount}
                  </h5>
                  <h6>Total Teams Ideas in Draft</h6>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6 col-12 d-flex">
              <div className="dash-widget w-100">
                <div className="dash-widgetimg">
                 
                  <span>
                    <FaChalkboardTeacher size={30} style={{ color: "royalblue" }} />
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  <h5>
                    {mentorCoursesCompletedCount}

                  </h5>
                  <h6>Teachers Course Completed</h6>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6 col-12 d-flex">
              <div className="dash-widget dash3 w-100">
                <div className="dash-widgetimg">
                
                  <span>
                    <FaUsers size={30} style={{ color: 'crimson' }} />
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  <h5>
                   
                    {(Number(totalStudentCount) - (Number(totalStudentMaleCount) + Number(totalStudentFemaleCount)))}

                  </h5>
                  <h6>Total Others Students</h6>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6 col-12 d-flex">
              <div className="dash-widget dash1 w-100">
                <div className="dash-widgetimg">
                  <span>
                    <FaPaperPlane size={30} style={{ color: 'purple' }} />
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  <h5>
                   
                    {totalteamsCount -
                      totalideasCount}
                  </h5>
                  <h6>Total Teams Not initiated Ideas</h6>
                </div>
              </div>
            </div>
            {currentUser?.data[0]?.state_name !== "Tamil Nadu" && (
              <><div className="col-xl-4 col-sm-6 col-12 d-flex">
                <div className="dash-widget w-100">
                  <div className="dash-widgetimg">
                    <span>
                     
                         <FcLibrary size={30} style={{ color: "mediumseagreen" }} />
                    </span>
                  </div>
                  <div className="dash-widgetcontent">
                    <h5>
                      {nonAtl}

                    </h5>
                    <h6>Total Non ATL Schools</h6>
                  </div>
                </div>
              </div><div className="col-xl-4 col-sm-6 col-12 d-flex">
                  <div className="dash-widget dash1 w-100">
                    <div className="dash-widgetimg">
                      <span>
                      <FcLibrary size={30} style={{ color: "mediumseagreen" }} />
                       
                      </span>
                    </div>
                    <div className="dash-widgetcontent">
                      <h5>

                        {atl}

                      </h5>
                      <h6>Total Atl Schools</h6>
                    </div>
                  </div>
                </div></>
            )}

          </div>



        </div>
      </div>
    </div>
  );
};

export default Dashboard;
