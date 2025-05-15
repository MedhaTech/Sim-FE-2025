/* eslint-disable no-unused-vars */
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
import { useTranslation } from "react-i18next";

import { encryptGlobal } from '../../constants/encryptDecrypt';
const BadgesComp = () => {
     const { t } = useTranslation();
    const [badges, setBadges] = useState();
    const currentUser = getCurrentUser('current_user');
    const badgesfetch = async () => {
        // This function fetches badges of mentor from the API //

        const fectchTecParam = encryptGlobal(JSON.stringify(currentUser?.data[0]?.user_id));
        const dataquery = encryptGlobal(JSON.stringify({
            status: "ACTIVE",
            mentor_id:currentUser?.data[0]?.mentor_id
        }));
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/mentors/${fectchTecParam}/badges?Data=${dataquery}`,
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
    const dataOf = ["Enables after creating 5 teams" ,
        "Enables after creating 10 teams",
        "Enables after all teams submit IDEAS",
        "Enables after you win all 3 badges"];
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
                                <h4 className="title mb-4"> {t('teacherJourney.badge')}</h4>
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
                                            <b>{badge.name}</b>
                                                <br/>
                                                <br/>
                                                {dataOf[i]}
                                            </CardBody>
                                            
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
