/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, Clock, Award } from 'react-feather'; // Feather Icons
import { FaRegCircle, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // React Icons
import { Link } from "react-router-dom";
import {FaHourglassHalf } from 'react-icons/fa';
import "./progress.css";
import { FiEdit } from "react-icons/fi";
import { FaRoute } from 'react-icons/fa';
import { FiEdit3 } from "react-icons/fi";

import { LuSend } from "react-icons/lu";
import { FaTv } from "react-icons/fa";
import { LiaCertificateSolid } from "react-icons/lia";
import { FaFlagCheckered } from "react-icons/fa";
import { BiLogoMicrosoftTeams } from "react-icons/bi";
import { PiStudentFill } from "react-icons/pi";
import { useTranslation } from "react-i18next";

    const MultiTeacher = ({ teamsCount, postdata, studentCount,courseData ,ideaCount,approveideaCount}) => {
           const { t } = useTranslation();
        
        const steps = [
            {
                name: t('teacherJourney.add1'),
                status: "Completed", 
                icon: <FaCheckCircle color="green" /> 
            },
            {
                name:  t('teacherJourney.add2'),
                status: teamsCount > 0  ? "Completed" : "Pending",
                icon: teamsCount > 0 ? <FaCheckCircle color="green" /> : <BiLogoMicrosoftTeams color="brown" />
            },
            {
                name:  t('teacherJourney.add3'),
                status: studentCount > 0 ? "Completed" : "Pending",
                icon: studentCount > 0 ? <FaCheckCircle color="green" /> : <PiStudentFill style={{ color: "purple" }} />
            },
            {
                name:  t('teacherJourney.add4'),
                status: courseData === "Completed" ? "Completed" : "Pending",
                icon: courseData === "Completed" ? <FaCheckCircle color="green" /> : <FaTv color="blue" />
            },
           
            {
                name:  t('teacherJourney.add5'),
                status: ideaCount === approveideaCount ? "Completed" : "Pending",
                icon: ideaCount === approveideaCount ? <FaCheckCircle color="green" /> : <LuSend color="orange" />
                            },
            {
                name:  t('teacherJourney.add6'),
                status: postdata === "Completed" ? "Completed" : "Pending",
                icon: postdata === "Completed" ? <FaCheckCircle color="green" /> : <FiEdit3 color="sky blue" />},
            {
                name:  t('teacherJourney.add7'),
                status: postdata === "Completed"&& ideaCount >= 1 ? "Completed" : "Disabled",
                icon: postdata === "Completed" && ideaCount >= 1 ? <FaFlagCheckered color="green" /> : <LiaCertificateSolid color="green" />
            },
        ];
    
    
    

    return (
         <div className="card flex-fill default-cover mb-4 latest-news-container" style={{ border: 'none', outline: 'none',boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
             
              <div className="card-body" >
              <div className="roadmap-container">
            {steps.map((step, index) => (
                <div key={step.name} className="roadmap-step">
                    <div className={`step-circle ${step.status === "Completed" ? "completed" : ""}`}>
                        {step.icon}
                    </div>
                    <div className="step-label">{step.name}</div>
                    {index < steps.length - 1 && (
                        <div className={`step-line ${step.status === "Completed" ? "completed-line" : ""}`} />
                    )}
                </div>
            ))}
        </div>
    </div>

    </div>

    
    );
};

export default MultiTeacher;
