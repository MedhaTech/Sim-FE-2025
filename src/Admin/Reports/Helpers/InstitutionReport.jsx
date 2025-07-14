/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Table } from "reactstrap";
import { Button } from "../../../stories/Button";
import { CSVLink } from "react-csv";
import { getCurrentUser } from "../../../helpers/Utils";
import { useNavigate, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Select from "./Select";
import axios from "axios";

import { encryptGlobal } from "../../../constants/encryptDecrypt";
import { stateList, districtList } from "../../../RegPage/ORGData";

import { openNotificationWithIcon } from "../../../helpers/Utils";
import DataTableExtensions from 'react-data-table-component-extensions';
import DataTable, { Alignment } from 'react-data-table-component';

const InstitutionReport = () => {
  const navigate = useNavigate();
  const [district, setdistrict] = React.useState("");
  const currentUser = getCurrentUser("current_user");

  const [selectstate, setSelectState] = React.useState("");
  useEffect(() => {
    setdistrict("");
  }, [selectstate]);
  const [category, setCategory] = useState("");
  const [isDownload, setIsDownload] = useState(false);
  const categoryData = ["All Categories", "ATL", "Non ATL"];
  const categoryDataTn = ["All Categories", "HSS", "HS", "Non ATL"];
  const newstateList = ["All States", ...stateList];

  
  const [isCustomizationEnabled, setIsCustomizationEnabled] = useState(false);
  const csvLinkRef = useRef();
  const csvSavedRef = useRef();
  const dispatch = useDispatch();
  const [combinedArray, setCombinedArray] = useState([]);
  const [downloadTableData, setDownloadTableData] = useState([]);

  const [newFormat, setNewFormat] = useState("");

 
  const [modifiedChartTableData, setModifiedChartTableData] = useState([]);
  const [savedReports, setSavedReports] = useState([]);

  const fullStatesNames = newstateList;
  const allDistricts = {
    "All Districts": [...Object.values(districtList).flat()],
    ...districtList,
  };
  const fiterDistData = ["All Districts", ...(allDistricts[selectstate] || [])];

  const [showCustomization, setShowCustomization] = useState(false);
  const [selectedHeaders, setSelectedHeaders] = useState([]);
  const [isReadyToDownload, setIsReadyToDownload] = useState(false);
  const [formattedDataForDownload, setFormattedDataForDownload] = useState([]);
  const [hasData, setHasData] = useState(false);
  const [customizationActive, setCustomizationActive] = useState(false);
  const allHeaders = [
    { label: "UDISE Code", key: "organization_code" },
    { label: "School Name", key: "organization_name" },
    { label: "School Category", key: "category" },
    { label: "State", key: "state" },
    { label: "District", key: "district" },
    { label: "Mandal / Taluka", key: "mandal" },
    { label: "School Type", key: "school_type" },
    { label: "School Board", key: "board" },
    { label: "City", key: "city" },
    { label: "Address", key: "address" },
    { label: "Pin Code", key: "pin_code" },
    { label: "Principal Name", key: "principal_name" },
    { label: "Principal Mobile", key: "principal_mobile" },
    { label: "Principal Email", key: "principal_email" },
    { label: "Registration Status", key: "registration_status" },
    { label: "No of Teachers Registered", key: "mentor_reg" },
  ];
  const headerMapping = {
    organization_code: "UDISE Code",
    organization_name: "School Name",
    category: "School Category",
    state: "State",
    district: "District",
    mandal: "Mandal / Taluka",
    school_type: "School Type",
    board: "School Board",
    city: "City",
    address: "Address",
    pin_code: "Pin Code",
    principal_name: "Principal Name",
    principal_mobile: "Principal Mobile",
    principal_email: "Principal Email",
    registration_status: "Registration Status",
    mentor_reg: "No of Teachers Registered",
  };

  const handleCheckboxChange = (key) => {
    setSelectedHeaders((prevHeaders) => {
      let updatedHeaders;
      if (prevHeaders.includes(key)) {
        updatedHeaders = prevHeaders.filter((header) => header !== key);
      } else {
        updatedHeaders = [...prevHeaders, key];
      }
      filterData(updatedHeaders);
      return updatedHeaders;
    });
  };

  const handleSelectAll = () => {
    setSelectedHeaders((prevHeaders) => {
      const updatedHeaders =
        prevHeaders.length === allHeaders.length
          ? []
          : allHeaders.map((h) => h.key);
      filterData(updatedHeaders);
      return updatedHeaders;
    });
  };


  const filterData = (updatedHeaders) => {
    const filteredData = modifiedChartTableData
      .map((item) => {

        let filteredItem = {};
        updatedHeaders.forEach((key) => {
          if (item && Object.prototype.hasOwnProperty.call(item, key)) {
            filteredItem[key] = item[key] ?? "";
          } else {
            console.warn(`Key "${key}" not found in item:`, item);
          }
        });

        // console.log("Filtered Item:", filteredItem);
        return Object.keys(filteredItem).length > 0 ? filteredItem : null;
      })
      .filter(Boolean);
    setDownloadTableData(filteredData);
  };
  const fetchData = (type,param) => {
   // This function filters  data based on selected state, district, category

    let apiRes;
    if(type === 'save'){
      apiRes = encryptGlobal(param);
    }else{
      apiRes = encryptGlobal(
        JSON.stringify({
          state: selectstate,
          district: district,
          category: category,
        })
      );
    }
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

          const modifiedData = chartTableData.map((item) => ({
            ...item,
            registration_status:
              item.mentor_reg !== 0 ? "Registered" : "Not Registered",
          }));
          setModifiedChartTableData(modifiedData);
          setSavedReports(modifiedData);
          if (response?.data?.count > 0) {
            setIsCustomizationEnabled(true);
            setHasData(true);
          } else {
            openNotificationWithIcon("error", "No Data Found");
            setHasData(false);
            setShowCustomization(false);
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
    // console.log("Updated Download Table Data:", downloadTableData);
  }, [downloadTableData]);

  useEffect(() => {
    if (isReadyToDownload && downloadTableData.length > 0) {
      const formattedCSVData = downloadTableData.map((item) =>
        Object.fromEntries(
          Object.entries(item).map(([key, value]) => [
            headerMapping[key] || key,
            value,
          ])
        )
      );
      setFormattedDataForDownload(formattedCSVData);

      setTimeout(() => {
        csvLinkRef.current.link.click();
       
        openNotificationWithIcon("success", "Report Downloaded Successfully");
        setIsReadyToDownload(false);
      }, 1000);
    }
  }, [isReadyToDownload, downloadTableData]);

  const enable =
    selectstate?.trim() !== "" &&
    district?.trim() !== "" &&
    category?.trim() !== "";

  const handleCustomizationClick = () => {
    setShowCustomization(!showCustomization);
    fetchData();
    setSelectedHeaders([]);
    setCustomizationActive(true);
  };
  useEffect(() => {
    if (customizationActive) {
      setShowCustomization(false);
      setCustomizationActive(false);
      setSelectedHeaders([]);
    }
  }, [district, category, selectstate]);

  // Reports saving code 
    const [showPopup, setShowPopup] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState("");
    const handleInputChange = (e) => {
      const value = e.target.value;
      setInputValue(value);
    };
  
  const handleSaveReport = async() =>{
    // This function filters the data and saves the institution report


    const pattern = /^[a-zA-Z0-9 \-()&.,_]*$/;
  if(pattern.test(inputValue) && inputValue!==''){
    const body = JSON.stringify({
      report_type: 'institution-report',
      filters:JSON.stringify({
        state: selectstate,
        district: district,
        category: category,
      }),
      columns:JSON.stringify(selectedHeaders),
      
      report_name:inputValue,
      status:"ACTIVE"
    });
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/report_files`,
      body,
      {
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${currentUser?.data[0]?.token}`
          }
      }
  );
  if (response.status === 201) {
      openNotificationWithIcon(
       'success',
        'Report Format Saved Successfully'
        );
        setShowPopup(false);
        setInputValue('');
        fetchSavedReportsData();
       } else {
       openNotificationWithIcon('error', 'Opps! Something Wrong');
        setShowPopup(false);
        setInputValue('');
    }
  }else{
    setError("Please Enter Valid Name");
  }
};
  //

  // get saved reports
  const [reportFileslist,setReportFileslist] = useState([]);
  useEffect(()=>{
    fetchSavedReportsData();
  },[]);
  const fetchSavedReportsData = () => {
    // this function fetches all saved reports list from the API

    const apiRes = encryptGlobal(
      JSON.stringify({
        report_type: 'institution-report',
      })
    );
    const config = {
      method: "get",
      url:
        process.env.REACT_APP_API_BASE_URL +
        `/report_files?Data=${apiRes}`,
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
  const [istabledownloadclicked,setistabledownloadclicked] = useState(false);
  const [savedHeader,setSavedHeader] = useState();
  const handleReportfileDownload = (data) =>{
    setSavedHeader(allHeaders.filter((header) =>JSON.parse(data.columns).includes(header.key)).map((header) => header));
    fetchData('save',data.filters);
    setistabledownloadclicked(true);
  };
  useEffect(()=>{
    if(savedReports.length>0 && istabledownloadclicked){
      csvSavedRef.current.link.click();
      setistabledownloadclicked(false);
    }
  },[savedReports]);

  const handleReportfileDelete = (data) =>{
    // this function fetches delete reports  from the API

    const idparm = encryptGlobal(JSON.stringify(data.report_file_id));
    const config = {
      method: "delete",
      url:
        process.env.REACT_APP_API_BASE_URL +
        `/report_files/${idparm}`,
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

  const resData = {
    data: reportFileslist && reportFileslist.length > 0 ? reportFileslist : [],
    columns: [
        {
            name: 'No',
            selector: (row, key) => key + 1,
            sortable: true,
            width: '6rem'
        },
        {
            name: 'Report Name',
            selector: (row) => row.report_name,
            sortable: true,
            width: '10rem'
        },
        {
            name: 'State',
            selector: (row) => {
              const fileter = JSON.parse(row.filters);
              return fileter.state;
            },
            sortable: true,
            width: '9rem'
        },
        {
          name: 'District',
          selector: (row) => {
            const fileter = JSON.parse(row.filters);
            return fileter.district;
          },
          sortable: true,
          width: '9rem'
      },
      {
        name: 'Category',
        selector: (row) => {
          const fileter = JSON.parse(row.filters);
          return fileter.category;
        },
        sortable: true,
        width: '8rem'
    },
       
    {
      name: 'Columns',
      cell: (row) => {
        const columnKeys = JSON.parse(row.columns); 
        const displayLabels = columnKeys.map((key) => {
          const match = allHeaders.find(header => header.key === key);
          return match ? match.label : key;
        });
    
        return (
          <div
            style={{
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
            }}
          >
            {displayLabels.join(', ')}
          </div>
        );
      },
      width: '30rem',
    },
    
        
        {
            name: 'Actions',
            width: '15rem',
            center: true,
            cell: (record) => [
                <>
                    <div
                        key={record}
                        onClick={() => handleReportfileDownload(record)}
                        style={{ marginRight: '12px' }}
                    >
                        <div className="btn btn-primary btn-sm mx-2">
                            Download
                        </div>
                    </div>

                    <div
                        key={record}
                        onClick={() => handleReportfileDelete(record)}
                        style={{ marginRight: '12px' }}
                    >
                        <div className="btn btn-danger btn-sm mx-2">
                            DELETE
                        </div>
                    </div>
                </>
            ]
        }
    ]
};
//
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
              <h4>1. School Registration Report</h4>
              <h6>List of overall Schools & its registration status</h6>
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
                    setValue={setSelectState}
                    placeHolder={"Select State"}
                    value={selectstate}
                  />
                </div>
              </Col>
              <Col md={2}>
                <div className="my-2 d-md-block d-flex justify-content-center">
                  <Select
                    list={fiterDistData}
                    setValue={setdistrict}
                    placeHolder={"Select District"}
                    value={district}
                  />
                </div>
              </Col>
              <Col md={2}>
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
              <Col md={2}>
                <button
                  onClick={handleCustomizationClick}
                  type="button"
                  disabled={!enable}
                  className="btn btn-primary"
                >
                  Customization
                </button>
              </Col>

              {showCustomization && hasData && (
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
                            checked={
                              selectedHeaders.length === allHeaders.length
                            }
                            onChange={handleSelectAll}
                          />
                          <label
                            className="form-check-label ms-2"
                            htmlFor="selectAll"
                          >
                            Select All
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      {allHeaders.map((header) => (
                        <div className="col-md-3" key={header.key}>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id={header.key}
                              checked={selectedHeaders.includes(header.key)}
                              onChange={() => handleCheckboxChange(header.key)}
                            />
                            <label
                              className="form-check-label ms-2"
                              htmlFor={header.key}
                            >
                              {header.label}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      className="btn btn-danger mt-3"
                      onClick={() => {
                        setShowCustomization(false);
                        if (
                          !downloadTableData ||
                          downloadTableData.length === 0
                        ) {
                          filterData();
                        }
          setTimeout(() => {
          
            setIsReadyToDownload(true);
          }, 1000);
        }}
        disabled={selectedHeaders.length === 0}
      >
        Download Report
      </button>
      <button
        className="btn btn-info mt-3"
        style={{marginLeft:'1rem'}}
        onClick={() => {
          setShowPopup(true);
        }}
        disabled={selectedHeaders.length === 0}
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
                            textAlign:"center"
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

                          <h5 style={{ margin: "1rem" }}>Enter Report Name to Save</h5>
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
                            onClick={handleSaveReport}
                          >
                            OK
                          </button>
                        </div>
                      </div>
                    )}
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
                        
                        {savedReports && (
                  <CSVLink
                    data={savedReports}
                    headers={savedHeader}
                    filename={`School_Registration_Status_Report_${newFormat}.csv`}
                    className="hidden"
                    ref={csvSavedRef}
                  >
                    Download Table CSV
                  </CSVLink>
                )}
  
 {downloadTableData && (
                  <CSVLink
                    data={formattedDataForDownload}
                    filename={`School_Registration_Status_Report_${newFormat}.csv`}
                    className="hidden"
                    ref={csvLinkRef}
                 
                  >
                    Download Table CSV
                  </CSVLink>
                )}
            </Row>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default InstitutionReport;
