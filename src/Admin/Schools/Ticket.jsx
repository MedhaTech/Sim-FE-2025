/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Badge } from 'reactstrap';

import { getSchoolRegistationBulkUploadList } from '../../redux/actions';
import { connect } from 'react-redux';
import DataTable, { Alignment } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { getCurrentUser, openNotificationWithIcon } from '../../helpers/Utils';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import { encryptGlobal } from '../../constants/encryptDecrypt';
const TicketsPage = (props) => {
    const navigate = useNavigate();
    const [isloader, setIsloader] = useState(false);

    const currentUser = getCurrentUser('current_user');
    const [reqList, setReqList] = useState(false);
    const [newList, setNewList] = useState(false);
    const [reqSchoolsResponse, setReqSchoolsResponse] = useState([]);
    const [newSchoolsResponse, setNewSchoolsResponse] = useState([]);
    const [pending, setPending] = React.useState(true);
    const [rows, setRows] = React.useState([]);
    const [SRows, setSRows] = React.useState([]);
    const [disableBtn, setDisablebtn] = useState(false);

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setSRows(reqSchoolsData.data);
            setPending(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, []);

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setRows(SchoolsData.data);
            setPending(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        props.getSchoolRegistationBulkUploadActions('i');
        
    }, []);
    const handleEdit = (item) => {
        // where item = orgnization id  details //
        // where we can edit the institution details //
        navigate(
            '/edit-institution'
        );
        localStorage.setItem('listId', JSON.stringify(item));
    };
    const handleActiveStatusUpdate = (item, itemS) => {
        setDisablebtn(true);
        // where we can update the status InActive or New   //
        // where item = orgnization id details , itemA= status //
        const body = {
            status: itemS,
            organization_code: item.organization_code,
            organization_name: item.organization_name
        };
        const upparam = encryptGlobal(JSON.stringify(item.organization_id));
        var config = {
            method: 'put',
            url:
                process.env.REACT_APP_API_BASE_URL +
                '/organizations/' +
                upparam,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            },
            data: body
        };
        const previousStatus = item.status;

        let message = '';
    
        if (previousStatus === 'ACTIVE' && itemS === 'INACTIVE') {
            message = `School moved from Active to Inactive Status`;
        } else if (previousStatus === 'INACTIVE' && itemS === 'ACTIVE') {
            message = `School moved from Inactive to Active Status`;
        } else if (previousStatus === 'NEW' && itemS === 'ACTIVE') {
            message = `School moved from Test to Active Status`;
        } else if (previousStatus === 'NEW' && itemS === 'INACTIVE') {
            message = `School moved from Test to Inactive Status`;
        }else if (previousStatus === 'ACTIVE' && itemS === 'New') {
            message = `School moved from Active to Test Status`;
        } else if (previousStatus === 'INACTIVE' && itemS === 'New') {
         
            message = `School moved from Inactive to Test Status`;
        }  else {
            message = `Status updated successfully to ${itemS}`;
        }
        axios(config)
            .then(function (response) {
                setTimeout(() => {
                    setDisablebtn(false);
                }, 3000);
                if (response.status === 200) {
                    setReqList(false);
                    openNotificationWithIcon(
                        'success',
                        message
                    );
                    props.getSchoolRegistationBulkUploadActions('i');
                }
            })
            .catch(function (error) {
                console.log(error);
                openNotificationWithIcon('error', 'Something went wrong');
            });
    };
    const handleStatusUpdate = (item, itemS) => {
        setDisablebtn(true);
        // where we can update the status Active or New  //
        // where item = orgnization id details , itemS= status //
        //organization_code = orgnization code //
        // organization_name = orgnization name //
        const body = {
            status: itemS,
            organization_code: item.organization_code,
            organization_name: item.organization_name
        };
        const stUp = encryptGlobal(JSON.stringify(item.organization_id));
        var config = {
            method: 'put',
            url: process.env.REACT_APP_API_BASE_URL + '/organizations/' + stUp,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            },
            data: body
        };
        const previousStatus = item.status;

        // Custom message based on the status change
        let message = '';
    
        if (previousStatus === 'ACTIVE' && itemS === 'INACTIVE') {
            message = `School moved from Active to Inactive Status`;
        } else if (previousStatus === 'INACTIVE' && itemS === 'ACTIVE') {
            message = `School moved from Inactive to Active Status`;
        } else if (previousStatus === 'NEW' && itemS === 'ACTIVE') {
            message = `School moved from Test to Active Status`;
        } else if (previousStatus === 'NEW' && itemS === 'INACTIVE') {
            message = `School moved from Test to Inactive Status`;
        }else if (previousStatus === 'ACTIVE' && itemS === 'New') {
            message = `School moved from Active to Test Status`;
        } else if (previousStatus === 'INACTIVE' && itemS === 'New') {
         
            message = `School moved from Inactive to Test Status`;
        }  else {
            message = `Status updated successfully to ${itemS}`;
        }
        axios(config)
            .then(async function (response) {
                setTimeout(() => {
                    setDisablebtn(false);
                }, 3000);
                if (response.status === 200) {
                    setReqList(true);
                    await listApi();
                    openNotificationWithIcon(
                        'success',
                        message
                    );
                }
            })
            .catch(function (error) {
                console.log(error);
                openNotificationWithIcon('error', 'Something went wrong');
            });
    };

    const handleNewUpdate = (item, itemS) => {
        setDisablebtn(true);
        // where we can update the status Active or InActive //
        // where item = orgnization id details , itemS= status //
        //organization_code = orgnization code //
        // organization_name = orgnization name //
        const body = {
            status: itemS,
            organization_code: item.organization_code,
            organization_name: item.organization_name
        };
        const NewUp = encryptGlobal(JSON.stringify(item.organization_id));
        var config = {
            method: 'put',
            url: process.env.REACT_APP_API_BASE_URL + '/organizations/' + NewUp,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            },
            data: body
        };
        const previousStatus = item.status;

        let message = '';
    
        if (previousStatus === 'ACTIVE' && itemS === 'INACTIVE') {
            message = `School moved from Active to Inactive Status`;
        } else if (previousStatus === 'INACTIVE' && itemS === 'ACTIVE') {
            message = `School moved from Inactive to Active Status`;
        } else if (previousStatus === 'NEW' && itemS === 'ACTIVE') {
            message = `School moved from Test to Active Status`;
        } else if (previousStatus === 'NEW' && itemS === 'INACTIVE') {
            message = `School moved from Test to Inactive Status`;
        }else if (previousStatus === 'ACTIVE' && itemS === 'New') {
            message = `School moved from Active to Test Status`;
        } else if (previousStatus === 'INACTIVE' && itemS === 'New') {
         
            message = `School moved from Inactive to Test Status`;
        }  else {
            message = `Status updated successfully to ${itemS}`;
        }
        axios(config)
            .then(async function (response) {
                setTimeout(() => {
                    setDisablebtn(false);
                }, 3000);
                if (response.status === 200) {
                    setNewList(true);
                    await newListApi();
                    openNotificationWithIcon(
                        'success',
                        message
                    );
                }
            })
            .catch(function (error) {
                console.log(error);
                openNotificationWithIcon('error', 'Something went wrong');
            });
    };
    const handleNewSchoolsList = async () => {
        // here we can see  list of  new institutions //
        setReqList(false);
        await newListApi();
    };
    async function listApi() {
        //  here we can see listApi where we can see all InActive Institutions //
        const listParam = encryptGlobal(
            JSON.stringify({
                status: 'INACTIVE'
            })
        );
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/organizations?Data=${listParam}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
        };
        
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setReqSchoolsResponse(
                        response.data.data[0] &&
                            response.data.data[0].dataValues
                    );
                    setReqList(true);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    async function newListApi() {
        const newListParam = encryptGlobal(
            JSON.stringify({
                status: 'NEW'
            })
        );
        // here we can see newListApi where we can see list of new Institutions //
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/organizations?Data=${newListParam}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
        };
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setNewSchoolsResponse(
                        response.data.data[0] &&
                            response.data.data[0].dataValues
                    );
                    setNewList(true);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const handleReqSchoolsList = async (e) => {
        // here we can see  list of inActive institutions //
        await listApi();
    };

    const handleBack = (e) => {
        // here we can go back to main page //
        setReqList(false);
        setNewList(false);
        props.getSchoolRegistationBulkUploadActions('i');
    };

    const handleNewBack = (e) => {
        // here we can go back to main page //
        setReqList(false);
        setNewList(false);
        props.getSchoolRegistationBulkUploadActions('i');
    };
    const [array, setarray] = useState([]);
    useEffect(() => {
        if (
            props.schoolsRegistrationList &&
            props.schoolsRegistrationList.length > 0
        ) {
            setIsloader(true);  
            let dataarray = [];
            props.schoolsRegistrationList.forEach((item, index) => {
                dataarray.push(Object.assign(item, { index: index + 1 }));
            });
            setarray([...dataarray]);
        }
    }, [props.schoolsRegistrationList]);
    const SchoolsData = {
        data: array,
        columns: [
            {
                name: 'No',
                selector: (row) => row.index,
                cellExport: (row) => row.index,
                width: '4rem'
            },
            {
                name: 'UDISE Code ',
                selector: (row) => row.organization_code,
                cellExport: (row) => row.organization_code,
                sortable: true,

                width: '9rem'
            },
            {
                name: 'State',
                selector: (row) => row.state,
                cellExport: (row) => row.state,
                width: '10rem'
            },
           
            {
                name: 'District',
                selector: (row) => row.district,
                cellExport: (row) => row.district,
                width: '10rem'
            },

            {
                name: 'School Name',
                selector: (row) => row.organization_name,
                cellExport: (row) => row.organization_name,
                width: '15rem'
            },

            {
                name: 'Category',
                selector: (row) => row.category,
                cellExport: (row) => row.category,
                width: '8rem'
            },
          
            {
                name: 'Status',
                cellExport: (row) => row.status,
                cell: (row) => [
                    <span key={row.organization_id} className="badge bg-success">{row.status}</span>
                ],
                width: '5rem'
            },
            {
                name: 'Actions',
                width: '16rem',
                center: true,
                cellExport: (row) => {},
                cell: (record) => [
                    <>
                        <div
                            key={record}
                            onClick={() => handleEdit(record)}
                            style={{ marginRight: '7px' }}
                        >
                            <div className="btn btn-info">Edit</div>
                        </div>
                        <div
                            key={record}
                            onClick={() =>
                                !disableBtn &&
                                handleActiveStatusUpdate(record, 'NEW')
                            }
                            style={{ marginRight: '7px' }}
                        >
                            <div className="btn btn-warning ">Test</div>
                        </div>
                        <div
                            key={record}
                            onClick={() =>
                                !disableBtn &&
                                handleActiveStatusUpdate(record, 'INACTIVE')
                            }
                        >
                            <div className="btn btn-danger ">Inactive</div>
                        </div>
                    </>
                ]
            }
        ]
    };

    const reqSchoolsData = {
        data: reqSchoolsResponse,
        columns: [
            {
                name: 'No',
                selector: (row, key) => key + 1,
                width: '4rem'
            },
            {
                name: 'UDISE Code ',
                selector: (row) => row.organization_code,
                cellExport: (row) => row.organization_code,
                sortable: true,
                width: '10rem'
            },
            {
                name: 'State',
                selector: (row) => row.state,
                cellExport: (row) => row.state,
                width: '10rem'
            },
            {
                name: 'District',
                selector: (row) => row.district,
                cellExport: (row) => row.district,
                width: '10rem'
            },
            {
                name: 'School Name',
                selector: (row) => row.organization_name,
                cellExport: (row) => row.organization_name,
                width: '15rem'
            },
           
            {
                name: 'Category',
                selector: (row) => row.category,
                cellExport: (row) => row.category,
                width: '8rem'
            },
           
            {
                name: 'Status',
                cell: (row) => [
                    <span key={row.organization_id} className="badge bg-danger">{row.status}</span>
                ],
                width: '5rem'
            },
            {
                name: 'Actions',
                center: true,
                width: '16rem',
                cell: (record) => [
                    <>
                        <div
                            key={record}
                            onClick={() => handleEdit(record)}
                            style={{ marginRight: '7px' }}
                        >
                            <div className="btn btn-info ">Edit</div>
                        </div>
                        <div
                            key={record}
                            onClick={() =>
                                !disableBtn &&
                                handleStatusUpdate(record, 'ACTIVE')
                            }
                            style={{ marginRight: '7px' }}
                        >
                            <div className="btn btn-success">Active</div>
                        </div>
                        <div
                            key={record}
                            onClick={() =>
                                !disableBtn && handleStatusUpdate(record, 'NEW')
                            }
                        >
                            <div className="btn btn-warning ">Test</div>
                        </div>
                    </>
                ]
            }
        ]
    };
    const newSchoolsData = {
        data: newSchoolsResponse,
        columns: [
            {
                name: 'No',
                selector: (row, key) => key + 1,
                width: '4rem'
            },
            {
                name: 'UDISE Code ',
                selector: (row) => row.organization_code,
                cellExport: (row) => row.organization_code,
                sortable: true,

                width: '10rem'
            },
            {
                name: 'State',
                selector: (row) => row.state,
                cellExport: (row) => row.state,
                width: '10rem'
            },
            {
                name: 'District',
                selector: (row) => row.district,
                cellExport: (row) => row.district,
                width: '10rem'
            },
            {
                name: 'School Name',
                selector: (row) => row.organization_name,
                cellExport: (row) => row.organization_name,
                width: '15rem'
            },
            
            {
                name: 'Category',
                selector: (row) => row.category,
                cellExport: (row) => row.category,
                width: '8rem'
            },
          
            {
                name: 'Status',
                cell: (row) => [
                    <span key={row.organization_id} className="badge bg-warning">{row.status}</span>
                ],
                width: '5rem'
            },
            {
                name: 'Actions',
                width: '16rem',
                center: true,
                cell: (record) => [
                    <>
                        <div
                            key={record}
                            onClick={() => handleEdit(record)}
                            style={{ marginRight: '7px' }}
                        >
                            <div className="btn btn-info ">Edit</div>
                        </div>
                        <div
                            key={record}
                            onClick={() =>
                                !disableBtn && handleNewUpdate(record, 'ACTIVE')
                            }
                            style={{ marginRight: '7px' }}
                        >
                            <div className="btn btn-success ">Active</div>
                        </div>
                        <div
                            key={record}
                            onClick={() =>
                                !disableBtn &&
                                handleNewUpdate(record, 'INACTIVE')
                            }
                        >
                            <div className="btn btn-danger">Inactive</div>
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
            <div className="page-header">
                <div className="add-item d-flex">
                    <div className="page-title">
                        {reqList ? (
                            <>
                                <h4 style={{color:"red"}}>InActive Schools</h4>
                                <h5 style={{color:"red"}}>Users from below schools cannot access portal and data doesn&apos;t reflect in reports</h5>
                            </> 
                           ) : newList ? (
                            <>
                                <h4 style={{color:"orange"}}>Test Schools</h4>
                                <h5 style={{color:"orange"}}>Users from below schools can access portal but data doesn&apos;t reflect in reports</h5>
                            </>
                            ) : (
                                <>
                                    <h4 style={{color:"#28C76F"}}>Active Schools</h4>
                                    <h5 style={{color:"#28C76F"}}>Users from below schools can access portal and data reflects in reports</h5>
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
                    ) : newList ? (
                        <div className="d-flex justify-content-end">
                            <button
                                className='btn btn-secondary'
                                onClick={(e) => handleNewBack(e)}
                            >
                                Back
                                </button>
                        </div>
                    ) : (
                        <div className="d-flex justify-content-end p-2">
                            <button
                                className='btn btn-info p-2 me-2'
                                onClick={() =>
                                    navigate(
                                        '/addinstitution'
                                    )
                                }
                            >
                                Add New School
                                </button>
                            
                            <button
                                className='btn btn-warning p-2 me-2'
                                onClick={() => handleNewSchoolsList()}
                            >
                                Test List
                            </button>
                            <button
                                className='btn btn-danger '
                                onClick={(e) => handleReqSchoolsList(e)}
                            >
                                InActive List
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <Container className="ticket-page mb-50">
                <Row>
                    {reqList ? (
                        <div>
                            <DataTableExtensions
                                print={false}
                                export={true}
                                fileName="SIM_InactiveSchoolsList"
                                style={{marginTop:"3rem"}}
                                {...reqSchoolsData}
                                exportHeaders
                            >
                                <DataTable
                                    data={SRows}
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
                    ) : newList ? (
                        <div>
                            <DataTableExtensions
                                print={false}
                                export={true}
                                fileName="SIM_TestSchoolsList"
                                style={{marginTop:"3rem"}}

                                {...newSchoolsData}
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
                    ) : isloader ? (
                        <div>
                            <DataTableExtensions
                                {...SchoolsData}
                                style={{marginTop:"3rem"}}
                                fileName="SIM_ActiveSchoolsList"
                                export={true}
                                print={false}
                                exportHeaders
                            >
                                <DataTable
                                    data={rows}
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
                    ):( <div className="spinner-border text-info" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>)}
                </Row>
            </Container>
        </div>
        </div>
    );
};
const mapStateToProps = ({ schoolRegistration }) => {
    const { schoolsRegistrationList } = schoolRegistration;
    return { schoolsRegistrationList };
};
export default connect(mapStateToProps, {
    getSchoolRegistationBulkUploadActions: getSchoolRegistationBulkUploadList
})(TicketsPage);
