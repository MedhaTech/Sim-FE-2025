/* eslint-disable no-undef */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
// import './style.scss';
import { Button } from '../../stories/Button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2/dist/sweetalert2';
import logout from '../../assets/img/logout.png';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { useDispatch, useSelector } from "react-redux";
import { current } from '@reduxjs/toolkit';
import { getCurrentUser, setCurrentUser } from "../../helpers/Utils";
import { getTeamMemberStatus } from "../../Teacher/store/teams/actions";

// import Layout from '../../Layout';

const InstructionsPage = (props) => {
    const { t } = useTranslation();
  const currentUser = getCurrentUser("current_user");
  const [showDefault, setshowDefault] = useState(true);

  const dispatch = useDispatch();

    const navigate = useNavigate();
  const [ideaEnableStatus, setIdeaEnableStatus] = useState(0);
const teamId= currentUser.data[0]?.team_id;
    // const ideaenableornot = localStorage.getItem("ideaenablestatus");
    const { teamsMembersStatus} = useSelector(
        (state) => state.teams
      );
    // console.log(ideaenableornot,"11");
    useEffect(() => {
        if (teamId) {
          dispatch(getTeamMemberStatus(teamId,setshowDefault));
          //dispatch(getStudentChallengeSubmittedResponse(teamId));
        }
      }, [teamId, dispatch]);
      const percentageBWNumbers = (a, b) => {
        return (((a - b) / a) * 100).toFixed(2);
      };
    useEffect(() => {
        if (teamsMembersStatus.length >= 2 && teamsMembersStatus.length <= 3) {
          localStorage.setItem("ideaSubStatus", teamsMembersStatus[0].idea_submission);
          if (Array.isArray(teamsMembersStatus)) {
            let anyCompleted = false;
            
            // Loop over each record in data
            teamsMembersStatus.forEach(record => {
              let percent = 100 - percentageBWNumbers(record.all_topics_count, record.topics_completed_count);
              
              // If any student has completed 100%, set anyCompleted to true
              if (percent === 100) {
                anyCompleted = true;
              }
            });
            const ideaStatus = anyCompleted ? 1 : 0;
            // localStorage.setItem("ideaenablestatus", ideaStatus);
            setIdeaEnableStatus(ideaStatus); 
            // Enable idea submission if at least one student has completed 100%
            // localStorage.setItem("ideaenablestatus", anyCompleted ? 1 : 0);
          }
        //   setStuInstructionsLoading(false);
        }
      }, [teamsMembersStatus]);
    
    //   console.log("Idea enable status:", ideaEnableStatus);
    const handleNext = () => {
        navigate('/idea');
    };

    const handleideaenable = () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-submit',
            },
            buttonsStyling: false
        });
      
        swalWithBootstrapButtons
            .fire({
                title: "<h4>Oops..! Idea submission not enabled?</h4>",
                // text: "You can access idea submission only after all your teammates complete course.",
                text:"You can access idea submission as long as at least one of your teammates has completed the course.",

                imageUrl: `${logout}`,
                confirmButtonText: 'Ok',
            });
        };

    // const pdfFileURL =
    //     'https://s3.ap-south-1.amazonaws.com/aim1.0-bkt-cba6e2a/resources/stage/Final_Themes_AIM.pdf';
    return (
        <div className='page-wrapper'>
      <div className='content'>
            <div className="courses-page">
                <div
                    className="container-fluid"
                >
                    <Row>
                        <Col
                            xl={12}
                        >
                            <Fragment>
                                <Card className="course-sec-basic p-4">
                                    <CardTitle className="text-center">
                                        <h3
                                            style={{
                                                color: 'orange',
                                            }}
                                        >
                                            {' '}
                                            {t('idea_page.main')}{' '}
                                        </h3>
                                    </CardTitle>
                                    <CardBody>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: t(
                                                    'student_course.idea_ins_note'
                                                )
                                            }}
                                        ></div>

                                        <div className="text-right">
                                            {/* <a
                                                href={pdfFileURL}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="primary"
                                            >
                                                <Button
                                                    label={t(
                                                        'student.download_theme'
                                                    )}
                                                    btnClass="primary mt-4 mx-4 "
                                                    size="small"
                                                />
                                            </a> */}
                                            {ideaEnableStatus ==1 ? 
                                            (
                                                <Button
                                                    label={t('idea_page.next')}
                                                    btnClass="primary mt-4 mx-4"
                                                    size="small"
                                                    onClick={handleNext}
                                                />
                                            ) : (
                                                <button onClick={handleideaenable} className='btn btn-secondary'>{t('idea_page.next')}</button>
                                            )}
                                            
                                        </div>
                                    </CardBody>
                                </Card>
                            </Fragment>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
        </div>
    );
};

export default InstructionsPage;
