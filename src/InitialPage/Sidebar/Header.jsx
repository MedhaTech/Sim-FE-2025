/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { Search, Settings, User, XCircle } from "react-feather";
import { all_routes } from "../../Router/all_routes";
import { useTranslation } from "react-i18next";
import { logout } from "../../helpers/Utils";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../helpers/Utils";
import logoutIcon from "../../assets/img/icons/log-out.svg";
// import avtar from "../../assets/img/profiles/avator1.jpg";
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
    // setDiesCode(e.target.value);
  };
  // console.log(currentUser, " currentUser");
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

  let pathname = location.pathname;

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
  // const [multiOrgData, setMultiOrgData] = useState(null);
  useEffect(() => {
    if (diesCode.length == 11) {
      handleSearch(diesCode);
    }
  }, [diesCode]);
  const handleSearch = (diesCode) => {
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
          //  console.log(response,"res");
          if (response?.data?.count > 0) {
            if (response?.data?.data[0].status === "INACTIVE" && response?.data?.data[0].mentor == null) {
              openNotificationWithIcon("error", "Udise Code is Inactive");
              setDiesCode("");
            }
            if (response?.data?.data[0].status === "ACTIVE" && response?.data?.data[0].mentor == null) {
              openNotificationWithIcon(
                "error",
                <span style={{color:"red"}}>No Teachers are registered from the given Udise Code</span>
                // "No Teachers are Registered from the given UDISE Code"
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
              //  console.log(multiOrgData,"dd");
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
    // e.preventDefault();
  };
  // console.log(multiOrgData,"mm");
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
            // className="logo-image"
          />
          {/* <Link to="/dashboard" className="logo logo-normal">
            <ImageWithBasePath src="assets/img/logo.png" alt="img" />
          </Link>
          <Link to="/dashboard" className="logo logo-white">
            <ImageWithBasePath src="assets/img/logo-white.png" alt="img" />
          </Link>
          <Link to="/dashboard" className="logo-small">
            <ImageWithBasePath src="assets/img/logo-small.png" alt="img" />
          </Link> */}
          {/* <Link
            id="toggle_btn"
            to="#"
            style={{
              display:
                pathname.includes("tasks") || pathname.includes("pos")
                  ? "none"
                  : pathname.includes("compose")
                  ? "none"
                  : "",
            }}
            onClick={handlesidebar}
          >
            <FeatherIcon icon="chevrons-left" className="feather-16" />
          </Link> */}
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
                  // id="dropdownMenuClickable"
                  // data-bs-toggle="dropdown"
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
                {/* <div
                  className="dropdown-menu search-dropdown"
                  aria-labelledby="dropdownMenuClickable"
                >
                  <div className="search-info">
                    <h6>
                      <span>
                        <i data-feather="search" className="feather-16" />
                      </span>
                      Recent Searches
                    </h6>
                    <ul className="search-tags">
                      <li>
                        <Link to="#">Enter School UDISE Code</Link>
                      </li>
                     
                    </ul>
                  </div>
                
                </div> */}
              </form>
            </div>
          </li>
          )}
          {/* /Search */}

          {/* Select Store */}
          {/* <li className="nav-item dropdown has-arrow main-drop select-store-dropdown">
            <Link
              to="#"
              className="dropdown-toggle nav-link select-store"
              data-bs-toggle="dropdown"
            >
              <span className="user-info">
                <span className="user-letter">
                  <ImageWithBasePath
                    src="assets/img/store/store-01.png"
                    alt="Store Logo"
                    className="img-fluid"
                  />
                </span>
                <span className="user-detail">
                  <span className="user-name">Select Store</span>
                </span>
              </span>
            </Link>
            <div className="dropdown-menu dropdown-menu-right">
              <Link to="#" className="dropdown-item">
                <ImageWithBasePath
                  src="assets/img/store/store-01.png"
                  alt="Store Logo"
                  className="img-fluid"
                />{" "}
                Grocery Alpha
              </Link>
              <Link to="#" className="dropdown-item">
                <ImageWithBasePath
                  src="assets/img/store/store-02.png"
                  alt="Store Logo"
                  className="img-fluid"
                />{" "}
                Grocery Apex
              </Link>
              <Link to="#" className="dropdown-item">
                <ImageWithBasePath
                  src="assets/img/store/store-03.png"
                  alt="Store Logo"
                  className="img-fluid"
                />{" "}
                Grocery Bevy
              </Link>
              <Link to="#" className="dropdown-item">
                <ImageWithBasePath
                  src="assets/img/store/store-04.png"
                  alt="Store Logo"
                  className="img-fluid"
                />{" "}
                Grocery Eden
              </Link>
            </div>
          </li> */}
          {/* /Select Store */}

          {/* Flag */}
          {/* <li className="nav-item dropdown has-arrow flag-nav nav-item-box">
            <Link
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              to="#"
              role="button"
            > */}
          {/* <i data-feather="globe" /> */}
          {/* <FeatherIcon icon="globe" /> */}
          {/* <ImageWithBasePath
            src="assets/img/flags/us.png"
            alt="img"
            height={16}
          /> */}
          {/* </Link> */}
          {/* <div className="dropdown-menu dropdown-menu-right"> */}
          {/* <Link to="#" className="dropdown-item active">
                <ImageWithBasePath
                  src="assets/img/flags/us.png"
                  alt="img"
                  height={16}
                />
                English
              </Link>
              <Link to="#" className="dropdown-item">
                <ImageWithBasePath
                  src="assets/img/flags/fr.png"
                  alt="img"
                  height={16}
                />{" "}
                French
              </Link>
              <Link to="#" className="dropdown-item">
                <ImageWithBasePath
                  src="assets/img/flags/es.png"
                  alt="img"
                  height={16}
                />{" "}
                Spanish
              </Link>
              <Link to="#" className="dropdown-item">
                <ImageWithBasePath
                  src="assets/img/flags/de.png"
                  alt="img"
                  height={16}
                />{" "}
                German
              </Link> */}
          {/* </div> */}
          {/* </li> */}
          {/* /Flag */}
          <li className="nav-item nav-item-box">
            <Link
              to="#"
              id="btnFullscreen"
              onClick={() => toggleFullscreen()}
              className={isFullscreen ? "Exit Fullscreen" : "Go Fullscreen"}
            >
              {/* <i data-feather="maximize" /> */}
              <FeatherIcon icon="maximize" />
            </Link>
          </li>
          {/* <li className="nav-item nav-item-box">
            <Link to="/email"> */}
          {/* <i data-feather="mail" /> */}
          {/* <FeatherIcon icon="mail" />
              <span className="badge rounded-pill">1</span>
            </Link>
          </li> */}
          {/* Notifications */}
          {/* <li className="nav-item dropdown nav-item-box">
            <Link
              to="#"
              className="dropdown-toggle nav-link"
              data-bs-toggle="dropdown"
            > */}
          {/* <i data-feather="bell" />
              <FeatherIcon icon="bell" />
              <span className="badge rounded-pill">2</span>
            </Link> */}
          {/* <div className="dropdown-menu notifications">
              <div className="topnav-dropdown-header">
                <span className="notification-title">Notifications</span>
                <Link to="#" className="clear-noti">
                  {" "}
                  Clear All{" "}
                </Link>
              </div>
              <div className="noti-content">
                <ul className="notification-list">
                  <li className="notification-message active">
                    <Link to="/activities">
                      <div className="media d-flex">
                        <span className="avatar flex-shrink-0">
                          <ImageWithBasePath
                            alt="img"
                            src="assets/img/profiles/avatar-02.jpg"
                          />
                        </span>
                        <div className="media-body flex-grow-1">
                          <p className="noti-details">
                            <span className="noti-title">John Doe</span> added
                            new task{" "}
                            <span className="noti-title">
                              Patient appointment booking
                            </span>
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">
                              4 mins ago
                            </span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="notification-message">
                    <Link to="/activities">
                      <div className="media d-flex">
                        <span className="avatar flex-shrink-0">
                          <ImageWithBasePath
                            alt="img"
                            src="assets/img/profiles/avatar-03.jpg"
                          />
                        </span>
                        <div className="media-body flex-grow-1">
                          <p className="noti-details">
                            <span className="noti-title">Tarah Shropshire</span>{" "}
                            changed the task name{" "}
                            <span className="noti-title">
                              Appointment booking with payment gateway
                            </span>
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">
                              6 mins ago
                            </span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="notification-message">
                    <Link to="/activities">
                      <div className="media d-flex">
                        <span className="avatar flex-shrink-0">
                          <ImageWithBasePath
                            alt="img"
                            src="assets/img/profiles/avatar-06.jpg"
                          />
                        </span>
                        <div className="media-body flex-grow-1">
                          <p className="noti-details">
                            <span className="noti-title">Misty Tison</span>{" "}
                            added{" "}
                            <span className="noti-title">Domenic Houston</span>{" "}
                            and <span className="noti-title">Claire Mapes</span>{" "}
                            to project{" "}
                            <span className="noti-title">
                              Doctor available module
                            </span>
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">
                              8 mins ago
                            </span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="notification-message">
                    <Link to="/activities">
                      <div className="media d-flex">
                        <span className="avatar flex-shrink-0">
                          <ImageWithBasePath
                            alt="img"
                            src="assets/img/profiles/avatar-17.jpg"
                          />
                        </span>
                        <div className="media-body flex-grow-1">
                          <p className="noti-details">
                            <span className="noti-title">Rolland Webber</span>{" "}
                            completed task{" "}
                            <span className="noti-title">
                              Patient and Doctor video conferencing
                            </span>
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">
                              12 mins ago
                            </span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="notification-message">
                    <Link to="/activities">
                      <div className="media d-flex">
                        <span className="avatar flex-shrink-0">
                          <ImageWithBasePath
                            alt="img"
                            src="assets/img/profiles/avatar-13.jpg"
                          />
                        </span>
                        <div className="media-body flex-grow-1">
                          <p className="noti-details">
                            <span className="noti-title">Bernardo Galaviz</span>{" "}
                            added new task{" "}
                            <span className="noti-title">
                              Private chat module
                            </span>
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">
                              2 days ago
                            </span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="topnav-dropdown-footer">
                <Link to="/activities">View all Notifications</Link>
              </div>
            </div> */}
          {/* </li> */}
          {/* /Notifications */}
          {/* <li className="nav-item nav-item-box"> */}
          {/* <Link to="/general-settings"> */}
          {/* <i data-feather="settings" /> */}
          {/* <FeatherIcon icon="settings" /> */}
          {/* </Link> */}
          {/* </li> */}
          <li className="nav-item dropdown has-arrow main-drop">
            <Link
              to="#"
              className="dropdown-toggle nav-link userset"
              data-bs-toggle="dropdown"
            >
              <span className="user-info">
                <span className="user-letter">
                  {/* <ImageWithBasePath
                    src="assets/img/profiles/avator1.jpg"
                    alt="img"
                    className="img-fluid"
                  /> */}
                  {/* <img src={avtar} alt="Avtar" className="img-fluid" /> */}
                  <img src={Icon} alt="Team" id="blah" />
                </span>
                <span className="user-detail">
                  {/* {currentUser?.data[0]?.role} */}
                  <span className="user-name">
                    {" "}
                    {currentUser?.data[0]?.full_name}
                  </span>
                  {/* <span className="user-role">Super Admin</span> */}
                </span>
              </span>
            </Link>
            <div className="dropdown-menu menu-drop-user">
              <div className="profilename">
                <div className="profileset">
                  <span className="user-img">
                    {/* <ImageWithBasePath
                      src="assets/img/profiles/avator1.jpg"
                      alt="img"
                    /> */}
                    {/* <img src={avtar} alt="Avtar" /> */}
                    <span className="status online" />
                  </span>
                  <div className="profilesets">
                    <h6> {currentUser?.data[0]?.full_name}</h6>
                    {/* <h5>Super Admin</h5> */}
                  </div>
                </div>
                <hr className="m-0" />
                <Link
                  className="dropdown-item"
                  // onClick={handleProfile}
                  to={"/profile"}
                  // onClick={() => navigate("/admin/profile")}
                >
                  <User className="me-2" /> My Profile
                </Link>
                {/* <Link className="dropdown-item" to={route.generalsettings}>
                  <Settings className="me-2" />
                  Settings
                </Link> */}
                <hr className="m-0" />
                <Link
                  className="dropdown-item logout pb-0"
                  to=""
                  onClick={handleLogout}
                >
                  {/* <ImageWithBasePath
                    src="assets/img/icons/log-out.svg"
                    alt="img"
                    className="me-2"
                  /> */}
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
            {/* <Link className="dropdown-item" to="generalsettings">
              Settings
            </Link> */}
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
