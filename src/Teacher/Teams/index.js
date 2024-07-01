/* eslint-disable indent */
import React from "react";
import { Link } from "react-router-dom";

// import { all_routes } from "../../Router/all_routes";
import { PlusCircle } from "feather-icons-react/build/IconComponents";
const Dashboard = () => {
  // const route = all_routes;

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-btn">
            <Link to="/createteam" className="btn btn-added btn-primary">
              <PlusCircle className="me-2" />
              Add Team & Students
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
