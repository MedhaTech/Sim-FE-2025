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
      console.log("Performing operation with the updated data.");
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
                  </div>
                </div>
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
