/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Table } from "reactstrap";
import { CSVLink } from "react-csv";
import {
  openNotificationWithIcon,
  getCurrentUser,
} from "../../../helpers/Utils";
import DataTableExtensions from "react-data-table-component-extensions";
import DataTable, { Alignment } from "react-data-table-component";
import Select from "../Helpers/Select";
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
import { notification } from "antd";
import { encryptGlobal } from "../../../constants/encryptDecrypt";
import { stateList, districtList } from "../../../RegPage/ORGData";

import Check from "./Check";
import SecondReportStats from "./SecondReportStats";

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
  const categoryDataTn = ["All Categories", "HSS", "HS", "Non ATL"];
  const [showCustomization, setShowCustomization] = useState(false);
  const [savedReports, setSavedReports] = useState([]);
  const [savedReports1, setSavedReports1] = useState([]);

  const csvSavedRef = useRef();
  const csvSavedRef1 = useRef();

  useEffect(() => {
    setRegTeachersdistrict("");
  }, [RegTeachersState]);

  const newstateList = ["All States", ...stateList];

  const [downloadData, setDownloadData] = useState(null);
  const [downloadNotRegisteredData, setDownloadNotRegisteredData] =
    useState(null);
  const csvLinkRef = useRef();
  const csvLinkRefNotRegistered = useRef();
  const currentUser = getCurrentUser("current_user");

  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [newFormat, setNewFormat] = useState("");

  const fullStatesNames = newstateList;
  const allDistricts = {
    "All Districts": [...Object.values(districtList).flat()],
    ...districtList,
  };
  const fiterDistData = [
    "All Districts",
    ...(allDistricts[RegTeachersState] || []),
  ];

  const RegHeaders = [
    {
      label: "UDISE CODE",
      key: "organization.organization_code",
    },

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
    { label: "Mandal / Taluka", key: "organization.mandal" },
    { label: "School Type", key: "organization.school_type" },
    { label: "School Board", key: "organization.board" },
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
  const labelToKeyMap = RegHeaders.reduce((acc, header) => {
    acc[header.label] = header.key;
    return acc;
  }, {});

  const notRegHeaders = [
    {
      label: "UDISE CODE",
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
    { label: "Mandal / Taluka", key: "mandal" },
    { label: "School Type", key: "school_type" },
    { label: "School Board", key: "board" },
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
  const labelToKeyMap1 = {
    "UDISE CODE": "organization_code",
    "School Name": "organization_name",
    "School Category": "category",
    State: "state",
    District: "district",
    "Mandal / Taluka": "mandal",
    "School Type": "school_type",
    "School Board": "board",
    City: "city",
    "Pin code": "pin_code",
    Address: "address",
    Country: "country",
    "HM Name": "principal_name",
    "HM Contact": "principal_mobile",
    "HM Email": "principal_email",
  };

  const NotReglabels = notRegHeaders.map((header) => header.label);
  const Reglabels = RegHeaders.map((header) => header.label);

  const [clickedValue, setclickedValue] = useState({});
  const [selectedValue, setselectedValue] = useState([]);

  useEffect(() => {
    const allLabels =
      filterType === "Not Registered" ? NotReglabels : Reglabels;

    if (clickedValue.name === "Select ALL") {
      setselectedValue(
        selectedValue.length === allLabels.length ? [] : allLabels
      );
    } else if (clickedValue.name && clickedValue.name !== "Select ALL") {
      setselectedValue((prev) => prev.filter((item) => item !== "Select ALL"));
    }
  }, [clickedValue, filterType]);

  useEffect(() => {
    setselectedValue([]);
    setclickedValue({});
  }, [filterType]);

  const enable =
    RegTeachersState?.trim() !== "" &&
    RegTeachersdistrict?.trim() !== "" &&
    filterType?.trim() !== "" &&
    category?.trim() !== "";
  const [filterheaders, setfilterheaders] = useState([]);
  const handleDownload = () => {
    if (!RegTeachersState || !RegTeachersdistrict || !filterType || !category) {
      notification.warning({
        message:
          "Select state, district, filters, category to download report.",
      });
      return;
    }
    if (filterType === "Not Registered") {
      setfilterheaders(
        notRegHeaders
          .filter((header) => selectedValue.includes(header.label))
          .map((header) => header)
      );
    }
    if (filterType === "Registered") {
      setfilterheaders(
        RegHeaders.filter((header) => selectedValue.includes(header.label)).map(
          (header) => header
        )
      );
    }
    setIsDownloading(true);
  };

  const handleCustom = () => {
    if (filterType === "Not Registered" && filteresData.length <= 0) {
      fetchData(filterType);
    }
    if (filterType === "Registered" && filteredData.length <= 0) {
      fetchData(filterType);
    }
    if (filteresData.length > 0) {
      setShowCustomization(!showCustomization);
    }
    if (filteredData.length > 0) {
      setShowCustomization(!showCustomization);
    }
  };

  useEffect(() => {
    setFilteredData([]);
    setFilteresData([]);
    setfilterheaders([]);
    setShowCustomization(false);
  }, [RegTeachersState, RegTeachersdistrict, filterType, category]);

  const fetchData = (item) => {
   // This function filters  data based on selected state, district, category

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
      url: process.env.REACT_APP_API_BASE_URL_FOR_REPORTS + url,
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
              setShowCustomization(!showCustomization);
            } else {
              openNotificationWithIcon("error", "No Data Found");
            }
          } else if (item === "Not Registered") {
            setFilteresData(response?.data?.data || []);
            setDownloadNotRegisteredData(response?.data?.data || []);

            if (response?.data.count > 0) {
              setShowCustomization(!showCustomization);
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

  useEffect(() => {
    if (filteredData.length > 0 && filterheaders.length > 0) {
      setDownloadData(filteredData);
      csvLinkRef.current.link.click();
      openNotificationWithIcon(
        "success",
        `${filterType} Report Downloaded Successfully`
      );
    }
    if (filteresData.length > 0 && filterheaders.length > 0) {
      setDownloadNotRegisteredData(filteresData);
      csvLinkRefNotRegistered.current.link.click();
      openNotificationWithIcon(
        "success",
        `${filterType} Report Downloaded Successfully`
      );
    }
  }, [filteredData, filteresData, filterheaders]);

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

  const [showPopup, setShowPopup] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleSaveReport = async (filterType) => {
    // This function filters the data and saves the FilterType report
    
    const pattern = /^[a-zA-Z0-9 \-()&.,_]*$/;
    if (pattern.test(inputValue) && inputValue !== "") {
      const body = JSON.stringify({
        report_type:
          filterType === "Not Registered"
            ? "teacher-not-registered-registration-report"
            : "teacher-registration-report",

        filters: JSON.stringify({
          state: RegTeachersState,
          district: RegTeachersdistrict,
          category: category,
        }),
        columns: JSON.stringify(selectedValue),
        report_name: inputValue,
        status: "ACTIVE",
      });
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/report_files`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser?.data[0]?.token}`,
          },
        }
      );
      if (response.status === 201) {
        openNotificationWithIcon("success", "Report Format Saved Successfully");
        setShowPopup(false);
        setInputValue("");
        if (filterType === "Not Registered") {
          fetchSavedReportsData1();
        } else {
          fetchSavedReportsData();
        }
      } else {
        openNotificationWithIcon("error", "Opps! Something Wrong");
        setShowPopup(false);
        setInputValue("");
      }
    } else {
      setError("Please Enter Valid Name");
    }
  };
  const [reportFileslist, setReportFileslist] = useState([]);
  const [reportFileslist1, setReportFileslist1] = useState([]);

  useEffect(() => {
    fetchSavedReportsData();
    fetchSavedReportsData1();
  }, []);
  const fetchSavedReportsData1 = () => {
    // this function fetches all saved reports list from the API

    const apiRes = encryptGlobal(
      JSON.stringify({
        report_type: "teacher-not-registered-registration-report",
      })
    );
    const config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + `/report_files?Data=${apiRes}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.data[0]?.token}`,
      },
    };
    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          setReportFileslist1(response?.data?.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const fetchSavedReportsData = () => {
    // this function fetches all saved reports list from the API

    const apiRes = encryptGlobal(
      JSON.stringify({
        report_type: "teacher-registration-report",
      })
    );
    const config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + `/report_files?Data=${apiRes}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.data[0]?.token}`,
      },
    };
    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          setReportFileslist(response?.data?.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // new code //
  const [istabledownloadclicked, setistabledownloadclicked] = useState(false);
  const [savedHeader, setSavedHeader] = useState();
  const [savedHeader1, setSavedHeader1] = useState();

  const handleReportfileDownload = (data) => {
    let columnKeys = [];
    try {
      columnKeys = data.columns ? JSON.parse(data.columns) : [];
    } catch (err) {
      console.error("Error parsing columns:", err);
    }
    const mappedColumnKeys = columnKeys.map((label) => labelToKeyMap[label]);


    const headerList =
      data.report_type === "teacher-registration-report"
        ? RegHeaders
        : notRegHeaders;

    const filteredHeaders = headerList.filter((header) =>
      mappedColumnKeys.includes(header.key)
    );

    setSavedHeader(filteredHeaders);
    fetchDataDownloadApi(data.report_type, data.filters);
    setistabledownloadclicked(true);
  };

  const handleReportfileDownload1 = (data) => {
    let columnKeys = [];
    try {
      columnKeys = data.columns ? JSON.parse(data.columns) : [];
    } catch (err) {
      console.error("Error parsing columns:", err);
    }
    const mappedColumnKeys1 = columnKeys.map((label) => labelToKeyMap1[label]);


    const headerList =
      data.report_type === "teacher-not-registered-registration-report"
        ? notRegHeaders
        : RegHeaders;

    const filteredHeaders = headerList.filter((header) =>
      mappedColumnKeys1.includes(header.key)
    );
    setSavedHeader1(filteredHeaders);
    fetchDataDownloadApi1(data.report_type, data.filters);

    setistabledownloadclicked(true);
  };
  const fetchDataDownloadApi1 = (item, param) => {
    const apiRes = encryptGlobal(param);

    const config = {
      method: "get",
      url:
        process.env.REACT_APP_API_BASE_URL_FOR_REPORTS +
        `/reports/notRegistered?Data=${apiRes}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.data[0]?.token}`,
      },
    };
    axios(config)
      .then((response) => {
        if (response.status === 200) {
          if (item === "teacher-not-registered-registration-report") {
            setFilteresData(response?.data?.data || []);
            setDownloadNotRegisteredData(response?.data?.data || []);
            setSavedReports1(response?.data?.data || []);
          }

          setIsDownloading(false);
        }
      })
      .catch((error) => {
        console.log("API error:", error);
        setIsDownloading(false);
      });
  };
  const fetchDataDownloadApi = (item, param) => {
    const apiRes = encryptGlobal(param);

    const config = {
      method: "get",
      url:
        process.env.REACT_APP_API_BASE_URL_FOR_REPORTS +
        `/reports/mentorRegList?Data=${apiRes}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.data[0]?.token}`,
      },
    };
    axios(config)
      .then((response) => {
        if (response.status === 200) {
          if (item === "teacher-registration-report") {
            setFilteredData(response?.data?.data || []);
            setDownloadData(response?.data?.data || []);
            setSavedReports(response?.data?.data || []);
          }

          setIsDownloading(false);
        }
      })
      .catch((error) => {
        console.log("API error:", error);
        setIsDownloading(false);
      });
  };
  useEffect(() => {
    if (savedReports.length > 0 && istabledownloadclicked) {
      csvSavedRef.current.link.click();
      setistabledownloadclicked(false);
    }
  }, [savedReports, savedHeader]);
  useEffect(() => {
    if (savedReports1.length > 0 && istabledownloadclicked) {
      csvSavedRef1.current.link.click();
      setistabledownloadclicked(false);
    }
  }, [savedReports1, savedHeader]);

  const handleReportfileDelete = (data) => {
    // this function fetches delete reports  from the API

    const idparm = encryptGlobal(JSON.stringify(data.report_file_id));
    const config = {
      method: "delete",
      url: process.env.REACT_APP_API_BASE_URL + `/report_files/${idparm}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.data[0]?.token}`,
      },
    };
    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          openNotificationWithIcon("success", "Deleted Successfully");
          fetchSavedReportsData();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleReportfileDelete1 = (data) => {
    // this function fetches delete reports  from the API

    const idparm = encryptGlobal(JSON.stringify(data.report_file_id));
    const config = {
      method: "delete",
      url: process.env.REACT_APP_API_BASE_URL + `/report_files/${idparm}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.data[0]?.token}`,
      },
    };
    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          openNotificationWithIcon("success", "Deleted Successfully");
          fetchSavedReportsData1();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const allHeaders = filterType === "Registered" ? RegHeaders : notRegHeaders;

  const resData = {
    data: reportFileslist && reportFileslist.length > 0 ? reportFileslist : [],
    columns: [
      {
        name: "No",
        selector: (row, key) => key + 1,
        sortable: true,
        width: "6rem",
      },
      {
        name: "Report Name",
        selector: (row) => row.report_name,
        sortable: true,
        width: "10rem",
      },
      {
        name: "State",
        selector: (row) => {
          const fileter = JSON.parse(row.filters);
          return fileter.state;
        },
        sortable: true,
        width: "9rem",
      },
      {
        name: "District",
        selector: (row) => {
          const fileter = JSON.parse(row.filters);
          return fileter.district;
        },
        sortable: true,
        width: "9rem",
      },
      {
        name: "Category",
        selector: (row) => {
          const fileter = JSON.parse(row.filters);
          return fileter.category;
        },
        sortable: true,
        width: "8rem",
      },

      {
        name: "Columns",
        cell: (row) => {
          const columnKeys = JSON.parse(row.columns);
          const displayLabels = columnKeys.map((key) => {
            const match = allHeaders.find((header) => header.key === key);
            return match ? match.label : key;
          });

          return (
            <div
              style={{
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
              }}
            >
              {displayLabels.join(", ")}
            </div>
          );
        },
        width: "30rem",
      },

      {
        name: "Actions",
        width: '15rem',
        center: true,
        cell: (record) => [
          <>
            <div
              key={record}
              onClick={() => handleReportfileDownload(record)}
              style={{ marginRight: "12px" }}
            >
              <div className="btn btn-primary btn-sm mx-2">Download</div>
            </div>

            <div
              key={record}
              onClick={() => handleReportfileDelete(record)}
              style={{ marginRight: "12px" }}
            >
              <div className="btn btn-danger btn-sm mx-2">DELETE</div>
            </div>
          </>,
        ],
      },
    ],
  };
  const resData1 = {
    data:
      reportFileslist1 && reportFileslist1.length > 0 ? reportFileslist1 : [],
    columns: [
      {
        name: "No",
        selector: (row, key) => key + 1,
        sortable: true,
        width: "6rem",
      },
      {
        name: "Report Name",
        selector: (row) => row.report_name,
        sortable: true,
        width: "10rem",
      },
      {
        name: "State",
        selector: (row) => {
          const fileter = JSON.parse(row.filters);
          return fileter.state;
        },
        sortable: true,
        width: "9rem",
      },
      {
        name: "District",
        selector: (row) => {
          const fileter = JSON.parse(row.filters);
          return fileter.district;
        },
        sortable: true,
        width: "9rem",
      },
      {
        name: "Category",
        selector: (row) => {
          const fileter = JSON.parse(row.filters);
          return fileter.category;
        },
        sortable: true,
        width: "8rem",
      },

      {
        name: "Columns",
        cell: (row) => {
          const columnKeys = JSON.parse(row.columns);
          const displayLabels = columnKeys.map((key) => {
            const match = allHeaders.find((header) => header.key === key);
            return match ? match.label : key;
          });

          return (
            <div
              style={{
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
              }}
            >
              {displayLabels.join(", ")}
            </div>
          );
        },
        width: "15rem",
      },

      {
        name: "Actions",
        width: '15rem',
        center: true,
        cell: (record) => [
          <>
            <div
              key={record}
              onClick={() => handleReportfileDownload1(record)}
              style={{ marginRight: "12px" }}
            >
              <div className="btn btn-primary btn-sm mx-2">Download</div>
            </div>

            <div
              key={record}
              onClick={() => handleReportfileDelete1(record)}
              style={{ marginRight: "12px" }}
            >
              <div className="btn btn-danger btn-sm mx-2">DELETE</div>
            </div>
          </>,
        ],
      },
    ],
  };
  const customStyles = {
    head: {
      style: {
        fontSize: "1em", // Adjust as needed
      },
    },
  };
  return (
    <div className="page-wrapper">
      <h4
        className="m-2"
        style={{
          position: "sticky",
          top: "70px",
          zIndex: 1000,
          padding: "10px",
          backgroundColor: "white",
          display: "inline-block",
          color: "#fe9f43",
          fontSize: "16px",
        }}
      >
        Reports
      </h4>
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>2. Teacher Registration Report</h4>
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

              <Col md={2}>
                <button
                  onClick={() => {
                    handleCustom();
                    setselectedValue([]);
                  }}
                  type="button"
                  disabled={!enable}
                  className="btn btn-primary"
                >
                  Customization
                </button>
              </Col>

              {showCustomization && (
                <div className="card mt-3">
                  <div className="card-body">
                    <div className="row align-items-center mb-3">
                      <div className="col-md-3">
                        <h5 className="card-title mb-0">Select Columns</h5>
                      </div>
                      <div className="col-md-3">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="selectAll"
                            style={{ transform: "scale(0.9)" }}
                            checked={
                              selectedValue.length > 0 &&
                              (filterType === "Not Registered"
                                ? NotReglabels.every((val) =>
                                    selectedValue.includes(val)
                                  )
                                : Reglabels.every((val) =>
                                    selectedValue.includes(val)
                                  ))
                            }
                            onChange={() =>
                              setclickedValue({ name: "Select ALL" })
                            }
                          />
                          <label
                            className="form-check-label ms-2"
                            htmlFor="selectAll"
                          >
                            Select ALL
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <Check
                        list={
                          filterType === "Not Registered"
                            ? NotReglabels
                            : Reglabels
                        }
                        value={selectedValue}
                        setValue={setselectedValue}
                        selValue={setclickedValue}
                      />
                    </div>

                    <button
                      className="btn btn-danger mt-3"
                      onClick={async () => {
                        setShowCustomization(false);
                        handleDownload();
                      }}
                      disabled={selectedValue.length === 0}
                    >
                      Download Report
                    </button>
                    <button
                      className="btn btn-info mt-3"
                      style={{ marginLeft: "1rem" }}
                      onClick={() => {
                        setShowPopup(true);
                      }}
                      disabled={selectedValue.length === 0}
                    >
                      Save Format
                    </button>
                  </div>
                </div>
              )}
              {showPopup && (
                <div
                  onClick={() => setShowPopup(false)}
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 9999,
                  }}
                >
                  <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      position: "relative",
                      background: "white",
                      padding: "20px",
                      borderRadius: "8px",
                      minWidth: "400px",
                      textAlign: "center",
                    }}
                  >
                    <button
                      onClick={() => setShowPopup(false)}
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        background: "transparent",
                        border: "none",
                        fontSize: "20px",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      ×
                    </button>

                    <h5 style={{ margin: "1rem" }}>
                      Enter Report Name to Save
                    </h5>
                    <p style={{ color: "black", fontWeight: "bold" }}>
                      Allowed Characters : A-Z, a-z, 0-9, -, _, (, ), &, ., and ,
                    </p>

                    <input
                      type="text"
                      value={inputValue}
                      placeholder="Enter Report Name"
                      onChange={handleInputChange}
                      style={{
                        width: "100%",
                        padding: "8px",
                        marginBottom: "12px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                      }}
                    />
                    {error && (
                      <div
                        style={{
                          color: "red",
                          marginBottom: "10px",
                          fontSize: "14px",
                        }}
                      >
                        {error}
                      </div>
                    )}
                    <button
                      className="btn btn-primary m-2"
                      // onClick={handleSaveReport}
                      onClick={() => handleSaveReport(filterType)}
                    >
                      OK
                    </button>
                  </div>
                </div>
              )}
              <div>
                <h5 className="mt-2">Teacher Registered List</h5>
                <DataTableExtensions
                  print={false}
                  export={false}
                  {...resData}
                  exportHeaders
                >
                  <DataTable
                    defaultSortField="id"
                    defaultSortAsc={false}
                    customStyles={customStyles}
                    pagination
                    highlightOnHover
                    fixedHeader
                    subHeaderAlign={Alignment.Center}
                  />
                </DataTableExtensions>
              </div>
              {savedReports && (
                <CSVLink
                  data={savedReports}
                  headers={savedHeader}
                  filename={`Teacher_Register_Report_${newFormat}.csv`}
                  className="hidden"
                  ref={csvSavedRef}
                >
                  Download Table CSV
                </CSVLink>
              )}
              <div>
                <h5 className="mt-2">Teacher Not Registered List</h5>
                <DataTableExtensions
                  print={false}
                  export={false}
                  {...resData1}
                  exportHeaders
                >
                  <DataTable
                    defaultSortField="id"
                    defaultSortAsc={false}
                    customStyles={customStyles}
                    pagination
                    highlightOnHover
                    fixedHeader
                    subHeaderAlign={Alignment.Center}
                  />
                </DataTableExtensions>
              </div>
              {savedReports1 && (
                <CSVLink
                  data={savedReports1}
                  headers={savedHeader1}
                  className="hidden"
                  filename={`Teacher_Not_Registere_Report_${newFormat}.csv`}
                  ref={csvSavedRef1}
                >
                  Download Table CSV
                </CSVLink>
              )}
            </Row>
            <SecondReportStats />

            {downloadData && (
              <CSVLink
                data={downloadData}
                headers={filterheaders}
                filename={`Teacher_${filterType}Report_${newFormat}.csv`}
                className="hidden"
                ref={csvLinkRef}
              >
                Download CSV
              </CSVLink>
            )} 
            {downloadNotRegisteredData && (
              <CSVLink
                data={downloadNotRegisteredData}
                headers={filterheaders}
                filename={`Teacher_${filterType}Report_${newFormat}.csv`}
                className="hidden"
                ref={csvLinkRefNotRegistered}
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
