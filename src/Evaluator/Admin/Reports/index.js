/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState ,useEffect} from "react";
import { Link } from 'react-router-dom';
import reg from "../../../assets/img/reportregister1.png";
import teacher from "../../../assets/img/classroom.png";
import school from "../../../assets/img/reportschool.png";
import student from "../../../assets/img/reportsstudent1.png";
import idea from "../../../assets/img/reportidea.png";
import user from "../../../assets/img/user.png";
import user1 from "../../../assets/img/reportuser1.png";
import user2 from "../../../assets/img/reportuser2.png";
import user3 from "../../../assets/img/reportuser3.png";
import {
    getCurrentUser,
   
  } from '../../../helpers/Utils';
  import axios from 'axios';
const Reports = () => {
    
  const currentUser = getCurrentUser('current_user');

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
                   
                    <div className="col-xxl-3 col-xl-3 col-lg-6 col-md-6">
                        <div className="employee-grid-profile">
                        <div className="profile-head">
                            <div className="dep-name">
                                <h5 className="active">L1 - Reports</h5>
                            </div>
                        </div>
                        <Link  to="/l1-report">
                            <div className="profile-info department-profile-info" >
                                
                                    <div className="profile-pic">
                                    <img
                                        src={school}
                                        alt=""
                                    />
                                    </div>
                                    <h4>L1 - Reports Stats</h4>
                            </div>
                        </Link>

                        </div>
                    </div>
                    <div className="col-xxl-3 col-xl-3 col-lg-6 col-md-6">
                        <div className="employee-grid-profile">
                        <div className="profile-head">
                            <div className="dep-name">
                                <h5 className="active">L2 - Reports</h5>
                            </div>
                        </div>
                        <Link  to="/l2-report">
                            <div className="profile-info department-profile-info" >
                                
                                    <div className="profile-pic">
                                    <img
                                        src={reg}
                                        alt=""
                                    />
                                    </div>
                                    <h4>L2 - Reports Stats</h4>
                            </div>
                        </Link>

                        </div>
                    </div>
                    <div className="col-xxl-3 col-xl-3 col-lg-6 col-md-6">
                        <div className="employee-grid-profile">
                        <div className="profile-head">
                            <div className="dep-name">
                                <h5 className="active">L3 - Reports</h5>
                            </div>
                        </div>
                        <Link  to="/l3-report">
                            <div className="profile-info department-profile-info" >
                                
                                    <div className="profile-pic">
                                    <img
                                        src={teacher}
                                        alt=""
                                    />
                                    </div>
                                    <h4>L3 - Reports Stats</h4>
                            </div>
                        </Link>

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
