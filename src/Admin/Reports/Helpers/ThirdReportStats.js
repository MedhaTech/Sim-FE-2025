/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Table } from "reactstrap";
import { Button } from "../../../stories/Button";
import { CSVLink } from "react-csv";
import { getCurrentUser } from "../../../helpers/Utils";
import { useNavigate, Link } from "react-router-dom";

import { ArrowRight } from "feather-icons-react/build/IconComponents";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMale,
  faFemale,
  faChalkboardTeacher,
} from "@fortawesome/free-solid-svg-icons";
import ReactApexChart from "react-apexcharts";
import { openNotificationWithIcon } from "../../../helpers/Utils";

const ThirdReportStats = () => {
  const navigate = useNavigate();
  const [isloader, setIsloader] = useState(false);

  const [mentorDetailedReportsData, setmentorDetailedReportsData] = useState(
    []
  );
  const [doughnutChartData, setDoughnutChartData] = useState(null);
  const currentUser = getCurrentUser("current_user");
  const csvLinkRef = useRef();
  const csvLinkRefTable = useRef();
  const dispatch = useDispatch();
  const [combinedArray, setCombinedArray] = useState([]);
  const [downloadTableData, setDownloadTableData] = useState([]);
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
  const [seriesa, setseriesa] = useState([]);
  const [seriesb, setseriesb] = useState([]);

  const [formattedDataForDownload, setFormattedDataForDownload] = useState([]);
  const [barChartNew, setBarChartNew] = useState({
    labels: [],
    datasets: [],
  });
  const [barDought, setBarDought] = useState({
    labels: [],
    datasets: [],
  });

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

  const [totalCount, setTotalCount] = useState([]);

  const tableHeaders = [
    {
      label: "State Name",
      key: "state",
    },
    {
      label: "Total Registered Teachers",
      key: "totalReg",
    },
    {
      label: "Total No.of Teams created",
      key: "totalTeams",
    },
    {
      label: "Total No.of Students enrolled",
      key: "totalStudents",
    },
    {
      label: "No.of Female Students",
      key: "femaleStudents",
    },
    {
      label: "No.of Male Students",
      key: "maleStudents",
    },
    {
      label: "No.of Male Students",
      key: "otherStudents",
    },
    {
      label: "No.of Teachers completed the course",
      key: "courseCompleted",
    },
    {
      label: "No.of Teachers course IN Progress",
      key: "courseINcompleted",
    },
    {
      label: "No.of Teachers NOT Started Course",
      key: "courseNotStarted",
    },
  ];

  var chartOption = {
    chart: {
      height: 330,
      type: "donut",
      toolbar: {
        show: false,
      },
    },
    colors: ["#36A2EB", "#FF6384", "rgb(254, 176, 25)"],
    labels: ["Male", "Female", "Others"],
    series: [
      totalCount.maleStudents,
      totalCount.femaleStudents,
      totalCount.otherStudents,
    ],
    legend: {
      position: "top",
      horizontalAlign: "center",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

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
    colors: ["rgb(0, 143, 251)", "rgb(0, 227, 150)"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    series: [
      {
        name: "# Teams",
        data: series1,
      },
      {
        name: "# Students",
        data: series2,
      },
    ],

    yaxis: {
      beginAtZero: true,
      ticks: {
        stepSize: 20,
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
      horizontalAlign: "center",
    },
  };

  var sColStacked = {
    chart: {
      height: 700,
      width: 1000,
      type: "bar",
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    colors: ["rgb(255, 69, 96)", "rgb(254, 176, 25)", "rgb(0, 227, 150)"],

    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    series: [
      {
        name: "#Not started",
        data: series3,
      },
      {
        name: "#InProgress",
        data: series4,
      },
      {
        name: "#Completed",
        data: series5,
      },
    ],
    xaxis: {
      categories: barChart2Data.labels,
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
    yaxis: {
      beginAtZero: true,
      ticks: {
        stepSize: 20,
      },
      labels: {
        formatter: (val) => {
          return val / 1;
        },
      },
    },

    legend: {
      position: "top",
      horizontalAlign: "center",
    },
    fill: {
      opacity: 1,
    },
  };

  var optionsStudent = {
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
    colors: ["rgb(0, 143, 251)", "rgb(0, 227, 150)"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    series: [
      {
        name: "# Registered Students",
        data: seriesa,
      },
      {
        name: "# Registered Teachers",
        data: seriesb,
      },
    ],

    yaxis: {
      beginAtZero: true,
      ticks: {
        stepSize: 20,
      },
      labels: {
        formatter: (val) => {
          return val / 1;
        },
      },
    },

    xaxis: {
      categories: barChartNew.labels,
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
      horizontalAlign: "center",
    },
  };

  var radialChart = {
    chart: {
      height: 350,
      type: "donut",
      toolbar: {
        show: false,
      },
    },
    labels: ["Not started", "In progress", "Completed"],
    colors: [
      "rgba(255, 0, 0, 0.6)",
      "rgba(255, 255, 0, 0.6)",
      "rgba(0, 128, 0, 0.6)",
    ],
    series: [
      totalCount.courseNotStarted,
      totalCount.courseINcompleted,
      totalCount.courseCompleted,
    ],
    legend: {
      position: "top",
      horizontalAlign: "center",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  useEffect(() => {
    nonAtlCount();
  }, []);
  const nonAtlCount = () => {
    var config = {
      method: "get",
      url:
        process.env.REACT_APP_API_BASE_URL_FOR_REPORTS +
        `/reports/studentATLnonATLcount`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${currentUser.data[0]?.token}`,
      },
    };
    axios(config)
      .then(function (res) {
        if (res.status === 200) {
          var mentorStuArray = [];
          res &&
            res.data &&
            res.data.data &&
            res.data.data.map((students, index) => {
              var key = index + 1;
              return mentorStuArray.push({ ...students, key });
            });
          setAtl(mentorStuArray);

          const barStudentData = {
            labels: mentorStuArray.map((item) => item.state),
            datasets: [
              {
                label: "No.of  ATL Students",
                data: mentorStuArray.map((item) => item.ATL_Student_Count),
                backgroundColor: "rgba(255, 0, 0, 0.6)",
              },
              {
                label: "No.of Non ATL Students",
                data: mentorStuArray.map((item) => item.NONATL_Student_Count),
                backgroundColor: "rgba(75, 162, 192, 0.6)",
              },
            ],
          };
          setBarChart3Data(barStudentData);
          setseries7(barStudentData.datasets[0].data);
          setseries6(barStudentData.datasets[1].data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchChartTableData();
    const newDate = new Date();
    const formattedDate = `${newDate.getUTCDate()}/${
      1 + newDate.getMonth()
    }/${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`;
    setNewFormat(formattedDate);
  }, []);

  const fetchChartTableData = () => {
    const config = {
      method: "get",
      url:
        process.env.REACT_APP_API_BASE_URL_FOR_REPORTS +
        "/reports/mentordetailstable",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.data[0]?.token}`,
      },
    };

    axios(config)
      .then((response) => {
        if (response.status === 200) {
          setIsloader(true);
          const summary = response.data.data[0].summary;
          const teamCount = response.data.data[0].teamCount;
          const studentCountDetails =
            response.data.data[0].studentCountDetails.map((item) => {
              const otherCount =
                item.totalstudent -
                (parseInt(item.male) + parseInt(item.female));
              return {
                ...item,
                other: otherCount,
              };
            });
          const courseCompleted = response.data.data[0].courseCompleted;
          const courseINcompleted = response.data.data[0].courseINcompleted;

          const combinedArray = summary.map((summaryItem) => {
            const state = summaryItem.state;
            const teamCountItem = teamCount.find(
              (item) => item.state === state
            );
            const studentCountItem = studentCountDetails.find(
              (item) => item.state === state
            );
            const courseCompletedItem = courseCompleted.find(
              (item) => item.state === state
            );
            const courseINcompletedItem = courseINcompleted.find(
              (item) => item.state === state
            );
            const courseNotStarted =
              summaryItem.totalReg -
              ((courseCompletedItem ? courseCompletedItem.courseCMP : 0) +
                (courseINcompletedItem ? courseINcompletedItem.courseIN : 0));
            return {
              state,
              totalReg: summaryItem.totalReg,
              totalTeams: teamCountItem ? teamCountItem.totalTeams : 0,
              totalStudents: studentCountItem
                ? studentCountItem.totalstudent
                : 0,
              maleStudents: studentCountItem
                ? parseInt(studentCountItem.male)
                : 0,
              femaleStudents: studentCountItem
                ? parseInt(studentCountItem.female)
                : 0,
              otherStudents: studentCountItem ? studentCountItem.other : 0,
              courseCompleted: courseCompletedItem
                ? courseCompletedItem.courseCMP
                : 0,
              courseINcompleted: courseINcompletedItem
                ? courseINcompletedItem.courseIN
                : 0,
              courseNotStarted,
            };
          });
          const total = combinedArray.reduce(
            (acc, item) => {
              acc.state = "Total";
              acc.totalReg += item.totalReg;
              acc.totalTeams += item.totalTeams;
              acc.totalStudents += item.totalStudents;
              acc.maleStudents += item.maleStudents;
              acc.femaleStudents += item.femaleStudents;
              acc.otherStudents += item.otherStudents;
              acc.courseCompleted += item.courseCompleted;
              acc.courseINcompleted += item.courseINcompleted;
              acc.courseNotStarted += item.courseNotStarted;
              return acc;
            },
            {
              state: "None",
              totalReg: 0,
              totalTeams: 0,
              totalStudents: 0,
              maleStudents: 0,
              femaleStudents: 0,
              otherStudents: 0,
              courseCompleted: 0,
              courseINcompleted: 0,
              courseNotStarted: 0,
            }
          );
          const doughnutData = {
            labels: ["Male", "Female", "Others"],
            datasets: [
              {
                data: [
                  total.maleStudents,
                  total.femaleStudents,
                  total.otherStudents,
                ],
                backgroundColor: ["#8bcaf4", "#ff99af", "rgb(254, 176, 25)"],
                hoverBackgroundColor: ["#36A2EB", "#FF6384"],
              },
            ],
          };
          const doughnutDataCourse = {
            labels: ["Not started", "In progress", "Completed"],
            datasets: [
              {
                data: [
                  total.courseNotStarted,
                  total.courseINcompleted,
                  total.courseCompleted,
                ],
                backgroundColor: [
                  "rgba(255, 0, 0, 0.6)",
                  "rgba(255, 255, 0, 0.6)",
                  "rgba(0, 128, 0, 0.6)",
                ],
                hoverBackgroundColor: ["#e60026", "#ffae42", "#087830"],
              },
            ],
          };

          const barData = {
            labels: combinedArray.map((item) => item.state),
            datasets: [
              {
                label: "No.of Students Enrolled",
                data: combinedArray.map((item) => item.totalStudents),
                backgroundColor: "rgba(255, 0, 0, 0.6)",
              },
              {
                label: "No. of Teams created",
                data: combinedArray.map((item) => item.totalTeams),
                backgroundColor: "rgba(75, 162, 192, 0.6)",
              },
            ],
          };
          setseries2(barData.datasets[0].data);
          setseries1(barData.datasets[1].data);

          const barDataA = {
            labels: combinedArray.map((item) => item.state),
            datasets: [
              {
                label: "No.of Registered Students Enrolled",
                data: combinedArray.map((item) => item.totalStudents),
                backgroundColor: "rgba(255, 0, 0, 0.6)",
              },
              {
                label: "No. of Registered Teachers Enrolled",
                data: combinedArray.map((item) => item.totalReg),
                backgroundColor: "rgba(75, 162, 192, 0.6)",
              },
            ],
          };
          setseriesa(barDataA.datasets[0].data);
          setseriesb(barDataA.datasets[1].data);

          const stackedBarChartData = {
            labels: combinedArray.map((item) => item.state),
            datasets: [
              {
                label: "No. of Teachers not started course",
                data: combinedArray.map((item) => item.courseNotStarted),
                backgroundColor: "rgba(255, 0, 0, 0.6)",
              },
              {
                label: "No. of Teachers course IN progress",
                data: combinedArray.map((item) => item.courseINcompleted),
                backgroundColor: "rgba(255, 255, 0, 0.6)",
              },
              {
                label: "No. of teachers Completed Course",
                data: combinedArray.map((item) => item.courseCompleted),
                backgroundColor: "rgba(0, 128, 0, 0.6)",
              },
            ],
          };
          setseries3(stackedBarChartData.datasets[0].data);
          setseries4(stackedBarChartData.datasets[1].data);
          setseries5(stackedBarChartData.datasets[2].data);
          const newcombinedArray = [...combinedArray, total];
          setCombinedArray(combinedArray);
          setDownloadTableData(newcombinedArray);
          setDoughnutChartData(doughnutData);
          setBarDought(doughnutDataCourse);

          setBarChart1Data(barData);
          setBarChartNew(barDataA);

          setBarChart2Data(stackedBarChartData);
          setTotalCount(total);
        }
      })
      .catch((error) => {
        console.log("API error:", error);
      });
  };

  return (
    <Container className="RegReports userlist">
      <div className="reports-data mt-2 mb-2">
        {isloader ? (
          <div className="chart mt-2 mb-2">
            {combinedArray.length > 0 && (
              <>
                <div className="row">
                  <div className="col-sm-12 col-md-12 col-xl-12 d-flex">
                    <div className="card flex-fill default-cover w-100 mb-4">
                      <div className="card-header d-flex justify-content-between align-items-center">
                        <h4 className="card-title mb-0">Data Analytics OF Arshiya</h4>
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
                          <div className="col-sm-12 col-md-12 col-xl-6 text-center mt-3">
                            <p>
                              <b>Students as per Gender {newFormat}</b>
                            </p>
                            {doughnutChartData && (
                              <div id="donut-chart">
                                <ReactApexChart
                                  options={chartOption}
                                  series={chartOption.series}
                                  type="donut"
                                  height={330}
                                />
                              </div>
                            )}
                          </div>
                          <div className="col-sm-12 col-md-12 col-xl-6 text-center mt-3">
                            <p>
                              <b>Teachers Course Status As of {newFormat}</b>
                            </p>
                            {barDought && (
                              <div id="radial-chart">
                                <ReactApexChart
                                  options={radialChart}
                                  series={radialChart.series}
                                  type="donut"
                                  height={350}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12 col-md-12 col-xl-12 d-flex">
                    <div className="card flex-fill default-cover w-100 mb-4">
                      <div className="card-header d-flex justify-content-between align-items-center">
                        <h4 className="card-title mb-0">
                          States wise Teacher Progress Stats
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
                                <th style={{ color: "#36A2EB" }}>#</th>
                                <th style={{ color: "#36A2EB" }}>State Name</th>
                                <th
                                  style={{
                                    whiteSpace: "wrap",
                                    color: "#36A2EB",
                                  }}
                                >
                                  #Registered Teachers
                                </th>
                                <th
                                  style={{
                                    whiteSpace: "wrap",
                                    color: "#36A2EB",
                                  }}
                                >
                                  #Teams Created
                                </th>
                                <th
                                  style={{
                                    whiteSpace: "wrap",
                                    color: "#36A2EB",
                                  }}
                                >
                                  #Students Enrolled
                                </th>
                                <th
                                  style={{
                                    whiteSpace: "wrap",
                                    color: "#36A2EB",
                                  }}
                                >
                                  <FontAwesomeIcon icon={faFemale} />
                                  Female Students
                                </th>
                                <th
                                  style={{
                                    whiteSpace: "wrap",
                                    color: "#36A2EB",
                                  }}
                                >
                                  <FontAwesomeIcon icon={faMale} /> Male
                                  Students
                                </th>
                                <th
                                  style={{
                                    whiteSpace: "wrap",
                                    color: "#36A2EB",
                                  }}
                                >
                                  Other Students
                                </th>
                                <th
                                  style={{
                                    whiteSpace: "wrap",
                                    color: "#36A2EB",
                                  }}
                                >
                                  <FontAwesomeIcon icon={faChalkboardTeacher} />{" "}
                                  Teacher Course Completed
                                </th>
                                <th
                                  style={{
                                    whiteSpace: "wrap",
                                    color: "#36A2EB",
                                  }}
                                >
                                  <FontAwesomeIcon icon={faChalkboardTeacher} />{" "}
                                  Teacher Course InProgress
                                </th>
                                <th
                                  style={{
                                    whiteSpace: "wrap",
                                    color: "#36A2EB",
                                  }}
                                >
                                  <FontAwesomeIcon icon={faChalkboardTeacher} />{" "}
                                  Teacher Course NotStarted{" "}
                                </th>
                              </tr>
                            </thead>
                            <tbody className="text-center">
                              {combinedArray.map((item, index) => (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td
                                    style={{
                                      textAlign: "left",
                                      maxWidth: "150px",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      color: "crimson",
                                    }}
                                  >
                                    {item.state}
                                  </td>
                                  <td>{item.totalReg}</td>
                                  <td>{item.totalTeams}</td>
                                  <td>{item.totalStudents}</td>
                                  <td>{item.femaleStudents}</td>
                                  <td>{item.maleStudents}</td>
                                  <td>{item.otherStudents}</td>
                                  <td>{item.courseCompleted}</td>
                                  <td>{item.courseINcompleted}</td>
                                  <td>{item.courseNotStarted}</td>
                                </tr>
                              ))}
                              <tr>
                                <td>{}</td>
                                <td
                                  style={{
                                    color: "crimson",
                                    textAlign: "left",
                                    maxWidth: "150px",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {"Total Count"}
                                </td>
                                <td style={{ color: "crimson" }}>
                                  {totalCount.totalReg}
                                </td>
                                <td style={{ color: "crimson" }}>
                                  {totalCount.totalTeams}
                                </td>
                                <td style={{ color: "crimson" }}>
                                  {totalCount.totalStudents}
                                </td>
                                <td style={{ color: "crimson" }}>
                                  {totalCount.femaleStudents}
                                </td>
                                <td style={{ color: "crimson" }}>
                                  {totalCount.maleStudents}
                                </td>
                                <td style={{ color: "crimson" }}>
                                  {totalCount.otherStudents}
                                </td>
                                <td style={{ color: "crimson" }}>
                                  {totalCount.courseCompleted}
                                </td>
                                <td style={{ color: "crimson" }}>
                                  {totalCount.courseINcompleted}
                                </td>
                                <td style={{ color: "crimson" }}>
                                  {totalCount.totalReg -
                                    (totalCount.courseCompleted +
                                      totalCount.courseINcompleted)}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">
                    Teams & Students Enrolled As of {newFormat}
                  </h5>
                </div>
                <div className="card-body">
                  <div id="s-line-area" />
                  <ReactApexChart
                    options={options}
                    series={options.series}
                    type="bar"
                    height={400}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">
                    Teachers Course Status As of {newFormat}
                  </h5>
                </div>
                <div className="card-body">
                  <div id="s-col-stacked" />
                  <ReactApexChart
                    options={sColStacked}
                    series={sColStacked.series}
                    type="bar"
                    height={400}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">
                    Registered Teachers & Students As of {newFormat}
                  </h5>
                </div>
                <div className="card-body">
                  <div id="s-line-area" />
                  <ReactApexChart
                    options={optionsStudent}
                    series={optionsStudent.series}
                    type="bar"
                    height={400}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="spinner-border text-info" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}

        {downloadTableData && (
          <CSVLink
            data={downloadTableData}
            headers={tableHeaders}
            filename={`TeacherProgressSummaryReport_${newFormat}.csv`}
            className="hidden"
            ref={csvLinkRefTable}
          >
            Download Table CSV
          </CSVLink>
        )}
      </div>
    </Container>
  );
};

export default ThirdReportStats;
