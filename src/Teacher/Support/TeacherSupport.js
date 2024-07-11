/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { useState,useEffect } from "react";
import { Row, Col, Label, Card, CardBody , Input} from 'reactstrap';
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeft,
  PlusCircle,
} from "react-feather";
import axios from 'axios';
import Select from "react-select";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { getCurrentUser , openNotificationWithIcon  } from '../../helpers/Utils';
import { createSupportTickets } from '../store/mentors/actions';
import { getSupportTickets } from '../../redux/actions';
import { FaComments } from 'react-icons/fa';
import DataTableExtensions from 'react-data-table-component-extensions';
import DataTable, { Alignment } from 'react-data-table-component';
import {
  createSupportTicketResponse,
  getSupportTicketById,
  SupportTicketStatusChange
} from '../store/mentors/actions';
import { FaUserCircle } from 'react-icons/fa';
import { FaRegClock } from 'react-icons/fa';
import moment from 'moment';
import { useTranslation } from 'react-i18next';







const TeacherSupport = () => {
    const { supportTickets } = useSelector((state) => state.mentors);
    const { supportTicket } = useSelector((state) => state.mentors);
    const language = useSelector((state) => state?.mentors.mentorLanguage);
    const { t } = useTranslation();
    //const [id, setId] = useState();
    useEffect(() => {
        dispatch(getSupportTickets(currentUser?.data[0]));
    }, []);
  
  const ticketOptions = [
    { value: "", label: "Select Category" , display: true},
    { value: "General", label: "General query" },
    { value: "Technical", label: "Technical query" },
    { value: "Suggestion", label: "Suggestion" },
  ];

//     {
//       title: "Action",
//       render: () => (
//         <div className="edit-delete-action data-view action-table-data">         
//             <a
//                 className="me-2"
//                 href="#"
//                 data-bs-toggle="offcanvas"
//                 data-bs-target="#offcanvasRight"
//             >
//                 <Edit className="action-edit" />
//             </a>
//         </div>
//       ),
//     },
//   ];

//////////////////My Code////////////////////
    const SchoolsData = {
        data: supportTickets,
        columns: [
            {
                name: 'No',
                selector: (row) => row.id,
                // width: '13rem'
            },
            {
                name: ' Query Category',
                selector: (row) => row.query_category,
                sortable: true,
                //width: '25rem'
            },
            {
                name: 'Query Details',
                selector: (row) => row.query_details,
                sortable: true,
                //width: '42rem',

                cell: (params) => [
                    <p 
                      key={params.support_ticket_id}
                    >
                        {params?.query_details} 
                    </p>
                ]
            },
            

            // {
            //     name: 'File',
            //     selector: (row) => row.file,
            //     width: '25rem'
            // },
            // {
            //     name: ' Link',
            //     selector: (row) => row.link,
            //     width: '25rem'
            // },
            {
              name : "Chat",
              cell: (params) => {
                return [
                  <a
                    href="#"
                    key={params.support_ticket_id}
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight"
                    onClick={() =>
                      handleChat(params.support_ticket_id)
                    }
                  >
                    <FaComments/>{' '}{params.replies_count}{' '}
                    
                  </a>
                ];
              }
                
                
                      // <div key={params.support_ticket_id}>         
                    
                      //   <FaComments className="action-edit" 
                      //   // data-bs-toggle="offcanvas"
                      //   // data-bs-target="#offcanvasRight"
                      //   onClick={handleChat(params.support_ticket_id)} />{' '}{params.replies_count}{' '}
                    
                      // </div>
              
              
            },
            {
                name: 'Status',
                cell: (params) => [
                    params.status === 'OPEN' ? (
                        <span className="py-2 px-4 rounded-pill bg-danger bg-opacity-25 text-danger fw-bold">
                            Open
                        </span>
                    ) : params.status === 'INPROGRESS' ? (
                        <span className="py-2 px-4 rounded-pill bg-info bg-opacity-25 text-info fw-bold">
                            Inprogress
                        </span>
                    ) : params.status === 'RESOLVED' ? (
                        <span className="bg-success bg-opacity-25 px-4 py-2 rounded-pill text-success fw-bold">
                            Resolved
                        </span>
                    ) : params.status === 'INVALID' ? (
                        <span className="bg-warning bg-opacity-25 px-4 py-2 rounded-pill text-warning fw-bold">
                            Invalid
                        </span>
                    ) : (
                        ''
                    )
                ]
            },
            
            
        ]
    };

    const currentUser = getCurrentUser('current_user');
    const dispatch = useDispatch();

    const formik1 = useFormik({
        initialValues: {
            ticket: '',
            ticketDetails: '',
            file_name: "",
            url : ''
        },

        validationSchema: Yup.object({
            ticket: Yup.string().required('Required'),
            ticketDetails: Yup.string().required('Required'),
            file_name: Yup.mixed(),
            url: Yup.string(),
        }),

        onSubmit: async (values) => {
            try {
                if (values.file_name !== '') {
                    const fileData = new FormData();
                    fileData.append('file', values.file_name);

                    const response = await axios.post(
                        `${process.env.REACT_APP_API_BASE_URL}/supportTicketFileUpload`,
                        fileData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                Authorization: `Bearer ${currentUser?.data[0]?.token}`
                            }
                        }
                    );
                    values.file_name =
                        response?.data?.data[0].attachments[0].toString();
                }
                const body = {
                    query_category: values.ticket,
                    query_details: values.ticketDetails,
                    state: currentUser.data[0].state
                };
                if (values.file_name !== '') {
                    body['file'] = values.file_name;
                }
                if (values.url !== '') {
                    body['link'] = values.url;
                }

                dispatch(createSupportTickets(body));
                dispatch(getSupportTickets(currentUser?.data[0]));
            } catch (error) {
                console.log(error);
            }
        }
    });

    const fileHandler = (e) => {
        let file = e.target.files[0];

        if (!file) {
            return;
        }

        let pattern = /^[a-zA-Z0-9_-\s]{0,}$/;
        const fileName = file.name.split('.').slice(0, -1).join('.');
        const isValidFileName = pattern.test(fileName);

        const maxFileSize = 10000000;
        const isOverMaxSize = file.size > maxFileSize;

        const allowedTypes = ['image/jpeg', 'image/png','application/msword','application/pdf','application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if(!allowedTypes.includes(file.type)){
            openNotificationWithIcon('error', t('Accepting only png,jpg,jpeg,pdf,doc,docx Only'));
            return;
        }

        if (isOverMaxSize) {
            openNotificationWithIcon('error', t('student.less_10MB'));
            return;
        }

        if (!isValidFileName) {
            openNotificationWithIcon(
                'error',
                "Only alphanumeric and '_' are allowed"
            );
            return;
        }

        formik.setFieldValue('file_name', file);
    };

    const handleDiscard = () => {
        formik1.setFieldValue('ticket', "");
        formik1.setFieldValue('ticketDetails', "");
        formik1.setFieldValue('file_name', "");
        formik1.setFieldValue('url', "");
    };

    const handleDiscard2 = () => {
      formik.setFieldValue('ansTicket', "");
      formik.setFieldValue('selectStatusTicket', supportTicket.status);
    };

    const formik = useFormik({
      initialValues: {
          ansTicket: '',
          selectStatusTicket: supportTicket.status
      },

      validationSchema: Yup.object({
          ansTicket: Yup.string().required('Required'),
          selectStatusTicket: Yup.string()
          
      }),

      onSubmit: (values) => {
        
          const ansTicket = values.ansTicket;
          const id = supportTicket.support_ticket_id;
          
          const body = JSON.stringify({
              support_ticket_id: id,
              // status: values.selectStatus,
              reply_details: ansTicket
          });
          console.log(body,id);

          dispatch(createSupportTicketResponse(body));
          dispatch(SupportTicketStatusChange(id, {status: values.selectStatusTicket})
          );
          //props.history.push('/teacher/support-journey/');

          setTimeout(() => {
              dispatch(getSupportTicketById(id, language));
          }, 500);
          
          dispatch(getSupportTickets(currentUser?.data[0]));
      }
  });

  const handleChat = (id) =>{
    //console.log(id , "hi");
    dispatch(getSupportTicketById(id, language));
  };


    


  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Support</h4>
                <h6>Raise your queries here and get it answered by program administrator</h6>
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
                Ask Your Query
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
                  <h4>Ask Your Query</h4>
                </div>
                <div className="page-btn">
                  <a
                    href="#"
                    className="btn btn-added"
                    data-bs-dismiss="offcanvas"
                  >
                    <ArrowLeft className="me-2" />
                    Back To List
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
                                    Select Query Category <span>*</span>
                                </label>
                                <Select
                                    name="ticket"
                                    id="ticket"
                                    classNamePrefix="react-select"
                                    options={ticketOptions}
                                    onChange={(option) => formik1.setFieldValue('ticket', option.value)}
                                    onBlur={formik1.handleBlur}
                                    value={ticketOptions.find(option => option.value === formik1.values.ticket)}
                                    placeholder="Select Category"
                                />
                                {formik1.errors.ticket ? (
                                    <small className="error-cls">
                                        {formik1.errors.ticket}
                                    </small>
                                ) : null}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                            Description <span>*</span>
                            </label>
                            <textarea 
                                className="text-form form-control" 
                                placeholder="Enter Details"
                                id="ticketDetails"
                                name="ticketDetails"
                                rows={4}
                                onChange={formik1.handleChange}
                                onBlur={formik1.handleBlur}
                                value={formik1.values.ticketDetails}
                            />
                            {formik1.touched.ticketDetails &&
                                formik1.errors.ticketDetails ? (
                                    <small className="error-cls">
                                        {
                                            formik1.errors
                                                .ticketDetails
                                        }
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
                                onChange={formik1.handleChange}
                                onBlur={formik1.handleBlur}
                                value={formik1.values.url}
                            />
                            {formik1.touched.url &&
                                formik1.errors.url && (
                                    <small className="error-cls">
                                        {formik1.errors.url}
                                    </small>
                                )}
                        </div>
                        <div className="mb-3">
                            <Label
                                className="mb-2"
                                htmlFor="file_name"
                            >
                                File
                            </Label>
                            <div className="d-flex align-items-center">
                                <input
                                    type="file"
                                    id="file_name"
                                    name="file_name"
                                    style={{
                                        display: 'none'
                                    }}
                                    accept="image/jpeg,image/png,application/msword,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                    onChange={(e) => fileHandler(e)}
                                    onBlur={formik1.handleBlur}
                                />
                                <button
                                    className="btn btn-primary add-em-payroll"
                                    type="button"
                                    onClick={() => {
                                        document
                                            .getElementById(
                                                'file_name'
                                            )
                                            .click();
                                    }}
                                >Upload File</button>
                                {formik1.values.file_name ? (
                                    <span className="ml-2">
                                        {
                                            formik1.values.file_name
                                                .name
                                        }
                                    </span>
                                ) : (
                                    <span className="ml-2">
                                        {formik1.initialValues
                                            .file_name }
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
                            <button type="button" className="btn btn-reset me-2" data-bs-dismiss="offcanvas" onClick={handleDiscard} >
                                Discard
                            </button>
                            <button type="submit" className="btn btn-save" data-bs-dismiss="offcanvas">
                                Create Ticket
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
                  <h4>Chat Support</h4>
                </div>
                <div className="page-btn">
                  <a
                    href="#"
                    className="btn btn-added"
                    data-bs-dismiss="offcanvas"
                  >
                    <ArrowLeft className="me-2" />
                    Back To List
                  </a>
                </div>
              </div>
              {/* /add */}
              <div className="card">
                <div className="card-body">
                  <form onSubmit={formik.handleSubmit}>
                    <Card className="aside p-4 py-5">
                      <Card className="card mb-4 my-3 comment-card px-0 card-outline-warning">
                          <CardBody>
                              <p>
                                  <b>
                                      {
                                          supportTicket.query_details
                                      }
                                  </b>
                              </p>
                              <hr />
                              <Row>
                                  <Col md={6}>
                                      <span>
                                          <FaUserCircle />{' '}
                                          {
                                              supportTicket.created_by
                                          }
                                      </span>{' '}
                                  </Col>
                                  <Col
                                      md={6}
                                      className="text-right"
                                  >
                                      <span>
                                          <FaRegClock />{' '}
                                          {moment(
                                              supportTicket.created_at
                                          ).format(
                                              // 'Do MMM, YYYY HH:mm',
                                              'LLL'
                                          )}
                                      </span>
                                  </Col>
                              </Row>
                          </CardBody>
                      </Card>

                      {supportTicket?.support_ticket_replies
                          ?.length > 0 &&
                          supportTicket.support_ticket_replies.map(
                              (data, i) => {
                                  return (
                                      <>
                                          <Card className="card mb-4 my-3 comment-card card-outline-success">
                                              <CardBody>
                                                  <p>
                                                      {
                                                          data.reply_details
                                                      }
                                                  </p>
                                                  <hr />
                                                  <Row>
                                                      <Col md={6}>
                                                          <span>
                                                              <FaUserCircle />{' '}
                                                              {
                                                                  data.created_by
                                                              }
                                                          </span>{' '}
                                                      </Col>
                                                      <Col
                                                          md={6}
                                                          className="text-right"
                                                      >
                                                          <span>
                                                              <FaRegClock />{' '}
                                                              {moment(
                                                                  data.created_at
                                                              ).format(
                                                                  // 'Do MMM, YYYY HH:mm',
                                                                  'LLL'
                                                              )}
                                                          </span>
                                                      </Col>
                                                  </Row>
                                              </CardBody>
                                          </Card>
                                      </>
                                  );
                              }
                          )}

                      {supportTicket.status != 'INVALID' ? (
                          <Row>
                              <Col md={12}>
                                <div className="mb-3">
                                    <label className="form-label">
                                    Description <span>*</span>
                                    </label>
                                    <textarea 
                                        className="text-form form-control" 
                                        placeholder="Enter Details"
                                        id="ansTicket"
                                        name="ansTicket"
                                        rows={4}
                                        onChange={
                                            formik.handleChange
                                        }
                                        onBlur={formik.handleBlur}
                                        value={
                                            formik.values.ansTicket
                                        }
                                    />
                                    {formik.touched.ansTicket &&
                                  formik.errors.ansTicket ? (
                                      <small className="error-cls">
                                          {
                                              formik.errors
                                                  .ansTicket
                                          }
                                      </small>
                                  ) : null}
                                </div>
                              </Col>

                              <Col
                                  className="form-group my-5  mb-md-0"
                                  md={12}
                              >
                                  <Label className="mb-2">
                                      Select Status
                                      {/* <span
                                          required
                                          className="p-1"
                                      >
                                          *
                                      </span> */}
                                  </Label>

                                  <Col
                                      className="form-group"
                                      md={12}
                                  >
                                      <select
                                          name=" selectStatusTicket"
                                          id=" selectStatusTicket"
                                          className="form-control custom-dropdown"
                                          onChange={(e) => {
                                              formik.setFieldValue(
                                                  'selectStatusTicket',
                                                  e.target.value
                                              );
                                          }}
                                        
                                          onBlur={
                                              formik.handleBlur
                                          }
                                          value={
                                              formik.values
                                                  .selectStatusTicket
                                          }
                                      >
                                          <option
                                              value=""
                                              disabled={true}
                                          >
                                              {supportTicket &&
                                              supportTicket.status
                                                  ? supportTicket.status
                                                  : 'Select Status'}
                                          </option>
                                          <option value="OPEN">
                                              OPEN
                                          </option>
                                          <option value="INPROGRESS">
                                              INPROGRESS
                                          </option>
                                          <option value="RESOLVED">
                                              RESOLVED
                                          </option>
                                          <option value="INVALID">
                                              INVALID
                                          </option>
                                      </select>
                                      {formik.touched
                                          .selectStatusTicket &&
                                          formik.errors
                                              .selectStatusTicket && (
                                              <small className="error-cls">
                                                  {
                                                      formik
                                                          .errors
                                                          .selectStatusTicket
                                                  }
                                              </small>
                                          )}
                                  </Col>

                                  <Col
                                      className="form-group mt-5  mb-md-0"
                                      md={12}
                                  ></Col>
                              </Col>
                          </Row>
                      ) : null}
                    </Card>

                    <hr className="mt-4 mb-4"></hr>
                    <div>
                        <Row>
                            {supportTicket.status != 'INVALID' ? (
                                <div className="col-lg-12">
                                    <div className="view-btn">
                                      <button type="button" className="btn btn-reset me-2" data-bs-dismiss="offcanvas" onClick={handleDiscard2} >
                                          Discard
                                      </button>
                                      <button type="submit" className="btn btn-save" data-bs-dismiss="offcanvas">
                                          Send Response
                                      </button>
                                    </div>
                                </div>
                            ) : null}
                        </Row>
                    </div>
                  </form>
                </div>
              </div>
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