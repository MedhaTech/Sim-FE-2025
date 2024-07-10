/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
// import { OverlayTrigger, Tooltip } from "react-bootstrap";
// import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { Link } from "react-router-dom";
//import { setToogleHeader } from "../../core/redux/action";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeft,
  PlusCircle,
} from "react-feather";
//import { payrollListData } from "../../core/json/payrollList";
//import Table from "../../core/pagination/datatable";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Select from "react-select";
import * as Yup from 'yup';
import { useFormik } from 'formik';
//import { useHistory } from 'react-router-dom';
import { getCurrentUser } from '../../helpers/Utils';
import { createSupportTickets } from '../store/mentors/actions';
import { getSupportTickets } from '../../redux/actions';
import { FaComments } from 'react-icons/fa';
import TicketResponse from "../Support/TicketResponse";
import DataTableExtensions from 'react-data-table-component-extensions';
import DataTable, { Alignment } from 'react-data-table-component';





const TeacherSupport = () => {
    //const [rows, setRows] = React.useState([]);
    const { supportTickets } = useSelector((state) => state.mentors);

    //const history = useHistory();
    useEffect(() => {
        dispatch(getSupportTickets(currentUser?.data[0]));
    }, []);

    console.log(supportTickets);
  
  const ticketOptions = [
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
                    <Link
                        key={params.support_ticket_id}
                        to={`/teacher/support-journey/ans-ticket?id=${params.support_ticket_id}`}
                    >
                        {params?.query_details} <FaComments />{' '}
                        {params.replies_count}{' '}
                    </Link>
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
                name: 'Status',
                //width: '20rem',
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
            }
        ]
    };

    const currentUser = getCurrentUser('current_user');
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            ticket: '',
            ticketDetails: '',
            files: null,
            links : ''
        },

        validationSchema: Yup.object({
            ticket: Yup.string().required('Required'),
            ticketDetails: Yup.string().required('Required')
        }),

        onSubmit: (values) => {
            const query_category = values.ticket;
            const query_details = values.ticketDetails;
            // const file = values.files;
            // const link = values.links;

            const body = JSON.stringify({
                query_category: query_category,
                query_details: query_details,
                // file : file,
                // link : link,
                state: currentUser.data[0].state
            });

            dispatch(createSupportTickets(body, history));
        }
    });

    const handleDiscard = () => {
        formik.setFieldValue('ticket', "");
        formik.setFieldValue('ticketDetails', "");
        formik.setFieldValue('files', null);
        formik.setFieldValue('links', "");
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
                    {/* <Table striped bordered hover>
                        <thead>
                            <tr>
                                {SchoolsData.columns.map((column) => (
                                    <th key={column.selector}>
                                        {column.name}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row) => (
                                <tr key={row.id}>
                                    {SchoolsData.columns.map((column) => (
                                        <td key={column.selector}>
                                            {row[column.selector]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </Table> */}
                    {/* <Table columns={SchoolsData.columns} dataSource={rows} defaultSortField="id" defaultSortAsc={false} pagination/> */}
                </div>
            </div>
          </div>
          {/* /product list */}
        </div>
      </div>
      {/* Add Payroll */}
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
                  <form onSubmit={formik.handleSubmit}>
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
                                    onChange={(option) => formik.setFieldValue('ticket', option.value)}
                                    onBlur={formik.handleBlur}
                                    value={ticketOptions.find(option => option.value === formik.values.ticket)}
                                    placeholder="Select Category"
                                />
                                {formik.errors.ticket ? (
                                    <small className="error-cls">
                                        {formik.errors.ticket}
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
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.ticketDetails}
                            />
                            {formik.touched.ticketDetails &&
                                formik.errors.ticketDetails ? (
                                    <small className="error-cls">
                                        {
                                            formik.errors
                                                .ticketDetails
                                        }
                                    </small>
                                ) : null}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                            Link 
                            </label>
                            <input
                                type="text"
                                name="links"
                                id="links"
                                className="form-control"
                                placeholder="Attach links"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.links}
                            />
                            {formik.errors.links ? (
                                <small className="error-cls">
                                    {formik.errors.links}
                                </small>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                            Upload Query Screenshots
                            </label>
                            <input
                                type="file"
                                name="files"
                                id="files"
                                className="form-control"
                                onChange={(event) => formik.setFieldValue('files', event.currentTarget.files[0])}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.files ? (
                                <small className="error-cls">
                                    {formik.errors.files}
                                </small>
                            ) : null}
                        </div>
                        <div className="col-lg-12">
                            <div className="view-btn">
                            <button type="button" className="btn btn-reset me-2" data-bs-dismiss="offcanvas" onClick={handleDiscard} >
                                Discard
                            </button>
                            <button type="submit" className="btn btn-save">
                                Submit
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
      {/* /Add Payroll */}
      {/* Edit Payroll */}
      <div
        className="offcanvas offcanvas-end em-payrol-add"
        tabIndex={-1}
        id="offcanvasRight">
        {/*<div className="offcanvas-body p-0">
          <div className="page-wrapper-new">
            <div className="content">
              <div className="page-header justify-content-between">
                <div className="page-title">
                  <h4>Support Chat</h4>
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
              {/* /add
              <div className="card">
                <div className="card-body">
                  <form onSubmit={formik.handleSubmit}>
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
                    {supportTicket?.support_ticket_replies?.length > 0 && supportTicket.support_ticket_replies.map(
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
                            <Label
                                className="name-req mt-5"
                                htmlFor="ticketDetails"
                            >
                                Details
                                <span
                                    required
                                    className="p-1"
                                >
                                    *
                                </span>
                            </Label>
                            <TextArea
                                className={'defaultInput'}
                                placeholder="Enter reply comments"
                                id="ansTicket"
                                name="ansTicket"
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
                                </span> 
                            </Label>

                            <Col
                                className="form-group"
                                md={12}
                            >
                                {/* <DropDownWithSearch
                                    {...selectProgress}
                                    onBlur={
                                        formik.handleBlur
                                    }
                                    onChange={(option) => {
                                        formik.setFieldValue(
                                            'selectStatus',
                                            option[0].value
                                        );
                                    }}
                                    name="selectStatus"
                                    id="selectStatus"
                                /> 
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
                                    // onChange={(option) => {
                                    //     formik.setFieldValue(
                                    //         'selectStatus',
                                    //         option[0].value
                                    //     );
                                    // }}
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
                <hr className="mt-4 mb-4"></hr>
                <div>
                    <Row>
                        {supportTicket.status != 'INVALID' ? (
                            <Col className="col-xs-12 col-sm-6">
                                <Button
                                    label="Discard"
                                    btnClass="secondary"
                                    size="small"
                                    onClick={() =>
                                        props.history.push(
                                            '/teacher/support-journey'
                                        )
                                    }
                                />
                            </Col>
                        ) : (
                            <Col className="col-xs-12 col-sm-6">
                                <Button
                                    label="Back"
                                    btnClass="secondary"
                                    size="small"
                                    onClick={() =>
                                        props.history.push(
                                            '/teacher/support-journey'
                                        )
                                    }
                                />
                            </Col>
                        )}

                        {supportTicket.status != 'INVALID' ? (
                            <Col className="submit-btn col-xs-12 col-sm-6">
                                <Button
                                    label="Submit"
                                    type="submit"
                                    btnClass={
                                        !(
                                            formik.dirty &&
                                            formik.isValid
                                        )
                                            ? 'default'
                                            : 'primary'
                                    }
                                    size="small"
                                    disabled={
                                        !(
                                            formik.dirty &&
                                            formik.isValid
                                        )
                                    }
                                />
                            </Col>
                        ) : null}
                    </Row>
                </div>
            
                    {/* <div className="row">
                      <div className="col-lg-3 col-sm-6 col-12">
                        <div className="mb-3">
                          <label className="form-label">
                            Select Employee <span>*</span>
                          </label>
                          <Select
                            classNamePrefix="react-select"
                            options={options5}
                            placeholder="Herald james"
                          />
                        </div>
                      </div>
                      <div className="text-title">
                        <p>Salary Information</p>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          Basic Salary <span>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue="$32,000"
                        />
                      </div>
                      <div className="payroll-info d-flex">
                        <p>Status</p>
                        <div className="status-updates">
                          <ul
                            className="nav nav-pills list mb-3"
                            id="pills-tab2"
                            role="tablist"
                          >
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link active"
                                id="pills-home-tab2"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-home"
                                type="button"
                                role="tab"
                              >
                                <span className="form-check form-check-inline ">
                                  <span className="form-check-label">Paid</span>
                                </span>
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link"
                                id="pills-profile-tab2"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-profile"
                                type="button"
                                role="tab"
                              >
                                <span className="form-check form-check-inline">
                                  <span className="form-check-label">
                                    Unpaid
                                  </span>
                                </span>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="payroll-title">
                        <p>Allowances</p>
                      </div>
                      <div className="col-lg-3 col-sm-6 col-12">
                        <div className="mb-3">
                          <label className="form-label">
                            HRA Allowance <span>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="hra-allowances-one"
                            defaultValue={0.0}
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6 col-12">
                        <div className="mb-3">
                          <label className="form-label">
                            Conveyance <span>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="conveyance-two"
                            defaultValue={0.0}
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6 col-12">
                        <div className="mb-3">
                          <label className="form-label">
                            Medical Allowance <span>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="medical-allowance-three"
                            defaultValue={0.0}
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6 col-12">
                        <div className="mb-3">
                          <label className="form-label">
                            Bonus <span>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="bonus-allowances-four"
                            defaultValue={0.0}
                          />
                        </div>
                      </div>
                      <div className="sub-form">
                        <div className="mb-3 flex-grow-1">
                          <label className="form-label">Others</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue={0.0}
                          />
                        </div>
                        <div className="subadd-btn">
                          <a href="#" className="btn btn-add">
                            <PlusCircle />
                          </a>
                        </div>
                      </div>
                      <div className="payroll-title">
                        <p>Deductions</p>
                      </div>
                      <div className="col-lg-3 col-sm-6 col-12">
                        <div className="mb-3">
                          <label className="form-label">
                            PF <span>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="pf-allowances-five"
                            defaultValue={0.0}
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6 col-12">
                        <div className="mb-3">
                          <label className="form-label">
                            Professional Tax <span>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="professional-allowances-six"
                            defaultValue={0.0}
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6 col-12">
                        <div className="mb-3">
                          <label className="form-label">
                            TDS <span>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="tds-allowances-seven"
                            defaultValue={0.0}
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6 col-12">
                        <div className="mb-3">
                          <label className="form-label">
                            Loans &amp; Others <span>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="other-allowances-eight"
                            defaultValue={0.0}
                          />
                        </div>
                      </div>
                      <div className="sub-form">
                        <div className="mb-3 flex-grow-1">
                          <label className="form-label">Others</label>
                          <input
                            type="text"
                            className="text-form form-control"
                            defaultValue={0.0}
                          />
                        </div>
                        <div className="subadd-btn">
                          <a href="#" className="btn btn-add">
                            <PlusCircle />
                          </a>
                        </div>
                      </div>
                      <div className="payroll-title">
                        <p>Deductions</p>
                      </div>
                      <div className="col-lg-4 col-sm-6 col-12">
                        <div className="mb-3">
                          <label className="form-label">
                            Total Allowance <span>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="total-allowances-nine"
                            defaultValue={0.0}
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-sm-6 col-12">
                        <div className="mb-3">
                          <label className="form-label">
                            Total Deduction <span>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="deductio-allowances-ten"
                            defaultValue={0.0}
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-sm-6 col-12">
                        <div className="mb-3">
                          <label className="form-label">
                            Net Salary <span>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="salary-allowances-leven"
                            defaultValue="$32.000"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="view-btn">
                          <button type="button" className="btn btn-previw me-2">
                            Preview
                          </button>
                          <button type="submit" className="btn btn-reset me-2">
                            Reset
                          </button>
                          <button type="submit" className="btn btn-save">
                            Save
                          </button>
                        </div>
                      </div>
                    </div> 
                  </form>
                </div>
              </div>
              {/* /add */}
      
      <TicketResponse/>
      </div>
      {/* Edit Payroll */}
    </>
  );
};


export default TeacherSupport;