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
import axios from "axios";
import Icon from "../../assets/img/logos.jpg";
import { openNotificationWithIcon } from "../../helpers/Utils.js";

const Header = () => {
  const route = all_routes;
  const [toggle, SetToggle] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { t } = useTranslation();
  const currentUser = getCurrentUser("current_user");
  const [diesCode, setDiesCode] = useState("");
  const [multiOrgData, setMultiOrgData] = useState([]);

  const handleOnChange = (e) => {
    // we can give diescode as input //
    //where organization_code = diescode //
    const numericValue = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
    const trimmedValue = numericValue.trim();

    setDiesCode(trimmedValue);
  };
  const isElementVisible = (element) => {
    return element.offsetWidth > 0 || element.offsetHeight > 0;
  };
  const navigate = useNavigate();
  const handleLogout = (e) => {
    logout(navigate, t, "ADMIN");
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseover = (e) => {
      e.stopPropagation();

      const body = document.body;
      const toggleBtn = document.getElementById("toggle_btn");

      if (
        body.classList.contains("mini-sidebar") &&
        isElementVisible(toggleBtn)
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("mouseover", handleMouseover);

    return () => {
      document.removeEventListener("mouseover", handleMouseover);
    };
  }, []);
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
  useEffect(() => {
    if (diesCode.length == 11) {
      handleSearch(diesCode);
    }
  }, [diesCode]);
  const handleSearch = (diesCode) => {
    //where we can search through diescode //
    // we can see Registration Details & Mentor Details //
    const body = JSON.stringify({
      organization_code: diesCode,
    });
    var config = {
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/organizations/checkOrg",
      headers: {
        "Content-Type": "application/json",
        Authorization: "O10ZPA0jZS38wP7cO9EhI3jaDf24WmKX62nWw870",
      },
      data: body,
    };

    axios(config)
      .then(async function (response) {
        if (response.status == 200) {
          if (response?.data?.count > 0) {
            if (response?.data?.data[0].status === "INACTIVE" && response?.data?.data[0].mentor == null) {
              openNotificationWithIcon("error", "Udise Code is Inactive");
              setDiesCode("");
            }
            if (response?.data?.data[0].status === "ACTIVE" && response?.data?.data[0].mentor == null) {
              openNotificationWithIcon(
                "error",
                "No Teachers are Registered from the given UDISE Code"
              );
              setDiesCode("");
            } else if (response?.data?.data[0].mentor !== null) {
              const multiOrgData = response?.data?.data;
              localStorage.removeItem("diesCode");
              localStorage.removeItem("multiOrgData");
              localStorage.setItem("diesCode", JSON.stringify(diesCode));
              localStorage.setItem(
                "multiOrgData",
                JSON.stringify(multiOrgData)
              );
              setMultiOrgData(multiOrgData);
              navigate("/diescode-search", {
                state: { multiOrgData, diesCode },
              });

              setDiesCode("");
              window.location.reload();
            }
          } else {
            openNotificationWithIcon("error", "Invalid Udise Code");
            setDiesCode("");
          }
        }
      })
      .catch(function (error) {
        if (error?.response?.data?.status === 404) {
          // setError('Entered Invalid Institution Unique Code');
        }
      });
  };
  return (
    <>
      <div className="header">
        {/* Logo */}
        <div
          className={`header-left ${toggle ? "" : "active"}`}
          onMouseLeave={expandMenu}
          onMouseOver={expandMenuOpen}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ padding: "0.7rem" }}
          />
         
         
        </div>
        {/* /Logo */}
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
        {/* Header Menu */}
        <ul className="nav user-menu">
          {/* Search */}
          {currentUser.data[0].permission === "Dashboard,Overall Schools,PopUp,Resource,Latest News,State Specific,Support,Mentors,Teams,Students,Admins,States,Reports,Bulk Email" && (
          <li className="nav-item nav-searchinputs">
            <div className="top-nav-search">
              <Link to="#" className="responsive-search">
                <Search />
              </Link>
              <form action="#" className="dropdown">
                <div
                  className="searchinputs"
                  data-bs-auto-close="false"
                >
                  <input
                    type="text"
                    placeholder="Enter UDISE Code"
                    onChange={(e) => handleOnChange(e)}
                    value={diesCode}
                    maxLength={11}
                    minLength={11}
                    name="organization_code"
                  />
                  <div className="search-addon">
                    <span>
                      <XCircle className="feather-14" />
                    </span>
                  </div>
                </div>
              
              </form>
            </div>
          </li>
          )}
         
         
          <li className="nav-item nav-item-box">
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
                    {" "}
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
                    <h6> {currentUser?.data[0]?.full_name}</h6>
                  </div>
                </div>
                <hr className="m-0" />
                <Link
                  className="dropdown-item"
                  to={"/profile"}
                >
                  <User className="me-2" /> My Profile
                </Link>
              
                <hr className="m-0" />
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
        {/* /Header Menu */}
        {/* Mobile Menu */}
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
            <Link
              className="dropdown-item"
              onClick={() => navigate("/profile")}
            >
              My Profile
            </Link>
         
            <Link className="dropdown-item"  to=""
                  onClick={handleLogout}>
              Logout
            </Link>
          </div>
        </div>
        {/* /Mobile Menu */}
      </div>
    </>
  );
};

export default Header;
