/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Table } from "reactstrap";
import { Button } from "../../../stories/Button";
import { CSVLink } from "react-csv";
import {
  openNotificationWithIcon,
  getCurrentUser,
} from "../../../helpers/Utils";
import {
  getDistrictData,
  getStateData,
  getFetchDistData,
} from "../../../redux/studentRegistration/actions";
import { ArrowRight } from "feather-icons-react/build/IconComponents";
import { useDispatch, useSelector } from "react-redux";
import Select from "../Helpers/Select";
import { Chart } from "primereact/chart";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../reports.scss";
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
import { encryptGlobal } from "../../../constants/encryptDecrypt";
import { stateList, districtList } from "../../../RegPage/ORGData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMale, faFemale, faSchool } from "@fortawesome/free-solid-svg-icons";
import ReactApexChart from "react-apexcharts";

// import { categoryValue } from '../../Schools/constentText';

const ReportsRegistration = () => {
  const [RegTeachersdistrict, setRegTeachersdistrict] = React.useState("");
  const [RegTeachersState, setRegTeachersState] = React.useState("");
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState("");
  const [category, setCategory] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filteresData, setFilteresData] = useState([]);

  const filterOptions = ["Registered", "Not Registered"];
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
  useEffect(() => {
    setRegTeachersdistrict('');
  }, [RegTeachersState]);

  const newstateList = ["All States", ...stateList];

  // const categoryData =
  //     categoryValue[process.env.REACT_APP_LOCAL_LANGUAGE_CODE];

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
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [newFormat, setNewFormat] = useState("");
  const [series1, setseries1] = useState([]);
  const [series2, setseries2] = useState([]);
  const [barChart1Data, setBarChart1Data] = useState({
    labels: [],
    datasets: [],
  });
  const [isloader, setIsloader] = useState(false);

  const fullStatesNames = newstateList;
  const allDistricts = {
    "All Districts": [...Object.values(districtList).flat()],
    ...districtList,
  };
  const fiterDistData = [
    "All Districts",
    ...(allDistricts[RegTeachersState] || []),
  ];
  // const fiterDistData = districtList[RegTeachersState];

  const [downloadTableData, setDownloadTableData] = useState(null);
  const summaryHeaders = [
    {
      label: "State Name",
      key: "state",
    },
    {
      label: "Total Schools in DB",
      key: "Eligible_school",
    },
    {
      label: "Registered Schools",
      key: "reg_school",
    },
    {
      label: "Total Registered ATL Teachers",
      key: "ATL_Reg_Count",
    },
    {
      label: "Total Registered NON-ATL Teachers",
      key: "NONATL_Reg_Count",
    },
    {
      label: "Total Registered Others Teachers ",
      key: "Others_Reg_Count",
    },
    {
      label: "Total Registered Teachers",
      key: "total",
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
      label: " Registered Others Teachers",
      key: "others",
    }
  ];
  const RegHeaders = [
    {
      label: "UDISE CODE",
      key: "organization.organization_code",
    },
    // {
    //   label: "ATL CODE",
    //   key: "organization.unique_code",
    // },
    {
      label: "School Name",
      key: "organization.organization_name",
    },
    {
      label: "School Type/Category",
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
      label: "Teacher Email ID",
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
      label: "UDISE CODE",
      key: "organization_code",
    },
    // {
    //   label: "ATL CODE",
    //   key: "unique_code",
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
      label: "Pin code",
      key: "pin_code",
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

  useEffect(() => {
    // if (RegTeachersState !== '') {
    //     (RegTeachersState);
    // }
    // setRegTeachersdistrict('');
    fetchChartTableData();
  }, []);

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
      width: 1000,
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
    series: [
      {
        name: "Registered Schools",
        data: series1,
      },
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
          fontSize: "10px",
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
  };

  const fetchData = (item) => {
    const param = encryptGlobal(
      JSON.stringify({
        state: RegTeachersState,
        status: "ACTIVE",
        district:
          RegTeachersdistrict === "" ? "All Districts" : RegTeachersdistrict,
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
      url: process.env.REACT_APP_API_BASE_URL + url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.data[0]?.token}`,
      },
    };

    axios(config)
      .then((response) => {
        if (response.status === 200) {
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
            // csvLinkRef.current.link.click();
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
            // csvLinkRefNotRegistered.current.link.click();
          }
          // openNotificationWithIcon(
          //     'success',
          //     `${filterType} Report Downloaded Successfully`
          // );
          setIsDownloading(false);
        }
      })
      .catch((error) => {
        console.log("API error:", error);
        setIsDownloading(false);
      });
  };

  const handleDownload = () => {
    if (
      !RegTeachersState ||
      // !RegTeachersdistrict ||
      !filterType ||
      !category
    ) {
      notification.warning({
        message:
          "Select state, district, filters, category to download report.",
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
    const formattedDate = `${newDate.getUTCDate()}/${
      1 + newDate.getMonth()
    }/${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`;
    setNewFormat(formattedDate);
  }, [downloadComplete]);

  const fetchChartTableData = () => {
    const config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + "/reports/mentorsummary",
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
          const formattedData = chartTableData.map(item => ({...item,
            total: `${item.ATL_Reg_Count+item.NONATL_Reg_Count+item.Others_Reg_Count}`
          }));
          setDownloadTableData(formattedData);
          // console.log(chartTableData, "table data");

          const lastRow = chartTableData[chartTableData.length - 1];
          const maleCount = lastRow?.Male || 0;
          const othersCount = lastRow?.others || 0;

          const femaleCount = lastRow?.Female || 0;
          const ATLregCount = lastRow?.ATL_Reg_Count || 0;
          const NONATLregNotCount = lastRow?.NONATL_Reg_Count || 0;
          const OthersRegCount = lastRow?.Others_Reg_Count || 0;


          console.log("others Teachers:", othersCount);
          setRegisteredGenderChartData({
            labels: ["Male Teachers", "Female Teachers","Others"],
            datasets: [
              {
                data: [maleCount, femaleCount,othersCount],
                backgroundColor: ["#8bcaf4", "#ff99af","#A0522D"],
                hoverBackgroundColor: ["#36A2EB", "#FF6384",'#8B4513'],
              },
            ],
          });

          setRegisteredChartData({
            labels: ["ATL Teachers Registered", "NON ATL Teachers Registered","Others Teachers Registered"],
            datasets: [
              {
                data: [ATLregCount, NONATLregNotCount,OthersRegCount],
                backgroundColor: ["#85e085", "#ffcc80","#A0522D"],
                hoverBackgroundColor: ["#33cc33", "#ffa31a",'#8B4513'],
              },
            ],
          });
          const GraphfilteredData = chartTableData.filter(
            (item) => item.state !== "Total"
          );
          const barData = {
            labels: GraphfilteredData.map((item) => item.state),
            datasets: [
              {
                label: "Registered ATL Schools",
                data: GraphfilteredData.map((item) => item.ATL_Reg_Count),
                backgroundColor: "#47d147",
              },
              {
                label: "Registered Non ATL Schools",
                data: GraphfilteredData.map((item) => item.NONATL_Reg_Count),
                backgroundColor: "#ffa31a",
              },
              {
                label: "Registered Schools",
                data: GraphfilteredData.map((item) => item.reg_school),
                backgroundColor: "#ffa31a",
              }

            ],
          };
          setBarChart1Data(barData);
          console.log(barData,"barData");
          setseries1(barData.datasets[2].data);
          setseries2(barData.datasets[1].data);
        }
      })
      .catch((error) => {
        console.log("API error:", error);
      });
  };
  
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>2. Teacher Regristration Report</h4>
              <h6>List of Teachers registered and their details</h6>
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
                  <Select
                    list={fullStatesNames}
                    setValue={setRegTeachersState}
                    placeHolder={"Select State"}
                    value={RegTeachersState}
                  />
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
                  {/* <Select
                                            list={categoryData}
                                            setValue={setCategory}
                                            placeHolder={'Select Category'}
                                            value={category}
                                        /> */}
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
              {chartTableData.length > 0 && (
                <div className="row">
                  <div className="col-sm-12 col-md-12 col-xl-4 d-flex">
                    <div className="card flex-fill default-cover w-100 mb-4">
                      <div className="card-header d-flex justify-content-between align-items-center">
                        <h4 className="card-title mb-0">Data Analytics</h4>
                        <div className="dropdown">
                          <Link
                            to="#"
                            className="view-all d-flex align-items-center"
                          >
                            View All
                            <span className="ps-2 d-flex align-items-center">
                              <ArrowRight className="feather-16" />
                            </span>
                          </Link>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-12 text-center mt-3">
                            <p>
                              <b>
                                Overall Registered ATL vs Non ATL vs Other Teachers As of{" "}
                                {newFormat}
                              </b>
                            </p>
                          </div>
                          <div className="col-md-12 doughnut-chart-container">
                            {registeredChartData && (
                              <Doughnut
                                data={registeredChartData}
                                options={chartOption}
                              />
                            )}
                          </div>
                          <div className="col-md-12 text-center mt-3">
                            <p>
                              <b>
                                Overall Registered Female vs Male vs Other Teachers As of{" "}
                                {newFormat}
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
                  <div className="col-sm-12 col-md-12 col-xl-8 d-flex">
                    <div className="card flex-fill default-cover w-100 mb-4">
                      <div className="card-header d-flex justify-content-between align-items-center">
                        <h4 className="card-title mb-0">
                          States wise Teacher Registration Stats
                        </h4>
                        <div className="dropdown">
                          <Link
                            to="#"
                            className="view-all d-flex align-items-center"
                          >
                            <button
                              className="btn mx-2 btn-primary"
                              type="button"
                              onClick={() => {
                                if (downloadTableData) {
                                  // setIsDownloading(true);
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
                                <th style={{ whiteSpace: "wrap", color: "#36A2EB",fontWeight: "bold" }}>#</th>
                                <th style={{ whiteSpace: "wrap", color: "#36A2EB",fontWeight: "bold" }}>State Name</th>
                                <th style={{ whiteSpace: "wrap", color: "#36A2EB",fontWeight: "bold" }}>
                                   Schools in DB{" "}
                                  <FontAwesomeIcon icon={faSchool} />
                                </th>
                                <th style={{ whiteSpace: "wrap", color: "#36A2EB",fontWeight: "bold" }}>
                                  Registered Schools
                                </th>
                                <th style={{ whiteSpace: "wrap", color: "#36A2EB",fontWeight: "bold" }}>
                                  ATL Teachers
                                </th>
                                <th style={{ whiteSpace: "wrap", color: "#36A2EB",fontWeight: "bold" }}>
                                  Non-ATL Teachers
                                </th>
                                <th style={{ whiteSpace: "wrap", color: "#36A2EB",fontWeight: "bold" }}>
                                  Others Teachers
                                </th>
                                <th style={{ whiteSpace: "wrap", color: "#36A2EB",fontWeight: "bold" }}>
                                  Total Teachers
                                </th>
                                <th style={{ whiteSpace: "wrap", color: "#36A2EB",fontWeight: "bold" }}>
                                  <FontAwesomeIcon icon={faMale} />
                                  Male
                                </th>
                                <th style={{ whiteSpace: "wrap", color: "#36A2EB",fontWeight: "bold" }}>
                                  <FontAwesomeIcon icon={faFemale} />
                                  Female
                                </th>
                                <th style={{ whiteSpace: "wrap", color: "#36A2EB",fontWeight: "bold" }}>
                                  <FontAwesomeIcon icon={faMale} />
                                  Others
                                </th>
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
                                    {item.state}
                                  </td>
                                  <td>{item.Eligible_school
                                  }</td>
                                  <td>{item.reg_school
}</td>
                                  <td>{item.ATL_Reg_Count}</td>
                                  <td>{item.NONATL_Reg_Count}</td>
                                  <td>{item.Others_Reg_Count}</td>

                                  <td>{item.ATL_Reg_Count+item.NONATL_Reg_Count+item.Others_Reg_Count}</td>
                                  <td>{item.Male}</td>
                                  <td>{item.Female}</td>
                                  <td>{item.others}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title">
                      Registered Schools As of{" "}
                      {newFormat}
                    </h5>
                  </div>
                  <div className="card-body">
                    <div id="s-col-stacked" />
                    <ReactApexChart
                      options={options}
                      series={options.series}
                      type="bar"
                      // type="area"
                      height={400}
                    />
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
          {downloadTableData && (
                <CSVLink
                  data={downloadTableData}
                  headers={summaryHeaders}
                  filename={`TeacherRegistrationSummaryTable_${newFormat}.csv`}
                  className="hidden"
                  ref={csvLinkRefTable}
                  // onDownloaded={() => {
                  //     setIsDownloading(false);
                  //     setDownloadComplete(true);
                  // }}
                >
                  Download Table CSV
                </CSVLink>
              )}
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
