/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Table } from "reactstrap";
import { Button } from "../../../stories/Button";
import { CSVLink } from "react-csv";
import { getCurrentUser } from "../../../helpers/Utils";
import { useNavigate, Link } from "react-router-dom";
// import {
//     getDistrictData,
//     getStateData,
//     getFetchDistData
// } from '../../../redux/studentRegistration/actions';
import { ArrowRight } from "feather-icons-react/build/IconComponents";
import { useDispatch, useSelector } from "react-redux";
import Select from "./Select";
import axios from "axios";
// import '../reports.scss';
import { Doughnut } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
// import { categoryValue } from '../../Schools/constentText';
import { notification } from "antd";
import { encryptGlobal } from "../../../constants/encryptDecrypt";
import { stateList, districtList } from "../../../RegPage/ORGData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMale,
  faFemale,
  faChalkboardTeacher,
} from "@fortawesome/free-solid-svg-icons";
import ReactApexChart from "react-apexcharts";
import { openNotificationWithIcon } from "../../../helpers/Utils";

const InstitutionReport = () => {
  const navigate = useNavigate();
  const [district, setdistrict] = React.useState("");
  const currentUser = getCurrentUser("current_user");

  const [selectstate, setSelectState] = React.useState(""
  );
  useEffect(() => {
    setdistrict('');
  }, [selectstate]);
  const [category, setCategory] = useState("");
  const [isDownload, setIsDownload] = useState(false);
  const categoryData = ["All Categories", "ATL", "Non ATL"];
  const categoryDataTn = [
   "All Categories",
   "HSS",
    "HS",
    "Non ATL",
  ];
  const newstateList = ["All States", ...stateList];
  // const categoryData =
  //     categoryValue[process.env.REACT_APP_LOCAL_LANGUAGE_CODE];
 
  const [doughnutChartData, setDoughnutChartData] = useState(null);
  const [doughnutChartDataTN, setDoughnutChartDataTN] = useState(null);
  const [isCustomizationEnabled, setIsCustomizationEnabled] = useState(false);
  const csvLinkRef = useRef();
  const csvLinkRefTable = useRef();
  const dispatch = useDispatch();
  const [combinedArray, setCombinedArray] = useState([]);
  const [downloadTableData, setDownloadTableData] = useState([]);
  const [downloadTableData1, setDownloadTableData1] = useState([]);

  const [newFormat, setNewFormat] = useState("");
  const [atl, setAtl] = useState("");
  const [nonAtl, setNonAtl] = useState("");
  const [series1, setseries1] = useState([]);
  const [series2, setseries2] = useState([]);
  const [series3, setseries3] = useState([]);
  const [series4, setseries4] = useState([]);
  const [series5, setseries5] = useState([]);
  const [series6, setseries6] = useState([]);
  const [series7, setseries7] = useState([]);
  const [chartTableData, setChartTableData] = useState([]);
  const [chartTableData1, setChartTableData1] = useState([]);
  const [modifiedChartTableData, setModifiedChartTableData] = useState([]);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [registeredGenderChartData, setRegisteredGenderChartData] =
    useState(null);
  const [barChart1Data, setBarChart1Data] = useState({
    labels: [],
    datasets: [],
  });
  const [barChart3Data, setBarChart3Data] = useState({
    labels: [],
    datasets: [],
  });
  const [barChart2Data, setBarChart2Data] = useState({
    labels: [],
    datasets: [],
  });
  const fullStatesNames = newstateList;
  const allDistricts = {
    "All Districts": [...Object.values(districtList).flat()],
    ...districtList,
  };
  const fiterDistData = ["All Districts", ...(allDistricts[selectstate] || [])];
  // const fiterDistData = selectstate ? ["All Districts", ...(allDistricts[selectstate] || [])] : [];
  const [instType, setInstType] = useState([]);
  //   const [instTypeTNChartData, setInstTypeTNChartData] = useState(null);

  const [totalCount, setTotalCount] = useState([]);
  const [showCustomization, setShowCustomization] = useState(false);
  const [selectedHeaders, setSelectedHeaders] = useState([]);
  const [isReadyToDownload, setIsReadyToDownload] = useState(false);
  const [formattedDataForDownload, setFormattedDataForDownload] = useState([]);
  const [hasData, setHasData] = useState(false);
  // const registrationStatus = mentor_reg !== 0 ? "Completed" : "Not Started";
 
  const allHeaders = [
    { label: "UDISE Code", key: "organization_code" },
    { label: "School Name", key: "organization_name" },
    { label: "School Type/Category", key: "category" },
    { label: "State", key: "state" },
    { label: "District", key: "district" },
    { label: "City", key: "city" },
    { label: "Address", key: "address" },
    { label: "Pin Code", key: "pin_code" },
    { label: "Principal Name", key: "principal_name" },
    { label: "Principal Mobile", key: "principal_mobile" },
    { label: "Principal Email", key: "principal_email" },
    { label: "Registration Status", key: "registration_status" },
    { label: "No of Teachers Registered", key: "mentor_reg" },
  ];
  const headerMapping = {
    organization_code: "UDISE Code",
    organization_name: "School Name",
    category: "School Type/Category",
    state: "State",
    district: "District",
    city: "City",
    address: "Address",
    pin_code: "Pin Code",
    principal_name: "Principal Name",
    principal_mobile: "Principal Mobile",
    principal_email: "Principal Email",
    registration_status: "Registration Status",
    mentor_reg: "No of Teachers Registered",
  };
  
  const handleCheckboxChange = (key) => {
    setSelectedHeaders((prevHeaders) => {
      let updatedHeaders;
      if (prevHeaders.includes(key)) {
        updatedHeaders = prevHeaders.filter((header) => header !== key);
      } else {
        updatedHeaders = [...prevHeaders, key];
      }
      filterData(updatedHeaders);
      return updatedHeaders;
    });
  };
  
  
  const handleSelectAll = () => {
    setSelectedHeaders((prevHeaders) => {
      const updatedHeaders =
        prevHeaders.length === allHeaders.length ? [] : allHeaders.map((h) => h.key);
        filterData(updatedHeaders);
      return updatedHeaders;
    });
  };
  
 
  
 

  useEffect(() => {
    // fetchChartTableData();
    const newDate = new Date();
    const formattedDate = `${newDate.getUTCDate()}/${1 + newDate.getMonth()
      }/${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`;
    setNewFormat(formattedDate);
  }, []);
  const fetchChartTableData = () => {
    // const staParam = encryptGlobal(
    //   JSON.stringify({
    //     state: currentUser?.data[0]?.state_name,
    //   })
    // );
    const config = {
      method: "get",
      url:
        process.env.REACT_APP_API_BASE_URL_FOR_REPORTS +
        `/reports/schoolcategorylistreport`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.data[0]?.token}`,
      },
    };

    axios(config)
      .then((response) => {
        if (response.status === 200) {
          // console.log(response, "view");
          const chartTableData1 = response?.data?.data || [];
          setInstType(chartTableData1);

          setDownloadTableData1(chartTableData1);

          const lastRow = chartTableData1[chartTableData1.length - 1];
          const ATLCount = lastRow?.ATL_Count || 0;
          const NonATLCount = lastRow?.NonATL_Count || 0;
          const FullyAidedHighSchoolCount =
            lastRow.FullyAidedHighSchool_Count || 0;
          const FullyAidedHigherSecondarySchoolCount =
            lastRow.FullyAidedHigherSecondarySchool_Count || 0;
          const GovernmentHighSchoolCount =
            lastRow.GovernmentHighSchool_Count || 0;
          const GovernmentHigherSecondarySchoolCount =
            lastRow.GovernmentHigherSecondarySchool_Count || 0;
          const PartiallyAidedHighSchoolCount =
            lastRow.PartiallyAidedHighSchool_Count || 0;
          const PartiallyAidedHigherSecondarySchoolCount =
            lastRow.PartiallyAidedHigherSecondarySchool_Count || 0;
          setDoughnutChartData({
            labels: ["ATL", "Non-ATL"],
            datasets: [
              {
                data: [ATLCount, NonATLCount],
                backgroundColor: ["#8bcaf4", "#ff99af"],
                hoverBackgroundColor: ["#36A2EB", "#FF6384"],
              },
            ],
          });
          setDoughnutChartDataTN({
            labels: [
              "Fully Aided High Schools",
              "Fully Aided Higher Secondary Schools",
              "Government High Schools",
              "Government Higher Secondary Schools",
              "Partially Aided High Schools",
              "Partially Aided Higher Secondary Schools",
              "Non-ATL Schools"

            ],
            datasets: [
              {
                data: [
                  FullyAidedHighSchoolCount,
                  FullyAidedHigherSecondarySchoolCount,
                  GovernmentHighSchoolCount,
                  GovernmentHigherSecondarySchoolCount,
                  PartiallyAidedHighSchoolCount,
                  PartiallyAidedHigherSecondarySchoolCount,
                  NonATLCount
                ],
                backgroundColor: [
                  "#85e085",
                  "#ffcc80",
                  "#7FFFD4",
                  "#9932CC",
                  "#808080",
                  "#A0522D",
                  "#ff99af"
                ],
                hoverBackgroundColor: [
                  "#33cc33",
                  "#ffa31a",
                  "#00FFFF",
                  "#8B008B",
                  "Gray",
                  "#8B4513",
                  "#FF6384",
                ],
              },
            ],
          });
        }
        //   const maleCount = lastRow?.male_mentor_count || 0;
        //   const femaleCount = lastRow?.female_mentor_count || 0;
      })
      .catch((error) => {
        console.log("API error:", error);
      });
  };

  const handleDownload = () => {
    if (!selectstate || !district || !category) {
      notification.warning({
        message:
          "Select state, district, category to download report.",
      });
      return;
    }
    setIsDownload(true);
    // fetchData();
  };
  const filterData= (updatedHeaders)=>{
    const filteredData = modifiedChartTableData.map((item) => {
  // console.log(modifiedChartTableData,"mmmm");

      let filteredItem = {};
      updatedHeaders.forEach((key) => {
        if (item && Object.prototype.hasOwnProperty.call(item, key)) {  
          filteredItem[key] = item[key] ?? ""; 
        } else {
          console.warn(`Key "${key}" not found in item:`, item); 
        }
      });
    
      console.log("Filtered Item:", filteredItem); 
      return Object.keys(filteredItem).length > 0 ? filteredItem : null; 
    }).filter(Boolean); 
    console.log("Final Filtered Data for Download:", filteredData);
    setDownloadTableData(filteredData);
  };
  const fetchData = () => {
    const apiRes = encryptGlobal(
      JSON.stringify({
        state: selectstate,
        district: district,
        category: category,
      })
    );
    const config = {
      method: "get",
      url:
        process.env.REACT_APP_API_BASE_URL_FOR_REPORTS +
        `/reports/schoollistreport?Data=${apiRes}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.data[0]?.token}`,
      },
    };
    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          const chartTableData = response?.data?.data || [];

          const modifiedData = chartTableData.map((item) => ({
            ...item,
            registration_status: item.mentor_reg !== 0 ? "Registered" : "Not Registered",
          }));
          setModifiedChartTableData(modifiedData);
          if (response?.data?.count > 0) {
           
            setIsCustomizationEnabled(true);
            setHasData(true); 
           
          } else {
            openNotificationWithIcon("error", "No Data Found");
            setHasData(false); 
          }
          setIsDownload(false);
        }
      })
      .catch(function (error) {
        console.log(error);
        setIsDownload(false);
      });
  };
  
  useEffect(() => {
    console.log("Updated Download Table Data:", downloadTableData);
  }, [downloadTableData]); 
  

  useEffect(() => {
    if (isReadyToDownload && downloadTableData.length > 0) {
      console.log("Downloading CSV with data:", downloadTableData);
      const formattedCSVData = downloadTableData.map((item) =>
        Object.fromEntries(
          Object.entries(item).map(([key, value]) => [headerMapping[key] || key, value])
        )
      );
      setFormattedDataForDownload(formattedCSVData);
  // setDownloadTableData(formattedCSVData);

  setTimeout(() => {
        csvLinkRef.current.link.click();
        console.log("Downloading CSV with formatted headers:", formattedCSVData);
        openNotificationWithIcon("success", "Report Downloaded Successfully");
        setIsReadyToDownload(false); 
      }, 1000);
  
    }
  }, [isReadyToDownload, downloadTableData]);
 
 
  const enable = selectstate?.trim() !== "" && district?.trim() !== "" && category?.trim() !== "";

  

  return (
    <div className="page-wrapper">
       <h4 className="m-2" 
        style={{ position: 'sticky', top: '70px', zIndex: 1000, padding: '10px',backgroundColor: 'white', display: 'inline-block' , color: '#fe9f43',fontSize:"16px" }}
        >Reports
        </h4>
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              {/* <h4>Institutions /Organizations /Schools List</h4> */}
              <h4>1. School Registration Report</h4>
              <h6>List of overall Schools & its registration status</h6>
            </div>
          </div>
          <div className="page-btn">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/reports")}
            >
              <i className="fas fa-arrow-left"></i> Back
            </button>
          </div>
        </div>

        <Container className="RegReports userlist">
          <div className="reports-data mt-2 mb-2">
            <Row className="align-items-center mt-3 mb-2">
              <Col md={2}>
                <div className="my-2 d-md-block d-flex justify-content-center">
                  {/* <p>{selectstate}</p> */}
                  <Select
                    list={fullStatesNames}
                    setValue={setSelectState}
                    placeHolder={'Select State'}
                    value={selectstate}
                  />
                </div>
              </Col>
              <Col md={2}>
                <div className="my-2 d-md-block d-flex justify-content-center">
                  <Select
                    list={fiterDistData}
                    setValue={setdistrict}
                    placeHolder={"Select District"}
                    value={district}
                  />
                </div>
              </Col>
              <Col md={2}>
                <div className="my-2 d-md-block d-flex justify-content-center">
                  {selectstate === "Tamil Nadu" ? (
                    <Select
                      list={categoryDataTn}
                      setValue={setCategory}
                      placeHolder={"Select Category"}
                      value={category}
                    />
                  ) : (
                    <Select
                      list={categoryData}
                      setValue={setCategory}
                      placeHolder={"Select Category"}
                      value={category}
                    />
                  )}
                </div>
              </Col>
              <Col md={2}>
              <button
                   
                    onClick={() => {setShowCustomization(!showCustomization);
                      fetchData();
                      setSelectedHeaders([]);
                    }}
                  type="button"
                  disabled={!enable}
                  className="btn btn-primary"
                >
                  Customization
                </button>
              </Col>
             
             
              {showCustomization &&  hasData && (
  <div className="card mt-3" style={{ width: "50%", padding: "20px" }}>
    <div className="card-body">
      <h5 className="card-title">Select Columns</h5>

      <div className="form-check mb-2">
        <input
          type="checkbox"
          className="form-check-input"
          id="selectAll"
          checked={selectedHeaders.length === allHeaders.length}
          onChange={handleSelectAll}
        />
        <label className="form-check-label ms-2" htmlFor="selectAll">
          Select All
        </label>
      </div>

      <div className="row">
        {allHeaders.map((header) => (
          <div className="col-md-6" key={header.key}>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id={header.key}
                checked={selectedHeaders.includes(header.key)}
                onChange={() => handleCheckboxChange(header.key)}
              />
              <label className="form-check-label ms-2" htmlFor={header.key}>
                {header.label}
              </label>
            </div>
          </div>
        ))}
      </div>

      <button
        className="btn btn-danger mt-3"
       
        onClick={() => {
          setShowCustomization(false);
          if (!downloadTableData || downloadTableData.length === 0) {
            console.log("Fetching data before download...");
            filterData();
            // fetchData(); 

          }
      
          setTimeout(() => {
            console.log("Checking Data Before Download:", downloadTableData);
          
            setIsReadyToDownload(true);
          }, 1000);
        }}
        disabled={selectedHeaders.length === 0}
      >
        Download Report
      </button>
    </div>
  </div>
)}
 {downloadTableData && (
                  <CSVLink
                    data={formattedDataForDownload}
                    filename={`School_Registration_Status_Report_${newFormat}.csv`}
                    className="hidden"
                    ref={csvLinkRef}
                 
                  >
                    Download Table CSV
                  </CSVLink>
                )}
            </Row>

          </div>
        </Container>
      </div>
    </div>
  );
};

export default InstitutionReport;
