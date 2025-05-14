/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import { useState } from 'react';
import React, { useEffect } from 'react';
import Layout from '../Layout';
import { Container, Row, Col } from 'reactstrap';
import DataTableExtensions from 'react-data-table-component-extensions';
import DataTable, { Alignment } from 'react-data-table-component';
import { getCurrentUser } from '../../helpers/Utils';
import axios from 'axios';
import { openNotificationWithIcon } from '../../helpers/Utils';
import { Button } from '../../stories/Button';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2';
import logout from '../../assets/img/logout.png';
import { encryptGlobal } from '../../constants/encryptDecrypt';
import 'sweetalert2/src/sweetalert2.scss';
const AdminResources = () => {
    const history = useHistory();
    const [resList, setResList] = useState([]);
    const [tecList, setTecList] = useState([]);
    const [reqList, setReqList] = useState(false);

    const currentUser = getCurrentUser('current_user');

    useEffect(() => {
        fetchTecResourceList();
    }, []);
    async function fetchTecResourceList() {
        const fectchTecParam = encryptGlobal(
            JSON.stringify({
                role: 'mentor'
            })
        );
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/resource/list?Data=${fectchTecParam}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${currentUser?.data[0]?.token}`
                    }
                }
            );
            if (response.status === 200) {
                setTecList(response.data?.data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const teacherData = {
        data: tecList || [],
        columns: [
            {
                name: 'No',
                selector: (row, key) => key + 1,
                sortable: true,
                width: '10rem'
            },
            {
                name: 'Role',
                selector: (row) => row.role,
                width: '15rem'
                // center: true,
            },
            {
                name: 'State',
                selector: (row) => row.state,
                width: '12rem'
            },
            {
                name: 'Details',
                selector: (row) => row.description,
                width: '40rem'
            },
            // {
            //     name: 'Type',
            //     selector: 'type',
            //     width: '25%'
            // },
            {
                name: 'File/Link',
                width: '10rem',
                cell: (record) => {
                    if (record.type === 'file') {
                        return (
                            <button className="btn btn-warning  mx-2">
                                <a
                                    href={record.attachments}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: 'black' }}
                                >
                                    Navigate
                                </a>
                            </button>
                        );
                    } else if (record.type === 'link') {
                        return (
                            <button className="btn btn-warning  mx-2">
                                <a
                                    href={record.attachments}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: 'black' }}
                                >
                                    Navigate
                                </a>
                            </button>
                        );
                    }
                    return null;
                }
            },
            {
                name: 'Actions',
                center: true,
                width: '25rem',
                cell: (record) => [
                    <>
                        <div
                            key={record}
                            onClick={() => handleEdit(record)}
                            style={{ marginRight: '12px' }}
                        >
                            <div className="btn btn-primary btn-lg mx-2">
                                EDIT
                            </div>
                        </div>

                        <div
                            key={record}
                            onClick={() => handleTecherDelete(record)}
                            style={{ marginRight: '12px' }}
                        >
                            <div className="btn btn-primary btn-lg mx-2">
                                DELETE
                            </div>
                        </div>
                    </>
                ]
            }
        ]
    };
    const handleTecherDelete = (items) => {
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
                    const resId = encryptGlobal(
                        JSON.stringify(items.resource_id)
                    );
                    var config = {
                        method: 'delete',
                        url:
                            process.env.REACT_APP_API_BASE_URL +
                            '/resource/' +
                            resId,
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
                                    'Resource Deleted Successfully'
                                );
                                fetchTecResourceList();
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
    // useEffect(() => {
    //     fetchResourceList();
    // }, []);
    const handleBack = (e) => {
        // here we can go back to main page //
        setReqList(false);
    };
    const handleStudentList = async (e) => {
        // here we can see  list of inActive institutions //
        await fetchResourceList();
    };
  
    const fetchResourceList = () => {
        const fectchParam = encryptGlobal(
            JSON.stringify({
                role: 'student'
            })
        );
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/resource/list?Data=${fectchParam}`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setResList(response.data?.data);
                    setReqList(true);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const resData = {
        data: resList || [],
        columns: [
            {
                name: 'No',
                selector: (row, key) => key + 1,
                sortable: true,
                width: '10rem'
            },
            {
                name: 'Role',
                selector: (row) => row.role,
                width: '15rem'
            },
            {
                name: 'Details',
                selector: (row) => row.description,
                width: '40rem'
            },
           
            {
                name: 'File/Link',
                width: '10rem',
                cell: (record) => {
                    if (record.type === 'file') {
                        return (
                            <button className="btn btn-warning  mx-2">
                                <a
                                    href={record.attachments}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: 'black' }}
                                >
                                    Navigate
                                </a>
                            </button>
                        );
                    } else if (record.type === 'link') {
                        return (
                            <button className="btn btn-warning  mx-2">
                                <a
                                    href={record.attachments}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: 'black' }}
                                >
                                    Navigate
                                </a>
                            </button>
                        );
                    }
                    return null;
                }
            },
            {
                name: 'Actions',
                center: true,
                width: '25rem',
                cell: (record) => [
                    <>
                        <div
                            key={record}
                            onClick={() => handleEdit(record)}
                            style={{ marginRight: '12px' }}
                        >
                            <div className="btn btn-primary btn-lg mx-2">
                                EDIT
                            </div>
                        </div>

                        <div
                            key={record}
                            onClick={() => handleDelete(record)}
                            style={{ marginRight: '12px' }}
                        >
                            <div className="btn btn-primary btn-lg mx-2">
                                DELETE
                            </div>
                        </div>
                    </>
                ]
            }
        ]
    };
    const handleEdit = (item) => {
        // where we can edit level name, no of evaluation //
        history.push({
            pathname: '/admin/Resources/editResource'
        });
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
                                fetchResourceList();
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

    return (
        <Layout>
            <Container className="ticket-page mt-5 mb-50">
                <Row className="pt-3">
                    <Row className="mb-2 mb-sm-5 mb-md-5 mb-lg-0">
                        <Col className="col-auto">
                            {reqList ? (
                                <h2>Student Resources</h2>
                            ) : (
                                <h2>Teacher Resources</h2>
                            )}
                        </Col>
                        <Col className="ticket-btn col ml-auto ">
                            {reqList ? (
                                <div className="d-flex justify-content-end">
                                    <Button
                                        label="Back"
                                        btnClass="primary"
                                        size="small"
                                        shape="btn-square"
                                        onClick={(e) => handleBack(e)}
                                    />
                                </div>
                            ) : (
                                <div className="d-flex justify-content-end">
                                    <Button
                                        label="Student Resources"
                                        btnClass=" btn btn-success"
                                        size="small"
                                        shape="btn-square"
                                        onClick={(e) => handleStudentList(e)}
                                    />
                                    <Button
                                        label="Create  Resources"
                                        btnClass="primary mx-3"
                                        size="small"
                                        shape="btn-square"
                                        onClick={() =>
                                            history.push(
                                                '/admin/Resources/createResource'
                                            )
                                        }
                                    />
                                </div>
                            )}
                        </Col>
                        {reqList ? (
                            <div className="my-2">
                                <DataTableExtensions
                                    print={false}
                                    export={true}
                                    {...resData}
                                    exportHeaders
                                >
                                    <DataTable
                                        defaultSortField="id"
                                        defaultSortAsc={false}
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
                                    {...teacherData}
                                    exportHeaders
                                >
                                    <DataTable
                                        
                                        defaultSortField="id"
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
                </Row>
            </Container>
            {/* <h1>hi</h1> */}
        </Layout>
    );
};

export default AdminResources;
