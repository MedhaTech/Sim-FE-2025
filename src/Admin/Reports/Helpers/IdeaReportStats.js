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
      label: "Building a Sustainable Future",
      key: "BuildingaSustainableFuture",
    },
    {
      label: "Technology for Learning and Growth",
      key: "TechnologyforLearningandGrowth",
    },
    {
      label: "Health & Nutrition and Well-being",
      key: "HealthNutritionWellbeing",
    },
    {
      label: "Skills for Life and Livelihood",

      key: "SkillsforLifeLivelihood",
    },
    {
      label: "Smarter Communities & Safer Futures",
      key: "SmarterCommunitiesSaferFutures",
    },
    {
      label: "Agriculture and Rural Transformation",

      key: "AgricultureRuralTransformation",
    },
    {
      label: "Open Category - Think Beyond!",

      key: "OpenCategoryThinkBeyond",
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
    ],
    labels: [
      "Building a Sustainable Future",
      "Technology for Learning and Growth",
      "Health & Nutrition and Well-being",
      "Skills for Life and Livelihood",
      "Smarter Communities & Safer Futures",
      "Agriculture and Rural Transformation",
      "Open Category - Think Beyond!",
    ],
    series: [
      totalCount.BuildingaSustainableFuture,
      totalCount.TechnologyforLearningandGrowth,
      totalCount.HealthNutritionWellbeing,
      totalCount.SkillsforLifeLivelihood,
      totalCount.SmarterCommunitiesSaferFutures,
      totalCount.AgricultureRuralTransformation,
      totalCount.OpenCategoryThinkBeyond,
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
                                  #Building a Sustainable Future
                                </th>
                                <th
                                  style={{
                                    whiteSpace: "wrap",
                                    color: "#36A2EB",
                                  }}
                                >
                                  #Technology for Learning and Growth
                                </th>
                                <th
                                  style={{
                                    whiteSpace: "wrap",
                                    color: "#36A2EB",
                                  }}
                                >
                                  #Health & Nutrition and Well-being
                                </th>
                                <th
                                  style={{
                                    whiteSpace: "wrap",
                                    color: "#36A2EB",
                                  }}
                                >
                                  #Skills for Life and Livelihood
                                </th>

                                <th
                                  style={{
                                    whiteSpace: "wrap",
                                    color: "#36A2EB",
                                  }}
                                >
                                  #Smarter Communities & Safer Futures{" "}
                                </th>

                                <th
                                  style={{
                                    whiteSpace: "wrap",
                                    color: "#36A2EB",
                                    fontWeight: "bold",
                                  }}
                                >
                                  #Agriculture and Rural Transformation
                                </th>
                                <th
                                  style={{
                                    whiteSpace: "wrap",
                                    color: "#36A2EB",
                                  }}
                                >
                                  #Open Category - Think Beyond!
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
                                    {item.BuildingaSustainableFuture}
                                  </td>{" "}
                                  <td>{item.TechnologyforLearningandGrowth}</td>
                                  <td>{item.HealthNutritionWellbeing}</td>
                                  <td>{item.SkillsforLifeLivelihood}</td>
                                  <td>{item.SmarterCommunitiesSaferFutures}</td>
                                  <td>
                                    {item.AgricultureRuralTransformation}
                                  </td>{" "}
                                  <td>{item.OpenCategoryThinkBeyond}</td>
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
                                  {totalCount.BuildingaSustainableFuture}
                                </td>
                                <td style={{ color: "crimson" }}>
                                  {totalCount.TechnologyforLearningandGrowth}
                                </td>
                                <td style={{ color: "crimson" }}>
                                  {totalCount.HealthNutritionWellbeing}
                                </td>{" "}
                                <td style={{ color: "crimson" }}>
                                  {totalCount.SkillsforLifeLivelihood}
                                </td>
                                <td style={{ color: "crimson" }}>
                                  {totalCount.SmarterCommunitiesSaferFutures}
                                </td>
                                <td style={{ color: "crimson" }}>
                                  {totalCount.AgricultureRuralTransformation}
                                </td>{" "}
                                <td style={{ color: "crimson" }}>
                                  {totalCount.OpenCategoryThinkBeyond}
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
