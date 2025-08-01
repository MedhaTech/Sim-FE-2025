/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React ,{useEffect}from 'react';
import { Button } from '../../stories/Button';
import LinkComponent from './LinkComponent';
import { getCurrentUser } from '../../helpers/Utils';
import RateIdea from './RateIdea';
import { Row, Col, Form, Label } from 'reactstrap';
import VideoPopup from './Videopop';

const NextLevel = (props) => {
    const currentUser = getCurrentUser('current_user');
    const [teamResponse, setTeamResponse] = React.useState([]);
     const [images,setImages] = React.useState([]);
    
    useEffect(() => {
        if (props?.ideaDetails) {
            setTeamResponse(props?.ideaDetails);
            setImages(JSON.parse(props?.ideaDetails.prototype_image));
            
        }
    }, [props]);
   
    return (
        <>
            {teamResponse ? (
                <>
                    <div >
                        <div className="col-12 p-0">
                            <div className="row">
                                <div className="col-lg-8">
                                    <Row>
                                        <Col md={6}>
                                            <h4 className="mb-md-4 mb-3">
                                                Theme :&nbsp;
                                                <span className="text-capitalize">
                                                {props?.ideaDetails?.theme?.toLowerCase() ||
                                                        ''}
                                                </span>
                                            </h4>
                                        </Col>
                                        <Col md={6}>
                                            <h4 className="mb-md-4 mb-3">
                                                CID :&nbsp;
                                                <span className="text-capitalize">
                                                {props?.ideaDetails.challenge_response_id ||
                                                        ''}
                                                </span>
                                                </h4>
                                        </Col>
                                    </Row>
                                </div>
                              
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
                                    className="mb-4 my-3 comment-card px-4 py-2 card me-md-3"
                                >
                                    <div className="question quiz mb-0">
                                        <b
                                            style={{
                                                fontSize: '1rem',marginBottom:"1rem"
                                            }}
                                        >
                                            Idea Submission Language
                                            
                                        </b>
                                    </div>
                                    <div className="bg-white p-3 mb-3" style={{ border: '1px solid #ccc', borderRadius: '10px',height:"50px" }}>
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
                <h4>Section-1: Problem Identification</h4>

                            <div className="col-lg-12 order-lg-0 order-1 p-0 h-100">
                                <div
                                    // key={index}
                                    className="mb-4 my-3 comment-card px-4 py-2 card me-md-3"
                                >
                                    <div className="question quiz mb-0">
                                    <b
                                            style={{
                                                fontSize: '1rem',marginBottom:"1rem"
                                            }}
                                        >
                                            1. Theme
                                            
                                        </b>
                                    </div>
                                    <div className="bg-white p-3 mb-3" style={{ border: '1px solid #ccc', borderRadius: '10px',height:"auto" }}>
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
                                    className="mb-4 my-3 comment-card px-4 py-2 card me-md-3"
                                >
                                    <div className="question quiz mb-0">
                                    <b
                                            style={{
                                                fontSize: '1rem',marginBottom:"1rem"
                                            }}
                                        >
                                           2. Focus Area
                                           
                                        </b>
                                    </div>
                                    <div className="bg-white p-3 mb-3" style={{ border: '1px solid #ccc', borderRadius: '10px',height:"auto" }}>
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
                                    className="mb-4 my-3 comment-card px-4 py-2 card me-md-3"
                                >
                                    <div className="question quiz mb-0">
                                    <b
                                            style={{
                                                fontSize: '1rem',marginBottom:"1rem"
                                            }}
                                        >
                                             3. Title of your idea (Think of a proper name. Don't describe
                                                the solution or problem statement here.)
                                           
                                        </b>
                                    </div>
                                    <div className="bg-white p-3 mb-3" style={{ border: '1px solid #ccc', borderRadius: '10px',height:"auto" }}>
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
                                    className="mb-4 my-3 comment-card px-4 py-2 card me-md-3"
                                >
                                    <div className="question quiz mb-0">
                                    <b
                                            style={{
                                                fontSize: '1rem',marginBottom:"1rem"
                                            }}
                                        >
                                            4. Write down your Problem statement
                                        </b>
                                    </div>
                                    <div className="bg-white p-3 mb-3" style={{ border: '1px solid #ccc', borderRadius: '10px',height:"auto" }}>
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
                                    className="mb-4 my-3 comment-card px-4 py-2 card me-md-3"
                                >
                                    <div className="question quiz mb-0">
                                    <b
                                            style={{
                                                fontSize: '1rem',marginBottom:"1rem"
                                            }}
                                        >
                                              5. List the Causes of the problem
                                        </b>
                                    </div>
                                    <div className="bg-white p-3 mb-3" style={{ border: '1px solid #ccc', borderRadius: '10px',height:"auto" }}>
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
                                    className="mb-4 my-3 comment-card px-4 py-2 card me-md-3"
                                >
                                    <div className="question quiz mb-0">
                                    <b
                                            style={{
                                                fontSize: '1rem',marginBottom:"1rem"
                                            }}
                                        >
                                            6. List the Effects of the problem
                                        </b>
                                    </div>
                                    <div className="bg-white p-3 mb-3" style={{ border: '1px solid #ccc', borderRadius: '10px',height:"auto" }}>
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
                            {/* <div className="col-lg-12 order-lg-0 order-1 p-0 h-100">
                                <div
                                    className="mb-4 my-3 comment-card px-4 py-2 card me-md-3"
                                >
                                    <div className="question quiz mb-0">
                                    <b
                                            style={{
                                                fontSize: '1rem',marginBottom:"1rem"
                                            }}
                                        >
                                             7. In which places in your community did you find this problem?
                                        </b>
                                    </div>
                                    <div className="bg-white p-3 mb-3" style={{ border: '1px solid #ccc', borderRadius: '10px',height:"auto" }}>
                                    <p
                                            style={{
                                                fontSize: '1rem',color:"black"
                                            }}
                                        >
                                            {teamResponse.community}
                                        </p>
                                    </div>
                                </div>
                            </div>{' '} */}
                            <div className="col-lg-12 order-lg-0 order-1 p-0 h-100">
                                <div
                                    // key={index}
                                    className="mb-4 my-3 comment-card px-4 py-2 card me-md-3"
                                >
                                    <div className="question quiz mb-0">
                                        <b
                                            style={{
                                                fontSize: '1rem',marginBottom:"1rem"
                                            }}
                                        >
                                             7. Who all are facing this problem?
                                        </b>
                                    </div>
                                    <div className="bg-white p-3 mb-3" style={{ border: '1px solid #ccc', borderRadius: '10px',height:"auto" }}>
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
                <h4>Section-2: Solution & User Analysis</h4>

                            <div className="col-lg-12 order-lg-0 order-1 p-0 h-100">
                                <div
                                    // key={index}
                                    className="mb-4 my-3 comment-card px-4 py-2 card me-md-3"
                                >
                                    <div className="question quiz mb-0">
                                    <b
                                            style={{
                                                fontSize: '1rem',marginBottom:"1rem"
                                            }}
                                        >
                                              8. Describe the solution to the problem your team found. Explain
                your solution clearly - how does it work, who is it helping, and
                how will it solve the problem.
                                        </b>
                                    </div>
                                    <div className="bg-white p-3 mb-3" style={{ border: '1px solid #ccc', borderRadius: '10px',height:"auto" }}>
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
                            {/* <div className="col-lg-12 order-lg-0 order-1 p-0 h-100">
                                <div
                                    className="mb-4 my-3 comment-card px-4 py-2 card me-md-3"
                                >
                                    <div className="question quiz mb-0">
                                        <b
                                            style={{
                                                fontSize: '1rem',marginBottom:"1rem"
                                            }}
                                        >
                                             10. Apart from your teacher, how many people/stakeholders did you
                                             speak to to understand or improve your problem or solution?
                                        </b>
                                    </div>
                                    <div className="bg-white p-3 mb-3" style={{ border: '1px solid #ccc', borderRadius: '10px',height:"auto" }}>
                                        <p
                                            style={{
                                                fontSize: '1rem',color:"black"
                                            }}
                                        >
                                            {teamResponse.stakeholders}
                                        </p>
                                    </div>
                                </div>
                            </div>{' '} */}
                            {/* <div className="col-lg-12 order-lg-0 order-1 p-0 h-100">
                                <div
                                    className="mb-4 my-3 comment-card px-4 py-2 card me-md-3"
                                >
                                    <div className="question quiz mb-0">
                                        <b
                                            style={{
                                                fontSize: '1rem',marginBottom:"1rem"
                                            }}
                                        >
                                             11. Pick the actions your team did in your problem solving
                                             journey (You can choose multiple options)
                                        </b>
                                    </div>
                                    <div className="bg-white p-3 mb-3" style={{ border: '1px solid #ccc', borderRadius: '10px',height:"auto" }}>
                                        <p
                                            style={{
                                                fontSize: '1rem',color:"black"
                                            }}
                                        >
                                           {teamResponse.problem_solving &&
            JSON.parse(teamResponse.problem_solving).map((item, index) => (
                <span key={index}>
                    {item}
                    {index !== JSON.parse(teamResponse.problem_solving).length - 1 && ", "}
                </span>
            ))}
                                        </p>
                                    </div>
                                </div>
                            </div>{' '} */}
                            <div className="col-lg-12 order-lg-0 order-1 p-0 h-100">
                                <div
                                    // key={index}
                                    className="mb-4 my-3 comment-card px-4 py-2 card me-md-3"
                                >
                                    <div className="question quiz mb-0">
                                        <b
                                            style={{
                                                fontSize: '1rem',marginBottom:"1rem"
                                            }}
                                        >
                                             9. Mention the feedback that your team got and the changes you
                                             have made, if any, to your problem or solution.
                                        </b>
                                    </div>
                                    <div className="bg-white p-3 mb-3" style={{ border: '1px solid #ccc', borderRadius: '10px',height:"auto" }}>
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
                <h4>Section-3: Prototyping</h4>

                          
                                    <div className="col-lg-12 order-lg-0 order-1 p-0 h-100">
                                        <div
                                            // key={index}
                                            className="mb-4 my-3 comment-card px-4 py-2 card me-md-3"
                                        >
                                            <div className="question quiz mb-0">
                                                <b
                                                    style={{
                                                        fontSize: '1rem',marginBottom:"1rem"
                                                    }}
                                                >
                                                    10. Descriptive Document/Image of your prototype
                                                </b>
                                            </div>
                                            <div className="bg-white p-3 mb-3" style={{ border: '1px solid #ccc', borderRadius: '10px',height:"auto" }}>
                                            {
                        <LinkComponent item={images} />
                      }
                                               
                                            </div>
                                        </div>
                                    </div>
                            <div className="col-lg-12 order-lg-0 order-1 p-0 h-100">
                                <div
                                    // key={index}
                                    className="mb-4 my-3 comment-card px-4 py-2 card me-md-3"
                                >
                                    <div className="question quiz mb-0">
                                        <b
                                            style={{
                                                fontSize: '1rem',marginBottom:"1rem"
                                            }}
                                        >
                                            11. Clear YouTube Video Explaining your Solution
                                        </b>
                                    </div>
                                    <div className="bg-white p-3 mb-3" style={{ border: '1px solid #ccc', borderRadius: '10px',height:"auto" }}>
                                        <p
                                            style={{
                                                fontSize: '1rem',color:"black"
                                            }}
                                        >
                                            {/* <a 
            href={teamResponse.prototype_link} 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ textDecoration: 'none', color: 'skyblue'}}
        >
            {teamResponse.prototype_link}

        </a> */}
         {teamResponse?.prototype_link && (
  <VideoPopup videoUrl={teamResponse.prototype_link} />
)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="col-lg-12 order-lg-0 order-1 p-0 h-100">
                                <div
                                    className="mb-4 my-3 comment-card px-4 py-2 card me-md-3"
                                >
                                    <div className="question quiz mb-0">
                                        <b
                                            style={{
                                                fontSize: '1rem',marginBottom:"1rem"
                                            }}
                                        >
                                            15. Did your team complete and submit the workbook to your
                                            school Guide teacher?
                                        </b>
                                    </div>
                                    <div className="bg-white p-3 mb-3" style={{ border: '1px solid #ccc', borderRadius: '10px',height:"50px" }}>
                                        <p
                                            style={{
                                                fontSize: '1rem',color:"black"
                                            }}
                                        >
                                            {teamResponse.workbook}
                                        </p>
                                    </div>
                                </div>
                            </div> */}

                        </div>
                    </div>

                    {/* //-----------Rating section---- */}

                    <RateIdea
                        challenge_response_id={
                            props?.ideaDetails?.challenge_response_id
                        }
                        evaluator_id={currentUser?.data[0]?.user_id}
                        level={'L2'}
                        topRef={props?.topRef}
                        handleSkip={props?.handleSkip}
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
