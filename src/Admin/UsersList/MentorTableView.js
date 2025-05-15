/* eslint-disable react/no-unknown-property */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import { Descriptions, Input } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button } from '../../stories/Button';

import { Col, Container, Row, CardBody, CardText } from 'reactstrap';
import jsPDF from 'jspdf';
import DataTable, { Alignment } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import { URL, KEY } from '../../constants/defaultValues';
import Swal from 'sweetalert2/dist/sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import logout from '../../assets/img/logout.png';
import { useDispatch } from 'react-redux';
import { encryptGlobal } from '../../constants/encryptDecrypt';
import {
    deleteTempMentorById,
    teacherResetPassword
} from '../store/admin/actions';
import {
    getCurrentUser,
    getNormalHeaders,
    openNotificationWithIcon
} from '../../helpers/Utils';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();

    // here we can see the registration details //
    // const history = useHistory();
    const dispatch = useDispatch();
    const pdfRef = React.useRef(null);
   
    const navigate = useNavigate();
    const orgData = JSON.parse(localStorage.getItem('mentor'));

   

    const currentUser = getCurrentUser('current_user');
   
    const [mentorId, setMentorId] = useState('');
    const [SRows, setSRows] = React.useState([]);
    const [mentorTeam, setMentorTeam] = useState([]);
    const [count, setCount] = useState(0);
    const [error, setError] = useState('');
    const [isideadisable, setIsideadisable] = useState(false);
    

 
    useEffect(() => {
        getMentorIdApi(orgData.mentor_id);
    }, []);
   
  



    async function getMentorIdApi(id) {
        // Mentor Id  Api//
        // id = Mentor Id //
        let axiosConfig = getNormalHeaders(KEY.User_API_Key);
        let enParamData = encryptGlobal(
            JSON.stringify({
                mentor_id: id,
                status: 'ACTIVE',
                ideaStatus: true
            })
        );
        axiosConfig['params'] = {
            Data: enParamData
        };
        await axios
            .get(`${URL.getTeamMembersList}`, axiosConfig)
            .then((res) => {
                if (res?.status == 200) {
                    var mentorTeamArray = [];
                    res &&
                        res.data &&
                        res.data.data[0] &&
                        res.data.data[0].dataValues.length > 0 &&
                        res.data &&
                        res.data.data[0].dataValues.map((teams, index) => {
                            var key = index + 1;
                            return mentorTeamArray.push({ ...teams, key });
                        });
                    setMentorTeam(mentorTeamArray);
                }
            })
            .catch((err) => {
                return err.response;
            });
    }

    const handleEdit = () => {
        //  here  We can edit the Registration details //
        // Where data = orgData //
        navigate(
             '/admin-mentor-edit',
           { state: {
                full_name: orgData.full_name,
                mobile: orgData.mobile,
                username: orgData.username,
                mentor_id: orgData.mentor_id,
                where: 'Dashbord',
                organization_code: orgData.organization.organization_code,
                title: orgData.title,
                gender: orgData.gender,
                whatapp_mobile: orgData.whatapp_mobile
            }
        });
    };
    const handleShiftDiesCocde= () => {
        //  here  We can edit the Registration details //
        // Where data = orgData //
        navigate(
             '/admin-mentor-shift',
           { state: {
                username: orgData.username,
                mentor_id: orgData.mentor_id,
                organization_code: orgData.organization.organization_code,
                full_name: orgData.full_name,
            }
        });
    };
    const handleresetpassword = (data) => {
          // Navigates to the mentor shift search page with required mentor and organization data
 
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-submit',
                cancelButton: 'btn btn-cancel'
            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons
            .fire({
                title: "<h4>Are you sure?</h4>",
                text: 'You are attempting to reset the password',
                imageUrl: `${logout}`,
                confirmButtonText: 'Reset Password',
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                reverseButtons: false
            })
            .then((result) => {
                if (result.isConfirmed) {
                    dispatch(
                        teacherResetPassword({
                            username: orgData.username,
                            mentor_id: data.mentor_id,
                            otp: false
                        })
                    );
                } 
            })
            .catch((err) => console.log(err.response));
    };
    const downloadPDF = () => {
        // where we can download the Registration Details //
        const content = pdfRef.current;
        const doc = new jsPDF('p', 'px', [1280, 1020]);
        doc.html(content, {
            callback: function (doc) {
                doc.save('Detail.pdf');
            }
        });
        console.warn(content);
    };
    const viewDetails = () => {
        // where we can see all details //
        // where orgData = orgnization details , Mentor details //
      
        navigate("/mentor-details");
        localStorage.setItem('orgData', JSON.stringify(orgData));
    };
   
    const MentorsData = {
        data: mentorTeam,
        columns: [
            {
                name: 'No',
                selector: (row) => row.key,
                width: '4rem'
            },
            {
                name: "Username",
                selector: (row) => row.user?.username,
                sortable: true,
                center: true,
                width: "8rem",
              },
            {
                name: 'Team Name',
                selector: (row) => row.team_name,
                sortable: true,
                center: true,
                width: '10rem'
            },
            {
                name: '#Students',
                selector: (row) => row.student_count,
                center: true,
                sortable: true,
                width: '8rem'
            },
            {
                name: 'Idea Status',
                selector: (row) => row.ideaStatus === null ? "Not Initiated"  : row.ideaStatus,
                center: true,
                sortable: true,
                width: '8rem'
            },
          
            {
                name: 'Mentor Idea Review',
                sortable: true,
                selector: (row) =>
                    row.ideaStatus === "SUBMITTED" && row.ideaAcceptance == "ACCEPTED"
                ? row.ideaAcceptance
                : row.ideaStatus === "DRAFT" && row.ideaAcceptance === "REJECTED" 
                  ? row.ideaAcceptance : row.ideaStatus === "DRAFT" || row.ideaStatus === null
                  ? "" :"Not yet Reviewed",
               
                center: true,
                width: '12rem'
            },
            {
                name: "Actions",
                cell: (params) => {
                  return [
                    <>
                      {params.ideaStatus == "SUBMITTED" &&
                       ( params.ideaAcceptance === null 
                        || 
                        params.ideaAcceptance == "" )&&
                        (
                          <Button
                            key={params}
                            
                            className="btn btn-secondary"
                            label={"Revoke"}
                            size="small"
                            shape="btn-square"
                            onClick={() =>
                              handleRevoke(
                                params.challenge_response_id,
                                params.ideaStatus
                              )
                            }
                          />
                        )}
                    </>,
                  ];
                },
                width: "8rem",
                center: true,
              },

        ]
    };
    const handleRevoke = async (id, type) => {
        // where id = challenge response id //
        // here we  can see the Revoke button when ever idea is submitted //
        // where type = ideaStatus //
        let submitData = {
            status: type == 'DRAFT' ? 'SUBMITTED' : 'DRAFT'
        };
        const handleRevPram = encryptGlobal(JSON.stringify(id));

        var config = {
            method: 'put',
            url:
                process.env.REACT_APP_API_BASE_URL +
                '/challenge_response/updateEntry/' +
                handleRevPram,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            },
            data: submitData
        };
        axios(config)
            .then(async function (response) {
                if (response.status === 200) {
                    openNotificationWithIcon(
                        'success',
                        'Idea Submission Status Successfully Update!',
                        ''
                    );
                    await getMentorIdApi(orgData.mentor_id);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const customStyles = {
        rows: {
          style: {
            fontSize: "13px",
          },
        },
        headCells: {
          style: {
            fontSize: "14px",
          },
        },
        cells: {
          style: {
            fontSize: "13px",
          },
        },
      };

    const handleAlert = (id) => {
        // where id = mentor.userid //
        // we can delete the userid //
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-submit',
                cancelButton: 'btn btn-cancel'
            },
            buttonsStyling: false,
            allowOutsideClick: false
        });

        swalWithBootstrapButtons
            .fire({
                title: "<h4>Are you sure?</h4>",
                text:'You are Deleting this Registration' ,
                imageUrl: `${logout}`,
                confirmButtonText: 'Confirm',
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                reverseButtons: false
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    if (result.isConfirmed) {
                        await deleteTempMentorById(id);
                        navigate("/mentors");

                    }
                } 
            });
    };

    return (
        <div className="page-wrapper">
             <h3 className="m-2" 
        style={{ position: 'sticky', top: '70px', zIndex: 1000, padding: '10px',backgroundColor: 'white', display: 'inline-block' , color: '#fe9f43',fontSize:"16px" }}
        >Mentors
        </h3>
        <div className="content">
            <div className="page-header">
                    <div className="add-item d-flex">
                        <div className="page-title">
                            <h4>Mentor Progress & Details</h4>
                            <h6>Edit , Del Reg , Reset pwd , Revoke & View more details here</h6>
                        </div>
                    </div>
                    <div className="page-btn">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate('/mentors')}
                        > <b>Back</b>
                        </button>
                    </div>
                </div>
            <div className="dashboard-wrappermy-5 px-5">
                <div className="dashboard p-2">
                   
                    <div className="row " style={{ overflow: 'auto' }}>
                        <div className=" row  col-12 col-md-12">
                            <div
                                style={{ flex: 1, overflow: 'auto' }}
                                className="bg-white rounded col-lg-12 disc-card-search col-12"
                            >
                               
                              

                               
                                    <>
                                       
                                        <div ref={pdfRef}>
                                            <div className="row">
                                                <div className="col">
                                                    <h4 className="text-center m-3 text-primary ">
                                                        Teacher Registration Details
                                                    </h4>
                                                    <hr />
                                                </div>
                                            </div>
                                            <div className="row ">
                                                <div className="col">

                                                        <Row className="pt-3 pb-3">
                                                        <Col
                                                            xs={5}
                                                            sm={5}
                                                            md={5}
                                                            xl={5}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <p>UDISE Code </p>
                                                        </Col>
                                                        <Col
                                                            xs={1}
                                                            sm={1}
                                                            md={1}
                                                            xl={1}
                                                        >
                                                            :
                                                        </Col>
                                                        <Col
                                                            xs={6}
                                                            sm={6}
                                                            md={6}
                                                            xl={6}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <p>
                                                                {
                                                                    orgData?.organization?.
                                                                    organization_code
                                                                }
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                    <Row className="pt-3 pb-3">
                                                        <Col
                                                            xs={5}
                                                            sm={5}
                                                            md={5}
                                                            xl={5}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <p>School Name</p>
                                                        </Col>
                                                        <Col
                                                            xs={1}
                                                            sm={1}
                                                            md={1}
                                                            xl={1}
                                                        >
                                                            :
                                                        </Col>
                                                        <Col
                                                            xs={6}
                                                            sm={6}
                                                            md={6}
                                                            xl={6}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <p>
                                                                {
                                                                    orgData?.organization?.
                                                                    organization_name
                                                                }
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                    <Row className="pt-3 pb-3">
                                                        <Col
                                                            xs={5}
                                                            sm={5}
                                                            md={5}
                                                            xl={5}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <p>State</p>
                                                        </Col>
                                                        <Col
                                                            xs={1}
                                                            sm={1}
                                                            md={1}
                                                            xl={1}
                                                        >
                                                            :
                                                        </Col>
                                                        <Col
                                                            xs={6}
                                                            sm={6}
                                                            md={6}
                                                            xl={6}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <p>
                                                                {orgData?.organization?.state}
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                    <Row className="pt-3 pb-3">
                                                        <Col
                                                            xs={5}
                                                            sm={5}
                                                            md={5}
                                                            xl={5}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <p>District</p>
                                                        </Col>
                                                        <Col
                                                            xs={1}
                                                            sm={1}
                                                            md={1}
                                                            xl={1}
                                                        >
                                                            :
                                                        </Col>
                                                        <Col
                                                            xs={6}
                                                            sm={6}
                                                            md={6}
                                                            xl={6}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <p>
                                                                {
                                                                    orgData?.organization?.district
                                                                }
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                    <Row className="pt-3 pb-3">
                                                        <Col
                                                            xs={5}
                                                            sm={5}
                                                            md={5}
                                                            xl={5}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <p>Pin Code</p>
                                                        </Col>
                                                        <Col
                                                            xs={1}
                                                            sm={1}
                                                            md={1}
                                                            xl={1}
                                                        >
                                                            :
                                                        </Col>
                                                        <Col
                                                            xs={6}
                                                            sm={6}
                                                            md={6}
                                                            xl={6}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <p>
                                                                {
                                                                    orgData?.organization?.pin_code ? orgData?.organization?.pin_code :"-"
                                                                }
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                     <Row className="pt-3 pb-3">
                                                        <Col
                                                            xs={5}
                                                            sm={5}
                                                            md={5}
                                                            xl={5}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <p>Mandal / Taluka</p>
                                                        </Col>
                                                        <Col
                                                            xs={1}
                                                            sm={1}
                                                            md={1}
                                                            xl={1}
                                                        >
                                                            :
                                                        </Col>
                                                        <Col
                                                            xs={6}
                                                            sm={6}
                                                            md={6}
                                                            xl={6}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <p>
                                                                {
                                                                    orgData.organization.mandal
                                                                }
                                                            </p>
                                                        </Col>
                                                    </Row> 
                                                    <Row className="pt-3 pb-3">
                                                        <Col
                                                            xs={5}
                                                            sm={5}
                                                            md={5}
                                                            xl={5}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <p>School Type</p>
                                                        </Col>
                                                        <Col
                                                            xs={1}
                                                            sm={1}
                                                            md={1}
                                                            xl={1}
                                                        >
                                                            :
                                                        </Col>
                                                        <Col
                                                            xs={6}
                                                            sm={6}
                                                            md={6}
                                                            xl={6}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <p>
                                                                {
                                                                    orgData.organization.school_type
                                                                }
                                                            </p>
                                                        </Col>
                                                    </Row> 
                                                    <Row className="pt-3 pb-3">
                                                        <Col
                                                            xs={5}
                                                            sm={5}
                                                            md={5}
                                                            xl={5}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <p>School Board</p>
                                                        </Col>
                                                        <Col
                                                            xs={1}
                                                            sm={1}
                                                            md={1}
                                                            xl={1}
                                                        >
                                                            :
                                                        </Col>
                                                        <Col
                                                            xs={6}
                                                            sm={6}
                                                            md={6}
                                                            xl={6}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <p>
                                                                {
                                                                    orgData.organization.board
                                                                }
                                                            </p>
                                                        </Col>
                                                    </Row> 
                                                  
                                                    <Row className="pt-3 pb-3">
                                                        <Col
                                                            xs={5}
                                                            sm={5}
                                                            md={5}
                                                            xl={5}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <p>Teacher Name</p>
                                                        </Col>
                                                        <Col
                                                            xs={1}
                                                            sm={1}
                                                            md={1}
                                                            xl={1}
                                                        >
                                                            :
                                                        </Col>
                                                        <Col
                                                            xs={6}
                                                            sm={6}
                                                            md={6}
                                                            xl={6}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <p>
                                                            {
                                                                    orgData
                                                                        
                                                                        ?.title
                                                                }. {
                                                                    orgData
                                                                        
                                                                        ?.full_name
                                                                }
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                    <Row className="pt-3 pb-3">
                                                        <Col
                                                            xs={5}
                                                            sm={5}
                                                            md={5}
                                                            xl={5}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <p>Email Id</p>
                                                        </Col>
                                                        <Col
                                                            xs={1}
                                                            sm={1}
                                                            md={1}
                                                            xl={1}
                                                        >
                                                            :
                                                        </Col>
                                                        <Col
                                                            xs={6}
                                                            sm={6}
                                                            md={6}
                                                            xl={6}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <p>
                                                                {
                                                                    orgData
                                                                       
                                                                        ?.username
                                                                }
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                    <Row className="pt-3 pb-3">
                                                        <Col
                                                            xs={5}
                                                            sm={5}
                                                            md={5}
                                                            xl={5}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <p>Mobile No</p>
                                                        </Col>
                                                        <Col
                                                            xs={1}
                                                            sm={1}
                                                            md={1}
                                                            xl={1}
                                                        >
                                                            :
                                                        </Col>
                                                        <Col
                                                            xs={6}
                                                            sm={6}
                                                            md={6}
                                                            xl={6}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <p>
                                                                {
                                                                    orgData
                                                                       
                                                                        ?.mobile
                                                                }
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                    <Row className="pt-3 pb-3">
                                                        <Col
                                                            xs={5}
                                                            sm={5}
                                                            md={5}
                                                            xl={5}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <p>
                                                                WhatsApp Mobile
                                                                No
                                                            </p>
                                                        </Col>
                                                        <Col
                                                            xs={1}
                                                            sm={1}
                                                            md={1}
                                                            xl={1}
                                                        >
                                                            :
                                                        </Col>
                                                        <Col
                                                            xs={6}
                                                            sm={6}
                                                            md={6}
                                                            xl={6}
                                                            className="my-auto profile-detail"
                                                        >
                                                            <p>
                                                                {
                                                                    orgData
                                                                      
                                                                        ?.whatapp_mobile
                                                                }
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                        </div>
                                      
                                        <div className="d-flex justify-content-between flex-column flex-md-row">
                                            <button
                                                className="btn btn-outline-primary"
                                                onClick={handleEdit}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleresetpassword({
                                                        mentor_id:
                                                            orgData
                                                                ?.mentor_id,
                                                        username:
                                                            orgData
                                                                ?.username
                                                    })
                                                }
                                                className="btn btn-outline-success"
                                            >
                                                Reset Pwd
                                            </button>

                                            <button
                                                onClick={viewDetails}
                                                className="btn btn-outline-info"
                                            >
                                                View Details
                                            </button>
                                            
                                            <button
                                                onClick={() => {
                                                    downloadPDF();
                                                }}
                                                className="btn btn-outline-secondary"
                                            >
                                                Download
                                            </button>

                                            <button
                                                onClick={() => {
                                                   handleShiftDiesCocde();
                                                }}
                                                className="btn btn-info"
                                                
                                            >
                                                Shift Mentor
                                            </button>
                                            <button
                                                onClick={() => {
                                                    handleAlert(
                                                        orgData?.user_id
                                                    );
                                                }}
                                                className="btn btn-danger"
                                                
                                            >
                                                Delete Registration
                                            </button>
                                        </div>
                                        <hr/>

                                       
                                        <div>
                                            <div className="row">
                                                <div className="col">
                                                    <h4 className="text-center m-3 text-primary">
                                                        Enrolled Teams
                                                    </h4>
                                                </div>
                                            </div>
                                            <div>
                                                <DataTableExtensions
                                                    print={false}
                                                    export={false}
                                                    {...MentorsData}
                                                >
                                                    <DataTable
                                                        noHeader
                                                        defaultSortField="id"
                                                        defaultSortAsc={false}
                                                        highlightOnHover
                                                        customStyles={customStyles}
                                                    />
                                                </DataTableExtensions>
                                            </div>
                                        </div>
                                    </>
                              
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Dashboard;
