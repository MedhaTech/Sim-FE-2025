/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../../helpers/Utils";
import "./LatestNewsScroll.css";
import { useTranslation } from "react-i18next";

import axios from "axios";
import newIcon from "../../assets/img/blinking_new.gif";
import { encryptGlobal } from "../../constants/encryptDecrypt";

import { GrAnnounce } from "react-icons/gr";
import { MdOutlineAttachFile } from "react-icons/md";
import { MdOutlineFileDownload } from "react-icons/md";
function LatestNews() {
  const currentUser = getCurrentUser("current_user");
    const { t } = useTranslation();
  const [news, setNews] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const togglePause = () => {
    setIsPaused(!isPaused);
  };
  useEffect(() => {
    // this function fetches latest news list from the API
    const fetchNews = async () => {
      let teacherParam = encryptGlobal(
        JSON.stringify({
          category: "student",
          state:currentUser?.data[0]?.state
        })
      );
      var config = {
        method: "get",
        url:
          process.env.REACT_APP_API_BASE_URL +
          `/latest_news?Data=${teacherParam}`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${currentUser.data[0]?.token}`,
        },
      };
      await axios(config)
        .then(function (response) {
          if (response.status === 200) {
            setNews(response.data.data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    fetchNews();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
    return { day, month };
  };
  
  
  return (
    <div className="card flex-fill default-cover mb-4 latest-news-container">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h4 className="card-title mb-0">
        <GrAnnounce size={30} />&nbsp;{t('teacherJourney.LatestNews')}
        </h4>
      </div>
      <div className="card-body">
        <div className="table-responsive dataview">
          <table className="table dashboard-recent-products">
            <thead></thead>
            <tbody
              className={`scrolling-container ${
                isPaused ? "paused" : ""
              } continuous-scroll-list  table-responsive dataview`}
              onMouseEnter={togglePause}
              onMouseLeave={togglePause}
            >
           
              {news?.map((item, index) => {
  const { day, month } = formatDate(item?.updated_at);
  return (
    <tr key={index}>
      <td className="productimgname d-flex align-items-start"
       style={{ overflowX: "hidden", whiteSpace: "normal", wordBreak: "break-word" }}>
        <div
          style={{
            width: "50px",
            textAlign: "center",
            marginRight: "10px",
            background: "#f0f0f0",
            borderRadius: "4px",
            padding: "5px 0",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ fontSize: "18px", fontWeight: "bold", color: "#000" }}>
            {day}
          </div>
          <div  style={{
    fontSize: "12px",
    fontWeight:"bold",
    backgroundColor: "rgb(0, 207, 232)",
    color: "#fff",
    padding: "3px 8px",
    borderRadius: "4px",
    display: "inline-block",
    marginTop: "2px",
  }}>{month}</div>
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 500 }}>{item?.details}</div>

          {item?.new_status != 0 && item?.new_status !== "" && (
            <img
              src={newIcon}
              style={{ width: "40px", marginLeft: "8px" }}
              alt="new"
            />
          )}

          {item?.file_name && (
            <a
              className="link-item m-2 p-2"
              href={item?.file_name}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MdOutlineFileDownload size={20} style={{ color: "black" }} />
            </a>
          )}

          {item?.url && (
            <a
              className="link-item"
              rel="noopener noreferrer"
              href={item?.url}
              target="_blank"
            >
              <MdOutlineAttachFile size={20} style={{ color: "rgb(0, 207, 232)" }} />
            </a>
          )}
        </div>
      </td>
    </tr>
  );
})}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default LatestNews;
