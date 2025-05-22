/* eslint-disable indent */
import React, { useEffect,useState } from 'react';
import { Container, Row } from 'reactstrap';
import DataTableExtensions from 'react-data-table-component-extensions';
import DataTable, { Alignment } from 'react-data-table-component';
import { getCurrentUser } from '../../helpers/Utils';
import axios from 'axios';
import { openNotificationWithIcon } from '../../helpers/Utils';
import Swal from 'sweetalert2/dist/sweetalert2';
import logout from '../../assets/img/logout.png';
import { useNavigate } from 'react-router-dom';
import { PlusCircle } from "feather-icons-react/build/IconComponents";
import { FaFilePdf } from "react-icons/fa6";
import { PiImageFill } from "react-icons/pi";
import { IoLogoYoutube } from "react-icons/io";
import { IoDocumentText } from "react-icons/io5";
import 'sweetalert2/src/sweetalert2.scss';
import { encryptGlobal } from '../../constants/encryptDecrypt';
const AdminResources = () => {
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
            url: process.env.REACT_APP_API_BASE_URL + '/resource',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
        };
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setResList(response.data && response.data.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleEdit = (item) => {
            navigate('/editResource');
            
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

            {
                name: 'Role',
                selector: (row) => row.role,
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
                selector: (row) => row.description,
                width: '20rem'
            },
  {
      name: 'Attachment',
      width: '8rem',
      cell: (record) => {
          const fileExtension = record.attachments.split('.').pop().toLowerCase();
          const isLink = !record.attachments.match(/\.(png|jpg|jpeg|gif|pdf|doc|docx|xls|xlsx|ppt|pptx|txt)$/);
  
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
                  return <IoLogoYoutube size={"25"} style={{color:"red"}} />;
              }
              switch (extension) {
                  case 'png':
                  case 'jpg':
                  case 'jpeg':
                  case 'gif':
                      return <PiImageFill size={"25"} style={{color:"#fe9f43"}} />;
                  case 'pdf':
                      return <FaFilePdf size={"25"} style={{color:"red"}}/>;
                  case 'doc':
                  case 'docx':
                      return  <IoDocumentText size={"25"} style={{color:"skyblue"}}/>;

                  default:
                      return <i className="fas fa-file" style={{ color: "black" }}></i>;
              }
          };
          return (
            <>
           <div onClick={()=>handleFileDownload(record.attachments)}>{getFileIcon(fileExtension, isLink)}</div>
               <a
                  href={getFileViewerURL(newurl,fileExtension)}
                  id='myLink'
                  target="_blank"
                  className="badge badge-md bg-light"
                  rel="noopener noreferrer"
                  style={{ display: 'none' }}
              >
               </a>
            </>
          );
      }
  },
           
            {
                name: 'Actions',
                center: true,
                width: '14rem',
                cell: (record) => [
                    <>
                        <button
                              className="btn btn-info btn-sm"
                              onClick={() => handleEdit(record)}
                            >
                              <i data-feather="edit" className="feather-edit" /> Edit
                        </button>
                        <button
                              className="btn btn-danger btn-sm mx-3"
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
                            <h4>Resources</h4>
                            <h6>Create , Edit , Del State & User specific Resources here</h6>
                        </div>
                    </div>
                    <div className="page-btn">
                        <button
                            type="button"
                            className="btn btn-info"
                            onClick={() => navigate("/createResource")}
                        >
                            <PlusCircle className="me-2" style={{color:"white"}} /><b>Create Resources</b>
                        </button>
                    </div>
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

export default AdminResources;
