/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import { useState } from 'react';
import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';
import DataTableExtensions from 'react-data-table-component-extensions';
import DataTable, { Alignment } from 'react-data-table-component';
import { getCurrentUser } from '../../helpers/Utils';
import axios from 'axios';
import { openNotificationWithIcon } from '../../helpers/Utils';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2';
import logout from '../../assets/img/logout.png';
import { encryptGlobal } from '../../constants/encryptDecrypt';
import 'sweetalert2/src/sweetalert2.scss';
import { FaFilePdf } from "react-icons/fa6";
import { PiImageFill } from "react-icons/pi";
import { IoLogoYoutube } from "react-icons/io";
import { IoDocumentText } from "react-icons/io5";
import { AlertOctagon,PlusCircle, Check} from 'feather-icons-react/build/IconComponents';
import { FaExternalLinkAlt } from "react-icons/fa";
const AdminResources = () => {
    const navigate = useNavigate();
    const [tecList, setTecList] = useState([]);

    const currentUser = getCurrentUser('current_user');

    useEffect(() => {
        fetchTecResourceList();
    }, []);
    async function fetchTecResourceList() {
        // This function fetches all popup list from the API // 
       
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/popup`,
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
    const [newurl,setnewurl] = useState('');
const handleFileDownload = async(file) =>{
     const parts = file.split('/');
    const path = parts.slice(3).join('/');
    const openParam = encryptGlobal(JSON.stringify({
      filePath: path
    }));
    var config = {
      method: 'get',
      url:
        process.env.REACT_APP_API_BASE_URL +
        `/admins/s3fileaccess?Data=${openParam}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser?.data[0]?.token}`
      }
    };
    await axios(config)
      .then(function (response) {
        if (response.status === 200) {
         setnewurl(response.data.data);
        setTimeout(() => {
                  document.getElementById('myLink').click();
                }, 500);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
};
    const teacherData = {
        data: tecList || [],

        columns: [
            {
                name: 'No',
                selector: (row, key) => key + 1,
                sortable: true,
                width: '5rem'
            },
            {
                name: 'Role',
                selector: (row) => row.role,
                width: '6rem',
                sortable: true,
            },{
                name: 'State',
                selector: (row) => row.
                state,
                sortable: true,
                width: '9rem'
            },
            {
                name: 'Path',
                selector: (row) => row.navigate ? row.navigate : "-",
                width: '8rem'
            },
         
          
            {
                name: 'File',
                width: '9rem',
                cell: (record) => {
                     const fileUrl = record?.file || "";
                    if (!fileUrl) {
                        return <p>No file</p>;
                    }
            
                    // const fileExtension = record.file.split('.').pop().toLowerCase();
                    // const isLink = !record.file.match(/\.(png|jpg|jpeg|gif|pdf|doc|docx|xls|xlsx|ppt|pptx|txt)$/);
                    const cleanFileName = fileUrl.split('?')[0]; 
const fileExtension = cleanFileName.split('.').pop().toLowerCase();
const isLink = !cleanFileName.match(/\.(png|jpg|jpeg|gif|pdf|doc|docx|xls|xlsx|ppt|pptx|txt)$/);

            
                    const getFileViewerURL = (url, extension) => {
                        if (isLink) {
                            return url; 
                        } else if (['pdf'].includes(extension)) {
                            return `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;
                        } else if (['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(extension)) {
                            return `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(url)}`;
                        } else if (['png', 'jpg', 'jpeg', 'gif'].includes(extension)) {
                            return url; 
                        }
                        return url; 
                    };
            
                    const getFileIcon = (extension, isLink) => {
                        if (isLink) {
                            return <IoLogoYoutube size={"25"} style={{ color: "red" }} />;
                        }
                        switch (extension) {
                            case 'png':
                            case 'jpg':
                            case 'jpeg':
                            case 'gif':
                                return <PiImageFill size={"25"} style={{ color: "#fe9f43" }} />;
                            case 'pdf':
                                return <FaFilePdf size={"25"} style={{ color: "red" }} />;
                            case 'doc':
                            case 'docx':
                                return <IoDocumentText size={"25"} style={{ color: "skyblue" }} />;
                            default:
                                return <i className="fas fa-file" style={{ color: "black" }}></i>;
                        }
                    };
            
                    return (
                        <>
                       
               <a
                  href={getFileViewerURL(record.file, fileExtension)}
                  target="_blank"
                  className="badge badge-md bg-light"
                  rel="noopener noreferrer"
              >
                  {getFileIcon(fileExtension, isLink)}
               </a>
                        </>
                    );
                }
            },
            
            {
                name: 'Image',
                width: '9rem',
                cell: (record) => {
                    if (!record.image) {
                        return <p>No image</p>;
                    }
            
                    const fileExtension = record.image.split('.').pop().toLowerCase();
                    const isImage = ['png', 'jpg', 'jpeg', 'gif'].includes(fileExtension);
            
                    return (
                        <>
                      
               <a
                  href={record.image}
                  target="_blank"
                  className="badge badge-md bg-light"
                  rel="noopener noreferrer"
              >
                 {isImage ? (
                                <PiImageFill size={"25"} style={{ color: "#fe9f43" }} />
                            ) : (
                                <i className="fas fa-file" style={{ color: "black" }}></i>
                            )}
               </a>
                        </>
                    );
                }
            },
            
            {
                name: 'Link',
                width: '9rem',
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
                             <FaExternalLinkAlt  size={"20"} style={{ color: "black" }} />
                        </a>
                        );
                    }
                }
            },
            {
                name: 'Video',
                width: '9rem',
                cell: (record) => {
                    if (record.youtube === null || record.youtube === "") {
                        return <p>No video</p>;
                    } else {
                        return (
                            <a
                            href={record.youtube}
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
                name: 'Actions',
                center: true,
                width: '8rem',
                cell: (record) => [
                    <>
                        <div
                            key={record}
                            onClick={() => handleTecherDelete(record)}
                            style={{ marginRight: '8px' }}
                        >                  
                            <a className="badge badge-md bg-danger">
                                <i
                                    data-feather="trash-2"
                                    className="feather-trash-2"
                                    />
                            </a>
                        </div>
                    </>
                ]
            },
            {
                name: 'On/Off Popup',
                width: '10rem',
                cell: (record) => {
                    
                    if (record.on_off === '1') {
                        return (
                            <button
                                className="btn btn-success"
                                onClick={() => {
                                    handleStatus(record
                                        , '0');
                                }}
                            >
                                Turned ON<Check className="ms-1"  style={{ height: 15, width: 15 }}/>
                            </button>
                        );
                    } else if (record.on_off === '0') {
                        return (
                            <button
                                className="btn btn-light"
                                onClick={() => {
                                    handleStatus(record
                                        , '1');
                                }}
                            >
                                Turned Off<AlertOctagon className="ms-1"  style={{ height: 15, width: 15 }}/>
                                
                            </button>
                        );
                    }
                }
            },
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
                        JSON.stringify(items.popup_id)
                    );
                    var config = {
                        method: 'delete',
                        url:
                            process.env.REACT_APP_API_BASE_URL +
                            '/popup/' +
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
                                    'PopUp Deleted Successfully'
                                );
                                setTimeout(()=>{

                                    fetchTecResourceList();
                                },500);
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
        // This function updates status with the value // 

        const body = {
           
            on_off: value
        };
       
            if (
                item.navigate !== item.navigate
                ) {
                    body['navigate'] = item.navigate;
                }
        const popParam = encryptGlobal(JSON.stringify(item.
            popup_id
            ));
        
        let config = {
            method: 'put',
            url: process.env.REACT_APP_API_BASE_URL + `/popup/${popParam}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            },
            data:JSON.stringify(body)
        };
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    if (value === '0') {
                        openNotificationWithIcon(
                            'success',
                            'PopUp Disabled successfully'
                        );
                    } else if (value === '1') {
                        openNotificationWithIcon(
                            'success',
                            'PopUp Enabled successfully'
                        );
                    }
                   
                    setTimeout(()=>{

                        fetchTecResourceList();
                    },500);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
   
   
   

  

  
   
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
                        <h4>PopUp List</h4>
                        <h6>Create State & User specific Popups here </h6>
                    </div>
                </div>
                <div className="page-btn">
                    <button
                        type="button"
                        className="btn btn-info"
                        onClick={() =>
                            navigate(
                                    '/create-popup'
                                )
                            }
                    >
                        <PlusCircle className="me-2" style={{color:"white"}} /><b>Create PopUp</b>
                    </button>
                </div>
            </div>
            <Container className="ticket-page mb-50">
                <Row>
                    <Row className="mb-2 mb-sm-5 mb-md-5 mb-lg-0">
                            <div>
                                <DataTableExtensions
                                    print={false}
                                    export={false}
                                    {...teacherData}
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
                </Row>
            </Container>
            {/* <h1>hi</h1> */}
        </div>
        </div>
    );
};

export default AdminResources;
