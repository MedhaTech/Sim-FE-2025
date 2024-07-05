/* eslint-disable indent */
import React, { useState } from "react";
//import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import Table from "../../core/pagination/datatable";
//import { ArrowRight } from "react-feather";
import { FaUsers } from 'react-icons/fa';
////////////////////New Code//////////////////////////
import { getCurrentUser } from '../../helpers/Utils';
import axios from 'axios';

import { useEffect } from 'react';
import {
    FaCheckCircle,
    // FaDownload,
    // FaHourglassHalf,
    FaTimesCircle
} from 'react-icons/fa';
import { encryptGlobal } from '../../constants/encryptDecrypt';
import { getTeamMemberStatus } from '../store/teams/actions';
import { Progress } from 'reactstrap';



const TeamsProgDD = ({user}) => {
  
    //////////////New Code/////////////////////////
    const dispatch = useDispatch();
    const currentUser = getCurrentUser('current_user');
    const { teamsMembersStatus, teamsMembersStatusErr } = useSelector(
        (state) => state.teams
    );
    const [teamId, setTeamId] = useState(null);
    const [mentorid, setmentorid] = useState('');
    const [showDefault, setshowDefault] = useState(true);
    useEffect(() => {
        if(teamId){
            dispatch(getTeamMemberStatus(teamId, setshowDefault));
            //dispatch(getStudentChallengeSubmittedResponse(teamId));
        }
    }, [teamId, dispatch]);
    const percentageBWNumbers = (a, b) => {
        return (((a - b) / a) * 100).toFixed(2);
    };
    useEffect(() => {
        if (user) {
            setmentorid(user[0].mentor_id);
        }
    }, [user]);
    const [teamsList, setTeamsList] = useState([]);
    useEffect(() => {
        if (mentorid) {
            setshowDefault(true);
            teamNameandIDsbymentorid(mentorid);
        }
    }, [mentorid]);

    const teamNameandIDsbymentorid = (mentorid) => {
        const teamApi = encryptGlobal(
            JSON.stringify({
                mentor_id: mentorid
            })
        );
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/teams/namebymenterid?Data=${teamApi}`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setTeamsList(response.data.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'full_name',
            width: '15rem'
        },
        {
            title: 'Pre Survey',
            dataIndex: 'pre_survey_status',
            align: 'center',
            width: '15rem',
            render: (_, record) =>
                record?.pre_survey_status ? (
                    <FaCheckCircle size={20} color="green" />
                ) : (
                    <FaTimesCircle size={20} color="red" />
                )
        },
        {
            title: 'Lesson Progress',
            dataIndex: 'address',
            align: 'center',
            width: '30rem',
            render: (_, record) => {
                let percent =
                    100 -
                    percentageBWNumbers(
                        record.all_topics_count,
                        record.topics_completed_count
                    );
                return (
                    <div className="d-flex">
                        <div style={{ width: '80%' }}>
                            <Progress
                                key={'25'}
                                className="progress-height"
                                animated
                                color={
                                    percent
                                        ? percent <= 25
                                            ? 'danger'
                                            : percent > 25 && percent <= 50
                                            ? 'info'
                                            : percent > 50 && percent <= 75
                                            ? 'warning'
                                            : 'sucess'
                                        : 'danger'
                                }
                                value={percent}
                            />
                        </div>
                        <span className="ms-2">
                            {Math.round(percent) ? Math.round(percent) : '0'}%
                        </span>
                    </div>
                );
            }
        },
        {
            title: 'Idea Submission',
            dataIndex: 'idea_submission',
            align: 'center',
            width: '20rem',
            render: (_, record) =>
                record?.idea_submission ? (
                    <FaCheckCircle size={20} color="green" />
                ) : (
                    <FaTimesCircle size={20} color="red" />
                )
        },
        {
            title: 'Post Survey',
            dataIndex: 'post_survey_status',
            align: 'center',
            width: '10rem',
            render: (_, record) =>
                record?.post_survey_status ? (
                    <FaCheckCircle size={20} color="green" />
                ) : (
                    <FaTimesCircle size={20} color="red" />
                )
        },
        {
            title: 'Certificate',
            dataIndex: 'certificate',
            align: 'center',
            width: '10rem',
            render: (_, record) =>
                record?.certificate ? (
                    <FaCheckCircle size={20} color="green" />
                ) : (
                    <FaTimesCircle size={20} color="red" />
                )
        }
    ];

    
    const customer = teamsList.map((team) => ({
        value: team.team_id,
        label: team.team_name,
    }));

    const handleSelectChange = (selectedOption) => {
        setTeamId(selectedOption ? selectedOption.value : '');
    };

    
  return (
    <div>
        <div className="card table-list-card">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h4 className="card-title mb-0">Team Progress <FaUsers size={30} style={{ marginLeft:"6px"}} /> </h4>
                {/* <div className="dropdown">
                    <Link to="#" className="view-all d-flex align-items-center">
                    View
                    <span className="ps-2 d-flex align-items-center">
                        <ArrowRight className="feather-16" />
                    </span>
                    </Link>
                </div> */}
            </div>
            <div className="card-body">
                <div className="table-top">
                    <div className="search-set">
                        <div className="input-blocks">
                            <FaUsers className="info-img" />
                            <Select
                                className="img-select"
                                classNamePrefix="react-select"
                                options={customer}
                                placeholder="Choose a team"
                                onChange={handleSelectChange}
                                value={customer.find(option => option.value === teamId)}
                            />
                        </div>
                    </div>
                </div>
                <div className="table-responsive">
                    {showDefault && (
                        <div className="d-flex justify-content-center align-items-center">
                            <h4 className="text-primary">Select a Team to check SIM Progress</h4>
                        </div>
                    )}
                    {teamsMembersStatus.length > 0 && !showDefault ? (
                    <Table
                        //bordered
                        pagination={false}
                        dataSource={teamsMembersStatus}
                        columns={columns}
                    />
                    ) : teamsMembersStatusErr ? (
                        <div
                            className="d-flex justify-content-center align-items-center">
                            <h4 className="text-danger">
                                There are no students in selected Team
                            </h4>
                        </div>
                    ) : null}
                    
                </div>
            </div>
        </div>
    </div>
  );
};

export default TeamsProgDD;
