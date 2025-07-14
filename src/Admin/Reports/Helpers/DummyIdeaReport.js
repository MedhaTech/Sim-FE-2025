/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Table } from "reactstrap";
import { Button } from "../../../stories/Button";
import { CSVLink } from "react-csv";
import { getCurrentUser } from "../../../helpers/Utils";
import { useNavigate, Link } from "react-router-dom";
import {
  getDistrictData,
  getStateData,
  getFetchDistData,
} from "../../../redux/studentRegistration/actions";
import { ArrowRight } from "feather-icons-react/build/IconComponents";
import { useDispatch, useSelector } from "react-redux";
import Select from "../Helpers/Select";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { categoryValue } from "../../Schools/constentText";
import { notification } from "antd";
import { encryptGlobal } from "../../../constants/encryptDecrypt";
import { stateList, districtList } from "../../../RegPage/ORGData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMale,
  faFemale,
  faChalkboardTeacher,
} from "@fortawesome/free-solid-svg-icons";
import ReactApexChart from "react-apexcharts";
import { openNotificationWithIcon } from "../../../helpers/Utils";
import { themesList } from "../../../Team/IdeaSubmission/themesData";
import moment from "moment/moment";
import * as XLSX from 'xlsx';

const IdeaReport = () => {
  const navigate = useNavigate();
  const [district, setdistrict] = React.useState("");
  const [isloader, setIsloader] = useState(false);
  const [selectstate, setSelectState] = React.useState("");
  const [category, setCategory] = useState("");
  const [isDownload, setIsDownload] = useState(false);
  const [sdg, setSdg] = React.useState("");
  const [chartTableData, setChartTableData] = useState([]);
 const [hasData, setHasData] = useState(false);
  const categoryData = ["All Categories", "ATL", "Non ATL"];
  const categoryDataTn = [
   "All Categories",
   "HSS",
    "HS",
    "Non ATL",
  ];
  const newstateList = ["All States", ...stateList];
  const newThemesList = ["All Themes", ...themesList];

  useEffect(() => {
    setdistrict('');
  }, [selectstate]);


  const [studentDetailedReportsData, setstudentDetailedReportsData] = useState(
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
 
  const [customizationActive, setCustomizationActive] = useState(false);

 
  const fullStatesNames = newstateList;
  const allDistricts = {
    "All Districts": [...Object.values(districtList).flat()],
    ...districtList,
  };
      const [modifiedChartTableData, setModifiedChartTableData] = useState([]);
  
  const fiterDistData = ["All Districts", ...(allDistricts[selectstate] || [])];
 const [isCustomizationEnabled, setIsCustomizationEnabled] = useState(false);
 const [showCustomization, setShowCustomization] = useState(false);
  const [selectedHeaders, setSelectedHeaders] = useState([]);
  const [isReadyToDownload, setIsReadyToDownload] = useState(false);
  const [formattedDataForDownload, setFormattedDataForDownload] = useState([]);
  useEffect(() => {
   
    fetchChartTableData();
    const newDate = new Date();
    const formattedDate = `${newDate.getUTCDate()}/${1 + newDate.getMonth()
      }/${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`;
    setNewFormat(formattedDate);
  }, []);
  const [totalCount, setTotalCount] = useState([]);

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
  const allHeaders = [
    {
      label: "UDISE CODE",
      key: "UDISE CODE",
    },
    {
      label: "State",
      key: "State",
    },
    {
      label: "District",
      key: "District",
    },
    {
      label: 'CID',
      key: 'CID'
    },
    {
      label: "School Name",
      key: "School Name",
    },
   
    {
      label: "School Category",
      key: "School Category",
    },
    {
      label: 'Pin Code',
      key: 'Pin Code'
    },
    { label: "Mandal / Taluka", key: "Mandal / Taluka" },

    { label: "School Type", key: "School Type" },

    { label: "School Board", key: "School Board" },
    {
      label: 'Address',
      key: 'Address'
    },
    {
      label: "Teacher Name",
      key: "Teacher Name",
    },
    {
      label: "Teacher Email",
      key: "Teacher Email",
    },
    {
      label: "Teacher Gender",
      key: "Teacher Gender",
    },
    {
      label: "Teacher Contact",
      key: "Teacher Contact",
    },
    {
      label: "Team Name",
      key: "Team Name",
    },
    {
      label: "Team Username",
      key: "Team Username",
    },
    {
      label: "Student Names",
      key: "Student Names",
    },
    {
      label: 'Theme',
      key: 'Theme'
    },
    {
      label: 'Focus Area',
      key: 'Focus Area'
    },
    {
      label: 'Select in which language you prefer Submitting Your Idea?',
      key: 'Select in which language you prefer Submitting Your Idea?'
    },
    {
      label: 'Title of your idea (Think of a proper name. Dont describe the solution or problem statement here.',
      key: 'Title of your idea (Think of a proper name. Dont describe the solution or problem statement here.'
    },
    {
      label: 'Write down your Problem statement',
      key: 'Write down your Problem statement'
    },
    {
      label: 'List the Causes of the Problem',
      key: 'List the Causes of the Problem'
    },
    {
      label: 'List the Effects of the Problem',
      key: 'List the Effects of the Problem'
    },
    {
      label: 'In which places in your community did you find this problem?',
      key: 'In which places in your community did you find this problem?'
    },
    {
      label: 'Who all are facing this problem?',
      key: 'Who all are facing this problem?'
    },
    {
      label: 'Describe the solution to the problem your team found. Explain your solution clearly - how does it work, who is it helping, and how will it solve the problem.',
      key: 'Describe the solution to the problem your team found. Explain your solution clearly - how does it work, who is it helping, and how will it solve the problem.'
    },
    {
      label: 'Apart from your teacher, how many people/stakeholders did you speak to to understand or improve your problem or solution?',
      key: 'Apart from your teacher, how many people/stakeholders did you speak to to understand or improve your problem or solution?'
    },
    {
      label: 'Pick the actions your team did in your problem solving journey (You can choose multiple options)',
      key: 'Pick the actions your team did in your problem solving journey (You can choose multiple options)'
    },
    {
      label: 'Mention the feedback that your team got and the changes you have made, if any, to your problem or solution.',
      key: 'Mention the feedback that your team got and the changes you have made, if any, to your problem or solution.'
    },
    {
      label: 'Descriptive Document/Image of your prototype',
      key: 'Descriptive Document/Image of your prototype'
    },
    {
      label: 'Clear YouTube Video Explaining your Solution',
      key: 'Clear YouTube Video Explaining your Solution'
    },
    {
      label: 'Did your team complete and submit the workbook to your school Guide teacher?',
      key: 'Did your team complete and submit the workbook to your school Guide teacher?'
    },
    {
      label: 'Idea Submission Status',
      key: 'Idea Submission Status'
    },
    {
      label: 'Teacher Verified Status',
      key: 'Teacher Verified Status'
    },
    {
      label: 'Teacher Verified At',
      key: 'Teacher Verified At'
    },
  ];
  const headerMapping = {
    organization_code: "UDISE CODE",
    organization_name: "School Name",
    category: "School Category",
    state: "State",
    district: "District",
   
    full_name: "Teacher Name",
    username: "Teacher Email",
    gender: "Teacher Gender",
    mobile: "Teacher Contact",
    whatapp_mobile: "Teacher WhatsApp Contact",
    team_name: "Team Name",
    team_username: "Team Username",
    CID: "CID",
    pin_code: "Pin Code",
    mandal :"Mandal / Taluka",
    school_type :"School Type",
    board :"School Board",
    address: "Address",
    names: "Student Names",
    theme: "Theme",
    focus_area: "Focus Area",
    language: "Select in which language you prefer Submitting Your Idea?",
    title: "Title of your idea (Think of a proper name. Dont describe the solution or problem statement here.",
    problem_statement:  "Write down your Problem statement",
    causes: "List the Causes of the Problem",
    effects: "List the Effects of the Problem",
    community: "In which places in your community did you find this problem?",
    facing: "Who all are facing this problem?",
    solution: "Describe the solution to the problem your team found. Explain your solution clearly - how does it work, who is it helping, and how will it solve the problem.",
    stakeholders: "Apart from your teacher, how many people/stakeholders did you speak to to understand or improve your problem or solution?",
    problem_solving:"Pick the actions your team did in your problem solving journey (You can choose multiple options)",
    feedback: "Mention the feedback that your team got and the changes you have made, if any, to your problem or solution.",
    prototype_image: "Descriptive Document/Image of your prototype",
    prototype_link: "Clear YouTube Video Explaining your Solution",
    workbook: "Did your team complete and submit the workbook to your school Guide teacher?",
    status: "Idea Submission Status",
    verifiedment: "Teacher Verified Status",
    verified_at: "Teacher Verified At",
  };
  
  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(studentDetailedReportsData);  // Converts the JSON data to a sheet
    const wb = XLSX.utils.book_new();  // Creates a new workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  // Appends the sheet to the workbook
    XLSX.writeFile(wb, `SubmittedIdeasDetailedReport_${newFormat}.xlsx`);  // Triggers download of the Excel file
    
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
        prevHeaders.length === allHeaders.length ? [] : allHeaders.map((h) => h.key);
        filterData(updatedHeaders);
      return updatedHeaders;
    });
  }; 
 
  const filterData= (updatedHeaders)=>{
    const filteredData = modifiedChartTableData.map((item) => {

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
    }).filter(Boolean); 
    setstudentDetailedReportsData(filteredData);
  };
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
   }, [district, category, selectstate,sdg]);
  const enable = selectstate?.trim() !== "" && district?.trim() !== "" && category?.trim() !== "" && sdg?.trim() !== "";
  var chartOption = {
    chart: {
      height: 330,
      type: "donut",
      toolbar: {
        show: false,
      },
    },
    colors: ["#36A2EB",
      "#FF6384",
      "#ff6666",
      "#954535",
      "#a6d608",
      "#b2ffff",
      "#4169e1",
      "#dda0dd",],
    labels: [

      "Agriculture and Rural Development",
      "Digital Transformation",
      "Economic Empowerment",
      "Health and Well-being",
      "Quality Education",
      "Smart and Resilient Communities",
      "Sustainable Development and Environment",
      "Others"
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

 

 
          useEffect(() => {
              if (isReadyToDownload && studentDetailedReportsData.length > 0) {
                const formattedCSVData = studentDetailedReportsData.map((item) =>
                  Object.fromEntries(
                    Object.entries(item).map(([key, value]) => [headerMapping[key] || key, value])
                  )
                );
                setFormattedDataForDownload(formattedCSVData);
          
            setTimeout(() => {
      handleExport();
                  openNotificationWithIcon("success", "Report Downloaded Successfully");
                  setIsReadyToDownload(false); 
                }, 1000);
            
              }
            }, [isReadyToDownload, studentDetailedReportsData]);
  const fetchData = () => {
    const apiRes = encryptGlobal(
      JSON.stringify({
        state: selectstate,
        district: district,
        category: category,
        theme: sdg,
      })
    );
    const config = {
      method: "get",
      url:
        process.env.REACT_APP_API_BASE_URL_FOR_REPORTS +
        `/reports/ideadeatilreport?Data=${apiRes}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.data[0]?.token}`,
      },
    };
    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          const teamDataMap = response.data.data[0].teamData.reduce(
            (map, item) => {
              map[item.team_id] = item;
              return map;
            },
            {}
          );
          const teamUsernameMap = response.data.data[0].teamUsername.reduce(
            (map, item) => {
              map[item.teamuserId] = item.teamUsername;
              return map;
            },
            {}
          );
          const mentorMap = response.data.data[0].mentorData.reduce(
            (map, item) => {
              map[item.mentor_id] = item;
              return map;
            },
            {}
          );
          const mentorUsernameMap = response.data.data[0].mentorUsername.reduce(
            (map, item) => {
              map[item.user_id] = item.username;
              return map;
            },
            {}
          );
          const studentNamesMap = response.data.data[0].
            student_names
            .reduce(
              (map, item) => {
                map[item.team_id] = item.names;
                return map;
              },
              {}
            );

          const studentAndteam = response.data.data[0].summary.map((item) => {
            return {
              ...item,
              names: studentNamesMap[item.team_id],
              team_name: teamDataMap[item.team_id].team_name,
              team_email: teamDataMap[item.team_id].team_email,
              mentor_id: teamDataMap[item.team_id].mentor_id,
              teamuserId: teamDataMap[item.team_id].teamuserId,

            };
          });

          const mentorAndOrg = studentAndteam.map((item) => {
            return {
              ...item,

              team_username: teamUsernameMap[item.teamuserId],
              category: mentorMap[item.mentor_id].category,
              district: mentorMap[item.mentor_id].district,
              full_name: mentorMap[item.mentor_id].full_name,
              gender: mentorMap[item.mentor_id].gender,
              mobile: mentorMap[item.mentor_id].mobile,
              organization_code: mentorMap[item.mentor_id].organization_code,
              unique_code: mentorMap[item.mentor_id].unique_code,
              organization_name: mentorMap[item.mentor_id].organization_name,
              state: mentorMap[item.mentor_id].state,
              mentorUserId: mentorMap[item.mentor_id].mentorUserId,
              city: mentorMap[item.mentor_id].city,
              principal_name: mentorMap[item.mentor_id].principal_name,
              principal_mobile: mentorMap[item.mentor_id].principal_mobile,
              pin_code: mentorMap[item.mentor_id].pin_code,
              mandal: mentorMap[item.mentor_id].mandal, 
              school_type: mentorMap[item.mentor_id].school_type,
              board: mentorMap[item.mentor_id].board,
              address: mentorMap[item.mentor_id].address,

            };
          });
          const newdatalist = mentorAndOrg.map((item) => {
            return {
             "UDISE CODE":item.organization_code,
             State:item.state,
             District:item.district,
             CID:item.challenge_response_id,
             "School Name":item.organization_name,
             "School Category":item.category,
             "Pin Code":item.pin_code,
             "School Type":item.school_type, "Mandal / Taluka":item.mandal, "School Board":item.board,
             Address:item.address,
              "Teacher Name":item.full_name,
              "Teacher Email":mentorUsernameMap[item.mentorUserId],
              "Teacher Gender":item.gender,
              "Teacher Contact":item.mobile,
              "Team Name":item.team_name,
              "Team Username":item.team_username,
              "Student Names":item.names,
              Theme:item.theme,
              "Focus Area":item.focus_area,
              "Select in which language you prefer Submitting Your Idea?":item.language,
              "Title of your idea (Think of a proper name. Dont describe the solution or problem statement here.":item.title,
              "Write down your Problem statement":item.problem_statement,
              "List the Causes of the Problem":item.causes,
              "List the Effects of the Problem":item.effects,
              "In which places in your community did you find this problem?":item.community,
              "Who all are facing this problem?":item.facing,
              "Describe the solution to the problem your team found. Explain your solution clearly - how does it work, who is it helping, and how will it solve the problem.":item.solution,
              "Apart from your teacher, how many people/stakeholders did you speak to to understand or improve your problem or solution?":item.stakeholders,
              "Pick the actions your team did in your problem solving journey (You can choose multiple options)":item.problem_solving,
              "Mention the feedback that your team got and the changes you have made, if any, to your problem or solution.":item.feedback,
              "Descriptive Document/Image of your prototype":item.prototype_image,
              "Clear YouTube Video Explaining your Solution":item.prototype_link,
              "Did your team complete and submit the workbook to your school Guide teacher?":item.workbook,
              "Idea Submission Status":item.status,
              "Teacher Verified Status":item.verified_status == null ? "Not yet Reviewed" : item.verified_status,
              "Teacher Verified At":item.verified_at ? moment(item.verified_at).format(
                "DD-MM-YYYY"
              ) : ''
            
            };
          });

       setModifiedChartTableData(newdatalist);
          if (response.data.data[0].summary.length > 0) {
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

  const fetchChartTableData = () => {
    const config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL_FOR_REPORTS + "/reports/ideaReportTable",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.data[0]?.token}`,
      },
    };

    axios(config)
      .then((response) => {
        if (response.status === 200) {
          setIsloader(true);
          const combinedArray = response?.data?.data || [];

          const total = combinedArray.reduce(
            (acc, item) => {
              acc.state = "Total";
              (acc.totalSubmited += item.totalSubmited),
                
                acc.AgricultureandRuralDevelopment +=
                item.AgricultureandRuralDevelopment;
              acc.DigitalTransformation += item.DigitalTransformation;
              acc.EconomicEmpowerment += item.EconomicEmpowerment;
              acc.HealthandWellbeing += item.HealthandWellbeing;
              acc.QualityEducation += item.QualityEducation;
              acc.SustainableDevelopmentandEnvironment +=
                item.SustainableDevelopmentandEnvironment;

              acc.OTHERS += item.OTHERS;

              acc.SmartandResilientCommunities +=
                item.SmartandResilientCommunities;
              return acc;
            },
            {
              totalSubmited: 0,
              AgricultureandRuralDevelopment: 0,
              DigitalTransformation: 0,
              EconomicEmpowerment: 0,
              HealthandWellbeing: 0,
              QualityEducation: 0,
              SmartandResilientCommunities: 0,
              SustainableDevelopmentandEnvironment: 0,
              OTHERS: 0,
              //
            }
          );

          const doughnutData = {
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
            datasets: [
              {
                data: [
                  total.AgricultureandRuralDevelopment,
                  total.DigitalTransformation,
                  total.EconomicEmpowerment,
                  total.HealthandWellbeing,
                  total.QualityEducation,
                  total.SmartandResilientCommunities,
                  total.SustainableDevelopmentandEnvironment,
                  total.Others,
                ],
                backgroundColor: [
                  "#8bcaf4",
                  "#ff99af",
                  "#ff0000",
                  "#800000",
                  "#648c11",
                  "#00ffff",
                  "#0000ff",
                  "#800080",
                ],
                hoverBackgroundColor: [
                  "#36A2EB",
                  "#FF6384",
                  "#ff6666",
                  "#954535",
                  "#a6d608",
                  "#b2ffff",
                  "#4169e1",
                  "#dda0dd",
                ],
              },
            ],
          };
         
          


          const newcombinedArray = [...combinedArray, total];
          setCombinedArray(combinedArray);
          setDownloadTableData(newcombinedArray);
          setDoughnutChartData(doughnutData);
          setTotalCount(total);
        }
      })
      .catch((error) => {
        console.log("API error:", error);
      });
  };

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
              <h4>5. Submitted Ideas Detailed Report</h4>
              <h6>
                Idea Details - Theme, Focusarea, Problem, Solution, Feedback, Prototype Info & Attachments
              </h6>
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
                <div className="my-2 d-md-block d-flex justify-content-center">
                  <Select
                    list={newThemesList}
                    setValue={setSdg}
                    placeHolder={"Select Theme"}
                    value={sdg}
                  />
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
                                                        
                               {showCustomization &&  hasData && (
  <div className="card mt-3" >
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
        checked={selectedHeaders.length === allHeaders.length}
        onChange={handleSelectAll}
      />
      <label className="form-check-label ms-2" htmlFor="selectAll">
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
              <label className="form-check-label ms-2" htmlFor={header.key}>
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
          if (!downloadTableData || downloadTableData.length === 0) {
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
    </div>
  </div>
)}
            </Row>
            {isloader ?
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
                                      {
                                        item.SustainableDevelopmentandEnvironment
                                      }
                                    </td>
                                    <td>{item.OTHERS}</td>
                                  </tr>
                                ))}
                                <tr>
                                  <td>{ }</td>
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

              {studentDetailedReportsData && (
                <CSVLink
                  data={formattedDataForDownload}
                  filename={`SubmittedIdeasDetailedReport_${newFormat}.csv`}
                  className="hidden"
                  ref={csvLinkRef}
                >
                  Download Idea Detailed CSV
                  </CSVLink>  
              )}
            </div>
            :
                            <div className="spinner-border text-info" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        }
          </div>
        </Container>
      </div>
    </div>
  );
};

export default IdeaReport;
