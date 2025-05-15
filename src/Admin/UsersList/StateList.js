/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import { Container, Row } from 'reactstrap';
import axios from 'axios';
import { URL, KEY } from '../../constants/defaultValues.js';
import { AlertOctagon, PlusCircle, Check } from 'feather-icons-react/build/IconComponents';
import { getNormalHeaders } from '../../helpers/Utils';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import logout from '../../assets/img/logout.png';
import DataTable, { Alignment } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import AddStateUser from './AddStateUser.js';
import { encryptGlobal } from '../../constants/encryptDecrypt.js';

const StateList = () => {
    const [tableData, settableData] = React.useState([]);
    const navigate = useNavigate();
    const [registerModalShow, setRegisterModalShow] = useState(false);

    useEffect(() => {
        handleStateList();
    }, []);

    async function handleStateList() {
        // handleStateList api //
        //where we can see all state users list //
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        await axios
            .get(`${URL.StatePath}`, axiosConfig)
            .then(function (response) {
                if (response.status === 200) {
                    const updatedWithKey =
                        response.data &&
                        response.data.data.
                            map((item, i) => {
                                const upd = { ...item };
                                upd['key'] = i + 1;
                                return upd;
                            });
                    settableData(updatedWithKey);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleStatusUpdateInAdmin = async (data, id) => {
        // where we can update the admin status //
        // where id = state id //
        // where data = status //
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        const upad = encryptGlobal(JSON.stringify(id));
        await axios
            .put(`${URL.StatePath + '/' + upad}`, data, axiosConfig)
            .then((user) => console.log(user))
            .catch((err) => {
                console.log('error', err);
            });
    };

    const handleStatus = (status, id) => {
        // where we can update the status Active to InActive //
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
                text: `You are attempting to ${status.toLowerCase() === 'active'
                    ? 'activate'
                    : 'inactivate'
                    } State User.`,
                imageUrl: `${logout}`,
                confirmButtonText: status,
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                reverseButtons: false
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    await handleStatusUpdateInAdmin({ status: status }, id);
                    setTimeout(() => {
                        handleStateList();
                    }, 500);
                    swalWithBootstrapButtons.fire(
                        `State User Status has been changed!`,
                        'Successfully updated.',
                        'success'
                    );
                }
            });
    };

    const StateData = {
        data: tableData && tableData.length > 0 ? tableData : [],
        columns: [
            {
                name: 'No',
                selector: (row, key) => key + 1,
                sortable: true,
                cellExport: (row) => row.index,
                width: '5rem'
            },
            {
                name: 'Full Name',
                selector: (row) => row?.user?.full_name,
                cellExport: (row) => row?.user?.full_name,
                sortable: true,
                width: '13rem'
            },
            {
                name: 'Email & Password',
                selector: (row) => row?.user?.username,
                cellExport: (row) => row?.user?.username,
                sortable: true,
                width: '14rem'
            },
            {
                name: 'State Name',
                selector: (row) => row?.state_name,
                cellExport: (row) => row?.state_name,
                sortable: true,
                width: '14rem'
            },
            {
                name: 'Status',
                sortable: true,
                cell: (row) => [
                    <span key={row.state_id} className={`${row.status === 'ACTIVE' ? "badge bg-success" : "badge bg-danger"
                        }`}>{row.status}</span>
                ],
                width: '6rem'
            },
            {
                name: 'Actions',
                sortable: false,
                width: '18rem',
                cell: (record) => [
                    <div
                        className="mr-5"
                        key={record?.id}
                        style={{ marginRight: '10px' }}
                    ></div>,
                    <><div
                        key={record.id}
                        style={{ marginRight: '10px' }}
                        onClick={() => {
                            let status = record?.status === 'ACTIVE'
                                ? 'INACTIVE'
                                : 'ACTIVE';
                            handleStatus(
                                status,
                                record?.state_id
                            );
                        }}
                    >
                        {record?.status === 'ACTIVE' ? (
                            <button
                                className="btn btn-light"
                            > Inactivate<AlertOctagon className="ms-1" style={{ height: 15, width: 15 }} />
                            </button>
                        ) : (
                            <button
                                className="btn btn-success"
                            >
                                Activate&nbsp;<Check className="ms-1" style={{ height: 15, width: 15 }} />
                            </button>
                        )}
                    </div>
                    </>
                ]
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
            <div className="content">
                <div className="page-header">
                    <div className="add-item d-flex">
                        <div className="page-title">
                            <h4>State Users List</h4>
                            <h6>Create an State User here</h6>
                        </div>
                    </div>
                    <div className="page-btn">
                        <button
                            type="button"
                            className="btn btn-info"
                            onClick={() =>
                                setRegisterModalShow(true)
                            }
                        >
                            <PlusCircle className="me-2" style={{ color: "white" }} /><b>Add New State User</b>
                        </button>
                    </div>
                </div>
                <Container className="ticket-page mb-50 userlist">
                    <Row >
                        <Container fluid >
                            <div className="card pt-3 mt-2">
                                <DataTableExtensions
                                    print={false}
                                    export={false}
                                    {...StateData}
                                >
                                    <DataTable
                                        data={tableData || []}
                                        defaultSortField="id"
                                        customStyles={customStyles}

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
                        </Container>
                        {registerModalShow &&
                            <AddStateUser
                                show={registerModalShow}
                                setShow={setRegisterModalShow}
                                onHide={() => setRegisterModalShow(false)}
                            />
                        }
                    </Row>
                </Container>
            </div>
        </div>
    );
};
export default StateList;
