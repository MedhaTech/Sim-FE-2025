/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import { useState } from 'react';
import React, { useEffect } from 'react';
import { Container, Row } from 'reactstrap';
import DataTableExtensions from 'react-data-table-component-extensions';
import DataTable, { Alignment } from 'react-data-table-component';
import { getCurrentUser } from '../../helpers/Utils';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import { openNotificationWithIcon } from '../../helpers/Utils';
// import { ReactDOM } from 'react-dom';
// import * as ReactDOM from 'react-dom';
import Swal from 'sweetalert2/dist/sweetalert2';
import logout from '../../assets/img/logout.png';
import { useNavigate } from 'react-router-dom';
import { PlusCircle } from "feather-icons-react/build/IconComponents";
import { FaWhatsapp } from 'react-icons/fa';
import { FaCheck, FaTimes } from 'react-icons/fa';  // For success and disable icons

import 'sweetalert2/src/sweetalert2.scss';
import { encryptGlobal } from '../../constants/encryptDecrypt';
const StateData = () => {
    const navigate = useNavigate();
    const [resList, setResList] = useState([]);
    const currentUser = getCurrentUser('current_user');
    useEffect(() => {
        handleResList();
    }, []);
    async function handleResList() {
        //  handleResList Api where we can see list of all resource //
        let config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + '/state_coordinators',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
        };
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    // console.log(response,"ress");
                    setResList(response.data && response.data.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleEdit = (item) => {
            navigate('/edit-state-wise');
            
        localStorage.setItem('resID', JSON.stringify(item));
    };

    const handleDelete = (item) => {
        // here we can delete the team //
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
                text: "Do you really want to delete this item, This process cannot be undone.",
                imageUrl: `${logout}`,
                // showCloseButton: true,
                confirmButtonText: 'Delete',
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                reverseButtons: false
            })
            .then((result) => {
                if (result.isConfirmed) {
                    const delParam = encryptGlobal(
                        JSON.stringify(item.resource_id)
                    );
                    var config = {
                        method: 'delete',
                        url:
                            process.env.REACT_APP_API_BASE_URL +
                            '/resource/' +
                            delParam,
                        headers: {
                            'Content-Type': 'application/json',
                            // Accept: "application/json",
                            Authorization: `Bearer ${currentUser?.data[0]?.token}`
                        }
                    };
                    axios(config)
                        .then(function (response) {
                            if (response.status === 200) {
                                openNotificationWithIcon(
                                    'success',
                                    'Resource Deleted Successfully'
                                );
                                handleResList();
                            } else {
                                openNotificationWithIcon(
                                    'error',
                                    'Opps! Something Wrong'
                                );
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                 } 
            });
    };
    async function handleStatus(item, value) {
        // alert("hii");
        const body = {
            mentor_note: item.mentor_note,
            // type: item.type,
            student_note
: item.student_note
            ,
            state:item.state,
            
ideaSubmission: value
        };
        // if (
        //     item.navigate !== item.navigate
        //     ) {
        //         body['navigate'] = item.navigate;
        //     }
        const popParam = encryptGlobal(JSON.stringify(item.
            
state_coordinators_id
            ));
        
        let config = {
            method: 'put',
            url: process.env.REACT_APP_API_BASE_URL + `/state_coordinators/${popParam}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            },
            data:JSON.stringify(body)
        };
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    // console.log(response,"put");
                    if (response.data.data[0] === 0) {
                        openNotificationWithIcon(
                            'success',
                            'State Status Disabled successfully'
                        );
                    } else if (response.data.data[0] === 1) {
                        openNotificationWithIcon(
                            'success',
                            'State Status Enabled successfully'
                        );
                    }
                  
                    setTimeout(()=>{

                        handleResList();
                    },500);
                    // setshowspin(false);
                }
            })
            .catch(function (error) {
                console.log(error);
                // setshowspin(false);
            });
    }
    const resData = {
        data: resList && resList.length > 0 ? resList : [],
        // data: staticData,
        columns: [
            {
                name: 'No',
                selector: (row, key) => key + 1,
                sortable: true,
                width: '5rem'
                // center: true,
            },

            // {
            //     name: 'Role',
            //     selector: (row) => row.role,
            //     width: '7rem'
            //     // center: true,
            // },
            {
                name: 'State',
                selector: (row) => row.
                state_name,
                width: '12rem'
            },
            // {
            //     name: 'whatsapp Link',
            //     selector: (row) => row.whatapp_link
            //     ,
            //     width: '10rem'
            // },
            {
                name: 'whatsapp Link',
                width: '10rem',
                center: true,
                cell: (record) => {
                    if (record.whatapp_link === null) {
                        return <p>No link</p>;
                    } else {
                        return (
                            <a
                                href={record.whatapp_link}
                                target="_blank"
                                rel="noreferrer"
                            >
                                 <FaWhatsapp style={{color:"green" ,fontSize:"1.5rem"}}/>
                                {/* Navigate */}
                            </a>
                        );
                    }
                }
            },
            {
                name: 'Teacher Inst',
                selector: (row) => row.mentor_note
                ,
                width: '17rem'
            },  {
                name: 'student Inst',
                selector: (row) => row.student_note
                ,
                width: '17rem'
            },

            // {
            //     name: 'File/Link',
            //     width: '8rem',
            //     cell: (record) => {
            //         if (record.type === 'file') {
            //             return (
            //                 <a
            //                     href={record.attachments}
            //                     target="_blank"
            //                     className="badge badge-md bg-secondary"
            //                     rel="noopener noreferrer"
            //                     >
            //                     <i className="fas fa-file-lines"></i> Check File
            //                 </a>
            //             );
            //         } else if (record.type === 'link') {
            //             return (
            //                 <a
            //                     href={record.attachments}
            //                     target="_blank"
            //                     className="badge badge-md bg-secondary"
            //                     rel="noopener noreferrer"
            //                     >
            //                     <i className="fa-brands fa-youtube"></i> Navigate
            //                 </a>
            //             );
            //         }
            //         return null;
            //     }
            // },
            {
                name: 'Actions',
                center: true,
                width: '8rem',
                cell: (record) => [
                    <>
                        <button
                              className="btn btn-info btn-sm"
                              onClick={() => handleEdit(record)}
                            >
                              <i data-feather="edit" className="feather-edit" /> Edit
                        </button>
                        {/* <button
                              className="btn btn-danger btn-sm mx-3"
                              onClick={() => handleDelete(record)}
                            >
                              <i data-feather="trash-2" className="feather-trash-2" />{" "}
                              Delete
                        </button> */}
                    </>
                ]
            },
            {
                name: 'Enable/Disable',
                width: '9rem',
                cell: (record) => {
                    
                    if (record.
                        ideaSubmission === 1) {
                        return (
                            <a
                                className="btn btn-danger"
                                onClick={() => {
                                    handleStatus(record
                                        , '0');
                                }}
                            >
                                 {/* <FaTimes style={{ marginRight: '5px' }} /> */}
                                Disable
                            </a>
                        );
                    } else if (record.
                        ideaSubmission === 0) {
                        return (
                            <button
                                className="btn btn-success"
                                onClick={() => {
                                    handleStatus(record
                                        , '1');
                                }}
                            >
                                Enable
                            </button>
                        );
                    }
                }
            },
        ]
    };
    const customStyles = {
        rows: {
          style: {
            fontSize: "14px",
          },
        },
        headCells: {
          style: {
            fontSize: "16px",
          },
        },
        cells: {
          style: {
            fontSize: "14px",
          },
        },
      };
    return (
        <div className="page-wrapper">
            <div className="content">
                <div className="page-header">
                    <div className="add-item d-flex">
                        <div className="page-title">
                            <h4>State Specific</h4>
                            {/* <h6>Student &amp; Teachers Resourses</h6> */}
                        </div>
                    </div>
                    {/* <div className="page-btn">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => navigate("/createResource")}
                        >
                            <PlusCircle className="me-2" style={{color:"white"}} />Create Resources
                        </button>
                    </div> */}
                </div>
                <Container className="ticket-page mb-50">
                    <Row>
                        <div className="my-2">
                            <DataTableExtensions
                                print={false}
                                export={false}
                                {...resData}
                                exportHeaders
                            >
                                <DataTable
                                    data={setResList}
                                    // noHeader
                                    defaultSortField="id"
                                    customStyles={customStyles}

                                    defaultSortAsc={false}
                                    pagination
                                    highlightOnHover
                                    fixedHeader
                                    subHeaderAlign={Alignment.Center}
                                />
                            </DataTableExtensions>
                        </div>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default StateData;
