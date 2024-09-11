/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import { useState } from 'react';
import React, { useEffect } from 'react';
// import Layout from '../Layout';
import { Container, Row, Col } from 'reactstrap';
import DataTableExtensions from 'react-data-table-component-extensions';
import DataTable, { Alignment } from 'react-data-table-component';
import { getCurrentUser } from '../../helpers/Utils';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import { openNotificationWithIcon } from '../../helpers/Utils';
// import { Button } from '../../stories/Button';
// import { useHistory } from 'react-router-dom';
// import { ReactDOM } from 'react-dom';
// import * as ReactDOM from 'react-dom';
import Swal from 'sweetalert2/dist/sweetalert2';
import { useNavigate } from "react-router-dom";

import logout from '../../assets/img/logout.png';
import { encryptGlobal } from '../../constants/encryptDecrypt';
import 'sweetalert2/src/sweetalert2.scss';
const AdminLatestNews = () => {
    // const history = useHistory();
    const navigate = useNavigate();
    const [resList, setResList] = useState([]);
    const [studentList, setStudentList] = useState([]);

    const [reqList, setReqList] = useState(false);

    const currentUser = getCurrentUser('current_user');
    useEffect(() => {
        teacherList();
    }, []);
    const teacherList = () => {
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
        const body = {
            status: data.status,
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
                            // Accept: "application/json",
                            Authorization: `Bearer ${currentUser?.data[0]?.token}`
                        }
                    };
                    axios(config)
                        .then(function (response) {
                            if (response.status === 200) {
                                openNotificationWithIcon(
                                    'success',
                                    'News succesfully deleted'
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
        // alert('hii');
        // here we can see  list of inActive institutions //
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
                            // Accept: "application/json",
                            Authorization: `Bearer ${currentUser?.data[0]?.token}`
                        }
                    };
                    axios(config)
                        .then(function (response) {
                            if (response.status === 200) {
                                openNotificationWithIcon(
                                    'success',
                                    'News succesfully deleted'
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
        const body = {
            status: item.status,
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
                width: '6rem'
            },
            {
                name: 'Role',
                selector: (row) => row.category,
                width: '8rem'
            },
            {
                name: 'State',
                selector: (row) => row.state,
                width: '12rem'
            },
            {
                name: 'New Icon',
                width: '8rem',
                cell: (record) => {
                    if (record.new_status === '1') {
                        return (
                            <button
                                className="btn btn-danger mx-2"
                                onClick={() => {
                                    handleNewStuStatus(record, '0');
                                }}
                            >
                                Disable
                            </button>
                        );
                    } else if (record.new_status === '0') {
                        return (
                            <button
                                className="btn btn-success mx-2"
                                onClick={() => {
                                    handleNewStuStatus(record, '1');
                                }}
                            >
                                Enable
                            </button>
                        );
                    }
                }
            },
            {
                name: 'Details',
                selector: (row) => row.details,
                width: '20rem'
            },
            {
                name: 'File',
                width: '10rem',
                cell: (record) => {
                    if (record.file_name === null) {
                        return <p>No file</p>;
                    } else {
                        return (
                            <button className="btn btn-warning mx-2">
                                <a
                                    href={record.file_name}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: 'black' }}
                                >
                                    Download
                                </a>
                            </button>
                        );
                    }
                }
            },
            {
                name: 'Link',
                width: '10rem',
                cell: (record) => {
                    if (record.url === null) {
                        return <p>No link</p>;
                    } else {
                        return (
                            <a
                                href={record.url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Navigate
                            </a>
                        );
                    }
                }
            },
            {
                name: 'Actions',
                width: '15rem',
                center: true,
                cell: (record) => [
                    <>
                        <div
                            key={record}
                            onClick={() => handleEdit(record)}
                            style={{ marginRight: '12px' }}
                        >
                            <div className="btn btn-primary">
                                Edit
                            </div>
                        </div>

                        <div
                            key={record}
                            onClick={() => handleStuDelete(record)}
                            style={{ marginRight: '12px' }}
                        >
                            <div className="btn btn-primary  mx-2">
                                Delete
                            </div>
                        </div>
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
                width: '6rem'
            },
            {
                name: 'Role',
                selector: (row) => row.category,
                width: '8rem'
            },
            {
                name: 'State',
                selector: (row) => row.state,
                width: '12rem'
            },
            {
                name: 'New Icon',
                width: '8rem',
                cell: (record) => {
                    if (record.new_status === '1') {
                        return (
                            <button
                                className="btn btn-danger mx-2"
                                onClick={() => {
                                    handleNewStatus(record, '0');
                                }}
                            >
                                Disable
                            </button>
                        );
                    } else if (record.new_status === '0') {
                        return (
                            <button
                                className="btn btn-success mx-2"
                                onClick={() => {
                                    handleNewStatus(record, '1');
                                }}
                            >
                                Enable
                            </button>
                        );
                    }
                }
            },
            {
                name: 'Details',
                selector: (row) => row.details,
                width: '20rem'
            },
            {
                name: 'File',
                width: '10rem',
                cell: (record) => {
                    if (record.file_name === null) {
                        return <p>No file</p>;
                    } else {
                        return (
                            <button className="btn btn-warning mx-2">
                                <a
                                    href={record.file_name}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: 'black' }}
                                >
                                    Download
                                </a>
                            </button>
                        );
                    }
                }
            },
            {
                name: 'Link',
                width: '8rem',
                cell: (record) => {
                    if (record.url === null) {
                        return <p>No link</p>;
                    } else {
                        return (
                            <a
                                href={record.url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Navigate
                            </a>
                        );
                    }
                }
            },
            {
                name: 'Actions',
                width: '15rem',
                center: true,
                cell: (record) => [
                    <>
                        <div
                            key={record}
                            onClick={() => handleEdit(record)}
                            style={{ marginRight: '12px' }}
                        >
                            <div className="btn btn-primary mx-2">
                                Edit
                            </div>
                        </div>

                        <div
                            key={record}
                            onClick={() => handleDelete(record)}
                            style={{ marginRight: '12px' }}
                        >
                            <div className="btn btn-primary mx-2">
                                Delete
                            </div>
                        </div>
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
            <Container className="ticket-page mb-50">
                <Row className="pt-3">
                    <Col className="col-auto">
                        {reqList ? (
                            <h2>Student Latest News</h2>
                        ) : (
                            <h2>Teacher Latest News</h2>
                        )}
                    </Col>

                    <Col className="ticket-btn col ml-auto ">
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
                                >
Create LatestNews
                            </button>
                            </div>
                        )}
                    </Col>
                    {reqList ? (
                        <div className="my-2">
                            <DataTableExtensions
                                print={false}
                                export={true}
                                {...stuNewsData}
                                exportHeaders
                            >
                                <DataTable
                                    // data={SRows}
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
                        <div className="my-2">
                            <DataTableExtensions
                                print={false}
                                export={false}
                                {...resData}
                                exportHeaders
                            >
                                <DataTable
                                    // data={setResList}
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
                    )}
                </Row>
            </Container>
            {/* <h1>hi</h1> */}
        </div>
        </div>
    );
};

export default AdminLatestNews;
