/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../helpers/Utils";
import edit from "../assets/img/icons/edit-set.svg";
import { useNavigate } from "react-router-dom";
import female from "../assets/img/Female_Profile.png";
import male from "../assets/img/Male_Profile.png";
import team1 from "../assets/img/icons/team.svg";
import user from "../assets/img/user.png";
import { useTranslation } from "react-i18next";

const TeacherProfile = () => {
  const currentUser = getCurrentUser("current_user");
  const navigate = useNavigate();
const { t } = useTranslation();
  const handleEdit = () => {
    navigate("/mentoreditprofile", {
      state: {
        full_name: currentUser?.data[0]?.full_name,
        mentor_id: currentUser?.data[0]?.mentor_id,
        username: currentUser?.data[0]?.name,
        title: currentUser?.data[0]?.title,
      },
    });
  };
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>{t("home.my_profile")}</h4>
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
                    {currentUser?.data[0]?.role === "TEAM" ? (
                      <img src={team1} alt="Team" id="blah" style={{background:"white"}}/>
                    ) : currentUser?.data[0]?.role === "STUDENT" && (currentUser?.data[0]?.Gender === "Male" || currentUser?.data[0]?.Gender === "MALE") ? (
                      <img src={male} alt="Male" id="blah" />
                    ) : ((currentUser?.data[0]?.Gender === "Female" || currentUser?.data[0]?.Gender === "FEMALE")?(
                      <img src={female} alt="Female" id="blah" />):(<img src={user} alt="user" id="blah" />)
                    )}
                    <div className="profileupload">
                      
                    </div>
                  </div>
                  <div className="profile-contentname">
                    <h2>{currentUser?.data[0]?.team_name}</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-sm-12">
                <div className="input-blocks">
                  <label className="form-label"> {t("teacherJourney.tname")}</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={currentUser?.data[0]?.team_name}
                    readOnly="readonly"
                  />
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="input-blocks">
                  <label className="form-label">{t("teacherJourney.TeamUsername")}</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={currentUser?.data[0]?.name}
                     readOnly="readonly"
                  />
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="input-blocks">
                  <label>{t("teacherJourney.temail")}</label>
                  <input
                    type="email"
                    className="form-control"
                    defaultValue={currentUser?.data[0]?.team_email}
                    readOnly="readonly"
                  />
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="input-blocks">
                  <label className="form-label">{t("teacherJourney.sname")}</label>
                  <input
                    type="text"
                    defaultValue={currentUser?.data[0]?.organization_name}
                    readOnly="readonly"
                  />
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="input-blocks">
                  <label className="form-label">{t("teacherJourney.guide")}</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={currentUser?.data[0]?.Teacher_name}
                    readOnly="readonly"
                  />
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="input-blocks">
                  <label className="form-label">{t("teacherJourney.State")}</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={currentUser?.data[0]?.state}
                    readOnly="readonly"
                  />
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="input-blocks">
                  <label className="form-label">{t("teacherJourney.District")}</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={currentUser?.data[0]?.district}
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

export default TeacherProfile;
