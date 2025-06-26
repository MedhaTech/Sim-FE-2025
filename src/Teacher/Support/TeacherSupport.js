/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Row, Col, Label, Card, CardBody, Input } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, PlusCircle } from "react-feather";
import axios from "axios";
import Select from "react-select";
import * as Yup from "yup";
import { useFormik } from "formik";
import { getCurrentUser, openNotificationWithIcon } from "../../helpers/Utils";
import { createSupportTickets } from "../store/mentors/actions";
import { getSupportTickets } from "../../redux/actions";
import { FaComments, FaFile, FaLink } from "react-icons/fa";
import DataTableExtensions from "react-data-table-component-extensions";
import DataTable, { Alignment } from "react-data-table-component";
import {
  createSupportTicketResponse,
  getSupportTicketById,
  SupportTicketStatusChange,
} from "../store/mentors/actions";
import { UncontrolledAlert } from "reactstrap";

import { FaUserCircle } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";

const TeacherSupport = () => {
  const { supportTickets } = useSelector((state) => state.mentors);
  const { supportTicket } = useSelector((state) => state.mentors);
  const language = useSelector((state) => state?.mentors.mentorLanguage);
  const { t } = useTranslation();
  //const [id, setId] = useState();
  useEffect(() => {
    dispatch(getSupportTickets(currentUser?.data[0]));
  }, []);

  // const ticketOptions = [
  //   { value: "", label: "Select Category", display: true },
  //   { value: "General", label: "General query" },
  //   { value: "Technical", label: "Technical query" },
  //   { value: "Suggestion", label: "Suggestion" },
  // ];
  const ticketOptions = [
    { value: "", label: t("teacherJourney.selectCategory"), isDisabled: true },
    { value: "General", label: t("teacherJourney.generalQuery") },
    { value: "Technical", label: t("teacherJourney.technicalQuery") },
    { value: "Suggestion", label: t("teacherJourney.suggestion") },
  ];

  useEffect(() => {
    formik.setFieldValue("selectStatusTicket", supportTicket.status);
  }, [supportTicket]);

  const SchoolsData = {
    data: supportTickets,
    columns: [
      {
        name: <h6>#</h6>,
        selector: (row) => row.id,
        width: "4rem",
      },
      {
        name: <h6>{t("teacherJourney.Category")}</h6>,
        // selector: (row) => row.query_category,
         selector: (row) => {
    if (row.query_category === "Technical") return t("teacherJourney.technicalQuery");
    if (row.query_category === "General") return t("teacherJourney.generalQuery");
    if (row.query_category === "Suggestion") return t("teacherJourney.suggestion");
    return row.query_category || ""; 
  },
        sortable: true,
        width: "10rem",
      },
      {
        name: <h6>{t("teacherJourney.QueryDetails")}</h6>,
        selector: (row) => row.query_details,
        sortable: true,
        width: "30rem",

        cell: (params) => [
          <p key={params.support_ticket_id}>{params?.query_details}</p>,
        ],
      },
      {
        name: <h6>{t("teacherJourney.Chat")}</h6>,
        width: "8rem",
        cell: (params) => {
          return [
            <a
              href="#"
              key={params.support_ticket_id}
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              onClick={() => handleChat(params.support_ticket_id)}
            >
              <FaComments />{" "}
              <span className="badge rounded-pill bg-primary">
                {params.replies_count}
              </span>
            </a>,
          ];
        },
      },
      {
        name: <h6>{t("teacherJourney.Status")}</h6>,
        width: "8rem",
        cell: (params) => [
          params.status === "OPEN" ? (
            <span className="badge bg-secondary">
                            {t("teacherJourney.Open")}
                        </span>
                    ) : params?.status === 'INPROGRESS' ? (
                        <span className="badge bg-info">
                             {t("teacherJourney.Inprogress")}
                        </span>
                    ) : params?.status === 'RESOLVED' ? (
                        <span className="badge bg-success">
                             {t("teacherJourney.Resolved")}
                        </span>
                    ) : params?.status === 'INVALID' ? (
                        <span className="badge bg-light text-dark">
                             {t("teacherJourney.Invalid")}
                        </span>
                    ) : (
                        ''
                    )
        ],
      },
    ],
  };

  const currentUser = getCurrentUser("current_user");
  const dispatch = useDispatch();

  const fileHandler = (e) => {
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
        t('home.condition'),
      );
      return;
    }
    formik1.setFieldValue("file_name", file);
  };

  const formik1 = useFormik({
    initialValues: {
      ticket: "",
      ticketDetails: "",
      file_name: "",
      url: "",
    },

    validationSchema: Yup.object({
      ticket: Yup.string().required(t('teacherJourney.selectCategory')),
      ticketDetails: Yup.string().required(t('teacherJourney.support1')),
      file_name: Yup.mixed(),
      url: Yup.string(),
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
        const body = {
          query_category: values.ticket,
          query_details: values.ticketDetails,
          state: currentUser.data[0].state,
        };
        if (values.file_name !== "") {
          body["file"] = values.file_name;
        }
        if (values.url !== "") {
          body["link"] = values.url;
        }

        dispatch(createSupportTickets(body));
        document.getElementById("discard").click();
        setTimeout(() => {
          dispatch(getSupportTickets(currentUser?.data[0]));
        }, 500);
      } catch (error) {
        console.log(error);
      }
    },
  });
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
        t('home.condition'),
      );
      return;
    }
    formik.setFieldValue("file_name", file);
  };

  const formik = useFormik({
    initialValues: {
      ansTicket: "",
      selectStatusTicket: supportTicket.status,
      file_name: "",
      url: "",
    },

    validationSchema: Yup.object({
      ansTicket: Yup.string().required(t('teacherJourney.support1')),
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

        const bodyForm2 = {
          support_ticket_id: id,
          reply_details: ansTicket,
        };
        if (values.file_name !== "") {
          bodyForm2["file"] = values.file_name;
        }
        if (values.url !== "") {
          bodyForm2["link"] = values.url;
        }

        dispatch(createSupportTicketResponse(bodyForm2));
        dispatch(
          SupportTicketStatusChange(id, { status: values.selectStatusTicket })
        );
        document.getElementById("sendresponseID").click();
        setTimeout(() => {
          dispatch(getSupportTickets(currentUser?.data[0]));
        }, 500);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleChat = (id) => {
    dispatch(getSupportTicketById(id, language));
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4> {t('home.Support')}</h4>
                <h6> {t('teacherJourney.support')}</h6>
              </div>
            </div>
            <div className="page-btn">
              <button
                className="btn btn-primary add-em-payroll"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight-add"
                aria-controls="offcanvasRight-add"
              >
                <PlusCircle className="me-2" />
                {t('teacherJourney.ask')}
              </button>
            </div>
          </div>
          {/* /product list */}
          <div className="card table-list-card">
            <div className="card-body">
              <div className="table-responsive">
                <DataTableExtensions
                  {...SchoolsData}
                  exportHeaders
                  export={false}
                  print={false}
                >
                  <DataTable
                    // data={rows}
                    defaultSortField="id"
                    defaultSortAsc={false}
                    pagination
                    highlightOnHover
                    fixedHeader
                    subHeaderAlign={Alignment.Center}
                  />
                </DataTableExtensions>
              </div>
            </div>
          </div>
          {/* /product list */}
        </div>
      </div>

      {/* Add Ticket start */}
      <div
        className="offcanvas offcanvas-end em-payrol-add"
        tabIndex={-1}
        id="offcanvasRight-add"
      >
        <div className="offcanvas-body p-0">
          <div className="page-wrapper-new">
            <div className="content">
              <div className="page-header justify-content-between">
                <div className="page-title">
                  <h4> {t('teacherJourney.ask')}</h4>
                </div>
                <div className="page-btn">
                  <a
                    href="#"
                    className="btn btn-added"
                    data-bs-dismiss="offcanvas"
                    onClick={() => formik1.resetForm()}
                  >
                    <ArrowLeft className="me-2" />
                    {t('teacherJourney.backlist')}
                  </a>
                </div>
              </div>
              {/* /add */}
              <div className="card">
                <div className="card-body">
                  <form onSubmit={formik1.handleSubmit}>
                    <div className="row">
                      <div className="col-lg-4 col-sm-6 col-12">
                        <div className="mb-3">
                          <label className="form-label">
                          {t('teacherJourney.category')}<span>*</span>
                          </label>
                          <Select
                            name="ticket"
                            id="ticket"
                            classNamePrefix="react-select"
                            options={ticketOptions}
                            onChange={(option) =>
                              formik1.setFieldValue("ticket", option.value)
                            }
                            onBlur={formik1.handleBlur}
                            value={ticketOptions.find(
                              (option) => option.value === formik1.values.ticket
                            )}
                           placeholder={t("teacherJourney.selectCategory")} 
                          />
                          {formik1.errors.ticket ? (
                            <small className="error-cls text-danger">
                              {formik1.errors.ticket}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                        {t('teacherJourney.Description')} <span>*</span>
                        </label>
                        <textarea
                          className="text-form form-control"
                          placeholder={t("teacherJourney.support1")} 
                          id="ticketDetails"
                          name="ticketDetails"
                          rows={4}
                          onChange={formik1.handleChange}
                          onBlur={formik1.handleBlur}
                          value={formik1.values.ticketDetails}
                        />
                        {formik1.touched.ticketDetails &&
                        formik1.errors.ticketDetails ? (
                          <small className="error-cls text-danger">
                            {formik1.errors.ticketDetails}
                          </small>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="mb-2" htmlFor="url">
                        {t('teacherJourney.link')} 
                        </Label>
                        <Input
                          type="text"
                          name="url"
                          id="url"
                          placeholder={t("teacherJourney.support2")} 

                          onChange={formik1.handleChange}
                          onBlur={formik1.handleBlur}
                          value={formik1.values.url}
                        />
                        {formik1.touched.url && formik1.errors.url && (
                          <small className="error-cls">
                            {formik1.errors.url}
                          </small>
                        )}
                      </div>
                      <div className="mb-3">
                        <Label className="mb-2" htmlFor="file_name">
                        {t('teacherJourney.file')} 
                        </Label>
                        <div className="d-flex align-items-center">
                          <input
                            type="file"
                            id="file_name"
                            name="file_name"
                            style={{
                              display: "none",
                            }}
                            accept="image/jpeg,image/png,application/msword,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            onChange={(e) => fileHandler(e)}
                            onBlur={formik1.handleBlur}
                          />
                          <button
                            className="btn btn-primary add-em-payroll"
                            type="button"
                            onClick={() => {
                              document.getElementById("file_name").click();
                            }}
                          >
                            {t('student.upload_file')} 
                          </button>
                          {formik1.values.file_name ? (
                            <span className="ml-2">
                              {formik1.values.file_name.name}
                            </span>
                          ) : (
                            <span className="ml-2">
                              {formik1.initialValues.file_name}
                            </span>
                          )}
                        </div>
                        {formik1.touched.file_name &&
                          formik1.errors.file_name && (
                            <small className="error-cls">
                              {formik1.errors.file_name}
                            </small>
                          )}
                      </div>
                      <div className="col-lg-12">
                        <div className="view-btn">
                          <button
                            id="discard"
                            type="button"
                            className="btn btn-reset me-2"
                            data-bs-dismiss="offcanvas"
                            onClick={() => formik1.resetForm()}
                          >
                             {t('teacherJourney.discard')} 
                          </button>
                          <button type="submit" className="btn btn-save">
                          {t('teacherJourney.create')} 
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              {/* /add */}
            </div>
          </div>
        </div>
      </div>
      {/* /Add Ticket end */}

      {/* Chat start */}
      <div
        className="offcanvas offcanvas-end em-payrol-add"
        tabIndex={-1}
        id="offcanvasRight"
      >
        <div className="offcanvas-body p-0">
          <div className="page-wrapper-new">
            <div className="content">
              <div className="page-header justify-content-between">
                <div className="page-title">
                  <h4> {t('teacherJourney.chat')} </h4>
                </div>
                <div className="page-btn">
                  <a
                    href="#"
                    className="btn btn-added"
                    data-bs-dismiss="offcanvas"
                    onClick={() => formik.resetForm()}
                  >
                    <ArrowLeft className="me-2" />
                    {t('teacherJourney.backlist')} 
                  </a>
                </div>
              </div>
              {/* /add */}

              <form onSubmit={formik.handleSubmit}>
                <Card className="aside ">
                  <div
                    style={{
                      borderStyle: "solid",
                      borderWidth: "thin",
                      borderColor: "aqua",
                      borderRadius: "1rem",
                      padding: "1.5rem 1rem",
                      marginBottom: "2rem",
                    }}
                  >
                    <Row>
                      <Col md={12}>
                            <div
                              className="saved-text"
                              style={{ whiteSpace: "pre-wrap", marginTop: "1rem" }}
                            >
                              {supportTicket.query_details}
                            </div>
                        
                        <hr />

                        
                      </Col>

                      <Col md={3}>
                        <span>
                          <FaUserCircle /> {supportTicket.created_by}
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
                            // 'Do MMM, YYYY HH:mm',
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
                            marginBottom: "2rem",
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
                              {/* <strong>{data.reply_details}</strong> */}
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
                                  // 'Do MMM, YYYY HH:mm',
                                  "LLL"
                                )}
                              </span>
                            </Col>
                          </Row>
                        </div>
                      );
                    })}

                  {supportTicket.status != "INVALID" &&
                  supportTicket.status != "RESOLVED" ? (
                    <Row className="p-2">
                      <Col md={12}>
                        <div>
                          <label className="form-label">
                          {t('teacherJourney.description')}  <span>*</span>
                          </label>
                          <textarea
                            className="text-form form-control"
                           placeholder={t("teacherJourney.support1")} 

                            id="ansTicket"
                            name="ansTicket"
                            rows={4}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.ansTicket}
                          />
                          {formik.touched.ansTicket &&
                          formik.errors.ansTicket ? (
                            <small className="error-cls text-danger">
                              {formik.errors.ansTicket}
                            </small>
                          ) : null}
                        </div>
                        <div className="mb-3">
                          <Label className="mb-2" htmlFor="url">
                          {t('teacherJourney.link')} 
                          </Label>
                          <Input
                            type="text"
                            name="url"
                            id="url"
                           placeholder={t("teacherJourney.support2")} 

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
                          {t('teacherJourney.file')} 
                          </Label>
                          <div className="d-flex align-items-center">
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
                               {t('student.upload_file')}
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
                          <Label className="mb-2"> {t('teacherJourney.select')} </Label>
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
                              value={formik.values.selectStatusTicket}
                            >
                              <option value="" disabled={true}>
                                {/* {supportTicket && supportTicket.status
                                  ? supportTicket.status
                                  : t("teacherJourney.selectStatus")} */}
                                  {supportTicket && supportTicket.status
  ? t(`teacherJourney.${supportTicket.status.toLowerCase()}`)
  : t("teacherJourney.selectStatus")}

                              </option>
                              <option value="OPEN">{t("teacherJourney.open")}</option>
<option value="INPROGRESS">{t("teacherJourney.inProgress")}</option>
<option value="RESOLVED">{t("teacherJourney.resolved")}</option>
<option value="INVALID">{t("teacherJourney.invalid")}</option>

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
                      {t('teacherJourney.close')}
                    </UncontrolledAlert>
                  )}
                </Card>

                <hr className="mt-4 mb-4"></hr>
                <div>
                  <Row>
                    {supportTicket.status != "INVALID" &&
                    supportTicket.status != "RESOLVED" ? (
                      <div className="col-lg-12">
                        <div className="view-btn">
                          <button
                            type="button"
                            id="sendresponseID"
                            className="btn btn-reset me-2"
                            data-bs-dismiss="offcanvas"
                            onClick={() => formik.resetForm()}
                          >
                             {t('teacherJourney.discard')}
                          </button>
                          <button type="submit" className="btn btn-save">
                          {t('teacherJourney.send')}
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </Row>
                </div>
              </form>
              {/* /add */}
            </div>
          </div>
        </div>
      </div>
      {/* Chat end */}
    </>
  );
};

export default TeacherSupport;
