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
      label: "Agriculture and Rural Development",
      key: "AgricultureandRuralDevelopment",
    },
    {
      label: "Digital Transformation",
      key: "DigitalTransformation",
    },
    {
      label: "Economic Empowerment",
      key: "EconomicEmpowerment",
    },
    {
      label: "Health and Well-being",
      key: "HealthandWellbeing",
    },
    {
      label: "Quality Education",
      key: "QualityEducation",
    },
    {
      label: "Smart and Resilient Communities",
      key: "SmartandResilientCommunities",
    },
    {
      label: "Sustainable Development and Environment",
      key: "SustainableDevelopmentandEnvironment",
    },
    {
      label: "Others",
      key: "OTHERS",
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
      "#dda0dd",
    ],
    labels: [
      "Agriculture and Rural Development",
      "Digital Transformation",
      "Economic Empowerment",
      "Health and Well-being",
      "Quality Education",
      "Smart and Resilient Communities",
      "Sustainable Development and Environment",
      "Others",
    ],
    series: [
      totalCount.AgricultureandRuralDevelopment,
      totalCount.DigitalTransformation,
      totalCount.EconomicEmpowerment,
      totalCount.HealthandWellbeing,
      totalCount.QualityEducation,
      totalCount.SmartandResilientCommunities,
      totalCount.SustainableDevelopmentandEnvironment,
      totalCount.OTHERS,
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
                        <h4 className="card-title mb-0">
                          Data Analytics
                        </h4>
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
                                  #Agriculture and Rural Development
                                </th>
                                <th
                                  style={{
                                    whiteSpace: "wrap",
                                    color: "#36A2EB",
                                  }}
                                >
                                  #Digital Transformation
                                </th>
                                <th
                                  style={{
                                    whiteSpace: "wrap",
                                    color: "#36A2EB",
                                  }}
                                >
                                  #Economic Empowerment
                                </th>
                                <th
                                  style={{
                                    whiteSpace: "wrap",
                                    color: "#36A2EB",
                                  }}
                                >
                                  #Health and Well-being
                                </th>

                                <th
                                  style={{
                                    whiteSpace: "wrap",
                                    color: "#36A2EB",
                                  }}
                                >
                                  #Quality Education{" "}
                                </th>

                                <th
                                  style={{
                                    whiteSpace: "wrap",
                                    color: "#36A2EB",
                                    fontWeight: "bold",
                                  }}
                                >
                                  #Smart and Resilient Communities
                                </th>
                                <th
                                  style={{
                                    whiteSpace: "wrap",
                                    color: "#36A2EB",
                                  }}
                                >
                                  #Sustainable Development and Environment
                                </th>

                                <th
                                  style={{
                                    whiteSpace: "wrap",
                                    color: "#36A2EB",
                                    fontWeight: "bold",
                                  }}
                                >
                                  #Others
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
                                    {item.AgricultureandRuralDevelopment}
                                  </td>{" "}
                                  <td>{item.DigitalTransformation}</td>
                                  <td>{item.EconomicEmpowerment}</td>
                                  <td>{item.HealthandWellbeing}</td>
                                  <td>{item.QualityEducation}</td>
                                  <td>
                                    {item.SmartandResilientCommunities}
                                  </td>{" "}
                                  <td>
                                    {item.SustainableDevelopmentandEnvironment}
                                  </td>
                                  <td>{item.OTHERS}</td>
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
                                  {totalCount.AgricultureandRuralDevelopment}
                                </td>
                                <td style={{ color: "crimson" }}>
                                  {totalCount.DigitalTransformation}
                                </td>
                                <td style={{ color: "crimson" }}>
                                  {totalCount.EconomicEmpowerment}
                                </td>{" "}
                                <td style={{ color: "crimson" }}>
                                  {totalCount.HealthandWellbeing}
                                </td>
                                <td style={{ color: "crimson" }}>
                                  {totalCount.QualityEducation}
                                </td>
                                <td style={{ color: "crimson" }}>
                                  {totalCount.SmartandResilientCommunities}
                                </td>{" "}
                                <td style={{ color: "crimson" }}>
                                  {
                                    totalCount.SustainableDevelopmentandEnvironment
                                  }
                                </td>
                                <td style={{ color: "crimson" }}>
                                  {totalCount.OTHERS}
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
