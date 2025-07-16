/* eslint-disable indent */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Row, Col, Form, Label, Card, CardBody, Input } from "reactstrap";
import axios from "axios";

import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
// eslint-disable-next-line no-unused-vars
import { getCurrentUser, openNotificationWithIcon } from "../../helpers/Utils";
import { getSupportTickets } from "../../redux/actions";

import {
  createSupportTicketResponse,
  getSupportTicketById,
  SupportTicketStatusChange,
} from "../../Teacher/store/mentors/actions";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import moment from "moment";
import { useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaComments, FaFile, FaLink } from "react-icons/fa";
import { UncontrolledAlert } from "reactstrap";
import { encryptGlobal } from "../../constants/encryptDecrypt";

const StateRes = (props) => {
  const { search } = useLocation();
  const currentUser = getCurrentUser("current_user");
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = new URLSearchParams(search).get("id");
  const { supportTicket } = useSelector((state) => state?.mentors);
  const language = useSelector((state) => state?.mentors.mentorLanguage);

  useEffect(() => {
    dispatch(getSupportTickets(currentUser?.data[0]));
  }, []);
  useEffect(() => {
    dispatch(getSupportTicketById(id, language));
  }, []);

  const formik = useFormik({
    initialValues: {
      ansTicket: "",
      selectStatusTicket: supportTicket?.status || "",
      file_name: "",
      url: "",
    },

    validationSchema: Yup.object({
      ansTicket: Yup.string().required("Required"),
      selectStatusTicket: Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        if (values.file_name !== "") {
          const fileData = new FormData();
          fileData.append("file", values.file_name);

          const response = await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/supportTickets/supportTicketFileUpload`,
            fileData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${currentUser?.data[0]?.token}`,
              },
            }
          );
          values.file_name = response?.data?.data[0].attachments[0].toString();
        }
        const ansTicket = values.ansTicket;
        const id = supportTicket.support_ticket_id;

        const body = {
          support_ticket_id: id,
          reply_details: ansTicket,
        };
        if (values.file_name !== "") {
          body["file"] = values.file_name;
        }
        if (values.url !== "") {
          body["link"] = values.url;
        }

        dispatch(createSupportTicketResponse(body));
        dispatch(
          SupportTicketStatusChange(id, { status: values.selectStatusTicket })
        );
        navigate("/admin-support");
        setTimeout(() => {
          dispatch(getSupportTickets(currentUser?.data[0]));
        }, 500);
      } catch (error) {
        console.log(error);
      }
    },
   
  });
  useEffect(() => {
    if (supportTicket?.status) {
      formik.setFieldValue("selectStatusTicket", supportTicket.status);
    }
  }, [supportTicket?.status]);
  const fileHandlerforFormik = (e) => {
    // Handles file selection and reads the selected file

    let file = e.target.files[0];

    if (!file) {
      return;
    }

    let pattern = /^[a-zA-Z0-9_-\s]{0,}$/;
    const fileName = file.name.split(".").slice(0, -1).join(".");
    const isValidFileName = pattern.test(fileName);

    const maxFileSize = 10000000;
    const isOverMaxSize = file.size > maxFileSize;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "application/msword",
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      openNotificationWithIcon(
        "error",
        t("Accepting only png,jpg,jpeg,pdf,doc,docx Only")
      );
      return;
    }

    if (isOverMaxSize) {
      openNotificationWithIcon("error", t("student.less_10MB"));
      return;
    }

    if (!isValidFileName) {
      openNotificationWithIcon(
        "error",
        "Only alphanumeric and '_' are allowed"
      );
      return;
    }
    formik.setFieldValue("file_name", file);
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
  return (
    <div className="page-wrapper">
        <h4 className="m-2" 
        style={{ position: 'sticky', top: '70px', zIndex: 1000, padding: '10px',backgroundColor: 'white', display: 'inline-block' , color: '#fe9f43',fontSize:"16px" }}
        >Support
        </h4>
      <div className="content">
        <div className="EditPersonalDetails new-member-page">
          <Row>
            <form onSubmit={formik.handleSubmit}>
              <Card className="aside">
                <div
                  style={{
                    borderStyle: "solid",
                    borderWidth: "thin",
                    borderColor: "aqua",
                    borderRadius: "1rem",
                    padding: "1.5rem 1rem",
                    margin: "1rem",
                  }}
                >
                  <Row>
                    <Col md={12}>
                      <div
                          className="saved-text"
                          style={{ whiteSpace: "pre-wrap", marginTop: "1rem" }}
                        >
                          {supportTicket?.query_details}
                        </div>
                      <hr />
                    </Col>
                    <Col md={3}>
                      <span>
                        <FaUserCircle /> {supportTicket?.created_by}
                      </span>{" "}
                    </Col>
                    <Col md={3} className="text-right">
                      {supportTicket?.link && (
                        <a
                          href={supportTicket?.link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FaLink />
                          {"Link "}
                        </a>
                      )}
                      {supportTicket?.file && (
                        <a
                          href={supportTicket?.file}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FaFile />
                          {"File"}
                        </a>
                      )}
                    </Col>
                    <Col md={6} className="text-right">
                      <span>
                        <FaRegClock />{" "}
                        {moment(supportTicket.created_at).format(
                          "LLL"
                        )}
                      </span>
                    </Col>
                  </Row>
                </div>

                {supportTicket?.support_ticket_replies?.length > 0 &&
                  supportTicket.support_ticket_replies.map((data, i) => {
                    return (
                      <div
                        key={i}
                        style={{
                          borderStyle: "solid",
                          borderWidth: "thin",
                          borderColor: "aquamarine",
                          borderRadius: "1rem",
                          padding: "1.5rem 1rem",
                          margin: "1rem",
                        }}
                      >
                        <Row>
                          <Col md={12}>
                            <div
                              className="saved-text"
                              style={{ whiteSpace: "pre-wrap", marginTop: "1rem" }}
                            >
                              {data.reply_details}
                            </div>
                           
                            <hr />
                          </Col>
                          <Col md={3}>
                            <span>
                              <FaUserCircle />{" "}
                             
                              {data.created_by == null
                                ? data.replied_by
                                : data.created_by}
                            </span>{" "}
                          </Col>
                          <Col md={3} className="text-right">
                            {data?.link && (
                              <a
                                href={data?.link}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <FaLink />
                                {"Link "}
                              </a>
                            )}
                            {/* {data?.file && (
                              <><div className="d-inline" onClick={()=>handleFileDownload(data?.file)}><FaFile />
                                {"File"}</div>
                               <a
                                href={newurl}
                                id='myLink'
                                target="_blank"
                                rel="noreferrer"
                              >
                              </a>
                              </>
                            )} */}
                             {data?.file && (
                              <a
                                href={data?.file}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <FaFile />
                                {"File"}
                              </a>
                            )}
                          </Col>
                          <Col md={6} className="text-right">
                            <span>
                              <FaRegClock />{" "}
                              {moment(data.created_at).format(
                                "LLL"
                              )}
                            </span>
                          </Col>
                        </Row>
                      </div>
                    );
                  })}

                {(supportTicket?.status != "INVALID" &&
                supportTicket?.status != "RESOLVED" )? (
                  <Row className="p-2">
                    <Col md={12}>
                      <div>
                        <label className="form-label">
                          Description <span>*</span>
                        </label>
                        <textarea
                          className="text-form form-control"
                          placeholder="Enter Details"
                          id="ansTicket"
                          name="ansTicket"
                          rows={4}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.ansTicket}
                        />
                        {formik.touched.ansTicket && formik.errors.ansTicket ? (
                          <small className="error-cls text-danger">
                            {formik.errors.ansTicket}
                          </small>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="mb-2" htmlFor="url">
                          Link
                        </Label>
                        <Input
                          type="text"
                          name="url"
                          id="url"
                          placeholder="Please enter the link"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.url}
                        />
                        {formik.touched.url && formik.errors.url && (
                          <small className="error-cls">
                            {formik.errors.url}
                          </small>
                        )}
                      </div>
                      <div className="mb-3">
                        <Label className="mb-2" htmlFor="file_name">
                          File
                        </Label>
                        <div className="m-2">
                          <input
                            type="file"
                            id="file_name2"
                            name="file_name"
                            style={{
                              display: "none",
                            }}
                            accept="image/jpeg,image/png,application/msword,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            onChange={(e) => fileHandlerforFormik(e)}
                            onBlur={formik.handleBlur}
                          />
                          <button
                            className="btn btn-primary add-em-payroll"
                            type="button"
                            onClick={() => {
                              document.getElementById("file_name2").click();
                            }}
                          >
                            Upload File
                          </button>
                          {formik.values.file_name ? (
                            <span className="ml-2">
                              {formik.values.file_name.name}
                            </span>
                          ) : (
                            <span className="ml-2">
                              {formik.initialValues.file_name}
                            </span>
                          )}
                        </div>
                        {formik.touched.file_name &&
                          formik.errors.file_name && (
                            <small className="error-cls">
                              {formik.errors.file_name}
                            </small>
                          )}
                      </div>
                      <div className="mb-3">
                        <Label className="mb-2">Select Status</Label>
                        <Col className="form-group" md={12}>
                          <select
                            name=" selectStatusTicket"
                            id=" selectStatusTicket"
                            className="form-control custom-dropdown"
                            onChange={(e) => {
                              formik.setFieldValue(
                                "selectStatusTicket",
                                e.target.value
                              );
                            }}
                            onBlur={formik.handleBlur}
                            value={formik.values.selectStatusTicket  || ""}
                          >
                            <option value="" disabled={true}>
                            
                                  {supportTicket?.status || "Select Status"}
                            </option>
                            <option value="OPEN">OPEN</option>
                            <option value="INPROGRESS">INPROGRESS</option>
                            <option value="RESOLVED">RESOLVED</option>
                            <option value="INVALID">INVALID</option>
                          </select>
                          {formik.touched.selectStatusTicket &&
                            formik.errors.selectStatusTicket && (
                              <small className="error-cls">
                                {formik.errors.selectStatusTicket}
                              </small>
                            )}
                        </Col>
                      </div>
                    </Col>
                  </Row>
                ) : (
                  <UncontrolledAlert color="danger" className="mb-2">
                    Chat window closed. 
                  </UncontrolledAlert>
                )}
              </Card>

              <div className="mb-3">
                <Row>
                  {(supportTicket?.status != "INVALID" &&
                  supportTicket?.status != "RESOLVED" )? (
                    <div className="col-lg-12">
                      <div className="view-btn d-flex justify-content-between">
                        <button
                          type="button"
                          onClick={() => {formik.resetForm();navigate("/admin-support");}}
                          className="btn btn-secondary me-2"
                        >
                          Discard
                        </button>
                        <button type="submit" className="btn btn-warning">
                          Send Response
                        </button>
                      </div>
                    </div>
                  ) : null}
                </Row>
              </div>
            </form>

            {/* </Col> */}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default StateRes;
