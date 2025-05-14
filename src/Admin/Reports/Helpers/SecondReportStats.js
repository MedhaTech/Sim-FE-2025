/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Table } from "reactstrap";
import { CSVLink } from "react-csv";
import {
  getCurrentUser,
} from "../../../helpers/Utils";

import { ArrowRight } from "feather-icons-react/build/IconComponents";
import { useDispatch, useSelector } from "react-redux";
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
import Check from "./Check";

const SecondReportStats = () => {
  const navigate = useNavigate();

  const [chartTableData, setChartTableData] = useState([]);
  const csvLinkRefTable = useRef();

  const dispatch = useDispatch();
  const currentUser = getCurrentUser("current_user");
  const [registeredGenderChartData, setRegisteredGenderChartData] =
    useState(null);
  const [registeredChartData, setRegisteredChartData] = useState(null);

  const [newFormat, setNewFormat] = useState("");
  const [series1, setseries1] = useState([]);
  const [series2, setseries2] = useState([]);
  const [barChart1Data, setBarChart1Data] = useState({
    labels: [],
    datasets: [],
  });
  const [isloader, setIsloader] = useState(false);

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
    },
  ];

  useEffect(() => {
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

  const fetchChartTableData = () => {
    const config = {
      method: "get",
      url:
        process.env.REACT_APP_API_BASE_URL_FOR_REPORTS +
        "/reports/mentorsummary",
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
          const formattedData = chartTableData.map((item) => ({
            ...item,
            total: `${
              item.ATL_Reg_Count + item.NONATL_Reg_Count + item.Others_Reg_Count
            }`,
          }));
          setDownloadTableData(formattedData);

          const lastRow = chartTableData[chartTableData.length - 1];
          const maleCount = lastRow?.Male || 0;
          const othersCount = lastRow?.others || 0;

          const femaleCount = lastRow?.Female || 0;
          const ATLregCount = lastRow?.ATL_Reg_Count || 0;
          const NONATLregNotCount = lastRow?.NONATL_Reg_Count || 0;
          const OthersRegCount = lastRow?.Others_Reg_Count || 0;

          setRegisteredGenderChartData({
            labels: ["Male Teachers", "Female Teachers", "Others"],
            datasets: [
              {
                data: [maleCount, femaleCount, othersCount],
                backgroundColor: ["#8bcaf4", "#ff99af", "#A0522D"],
                hoverBackgroundColor: ["#36A2EB", "#FF6384", "#8B4513"],
              },
            ],
          });

          setRegisteredChartData({
            labels: [
              "ATL Teachers Registered",
              "NON ATL Teachers Registered",
              "Others Teachers Registered",
            ],
            datasets: [
              {
                data: [ATLregCount, NONATLregNotCount, OthersRegCount],
                backgroundColor: ["#85e085", "#ffcc80", "#A0522D"],
                hoverBackgroundColor: ["#33cc33", "#ffa31a", "#8B4513"],
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
              },
            ],
          };
          setBarChart1Data(barData);
          setseries1(barData.datasets[2].data);
          setseries2(barData.datasets[1].data);
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
                              Overall Registered ATL vs Non ATL vs Other
                              Teachers As of {newFormat}
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
                              Overall Registered Female vs Male vs Other
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
                              <th
                                style={{
                                  whiteSpace: "wrap",
                                  color: "#36A2EB",
                                  fontWeight: "bold",
                                }}
                              >
                                #
                              </th>
                              <th
                                style={{
                                  whiteSpace: "wrap",
                                  color: "#36A2EB",
                                  fontWeight: "bold",
                                }}
                              >
                                State Name
                              </th>
                              <th
                                style={{
                                  whiteSpace: "wrap",
                                  color: "#36A2EB",
                                  fontWeight: "bold",
                                }}
                              >
                                Schools in DB{" "}
                                <FontAwesomeIcon icon={faSchool} />
                              </th>
                              <th
                                style={{
                                  whiteSpace: "wrap",
                                  color: "#36A2EB",
                                  fontWeight: "bold",
                                }}
                              >
                                Registered Schools
                              </th>
                              <th
                                style={{
                                  whiteSpace: "wrap",
                                  color: "#36A2EB",
                                  fontWeight: "bold",
                                }}
                              >
                                ATL Teachers
                              </th>
                              <th
                                style={{
                                  whiteSpace: "wrap",
                                  color: "#36A2EB",
                                  fontWeight: "bold",
                                }}
                              >
                                Non-ATL Teachers
                              </th>
                              <th
                                style={{
                                  whiteSpace: "wrap",
                                  color: "#36A2EB",
                                  fontWeight: "bold",
                                }}
                              >
                                Others Teachers
                              </th>
                              <th
                                style={{
                                  whiteSpace: "wrap",
                                  color: "#36A2EB",
                                  fontWeight: "bold",
                                }}
                              >
                                Total Teachers
                              </th>
                              <th
                                style={{
                                  whiteSpace: "wrap",
                                  color: "#36A2EB",
                                  fontWeight: "bold",
                                }}
                              >
                                <FontAwesomeIcon icon={faMale} />
                                Male
                              </th>
                              <th
                                style={{
                                  whiteSpace: "wrap",
                                  color: "#36A2EB",
                                  fontWeight: "bold",
                                }}
                              >
                                <FontAwesomeIcon icon={faFemale} />
                                Female
                              </th>
                              <th
                                style={{
                                  whiteSpace: "wrap",
                                  color: "#36A2EB",
                                  fontWeight: "bold",
                                }}
                              >
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
                                    color: "crimson",
                                  }}
                                >
                                  {item.state}
                                </td>
                                <td>{item.Eligible_school}</td>
                                <td>{item.reg_school}</td>
                                <td>{item.ATL_Reg_Count}</td>
                                <td>{item.NONATL_Reg_Count}</td>
                                <td>{item.Others_Reg_Count}</td>

                                <td>
                                  {item.ATL_Reg_Count +
                                    item.NONATL_Reg_Count +
                                    item.Others_Reg_Count}
                                </td>
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
                    Registered Schools As of {newFormat}
                  </h5>
                </div>
                <div className="card-body">
                  <div id="s-col-stacked" />
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
        ) : (
          <div className="spinner-border text-info" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}

        {downloadTableData && (
          <CSVLink
            data={downloadTableData}
            headers={summaryHeaders}
            filename={`TeacherRegistrationSummaryTable_${newFormat}.csv`}
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
export default SecondReportStats;
