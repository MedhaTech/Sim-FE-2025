/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState } from "react";
import { Grid, Users,Shield } from "react-feather";
import { Link } from "react-router-dom";
import support from "../../assets/img/icons/purchase1.svg";
import FeatherIcon from "feather-icons-react";
import { ToolFilled } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const HorizontalSidebar = () => {
  const [isActive, setIsActive] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);
  const [isActive4, setIsActive4] = useState(false);
  const [isActive5, setIsActive5] = useState(false);
  const [isActive7, setIsActive7] = useState(false);
  const [isActive8, setIsActive8] = useState(false);
  const presurvey = localStorage.getItem("presurveystatus") ;
 const { t, i18n } = useTranslation();


  const handleSelectClick = () => {
    setIsActive(!isActive);
    setIsActive2(false);
    setIsActive3(false);
    setIsActive4(false);
    setIsActive5(false);
    setIsActive7(false);
    setIsActive8(false);
  };
  const handleSelectClick2 = () => {
    setIsActive(false);
    setIsActive2(!isActive2);
    setIsActive3(false);
    setIsActive4(false);
    setIsActive5(false);
    setIsActive7(false);
    setIsActive8(false);
  };
  const handleSelectClick3 = () => {
    setIsActive(false);
    setIsActive2(false);
    setIsActive3(!isActive3);
    setIsActive4(false);
    setIsActive5(false);
    setIsActive7(false);
    setIsActive8(false);
  };
  const handleSelectClick4 = () => {
    setIsActive(false);
    setIsActive2(false);
    setIsActive3(false);
    setIsActive4(!isActive4);
    setIsActive5(false);
    setIsActive7(false);
    setIsActive8(false);
  };
  const handleSelectClick5 = () => {
    setIsActive(false);
    setIsActive2(false);
    setIsActive3(false);
    setIsActive4(false);
    setIsActive5(!isActive5);
    setIsActive7(false);
    setIsActive8(false);
  };
 
  const handleSelectClick8 = () => {
    setIsActive(false);
    setIsActive2(false);
    setIsActive3(false);
    setIsActive4(false);
    setIsActive5(false);
    setIsActive7(false);
    setIsActive8(!isActive8);
  };

  const handleSelectClick7 = () => {
    setIsActive(false);
    setIsActive2(false);
    setIsActive3(false);
    setIsActive4(false);
    setIsActive5(false);
    setIsActive7(!isActive7);
  };

  return (
    ((presurvey != "INCOMPLETED") ? (
    <div className="sidebar horizontal-sidebar">
      <div id="sidebar-menu-3" className="sidebar-menu">
        <ul className="nav">
          <li className="submenu">
            <Link
              to="/teacher-dashboard"
              onClick={handleSelectClick}
              className={isActive ? "subdrop" : ""}
            >
              <Grid />
              <span>{t("home.dashboard")}</span>

            </Link>

          </li>
          <li className="submenu">
            <Link
              to="/mentorteams"
              onClick={handleSelectClick3}
              className={isActive3 ? "subdrop" : ""}
            >
              <Users />
              <span>{t("home.teams")}</span>
            </Link>

          </li>
          <li className="submenu">
            <Link
              to="/tecresource"
              onClick={handleSelectClick4}
              className={isActive4 ? "subdrop" : ""}
            >
              <ToolFilled />
              <span>{t("home.resources")}</span>
            </Link>

          </li>
          <li className="submenu">
            <Link
              to="/mentorpostsurvey"
              onClick={handleSelectClick5}
              className={isActive5 ? "subdrop" : ""}
            >
              <img src={support} alt="Survey" />
              <span>{t("home.post_survey")}</span>
            </Link>
            </li>
         
             

             
          <li className="submenu">
            <Link
              to="/mentorsupport"
              onClick={handleSelectClick7}
              className={isActive7 ? "subdrop" : ""}
            >
              <FeatherIcon icon="phone" />
              <span>{t("home.Support")}</span>
            </Link>
           
          </li>
          <li className="submenu">
            <Link
              to="/teacherBadges"
              onClick={handleSelectClick8}
              className={isActive8 ? "subdrop" : ""}
            >
              <Shield />
              <span>{t("home.badges")}</span>
            </Link>
            </li>
        </ul>
      </div>
    </div>
    ): null)
  );
};

export default HorizontalSidebar;
