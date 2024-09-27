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
// import '../reports.scss';
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

const IdeaReport = () => {
  const navigate = useNavigate();
  const [district, setdistrict] = React.useState("");
  const [selectstate, setSelectState] = React.useState("");
  const [category, setCategory] = useState("");
  const [isDownload, setIsDownload] = useState(false);
  const [sdg, setSdg] = React.useState("");
  const [chartTableData, setChartTableData] = useState([]);

  const categoryData = ["All Categories", "ATL", "Non ATL"];
  const categoryDataTn = [
    "All Categories",
    "Fully Aided-High School",
    "Fully Aided-Higher Secondary School",
    "Government-High School",
    "Government-Higher Secondary School",
    "Partially Aided-High School",
    "Partially Aided-Higher Secondary School",
    "Non ATL",
  ];
  const newstateList = ["All States", ...stateList];
  const newThemesList = ["All Themes", ...themesList];

  // const categoryData =
  //     categoryValue[process.env.REACT_APP_LOCAL_LANGUAGE_CODE];
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
  const [atl, setAtl] = useState("");
  const [nonAtl, setNonAtl] = useState("");
  const [series1, setseries1] = useState([]);
  const [series2, setseries2] = useState([]);
  const [series3, setseries3] = useState([]);
  const [series4, setseries4] = useState([]);
  const [series5, setseries5] = useState([]);
  const [series6, setseries6] = useState([]);
  const [series7, setseries7] = useState([]);

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
  // const fiterDistData = districtList[selectstate];

  useEffect(() => {
    // if (selectstate !== '') {
    //     dispatch(getFetchDistData(selectstate));
    // }
    // setdistrict('');
    fetchChartTableData();
    const newDate = new Date();
    const formattedDate = `${newDate.getUTCDate()}/${
      1 + newDate.getMonth()
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
      label:  "Agriculture and Rural Development",
      key: "AgricultureandRuralDevelopment",
    },
    {
      label:"Digital Transformation",
      key: "DigitalTransformation",
    },
    {
      label:  "Economic Empowerment",
      key: "EconomicEmpowerment",
    },
    {
      label: "Health and Well-being",
      key: "HealthandWellbeing",
    },
    {
      label:  "Quality Education",
      key: "QualityEducation",
    },
    {
      label:  "Smart and Resilient Communities",
      key: "SmartandResilientCommunities",
    },
    {
      label: "Sustainable Development and Environment",
      key: "SustainableDevelopmentandEnvironment",
    },
    {
      label:  "Others",
      key: "OTHERS",
    },
  ];
  const teacherDetailsHeaders = [
    {
      label: "UDISE CODE",
      key: "organization_code",
    },
    // {
    //   label: 'ATL CODE',
    //   key: 'unique_code'
    // },
   
    {
      label: "State",
      key: "state",
    },
    {
      label: "District",
      key: "district",
    },
    {
      label: 'CID',
      key: 'challenge_response_id'
  },
    {
      label: "School Name",
      key: "organization_name",
    },
    {
      label: "School Type/Category",
      key: "category",
    },
    {
      label: 'Pin code',
      key: 'pin_code'
  },
  {
      label: 'Address',
      key: 'address'
  },
    // {
    //   label: "City",
    //   key: "city",
    // },
    // {
    //   label: "HM Name",
    //   key: "principal_name",
    // },
    // {
    //   label: "HM Contact",
    //   key: "principal_mobile",
    // },
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
    // {
    //   label: "Teacher WhatsApp Contact",
    //   key: "whatapp_mobile",
    // },

    {
      label: "Team Name",
      key: "team_name",
    },
    {
      label: "Team Username",
      key: "team_username",
    },
    {
      label: "Student Names",
      key: "names",
    },

    {
      label: 'Theme',
      key: 'theme'
  },
  {
    label: 'Focus Area',
    key: 'Focus Area'
},
  {
      label: 'Title of your idea (Think of a proper name. Dont describe the solution or problem statement here.',
      key: 'title'
  },
  {
    label: 'Write down your Problem statement',
    key: 'problem_statement'
}, {
  label: 'List the Causes of the problem',
  key: 'causes'
}, {
  label: 'List the Effects of the problem',
  key: 'effects'
}, {
  label: 'In which places in your community did you find this problem?',
  key: 'community'
}, {
  label: 'Who all are facing this problem?',
  key: 'facing'
}, {
  label: 'Describe the solution to the problem your team found. Explain your solution clearly - how does it work, who is it helping, and how will it solve the problem.',
  key: 'facing'
}, {
  label: 'Apart from your teacher, how many people/stakeholders did you speak to to understand or improve your problem or solution?',
  key: 'stakeholders'
}, {
  label: 'Pick the actions your team did in your problem solving journey (You can choose multiple options)',
  key: 'problem_solving'
},
    {
        label: 'Mention the feedback that your team got and the changes you have made, if any, to your problem or solution.',
        key: 'feedback'
    },
    {
        label: 'Upload image of your prototype.',
        key: 'prototype_image'
    },
    {
      label: 'Upload documents & video links of your prototype.',
      key: 'prototype_link'
  },
    {
        label: 'Did your team complete and submit the workbook to your school Guide teacher?',
        key: 'workbook'
    },
    {
      label: 'Idea Submission Status',
      key: 'status'
  },
  {
    label: 'Teacher Verified Status',
    key: 'verifiedment'
},
{
  label: 'Teacher Verified At',
  key: 'verified_at'
},
  ];

  // useEffect(() => {
  //     dispatch(getDistrictData());
  //     fetchChartTableData();
  //     const newDate = new Date();
  //     const formattedDate = `${newDate.getUTCDate()}/${
  //         1 + newDate.getMonth()
  //     }/${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`;
  //     setNewFormat(formattedDate);
  // }, []);

  var chartOption = {
    chart: {
      height: 330,
      type: "donut",
      toolbar: {
        show: false,
      },
    },
    colors: [ "#36A2EB",
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

  // var options = {
  //   chart: {
  //     height: 500,
  //     type: "line",
  //     toolbar: {
  //       show: false,
  //     },
  //     zoom: {
  //       enabled: false,
  //     },
  //   },
  //   colors: ["rgb(0, 143, 251)", "rgb(0, 227, 150)"],
  //   dataLabels: {
  //     enabled: false,
  //   },
  //   stroke: {
  //     curve: "straight",
  //   },
  //   series: [
  //     {
  //       name: "# Teams",
  //       data: series1,
  //     },
  //     {
  //       name: "# Students",
  //       data: series2,
  //     },
  //   ],

  //   yaxis: {
  //     beginAtZero: true,
  //     ticks: {
  //       stepSize: 20,
  //     },
  //     labels: {
  //       formatter: (val) => {
  //         return val / 1;
  //       },
  //     },
  //   },

  //   xaxis: {
  //     categories: barChart1Data.labels,
  //     ticks: {
  //       maxRotation: 80,
  //       autoSkip: false,
  //     },
  //   },
  //   legend: {
  //     position: "top",
  //     horizontalAlign: "center",
  //   },
  // };

  // var sColStacked = {
  //   chart: {
  //     height: 500,
  //     type: "bar",
  //     stacked: true,
  //     toolbar: {
  //       show: false,
  //     },
  //   },
  //   colors: ["rgb(255, 69, 96)", "rgb(254, 176, 25)", "rgb(0, 227, 150)"],

  //   plotOptions: {
  //     bar: {
  //       horizontal: false,
  //     },
  //   },
  //   series: [
  //     {
  //       name: "#Not started",
  //       data: series3,
  //     },
  //     {
  //       name: "#InProgress",
  //       data: series4,
  //     },
  //     {
  //       name: "#Completed",
  //       data: series5,
  //     },
  //   ],
  //   xaxis: {
  //     categories: barChart2Data.labels,
  //     ticks: {
  //       maxRotation: 80,
  //       autoSkip: false,
  //     },
  //   },
  //   yaxis: {
  //     beginAtZero: true,
  //     ticks: {
  //       stepSize: 20,
  //     },
  //     labels: {
  //       formatter: (val) => {
  //         return val / 1;
  //       },
  //     },
  //   },

  //   legend: {
  //     position: "top",
  //     horizontalAlign: "center",
  //   },
  //   fill: {
  //     opacity: 1,
  //   },
  // };

  // var optionsStudent = {
  //   chart: {
  //     height: 500,
  //     type: "line",
  //     toolbar: {
  //       show: false,
  //     },
  //   },
  //   colors: ["rgb(0, 143, 251)", "rgb(0, 227, 150)"],
  //   legend: {
  //     position: "top",
  //     horizontalAlign: "center",
  //   },
  //   series: [
  //     {
  //       name: "#NonATL Students",
  //       type: "column",
  //       data: series6,
  //     },
  //     {
  //       name: "#ATL Students",
  //       type: "line",
  //       data: series7,
  //     },
  //   ],
  //   stroke: {
  //     width: [0, 4],
  //   },

  //   xaxis: {
  //     categories: barChart3Data.labels,
  //     ticks: {
  //       maxRotation: 80,
  //       autoSkip: false,
  //     },
  //   },
  //   yaxis: [
  //     {
  //       title: {
  //         text: "NonATL Student",
  //       },
  //     },
  //     {
  //       opposite: true,
  //       title: {
  //         text: "ATL Student",
  //       },
  //     },
  //   ],
  // };

  // var radialChart = {
  //   chart: {
  //     height: 350,
  //     type: "radialBar",
  //     toolbar: {
  //       show: false,
  //     },
  //   },
  //   colors: ["rgb(0, 227, 150)", "rgb(254, 176, 25)", "rgb(255, 69, 96)"],
  //   plotOptions: {
  //     radialBar: {
  //       dataLabels: {
  //         name: {
  //           fontSize: "22px",
  //         },
  //         value: {
  //           fontSize: "16px",
  //         },
  //         total: {
  //           show: true,
  //           label: "Total",
  //           formatter: function () {
  //             return totalCount.totalStudents;
  //           },
  //         },
  //       },
  //     },
  //   },
  //   series: [
  //     Math.round((totalCount.courseCompleted * 100) / totalCount.totalStudents),
  //     Math.round(
  //       (totalCount.courseINprogesss * 100) / totalCount.totalStudents
  //     ),
  //     Math.round(
  //       ((totalCount.totalStudents -
  //         (totalCount.courseCompleted + totalCount.courseINprogesss)) *
  //         100) /
  //         totalCount.totalStudents
  //     ),
  //   ],
  //   labels: ["Completed", "InProgress", "NotStarted"],
  // };

  // useEffect(() => {
  //     nonAtlCount();
  // }, []);
 
  const handleDownload = () => {
    if (
      !selectstate ||
      //  || !district
      !category ||
      !sdg
    ) {
      notification.warning({
        message:
          "Please select a state and category type, Theme before Downloading Reports.",
      });
      return;
    }
    setIsDownload(true);
    fetchData();
  };
  useEffect(() => {
    if (studentDetailedReportsData.length > 0) {
      console.log("Performing operation with the updated data.");
      csvLinkRef.current.link.click();
    }
  }, [studentDetailedReportsData]);
  const fetchData = () => {
    const apiRes = encryptGlobal(
      JSON.stringify({
        state: selectstate,
        district: district,
        category: category,
        theme:sdg,
      })
    );
    // console.log(selectstate,district,category);
    const config = {
      method: "get",
      url:
        process.env.REACT_APP_API_BASE_URL +
        `/reports/ideadeatilreport?Data=${apiRes}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.data[0]?.token}`,
      },
    };
    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          // console.log(response,"filter");
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
          // const postSurveyMap = response.data.data[0].postSurvey.reduce(
          //   (map, item) => {
          //     map[item.user_id] = item.post_survey_status;
          //     return map;
          //   },
          //   {}
          // );
          // const ideaStatusDataMap = response.data.data[0].ideaStatusData.reduce(
          //   (map, item) => {
          //     map[item.team_id] = item.status;
          //     return map;
          //   },
          //   {}
          // );
          // const userTopicDataMap = response.data.data[0].userTopicData.reduce(
          //   (map, item) => {
          //     map[item.user_id] = item.user_count;
          //     return map;
          //   },
          //   {}
          // );

          const studentAndteam = response.data.data[0].summary.map((item) => {
            return {
              ...item,
              // pre_survey_status: preSurveyMap[item.user_id] || "Not started",
              // post_survey_status: postSurveyMap[item.user_id] || "Not started",
              // idea_status: ideaStatusDataMap[item.team_id] || "Not Initiated",
              // user_count:
              //   userTopicDataMap[item.user_id] === 0 ||
              //   userTopicDataMap[item.user_id] === undefined
              //     ? "Not Started"
              //     : userTopicDataMap[item.user_id] === 31
              //     ? "Completed"
              //     : "In Progress",
              // course_per:
              //   userTopicDataMap[item.user_id] &&
              //   typeof userTopicDataMap[item.user_id] === "number"
              //     ? `${Math.round(
              //         (userTopicDataMap[item.user_id] / 31) * 100
              //       )}%`
              //     : `0%`,
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
              // whatapp_mobile: mentorMap[item.mentor_id].whatapp_mobile,
              mentorUserId: mentorMap[item.mentor_id].mentorUserId,
              city: mentorMap[item.mentor_id].city,
              principal_name: mentorMap[item.mentor_id].principal_name,
              principal_mobile: mentorMap[item.mentor_id].principal_mobile,
              pin_code: mentorMap[item.mentor_id].pin_code,
              address: mentorMap[item.mentor_id].address,

            };
          });
          const newdatalist = mentorAndOrg.map((item) => {
            return {
              ...item,
              verifiedment: item.verified_status == null ? "Not yet Reviewed" : item.verified_status,
              username: mentorUsernameMap[item.mentorUserId],

            };
          });

          // console.log(newdatalist,"filter");
          setstudentDetailedReportsData(newdatalist);
          if (response.data.data[0].summary.length > 0) {
            openNotificationWithIcon(
              "success",
              "Report Downloaded Successfully"
            );
          } else {
            openNotificationWithIcon("error", "No Data Found");
          }
          //   csvLinkRef.current.link.click();
          //   console.log(studentDetailedReportsData,"ttt");
          setIsDownload(false);
        }
      })
      .catch(function (error) {
        console.log(error);
        setIsDownload(false);
      });
  };
  console.log(studentDetailedReportsData,"all");

  const fetchChartTableData = () => {
    const config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + "/reports/ideaReportTable",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.data[0]?.token}`,
      },
    };

    axios(config)
      .then((response) => {
        if (response.status === 200) {
          // console.log(response, "Idea");
          const combinedArray = response?.data?.data || [];

          const total = combinedArray.reduce(
            (acc, item) => {
              (acc.totalSubmited += item.totalSubmited),
              // (acc.ATL_Count += item.ATL_Count);
              // acc.NonATL_Count += item.NonATL_Count;
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
              // ATL_Count: 0,
              // NonATL_Count: 0,
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

          // const barData = {
          //   labels: combinedArray.map((item) => item.state),
          //   datasets: [
          //     {
          //       label: "No.of Students Enrolled",
          //       data: combinedArray.map((item) => item.totalStudents),
          //       backgroundColor: "rgba(255, 0, 0, 0.6)",
          //     },
          //     {
          //       label: "No. of Teams created",
          //       data: combinedArray.map((item) => item.totalTeams),
          //       backgroundColor: "rgba(75, 162, 192, 0.6)",
          //     },
          //   ],
          // };
          // setseries2(barData.datasets[0].data);
          // setseries1(barData.datasets[1].data);

          // const stackedBarChartData = {
          //   labels: combinedArray.map((item) => item.state),
          //   datasets: [
          //     {
          //       label: "No. of Students not started course",
          //       data: combinedArray.map((item) => item.courseNotStarted),
          //       backgroundColor: "rgba(255, 0, 0, 0.6)",
          //     },
          //     {
          //       label: "No. of Students course IN progress",
          //       data: combinedArray.map((item) => item.courseINprogesss),
          //       backgroundColor: "rgba(255, 255, 0, 0.6)",
          //     },
          //     {
          //       label: "No. of Students Completed Course",
          //       data: combinedArray.map((item) => item.courseCompleted),
          //       backgroundColor: "rgba(0, 128, 0, 0.6)",
          //     },
          //   ],
          // };
          // setseries3(stackedBarChartData.datasets[0].data);
          // setseries4(stackedBarChartData.datasets[1].data);
          // setseries5(stackedBarChartData.datasets[2].data);
          const newcombinedArray = [...combinedArray, total];
          setCombinedArray(combinedArray);
          setDownloadTableData(newcombinedArray);
          setDoughnutChartData(doughnutData);
          // setBarChart1Data(barData);
          // setBarChart2Data(stackedBarChartData);
          setTotalCount(total);
          // console.log(total,"tt");
        }
      })
      .catch((error) => {
        console.log("API error:", error);
      });
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>Ideas Detailed Report</h4>
              <h6>
                {/* Student Progress - Presurvey , Course, Teams , Post survey
                Status Report */}
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
              <Col md={3}>
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
                  {/* <Select
                    list={categoryData}
                    setValue={setCategory}
                    placeHolder={"Select Category"}
                    value={category}
                  /> */}
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
              <Col md={3}>
                <div className="my-2 d-md-block d-flex justify-content-center">
                  <Select
                    list={newThemesList}
                    setValue={setSdg}
                    placeHolder={"Select Theme"}
                    value={sdg}
                  />
                </div>
              </Col>
              <Col
                md={2}
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
              </Col>
            </Row>
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
                                  Ideas Themes as of {newFormat}
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
                            {/* <div className="col-sm-12 col-md-12 col-xl-6 text-center mt-3">
                              <p>
                                <b>Students Course Status As of {newFormat}</b>
                              </p>
                              {totalCount && (
                                <div id="radial-chart">
                                  <ReactApexChart
                                    options={radialChart}
                                    series={radialChart.series}
                                    type="radialBar"
                                    height={350}
                                  />
                                </div>
                              )}
                            </div> */}
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
                            State Ideas Progress Stats
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
                                    {/* <FontAwesomeIcon
                                      icon={faChalkboardTeacher}
                                    />{" "} */}
                                    #Digital Transformation
                                  </th>
                                  <th
                                    style={{
                                      whiteSpace: "wrap",
                                      color: "#36A2EB",
                                    }}
                                  >
                                    {/* <FontAwesomeIcon
                                      icon={faChalkboardTeacher}
                                    />{" "} */}
                                    #Economic Empowerment
                                  </th>
                                  <th
                                    style={{
                                      whiteSpace: "wrap",
                                      color: "#36A2EB",
                                    }}
                                  >
                                    {/* <FontAwesomeIcon
                                      icon={faChalkboardTeacher}
                                    /> */}
                                    #Health and Well-being
                                  </th>
                                  
                                  <th
                                    style={{
                                      whiteSpace: "wrap",
                                      color: "#36A2EB",
                                    }}
                                  >
                                    {/* <FontAwesomeIcon
                                      icon={faChalkboardTeacher}
                                    />{" "} */}
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
              {/* <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title">
                      Teams, Students Enrolled As of {newFormat}
                    </h5>
                  </div>
                  <div className="card-body">
                    <div id="s-line-area" />
                    <ReactApexChart
                      options={options}
                      series={options.series}
                      type="line"
                      height={400}
                    />
                  </div>
                </div>
              </div> */}
              {/* <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title">
                      Student Course Status As of {newFormat}
                    </h5>
                  </div>
                  <div className="card-body">
                    <div id="s-col-stacked" />
                    <ReactApexChart
                      options={sColStacked}
                      series={sColStacked.series}
                      type="bar"
                      height={400}
                    />
                  </div>
                </div>
              </div> */}
              {/* <div className="col-md-12">
                        <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">No.of Students Enrolled from ATL v/s Non ATL Schools{' '}{newFormat}</h5>
                        </div>
                        <div className="card-body">
                            <div id="mixed-chart" />
                            <ReactApexChart
                            options={optionsStudent}
                            series={optionsStudent.series}
                            type="line"
                            height={400}
                            />
                        </div>
                        </div>
                    </div> */}

              {downloadTableData && (
                <CSVLink
                  data={downloadTableData}
                  headers={tableHeaders}
                  filename={`IdeasDetailedSummaryReport_${newFormat}.csv`}
                  className="hidden"
                  ref={csvLinkRefTable}
                >
                  Download Table CSV
                </CSVLink>
              )}

              {studentDetailedReportsData && (
                <CSVLink
                  headers={teacherDetailsHeaders}
                  data={studentDetailedReportsData}
                  filename={`IdeasProgressDetailedReport_${newFormat}.csv`}
                  className="hidden"
                  ref={csvLinkRef}
                >
                  Download Idea Detailed CSV
                </CSVLink>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default IdeaReport;
