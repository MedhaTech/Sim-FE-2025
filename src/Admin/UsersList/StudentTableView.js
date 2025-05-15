/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { Container, Row, Card, CardBody, CardText, Col } from 'reactstrap';
import { useDispatch } from 'react-redux';
import DataTable, { Alignment } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { getCurrentUser, openNotificationWithIcon } from '../../helpers/Utils';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { encryptGlobal } from '../../constants/encryptDecrypt';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import logout from '../../assets/img/logout.png';
import { studentResetPassword } from '../../Teacher/store/teacher/actions';

const CommonUserProfile = (props) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [button, setButton] = useState('');
    const [data, setData] = useState('');
    const currentUser = getCurrentUser('current_user');

    const StudentsDaTa = JSON.parse(localStorage.getItem('studentData'));
    const [course, setCourse] = useState([]);
    const [courseTable, setCourseTable] = useState([]);

    const language = useSelector(
        (state) => state?.studentRegistration?.studentLanguage
    );
    const dashboardStatus = useSelector(
        (state) => state?.studentRegistration.dashboardStatus
    );
    const [badges, setBadges] = useState(0);
  const [quiz, setQuiz] = useState(0);
  const [videos, setVideos] = useState(0);
useEffect(()=>{
    stuQuizCount();
    stuVideosCount();
    stuBadgesCount();
},[]);
    const dispatch = useDispatch();
   
    useEffect(() => {
               // This function fetches students Course percentage from the API //

        const stuParam = encryptGlobal(
            JSON.stringify({
                user_id: StudentsDaTa.user_id
            })
        );
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/dashboard/stuCourseStats?Data=${stuParam}`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                   
                    setCourse(response.data.data[0]);
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }, []);
     useEffect(() => {
               // This function fetches students quiz score from the API //

        const stuParam = encryptGlobal(
            JSON.stringify({
                user_id: StudentsDaTa.user_id
            })
        );
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/dashboard/quizscores?Data=${stuParam}`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {

                    setCourseTable(response.data.data[0]?.scores);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    const stuQuizCount = () => {
               // This function fetches students quiz count from the API //

        const quizApi = encryptGlobal(
          JSON.stringify({
            user_id: StudentsDaTa?.user_id
          })
        );
        var config = {
          method: 'get',
          url:
            process.env.REACT_APP_API_BASE_URL +
            `/dashboard/stuQuizStats?Data=${quizApi}`,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${currentUser.data[0]?.token}`
          }
        };
        axios(config)
          .then(function (response) {
            if (response.status === 200) {
              setQuiz(response.data.data[0].quiz_completed_count);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      };
      const stuVideosCount = () => {
               // This function fetches students videos count from the API //

        const videoApi = encryptGlobal(
          JSON.stringify({
            user_id: StudentsDaTa?.user_id
          })
        );
        var config = {
          method: 'get',
          url:
            process.env.REACT_APP_API_BASE_URL +
            `/dashboard/stuVideoStats?Data=${videoApi}`,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${currentUser.data[0]?.token}`
          }
        };
        axios(config)
          .then(function (response) {
            if (response.status === 200) {
              setVideos(response.data.data[0].videos_completed_count);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      };
    const stuBadgesCount = () => {
               // This function fetches students badges count from the API //

        const badgeApi = encryptGlobal(
          JSON.stringify({
            user_id: StudentsDaTa?.user_id
          })
        );
        var config = {
          method: 'get',
          url:
            process.env.REACT_APP_API_BASE_URL +
            `/dashboard/stuBadgesStats?Data=${badgeApi}`,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${currentUser.data[0]?.token}`
          }
        };
        axios(config)
          .then(function (response) {
            if (response.status === 200) {
              setBadges(response.data.data[0].badges_earned_count);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      };
    const dashboardTeamProgressStatus = useSelector(
        (state) => state?.studentRegistration.dashboardTeamProgressStatus
    );
    const handleViewBack = () => {
     
        navigate("/students");
       
    };
   
   
 

    const handleEdit = () => {
        navigate(
            "/student-edit",
            {state: {
                Age: StudentsDaTa.Age,
                Gender: StudentsDaTa.Gender,
                Grade: StudentsDaTa.Grade,
                student_id: StudentsDaTa.student_id,
                team_id: StudentsDaTa?.team.team_id,
                full_name: StudentsDaTa.full_name,
                disability: StudentsDaTa.disability,
                username: StudentsDaTa.username_email
            }
        });
    };
    const CourseData = {
        data: courseTable && courseTable.length > 0 ? courseTable : [],
        columns: [
            {
                name: 'No',
                selector: (row, key) => key + 1,
                width: '10rem'
            },
            {
                name: 'Quiz',
                selector: (row) => row.quiz_id,
                sortable: true,
                width: '10rem'
            },

            {
                name: 'Attempts',
                selector: (row) => row.attempts,
                sortable: true,
                width: '15rem'
            },
            {
                name: 'Score',
                selector: (row) => (row.score ? row.score : '-'),
                width: '20rem'
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
             <h3 className="m-2" 
        style={{ position: 'sticky', top: '70px', zIndex: 1000, padding: '10px',backgroundColor: 'white', display: 'inline-block' , color: '#fe9f43',fontSize:"16px" }}
        >Students
        </h3>
        <div className="content">
            <Container className="dynamic-form">
                <Row>
                    <div className="col-6 mb-2">
                        <button
                          className='btn btn-info me-2'
                          onClick={handleEdit}
                        >
                        Edit
                        </button> 
                    </div>
                    <div className="col-6 text-end mb-2">
                        <button
                          className='btn btn-secondary'
                            onClick={handleViewBack}
                        >
                        Back
                        </button>
                    </div>
                </Row>
                <Row>
                    <Card className="py-1 mb-2">
                        <CardBody>
                        <h4 className="text-primary mb-3">Student Details</h4>
                            <CardText>
                                <span className="mx-3">
                                    <b>Name :</b>
                                </span>
                                <b>
                                    {StudentsDaTa.full_name}
                                   
                                </b>
                            </CardText>
                            <CardText>
                                <span className="mx-3">
                                    <b>Class :</b>
                                </span>
                                <b>{StudentsDaTa.Grade}</b>
                            </CardText>
                            <CardText>
                                <span className="mx-3">
                                    <b> Gender :</b>
                                </span>
                                <b>{StudentsDaTa.Gender}</b>
                            </CardText>

                            <CardText>
                                <span className="mx-3">
                                    <b>Age :</b>
                                </span>
                                <b>{StudentsDaTa.Age}</b>
                            </CardText>
                            <CardText>
                                <span className="mx-3">
                                    <b>Disability :</b>
                                </span>
                                <b>{StudentsDaTa?.disability}</b>
                            </CardText>
                           

                            <CardText>
                                <span className="mx-3">
                                    <b>Teacher Name :</b>
                                </span>
                                <b>{StudentsDaTa.team?.mentor.full_name}</b>
                            </CardText>
                            <CardText>
                                <span className="mx-3">
                                    <b>Team Name :</b>
                                </span>
                                <b>{StudentsDaTa?.team.team_name}</b>
                            </CardText>
                            <CardText>
                                <span className="mx-3">
                                    <b>Team User Id : </b>
                                </span>
                                <b>{StudentsDaTa?.team?.user?.username}</b>
                            </CardText>
                        </CardBody>
                    </Card>
                </Row>
                <Row className="my-1">
                    <Card className="py-1">
                        <CardBody>
                            <h4 className="mb-3 text-primary">Organization Details</h4>

                            <CardText>
                                <span className="mx-3">
                                    <b>UDISCE Code :</b>
                                </span>

                                <b>
                                    {
                                        StudentsDaTa?.team?.mentor?.organization
                                            .organization_code
                                    }
                                </b>
                            </CardText>
                            <CardText>
                                <span className="mx-3">
                                    <b>School Name :</b>
                                </span>
                                <b>
                                    {
                                        StudentsDaTa?.team?.mentor?.organization
                                            .organization_name
                                    }
                                </b>
                            </CardText>

                            <CardText>
                                <span className="mx-3">
                                    <b>District :</b>
                                </span>
                                <b>
                                    {
                                        StudentsDaTa?.team?.mentor?.organization
                                            .district
                                    }
                                </b>
                            </CardText>
                            <CardText>
                                <span className="mx-3">
                                    <b>State :</b>
                                </span>
                                <b>
                                    {
                                        StudentsDaTa?.team?.mentor?.organization
                                            .state
                                    }
                                </b>
                            </CardText>
                            <CardText>
                                <span className="mx-3">
                                    <b>School Category :</b>
                                </span>
                                <b>
                                    {
                                        StudentsDaTa?.team?.mentor?.organization
                                            .category
                                    }
                                   
                                </b>
                            </CardText>
                            <CardText>
                                <span className="mx-3">
                                    <b>Pincode :</b>
                                </span>
                                <b>
                                    {
                                        StudentsDaTa?.team?.mentor?.organization
                                            .pin_code
                                    }
                                </b>
                            </CardText>
                            <CardText>
                                <span className="mx-3">
                                    <b>Address :</b>
                                </span>
                                <b>
                                    {
                                        StudentsDaTa?.team?.mentor?.organization
                                            .address
                                    }
                                </b>
                            </CardText>
                        </CardBody>
                    </Card>
                </Row>
                <Row className="my-1">
                    <Card className="py-1">
                        <CardBody>
                            <h4 className="mb-3 text-primary">Course Details</h4>

                            <CardText>
                                <span className="mx-3">
                                    <b>Completed Videos :</b>
                                </span>
                                <b>
                                    {videos
                                    }
                                </b>
                            </CardText>

                            <CardText>
                                <span className="mx-3">
                                    <b>Completed Quiz :</b>
                                </span>
                                <b>
                                    {quiz}
                                </b>
                            </CardText>
                            <CardText>
                                <span className="mx-3">
                                    <b>Course Completion :</b>
                                </span>
                                <b>
                                    {course?.topics_completed_count !==
                                    undefined
                                        ? `${
                                              Math.round(
                                                  (course?.topics_completed_count /
                                                    course?.all_topics_count) *
                                                      100
                                              ) + '%'
                                          }`
                                        : '-'}
                                </b>
                            </CardText>
                            <CardText>
                                <span className="mx-3">
                                    <b>Earned Badges :</b>
                                </span>
                                <b>
                                    {badges}
                                </b>
                            </CardText>
                        </CardBody>
                    </Card>
                </Row>
              
                <Row>
                    <Card className="py-2">
                        <CardBody>
                            <h4 className="mb-2">Quiz Details Table Format</h4>
                        </CardBody>
                        <div className="my-2">
                            <DataTableExtensions
                                {...CourseData}
                                exportHeaders
                                print={false}
                            >
                                <DataTable
                                    data={setCourseTable}
                                    customStyles={customStyles}
                                    defaultSortField="id"
                                    defaultSortAsc={false}
                                    pagination
                                    highlightOnHover
                                    fixedHeader
                                    subHeaderAlign={Alignment.Center}
                                />
                            </DataTableExtensions>
                        </div>
                    </Card>
                </Row>
            </Container>
            </div>
            </div>
    );
};

export default CommonUserProfile;
