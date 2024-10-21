/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable indent */
import React from 'react';
import { Button } from '../../stories/Button';
// import LinkComponent from './LinkComponent';
import { getCurrentUser, openNotificationWithIcon } from '../../helpers/Utils';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getSubmittedIdeaList } from '../store/evaluator/action';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Modal } from 'react-bootstrap';
import Select from '../Helper/Select';
import RateIdea from './RateIdea';
import { Row, Col, Form, Label } from 'reactstrap';

const IdeaDetail = (props) => {
    const dispatch = useDispatch();
    const currentUser = getCurrentUser('current_user');
    const [teamResponse, setTeamResponse] = React.useState([]);
   
    const [isReject, setIsreject]=React.useState(false);
    const [reason, setReason]=React.useState('');
    const selectData = [
        'Idea is very common and already in use.',
        'Idea does not have proper details and information to make a decision.',
        'Idea does not solve the problem identified/the solution and problem are not connected.',
        'Not very clear about the idea and solution.',
        'Inaccurate Data (Form is not filled properly)'
    ];
    const [reasonSec, setReasonSec] = React.useState('');
    const reasondata2 = [
        'Lot of project effort visible.',
        'Some project effort visible.',
        'Zero project effort visible.'
    ];

     const [levelName, setLevelName]=React.useState('');
     const [evalSchema, setEvalSchema]=React.useState('');
     React.useEffect(()=>{
         if(currentUser){
             setLevelName(currentUser?.data[0]?.level_name);
             setEvalSchema(currentUser?.data[0]?.eval_schema);
         }
     },[currentUser]);

    React.useEffect(() => {
        if (props?.ideaDetails) {
            setTeamResponse(
                props?.ideaDetails
            );
        }
    }, [props]);
    const files = teamResponse?.Prototype_file
    ? teamResponse?.Prototype_file.split(',')
    : [];
    const problemSolvingArray = teamResponse?.problem_solving;

const downloadFile = (item) => {
    // const link = document.createElement('a');
    // link.href = item;
    // link.download = 'upload.pdf';
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
    fetch(item)
        .then((response) => {
            // Convert the response to a blob
            return response.blob();
        })
        .then((blob) => {
            // Create a download link
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            const parts = item.split('/');
            link.setAttribute('download', parts[parts.length - 1]);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        })
        .catch((error) => {
            console.error('Error downloading file:', error);
        });
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
                title:
                    handledText === 'accept'
                        ? 'You are attempting to accept this Idea'
                        : 'You are attempting to reject this Idea',
                text: 'Are you sure?',
                // imageUrl: `${logout}`,
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
                } else if (
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire('Cancelled', '', 'error');
                }
            });
    };

    const handleL1Round = (handledText) => {
        const body = JSON.stringify({
            status:
                handledText == 'accept' ? 'SELECTEDROUND1' : 'REJECTEDROUND1',
            rejected_reason:handledText == 'reject' ? reason : ''
        });
        var config = {
            method: 'put',
            url: `${
                process.env.REACT_APP_API_BASE_URL +
                '/challenge_response/' +
                props?.ideaDetails?.challenge_response_id
            }`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            },
            data: body
        };
        axios(config)
            .then(function (response) {
                openNotificationWithIcon('success', response?.data?.message=='OK'?'Idea processed successfully!':response?.data?.message);
                setTimeout(() => {
                    dispatch(getSubmittedIdeaList());
                    props?.setIsNextDiv(true);
                }, 100);
            })
            .catch(function (error) {
                openNotificationWithIcon(
                    'error',
                    error?.response?.data?.message
                );
            });
    };
   const handleReject=()=>{
        if(reason){
            handleAlert('reject'); 
            setIsreject(false);
        }
   };

    return (
        <>
            {teamResponse ? (
                <>
                    <div className="row idea_detail_card ">
                        <div className="col-12 p-0">
                            <div className="row">
                                <div className="col-sm-8">
                                <h4 className="mb-md-4 mb-3">
                                                Theme :
                                                <span className="text-capitalize">
                                                {props?.ideaDetails?.theme?.toLowerCase() ||
                                                        ''}
                                                </span>
                                            </h4>
                                </div>
                                <div className="col-sm-4 d-flex justify-content-end">
                                    <div className="ms-auto me-sm-3 p-0">
                                        <Button
                                            btnClass="primary"
                                            size="small"
                                            label="Skip"
                                            onClick={() =>
                                                props?.handleSkip()
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            className={`${
                                props?.ideaDetails?.status === 'SUBMITTED'
                                    ? 'col-12'
                                    : 'col-lg-8'
                            } order-lg-0 order-1 p-0 h-100`}
                        >
                             {/* <div className="col-lg-8 order-lg-0 order-1 p-0 h-100"> */}
                             <div className="col-lg-12 order-lg-0 order-1 p-0 h-100">
                                <div
                                    // key={index}
                                    className="mb-4 my-3 comment-card px-5 py-3 card me-md-3"
                                >
                                    <div className="question quiz mb-0">
                                        <b
                                            style={{
                                                fontSize: '1.2rem'
                                            }}
                                        >
                                            Idea Submission Language
                                            
                                        </b>
                                    </div>
                                    <div className="bg-light rounded p-5 ">
                                        <p
                                            style={{
                                                fontSize: '1rem',color:"black"
                                            }}
                                        >
                                            {
                                                teamResponse.language
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 order-lg-0 order-1 p-0 h-100">
                                <div
                                    // key={index}
                                    className="mb-4 my-3 comment-card px-5 py-3 card me-md-3"
                                >
                                    <div className="question quiz mb-0">
                                    <b
                                            style={{
                                                fontSize: '1.2rem'
                                            }}
                                        >
                                            1.Theme
                                            
                                        </b>
                                    </div>
                                    <div className="bg-light rounded p-5">
                                    <p
                                            style={{
                                                fontSize: '1rem',color:"black"
                                            }}
                                        >
                                            {
                                                teamResponse.theme
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 order-lg-0 order-1 p-0 h-100">
                                <div
                                    // key={index}
                                    className="mb-4 my-3 comment-card px-5 py-3 card me-md-3"
                                >
                                    <div className="question quiz mb-0">
                                    <b
                                            style={{
                                                fontSize: '1.2rem'
                                            }}
                                        >
                                           2.Focus Area
                                            {/* {item?.question_no || ''}.{' '}
                                                {item?.question || ''} */}
                                        </b>
                                    </div>
                                    <div className="bg-light rounded p-5">
                                    <p
                                            style={{
                                                fontSize: '1rem',color:"black"
                                            }}
                                        >
                                            {
                                                teamResponse.focus_area
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>{' '}
                            <div className="col-lg-12 order-lg-0 order-1 p-0 h-100">
                                <div
                                    // key={index}
                                    className="mb-4 my-3 comment-card px-5 py-3 card me-md-3"
                                >
                                    <div className="question quiz mb-0">
                                    <b
                                            style={{
                                                fontSize: '1.2rem'
                                            }}
                                        >
                                             3. Title of your idea (Think of a proper name. Don't describe
                                                the solution or problem statement here.)
                                           
                                        </b>
                                    </div>
                                    <div className="bg-light rounded p-5">
                                    <p
                                            style={{
                                                fontSize: '1rem',color:"black"
                                            }}
                                        >
                                            {
                                                teamResponse.title
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>{' '}
                            <div className="col-lg-12 order-lg-0 order-1 p-0 h-100">
                                <div
                                    // key={index}
                                    className="mb-4 my-3 comment-card px-5 py-3 card me-md-3"
                                >
                                    <div className="question quiz mb-0">
                                    <b
                                            style={{
                                                fontSize: '1.2rem'
                                            }}
                                        >
                                            4. Write down your Problem statement
                                        </b>
                                    </div>
                                    <div className="bg-light rounded p-5">
                                    <p
                                            style={{
                                                fontSize: '1rem',color:"black"
                                            }}
                                        >
                                            {teamResponse.problem_statement}
                                        </p>
                                    </div>
                                </div>
                            </div>{' '}
                            <div className="col-lg-12 order-lg-0 order-1 p-0 h-100">
                                <div
                                    // key={index}
                                    className="mb-4 my-3 comment-card px-5 py-3 card me-md-3"
                                >
                                    <div className="question quiz mb-0">
                                    <b
                                            style={{
                                                fontSize: '1.2rem'
                                            }}
                                        >
                                              5. List the Causes of the problem
                                        </b>
                                    </div>
                                    <div className="bg-light rounded p-5">
                                    <p
                                            style={{
                                                fontSize: '1rem',color:"black"
                                            }}
                                        >
                                            {teamResponse.causes}
                                        </p>
                                    </div>
                                </div>
                            </div>{' '}
                            <div className="col-lg-12 order-lg-0 order-1 p-0 h-100">
                                <div
                                    // key={index}
                                    className="mb-4 my-3 comment-card px-5 py-3 card me-md-3"
                                >
                                    <div className="question quiz mb-0">
                                    <b
                                            style={{
                                                fontSize: '1.2rem'
                                            }}
                                        >
                                            6. List the Effects of the problem
                                        </b>
                                    </div>
                                    <div className="bg-light rounded p-5">
                                    <p
                                            style={{
                                                fontSize: '1rem',color:"black"
                                            }}
                                        >
                                            {teamResponse.effects}
                                        </p>
                                    </div>
                                </div>
                            </div>{' '}
                            <div className="col-lg-12 order-lg-0 order-1 p-0 h-100">
                                <div
                                    // key={index}
                                    className="mb-4 my-3 comment-card px-5 py-3 card me-md-3"
                                >
                                    <div className="question quiz mb-0">
                                    <b
                                            style={{
                                                fontSize: '1.2rem'
                                            }}
                                        >
                                             7. In which places in your community did you find this problem?
                                        </b>
                                    </div>
                                    <div className="bg-light rounded p-5">
                                    <p
                                            style={{
                                                fontSize: '1rem',color:"black"
                                            }}
                                        >
                                            {teamResponse.community}
                                        </p>
                                    </div>
                                </div>
                            </div>{' '}
                            <div className="col-lg-12 order-lg-0 order-1 p-0 h-100">
                                <div
                                    // key={index}
                                    className="mb-4 my-3 comment-card px-5 py-3 card me-md-3"
                                >
                                    <div className="question quiz mb-0">
                                        <b
                                            style={{
                                                fontSize: '1.2rem'
                                            }}
                                        >
                                             8. Who all are facing this problem?
                                        </b>
                                    </div>
                                    <div className="bg-light rounded p-5">
                                        <p
                                            style={{
                                                fontSize: '1rem',color:"black"
                                            }}
                                        >
                                            {teamResponse.facing}
                                        </p>
                                    </div>
                                </div>
                            </div>{' '}
                            <div className="col-lg-12 order-lg-0 order-1 p-0 h-100">
                                <div
                                    // key={index}
                                    className="mb-4 my-3 comment-card px-5 py-3 card me-md-3"
                                >
                                    <div className="question quiz mb-0">
                                    <b
                                            style={{
                                                fontSize: '1.2rem'
                                            }}
                                        >
                                              9. Describe the solution to the problem your team found. Explain
                your solution clearly - how does it work, who is it helping, and
                how will it solve the problem.
                                        </b>
                                    </div>
                                    <div className="bg-light rounded p-5">
                                    <p
                                            style={{
                                                fontSize: '1rem',color:"black"
                                            }}
                                        >
                                            {teamResponse.solution}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 order-lg-0 order-1 p-0 h-100">
                                <div
                                    // key={index}
                                    className="mb-4 my-3 comment-card px-5 py-3 card me-md-3"
                                >
                                    <div className="question quiz mb-0">
                                        <b
                                            style={{
                                                fontSize: '1.2rem'
                                            }}
                                        >
                                             10. Apart from your teacher, how many people/stakeholders did you
                                             speak to to understand or improve your problem or solution?
                                        </b>
                                    </div>
                                    <div className="bg-light rounded p-5">
                                        <p
                                            style={{
                                                fontSize: '1rem',color:"black"
                                            }}
                                        >
                                            {teamResponse.stakeholders}
                                        </p>
                                    </div>
                                </div>
                            </div>{' '}
                            <div className="col-lg-12 order-lg-0 order-1 p-0 h-100">
                                <div
                                    // key={index}
                                    className="mb-4 my-3 comment-card px-5 py-3 card me-md-3"
                                >
                                    <div className="question quiz mb-0">
                                        <b
                                            style={{
                                                fontSize: '1.2rem'
                                            }}
                                        >
                                             11. Pick the actions your team did in your problem solving
                                             journey (You can choose multiple options)
                                        </b>
                                    </div>
                                    <div className="bg-light rounded p-5">
                                        <p
                                            style={{
                                                fontSize: '1rem',color:"black"
                                            }}
                                        >
                                           {problemSolvingArray}
                                        </p>
                                    </div>
                                </div>
                            </div>{' '}
                            <div className="col-lg-12 order-lg-0 order-1 p-0 h-100">
                                <div
                                    // key={index}
                                    className="mb-4 my-3 comment-card px-5 py-3 card me-md-3"
                                >
                                    <div className="question quiz mb-0">
                                        <b
                                            style={{
                                                fontSize: '1.2rem'
                                            }}
                                        >
                                             12. Mention the feedback that your team got and the changes you
                                             have made, if any, to your problem or solution.
                                        </b>
                                    </div>
                                    <div className="bg-light rounded p-5">
                                        <p
                                            style={{
                                                fontSize: '1rem',color:"black"
                                            }}
                                        >
                                          {teamResponse.feedback}
                                        </p>
                                    </div>
                                </div>
                            </div>{' '}
                          
                                    <div className="col-lg-12 order-lg-0 order-1 p-0 h-100">
                                        <div
                                            // key={index}
                                            className="mb-4 my-3 comment-card px-5 py-3 card me-md-3"
                                        >
                                            <div className="question quiz mb-0">
                                                <b
                                                    style={{
                                                        fontSize: '1.2rem'
                                                    }}
                                                >
                                                    13. Upload image of your prototype. (total size limit : 10mb)
                                                </b>
                                            </div>
                                            <div className="bg-light rounded p-5">
                                                {files.length > 0 &&
                                                    files.map((item, i) => (
                                                        <div key={i}>
                                                            {/* <CardTitle className="fw-bold">
                                                    {item.question}
                                                </CardTitle> */}
                                                            {/* <CardBody> */}
                                                            <a
                                                                key={i}
                                                                className="badge mb-2 bg-info p-3 ms-3"
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                onClick={() =>
                                                                    downloadFile(
                                                                        item
                                                                    )
                                                                }
                                                            >
                                                                {item
                                                                    .split('/')
                                                                    .pop()}
                                                            </a>
                                                            {/* </CardBody> */}
                                                        </div>
                                                    ))}
                                                {/* <p
                                        style={{
                                            fontSize: '1.4rem'
                                        }}
                                    >
                                        {teamResponse?.Prototype_file}
                                    </p> */}
                                            </div>
                                        </div>
                                    </div>
                            <div className="col-lg-12 order-lg-0 order-1 p-0 h-100">
                                <div
                                    // key={index}
                                    className="mb-4 my-3 comment-card px-5 py-3 card me-md-3"
                                >
                                    <div className="question quiz mb-0">
                                        <b
                                            style={{
                                                fontSize: '1.2rem'
                                            }}
                                        >
                                            14. Upload documents & video links of your prototype.
                                        </b>
                                    </div>
                                    <div className="bg-light rounded p-5">
                                        <p
                                            style={{
                                                fontSize: '1rem',color:"black"
                                            }}
                                        >
                                            {teamResponse.prototype_link}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 order-lg-0 order-1 p-0 h-100">
                                <div
                                    // key={index}
                                    className="mb-4 my-3 comment-card px-5 py-3 card me-md-3"
                                >
                                    <div className="question quiz mb-0">
                                        <b
                                            style={{
                                                fontSize: '1.2rem'
                                            }}
                                        >
                                            15. Did your team complete and submit the workbook to your
                                            school Guide teacher?
                                        </b>
                                    </div>
                                    <div className="bg-light rounded p-5">
                                        <p
                                            style={{
                                                fontSize: '1rem',color:"black"
                                            }}
                                        >
                                            {teamResponse.workbook}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* {teamResponse?.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="mb-4 my-3 comment-card px-5 py-3 card me-md-3"
                                    >
                                        <div className="question quiz mb-0">
                                            <b
                                                style={{
                                                    fontSize: '1.6rem'
                                                }}
                                            >
                                                {item?.question_no || ''}.{' '}
                                                {item?.question || ''}
                                            </b>
                                        </div>
                                        <div className="bg-light rounded p-5">
                                            <p
                                                style={{
                                                    fontSize: '1.4rem'
                                                }}
                                            >
                                                {item?.question_type ===
                                                'MCQ' ? (
                                                    item?.selected_option?.map(
                                                        (data, i) => {
                                                            return (
                                                                <div key={i}>
                                                                    {data || ''}
                                                                </div>
                                                            );
                                                        }
                                                    )
                                                ) : item?.question_type ===
                                                      'TEXT' ||
                                                  item?.question_type ===
                                                      'MRQ' ? (
                                                    item?.selected_option
                                                ) : item?.question_type ===
                                                  'DRAW' ? (
                                                    <LinkComponent
                                                        item={
                                                            item.selected_option
                                                        }
                                                    />
                                                ) : (
                                                    ''
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })} */}
                        {/* </div> */}
                            {/* {teamResponse?.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="mb-4 my-3 comment-card px-5 py-3 card me-md-3"
                                    >
                                        <div className="question quiz mb-0">
                                            <b
                                                style={{
                                                    fontSize: '1.6rem'
                                                }}
                                            >
                                                {item?.question_no || ''}.{' '}
                                                {item?.question || ''}
                                            </b>
                                        </div>
                                        <div className="bg-light rounded p-5">
                                            <p
                                                style={{
                                                    fontSize: '1.4rem'
                                                }}
                                            >
                                                {item?.question_type ===
                                                'MCQ' ? (
                                                    item?.selected_option?.map(
                                                        (data, i) => {
                                                            return (
                                                                <div key={i}>
                                                                    {data || ''}
                                                                </div>
                                                            );
                                                        }
                                                    )
                                                ) : item?.question_type ===
                                                      'TEXT' ||
                                                  item?.question_type ===
                                                      'MRQ' ? (
                                                    item?.selected_option
                                                ) : item?.question_type ===
                                                  'DRAW' ? (
                                                    <LinkComponent
                                                        item={
                                                            item.selected_option
                                                        }
                                                    />
                                                ) : (
                                                    ''
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })} */}
                            {/* -----level 1 accept/reject process---- */}
                            <div className="d-md-flex">
                                {props?.ideaDetails?.status === 'SUBMITTED' && (
                                    <div className="d-flex ms-auto">
                                        <button
                                            className="btn btn-success me-3 m-2"
                                            onClick={() => {
                                                handleAlert('accept');
                                                setReason('');
                                                setReasonSec('');
                                            }}
                                        >
                                            <span >Accept</span>
                                        </button>
                                        <button
                                            className="btn btn-danger me-3 m-2"
                                            onClick={() => {
                                                // handleAlert('reject');
                                                setIsreject(true);
                                                setReason('');
                                                setReasonSec('');
                                            }}
                                        >
                                            <span >Reject</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* //-----------Rating section---- */}
                    {/* {evalSchema?.toLowerCase()=='rating_scale'? (
                       <RateIdea
                        challenge_response_id={props?.ideaDetails?.challenge_response_id}
                        evaluator_id={currentUser?.data[0]?.user_id}
                        level={levelName}
                        setIsNextDiv={props?.setIsNextDiv}
                       />
                    ):
                    <>
                    </>
                } */}
                </>
            ) : (
                <>
                    <h2 className="my-auto text-center mt-5">
                        Details Not Available.
                    </h2>
                    <div className="text-center mt-5">
                        <Button
                            btnClass="primary"
                            size="small"
                            label="Next Idea"
                            onClick={() => {
                                props?.handleSkip();
                            }}
                        />
                    </div>
                </>
            )}
            {/* ----------reject-modal----- */}
            <Modal
                show={isReject}
                onHide={() => setIsreject(false)}
                {...props}
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
                        <h4 className="mb-sm-4 mb-3">
                            Please Select the reason for rejection.
                        </h4>
                        <Col>
                            <Col className="m-5">
                                <p className="text-left">
                                    <b>1. Novelty & Usefulness</b>
                                </p>
                                <Select
                                    list={selectData}
                                    setValue={setReason}
                                    placeHolder={'Please Select Reject Reason'}
                                    value={reason}
                                />
                            </Col>
                            <Col className="m-5">
                                <p className="text-left">
                                    <b>
                                        2. Does the submission show any evidence
                                        of efforts put in to complete the
                                        project?
                                    </b>
                                </p>
                                <Select
                                    list={reasondata2}
                                    setValue={setReasonSec}
                                    placeHolder={'Please Select Reject Reason'}
                                    value={reasonSec}
                                />
                            </Col>
                        </Col>
                    </div>
                    <div className="text-center">
                        <Button
                            label={'Submit'}
                            btnClass={
                                !reason && reasonSec ? 'default' : 'primary'
                            }
                            size="small "
                            onClick={() => handleReject()}
                            disabled={!reason && reasonSec}
                        />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default IdeaDetail;
