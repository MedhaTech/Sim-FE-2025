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

// import Layout from '../../Layout';

const InstructionsPage = (props) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const ideaenableornot = localStorage.getItem("ideaenablestatus");
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
                text: "You can access idea submission only after all your teammates complete course.",
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
                                            {ideaenableornot==1 ? 
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
