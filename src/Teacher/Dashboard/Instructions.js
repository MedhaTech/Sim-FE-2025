/* eslint-disable indent */
import { ArrowLeft } from "feather-icons-react/build/IconComponents";
import React  from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const InstructionsTeacher = () => {
const location = useLocation();
const { instruction } = location.state || {};
// console.log(instruction,"instruction");
  const { t } = useTranslation();

return (
    <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4> {t("teacherJourney.headings2")}</h4>
                <h6>{t("teacherJourney.headings1")}</h6>
              </div>
            </div>
            <ul className="table-top-head">
              <li>
              <div className="page-btn mb-2">
                <Link to="/teacher-dashboard" className="btn btn-added btn-secondary">
                  <ArrowLeft className="me-2" style={{color:"white"}} />
                   {t("teacher_teams.back")}
                </Link>
              </div>
              </li>
            </ul>
          </div>

        <div>
            <h2 className="text-danger">{t("teacherJourney.headings")}</h2>
            <div dangerouslySetInnerHTML={{ __html: instruction }} />
        </div>

        </div>
    </div>
    );
};

export default InstructionsTeacher;