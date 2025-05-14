/* eslint-disable indent */
import { ArrowLeft } from "feather-icons-react/build/IconComponents";
import React  from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const InstructionsStudent = () => {
const location = useLocation();
const { instruction } = location.state || {};

return (
    <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Student&apos;s SIM Road Map</h4>
                <h6>Know more about your role as a Student in School Innovation Marathon </h6>
              </div>
            </div>
            <ul className="table-top-head">
              <li>
              <div className="page-btn mb-2">
                <Link to="/student-dashboard" className="btn btn-added btn-secondary">
                  <ArrowLeft className="me-2" style={{color:"white"}} />
                  Back
                </Link>
              </div>
              </li>
            </ul>
          </div>

        <div>
            <h2 className="text-danger">Welcome Students!</h2><br/>
            <div dangerouslySetInnerHTML={{ __html: instruction }} />
        </div>

        </div>
    </div>
    );
};

export default InstructionsStudent;