/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState } from "react";
import { getCurrentUser } from "../helpers/Utils";
import { useNavigate } from "react-router-dom";
import male from "../assets/img/admin.jpg";

const AdminProfile = () => {
  const currentUser = getCurrentUser("current_user");
  const navigate = useNavigate();

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Admin Profile</h4>
          </div>
        </div>
        {/* /product list */}
        <div className="card">
          <div className="card-body">
            <div className="profile-set">
              <div className="profile-head"></div>
              <div className="profile-top">
                <div className="profile-content">
                  <div className="profile-contentimg">
                  <img src={male} alt="Male" id="blah" />
                  <div className="profileupload"></div>
                  </div>
                  <div className="profile-contentname">
                    <h2>{currentUser?.data[0]?.full_name}</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-sm-12">
                <div className="input-blocks">
                  <label className="form-label">User Name</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={currentUser?.data[0]?.full_name}
                    readOnly="readonly"
                  />
                </div>
              </div>
           
              <div className="col-lg-12 col-sm-12">
                <div className="input-blocks">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    defaultValue={currentUser?.data[0]?.name}
                    readOnly="readonly"
                  />
                </div>
              </div>
              
             
             
             
            </div>
          </div>
        </div>
        {/* /product list */}
      </div>
    </div>
  );
};

export default AdminProfile;
