/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, {  useLayoutEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { Link, useLocation } from "react-router-dom";
import  SidebarData  from "../../core/json/siderbar_data";
import { getCurrentUser } from "../../helpers/Utils";
import { encryptGlobal } from "../../constants/encryptDecrypt";
import axios from "axios";

const Sidebar = () => {
  const Location = useLocation();
  const currentUser = getCurrentUser("current_user");
  const role = currentUser?.data[0]?.role;
  const [subOpen, setSubopen] = useState("");
  const [subsidebar, setSubsidebar] = useState("");
const [condition,setCondition]=useState("");
 
 useLayoutEffect(()=>{

  if(currentUser.data[0].user_id){
    SurveyStatus(currentUser.data[0].user_id);
  }
 },[currentUser.data[0].user_id]);
 const SurveyStatus = (id) => {
               // This function fetches student survey status from the API //

  const surveyApi = encryptGlobal(
      JSON.stringify({
          user_id: id
      })
  );
  var config = {
      method: 'get',
      url:
          process.env.REACT_APP_API_BASE_URL +
          `/dashboard/stuPrePostStats?Data=${surveyApi}`,
      headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${currentUser.data[0]?.token}`
      }
  };
  axios(config)
      .then(function (response) {
          if (response.status === 200) {
              setCondition(response?.data?.data[0].pre_survey_completed_date);
              
          }
      })
      .catch(function (error) {
          console.log(error);
      });
  };


  const filterByRole = (items, role) => {
    if (!items) return [];
    return items.filter((item) => !item.role || item.role === role);
  };
  const toggleSidebar = (title) => {
    if (title === subOpen) {
      setSubopen("");
    } else {
      setSubopen(title);
    }
  };

  const toggleSubsidebar = (subitem) => {
    if (subitem === subsidebar) {
      setSubsidebar("");
    } else {
      setSubsidebar(subitem);
    }
  };

  return (
    <div>
      <div className="sidebar" id="sidebar">
        <Scrollbars>
          <div className="sidebar-inner slimscroll">
            <div id="sidebar-menu" className="sidebar-menu">
              <ul>
                {SidebarData.filter(
                  (item) => !item.role || item.role === role
                ).map((mainLabel, index) => (
                  <li className="submenu-open" key={index}>
                    <h6 className="submenu-hdr">{mainLabel?.label}</h6>
                    <ul>
                      {filterByRole(mainLabel?.submenuItems, role).map(
                        (title, i) => {
                          let link_array = [];
                          filterByRole(title?.submenuItems, role).forEach(
                            (link) => {
                              link_array.push(link?.link);
                              if (link?.submenu) {
                                filterByRole(link?.submenuItems, role).forEach(
                                  (item) => {
                                    link_array.push(item?.link);
                                  }
                                );
                              }
                            }
                          );
                          title.links = link_array;

                          return (
                            <React.Fragment key={i}>
                              <li
                                className={`submenu ${
                                  !title?.submenu &&
                                  Location.pathname === title?.link
                                    ? "custom-active-hassubroute-false"
                                    : ""
                                }`}
                              >
                                <Link
                                  to={title?.link}
                                  onClick={() => toggleSidebar(title?.label)}
                                  className={`${
                                    subOpen === title?.label ? "subdrop" : ""
                                  } ${
                                    title?.links?.includes(Location.pathname)
                                      ? "active"
                                      : ""
                                  }`}
                                >
                                  {title?.icon}
                                  <span className="custom-active-span">
                                    {title?.label}
                                  </span>
                                  {title?.submenu && (
                                    <span className="menu-arrow" />
                                  )}
                                </Link>
                                <ul
                                  style={{
                                    display:
                                      subOpen === title?.label
                                        ? "block"
                                        : "none",
                                  }}
                                >
                                  {filterByRole(title?.submenuItems, role).map(
                                    (item, titleIndex) => (
                                      <li
                                        className="submenu submenu-two"
                                        key={titleIndex}
                                      >
                                        <Link
                                          to={item?.link}
                                          className={`${
                                            item?.submenuItems
                                              ?.map((link) => link.link)
                                              .includes(Location.pathname) ||
                                            item?.link === Location.pathname
                                              ? "active"
                                              : ""
                                          } ${
                                            subsidebar === item?.label
                                              ? "subdrop"
                                              : ""
                                          }`}
                                          onClick={() =>
                                            toggleSubsidebar(item?.label)
                                          }
                                        >
                                          {item?.label}
                                          {item?.submenu && (
                                            <span className="menu-arrow inside-submenu" />
                                          )}
                                        </Link>
                                        <ul
                                          style={{
                                            display:
                                              subsidebar === item?.label
                                                ? "block"
                                                : "none",
                                          }}
                                        >
                                          {filterByRole(
                                            item?.submenuItems,
                                            role
                                          ).map((items, subIndex) => (
                                            <li key={subIndex}>
                                              <Link
                                                to={items?.link}
                                                className={`${
                                                  subsidebar === items?.label
                                                    ? "submenu-two subdrop"
                                                    : "submenu-two"
                                                } ${
                                                  items?.submenuItems
                                                    ?.map((link) => link.link)
                                                    .includes(
                                                      Location.pathname
                                                    ) ||
                                                  items?.link ===
                                                    Location.pathname
                                                    ? "active"
                                                    : ""
                                                }`}
                                              >
                                                {items?.label}
                                              </Link>
                                            </li>
                                          ))}
                                        </ul>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </li>
                            </React.Fragment>
                          );
                        }
                      )}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Scrollbars>
      </div>
    </div>
  );
};

export default Sidebar;
