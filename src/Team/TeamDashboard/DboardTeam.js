/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { all_routes } from "../../Router/all_routes";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { encryptGlobal } from "../../constants/encryptDecrypt";
import female from "../../assets/img/Female_Profile.png";
import male from "../../assets/img/Male_Profile.png";
import user from "../../assets/img/icons/user-icon.svg";
import girl1 from "../../assets/img/girl1.png";
import girl2 from "../../assets/img/girl2.png";
import girl3 from "../../assets/img/girl3.png";
import girl4 from "../../assets/img/girl4.png";
import girl5 from "../../assets/img/girl5.png";
import girl6 from "../../assets/img/girl6.png";
import boy1 from "../../assets/img/boy1.png";
import boy2 from "../../assets/img/boy2.png";
import boy3 from "../../assets/img/boy3.png";
import boy4 from "../../assets/img/boy4.png";
import boy5 from "../../assets/img/boy5.png";
import boy6 from "../../assets/img/boy6.png";



import {
  Edit,
  Grid,
  List,
  MoreVertical,
  PlusCircle,
  RotateCcw,
  Trash2,
} from "feather-icons-react/build/IconComponents";
import { setToogleHeader } from "../../core/redux/action";
import {
  ChevronUp,
  Filter,
  Sliders,
  StopCircle,
  User,
  Users,
} from "react-feather";
import Select from "react-select";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { getCurrentUser, setCurrentUser } from "../../helpers/Utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmployeesGrid = () => {
  const route = all_routes;
  const currentUser = getCurrentUser("current_user");
  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Select Language');
  const [studentCount, setStudentCount] = useState([]);
  const toggleFilterVisibility = () => {
    setIsFilterVisible((prevVisibility) => !prevVisibility);
  };
  const navigate = useNavigate();

  const boys = [boy1,boy2,boy3,boy4,boy5,boy6];
  const girls = [girl1,girl2,girl3,girl4,girl5,girl6];

  const oldandlatestvalue = [
    { value: "date", label: "Sort by Date" },
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
  ];
  const status = [
    { value: "Choose Status", label: "Choose Status" },
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  const names = [
    { value: "Choose Name", label: "Choose Name" },
    { value: "Mitchum Daniel", label: "Mitchum Daniel" },
    { value: "Susan Lopez", label: "Susan Lopez" },
    { value: "Robert Grossman", label: "Robert Grossman" },
    { value: "Janet Hembre", label: "Janet Hembre" },
  ];
  useEffect(() => {
    if (currentUser?.data[0]?.team_id) {
      mentorTeamsCount(currentUser?.data[0]?.team_id);
    }
  }, [currentUser?.data[0]?.team_id]);
  const mentorTeamsCount = (id) => {
    const popParam = encryptGlobal(JSON.stringify(id));
    var config = {
      method: "get",
      url:
        process.env.REACT_APP_API_BASE_URL +
        `/students/studentsList/${popParam}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${currentUser.data[0]?.token}`,
      },
    };
    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          setStudentCount(response.data.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleStudent = (student) => {
    console.log(student, "clicked Login");
    alert("hii");
    const data = { ...student };
    currentUser.data[0].full_name = data?.full_name;
    currentUser.data[0].user_id = data?.user_id;
    currentUser.data[0].role = data?.role;
    setCurrentUser(currentUser);
    navigate("/studentpresurvey");
  };
  console.log(currentUser, "user");
  const getRandomImage = (imageArray) => {
    const randomIndex = Math.floor(Math.random() * imageArray.length);
    return imageArray[randomIndex];
  };
  const getProfileImage = (gender) => {
    console.log(gender);
    switch (gender) {
      case "MALE":
        return getRandomImage(boys);
      case "FEMALE":
        return getRandomImage(girls);
      default:
        return user;
    }
  };
  // const renderTooltip = (props) => (
  //   <Tooltip id="pdf-tooltip" {...props}>
  //     Pdf
  //   </Tooltip>
  // );
  // const renderExcelTooltip = (props) => (
  //   <Tooltip id="excel-tooltip" {...props}>
  //     Excel
  //   </Tooltip>
  // );
  // const renderPrinterTooltip = (props) => (
  //   <Tooltip id="printer-tooltip" {...props}>
  //     Printer
  //   </Tooltip>
  // );
  // const renderRefreshTooltip = (props) => (
  //   <Tooltip id="refresh-tooltip" {...props}>
  //     Refresh
  //   </Tooltip>
  // );
  // const renderCollapseTooltip = (props) => (
  //   <Tooltip id="refresh-tooltip" {...props}>
  //     Collapse
  //   </Tooltip>
  // );
  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <div>
      <div className="page-wrapper">
        <div className="content"> 
        {/* Welcome user */}
          <div className="welcome d-lg-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center welcome-text">
                <h3 className="d-flex align-items-center">
                  <span style={{ fontSize: '30px' }}>👋</span>
                  &nbsp;Hi {currentUser?.data[0]?.full_name} Team &nbsp;
                </h3>
               
                <h6> here&apos;s what&apos;s happening with your School Innovation Marathon 2024 today.</h6>
              </div>
              <div className="dropdown">
                  <button
                      className="btn btn-primary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                  >
                      {selectedLanguage}
                  </button>
                  <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" onClick={() => handleLanguageChange('English')} to="#">
                              English
                          </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" onClick={() => handleLanguageChange('Hindi')} to="#">
                              Hindi
                          </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" onClick={() => handleLanguageChange('Telugu')} to="#">
                              Telugu
                          </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" onClick={() => handleLanguageChange('Tamil')} to="#">
                              Tamil
                          </Link>
                      </li>
                  </ul>
              </div>
          </div>
          
            {/* <ul className="table-top-head">
              <li>
                <OverlayTrigger placement="top" overlay={renderTooltip}>
                  <Link>
                    <ImageWithBasePath
                      src="assets/img/icons/pdf.svg"
                      alt="img"
                    />
                  </Link>
                </OverlayTrigger>
              </li>
              <li>
                <OverlayTrigger placement="top" overlay={renderExcelTooltip}>
                  <Link data-bs-toggle="tooltip" data-bs-placement="top">
                    <ImageWithBasePath
                      src="assets/img/icons/excel.svg"
                      alt="img"
                    />
                  </Link>
                </OverlayTrigger>
              </li>
              <li>
                <OverlayTrigger placement="top" overlay={renderPrinterTooltip}>
                  <Link data-bs-toggle="tooltip" data-bs-placement="top">
                    <i data-feather="printer" className="feather-printer" />
                  </Link>
                </OverlayTrigger>
              </li>
              <li>
                <OverlayTrigger placement="top" overlay={renderRefreshTooltip}>
                  <Link data-bs-toggle="tooltip" data-bs-placement="top">
                    <RotateCcw />
                  </Link>
                </OverlayTrigger>
              </li>
              <li>
                <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>
                  <Link
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    id="collapse-header"
                    className={data ? "active" : ""}
                    onClick={() => {
                      dispatch(setToogleHeader(!data));
                    }}
                  >
                    <ChevronUp />
                  </Link>
                </OverlayTrigger>
              </li>
            </ul> */}
            {/* <div className="page-btn">
              <Link to={route.addemployee} className="btn btn-added">
                <PlusCircle className="me-2" />
                Add New Employee
              </Link>
            </div> */}
          
          {/* /product list */}
          {/* <div className="card">
            <div className="card-body pb-0">
              <div className="table-top table-top-two table-top-new">
                <div className="search-set mb-0">
                  <div className="total-employees">
                    <h6>
                      <Users />
                      Total Employees <span>21</span>
                    </h6>
                  </div>
                  <div className="search-input">
                    <Link to="" className="btn btn-searchset">
                      <i data-feather="search" className="feather-search" />
                    </Link>
                    <input type="search" className="form-control" />
                  </div>
                </div>
                <div className="search-path d-flex align-items-center search-path-new">
                  <div className="d-flex">
                    <Link className="btn btn-filter" id="filter_search">
                      <Filter
                        className="filter-icon"
                        onClick={toggleFilterVisibility}
                      />
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/closes.svg"
                          alt="img"
                        />
                      </span>
                    </Link>
                    <Link to={route.employeelist} className="btn-list">
                      <List />
                    </Link>
                    <Link to={route.employeegrid} className="btn-grid active">
                      <Grid />
                    </Link>
                  </div>
                  <div className="form-sort">
                    <Sliders className="info-img" />
                    <Select
                      className="img-select"
                      classNamePrefix="react-select"
                      options={oldandlatestvalue}
                      placeholder="Newest"
                    />
                  </div>
                </div>
              </div>
              <div
                className={`card${isFilterVisible ? " visible" : ""}`}
                id="filter_inputs"
                style={{ display: isFilterVisible ? "block" : "none" }}
              >
                <div className="card-body pb-0">
                  <div className="row">
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="input-blocks">
                        <User className="info-img" />
                        <Select
                          className="img-select"
                          classNamePrefix="react-select"
                          options={names}
                          placeholder="Choose Name"
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="input-blocks">
                        <StopCircle className="info-img" />

                        <Select
                          className="img-select"
                          classNamePrefix="react-select"
                          options={status}
                          placeholder="Choose Status"
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12 ms-auto">
                      <div className="input-blocks">
                        <Link className="btn btn-filters ms-auto">
                          {" "}
                          <i
                            data-feather="search"
                            className="feather-search"
                          />{" "}
                          Search{" "}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          {/* /product list */}
          <div className="employee-grid-widget">
            <div className="row">
              {studentCount.map((student, i) => (
                <div key={i} className="col-xxl-3 col-xl-4 col-lg-6 col-md-6">
                  <div className="employee-grid-profile">
                    <div className="profile-head">
                      <div className="profile-head-action">
                        <button
                          type="button"
                          className="btn btn-outline-warning text-center w-auto me-1"
                          onClick={() => handleStudent(student)}
                        >
                          Login
                        </button>
                      </div>
                    </div>
                    <div className="profile-info">
                      <div className="profile-pic active-profile">
                        <img
                          src={getProfileImage(student.Gender)}
                          alt="Profile"
                        />
                      </div>
                      <h4 style={{color:"orange"}}>{student.full_name}</h4>
                     {/* <div className="row">
                        <div className="col ">
                          <span>Grade : {student.Grade}</span>
                        </div>
                        <div className="col ">
                          <span>Age : {student.Age}yr</span>
                        </div>
                      </div>
                       <span>Grade : {student.Grade} Age : {student.Age} yr</span>
                      <span>Age : {student.Age} yr</span> */}
                    </div>
                    <ul className="department">
                      <li>
                        Grade <span>{student.Grade}th class</span>{" "}
                        {/* Update with actual joined date if available */}
                      </li>
                      <li>
                        Age <span>{student.Age} yrs</span>{" "}
                        {/* Update with actual department if available */}
                      </li>
                    </ul>
                    <div className="departments">
                      <p>Instructions to students on their action items</p>
                    </div>
                  </div>
                </div>
              ))}
              {/* <div className="col-xxl-3 col-xl-4 col-lg-6 col-md-6">
                <div className="employee-grid-profile">
                  <div className="profile-head">
                    <div className="profile-head-action">
                      <button
                        type="button"
                        className="btn btn-outline-warning text-center w-auto me-1"
                      >
                        Login
                      </button>
                    </div>
                  </div>
                  <div className="profile-info">
                    <div className="profile-pic active-profile">
                      <ImageWithBasePath
                        src="assets/img/users/user-01.jpg"
                        alt=""
                      />
                    </div>
                    <h5>EMP ID : POS001</h5>
                    <h4>Mitchum Daniel</h4>
                    <span>Designer</span>
                  </div>
                  <ul className="department">
                    <li>
                      Joined
                      <span>23 Jul 2023</span>
                    </li>
                    <li>
                      Department
                      <span>UI/UX</span>
                    </li>
                  </ul>
                </div>
              </div> */}
              {/* <div className="col-xxl-3 col-xl-4 col-lg-6 col-md-6">
                <div className="employee-grid-profile">
                  <div className="profile-head">
                    <label className="checkboxs">
                      <input type="checkbox" />
                      <span className="checkmarks" />
                    </label>
                    <div className="profile-head-action">
                      <span className="badge badge-linesuccess text-center w-auto me-1">
                        Active
                      </span>
                      <div className="dropdown profile-action">
                        <Link
                          to="#"
                          className="action-icon dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <MoreVertical />{" "}
                        </Link>
                        <ul className="dropdown-menu">
                          <li>
                            <Link
                              to={route.editemployee}
                              className="dropdown-item"
                            >
                              <Edit className="info-img" />
                              Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item confirm-text mb-0"
                              // onClick={showConfirmationAlert}
                            >
                              <Trash2 className="info-img" />
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="profile-info">
                    <div className="profile-pic active-profile">
                      <ImageWithBasePath
                        src="assets/img/users/user-02.jpg"
                        alt=""
                      />
                    </div>
                    <h5>EMP ID : POS002</h5>
                    <h4>Susan Lopez</h4>
                    <span>Curator</span>
                  </div>
                  <ul className="department">
                    <li>
                      Joined
                      <span>30 May 2023</span>
                    </li>
                    <li>
                      Department
                      <span>HR</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xxl-3 col-xl-4 col-lg-6 col-md-6">
                <div className="employee-grid-profile">
                  <div className="profile-head">
                    <label className="checkboxs">
                      <input type="checkbox" />
                      <span className="checkmarks" />
                    </label>
                    <div className="profile-head-action">
                      <span className="badge badge-linedanger text-center w-auto me-1">
                        Inactive
                      </span>
                      <div className="dropdown profile-action">
                        <Link
                          to="#"
                          className="action-icon dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <MoreVertical />{" "}
                        </Link>
                        <ul className="dropdown-menu">
                          <li>
                            <Link
                              to={route.editemployee}
                              className="dropdown-item"
                            >
                              <Edit className="info-img" />
                              Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item confirm-text mb-0"
                              // onClick={showConfirmationAlert}
                            >
                              <Trash2 className="info-img" />
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="profile-info">
                    <div className="profile-pic">
                      <ImageWithBasePath
                        src="assets/img/users/user-03.jpg"
                        alt=""
                      />
                    </div>
                    <h5>EMP ID : POS003</h5>
                    <h4>Robert Grossman</h4>
                    <span>System Administrator</span>
                  </div>
                  <ul className="department">
                    <li>
                      Joined
                      <span>14 Aug 2023</span>
                    </li>
                    <li>
                      Department
                      <span>Admin</span>
                    </li>
                  </ul>
                </div>
              </div> */}
              {/* <div className="col-xxl-3 col-xl-4 col-lg-6 col-md-6">
                <div className="employee-grid-profile">
                  <div className="profile-head">
                    <label className="checkboxs">
                      <input type="checkbox" />
                      <span className="checkmarks" />
                    </label>
                    <div className="profile-head-action">
                      <span className="badge badge-linesuccess text-center w-auto me-1">
                        Active
                      </span>
                      <div className="dropdown profile-action">
                        <Link
                          to="#"
                          className="action-icon dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <MoreVertical />
                        </Link>
                        <ul className="dropdown-menu">
                          <li>
                            <Link
                              to={route.editemployee}
                              className="dropdown-item"
                            >
                              <Edit className="info-img" />
                              Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item confirm-text mb-0"
                              onClick={showConfirmationAlert}
                            >
                              <Trash2 className="info-img" />
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="profile-info">
                    <div className="profile-pic active-profile">
                      <ImageWithBasePath
                        src="assets/img/users/user-06.jpg"
                        alt=""
                      />
                    </div>
                    <h5>EMP ID : POS004</h5>
                    <h4>Janet Hembre</h4>
                    <span>Administrative Officer</span>
                  </div>
                  <ul className="department">
                    <li>
                      Joined
                      <span>17 Jun 2023</span>
                    </li>
                    <li>
                      Department
                      <span>Admin</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xxl-3 col-xl-4 col-lg-6 col-md-6">
                <div className="employee-grid-profile">
                  <div className="profile-head">
                    <label className="checkboxs">
                      <input type="checkbox" />
                      <span className="checkmarks" />
                    </label>
                    <div className="profile-head-action">
                      <span className="badge badge-linesuccess text-center w-auto me-1">
                        Active
                      </span>
                      <div className="dropdown profile-action">
                        <Link
                          to="#"
                          className="action-icon dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <MoreVertical />
                        </Link>
                        <ul className="dropdown-menu">
                          <li>
                            <Link
                              to={route.editemployee}
                              className="dropdown-item"
                            >
                              <Edit className="info-img" />
                              Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item confirm-text mb-0"
                              onClick={showConfirmationAlert}
                            >
                              <Trash2 className="info-img" />
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="profile-info">
                    <div className="profile-pic active-profile">
                      <ImageWithBasePath
                        src="assets/img/users/user-04.jpg"
                        alt=""
                      />
                    </div>
                    <h5>EMP ID : POS005</h5>
                    <h4>Russell Belle</h4>
                    <span>Technician</span>
                  </div>
                  <ul className="department">
                    <li>
                      Joined
                      <span>16 Jan 2014</span>
                    </li>
                    <li>
                      Department
                      <span>Technical</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xxl-3 col-xl-4 col-lg-6 col-md-6">
                <div className="employee-grid-profile">
                  <div className="profile-head">
                    <label className="checkboxs">
                      <input type="checkbox" />
                      <span className="checkmarks" />
                    </label>
                    <div className="profile-head-action">
                      <span className="badge badge-linedanger text-center w-auto me-1">
                        Inactive
                      </span>
                      <div className="dropdown profile-action">
                        <Link
                          to="#"
                          className="action-icon dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <MoreVertical />
                        </Link>
                        <ul className="dropdown-menu">
                          <li>
                            <Link
                              to={route.editemployee}
                              className="dropdown-item"
                            >
                              <Edit className="info-img" />
                              Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item confirm-text mb-0"
                              onClick={showConfirmationAlert}
                            >
                              <Trash2 className="info-img" />
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="profile-info">
                    <div className="profile-pic">
                      <ImageWithBasePath
                        src="assets/img/users/user-05.jpg"
                        alt=""
                      />
                    </div>
                    <h5>EMP ID : POS006</h5>
                    <h4>Edward K. Muniz</h4>
                    <span>Office Support Secretary</span>
                  </div>
                  <ul className="department">
                    <li>
                      Joined
                      <span>07 Feb 2017</span>
                    </li>
                    <li>
                      Department
                      <span>Support</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xxl-3 col-xl-4 col-lg-6 col-md-6">
                <div className="employee-grid-profile">
                  <div className="profile-head">
                    <label className="checkboxs">
                      <input type="checkbox" />
                      <span className="checkmarks" />
                    </label>
                    <div className="profile-head-action">
                      <span className="badge badge-linesuccess text-center w-auto me-1">
                        Active
                      </span>
                      <div className="dropdown profile-action">
                        <Link
                          to="#"
                          className="action-icon dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <MoreVertical />
                        </Link>
                        <ul className="dropdown-menu">
                          <li>
                            <Link
                              to={route.editemployee}
                              className="dropdown-item"
                            >
                              <Edit className="info-img" />
                              Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item confirm-text mb-0"
                              onClick={showConfirmationAlert}
                            >
                              <Trash2 className="info-img" />
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="profile-info">
                    <div className="profile-pic active-profile">
                      <ImageWithBasePath
                        src="assets/img/users/user-07.jpg"
                        alt=""
                      />
                    </div>
                    <h5>EMP ID : POS007</h5>
                    <h4>Susan Moore</h4>
                    <span>Tech Lead</span>
                  </div>
                  <ul className="department">
                    <li>
                      Joined
                      <span>14 Mar 2023</span>
                    </li>
                    <li>
                      Department
                      <span>Engineering</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xxl-3 col-xl-4 col-lg-6 col-md-6">
                <div className="employee-grid-profile">
                  <div className="profile-head">
                    <label className="checkboxs">
                      <input type="checkbox" />
                      <span className="checkmarks" />
                    </label>
                    <div className="profile-head-action">
                      <span className="badge badge-linesuccess text-center w-auto me-1">
                        Active
                      </span>
                      <div className="dropdown profile-action">
                        <Link
                          to="#"
                          className="action-icon dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <MoreVertical />
                        </Link>
                        <ul className="dropdown-menu">
                          <li>
                            <Link
                              to={route.editemployee}
                              className="dropdown-item"
                            >
                              <Edit className="info-img" />
                              Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item confirm-text mb-0"
                              onClick={showConfirmationAlert}
                            >
                              <Trash2 className="info-img" />
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="profile-info">
                    <div className="profile-pic active-profile">
                      <ImageWithBasePath
                        src="assets/img/users/user-08.jpg"
                        alt=""
                      />
                    </div>
                    <h5>EMP ID : POS008</h5>
                    <h4>Lance Jackson</h4>
                    <span>Database administrator</span>
                  </div>
                  <ul className="department">
                    <li>
                      Joined
                      <span>23 July 2023</span>
                    </li>
                    <li>
                      Department
                      <span>Admin</span>
                    </li>
                  </ul>
                </div>
              </div> */}
            </div>
          </div>
          {/* <div className="container-fluid">
            <div className="row custom-pagination">
              <div className="col-md-12">
                <div className="paginations d-flex justify-content-end mb-3">
                  <span>
                    <i className="fas fa-chevron-left" />
                  </span>
                  <ul className="d-flex align-items-center page-wrap">
                    <li>
                      <Link to="#" className="active">
                        1
                      </Link>
                    </li>
                    <li>
                      <Link to="#">2</Link>
                    </li>
                    <li>
                      <Link to="#">3</Link>
                    </li>
                    <li>
                      <Link to="#">4</Link>
                    </li>
                  </ul>
                  <span>
                    <i className="fas fa-chevron-right" />
                  </span>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default EmployeesGrid;
