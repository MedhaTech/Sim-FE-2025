/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState ,useEffect} from "react";
import { Link } from 'react-router-dom';
import reg from "../../assets/img/reportregister1.png";
import teacher from "../../assets/img/classroom.png";
import school from "../../assets/img/reportschool.png";
import student from "../../assets/img/reportsstudent1.png";
import idea from "../../assets/img/reportidea.png";
import user from "../../assets/img/user.png";
import user1 from "../../assets/img/reportuser1.png";
import user2 from "../../assets/img/reportuser2.png";
import user3 from "../../assets/img/reportuser3.png";
import {
    getCurrentUser,
   
  } from '../../helpers/Utils';
  import axios from 'axios';
const Reports = () => {
    
  const currentUser = getCurrentUser('current_user');
  useEffect(() => {
    adminTeamsCount();
    adminSudentCount();
    adminMentorCount();
    adminideasCount();
    nonAtlCount();
}, []);
    const [totalteamsCount, setTotalteamsCount] = useState('-');
    const [totalStudentCount, setTotalStudentCount] = useState('-');
    const [totalMentorCount, setTotalMentorCount] = useState('-');
    const [totalSubmittedideasCount, setTotalSubmittedideasCount] =
    useState('-');
    const [nonAtl, setNonAtl] = useState('-');
    const [atl, setAtl] = useState('-');
    const [other, setOther] = useState('-');

    const adminTeamsCount = () => {
        var config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + `/dashboard/teamCount`,
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
        var config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + `/dashboard/studentCount`,
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
    const adminMentorCount = () => {
        var config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + `/dashboard/mentorCount`,
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
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const adminideasCount = () => {
        var config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + `/dashboard/ideasCount`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setTotalSubmittedideasCount(response.data.data[0].submitted_ideas);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const nonAtlCount = () => {
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/dashboard/ATLNonATLRegCount`,
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
                    setOther(response.data.data[0].OthersCount);
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
            <div className="page-header">
                <div className="add-item d-flex">
                <div className="page-title">
                    <h4>SIM Reports</h4>
                    <h6>Find user data and analytical reports here</h6>
                </div>
                </div>
            </div>
            <div className="employee-grid-widget">
                <div className="row">
                    <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-6"></div>
                    <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-6">
                        <div className="employee-grid-profile">
                        <div className="profile-head">
                            <div className="dep-name">
                                <h5 className="active">1-School Registration</h5>
                            </div>
                        </div>
                        <Link   to ="/institution-report"
                        >
                            <div className="profile-info department-profile-info" >
                                
                                    <div className="profile-pic">
                                    <img
                                        src={school}
                                        alt=""
                                    />
                                    </div>
                                    <h4>Schools Reg Status</h4>
                            </div>
                        </Link>
                        <ul className="team-members">
                            <li>Schools Reg: {Number(atl) + Number(nonAtl) + Number(other) } </li>
                            <li>
                            <ul>
                                <li>
                                <Link to="#">
                                    <img
                                        src={user1}
                                        alt=""
                                    />
                                </Link>
                                </li>
                                <li>
                                <Link to="#">
                                    <img
                                        src={user2}
                                        alt=""
                                    />
                                </Link>
                                </li>
                                <li>
                                <Link to="#">
                                    <img
                                        src={user3}
                                        alt=""
                                    />
                                </Link>
                                </li>
                                <li>
                                <Link to="#">
                                    <img
                                        src={user}
                                        alt=""
                                    />
                                    <span>+</span>
                                </Link>
                                </li>
                            </ul>
                            </li>
                        </ul>
                        </div>
                    </div> 
                    <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-6"></div>
                    <div className="col-xxl-3 col-xl-4 col-lg-6 col-md-6">
                        <div className="employee-grid-profile">
                        <div className="profile-head">
                            <div className="dep-name">
                                <h5 className="active">2-Teacher Registration</h5>
                            </div>
                        </div>
                        <Link  to="/reportsregistration">
                            <div className="profile-info department-profile-info" >
                                
                                    <div className="profile-pic">
                                    <img
                                        src={reg}
                                        alt=""
                                    />
                                    </div>
                                    <h4>Teachers Reg details</h4>
                            </div>
                        </Link>
                        <ul className="team-members">
                            <li>Teachers Reg: {totalMentorCount}</li>
                            <li>
                            <ul>
                                <li>
                                <Link to="#">
                                    <img
                                        src={user1}
                                        alt=""
                                    />
                                </Link>
                                </li>
                                <li>
                                <Link to="#">
                                    <img
                                        src={user2}
                                        alt=""
                                    />
                                </Link>
                                </li>
                                <li>
                                <Link to="#">
                                    <img
                                        src={user3}
                                        alt=""
                                    />
                                </Link>
                                </li>
                                <li>
                                <Link to="#">
                                    <img
                                        src={user}
                                        alt=""
                                    />
                                    <span> +</span>
                                </Link>
                                </li>
                            </ul>
                            </li>
                        </ul>
                        </div>
                    </div>
                    <div className="col-xxl-3 col-xl-4 col-lg-6 col-md-6">
                        <div className="employee-grid-profile">
                        <div className="profile-head">
                            <div className="dep-name">
                                <h5 className="active">3-Teacher Progress</h5>
                            </div>
                        </div>
                        <Link  to="/reportsteacher">
                            <div className="profile-info department-profile-info" >
                                
                                    <div className="profile-pic">
                                    <img
                                        src={teacher}
                                        alt=""
                                    />
                                    </div>
                                    <h4>Teachers & Teams details</h4>
                            </div>
                        </Link>
                        <ul className="team-members">
                            <li>Total Teams: {totalteamsCount}</li>
                            <li>
                            <ul>
                                <li>
                                <Link to="#">
                                    <img
                                        src={user1}
                                        alt=""
                                    />
                                </Link>
                                </li>
                                <li>
                                <Link to="#">
                                    <img
                                        src={user2}
                                        alt=""
                                    />
                                </Link>
                                </li>
                                <li>
                                <Link to="#">
                                    <img
                                        src={user3}
                                        alt=""
                                    />
                                </Link>
                                </li>
                                <li>
                                <Link to="#">
                                    <img
                                        src={user}
                                        alt=""
                                    />
                                    <span> +</span>
                                </Link>
                                </li>
                            </ul>
                            </li>
                        </ul>
                        </div>
                    </div>
                    <div className="col-xxl-3 col-xl-4 col-lg-6 col-md-6">
                        <div className="employee-grid-profile">
                        <div className="profile-head">
                            <div className="dep-name">
                                <h5 className="active">4-Students Progress</h5>
                            </div>
                        </div>
                        <Link  to="/student-Report">
                            <div className="profile-info department-profile-info" >
                                
                                    <div className="profile-pic">
                                    <img
                                        src={student}
                                        alt=""
                                    />
                                    </div>
                                    <h4>Individuals details & status</h4>
                            </div>
                        </Link>
                        <ul className="team-members">
                            <li>Total Students: {totalStudentCount}</li>
                            <li>
                            <ul>
                                <li>
                                <Link to="#">
                                    <img
                                        src={user1}
                                        alt=""
                                    />
                                </Link>
                                </li>
                                <li>
                                <Link to="#">
                                    <img
                                        src={user2}
                                        alt=""
                                    />
                                </Link>
                                </li>
                                <li>
                                <Link to="#">
                                    <img
                                        src={user3}
                                        alt=""
                                    />
                                </Link>
                                </li>
                                <li>
                                <Link to="#">
                                    <img
                                        src={user}
                                        alt=""
                                    />
                                    <span> +</span>
                                </Link>
                                </li>
                            </ul>
                            </li>
                        </ul>
                        </div>
                    </div>
                    <div className="col-xxl-3 col-xl-4 col-lg-6 col-md-6">
                        <div className="employee-grid-profile">
                        <div className="profile-head">
                            <div className="dep-name">
                                <h5 className="active">5-Submitted Ideas</h5>
                            </div>
                        </div>
                        <Link   to ="/idea-report"
                        >
                            <div className="profile-info department-profile-info" >
                                
                                    <div className="profile-pic">
                                    <img
                                        src={idea}
                                        alt=""
                                    />
                                    </div>
                                    <h4>Innovations Details</h4>
                            </div>
                        </Link>
                        <ul className="team-members">
                            <li>Total Ideas: {totalSubmittedideasCount}</li>
                            <li>
                            <ul>
                                <li>
                                <Link to="#">
                                    <img
                                        src={user1}
                                        alt=""
                                    />
                                </Link>
                                </li>
                                <li>
                                <Link to="#">
                                    <img
                                        src={user2}
                                        alt=""
                                    />
                                </Link>
                                </li>
                                <li>
                                <Link to="#">
                                    <img
                                        src={user3}
                                        alt=""
                                    />
                                </Link>
                                </li>
                                <li>
                                <Link to="#">
                                    <img
                                        src={user}
                                        alt=""
                                    />
                                    <span>+</span>
                                </Link>
                                </li>
                            </ul>
                            </li>
                        </ul>
                        </div>
                    </div> 
                                       
                </div>
            </div>
        </div>
    </div>
</div>

);
};
export default Reports;
