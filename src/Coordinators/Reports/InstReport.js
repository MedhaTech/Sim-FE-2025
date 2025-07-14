/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Table } from "reactstrap";
import { Button } from "../../stories/Button";
import { CSVLink } from "react-csv";
import { getCurrentUser } from "../../helpers/Utils";
import { useNavigate, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Select from "./Select";
import axios from "axios";
import { notification } from "antd";
import { encryptGlobal } from "../../constants/encryptDecrypt";
import { stateList, districtList } from "../../RegPage/ORGData";

import { openNotificationWithIcon } from "../../helpers/Utils";

const TeacherProgressDetailed = () => {
  const navigate = useNavigate();
  const [district, setdistrict] = React.useState("");
  const currentUser = getCurrentUser("current_user");

  const [selectstate, setSelectState] = React.useState(
    currentUser?.data[0]?.state_name
  );
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
 
  const [chartTableData, setChartTableData] = useState([]);
  const [chartTableData1, setChartTableData1] = useState([]);

  const [downloadComplete, setDownloadComplete] = useState(false);
  const [registeredGenderChartData, setRegisteredGenderChartData] =
    useState(null);
 
  const fullStatesNames = newstateList;
  const allDistricts = {
    "All Districts": [...Object.values(districtList).flat()],
    ...districtList,
  };
  const fiterDistData = ["All Districts", ...(allDistricts[selectstate] || [])];
  const [instType, setInstType] = useState([]);


 
  const summaryHeaders = [
    {
      label: "UDISE Code",
      key: "organization_code",
    },
   
   
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
      label: 'Mandal / Taluka',
      key: 'mandal'
    }, {
      label: 'School Type',
      key: 'school_type'
    },
    {
      label: 'School Board',
      key: 'board'
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
    },
    {
      label: "No of teachers registered",
      key: "mentor_reg",
    },
  ];
 
  useEffect(() => {
    fetchChartTableData();
    const newDate = new Date();
    const formattedDate = `${newDate.getUTCDate()}/${1 + newDate.getMonth()
      }/${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`;
    setNewFormat(formattedDate);
  }, []);
  const fetchChartTableData = () => {
    const staParam = encryptGlobal(
      JSON.stringify({
        state: currentUser?.data[0]?.state_name,
      })
    );
    const config = {
      method: "get",
      url:
        process.env.REACT_APP_API_BASE_URL_FOR_REPORTS +
        `/reports/schoolcategorylistreport?Data=${staParam}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.data[0]?.token}`,
      },
    };

    axios(config)
      .then((response) => {
        if (response.status === 200) {
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
          const modifiedChartTableData = chartTableData.map((item) => ({
            ...item,
            registration_status: item.mentor_reg !== 0 ? "Registered" : "Not Registered",
          }));
          
          setDownloadTableData(modifiedChartTableData);
          setChartTableData(modifiedChartTableData);

          setDownloadTableData(modifiedChartTableData);

          if (response?.data?.count > 0) {
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
      csvLinkRef.current.link.click();
    }
  }, [chartTableData]);

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
              <h4>School Registration Report</h4>
              <h6>List of overall Schools & its registration status</h6>
            </div>
          </div>
         
        </div>

        <Container className="RegReports userlist">
          <div className="reports-data mt-2 mb-2">
            <Row className="align-items-center mt-3 mb-2">
              <Col md={3}>
                <div className="my-2 d-md-block d-flex justify-content-center">
                  <p>{selectstate}</p>
                 
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

export default TeacherProgressDetailed;
