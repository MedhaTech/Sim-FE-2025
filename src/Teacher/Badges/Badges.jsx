/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    CardImg,
    CardBody,
    //CardTitle
} from 'reactstrap';
import './style.scss';
import { Figure } from 'react-bootstrap';
import { getCurrentUser } from '../../helpers/Utils';
import axios from 'axios';
import { encryptGlobal } from '../../constants/encryptDecrypt';
const BadgesComp = () => {
    const [badges, setBadges] = useState();
    const currentUser = getCurrentUser('current_user');
    const badgesfetch = async () => {
        const fectchTecParam = encryptGlobal(JSON.stringify(currentUser?.data[0]?.user_id));
        const jkh = encryptGlobal(JSON.stringify({
            status: "ACTIVE"
        }));
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/mentors/${fectchTecParam}/badges?Data=${jkh}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${currentUser?.data[0]?.token}`,
                    },
                }
            );
            if (response.status === 200) {
                setBadges(response.data?.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        badgesfetch();
    }, []);
    return (
        <div className="page-wrapper">
            <div className="content">
                <div className="badges-page mt-5 mb-50">
                    <Container className=" mt-2 ">
                        <Row>
                            <Col md={12} className="w-100 d-block">
                                <h2 className="title mb-4">My Badges</h2>
                            </Col>
                        </Row>
                        <Row
                            className="myBadges equal mt-0 mb-50"
                            style={{ gap: '1.5rem' }}
                        >
                            {badges && badges.length > 0 && badges.map((badge, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="badgesCard  col-xs-12 col-sm-6  col-xl-2"
                                        style={{width:'15rem'}}
                                    >
                                        <Card className="badge-card" style={{ backgroundColor: `${badge?.mentor_status ? "" : "lightgrey"}` }}>
                                            <Figure className="w-100 text-center">
                                                <CardImg
                                                    alt={badge.icon}
                                                    src={process.env.REACT_APP_API_IMAGE_BASE_URL + badge?.icon}
                                                    style={{ width: '7.5rem',paddingTop:"1rem" }}
                                                />
                                            </Figure>
                                            <CardBody className="badge-name">
                                                {badge.name}
                                            </CardBody>
                                            {/* <CardBody>
                                                <CardSubtitle className="badge-date">
                                                EARNED ON:{' '}
                                                <span className="badge-time">
                                                    {badge?.student_status ? moment(badge?.student_status).format("DD MMM YYYY") :"Locked"}
                                                </span>
                                            </CardSubtitle>
                                            </CardBody> */}
                                        </Card>
                                    </div>
                                );
                            })}
                        </Row>
                    </Container>
                </div>
            </div></div>
    );
};

export default BadgesComp;
