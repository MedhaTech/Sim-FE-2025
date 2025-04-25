/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Table } from "reactstrap";
import { Button } from "../../stories/Button";
import { CSVLink } from "react-csv";
import { openNotificationWithIcon, getCurrentUser } from "../../helpers/Utils";
// import {
//     getDistrictData,
//     getStateData,
//     getFetchDistData
// } from '../../../redux/studentRegistration/actions';
import { ArrowRight } from "feather-icons-react/build/IconComponents";
import { useDispatch, useSelector } from "react-redux";
import Select from "./Select";
import { Chart } from "primereact/chart";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./reports.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement // Register ArcElement
);
import { Doughnut } from "react-chartjs-2";
import { notification } from "antd";
import { encryptGlobal } from "../../constants/encryptDecrypt";
import { stateList, districtList } from "../../RegPage/ORGData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMale, faFemale, faSchool } from "@fortawesome/free-solid-svg-icons";
import ReactApexChart from "react-apexcharts";

// import { categoryValue } from '../../Schools/constentText';

const ReportsRegistration = () => {
  const [RegTeachersdistrict, setRegTeachersdistrict] = React.useState("");
  // const [RegTeachersState, setRegTeachersState] = React.useState('');
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState("");
  const [category, setCategory] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filteresData, setFilteresData] = useState([]);

  const filterOptions = ["Registered", "Not Registered"];
  const categoryData = ["All Categories", "ATL", "Non ATL"];
  const categoryDataTn = [
   "All Categories",
   "HSS",
    "HS",
    "Non ATL",
  ];

  const newstateList = ["All States", ...stateList];

  const [downloadData, setDownloadData] = useState(null);
  const [downloadNotRegisteredData, setDownloadNotRegisteredData] =
    useState(null);
  const [chartTableData, setChartTableData] = useState([]);
  const csvLinkRefTable = useRef();
  const csvLinkRef = useRef();
  const csvLinkRefNotRegistered = useRef();
  const dispatch = useDispatch();
  const currentUser = getCurrentUser("current_user");
  const [registeredGenderChartData, setRegisteredGenderChartData] =
    useState(null);
  const [registeredChartData, setRegisteredChartData] = useState(null);
  const [registeredChartDataState, setRegisteredChartDataState] =
    useState(null);
    const [isloader, setIsloader] = useState(false);

  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [newFormat, setNewFormat] = useState("");
  const [series1, setseries1] = useState([]);
  const [series2, setseries2] = useState([]);
  const [barChart1Data, setBarChart1Data] = useState({
    labels: [],
    datasets: [],
  });
  const [RegTeachersState, setRegTeachersState] = React.useState(
    currentUser?.data[0]?.state_name
  );
  // const fullStatesNames = useSelector(
  //     (state) => newstateList
  // );
  const fullStatesNames = newstateList;
  const allDistricts = {
    "All Districts": [...Object.values(districtList).flat()],
    ...districtList,
  };
  // const fiterDistData = allDistricts[RegTeachersState];
  const fiterDistData = [
    "All Districts",
    ...(allDistricts[RegTeachersState] || []),
  ];

  const [downloadTableData, setDownloadTableData] = useState(null);
  const summaryHeaders = [
   
    {
      label: "District Name",
      key: "district",
    },
    // {
    //   label: "Registered Schools",
    //   key: "Eligible_school",
    // },
    {
      label: "Registered Schools",
      key: "reg_school",
    },

    {
      label: "ATL Teachers",
      key: "ATL_Count",
    },
    {
      label: "Non-ATL Teachers",
      key: "NonATL_Count",
    },
    {
      label: 'Total Teachers',
      key: "allTeachers",
    },
    // {
    //     label: 'Total Teachers',
    //     key: 'allTeachers'
    // },
    {
      label: "Registered Male Teachers",
      key: "Male",
    },
    {
      label: "Registered Female Teachers",
      key: "Female",
    },
    {
      label: "Registered Others Teachers",
      key: "others",
    },
  ];
  const summaryHeadersState = [
    {
      label: "District Name",
      key: "district",
    },
    {
      label: "Registered Schools",
      key: "reg_school",
    },
    // {
    //   label: "Registered Schools",
    //   key: "reg_school",
    // },
    {
      label: 'Total Teachers',
      key: "allTeachers",
    },
    {
      label: "Registered Male Teachers",
      key: "Male",
    },
    {
      label: " Registered Female Teachers",
      key: "Female",
    },
    {
      label: "Registered Others Teachers",
      key: "others",
    },
    // {
    //   label: "FullyAidedHighSchool",
    //   key: "FullyAidedHighSchool_Count",
    // },
    // {
    //   label: "Fully Aided Higher Secondary Schools",
    //   key: "FullyAidedHigherSecondarySchool_Count",
    // },
    // {
    //   label: "Government High Schools",
    //   key: "GovernmentHighSchool_Count",
    // },

    // {
    //   label: "Government Higher Secondary Schools",
    //   key: "GovernmentHigherSecondarySchool_Count",
    // },
    {
      label: "HSS",
      key: "HSS_Count",
    },
    {
      label: "HS",
      key: "HS_Count",
    },
    {
      label: "Non-ATL Schools",
      key: "NonATL_Count",
    },

  ];
  const RegHeaders = [
    {
      label: "UDISE Code",
      key: "organization.organization_code",
    },
    // {
    //   label: "ATL Code",
    //   key: "organization.unique_code",
    // },
    {
      label: "School Name",
      key: "organization.organization_name",
    },
    {
      label: "School Category",
      key: "organization.category",
    },
    {
      label: "State",
      key: "organization.state",
    },
    {
      label: "District",
      key: "organization.district",
    },
    {
      label: "City",
      key: "organization.city",
    },
    {
      label: "Pin code",
      key: "organization.pin_code",
    },
    {
      label: 'Mandal / Taluka',
      key: "organization.mandal",
    }, {
      label: 'School Type',
      key: "organization.school_type",
    }, {
      label: 'School Board',
      key: "organization.board",
    },
    {
      label: "Address",
      key: "organization.address",
    },
    {
      label: "HM Name",
      key: "organization.principal_name",
    },
    {
      label: "HM Contact",
      key: "organization.principal_mobile",
    },
    {
      label: "Teacher Name",
      key: "full_name",
    },
    {
      label: " Teacher Email Id",
      key: "user.username",
    },
    {
      label: "Teacher Gender",
      key: "gender",
    },
    {
      label: "Teacher Contact",
      key: "mobile",
    },
    {
      label: "Teacher WhatsApp Contact",
      key: "whatapp_mobile",
    },
  ];
  const notRegHeaders = [
    {
      label: "UDISE Code",
      key: "organization_code",
    },
    // {
    //   label: "ATL Code",
    //   key: "unique_code",
    // },
    {
      label: "School Name",
      key: "organization_name",
    },
    {
      label: "School Category",
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
      label: "Pin code",
      key: "pin_code",
    },
    {
      label: 'Mandal / Taluka',
      key: "mandal",
    }, {
      label: 'School Type',
      key: "school_type",
    }, {
      label: 'School Board',
      key: "board",
    },
    {
      label: "Address",
      key: "address",
    },
    {
      label: "Country",
      key: "country",
    },
    {
      label: "HM Name",
      key: "principal_name",
    },
    {
      label: "HM Contact",
      key: "principal_mobile",
    },
    {
      label: "HM Email",
      key: "principal_email",
    },
  ];
  // useEffect(() => {
  //     dispatch(getStateData());
  // }, []);
  useEffect(() => {
    // if (RegTeachersState !== '') {
    //     (RegTeachersState);
    // }
    // setRegTeachersdistrict('');
    fetchChartTableData();
  }, []);

  // useEffect(() => {
  //     // dispatch(getDistrictData());
  //     fetchChartTableData();
  // }, []);
  // var sColStacked = {
  //   chart: {
  //     height: 500,
  //     type: "bar",
  //     stacked: true,
  //     toolbar: {
  //       show: false,
  //     },
  //   },
  //   colors: ["rgb(255, 69, 96)", "rgb(254, 176, 25)", "rgb(0, 227, 150)"],

  //   plotOptions: {
  //     bar: {
  //       horizontal: false,
  //     },
  //   },
  //   series: [
  //     {
  //       name: "#Not started",
  //       data: series3,
  //     },
  //     {
  //       name: "#InProgress",
  //       data: series4,
  //     },
  //     {
  //       name: "#Completed",
  //       data: series5,
  //     },
  //   ],
  //   xaxis: {
  //     categories: barChart2Data.labels,
  //     ticks: {
  //       maxRotation: 80,
  //       autoSkip: false,
  //     },
  //   },
  //   yaxis: {
  //     beginAtZero: true,
  //     ticks: {
  //       stepSize: 20,
  //     },
  //     labels: {
  //       formatter: (val) => {
  //         return val / 1;
  //       },
  //     },
  //   },

  //   legend: {
  //     position: "top",
  //     horizontalAlign: "center",
  //   },
  //   fill: {
  //     opacity: 1,
  //   },
  // };
  const chartOption = {
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
  // const options = {
  //     maintainAspectRatio: false,
  //     responsive: true,
  //     scales: {
  //         y: {
  //             beginAtZero: true,
  //             ticks: {
  //                 stepSize: 10
  //             },
  //             title: {
  //                 display: true,
  //                 text: 'Number of Registered ATL and Non ATL Schools',
  //                 color: 'blue'
  //             }
  //         },
  //         x: {
  //             grid: {
  //                 display: true,
  //                 drawBorder: true,
  //                 color: 'rgba(0, 0, 0, 0.2)',
  //                 lineWidth: 0.5
  //             },
  //             title: {
  //                 display: true,
  //                 text: 'States',
  //                 color: 'blue'
  //             },
  //             ticks: {
  //                 maxRotation: 80,
  //                 autoSkip: false
  //                 //maxTicksLimit: 10,
  //             }
  //         }
  //     }
  // };

  var options = {
    chart: {
      height: 700,
      width:1000,
      type: "bar",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: ["#4361ee", "#888ea8"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    // title: {
    //   text: "",
    //   align: "left",
    // },
    series: [
      {
        name: "Registered Schools",
        data: series1,
      },
      // {
      //   name: "Registered Non-ATL",
      //   data: series2,
      // },
    ],
    yaxis: {
      beginAtZero: true,
      ticks: {
        stepSize: 10,
      },
      labels: {
        formatter: (val) => {
          return val / 1;
        },
      },
    },

    xaxis: {
      categories: barChart1Data.labels,
      labels: {
        style: {
          fontSize: "8px",
        },
        formatter: (val) => {
          // Shorten long labels or wrap them by breaking lines
          if (val.length > 15) return val.substring(0, 15) + "..."; // Adjust as necessary
          return val;
        },
      },
      ticks: {
        maxRotation: 80,
        minRotation: 45,
        autoSkip: false,
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
    },
    // tooltip: {
    //   x: {
    //     format: "dd/MM/yy HH:mm",
    //   },
    // },
  };

  const fetchData = (item) => {
    const param = encryptGlobal(
      JSON.stringify({
        state: RegTeachersState,
        status: "ACTIVE",
        district: RegTeachersdistrict,
        category: category,
      })
    );

    const params = encryptGlobal(
      JSON.stringify({
        state: RegTeachersState,
        district: RegTeachersdistrict,
        status: "ACTIVE",
        category: category,
      })
    );
    const url =
      item === "Registered"
        ? `/reports/mentorRegList?Data=${param}`
        : item === "Not Registered"
          ? `/reports/notRegistered?Data=${params}`
          : "";

    const config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL_FOR_REPORTS + url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.data[0]?.token}`,
      },
    };

    axios(config)
      .then((response) => {
        if (response.status === 200) {
          // let data = response?.data?.data || [];
          if (item === "Registered") {
            setFilteredData(response?.data?.data || []);
            setDownloadData(response?.data?.data || []);
            if (response?.data.count > 0) {
              openNotificationWithIcon(
                "success",
                `${filterType} Report Downloaded Successfully`
              );
            } else {
              openNotificationWithIcon("error", "No Data Found");
            }
          } else if (item === "Not Registered") {
            setFilteresData(response?.data?.data || []);
            setDownloadNotRegisteredData(response?.data?.data || []);
            if (response?.data.count > 0) {
              openNotificationWithIcon(
                "success",
                `${filterType} Report Downloaded Successfully`
              );
            } else {
              openNotificationWithIcon("error", "No Data Found");
            }
          }

          setIsDownloading(false);
        }
      })
      .catch((error) => {
        console.log("API error:", error);
        setIsDownloading(false);
      });
  };
  // useEffect(() => {
  //     if (studentDetailedReportsData.length > 0) {
  //       console.log("Performing operation with the updated data.");
  //       csvLinkRef.current.link.click();

  //     }
  //   }, [studentDetailedReportsData]);
  const handleDownload = () => {
    if (!RegTeachersState || !RegTeachersdistrict || !filterType || !category) {
      notification.warning({
        message:
          "Please select a district, category and filter type before Downloading Reports.",
      });
      return;
    }
    setIsDownloading(true);
    fetchData(filterType);
  };

  useEffect(() => {
    if (filteredData.length > 0) {
      setDownloadData(filteredData);
      csvLinkRef.current.link.click();

      console.log("Performing operation with the updated data.");
    }
    if (filteresData.length > 0) {
      setDownloadNotRegisteredData(filteresData);
      csvLinkRefNotRegistered.current.link.click();
      console.log("Performing operation with the updated data.");
    }
  }, [filteredData, filteresData]);
  useEffect(() => {
    if (downloadComplete) {
      setDownloadComplete(false);
      setRegTeachersState("");

      setRegTeachersdistrict("");

      setFilterType("");
    }
    const newDate = new Date();
    const formattedDate = `${newDate.getUTCDate()}/${1 + newDate.getMonth()
      }/${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`;
    setNewFormat(formattedDate);
  }, [downloadComplete]);

  const fetchChartTableData = () => {
    const tabParam = encryptGlobal(
      JSON.stringify({
        state: currentUser?.data[0]?.state_name,
      })
    );
    const config = {
      method: "get",
      url:
        process.env.REACT_APP_API_BASE_URL_FOR_REPORTS +
        `/reports/mentorsummary?Data=${tabParam}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.data[0]?.token}`,
      },
    };

    axios(config)
      .then((response) => {
        if (response.status === 200) {
          setIsloader(true);
          const chartTableData = response?.data?.data || [];

          setChartTableData(chartTableData);
          const updatedData = chartTableData.map((item) => ({
            ...item,
            allTeachers: item.Male + item.Female + item.others, // Calculate total teachers
          }));
          setDownloadTableData(updatedData);
          // console.log(downloadTableData,"all");

          const lastRow = chartTableData[chartTableData.length - 1];

          const maleCount = lastRow.Male || 0;
          const othersCount = lastRow.others || 0;

          const femaleCount = lastRow.Female || 0;
          const regCount = lastRow.
          reg_school
           || 0;

          const ATLregCount = lastRow.ATL_Count || 0;
          const NONATLregNotCount = lastRow.NonATL_Count || 0;
          // console.log(NONATLregNotCount,"11");
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
          // const allTeachers=( lastRow.Female +lastRow.others+lastRow.Male);
          setRegisteredGenderChartData({
            labels: ["Male Teachers", "Female Teachers", "Others"],
            datasets: [
              {
                data: [maleCount, femaleCount, othersCount],
                backgroundColor: ["#8bcaf4", "#ff99af", "rgb(255, 206, 122)"],
                hoverBackgroundColor: [
                  "#36A2EB",
                  "#FF6384",
                  "rgb(254, 176, 25)",
                ],
              },
            ],
          });

          setRegisteredChartDataState({
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
                  NONATLregNotCount
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
          setRegisteredChartData({
            labels: ["ATL Teachers Registered", "NON ATL Teachers Registered"],
            datasets: [
              {
                data: [ATLregCount, NONATLregNotCount],
                backgroundColor: ["#85e085", "#ffcc80"],
                hoverBackgroundColor: ["#33cc33", "#ffa31a"],
              },
            ],
          });
          const GraphfilteredData = chartTableData.filter(
            (item) => item.district !== "Total"
          );
          const barData = {
            labels: GraphfilteredData.map((item) => item.district),
            datasets: [
              {
                label: "Registered Schools",
                data: GraphfilteredData.map((item) => item.reg_school),
                backgroundColor: "#47d147",
              },
              // {
              //   label: "Registered Non ATL Schools",
              //   data: GraphfilteredData.map((item) => item.NonATL_Count),
              //   backgroundColor: "#ffa31a",
              // },
            ],
          };
          setBarChart1Data(barData);

          setseries1(barData.datasets[0].data);
          // setseries2(barData.datasets[1].data);
        }
      })
      .catch((error) => {
        console.log("API error:", error);
      });
  };
console.log(barChart1Data,"bar");
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
            <h4>Teacher Registration Report</h4>
            <h6>List of Teachers registered and their details</h6>
            </div>
          </div>
          {/* <div className="page-btn">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate("/reports")}
                        >
                            <i className="fas fa-arrow-left"></i> Back
                        </button>
                    </div> */}
        </div>
        <Container className="RegReports userlist">
          <div className="reports-data mt-2 mb-2">
            <Row className="align-items-center mt-3 mb-2">
              <Col md={2}>
                <div className="my-2 d-md-block d-flex justify-content-center">
                  <p>{RegTeachersState}</p>
                  {/* <Select
                                            list={fullStatesNames}
                                            setValue={setRegTeachersState}
                                            placeHolder={'Select State'}
                                            value={RegTeachersState}
                                        /> */}
                </div>
              </Col>
              <Col md={2}>
                <div className="my-2 d-md-block d-flex justify-content-center">
                  <Select
                    list={fiterDistData}
                    setValue={setRegTeachersdistrict}
                    placeHolder={"Select District"}
                    value={RegTeachersdistrict}
                  />
                </div>
              </Col>
              <Col md={2}>
                <div className="my-2 d-md-block d-flex justify-content-center">
                  <Select
                    list={filterOptions}
                    setValue={setFilterType}
                    placeHolder={"Select Filter"}
                    value={filterType}
                  />
                </div>
              </Col>
              <Col md={2}>
                <div className="my-2 d-md-block d-flex justify-content-center">
                  {RegTeachersState === "Tamil Nadu" ? (
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
                md={2}
                className="d-flex align-items-center justify-content-center"
              >
                <button
                  onClick={handleDownload}
                  type="button"
                  disabled={isDownloading}
                  className="btn btn-primary"
                >
                  {isDownloading ? "Downloading" : "Download Report"}
                </button>
              </Col>
            </Row>
            {isloader ?
            <div className="chart mt-2 mb-2">
              <div className="row">
              {chartTableData.length > 0 && (
                <>
                  <div className="col-sm-12 col-md-12 col-xl-12 d-flex">
                    <div className="card flex-fill default-cover w-100 mb-4">
                      <div className="card-header d-flex justify-content-between align-items-center">
                        <h4 className="card-title mb-0">
                          District wise Teacher Registration Stats
                        </h4>
                        <div className="dropdown">
                          <Link
                            to="#"
                            className="view-all d-flex align-items-center"
                          >
                            <button
                              className="btn mx-2 btn-primary btn-sm"
                              type="button"
                              onClick={() => {
                                if (downloadTableData) {
                                  setDownloadTableData(null);
                                  csvLinkRefTable.current.link.click();
                                }
                              }}
                            >
                              Get Statistics
                            </button>
                          </Link>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table table-border recent-transactions">
                            <thead>
                              <tr>
                                <th style={{ color: "#36A2EB" ,fontWeight: "bold", }}>#No</th>
                                <th style={{ color: "#36A2EB",fontWeight: "bold" }}>District Name</th>
                                <th style={{ whiteSpace: "wrap", color: "#36A2EB",fontWeight: "bold" }}>
                                  Registered Schools{" "}
                                  <FontAwesomeIcon icon={faSchool} />
                                </th>
                                {/* <th style={{ whiteSpace: "wrap", color: "#36A2EB",fontWeight: "bold" }}>
                                  Registered ATL Schools
                                </th> */}
                                {RegTeachersState !== "Tamil Nadu" && (
                                  <>
                                    <th style={{ whiteSpace: "wrap", color: "#36A2EB",fontWeight: "bold" }}>
                                      #ATL Teachers
                                    </th>
                                    <th style={{ whiteSpace: "wrap", color: "#36A2EB", fontWeight: "bold"}}>
                                      #Non-ATL Teachers
                                    </th>
                                  </>
                                )}
                                <th style={{ whiteSpace: "wrap", color: "#36A2EB",fontWeight: "bold" }}>
                                  #Total Teachers
                                </th>
                                <th style={{ whiteSpace: "wrap", color: "#36A2EB",fontWeight: "bold" }}>
                                  <FontAwesomeIcon icon={faMale} />
                                  #Male
                                </th>
                                <th style={{ whiteSpace: "wrap", color: "#36A2EB",fontWeight: "bold" }}>
                                  <FontAwesomeIcon icon={faFemale} />
                                  #Female
                                </th>
                                <th style={{ whiteSpace: "wrap", color: "#36A2EB",fontWeight: "bold" }}>
                                  <FontAwesomeIcon icon={faFemale} />
                                  #Others
                                </th>
                                {RegTeachersState === "Tamil Nadu" && (
                                  <>
                                    {/* <th style={{ whiteSpace: "wrap", color: "#36A2EB",fontWeight: "bold" }}>
                                      #Fully Aided High Schools
                                    </th>
                                    <th style={{ whiteSpace: "wrap", color: "#36A2EB",fontWeight: "bold" }}>
                                      #Fully Aided-Higher Secondary Schools
                                    </th>
                                    <th style={{ whiteSpace: "wrap", color: "#36A2EB",fontWeight: "bold" }}>
                                      #Government High Schools
                                    </th>
                                    <th style={{ whiteSpace: "wrap", color: "#36A2EB",fontWeight: "bold" }}>
                                      #Government-Higher Secondary Schools
                                    </th> */}
                                    <th style={{ whiteSpace: "wrap", color: "#36A2EB",fontWeight: "bold" }}>
                                      #HSS
                                    </th>
                                    <th style={{ whiteSpace: "wrap", color: "#36A2EB",fontWeight: "bold" }}>
                                      #HS

                                    </th>
                                    <th style={{ whiteSpace: "wrap", color: "#36A2EB",fontWeight: "bold" }}>
                                      #Non-ATL Schools
                                    </th>
                                  </>
                                )}
                              </tr>
                            </thead>
                            <tbody>
                              {chartTableData.map((item, index) => (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td
                                    style={{
                                      maxWidth: "150px",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      color: "crimson"
                                    }}
                                  >
                                    {item.district}
                                  </td>
                                  <td>{item.reg_school}</td>
                                  {/* <td>{item.reg_school}</td> */}
                                  {/* <td>{item.ATL_Count}</td> */}
                                  {/* <td>{item.NonATL_Count}</td> */}
                                  {RegTeachersState !== "Tamil Nadu" && (
                                    <>
                                      {" "}
                                      <td>{item.ATL_Count}</td>
                                      <td>{item.NonATL_Count}</td>
                                    </>
                                  )}
                                  <td>
                                    {item.Male + item.Female + item.others}
                                  </td>
                                  <td>{item.Male}</td>
                                  <td>{item.Female}</td>
                                  <td>{item.others}</td>
                                  {RegTeachersState === "Tamil Nadu" && (
                                    <>
                                      {/* <td>{item.FullyAidedHighSchool_Count}</td>
                                      <td>
                                        {
                                          item.FullyAidedHigherSecondarySchool_Count
                                        }
                                      </td>
                                      <td>{item.GovernmentHighSchool_Count}</td>
                                      <td>
                                        {
                                          item.GovernmentHigherSecondarySchool_Count
                                        }
                                      </td> */}
                                      <td>
                                        {item.HSS_Count}
                                      </td>
                                      <td>
                                        {
                                          item.HS_Count
                                        }
                                      </td>
                                      <td>{item.NonATL_Count ? item.NonATL_Count : 0}</td>
                                    </>
                                  )}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-12 col-xl-3 d-flex">
                    <div className="card flex-fill default-cover w-100 mb-4">
                        <div className="card-header d-flex justify-content-between align-items-center">
                          <h4 className="card-title">Gender Analytics</h4>
                        </div> 
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-12 text-center mt-3">
                              <p>
                                <b>
                                  Overall Registered Female vs Male vs Others
                                  Teachers As of {newFormat}
                                </b>
                              </p>
                            </div>
                          <div className="col-md-12 doughnut-chart-container">
                            {registeredGenderChartData && (
                              <Doughnut
                                data={registeredGenderChartData}
                                options={chartOptions}
                              />
                            )}
                            </div>
                            </div>
                          </div>
                        </div>
                  </div>
                </>
              )}
                <div className="col-sm-12 col-md-12 col-xl-9 d-flex">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title">
                        Registered Schools As of{" "}
                        {newFormat}
                      </h5>
                    </div>
                    <div className="card-body">
                      <div  id="s-col-stacked" />
                      <ReactApexChart
                        options={options}
                        series={options.series}
                         type="bar"
                        height={400}
                      />
                    </div>
                  </div>
                </div>
                </div>
              {/* <div className="mt-5">
                                    <div
                                        className="col-md-12 chart-container mt-5"
                                        style={{
                                            width: '100%',
                                            height: '370px'
                                        }}
                                    >
                                        <div className="chart-box">
                                            <Chart
                                                type="bar"
                                                data={barChart1Data}
                                                options={options}
                                                style={{ height: "300px" }}
                                            />
                                            <div className="chart-title">
                                                <p>
                                                    <b>
                                                        Registered ATL Schools
                                                        v/s Registered Non ATL
                                                        Schools {newFormat}
                                                    </b>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
             
            </div>
              :
              <div className="spinner-border text-info" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          }
            {downloadTableData &&
                (RegTeachersState !== "Tamil Nadu" ? (
                  <CSVLink
                    data={downloadTableData}
                    headers={summaryHeaders}
                    filename={`TeacherRegistrationSummaryTable_${newFormat}.csv`}
                    className="hidden"
                    ref={csvLinkRefTable}
                  >
                    Download Table CSV
                  </CSVLink>
                ) : (
                  <CSVLink
                    data={downloadTableData}
                    headers={summaryHeadersState}
                    filename={`TeacherRegistrationSummaryTable_${newFormat}.csv`}
                    className="hidden"
                    ref={csvLinkRefTable}
                  >
                    Download Table CSV
                  </CSVLink>
                ))}


              {downloadData && (
                <CSVLink
                  data={downloadData}
                  headers={RegHeaders}
                  filename={`Teacher_${filterType}Report_${newFormat}.csv`}
                  className="hidden"
                  ref={csvLinkRef}
                // onDownloaded={() => {
                //     setIsDownloading(false);
                //     setDownloadComplete(true);
                // }}
                >
                  Download CSV
                </CSVLink>
              )}
              {downloadNotRegisteredData && (
                <CSVLink
                  data={downloadNotRegisteredData}
                  headers={notRegHeaders}
                  filename={`Teacher_${filterType}Report_${newFormat}.csv`}
                  className="hidden"
                  ref={csvLinkRefNotRegistered}
                // onDownloaded={() => {
                //     setIsDownloading(false);
                //     setDownloadComplete(true);
                // }}
                >
                  Download Not Registered CSV
                </CSVLink>
              )}
          </div>
        </Container>
      </div>
    </div>
  );
};
export default ReportsRegistration;
