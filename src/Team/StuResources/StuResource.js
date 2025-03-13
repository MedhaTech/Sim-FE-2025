/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../../helpers/Utils";
import { encryptGlobal } from "../../constants/encryptDecrypt";
import { useTranslation } from 'react-i18next';

import { useNavigate } from "react-router-dom";
import DataTableExtensions from "react-data-table-component-extensions";
import DataTable, { Alignment } from "react-data-table-component";
import axios from "axios";
import { FcDocument } from "react-icons/fc";
import { FaFilePdf } from "react-icons/fa6";
import { MdOutlineFileDownload } from "react-icons/md";
import { PiImageFill } from "react-icons/pi";
import { LiaFileExcelSolid } from "react-icons/lia";
import { IoLogoYoutube } from "react-icons/io";
import { IoDocumentText } from "react-icons/io5";
import { MdConnectedTv } from "react-icons/md";
const StuResource = () => {
  const { t } = useTranslation();

  const currentUser = getCurrentUser("current_user");
  const navigate = useNavigate();
  const [resList, setResList] = useState([]);
  const [rows, setRows] = React.useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);
  useEffect(() => {
    fetchResourceList();
  }, []);

  async function fetchResourceList() {
    const fectchTecParam = encryptGlobal(
      JSON.stringify({
        role: "student",
        state:currentUser?.data[0]?.state
      })
    );

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/resource?Data=${fectchTecParam}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser?.data[0]?.token}`,
          },
        }
      );
      if (response.status === 200) {
        setResList(response.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const resData = {
    data: resList || [],
    columns: [
      {
        name: "No",
        selector: (row, key) => key + 1,
        width: "6rem",
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
  
                    // case 'xls':
                    // case 'xlsx':
                    //     return<LiaFileExcelSolid />;
                    // case 'ppt':
                    // case 'pptx':
                    //     return <i className="fas fa-file-powerpoint" style={{ color: "orange" }}></i>;
                    default:
                        return <i className="fas fa-file" style={{ color: "black" }}></i>;
                }
            };
    
            return (
                <a
                    // href={getFileViewerURL(record.attachments, fileExtension)}
                    target="_blank"
                    className="badge badge-md bg-light"
                    rel="noopener noreferrer"
                    style={{ cursor: "default", pointerEvents: "none" }}
                >
                    {getFileIcon(fileExtension, isLink)}
                </a>
            );
        }
    },
      {
        name: "Details",
        selector: (row) => row.description,
        sortable: true,

        width: "40rem",
      },
  
  
   {
            width: '8rem',
            cell: (record) =>
              hoveredRow === record.resource_id ? (
                <>
                  {record.type === "link" ? (
                    <a 
                      href={record.attachments} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {/* <i 
                        data-feather="eye" 
                        className="feather-eye" 
                        style={{ color: "black" }} 
                      /> */}
                      <MdConnectedTv size={"25"} style={{ color: "black" }} />
                    </a>
                  ) : (
                    <a 
                      href={record.attachments} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <MdOutlineFileDownload size={"25"} style={{ color: "black" }} />
                    </a>
                  )}
                </>
              ) : null,
          },
//   {
//     // name: 'Download',
//     width: '8rem',
//     cell: (record) =>
//       hoveredRow === record.
//     resource_id
//     ? (
//         <a href={record.attachments} target="_blank" rel="noopener noreferrer">
//           <MdOutlineFileDownload size={"25"} style={{ color: "black" }} />
//         </a>
//       ) : null,
   
// },
  
   
    ],
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
          <div className="page-title">
            <h4>{t('home.resources')}</h4>
            <h6>{t('home.reshead')}</h6>
          </div>
        </div>
        <div className="card table-list-card my-2">
          <DataTableExtensions
            data={rows}
            print={false}
            export={false}
            {...resData}
            exportHeaders
          >
            <DataTable
              defaultSortField="id"
              defaultSortAsc={false}
              columns={resData.columns}
      data={resData.data}
              customStyles={customStyles}
              pagination
              highlightOnHover
              onRowMouseEnter={(row) => setHoveredRow(row.resource_id)}
      onRowMouseLeave={() => setHoveredRow(null)}
              fixedHeader
              subHeaderAlign={Alignment.Center}
            />
          </DataTableExtensions>
        </div>
      </div>
    </div>
  );
};

export default StuResource;
   // {
      //     name: 'Type',
      //     selector: (row) => row.type,
      //     width: '25%'
      // },
      // {
      //   name: "File / Link",
      //   width: "20%",
      //   cell: (record) => {
      //     if (record.type === "file") {
      //       return (
      //         // <button className="btn btn-outline-warning btn-sm mx-2">
      //           <a
      //             href={record.attachments}
      //             target="_blank"
      //             className="badge badge-md bg-secondary"
      //             rel="noopener noreferrer"
      //           >
      //             <i className="fas fa-file-lines"></i> Navigate
      //           </a>
      //         // </button>
      //       );
      //     } else if (record.type === "link") {
      //       return (
      //           <a
      //             href={record.attachments}
      //             target="_blank"
      //             className="badge badge-md bg-secondary"
      //             rel="noopener noreferrer"
      //           >
      //             <i className="fa-brands fa-youtube"></i> Navigate
      //           </a>
      //       );
      //     }
      //     return null;
      //   },
      // },
