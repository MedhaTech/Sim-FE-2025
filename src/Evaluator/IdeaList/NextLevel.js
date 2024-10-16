/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React ,{useEffect}from 'react';
import { Button } from '../../stories/Button';
import LinkComponent from './LinkComponent';
import { getCurrentUser } from '../../helpers/Utils';
import RateIdea from './RateIdea';
import { Row, Col, Form, Label } from 'reactstrap';

const NextLevel = (props) => {
    const currentUser = getCurrentUser('current_user');
    const [teamResponse, setTeamResponse] = React.useState([]);
    useEffect(() => {
        if (props?.ideaDetails) {
            setTeamResponse(props?.ideaDetails);
        }
    }, [props]);
    const files = teamResponse?.prototype_image
    ? teamResponse?.prototype_image.split(',')
    : [];
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
const problemSolvingArray = teamResponse?.problem_solving;
    return (
        <>
            {teamResponse ? (
                <>
                    <div >
                        <div className="col-12 p-0">
                            <div className="row">
                                <div className="col-lg-6">
                                    <Row>
                                        <Col>
                                            <h4 className="mb-md-4 mb-3">
                                                Theme :
                                                <span className="text-capitalize">
                                                {props?.ideaDetails?.theme?.toLowerCase() ||
                                                        ''}
                                                </span>
                                            </h4>
                                        </Col>
                                        <Col>
                                            <h4 className="mb-md-4 mb-3">
                                                CID :
                                                <span className="text-capitalize">
                                                {props?.ideaDetails.challenge_response_id ||
                                                        ''}
                                                </span>
                                                </h4>
                                        </Col>
                                    </Row>
                                </div>
                                {/* <div className="col-sm-8">
                                    <h2 className="mb-md-4 mb-3">
                                        SDG:{' '}
                                        <span className="text-capitalize fs-3">
                                            {props?.ideaDetails?.sdg?.toLowerCase() ||
                                                ''}
                                        </span>
                                    </h2>
                                </div>
                                <div className="col-sm-8">
                                    <h2 className="mb-md-4 mb-3">
                                        Challenge Response Id :
                                        <span className="text-capitalize fs-3">
                                            {props?.ideaDetails
                                                ?.challenge_response_id || ''}
                                        </span>
                                    </h2>
                                </div> */}
                                <div className="col-sm-4 d-flex justify-content-end">
                                    <div className="ms-auto me-sm-3 p-0">
                                        <Button
                                            btnClass="primary"
                                            size="small"
                                            label="Skip"
                                            onClick={() => props?.handleSkip()}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-8 order-lg-0 order-1 p-0 h-100">
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
                        </div>
                                {/* <div className="col-lg-12 mt-3">
                                    <Row className="col-lg-12">
                                        <h2>
                                            <span
                                                style={{
                                                    color: 'blue'
                                                }}
                                            >
                                                Problem Statement :{' '}
                                            </span>
                                            <span className="text-capitalize fs-3">
                                                {props?.ideaDetails?.sub_category?.toLowerCase() ||
                                                    ''}
                                            </span>
                                        </h2>
                                    </Row>
                                </div> */}
                            </div>
                        </div>

                        <div
                            className={`${
                                props?.ideaDetails?.status === 'SUBMITTED'
                                    ? 'col-12'
                                    : 'col-lg-8'
                            } order-lg-0 order-1 p-0 h-100`}
                        >
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
                        </div>
                    </div>

                    {/* //-----------Rating section---- */}

                    <RateIdea
                        challenge_response_id={
                            props?.ideaDetails?.challenge_response_id
                        }
                        evaluator_id={currentUser?.data[0]?.user_id}
                        level={'L2'}
                        setIsNextDiv={props?.setIsNextDiv}
                    />
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
        </>
    );
};

export default NextLevel;
