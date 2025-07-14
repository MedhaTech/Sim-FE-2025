/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import { useState } from 'react';
import React, { useEffect } from 'react';
import { Container, Row } from 'reactstrap';
import DataTableExtensions from 'react-data-table-component-extensions';
import DataTable, { Alignment } from 'react-data-table-component';
import { getCurrentUser } from '../../helpers/Utils';
import axios from 'axios';
import { openNotificationWithIcon } from '../../helpers/Utils';
import { useNavigate } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import ToggleButton from './Toggle';
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
               // This function fetches states specific list from the API //

        let config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + '/states/specific',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
        };
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setResList(response?.data?.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const [array, setarray] = useState([]);
    useEffect(() => {
        if (
            resList &&
            resList.length > 0
        ) {
            let dataarray = [];
            resList.forEach((item, index) => {
                dataarray.push(Object.assign(item, { index: index + 1 }));
            });
            setarray([...dataarray]);
        }
    }, [resList]);
    const handleEdit = (item) => {
        navigate('/edit-state-wise');

        localStorage.setItem('resID', JSON.stringify(item));
    };

 
    async function handleStatus(item, value, type) {
        // This function updates status with the  type and value // 

        const body = {
            mentor_note: item.mentor_note,
            student_note: item.student_note,
            state: item.state
        };
        if (type === 'idea') {
            body['ideaSubmission'] = value;
        }
        if (type === 'certificate') {
            body['certificate'] = value;
        }

        const popParam = encryptGlobal(JSON.stringify(item.state_specific_id));

        let config = {
            method: 'put',
            url: process.env.REACT_APP_API_BASE_URL + `/states/specific/${popParam}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            },
            data: JSON.stringify(body)
        };
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {

                    if (value === 0) {
                        if (type === 'idea') {
                            openNotificationWithIcon(
                                'success',
                                'Idea Submission Disabled successfully'
                            );
                        } else if (type === 'certificate') {
                            openNotificationWithIcon(
                                'success',
                                'Certificate Disabled successfully'
                            );
                        }
                    } else if (value === 1) {
                        if (type === 'idea') {
                            openNotificationWithIcon(
                                'success',
                                'Idea Submission Enabled successfully'
                            );

                        } else if (type === 'certificate') {
                            openNotificationWithIcon(
                                'success',
                                'Certificate Enabled successfully'
                            );
                        }

                    }

                    setTimeout(() => {

                        handleResList();
                    }, 500);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const stripHTMLTags = (text) => {
        return text.replace(/<\/?[^>]+(>|$)/g, ""); 
    };
    const resData = {
        data: array,
        columns: [

            {
                name: 'No',
                selector: (row) => row.index,
                cellExport: (row) => row.index,
                width: '4rem'
            },

            {
                name: 'State',
                selector: (row) => row.
                    state_name,
                width: '10rem'
            },

            {
                name: 'Whatsapp Link',
                width: '8rem',
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
                                <FaWhatsapp style={{ color: "green", fontSize: "1.5rem" }} />
                            </a>
                        );
                    }
                }
            },
            {
                name: 'Teacher Inst',
                selector: (row) => stripHTMLTags(row.mentor_note),
                width: '13rem'
            }, {
                name: 'Student Inst',
                selector: (row) => stripHTMLTags(row.student_note)
                ,
                width: '13rem'
            },


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

                    </>
                ]
            },
            {
                name: 'Idea Activation',
                width: '9rem',
                cell: (record) => (
                    <ToggleButton
                        isEnabled={record.ideaSubmission === 1}
                        onToggle={(newStatus) => handleStatus(record, newStatus, 'idea')}
                    />
                )
            },
            {
                name: 'Certificate Activation',
                width: '12rem',
                cell: (record) => (
                    <ToggleButton
                        isEnabled={record.certificate === 1}
                        onToggle={(newStatus) => handleStatus(record, newStatus, 'certificate')}
                    />
                )
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
                            <h4>State Specific Operations</h4>
                            <h6>WhatsApp Links, Student-Teacher instructions and Idea Submission Activation</h6>
                        </div>
                    </div>
                </div>
                <Container className="ticket-page mb-50">
                    <Row>
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
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default StateData;
