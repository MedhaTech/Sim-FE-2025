/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import { useState } from 'react';
import React, { useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import DataTableExtensions from 'react-data-table-component-extensions';
import DataTable, { Alignment } from 'react-data-table-component';
import { getCurrentUser } from '../../helpers/Utils';
import axios from 'axios';
import { openNotificationWithIcon } from '../../helpers/Utils';

import Swal from 'sweetalert2/dist/sweetalert2';
import { useNavigate } from "react-router-dom";

import logout from '../../assets/img/logout.png';
import { encryptGlobal } from '../../constants/encryptDecrypt';
import 'sweetalert2/src/sweetalert2.scss';
import { AlertOctagon,PlusCircle, Check} from 'feather-icons-react/build/IconComponents';

const AdminLatestNews = () => {
    const navigate = useNavigate();
    const [resList, setResList] = useState([]);
    const [studentList, setStudentList] = useState([]);

    const [reqList, setReqList] = useState(false);

    const currentUser = getCurrentUser('current_user');
    useEffect(() => {
        teacherList();
    }, []);
    const teacherList = () => {
        // This function fetches mentor latest news list  from the API //
        
        let teacherParam = encryptGlobal(
            JSON.stringify({
                category: 'mentor'
            })
        );
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/latest_news?Data=${teacherParam}`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setResList(response.data.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const handleBack = (e) => {
        // here we can go back to main page //
        setReqList(false);
    };
    async function handleNewStatus(data, value) {
        // This function updates status with the value // 
        const body = {
            status: "ACTIVE",
            category: data.category,
            details: data.details,
            new_status: value
        };
        const newteId = encryptGlobal(JSON.stringify(data.latest_news_id));
        let config = {
            method: 'put',
            url: process.env.REACT_APP_API_BASE_URL + `/latest_news/${newteId}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            },
            data: JSON.stringify(body)
        };
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    if (value === '0') {
                        openNotificationWithIcon(
                            'success',
                            'New Status Disabled successfully'
                        );
                    } else if (value === '1') {
                        openNotificationWithIcon(
                            'success',
                            'New Status Enabled successfully'
                        );
                    }
                    teacherList();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const handleEdit = (item) => {
        // where we can edit level name, no of evaluation //
        navigate(
    '/edit-news'
        );
        localStorage.setItem('newsID', JSON.stringify(item));
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
                confirmButtonText: 'Delete',
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                reverseButtons: false
            })
            .then((result) => {
                if (result.isConfirmed) {
                    const delteId = encryptGlobal(
                        JSON.stringify(item.latest_news_id)
                    );

                    var config = {
                        method: 'delete',
                        url:
                            process.env.REACT_APP_API_BASE_URL +
                            '/latest_news/' +
                            delteId,
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${currentUser?.data[0]?.token}`
                        }
                    };
                    axios(config)
                        .then(function (response) {
                            if (response.status === 200) {
                                openNotificationWithIcon(
                                    'success',
                                    'Latest News Successfully deleted'
                                );
                                teacherList();
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
    const handleStudentList = async (e) => {
        await stuList();
    };
    const handleStuDelete = (itemA) => {
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
                confirmButtonText: 'Delete',
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                reverseButtons: false
            })
            .then((result) => {
                if (result.isConfirmed) {
                    const tecId = encryptGlobal(
                        JSON.stringify(itemA.latest_news_id)
                    );

                    var config = {
                        method: 'delete',
                        url:
                            process.env.REACT_APP_API_BASE_URL +
                            '/latest_news/' +
                            tecId,
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${currentUser?.data[0]?.token}`
                        }
                    };
                    axios(config)
                        .then(function (response) {
                            if (response.status === 200) {
                                openNotificationWithIcon(
                                    'success',
                                    'News successfully deleted'
                                );
                                stuList();
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
    async function handleNewStuStatus(item, number) {
       // This function updates  status with the given category and details //

        const body = {
            status: "ACTIVE",
            category: item.category,
            details: item.details,
            new_status: number
        };
        const staeId = encryptGlobal(JSON.stringify(item.latest_news_id));

        let config = {
            method: 'put',
            url: process.env.REACT_APP_API_BASE_URL + `/latest_news/${staeId}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            },
            data: JSON.stringify(body)
        };
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    if (number === '0') {
                        openNotificationWithIcon(
                            'success',
                            'New Status Disabled successfully'
                        );
                    } else if (number === '1') {
                        openNotificationWithIcon(
                            'success',
                            'New Status Enabled successfully'
                        );
                    }
                    stuList();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const stuList = () => {
        // This function fetches student latest news list  from the API //

        const stuParam = encryptGlobal(
            JSON.stringify({
                category: 'student'
            })
        );
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/latest_news?Data=${stuParam}`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setStudentList(response.data.data);
                    setReqList(true);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const stuNewsData = {
        data: studentList && studentList.length > 0 ? studentList : [],
        columns: [
            {
                name: 'No',
                selector: (row, key) => key + 1,
                sortable: true,
                width: '4rem'
            },
            {
                name: 'Role',
                selector: (row) => row.category,
                sortable: true,
                width: '6rem'
            },
            {
                name: 'State',
                selector: (row) => row.state,
                sortable: true,
                width: '10rem'
            },
          
            
            {
                name: 'Details',
                selector: (row) => row.details,
                width: '16rem'
            },
            {
                name: 'File',
                width: '5rem',
                cell: (record) => {
                    if (record.file_name === null) {
                        return <p>No file</p>;
                    } else {
                        return (
                            <a
                                    href={record.file_name}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="badge badge-md bg-light"
                                >
                                    <i className="fas fa-file-lines" style={{color:"blue"}}></i>
                                </a>
                        );
                    }
                }
            },
            {
                name: 'Link',
                width: '5rem',
                cell: (record) => {
                    if (record.url === null || record.url === "") {
                        return <p>No link</p>;
                    } else {
                        return (
                            <a
                            href={record.url}
                            target="_blank"
                            rel="noreferrer"
                            className="badge badge-md bg-light"
                        >
                            <i className="fa-brands fa-youtube" style={{color:"red"}}></i>
                        </a>
                        );
                    }
                }
            },
            {
                name: 'New Icon',
                width: '7rem',
                cell: (record) => {
                    if (record.new_status === '1') {
                        return ( 
                            <button
                                className="badge badge-md bg-success"
                                onClick={() => {
                                    handleNewStuStatus(record, '0');
                                }}
                            >
                                Turned ON<Check className="ms-1"  style={{ height: 15, width: 15 }}/>
                            </button>
                        );
                    } else if (record.new_status === '0') {
                        return ( 
                            <button
                                className="badge badge-md bg-light text-dark"
                                onClick={() => {
                                    handleNewStuStatus(record, '1');
                                }}
                            >
                                Turned Off<AlertOctagon className="ms-1"  style={{ height: 15, width: 15 }}/>
                            </button>
                        );
                    }
                }
            },
            {
                name: 'Actions',
                width: '14rem',
                center: true,
                cell: (record) => [
                    <> 
                        <button
                              className="btn btn-info btn-sm"
                              key={record}
                              onClick={() => handleEdit(record)}
                            >
                              <i data-feather="edit" className="feather-edit" /> Edit
                        </button>
                        <button
                              className="btn btn-danger btn-sm mx-3"
                              key={record}
                              onClick={() => handleStuDelete(record)}
                            >
                              <i data-feather="trash-2" className="feather-trash-2" />{" "}
                              Delete
                        </button>
                    </>
                ]
            }
        ]
    };

    const resData = {
        data: resList && resList.length > 0 ? resList : [],
        columns: [
            {
                name: 'No',
                selector: (row, key) => key + 1,
                sortable: true,
                width: '4rem'
            },
            {
                name: 'Role',
                selector: (row) => row.category,
                sortable: true,
                width: '6rem'
            },
            {
                name: 'State',
                selector: (row) => row.state,
                sortable: true,
                width: '10rem'
            },
            
            {
                name: 'Details',
                selector: (row) => row.details,
                width: '16rem'
            },
            {
                name: 'File',
                width: '5rem',
                cell: (record) => {
                    if (record.file_name === null) {
                        return <p>No file</p>;
                    } else {
                        return (
                            
                                <a
                                    href={record.file_name}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="badge badge-md bg-light"
                                >
                                    <i className="fas fa-file-lines" style={{color:"blue"}}></i>
                                </a>
                           
                        );
                    }
                }
            },
            {
                name: 'Link',
                width: '5rem',
                cell: (record) => {
                    if (record.url === null || record.url === "") {
                        return <p>No link</p>;
                    } else {
                        return (
                            <a
                                href={record.url}
                                target="_blank"
                                rel="noreferrer"
                                className="badge badge-md bg-light"
                            >
                                <i className="fa-brands fa-youtube" style={{color:"red"}}></i>
                            </a>
                        );
                    }
                }
            },
            {
                name: 'New Icon',
                width: '7rem',
                cell: (record) => {
                    if (record.new_status === '1') {
                        return (
                            <button
                                className="badge badge-md bg-success"
                                onClick={() => {
                                    handleNewStatus(record, '0');
                                }}
                            >
                                Turned ON<Check className="ms-1"  style={{ height: 15, width: 15 }}/>
                            </button>
                        );
                    } else if (record.new_status === '0') {
                        return (
                            <button
                                className="badge badge-md bg-light text-dark"
                                onClick={() => {
                                    handleNewStatus(record, '1');
                                }}
                            >
                                Turned Off<AlertOctagon className="ms-1"  style={{ height: 15, width: 15 }}/>
                            </button>
                        );
                    }
                }
            },
            {
                name: 'Actions',
                width: '14rem',
                center: true,
                cell: (record) => [
                    <>
                        <button
                              className="btn btn-info btn-sm"
                              key={record}
                              onClick={() => handleEdit(record)}
                            >
                              <i data-feather="edit" className="feather-edit" /> Edit
                        </button>
                        <button
                              className="btn btn-danger btn-sm mx-3"
                              key={record}
                              onClick={() => handleDelete(record)}
                            >
                              <i data-feather="trash-2" className="feather-trash-2" />{" "}
                              Delete
                        </button>

                      
                    </>
                ]
            }
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
                            {reqList ? (
                                <>
                                    <h4>Student Latest News</h4>
                                    <h6>Create , Edit , Del State & User specific Latest News here</h6>
                                </>
                            ) : (
                                <>
                                    <h4>Teacher Latest News</h4>
                                    <h6>Create , Edit , Del State & User specific Latest News here</h6>
                                </>
                            )}
                            
                        </div>
                    </div>
                    <div className="page-btn">
                        {reqList ? (
                            <div className="d-flex justify-content-end">
                                 <button
                                       className='btn btn-secondary'
                                        onClick={(e) => handleBack(e)}
                                    >
                                    Back
                                    </button>
                            </div>
                        ) : (
                            <div className="d-flex justify-content-end">
                                <button
                                   className='btn btn-warning me-2'
                                    onClick={(e) => handleStudentList(e)}
                                >
                                    Student Latest News
                                </button>
                                <button
                                   className='btn btn-info'
                                    onClick={() =>
                                        navigate(
                                            '/create-news'
                                        )
                                    }
                                ><PlusCircle className="me-2" style={{color:"white"}} /><b>Create Latest News</b>
                            </button>
                            </div>
                        )}
                    </div>
                </div>
                <Container className="ticket-page mb-50">
                    <Row className="pt-3">
                       

                    
                        {reqList ? (
                            <div>
                                <DataTableExtensions
                                    print={false}
                                    export={false}
                                    {...stuNewsData}
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
                        ) : (
                            <div>
                                <DataTableExtensions
                                    print={false}
                                    export={false}
                                    {...resData}
                                    exportHeaders
                                >
                                    <DataTable
                                       
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
                        )}
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default AdminLatestNews;
