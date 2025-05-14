/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import { FaRegCircle, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // React Icons
import "./bar.css";
import { FiEdit } from "react-icons/fi";
import { FiEdit3 } from "react-icons/fi";
import { LuSend } from "react-icons/lu";
import { FaTv } from "react-icons/fa";
import { LiaCertificateSolid } from "react-icons/lia";
import { FaFlagCheckered } from "react-icons/fa";
    const MultiProgressBar = ({ predata, postdata, stuIdeaSub,courseData }) => {
        const steps = [
            {
                name: 'Pre Survey',
                status: predata === "Completed" ? "Completed" : "Pending",
                icon: predata === "Completed" ? <FaCheckCircle color="green" /> : <FiEdit color="orange" />
            },
            {
                name: 'Course',
                status: courseData === "Completed" ? "Completed" : "Pending",
                icon: courseData === "Completed" ? <FaCheckCircle color="green" /> : <FaTv color="blue" />
            },
            {
                name: 'Idea Submission',
                status: stuIdeaSub === "SUBMITTED" ? "Completed" : "Pending",
                icon: stuIdeaSub === "SUBMITTED" ? <FaCheckCircle color="green" /> : <LuSend color="orange" />
            },
            {
                name: 'Post Survey',
                status: postdata === "Completed" ? "Completed" : "Pending",
                icon: postdata === "Completed" ? <FaCheckCircle color="green" /> : <FiEdit3 color="sky blue" />
            },
            {
                name: 'Certificate',
                status: postdata === "Completed" && stuIdeaSub === "SUBMITTED" ? "Completed" : "Disabled",
                icon: postdata === "Completed"  && stuIdeaSub === "SUBMITTED" ? <FaFlagCheckered color="green" /> : <LiaCertificateSolid color="green" />
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

export default MultiProgressBar;
