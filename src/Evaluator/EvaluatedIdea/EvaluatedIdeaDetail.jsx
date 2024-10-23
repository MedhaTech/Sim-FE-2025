/* eslint-disable react/no-unescaped-entities */
/* eslint-disable indent */
import React,{useEffect} from 'react';
import './EvaluatedIdea.scss';
import { Button } from '../../stories/Button';
// import LinkComponent from '../IdeaList/LinkComponent';
import moment from 'moment';
// import { getCurrentUser } from '../../helpers/Utils';
import RatedDetailCard from './RatedDetailCard';

const EvaluatedIdeaDetail = (props) => {

    const [teamResponse, setTeamResponse] = React.useState([]);
    // const currentUser = getCurrentUser('current_user');
    useEffect(() => {
        if (props?.ideaDetails) {
            setTeamResponse(props?.ideaDetails);
        }
    }, [props]);
    // const [levelName, setLevelName] = React.useState('');
    // React.useEffect(() => {
    //     if (currentUser) {
    //         setLevelName(currentUser?.data[0]?.level_name);
    //     }
    // }, [currentUser]);
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
// console.log("VIEW PAGE OF L2",teamResponse.length);

    return (
        <div>
            {teamResponse  ? (
                <>
                    <div className="row idea_detail_card">
                        <div className="col-12 p-0">
                            <div className="row">
                                <div className="col-lg-6">
                                <h4 className="mb-md-4 mb-3">
                                                Theme :
                                                <span className="text-capitalize">
                                                {props?.ideaDetails?.theme?.toLowerCase() ||
                                                        ''}
                                                </span>
                                            </h4>
                                </div>
                                <div className="col-lg-6 d-flex justify-content-end">
                                    <div className="ms-auto me-sm-3 p-0">
                                        <Button
                                            btnClass="primary"
                                            size="small"
                                            label="Back to List"
                                            onClick={() =>
                                                props?.setIsDetail(false)
                                            }
                                        />
                                    </div>
                                    <div className="ms-auto me-sm-3 p-0">
                                        <Button
                                            btnClass={
                                                props?.currentRow > 1
                                                    ? 'primary'
                                                    : 'default'
                                            }
                                            size="small"
                                            label={'Previous'}
                                            onClick={() => props?.handlePrev()}
                                            disabled={props?.currentRow == 1}
                                        />
                                    </div>
                                    <div className="ms-auto me-sm-3 p-0">
                                        <Button
                                            btnClass={
                                                props?.dataLength !=
                                                props?.currentRow
                                                    ? 'primary'
                                                    : 'default'
                                            }
                                            size="small"
                                            label={'Next'}
                                            onClick={() => props?.handleNext()}
                                            disabled={
                                                props?.dataLength ==
                                                props?.currentRow
                                            }
                                        />
                                    </div>
                                </div>
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
                        </div>
                        {/* <div className="col-lg-8 order-lg-0 order-1 p-0 h-100">
                            {teamResponse?.map((item, index) => {
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
                            })}
                        </div> */}
                        <div className="col-lg-4 order-lg-1 order-0 p-0 h-100 mt-3 status_info_col">
                            <div className="level-status-card card border p-md-5 p-3 mb-3 me-lg-0 me-md-3">
                                <p
                                    className={`${
                                        props?.ideaDetails?.evaluation_status ==
                                        'SELECTEDROUND1'
                                            ? 'text-success'
                                            : 'text-danger'
                                    } fs-3 fw-bold text-center`}
                                >
                                    <span className="fs-2 text-info">
                                        L1 -{' '}
                                    </span>
                                    {props?.ideaDetails?.evaluation_status ==
                                    'SELECTEDROUND1'
                                        ? 'Accepted'
                                        : 'Rejected'}
                                </p>
                                <p className="text-center">
                                    <span className="text-bold">
                                        Evaluated At:{' '}
                                    </span>{' '}
                                    {moment(
                                        props?.ideaDetails?.evaluated_at
                                    ).format('DD-MM-YY h:mm:ss a') || ''}
                                </p>
                                {props?.ideaDetails?.evaluation_status ==
                                    'REJECTEDROUND1' && (
                                    <p className="text-center">
                                        <span className="text-bold">
                                            Rejected Reason:{' '}
                                        </span>{' '}
                                        {props?.ideaDetails?.rejected_reason ||
                                            ''}
                                    </p>
                                )}
                            </div>
                            {props?.levelName !== 'L1' && (
                                <RatedDetailCard details={props?.ideaDetails} />
                            )}
                        </div>
                    </div>
                    <div>
                        <Button
                            btnClass="primary"
                            size="small"
                            label="Back"
                            onClick={() => {
                                props?.setIsDetail(false);
                            }}
                        />
                    </div>
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
                            label="Back"
                            onClick={() => {
                                props?.setIsDetail(false);
                            }}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default EvaluatedIdeaDetail;
