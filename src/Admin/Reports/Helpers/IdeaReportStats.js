/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Table } from "reactstrap";
import { CSVLink } from "react-csv";
import { useNavigate, Link } from "react-router-dom";
import { ArrowRight } from "feather-icons-react/build/IconComponents";
import { useDispatch, useSelector } from "react-redux";

import ReactApexChart from "react-apexcharts";

const IdeaReportStats = ({
  combinedArray,
  downloadTableData,
  doughnutChartData,
  totalCount,
  isloader,
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
      label: "Total Submitted Ideas",
      key: "totalSubmited",
    },
    {
      label: "Health & Wellness",
      key: "HealthWellness",
    },
    {
      label: "Women & Child Development",
      key: "WomenChildDevelopment",
    },
    {
      label: "Water",
      key: "Water",
    },
    {
      label: "Lifestyle for Environment (LiFE)",

      key: "LifestyleforEnvironment",
    },
    {
      label: "Cultural Pride",
      key: "CulturalPride",
    },
    {
      label: "Tribal Empowerment",

      key: "TribalEmpowerment",
    },
    {
      label: "Future-Ready Skills",

      key: "FutureReadySkills",
    },
      {
      label: "Local Community Problems (Open Innovation",

      key: "LocalCommunityProblems ",
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
    colors: [
      "#36A2EB",
      "#FF6384",
      "#ff6666",
      "#954535",
      "#a6d608",
      "#b2ffff",
      "#4169e1",
      "#32cd32"
    ],
    labels: [
      "Health & Wellness",
      "Women & Child Development",
      "Water",
      "Lifestyle for Environment (LiFE)",
      "Cultural Pride",
      "Tribal Empowerment",
     "Future-Ready Skills",
     "Local Community Problems (Open Innovation)"
    ],
    series: [
      totalCount.HealthWellness,
      totalCount.WomenChildDevelopment,
      totalCount.Water,
      totalCount.LifestyleforEnvironment,
      totalCount.CulturalPride,
      totalCount.TribalEmpowerment,
      totalCount.FutureReadySkills,
      totalCount.LocalCommunityProblems,


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
                              <b>
                                Theme-Wise Ideas Submissions as of {newFormat}
                              </b>
                            </p>
                            {/* {doughnutChartData && (
                              <div id="donut-chart">
                                <ReactApexChart
                                  options={chartOption}
                                  series={chartOption.series}
                                  type="donut"
                                  height={330}
                                />
                              </div>
                            )} */}
                            {doughnutChartData &&
                            doughnutChartData.datasets &&
                            doughnutChartData.datasets[0]?.data?.some(
                              (value) => value > 0
                            ) ? (
                              <div id="donut-chart">
                                <ReactApexChart
                                  options={chartOption}
                                  series={chartOption.series}
                                  type="donut"
                                  height={330}
                                />
                              </div>
                            ) : (
                              <div
                                style={{ textAlign: "center", padding: "20px" }}
                              >
                                No Ideas to display Pie Chart
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
                          State wise Submitted Ideas Stats
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
                                <th style={{ color: "#36A2EB" }}>#No</th>
                                <th style={{ color: "#36A2EB" }}>
                                  #State Name
                                </th>
                                <th
                                  style={{
                                    whiteSpace: "wrap",
                                    color: "#36A2EB",
                                  }}
                                >
                                  #Total Submitted Ideas
                                </th>
                                <th
                                  style={{
                                    whiteSpace: "wrap",
                                    color: "#36A2EB",
                                    fontWeight: "bold",
                                  }}
                                >
                                  #Health & Wellness
                                </th>
                                <th
                                  style={{
                                    whiteSpace: "wrap",
                                    color: "#36A2EB",
                                  }}
                                >
                                  #Women & Child Development
                                </th>
                                <th
                                  style={{
                                    whiteSpace: "wrap",
                                    color: "#36A2EB",
                                  }}
                                >
                                  #Water
                                </th>
                                <th
                                  style={{
                                    whiteSpace: "wrap",
                                    color: "#36A2EB",
                                  }}
                                >
                                  #Lifestyle for Environment (LiFE)
                                </th>

                                <th
                                  style={{
                                    whiteSpace: "wrap",
                                    color: "#36A2EB",
                                  }}
                                >
                                  #Cultural Pride{" "}
                                </th>

                                <th
                                  style={{
                                    whiteSpace: "wrap",
                                    color: "#36A2EB",
                                    fontWeight: "bold",
                                  }}
                                >
                                  #Tribal Empowerment
                                </th>
                                <th
                                  style={{
                                    whiteSpace: "wrap",
                                    color: "#36A2EB",
                                  }}
                                >
                                  #Future-Ready Skills
                                </th>
                                 <th
                                  style={{
                                    whiteSpace: "wrap",
                                    color: "#36A2EB",
                                  }}
                                >
                                  #Local Community Problems (Open Innovation)
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
                                  <td>{item.totalSubmited}</td>
                                  <td>
                                    {item.HealthWellness}
                                  </td>{" "}
                                  <td>{item.WomenChildDevelopment}</td>
                                  <td>{item.Water}</td>
                                  <td>{item.LifestyleforEnvironment}</td>
                                  <td>{item.CulturalPride}</td>
                                  <td>
                                    {item.TribalEmpowerment}
                                  </td>{" "}
                                  <td>{item.FutureReadySkills}</td>
                                  <td>{item.LocalCommunityProblems}</td>

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
                                  {totalCount.totalSubmited}
                                </td>
                                <td style={{ color: "crimson" }}>
                                  {totalCount.HealthWellness}
                                </td>
                                <td style={{ color: "crimson" }}>
                                  {totalCount.WomenChildDevelopment}
                                </td>
                                <td style={{ color: "crimson" }}>
                                  {totalCount.Water}
                                </td>{" "}
                                <td style={{ color: "crimson" }}>
                                  {totalCount.LifestyleforEnvironment}
                                </td>
                                <td style={{ color: "crimson" }}>
                                  {totalCount.CulturalPride}
                                </td>
                                <td style={{ color: "crimson" }}>
                                  {totalCount.TribalEmpowerment}
                                </td>{" "}
                                <td style={{ color: "crimson" }}>
                                  {totalCount.FutureReadySkills}
                                </td>
                                 <td style={{ color: "crimson" }}>
                                  {totalCount.LocalCommunityProblems}
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

            {downloadTableData && (
              <CSVLink
                data={downloadTableData}
                headers={tableHeaders}
                filename={`SubmittedIdeasSummaryReport_${newFormat}.csv`}
                className="hidden"
                ref={csvLinkRefTable}
              >
                Download Table CSV
              </CSVLink>
            )}
          </div>
        ) : (
          <div className="spinner-border text-info" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>
    </Container>
  );
};

export default IdeaReportStats;
