/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import { useState } from "react";
import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import DataTableExtensions from "react-data-table-component-extensions";
import DataTable, { Alignment } from "react-data-table-component";
import { getCurrentUser } from "../../helpers/Utils";
import axios from "axios";
import { openNotificationWithIcon } from "../../helpers/Utils";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2";
import logout from "../../assets/img/logout.png";
import { encryptGlobal } from "../../constants/encryptDecrypt";
import "sweetalert2/src/sweetalert2.scss";
import * as Icon from "react-feather";
import { AiOutlineDeliveredProcedure } from "react-icons/ai";
import { TbBounceRightFilled } from "react-icons/tb";
import { AiOutlineSolution } from "react-icons/ai";
import { MdQuestionAnswer } from "react-icons/md";
const EmailList = () => {
  const navigate = useNavigate();
  const [emailList, setEmailList] = useState([]);
  const [resList, setResList] = useState([]);

  const [card, setCard] = useState([]);
  const [reqList, setReqList] = useState(true);
  const currentUser = getCurrentUser("current_user");

  useEffect(() => {
    fetchEmailList();
    fetchCard();
  }, []);
  async function fetchEmailList() {
        // This function fetches All Emails from the API //

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/emails`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser?.data[0]?.token}`,
          },
        }
      );
      if (response.status === 200) {

        setEmailList(response?.data?.data[0]?.dataValues);
        setReqList(true);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchCard() {
        // This function fetches Bounced and Delivered Emails Count from the API //

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/emails/emailStats`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser?.data[0]?.token}`,
          },
        }
      );
      if (response.status === 200) {

        setCard(response?.data?.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleEdit = (item) => {
    navigate("/resend-email");

    localStorage.setItem("resID", JSON.stringify(item));
  };
  const emailData = {
    data: emailList || [],
    columns: [
      {
        name: "No",
        selector: (row, key) => key + 1,
        sortable: true,
        width: "5rem",
      },
      {
        name: "Email Subject",
        selector: (row) => row.subject,
        width: "20rem",
        sortable: true,
      },
      {
        name: "Actions",
        center: true,
        width: "15rem",
        cell: (record) => [
          <>
            <div
              key={record}
              onClick={() => handleEdit(record)}
              style={{ marginRight: "8px" }}
            >
              <a className="badge badge-md bg-info">
                
                <Icon.Send size={15} /> RESEND
              </a>
            </div>
          </>,
        ],
      },
    ],
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
  const handleBack = (e) => {
    setReqList(true);
  };
  const handleResponseList = async () => {
   
    await fetchResList();
};
async function fetchResList() {
        // This function fetches responses Emails list from the API //

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/emails/listEmailStats`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser?.data[0]?.token}`,
          },
        }
      );
      if (response.status === 200) {

        setResList(response?.data?.data);
        setReqList(false);
    } else {
        setReqList(true); 
      }
    } catch (error) {
      console.log(error);
    }
  }
  const ResData = {
    data: resList && resList.length > 0 ? resList : [],
    columns: [
      {
        name: "No",
        selector: (row, key) => key + 1,
        sortable: true,
        width: "5rem",
      },
      {
        name: "Email",
        selector: (row) => row.email,
        width: "20rem",
        sortable: true,
      },
       {
        name: "Bounce Reason",
        selector: (row) => row.bounce_reason ? row.bounce_reason :"-",
        width: "13rem",
        sortable: true,
      },
      {
        name: "Status",
        selector: (row) => row.status,
        width: "20rem",
        sortable: true,
      },
    
    ],
  };
  
  return (
    <div className="page-wrapper">
      <div className="content">
        <Container className="ticket-page mb-50">
          <Row>
            <Row className="mb-2 mb-sm-5 mb-md-5 mb-lg-0">
              <div className="page-header">
                <div className="add-item">
                  <div className="page-title">
                    <h4>Bulk Email List</h4>
                    <h6>
                      Send emails to registered mentors state wise by composing
                      the mail
                    </h6>
                  </div>
                </div>
                {!reqList ? (
                  <div className="page-btn">
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={(e) => handleBack(e)}
                    >
                      Back
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="d-flex align-items-center gap-2">
                      <button
                        type="button"
                        className="btn btn-info"
                        onClick={() => navigate("/create-email")}
                      >
                        <Icon.Mail
                          className="me-2"
                          style={{ color: "white" }}
                        />
                        <b>COMPOSE</b>
                      </button>
                   
                      <button
                        type="button"
                        className="btn btn-info"
                        onClick={() => handleResponseList()}
                      >
                        <MdQuestionAnswer
                          className="me-2"
                          size="23"
                          style={{ color: "white" }}
                        />
                        <b>RESPONSES</b>
                      </button>
                    </div>
                  </>
                )}
              </div>

              <div className="col-xl-6 col-sm-6 col-12">
                <div className="dash-widget dash2 w-100">
                  <div className="dash-widgetimg">
                    <span>
                      <TbBounceRightFilled size="30" />
                    </span>
                  </div>
                  <div className="dash-widgetcontent">
                    <h5>{card.BouncedCount}</h5>
                    <h6>Bounced Count</h6>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-sm-6 col-12">
                <div className="dash-widget dash2 w-100">
                  <div className="dash-widgetimg">
                    <span>
                      <AiOutlineDeliveredProcedure size="30" />
                    </span>
                  </div>
                  <div className="dash-widgetcontent">
                    <h5>{card.DeliveredCount}</h5>
                    <h6>Delivered Count</h6>
                  </div>
                </div>
              </div>
              <div className="my-2">
                {reqList ? (
                <DataTableExtensions
                  print={false}
                  export={false}
                  {...emailData}
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
                ): (
                    <DataTableExtensions
                  print={false}
                  export={false}
                  {...ResData}
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
                )}
              </div>
            </Row>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default EmailList;
