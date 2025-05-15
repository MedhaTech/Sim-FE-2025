/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Table } from "reactstrap";
import { CSVLink } from "react-csv";
import { getCurrentUser } from "../../../helpers/Utils";
import { useNavigate, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Select from "../Helpers/Select";
import axios from "axios";

import { encryptGlobal } from "../../../constants/encryptDecrypt";
import { stateList, districtList } from "../../../RegPage/ORGData";
import ThirdReportStats from "./ThirdReportStats";
import DataTableExtensions from 'react-data-table-component-extensions';
import DataTable, { Alignment } from 'react-data-table-component';

import { openNotificationWithIcon } from "../../../helpers/Utils";

const TeacherProgressDetailed = () => {
  const navigate = useNavigate();
  const [isloader, setIsloader] = useState(false);
  const [district, setdistrict] = React.useState("");
  const [selectstate, setSelectState] = React.useState("");
  const [category, setCategory] = useState("");
  const [isDownload, setIsDownload] = useState(false);
  const categoryData = ["All Categories", "ATL", "Non ATL"];
  const categoryDataTn = ["All Categories", "HSS", "HS", "Non ATL"];
  const [hasData, setHasData] = useState(false);
 const [savedReports, setSavedReports] = useState([]);
  const csvSavedRef = useRef();

  useEffect(() => {
    setdistrict("");
  }, [selectstate]);
  const newstateList = ["All States", ...stateList];
  
  const [mentorDetailedReportsData, setmentorDetailedReportsData] = useState(
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
 
  const [series1, setseries1] = useState([]);
  const [series2, setseries2] = useState([]);
  const [series3, setseries3] = useState([]);
  const [series4, setseries4] = useState([]);
  const [series5, setseries5] = useState([]);
  const [series6, setseries6] = useState([]);
  const [series7, setseries7] = useState([]);
  const [seriesa, setseriesa] = useState([]);
  const [seriesb, setseriesb] = useState([]);
  const [isCustomizationEnabled, setIsCustomizationEnabled] = useState(false);
  const [showCustomization, setShowCustomization] = useState(false);
  const [selectedHeaders, setSelectedHeaders] = useState([]);
  const [isReadyToDownload, setIsReadyToDownload] = useState(false);
  const [modifiedChartTableData, setModifiedChartTableData] = useState([]);
  const [customizationActive, setCustomizationActive] = useState(false);
  const [formattedDataForDownload, setFormattedDataForDownload] = useState([]);
  const [barChartNew, setBarChartNew] = useState({
    labels: [],
    datasets: [],
  });
  const [barDought, setBarDought] = useState({
    labels: [],
    datasets: [],
  });

  const [barChart1Data, setBarChart1Data] = useState({
    labels: [],
    datasets: [],
  });
  const [barChart3Data, setBarChart3Data] = useState({
    labels: [],
    datasets: [],
  });
  const [barChart2Data, setBarChart2Data] = useState({
    labels: [],
    datasets: [],
  });
  const fullStatesNames = newstateList;
  const allDistricts = {
    "All Districts": [...Object.values(districtList).flat()],
    ...districtList,
  };
  const fiterDistData = ["All Districts", ...(allDistricts[selectstate] || [])];

  useEffect(() => {
    fetchChartTableData();
    const newDate = new Date();
    const formattedDate = `${newDate.getUTCDate()}/${
      1 + newDate.getMonth()
    }/${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`;
    setNewFormat(formattedDate);
  }, []);
  const [totalCount, setTotalCount] = useState([]);

  const allHeaders = [
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
      label: "HM Name",
      key: "principal_name",
    },
    {
      label: "HM Contact",
      key: "principal_mobile",
    },
    {
      label: "Teacher Name",
      key: "full_name",
    },
    {
      label: "Teacher Email",
      key: "username",
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
    {
      label: "Teacher Pre Survey Status",
      key: "pre_survey_status",
    },
    {
      label: "Teacher Course Status",
      key: "course_status",
    },
    {
      label: "Teacher Post Survey Status",
      key: "post_survey_status",
    },
    {
      label: "NO.of Teams Created",
      key: "team_count",
    },
    {
      label: "No.of Students Enrolled",
      key: "student_count",
    },
    {
      label: "No.of Students Pre survey Not Started",
      key: "not_start_pre",
    },
    {
      label: "No.of Students Pre survey Completed",
      key: "preSur_cmp",
    },
    {
      label: "No.of Students Course Completed",
      key: "countop",
    },
    {
      label: "No.of Students Course Inprogress",
      key: "courseinprogess",
    },
    {
      label: "No.of Students Course Not Started",
      key: "courses_not_started",
    },
    {
      label: "No.of Teams Idea Submitted",
      key: "submittedcout",
    },
    {
      label: "No.of Teams Idea in Draft",
      key: "draftcout",
    },
    {
      label: "No.of Teams Idea Not Initiated",
      key: "notInitatedIdeas",
    },
  ];
  const headerMapping = {
    organization_code: "UDISE CODE",
    organization_name: "School Name",
    category: "School Category",
    state: "State",
    district: "District",
    mandal: "Mandal / Taluka",
    school_type: "School Type",
    board: "School Board",
    city: "City",
    principal_name: "HM Name",
    principal_mobile: "HM Contact",
    full_name: "Teacher Name",
    username: "Teacher Email",
    gender: "Teacher Gender",
    mobile: "Teacher Contact",
    whatapp_mobile: "Teacher WhatsApp Contact",
    pre_survey_status: "Teacher Pre Survey Status",
    course_status: "Teacher Course Status",
    post_survey_status: "Teacher Post Survey Status",
    team_count: "NO.of Teams Created",
    student_count: "No.of Students Enrolled",
    not_start_pre: "No.of Students Pre survey Not Started",
    preSur_cmp: "No.of Students Pre survey Completed",
    countop: "No.of Students Course Completed",
    courseinprogess: "No.of Students Course Inprogress",
    courses_not_started: "No.of Students Course Not Started",
    submittedcout: "No.of Teams Idea Submitted",
    draftcout: "No.of Teams Idea in Draft",
    notInitatedIdeas: "No.of Teams Idea Not Initiated",
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
    setmentorDetailedReportsData(filteredData);
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
        `/reports/mentordetailsreport?Data=${apiRes}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.data[0]?.token}`,
      },
    };
    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          const preSurveyMap = response.data.data[0].preSurvey.reduce(
            (map, item) => {
              map[item.user_id] = item.pre_survey_status;
              return map;
            },
            {}
          );
          const postSurveyMap = response.data.data[0].postSurvey.reduce(
            (map, item) => {
              map[item.user_id] = item.post_survey_status;
              return map;
            },
            {}
          );
          const CourseMap = response.data.data[0].Course.reduce((map, item) => {
            map[item.user_id] = item.course_status;
            return map;
          }, {});
          const teamCountMap = response.data.data[0].teamCount.reduce(
            (map, item) => {
              map[item.mentor_id] = item.team_count;
              return map;
            },
            {}
          );
          const studentCountMap = response.data.data[0].studentCount.reduce(
            (map, item) => {
              map[item.mentor_id] = item.student_count;
              return map;
            },
            {}
          );
          const StudentCourseCmpMap =
            response.data.data[0].StudentCourseCmp.reduce((map, item) => {
              map[item.mentor_id] = item.countop;
              return map;
            }, {});
          const StudentCourseINproMap =
            response.data.data[0].StudentCourseINpro.reduce((map, item) => {
              map[item.mentor_id] = item.courseinprogess;
              return map;
            }, {});
          const StudentCourseNotStartedMap = Object.keys(
            studentCountMap
          ).reduce((map, mentor_id) => {
            const totalStudents = studentCountMap[mentor_id] || 0;
            const completedCourses = StudentCourseCmpMap[mentor_id] || 0;
            const coursesInProgress = StudentCourseINproMap[mentor_id] || 0;

            map[mentor_id] =
              totalStudents - (completedCourses + coursesInProgress);
            return map;
          }, {});

          const UsernameeMap = response.data.data[0].Username.reduce(
            (map, item) => {
              map[item.user_id] = item.username;
              return map;
            },
            {}
          );
          const StuIdeaDraftCountMap =
            response.data.data[0].StuIdeaDraftCount.reduce((map, item) => {
              map[item.mentor_id] = item.draftcout;
              return map;
            }, {});
          const StuIdeaSubCountMap =
            response.data.data[0].StuIdeaSubCount.reduce((map, item) => {
              map[item.mentor_id] = item.submittedcout;
              return map;
            }, {});

          const notInitiatedMap = Object.keys(teamCountMap).reduce(
            (map, mentor_id) => {
              const teamCount = teamCountMap[mentor_id] || 0;
              const submittedCount = StuIdeaSubCountMap[mentor_id] || 0;
              const draftCount = StuIdeaDraftCountMap[mentor_id] || 0;

              map[mentor_id] = teamCount - (submittedCount + draftCount);

              return map;
            },
            {}
          );
          const StuPreComCountMap =
            response.data.data[0].studentpresurvey.reduce((map, item) => {
              map[item.mentor_id] = item.preSur_cmp;
              return map;
            }, {});

          const stuPreNotStartedMap = Object.keys(studentCountMap).reduce(
            (map, mentor_id) => {
              const totalStudents = studentCountMap[mentor_id] || 0;
              const preSurveyCompleted = StuPreComCountMap[mentor_id] || 0;
              map[mentor_id] = totalStudents - preSurveyCompleted;
              return map;
            },
            {}
          );

          const newdatalist = response.data.data[0].summary.map((item) => ({
            ...item,
            pre_survey_status: preSurveyMap[item.user_id] || "Not started",
            post_survey_status: postSurveyMap[item.user_id] || "Not started",
            course_status: CourseMap[item.user_id] || "Not started",
            team_count: teamCountMap[item.mentor_id] || 0,
            student_count: studentCountMap[item.mentor_id] || 0,
            countop: StudentCourseCmpMap[item.mentor_id] || 0,
            courseinprogess: StudentCourseINproMap[item.mentor_id] || 0,
            username: UsernameeMap[item.user_id],
            courses_not_started:
              StudentCourseNotStartedMap[item.mentor_id] || 0,
            draftcout: StuIdeaDraftCountMap[item.mentor_id] || 0,
            submittedcout: StuIdeaSubCountMap[item.mentor_id] || 0,
            notInitatedIdeas: notInitiatedMap[item.mentor_id] || 0,
            preSur_cmp: StuPreComCountMap[item.mentor_id] || 0,
            not_start_pre: stuPreNotStartedMap[item.mentor_id] || 0,
          }));
          setModifiedChartTableData(newdatalist);
          setSavedReports(newdatalist);
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
  useEffect(() => {
    // console.log("Updated Download Table Data:", mentorDetailedReportsData);
  }, [mentorDetailedReportsData]);

  useEffect(() => {
    if (isReadyToDownload && mentorDetailedReportsData.length > 0) {
      const formattedCSVData = mentorDetailedReportsData.map((item) =>
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
  }, [isReadyToDownload, mentorDetailedReportsData]);

  const fetchChartTableData = () => {
    const config = {
      method: "get",
      url:
        process.env.REACT_APP_API_BASE_URL_FOR_REPORTS +
        "/reports/mentordetailstable",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.data[0]?.token}`,
      },
    };

    axios(config)
      .then((response) => {
        if (response.status === 200) {
          setIsloader(true);
          const summary = response.data.data[0].summary;
          const teamCount = response.data.data[0].teamCount;
          const studentCountDetails =
            response.data.data[0].studentCountDetails.map((item) => {
              const otherCount =
                item.totalstudent -
                (parseInt(item.male) + parseInt(item.female));
              return {
                ...item,
                other: otherCount,
              };
            });
          const courseCompleted = response.data.data[0].courseCompleted;
          const courseINcompleted = response.data.data[0].courseINcompleted;

          const combinedArray = summary.map((summaryItem) => {
            const state = summaryItem.state;
            const teamCountItem = teamCount.find(
              (item) => item.state === state
            );
            const studentCountItem = studentCountDetails.find(
              (item) => item.state === state
            );
            const courseCompletedItem = courseCompleted.find(
              (item) => item.state === state
            );
            const courseINcompletedItem = courseINcompleted.find(
              (item) => item.state === state
            );
            const courseNotStarted =
              summaryItem.totalReg -
              ((courseCompletedItem ? courseCompletedItem.courseCMP : 0) +
                (courseINcompletedItem ? courseINcompletedItem.courseIN : 0));
            return {
              state,
              totalReg: summaryItem.totalReg,
              totalTeams: teamCountItem ? teamCountItem.totalTeams : 0,
              totalStudents: studentCountItem
                ? studentCountItem.totalstudent
                : 0,
              maleStudents: studentCountItem
                ? parseInt(studentCountItem.male)
                : 0,
              femaleStudents: studentCountItem
                ? parseInt(studentCountItem.female)
                : 0,
              otherStudents: studentCountItem ? studentCountItem.other : 0,
              courseCompleted: courseCompletedItem
                ? courseCompletedItem.courseCMP
                : 0,
              courseINcompleted: courseINcompletedItem
                ? courseINcompletedItem.courseIN
                : 0,
              courseNotStarted,
            };
          });
          const total = combinedArray.reduce(
            (acc, item) => {
              acc.state = "Total";
              acc.totalReg += item.totalReg;
              acc.totalTeams += item.totalTeams;
              acc.totalStudents += item.totalStudents;
              acc.maleStudents += item.maleStudents;
              acc.femaleStudents += item.femaleStudents;
              acc.otherStudents += item.otherStudents;
              acc.courseCompleted += item.courseCompleted;
              acc.courseINcompleted += item.courseINcompleted;
              acc.courseNotStarted += item.courseNotStarted;
              return acc;
            },
            {
              state: "None",
              totalReg: 0,
              totalTeams: 0,
              totalStudents: 0,
              maleStudents: 0,
              femaleStudents: 0,
              otherStudents: 0,
              courseCompleted: 0,
              courseINcompleted: 0,
              courseNotStarted: 0,
            }
          );
          const doughnutData = {
            labels: ["Male", "Female", "Others"],
            datasets: [
              {
                data: [
                  total.maleStudents,
                  total.femaleStudents,
                  total.otherStudents,
                ],
                backgroundColor: ["#8bcaf4", "#ff99af", "rgb(254, 176, 25)"],
                hoverBackgroundColor: ["#36A2EB", "#FF6384"],
              },
            ],
          };
          const doughnutDataCourse = {
            labels: ["Not started", "In progress", "Completed"],
            datasets: [
              {
                data: [
                  total.courseNotStarted,
                  total.courseINcompleted,
                  total.courseCompleted,
                ],
                backgroundColor: [
                  "rgba(255, 0, 0, 0.6)",
                  "rgba(255, 255, 0, 0.6)",
                  "rgba(0, 128, 0, 0.6)",
                ],
                hoverBackgroundColor: ["#e60026", "#ffae42", "#087830"],
              },
            ],
          };

          const barData = {
            labels: combinedArray.map((item) => item.state),
            datasets: [
              {
                label: "No.of Students Enrolled",
                data: combinedArray.map((item) => item.totalStudents),
                backgroundColor: "rgba(255, 0, 0, 0.6)",
              },
              {
                label: "No. of Teams created",
                data: combinedArray.map((item) => item.totalTeams),
                backgroundColor: "rgba(75, 162, 192, 0.6)",
              },
            ],
          };
          setseries2(barData.datasets[0].data);
          setseries1(barData.datasets[1].data);

          const barDataA = {
            labels: combinedArray.map((item) => item.state),
            datasets: [
              {
                label: "No.of Registered Students Enrolled",
                data: combinedArray.map((item) => item.totalStudents),
                backgroundColor: "rgba(255, 0, 0, 0.6)",
              },
              {
                label: "No. of Registered Teachers Enrolled",
                data: combinedArray.map((item) => item.totalReg),
                backgroundColor: "rgba(75, 162, 192, 0.6)",
              },
            ],
          };
          setseriesa(barDataA.datasets[0].data);
          setseriesb(barDataA.datasets[1].data);

          const stackedBarChartData = {
            labels: combinedArray.map((item) => item.state),
            datasets: [
              {
                label: "No. of Teachers not started course",
                data: combinedArray.map((item) => item.courseNotStarted),
                backgroundColor: "rgba(255, 0, 0, 0.6)",
              },
              {
                label: "No. of Teachers course IN progress",
                data: combinedArray.map((item) => item.courseINcompleted),
                backgroundColor: "rgba(255, 255, 0, 0.6)",
              },
              {
                label: "No. of teachers Completed Course",
                data: combinedArray.map((item) => item.courseCompleted),
                backgroundColor: "rgba(0, 128, 0, 0.6)",
              },
            ],
          };
          setseries3(stackedBarChartData.datasets[0].data);
          setseries4(stackedBarChartData.datasets[1].data);
          setseries5(stackedBarChartData.datasets[2].data);
          const newcombinedArray = [...combinedArray, total];
          setCombinedArray(combinedArray);
          setDownloadTableData(newcombinedArray);
          setDoughnutChartData(doughnutData);
          setBarDought(doughnutDataCourse);

          setBarChart1Data(barData);
          setBarChartNew(barDataA);

          setBarChart2Data(stackedBarChartData);
          setTotalCount(total);
        }
      })
      .catch((error) => {
        console.log("API error:", error);
      });
  };

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

  // new code //
  const [showPopup, setShowPopup] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

const handleSaveReport = async() =>{
    // This function filters the data and saves the Mentor Progress  report

  const pattern = /^[a-zA-Z0-9 \-()&.,_]*$/;
if(pattern.test(inputValue) && inputValue!==''){
  const body = JSON.stringify({
    report_type: 'teacherprogress-report',
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
const [reportFileslist,setReportFileslist] = useState([]);
useEffect(()=>{
fetchSavedReportsData();
},[]);
const fetchSavedReportsData = () => {
    // this function fetches all saved reports list from the API

const apiRes = encryptGlobal(
  JSON.stringify({
    report_type: 'teacherprogress-report',
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
              <h4>3. Teacher Progress Detailed Report</h4>
              <h6>
                Teacher Progress - Pre survey , Course, Post survey,
                Teams&Progress Status Report
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
                    filename={`Teacher_Progress_Detailed_Report_${newFormat}.csv`}
                    className="hidden"
                    ref={csvSavedRef}
                  >
                    Download Table CSV
                  </CSVLink>
                )}
            </Row>

            <ThirdReportStats
              combinedArray={combinedArray}
              barChart1Data={barChart1Data}
              barChartNew={barChartNew}
              barChart2Data={barChart2Data}
              totalCount={totalCount}
              doughnutChartData={doughnutChartData}
              barDought={barDought}
              downloadTableData={downloadTableData}
              isloader={isloader}
              series1={series1}
              series2={series2}
              series3={series3}
              series4={series4}
              series5={series5}
              seriesa={seriesa}
              seriesb={seriesb}
            />

            {mentorDetailedReportsData && (
              <CSVLink
                data={formattedDataForDownload}
                filename={`TeacherProgressDetailedReport_${newFormat}.csv`}
                className="hidden"
                ref={csvLinkRef}
              >
                Download Teacher Detailed CSV
              </CSVLink>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default TeacherProgressDetailed;
