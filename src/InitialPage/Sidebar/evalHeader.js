/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { Search, Settings, User, XCircle } from "react-feather";
import { all_routes } from "../../Router/all_routes";
import { useTranslation } from "react-i18next";
import { logout } from "../../helpers/Utils";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../helpers/Utils";
import logoutIcon from "../../assets/img/icons/log-out.svg";
import logo from "../../assets/img/new-logo.png";
import Icon from "../../assets/img/logos.jpg";
import { useSelector,useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getAdminNotificationsList } from '../../redux/actions';
import "./style.css";
const EadmiHeader = () => {
  const route = all_routes;
  const [toggle, SetToggle] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { t } = useTranslation();
  const currentUser = getCurrentUser("current_user");
  const allIdeaList = useSelector(
    (state) => state?.evaluator.submittedIdeaList
);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(getAdminNotificationsList());
  }, []);
  
 

  const navigate = useNavigate();
  const handleLogout = (e) => {
    logout(navigate, t, "EVALUATOR");
    e.preventDefault();
  };

  
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        document.fullscreenElement ||
          document.mozFullScreenElement ||
          document.webkitFullscreenElement ||
          document.msFullscreenElement
      );
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);
  const handlesidebar = () => {
    document.body.classList.toggle("mini-sidebar");
    SetToggle((current) => !current);
  };
  const expandMenu = () => {
    document.body.classList.remove("expand-menu");
  };
  const expandMenuOpen = () => {
    document.body.classList.add("expand-menu");
  };
  const sidebarOverlay = () => {
    document?.querySelector(".main-wrapper")?.classList?.toggle("slide-nav");
    document?.querySelector(".sidebar-overlay")?.classList?.toggle("opened");
    document?.querySelector("html")?.classList?.toggle("menu-opened");
  };


  const exclusionArray = [
    "/reactjs/template/dream-pos/index-three",
    "/reactjs/template/dream-pos/index-one",
  ];
  if (exclusionArray.indexOf(window.location.pathname) >= 0) {
    return "";
  }

  const toggleFullscreen = (elem) => {
    elem = elem || document.documentElement;
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  };
 

  return (

  
 <div className="header">
  <div
    className={`header-left ${toggle ? "" : "active"}`}
    onMouseLeave={expandMenu}
    onMouseOver={expandMenuOpen}
  >
    <img src={logo} alt="Logo" style={{ padding: "0.7rem" }} />
  </div>

  <Link
    id="mobile_btn"
    className="mobile_btn"
    to="#"
    onClick={sidebarOverlay}
  >
    <span className="bar-icon">
      <span />
      <span />
      <span />
    </span>
  </Link>

  <ul className="nav user-menu">
    <li className="nav-item nav-searchinputs">
      <div className="top-nav-search">
        {location.pathname?.split("/")?.pop() === "submitted-ideas" && (
          <div className="row w-100">
            <div
              className="d-flex justify-content-between align-items-center w-100"
              style={{ whiteSpace: "nowrap" }}
            >
              <p
                className="m-2"
                style={{ fontWeight: "bold", fontSize: "1rem" }}
              >
                Processed :&nbsp;
                <span
                  className="text-success"
                  style={{ fontWeight: "bold", fontSize: "1rem" }}
                >
                  {(allIdeaList && allIdeaList?.evaluatedIdeas) || 0}
                </span>
              </p>
             
            </div>
          </div>
        )}
      </div>
    </li>

    <li>
      <Link
        to="#"
        id="btnFullscreen"
        onClick={() => toggleFullscreen()}
        className={isFullscreen ? "Exit Fullscreen" : "Go Fullscreen"}
      >
        <FeatherIcon icon="maximize" />
      </Link>
    </li>

    <li className="nav-item dropdown has-arrow main-drop">
      <Link
        to="#"
        className="dropdown-toggle nav-link userset"
        data-bs-toggle="dropdown"
      >
        <span className="user-info">
          <span className="user-letter">
            <img src={Icon} alt="Team" id="blah" />
          </span>
          <span className="user-detail">
            <span className="user-name">
              {currentUser?.data[0]?.full_name}
            </span>
          </span>
        </span>
      </Link>
      <div className="dropdown-menu menu-drop-user">
        <div className="profilename">
          <div className="profileset">
            <span className="user-img">
              <span className="status online" />
            </span>
            <div className="profilesets">
              <h6>{currentUser?.data[0]?.full_name}</h6>
            </div>
          </div>
          <hr className="m-0" />
          <Link className="dropdown-item m-0" to="/evaluator-profile">
          <User className="me-2" /> My Profile
          </Link>
          <Link
            className="dropdown-item logout pb-0"
            to=""
            onClick={handleLogout}
          >
            <img src={logoutIcon} alt="LogoutIcon" />
            Logout
          </Link>
        </div>
      </div>
    </li>
  </ul>

  <div className="dropdown mobile-user-menu">
    <Link
      to="#"
      className="nav-link dropdown-toggle"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <i className="fa fa-ellipsis-v" />
    </Link>
    <div className="dropdown-menu dropdown-menu-right">
      {location.pathname?.split("/")?.pop() === "submitted-ideas" && (
        <div>
          <p className="dropdown-item d-flex align-items-center">
            <span>Processed :&nbsp;</span>
            <span className="text-success">
              {(allIdeaList && allIdeaList?.evaluatedIdeas) || 0}
            </span>
          </p>
          <p className="dropdown-item d-flex align-items-center">
            <span>Yet to be Processed :&nbsp;</span>
            <span className="text-danger">
              {(allIdeaList && allIdeaList?.openIdeas) || 0}
            </span>
          </p>
        </div>
      )}
      <Link className="dropdown-item" to="/evaluator/change-password">
        Change Password
      </Link>
      <Link className="dropdown-item"  to=""
            onClick={handleLogout}>
        Logout
      </Link>
    </div>
  </div>
</div>



  );
};

export default EadmiHeader;
