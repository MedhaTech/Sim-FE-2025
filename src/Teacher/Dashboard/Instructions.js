/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import { ArrowLeft } from "feather-icons-react/build/IconComponents";
import React, { useEffect,useState }  from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEditorState } from "react-simple-wysiwyg";
import { getCurrentUser, getNormalHeaders } from "../../helpers/Utils";
import { encryptGlobal } from "../../constants/encryptDecrypt";
import { getLanguage } from "../../constants/languageOptions";
import axios from "axios";

const InstructionsTeacher = () => {
const location = useLocation();
const { instruction } = location.state || {};
// console.log(instruction,"instruction");
  const { t } = useTranslation();
  const currentUser = getCurrentUser("current_user");
    const language = localStorage.getItem("m_language");
  const [whatsappLink, setWhatsappLink] = useState("");
    const [message, setMessage] = useState("");
  
  useEffect(()=>{
 fetchwhatsapplink();
  },[language]);
    const fetchwhatsapplink = () => {
      // Function to fetch the WhatsApp link from the API
   const locale = getLanguage(JSON.parse(language));
      const statenameApi = encryptGlobal(
        JSON.stringify({
          state_name: currentUser?.data[0]?.state,
          locale,
        })
      );
      var config = {
        method: "get",
        url:
          process.env.REACT_APP_API_BASE_URL +
          `/dashboard/whatappLink?Data=${statenameApi}`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${currentUser.data[0]?.token}`,
        },
      };
      axios(config)
        .then(function (response) {
          if (response.status === 200) {
            setWhatsappLink(response.data.data[0].whatapp_link);
            setMessage(response.data.data[0].mentor_note);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
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
            <div dangerouslySetInnerHTML={{ __html: message }} />
        </div>

        </div>
    </div>
    );
};

export default InstructionsTeacher;