/* eslint-disable indent */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Row, Col, Form, Label, Card, CardBody , Button } from 'reactstrap';
//import { withRouter } from 'react-router-dom';
//import './style.scss';
//import Layout from '../Layout';
//import { Button } from '../../stories/Button';
// import { DropDownWithSearch } from '../../stories/DropdownWithSearch/DropdownWithSearch';
// import { TextArea } from '../../stories/TextArea/TextArea';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import {
    createSupportTicketResponse,
    getSupportTicketById,
    SupportTicketStatusChange
} from '../store/mentors/actions';
import { useLocation } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { FaRegClock } from 'react-icons/fa';
import moment from 'moment';
import { useLayoutEffect } from 'react';
import { ArrowLeft } from "react-feather";

const TicketResponse = (props) => {
    const { search } = useLocation();
    const id = new URLSearchParams(search).get('id');
    const { supportTicket } = useSelector((state) => state.mentors);
    const language = useSelector((state) => state?.mentors.mentorLanguage);

    const dispatch = useDispatch();
    //const history = useHistory();

    useLayoutEffect(() => {
        //dispatch(getSupportTicketById(id, language));
        // here id = support_ticket_id //
    }, [dispatch, id]);

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
            const body = JSON.stringify({
                support_ticket_id: id,
                // status: values.selectStatus,
                reply_details: ansTicket
            });

            dispatch(createSupportTicketResponse(body));
            dispatch(
                SupportTicketStatusChange(id, {
                    status: values.selectStatusTicket
                })
            );
            props.history.push('/teacher/support-journey/');

            setTimeout(() => {
                dispatch(getSupportTicketById(id, language));
            }, 500);
        }
    });

    return (
        <div className="offcanvas offcanvas-end em-payrol-add" tabIndex={-1} id="offcanvasRight">
            <div className="offcanvas-body p-0">
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
                        <Form onSubmit={formik.handleSubmit} isSubmitting>
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
                                            <textarea
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
                                                </span> */}
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
                                                /> */}
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
                            </Card>

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
                        </Form>


                    </div>
                </div>
            </div>      
        </div>

    );
};

export default TicketResponse;