/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Container, Row } from 'reactstrap';
import { Tabs } from 'antd';
// import Layout from '../Layout';
import { getCurrentUser } from '../../helpers/Utils';
import axios from 'axios';
import { FaComments } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { encryptGlobal } from '../../constants/encryptDecrypt';
import { useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import DataTable, { Alignment } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
const { TabPane } = Tabs;

const AdminSupport = () => {
    const currentUser = getCurrentUser('current_user');
    const [allTicketResponse, setAllTicketResponse] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [pending, setPending] = React.useState(true);
    const [rows, setRows] = React.useState([]);
    const [fetchData, setFetchData] = useState(false);
    useEffect(() => {
         listApi();
    }, []);

    async function listApi() {
        // where we can see all tickets //
        setFetchData(true);
        // alert('hii');
        // const listParam = encryptGlobal(
        //     JSON.stringify({
        //         state: currentUser?.data[0]?.state_name
        //     })
        // );
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/supportTickets`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
        };
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                   
                    setAllTicketResponse(
                        response.data.data[0] &&
                            response.data.data[0].dataValues
                    );
                    setFetchData(false);
                    // setFetchData(false);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    async function openListApi() {
        setFetchData(true);
        const openParam = encryptGlobal(
            JSON.stringify({
                status: 'OPEN',
                // state: currentUser?.data[0]?.state_name
            })
        );
        // where we can see all open tickets //
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/supportTickets?Data=${openParam}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
        };
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setAllTicketResponse(
                        response.data.data[0] &&
                            response.data.data[0].dataValues
                    );
                    setFetchData(false);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    async function inProgressApi() {
        setFetchData(true);
        const inProgressParam = encryptGlobal(
            JSON.stringify({
                status: 'INPROGRESS',
                // state: currentUser?.data[0]?.state_name
            })
        );
        // where  we can see  all inprogress tickets //
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/supportTickets?Data=${inProgressParam}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
        };
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setAllTicketResponse(
                        response.data.data[0] &&
                            response.data.data[0].dataValues
                    );
                    setFetchData(false);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    async function resolvedApi() {
        setFetchData(true);
        // where we ca see all resolved tickets //
        const resolvedParam = encryptGlobal(
            JSON.stringify({
                status: 'RESOLVED',
                // state: currentUser?.data[0]?.state_name
            })
        );
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/supportTickets?Data=${resolvedParam}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
        };
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setAllTicketResponse(
                        response.data.data[0] &&
                            response.data.data[0].dataValues
                    );
                    setFetchData(false);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    async function invalidApi() {
        // where we can see all invalid tickets //
        const invalidParam = encryptGlobal(
            JSON.stringify({
                status: 'INVALID',
                // state: currentUser?.data[0]?.state_name
            })
        );
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/supportTickets?Data=${invalidParam}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
        };
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setAllTicketResponse(
                        response.data.data[0] &&
                            response.data.data[0].dataValues
                    );
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const allData = {
        data: allTicketResponse,
        columns: [
            {
                name: 'No',
                selector: (row, key) => key + 1,
                cellExport: (row) => row.index,
                width: '4rem'
            },
            {
                name: 'UDISE Code',
                selector: (row) => row.organization_code,
                cellExport: (row) => row.organization_code,
                sortable: true,
                width: '10rem'
            },
            {
                name: 'State',
                selector: (row) => row.state,
                cellExport: (row) => row.state,
                sortable: true,
                width: '10rem'
            },
            {
                name: 'District',
                selector: (row) => row.district,
                cellExport: (row) => row.district,
                sortable: true,
                width: '10rem'
            },
            {
                name: 'Created By',
                selector: (row) => row.created_by,
                cellExport: (row) => row.created_by,
                sortable: true,
                width: '10rem'
            },

            {
                name: 'Query Type',
                selector: (row) => row.query_category,
                cellExport: (row) => row.query_category,
                sortable: true,
                width: '12rem'
            },
            {
                name: ' Query Details',
                selector: (row) => row.query_details,
                cellExport: (row) => row.query_details,

                width: '15rem',
                // center: true,
                cell: (params) => [
                    <Link
                        key={params.support_ticket_id}
                        to={`/admin/support-journey/ans-ticket?id=${params.support_ticket_id}`}
                    >
                        {params?.query_details} <FaComments />{' '}
                        {params.replies_count}{' '}
                    </Link>
                ]
            },

            {
                name: 'Status',
                selector: (row) => row.status,
                cellExport: (row) => row.status,

                width: '8rem',
                cell: (params) => [
                    params?.status === 'OPEN' ? (
                        <span className="btn btn-soft-danger">
                            Open
                        </span>
                    ) : params?.status === 'INPROGRESS' ? (
                        <span className="btn btn-soft-info">
                            Inprogress
                        </span>
                    ) : params?.status === 'RESOLVED' ? (
                        <span className="btn btn-soft-success">
                            Resolved
                        </span>
                    ) : params?.status === 'INVALID' ? (
                        <span className="btn btn-soft-warning">
                            Invalid
                        </span>
                    ) : (
                        ''
                    )
                ]
            }
        ]
    };

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setRows(allData.data);
            setPending(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, []);
    const changeTab = async (e) => {
        if (e === '1') {
            await listApi();
        } else if (e === '2') {
            await openListApi();
        } else if (e === '3') {
            await inProgressApi();
        } else if (e === '4') {
            await resolvedApi();
        } else {
            await invalidApi();
        }
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
        // <Layout>
        <div className="page-wrapper">
    <div className="content">
            {/* <PageConstruction /> */}
            <div className='mb-3'>
                                <h4>Support</h4>
                                <h6>Raise your queries here</h6>
                            </div>
            <Container className="ticket-page mb-50">
                <Row >
               
                    <div className="ticket-data">
                        <Tabs
                            defaultActiveKey="1"
                            onChange={(key) => changeTab(key)}
                        >
                            <TabPane  key="1"
                              tab={<span style={{ fontSize: '1rem' }}>All Tickets</span>}
                            >
                                {fetchData ? (
                                    <ClipLoader

                                        // fetchData={fetchData}
                                        color={'blue'}
                                        size={20}
                                    />
                                ) : (
                                    <div className="my-2">
                                        <DataTableExtensions
                                            print={false}
                                            export={true}
                                            {...allData}
                                            exportHeaders
                                        >
                                            <DataTable
                                                data={rows}
                                                customStyles={customStyles}
                                                defaultSortField="id"
                                                defaultSortAsc={false}
                                                pagination
                                                highlightOnHover
                                                fixedHeader
                                                subHeaderAlign={
                                                    Alignment.Center
                                                }
                                            />
                                        </DataTableExtensions>
                                    </div>
                                )}
                            </TabPane>
                            <TabPane  tab={<span style={{ fontSize: '1rem' }}>Open</span>} key="2">
                                {fetchData ? (
                                    <ClipLoader
                                        // fetchData={fetchData}
                                        color={'blue'}
                                        size={20}
                                    />
                                ) : (
                                    <div className="my-2">
                                        <DataTableExtensions
                                            print={false}
                                            export={true}
                                            {...allData}
                                            exportHeaders
                                        >
                                            <DataTable
                                                data={rows}
                                                customStyles={customStyles}
                                                defaultSortField="id"
                                                defaultSortAsc={false}
                                                pagination
                                                highlightOnHover
                                                fixedHeader
                                                subHeaderAlign={
                                                    Alignment.Center
                                                }
                                            />
                                        </DataTableExtensions>
                                    </div>
                                )}
                            </TabPane>
                            <TabPane  tab={<span style={{ fontSize: '1rem' }}>Inprogress</span>} key="3">
                                {fetchData ? (
                                    <ClipLoader
                                        // fetchData={fetchData}
                                        color={'blue'}
                                        size={20}
                                    />
                                ) : (
                                    <div className="my-2">
                                        <DataTableExtensions
                                            print={false}
                                            export={true}
                                            {...allData}
                                            exportHeaders
                                        >
                                            <DataTable
                                                data={rows}
                                                customStyles={customStyles}
                                                defaultSortField="id"
                                                defaultSortAsc={false}
                                                pagination
                                                highlightOnHover
                                                fixedHeader
                                                subHeaderAlign={
                                                    Alignment.Center
                                                }
                                            />
                                        </DataTableExtensions>
                                    </div>
                                )}
                            </TabPane>
                            <TabPane  tab={<span style={{ fontSize: '1rem' }}>Resolved</span>} key="4">
                                {fetchData ? (
                                    <ClipLoader
                                        // fetchData={fetchData}
                                        color={'blue'}
                                        size={20}
                                    />
                                ) : (
                                    <div className="my-2">
                                        <DataTableExtensions
                                            print={false}
                                            export={true}
                                            {...allData}
                                            exportHeaders
                                        >
                                            <DataTable
                                                data={rows}
                                                defaultSortField="id"
                                                defaultSortAsc={false}
                                                pagination
                                                highlightOnHover
                                                fixedHeader
                                                subHeaderAlign={
                                                    Alignment.Center
                                                }
                                            />
                                        </DataTableExtensions>
                                    </div>
                                )}
                            </TabPane>
                            <TabPane  tab={<span style={{ fontSize: '1rem' }}>Invalid</span>} key="5">
                                {fetchData ? (
                                    <ClipLoader
                                        // fetchData={fetchData}
                                        color={'blue'}
                                        size={20}
                                    />
                                ) : (
                                    <div className="my-2">
                                        <DataTableExtensions
                                            print={false}
                                            // export={false}
                                            {...allData}
                                            exportHeaders
                                        >
                                            <DataTable
                                                data={rows}
                                                defaultSortField="id"
                                                defaultSortAsc={false}
                                                pagination
                                                highlightOnHover
                                                fixedHeader
                                                subHeaderAlign={
                                                    Alignment.Center
                                                }
                                            />
                                        </DataTableExtensions>
                                    </div>
                                )}
                            </TabPane>
                        </Tabs>
                    </div>
                </Row>
            </Container>
            </div>
            </div>
        // </Layout>
    );
};

export default AdminSupport;
