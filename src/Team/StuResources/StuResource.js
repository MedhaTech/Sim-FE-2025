/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../../helpers/Utils";
import { encryptGlobal } from "../../constants/encryptDecrypt";
import { useTranslation } from 'react-i18next';
import FileGrid from "./FileGrid";

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
     // this function fetches all resources list from the API
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
  
                  
                    default:
                        return <i className="fas fa-file" style={{ color: "black" }}></i>;
                }
            };
    
            return (
                <a
                    href={getFileViewerURL(record.attachments, fileExtension)}
                    target="_blank"
                    className="badge badge-md bg-light"
                    rel="noopener noreferrer"
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
        <div>
          <FileGrid resList={resList} />
        </div>
      
      </div>
    </div>
  );
};

export default StuResource;
