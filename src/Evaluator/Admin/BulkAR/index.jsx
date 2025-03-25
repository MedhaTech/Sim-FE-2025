/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Label, Input } from 'reactstrap';
import DataTableExtensions from 'react-data-table-component-extensions';
import DataTable, { Alignment } from 'react-data-table-component';
import { getCurrentUser, openNotificationWithIcon } from '../../../helpers/Utils';
import axios from 'axios';
import { encryptGlobal } from '../../../constants/encryptDecrypt.js';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Modal } from 'react-bootstrap';
import Select from '../Evaluation/Pages/Select.jsx';
import { Button } from '../../../stories/Button.jsx';

const Evalprocess = () => {
    const [cidList, setCidList] = useState([]);
    const currentUser = getCurrentUser('current_user');
    const [isReject, setIsreject] = React.useState(false);
    const [reason, setReason] = React.useState('');
    const [reasonSec, setReasonSec] = React.useState('');
    const [cid, setCid] = React.useState('');
    const reasondata1 = [
        'Not novel - Idea and problem common and already in use.',
        'Not novel - Idea has been 100% plagiarized.',
        'Not useful - Idea does not solve the problem identified / problem & solution not connected.',
        'Not understandable - Idea Submission does not have proper details to make a decision.',
        'Not clear (usefulness)',
        'Not filled - Inaccurate data (form is not filled properly)'
    ];
    const reasondata2 = [
        'Lot of project effort visible.',
        'Some project effort visible.',
        'Zero project effort visible.'
    ];

    const cidsData = {
        data: cidList && cidList.length > 0 ? cidList : [],
        columns: [
            {
                name: <span style={{ fontWeight: 550 }}>No</span>,
                selector: (row, key) => key + 1,
                width: '6%'
            },
            {
                name: <span style={{ fontWeight: 550 }}>CID</span>,
                selector: (row) => row.challenge_response_id,
                sortable: true,
                width: '12%'
            },
            {
                name: <span style={{ fontWeight: 550 }}>Theme</span>,
                selector: (row) => row.theme,
                width: '15%'
            },
            {
                name: <span style={{ fontWeight: 550 }}>Idea Name</span>,
                selector: (row) => row.title,
                width: '15%'
            },
            {
                name: <span style={{ fontWeight: 550 }}>status</span>,
                selector: (row) => row.status,
                width: '15%'
            },
            {
                name: <span style={{ fontWeight: 550 }}>Mentor Verification</span>,
                selector: (row) => (row.verified_status === '' || row.verified_status === null) ? 'Yet to Verified' : row.verified_status,
                width: '15%'
            },
            {
                name: <span style={{ fontWeight: 550 }}>L1 Status</span>,
                selector: (row) =>
                    row.evaluation_status === 'SELECTEDROUND1' ? 'ACCEPTED' : row.evaluation_status === 'REJECTEDROUND1' ? 'REJECTED' : 'Yet to Processed',
                width: '15%'
            }
        ]
    };
    const customStyles = {
        rows: {
            style: {
                fontSize: "13px",
            },
        },
        headCells: {
            style: {
                fontSize: "14px",
            },
        },
        cells: {
            style: {
                fontSize: "13px",
            },
        },
    };
    const handleSerach = async () => {
        try {
            const paramQuery = encryptGlobal(JSON.stringify({
                cids: cid
            }));
            const response = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/challenge_response/CIDGroupsearch?Data=${paramQuery}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${currentUser?.data[0]?.token}`
                    }
                }
            );

            if (response.status === 200) {
                setCidList(response.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (cid !== '') {
            handleSerach();
        }
    }, [cid]);
    const formik = useFormik({
        initialValues: {
            cids: ''
        },
        validationSchema: Yup.object({
            cids: Yup.string().required(`cid's is Required`).matches(/^[0-9,]+$/, "Only Digit or Comma")
        }),
        onSubmit: async (values) => {
            setCid(`[${values.cids}]`);
        }
    });
    const buttonContainerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 0 0 0'
    };
    const handleReject = () => {
        if (reason) {
            handleAlert('reject');
            setIsreject(false);
        }
    };
    const handleAlert = (handledText) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false,
            allowOutsideClick: false
        });

        swalWithBootstrapButtons
            .fire({
                title: 'Are you sure?',
                text:
                    handledText === 'accept'
                        ? 'You are attempting to accept this Ideas'
                        : 'You are attempting to reject this Ideas',

                showCloseButton: true,
                confirmButtonText: 'Confirm',
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                reverseButtons: false
            })
            .then((result) => {
                if (result.isConfirmed) {
                    if (result.isConfirmed) {
                        handleL1Round(handledText);
                    }
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire('Cancelled', '', 'error');
                }
            });
    };
    const handleL1Round = (handledText) => {
        const body = JSON.stringify({
            evaluation_status:
                handledText == 'accept' ? 'SELECTEDROUND1' : 'REJECTEDROUND1',
            evaluated_by: currentUser?.data[0]?.user_id,
            rejected_reason: handledText == 'reject' ? reason : '',
            rejected_reasonSecond: handledText == 'reject' ? reasonSec : '',
            cids: JSON.parse(cid)
        });
        var config = {
            method: 'put',
            url: `${process.env.REACT_APP_API_BASE_URL + '/challenge_response/CIDGroupUpdate'}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            },
            data: body
        };
        axios(config)
            .then(function (response) {
                openNotificationWithIcon(
                    'success',
                    response?.data?.message == 'OK'
                        ? 'Ideas processed successfully!'
                        : response?.data?.message
                );
                handleSerach();
            })
            .catch(function (error) {
                openNotificationWithIcon(
                    'error',
                    error?.response?.data?.message
                );
            });
    };
    return (
        <div>
            <div className="page-wrapper">
                <div className="content">
                    <div className="row">
                        <Container className="ticket-page">
                            <Row className="pt-3">
                                <Row className="mb-2 mb-sm-5 mb-md-5 mb-lg-0">
                                    <Col className="col-auto">
                                        <h4>Bulk Accept / Reject</h4>
                                    </Col>
                                </Row>
                                <Form onSubmit={formik.handleSubmit} isSubmitting>
                                    <div className="create-ticket register-block">
                                        <Row className="modal-body-table search-modal-header">
                                            <Label
                                                className="mb-2"
                                                htmlFor="cids"
                                            >
                                                {`Cid's`}
                                                <span required>*</span>
                                            </Label>
                                            <Input
                                                type="text"

                                                id="cids"
                                                name="cids"
                                                placeholder="Please enter cid's with comma separated"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.cids}
                                            />
                                            {formik.touched.cids &&
                                                formik.errors.cids && (
                                                    <small className="error-cls" style={{ color: "red" }}>
                                                        {formik.errors.cids}
                                                    </small>
                                                )}
                                            <div style={buttonContainerStyle}>
                                                <button
                                                    type="submit"
                                                    className='btn btn-warning'
                                                >
                                                    {`Search cid's`}
                                                </button>
                                            </div>
                                        </Row>

                                    </div>
                                </Form>

                                <div className="my-2">
                                    <DataTableExtensions
                                        {...cidsData}
                                        exportHeaders
                                        print={false}
                                        export={false}
                                    >
                                        <DataTable
                                            defaultSortField="id"
                                            defaultSortAsc={false}
                                            pagination
                                            highlightOnHover
                                            customStyles={customStyles}

                                            fixedHeader
                                            subHeaderAlign={Alignment.Center}
                                        />
                                    </DataTableExtensions>
                                </div>
                                {cidList && cidList.length > 0 && (<div className='d-flex justify-content-end'>
                                    <button
                                        className="btn px-5 py-2 btn-danger"
                                        onClick={() => {
                                            setIsreject(true);
                                            setReason('');
                                            setReasonSec('');
                                        }}
                                    >
                                        <span >
                                            Reject
                                        </span>
                                    </button>
                                    <button
                                        className="btn px-5 py-2 btn-success"
                                        onClick={() => {
                                            handleAlert(
                                                'accept'
                                            );
                                            setReason('');
                                            setReasonSec('');
                                        }}
                                    >
                                        <span >
                                            Accept
                                        </span>
                                    </button>
                                </div>)}



                            </Row>
                        </Container>
                    </div></div>
            </div>
            <Modal
                show={isReject}
                onHide={() => setIsreject(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="assign-evaluator ChangePSWModal teacher-register-modal"
                backdrop="static"
                scrollable={true}
            >
                <Modal.Header closeButton onHide={() => setIsreject(false)}>
                    <Modal.Title
                        id="contained-modal-title-vcenter"
                        className="w-100 d-block text-center"
                    >
                        Reject
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="my-3 text-center">
                        <h4 className="mb-sm-4 mb-1">
                            Please Select the reason for rejection.
                        </h4>
                        <Col>
                            <Col className="m-3">
                                <p style={{ textAlign: 'left' }}>
                                    <b>1. Novelty & Usefulness</b> <span required style={{ color: "red" }}>*</span>
                                </p>
                                <Select
                                    list={reasondata1}
                                    setValue={setReason}
                                    placeHolder="Please Select Reject Reason"
                                    value={reason}
                                />
                            </Col>
                            <Col className="m-3">
                                <p style={{ textAlign: 'left' }}>
                                    <b>
                                        2. Does the submission show any evidence
                                        of efforts put in to complete the
                                        project?
                                    </b> <span required style={{ color: "red" }}>*</span>
                                </p>
                                <Select
                                    list={reasondata2}
                                    setValue={setReasonSec}
                                    placeHolder="Please Select Reject Reason"
                                    value={reasonSec}
                                />
                            </Col>
                        </Col>
                    </div>
                    <div className="text-center">
                        <Button
                            label={'Reject'}
                            btnClass={reason && reasonSec ? 'primary' : 'default'}
                            size="small "
                            onClick={() => handleReject()}
                            disabled={!(reason && reasonSec)}
                        />
                    </div>
                </Modal.Body>
            </Modal>
        </div>

    );
};

export default Evalprocess;
