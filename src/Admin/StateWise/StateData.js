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
        // console.log('Toggled record:', item, 'New status:', value);
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
                    // console.log(value,"put");

                    if (value === 0) {
                        openNotificationWithIcon(
                            'success',
                            'Idea Submission Disabled successfully'
                        );
                    } else if (value === 1) {
                        openNotificationWithIcon(
                            'success',
                            'Idea Submission Enabled successfully'
                        );
                    }
                    // if (response.data.data[0] === 0) {
                    //     openNotificationWithIcon(
                    //         'success',
                    //         'State Status Disabled successfully'
                    //     );
                    // } else if (response.data.data[0] === 1) {
                    //     openNotificationWithIcon(
                    //         'success',
                    //         'State Status Enabled successfully'
                    //     );
                    // }
                  
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
    const stripHTMLTags = (text) => {
        return text.replace(/<\/?[^>]+(>|$)/g, ""); // Removes all HTML tags
      };
    const resData = {
        // data: resList || [],
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
                                 <FaWhatsapp style={{color:"green" ,fontSize:"1.5rem"}}/>
                                {/* Navigate */}
                            </a>
                        );
                    }
                }
            },
            {
                name: 'Teacher Inst',
                selector: (row) =>stripHTMLTags(row.mentor_note),
                width: '13rem'
            },  {
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
                width: '12rem',
                cell: (record) => (
                  <ToggleButton
                    isEnabled={record.ideaSubmission === 1}
                    onToggle={(newStatus) => handleStatus(record, newStatus)}
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
                                    // data={setResList}
                                    // noHeader
                                    defaultSortField="id"
                                    customStyles={customStyles}
                                    // pagination={true} 
                                    // paginationPerPage={10} 
                                    // paginationRowsPerPageOptions={[10, 20, 30, 50]}
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
