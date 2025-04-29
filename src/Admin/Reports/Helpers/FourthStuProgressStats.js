/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Table } from "reactstrap";
import { CSVLink } from "react-csv";
import { useNavigate, Link } from "react-router-dom";

import { ArrowRight } from "feather-icons-react/build/IconComponents";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMale,
  faFemale,
  faChalkboardTeacher,
} from "@fortawesome/free-solid-svg-icons";
import ReactApexChart from "react-apexcharts";

const FourthStuProgressStats = ({
  combinedArray,
  barChart1Data,
  barChart2Data,
  totalCount,
  doughnutChartData,
  doughnutChartDataBar,
  downloadTableData,
  isloader,
  series1,
  series2,
  series3,
  series4,
  series5,
}) => {
  const navigate = useNavigate();

  const csvLinkRefTable = useRef();
  const dispatch = useDispatch();

  const [newFormat, setNewFormat] = useState("");

  const tableHeaders = [
    {
      label: "State Name",
      key: "state",
    },
    {
      label: "Total No.Of TEAMS created",
      key: "totalTeams",
    },
    {
      label: "Total No.Of STUDENTS enrolled",
      key: "totalStudents",
    },
    {
      label: "No.Of Students completed the Course",
      key: "courseCompleted",
    },
    {
      label: "No.Of Students course In Progress",
      key: "courseINprogesss",
    },
    {
      label: "No.Of students NOT STARTED Course",
      key: "courseNotStarted",
    },
    {
      label: "Course Completion Percentage",
      key: "coursePercentage",
    },
    {
      label: "No.of Teams Submitted Ideas",
      key: "submittedCount",
    },
    {
      label: "No.of Teams Ideas in Draft",
      key: "draftCount",
    },
    {
      label: "No.of Teams Not Stated Idea Submission",
      key: "ideaNotStarted",
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
    labels: [
      "Submitted Ideas",
      "In Draft Ideas",
      "Not Started Idea Submission",
    ],
    series: [
      totalCount.submittedCount,
      totalCount.draftCount,
      totalCount.ideaNotStarted,
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
        name: "# Submitted Ideas",
        data: series1,
      },
      {
        name: "# Teams",
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

  var radialChart = {
    chart: {
      height: 350,
      type: "donut",
      toolbar: {
        show: false,
      },
    },
    colors: [
      "rgba(255, 0, 0, 0.6)",
      "rgba(255, 255, 0, 0.6)",
      "rgba(0, 128, 0, 0.6)",
    ],
    labels: ["Not Started ", "In Progress", "Completed"],
    series: [
      totalCount.courseNotStarted,
      totalCount.courseINprogesss,
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
                          <div className="col-sm-12 col-md-12 col-xl-6 text-center mt-3">
                            <p>
                              <b>Idea Submission Status As of {newFormat}</b>
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
                              <b>Students Course Status As of {newFormat}</b>
                            </p>
                            {doughnutChartDataBar && (
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
                          State wise Students Progress Stats
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
                                  <FontAwesomeIcon icon={faChalkboardTeacher} />{" "}
                                  Student Course Completed
                                </th>
                                <th
                                  style={{
                                    whiteSpace: "wrap",
                                    color: "#36A2EB",
                                  }}
                                >
                                  <FontAwesomeIcon icon={faChalkboardTeacher} />
                                  Student Course InProgress
                                </th>
                                <th
                                  style={{
                                    whiteSpace: "wrap",
                                    color: "#36A2EB",
                                  }}
                                >
                                  <FontAwesomeIcon icon={faChalkboardTeacher} />{" "}
                                  Student Course NotStarted{" "}
                                </th>
                                <th
                                  style={{
                                    whiteSpace: "wrap",
                                    color: "#36A2EB",
                                  }}
                                >
                                  <FontAwesomeIcon icon={faChalkboardTeacher} />{" "}
                                  Course Completion%
                                </th>
                                <th
                                  style={{
                                    whiteSpace: "wrap",
                                    color: "#36A2EB",
                                    fontWeight: "bold",
                                  }}
                                >
                                  #Teams Submitted Ideas
                                </th>
                                <th
                                  style={{
                                    whiteSpace: "wrap",
                                    color: "#36A2EB",
                                    fontWeight: "bold",
                                  }}
                                >
                                  #Teams Ideas in Draft
                                </th>
                                <th
                                  style={{
                                    whiteSpace: "wrap",
                                    color: "#36A2EB",
                                    fontWeight: "bold",
                                  }}
                                >
                                  #Teams Idea Not Started
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
                                  <td>{item.totalTeams}</td>
                                  <td>{item.totalStudents}</td>
                                  <td>{item.courseCompleted}</td>
                                  <td>{item.courseINprogesss}</td>
                                  <td>{item.courseNotStarted}</td>
                                  <td>{item.coursePercentage}%</td>
                                  <td>{item.submittedCount}</td>{" "}
                                  <td>{item.draftCount}</td>{" "}
                                  <td>{item.ideaNotStarted}</td>
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
                                  {totalCount.totalTeams}
                                </td>
                                <td style={{ color: "crimson" }}>
                                  {totalCount.totalStudents}
                                </td>
                                <td style={{ color: "crimson" }}>
                                  {totalCount.courseCompleted}
                                </td>
                                <td style={{ color: "crimson" }}>
                                  {totalCount.courseINprogesss}
                                </td>
                                <td style={{ color: "crimson" }}>
                                  {totalCount.courseNotStarted}
                                </td>
                                <td style={{ color: "crimson" }}>
                                  {Math.round(
                                    (totalCount.courseCompleted /
                                      totalCount.totalStudents) *
                                      100
                                  )}
                                  %
                                </td>
                                <td style={{ color: "crimson" }}>
                                  {totalCount.submittedCount}
                                </td>{" "}
                                <td style={{ color: "crimson" }}>
                                  {totalCount.draftCount}
                                </td>{" "}
                                <td style={{ color: "crimson" }}>
                                  {totalCount.ideaNotStarted}
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
                    Teams, Submitted Ideas As of {newFormat}
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
                    Student Course Status As of {newFormat}
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
            filename={`StudentProgressSummaryReport_${newFormat}.csv`}
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

export default FourthStuProgressStats;
