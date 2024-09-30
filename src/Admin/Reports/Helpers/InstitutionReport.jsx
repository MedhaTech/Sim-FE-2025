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
  const [category, setCategory] = useState("");
  const [isDownload, setIsDownload] = useState(false);
  const categoryData = ["All Categories", "ATL", "Non ATL"];
  const categoryDataTn = [
    "All Categories",
    "Fully Aided-High School",
    "Fully Aided-Higher Secondary School",
    "Government-High School",
    "Government-Higher Secondary School",
    "Partially Aided-High School",
    "Partially Aided-Higher Secondary School",
    "Non ATL",
  ];
  const newstateList = ["All States", ...stateList];
  // const categoryData =
  //     categoryValue[process.env.REACT_APP_LOCAL_LANGUAGE_CODE];
  const [mentorDetailedReportsData, setmentorDetailedReportsData] = useState(
    []
  );
  const [doughnutChartData, setDoughnutChartData] = useState(null);
  const [doughnutChartDataTN, setDoughnutChartDataTN] = useState(null);

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

  const tableHeaders = [
    {
      label: "District",
      key: "district",
    },
    {
      label: "ATL Schools",
      key: "ATL_Count",
    },
    {
      label: "Non-ATL Schools",
      key: "NonATL_Count",
    },
  ];
  const tableHeadersState = [
    {
      label: "District",
      key: "district",
    },
    {
      label: "FullyAidedHighSchool",
      key: "FullyAidedHighSchool_Count",
    },
    {
      label: "Fully Aided Higher Secondary Schools",
      key: "FullyAidedHigherSecondarySchool_Count",
    },
    {
      label: "Government High Schools",
      key: "GovernmentHighSchool_Count",
    },

    {
      label: "Government Higher Secondary Schools",
      key: "GovernmentHigherSecondarySchool_Count",
    },
    {
      label: "Partially Aided High Schools",
      key: "PartiallyAidedHighSchool_Count",
    },
    {
      label: "Partially Aided Higher Secondary Schools",
      key: "PartiallyAidedHigherSecondarySchool_Count",
    },
    {
      label: "Non-ATL Schools",
      key: "NonATL_Count",
    },
  ];
  // const registrationStatus = mentor_reg !== 0 ? "Completed" : "Not Started";
  const summaryHeaders = [
    {
      label: "UDISE Code",
      key: "organization_code",
    },
    // {
    //     label: 'ATL CODE',
    //     key: 'organization_code'
    // },
    
    {
      label: "School Name",
      key: "organization_name",
    },
    {
      label: "School Type/Category",
      key: "category",
    },
    {
      label: "State",
      key: "state",
    },
    {
      label: "District",
      key: "district",
    },
    {
      label: "City",
      key: "city",
    },
    {
      label: "Address",
      key: "address",
    },
    {
      label: "Pincode",
      key: "pin_code",
    },
    {
      label: "Principal Name",
      key: "principal_name",
    },
    {
      label: "Principal Mobile",
      key: "principal_mobile",
    },
    {
      label: "Principal Email",
      key: "principal_email",
    },
    {
      label: "Registration status",
      key: "registration_status",
      // render: () => <span>{registrationStatus}</span>,
    },
    {
      label: "No of teachers registered",
      key: "mentor_reg",
    },
  ];
  const chartOptions = {
    maintainAspectRatio: false,
    legend: {
      position: "bottom",
      labels: {
        fontColor: "black",
      },
    },
    plugins: {
      legend: {
        labels: {
          generateLabels: function (chart) {
            return chart.data.labels.map(function (label, i) {
              const value = chart.data.datasets[0].data[i];
              const backgroundColor = chart.data.datasets[0].backgroundColor[i];
              return {
                text: label + ": " + value,
                fillStyle: backgroundColor,
              };
            });
          },
        },
      },
    },
  };
  const chartOptionState = {
    maintainAspectRatio: false,
    legend: {
      position: "bottom",
      labels: {
        fontColor: "black",
      },
    },
    plugins: {
      legend: {
        labels: {
          generateLabels: function (chart) {
            return chart.data.labels.map(function (label, i) {
              const value = chart.data.datasets[0].data[i];
              const backgroundColor = chart.data.datasets[0].backgroundColor[i];
              return {
                text: label + ": " + value,
                fillStyle: backgroundColor,
              };
            });
          },
        },
      },
    },
  };
  useEffect(() => {
    fetchChartTableData();
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
        process.env.REACT_APP_API_BASE_URL +
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
          "Please select a district, category type before Downloading Reports.",
      });
      return;
    }
    setIsDownload(true);
    fetchData();
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
        process.env.REACT_APP_API_BASE_URL +
        `/reports/schoollistreport?Data=${apiRes}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.data[0]?.token}`,
      },
    };
    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          // console.log(response,"22");
          const chartTableData = response?.data?.data[0].rows || [];
          const modifiedChartTableData = chartTableData.map((item) => ({
            ...item,
            registration_status: item.mentor_reg !== 0 ? "Registered" : "Not Registered",
          }));
          
          // Set the modified data for download
          setDownloadTableData(modifiedChartTableData);
          setChartTableData(modifiedChartTableData);

          setDownloadTableData(modifiedChartTableData);

          if (response?.data?.data[0].count > 0) {
            openNotificationWithIcon(
              "success",
              " Report Downloaded Successfully"
            );
          } else {
            openNotificationWithIcon("error", "No Data Found");
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
    if (chartTableData.length > 0) {
      setDownloadTableData(chartTableData);
      console.log("Performing operation with the updated data.");
      csvLinkRef.current.link.click();
    }
  }, [chartTableData]);

  return (
    <div className="page-wrapper">
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
              <Col md={3}>
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
              <Col md={3}>
                <div className="my-2 d-md-block d-flex justify-content-center">
                  <Select
                    list={fiterDistData}
                    setValue={setdistrict}
                    placeHolder={"Select District"}
                    value={district}
                  />
                </div>
              </Col>
              <Col md={3}>
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
              <Col
                md={3}
                className="d-flex align-items-center justify-content-center"
              >
                <button
                  onClick={handleDownload}
                  type="button"
                  disabled={isDownload}
                  className="btn btn-primary"
                >
                  {isDownload ? "Downloading" : "Download Report"}
                </button>

                {downloadTableData && (
                  <CSVLink
                    data={downloadTableData}
                    headers={summaryHeaders}
                    filename={`School_Registration_Status_Report_${newFormat}.csv`}
                    className="hidden"
                    ref={csvLinkRef}
                  // onDownloaded={() => {
                  //     setIsDownload(false);
                  //     setDownloadComplete(true);
                  // }}
                  >
                    Download Table CSV
                  </CSVLink>
                )}
              </Col>
            </Row>
          
          </div>
        </Container>
      </div>
    </div>
  );
};

export default InstitutionReport;
