/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState,useMemo ,useEffect} from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { Link, useLocation, } from "react-router-dom";
import  getStateSidebarData  from "../../core/json/state";
// import  getCooSidebarData  from "../../core/json/state";
import {
  getCurrentUser,
} from "../../helpers/Utils";
import HorizontalSidebar from "./horizontalSidebar";
import CollapsedSidebar from "./collapsedSidebar";
// import * as Icon from "react-feather";
import * as Icon from "react-icons/fi"; 
const Sidebar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const Location = useLocation();
  const [subOpen, setSubopen] = useState("");
  const [subsidebar, setSubsidebar] = useState("");
  useEffect(() => {
    const user = getCurrentUser("current_user");
    if (user) {
      setCurrentUser(user);
    }
    // console.log(user,"user");
  }, []);
  const toggleSidebar = (title) => {
    if (title == subOpen) {
      setSubopen("");
    } else {
      setSubopen(title);
    }
  };

  const toggleSubsidebar = (subitem) => {
    if (subitem == subsidebar) {
      setSubsidebar("");
    } else {
      setSubsidebar(subitem);
    }
  };
  // const SidebarData = useMemo(() => getStateSidebarData(), []);

  const SidebarData = useMemo(() => {
    const sidebarData = getStateSidebarData();

    let submenuItems = sidebarData[0]?.submenuItems || [];

    if (currentUser?.data[0]?.state_name === "Tamil Nadu") {
      if (!submenuItems.some(item => item.label === "Institutions Report")) {
        submenuItems.push({
          label: "Institutions Report",
          link: "/state-institution-report",
          icon: <Icon.FiCodesandbox />,
          showSubRoute: false,
          submenu: false,
        });
      }
    } else {
      submenuItems = submenuItems.filter(
        item => item.label !== "Institutions Report"
      );
    }

    sidebarData[0].submenuItems = submenuItems;

    return sidebarData;
  }, [currentUser]);
  // const SidebarData = useMemo(() => {
  //   const sidebarData = getStateSidebarData();

   
  //   if (currentUser && currentUser.data[0]?.state_name === "Tamil Nadu") {
  //     sidebarData[0].submenuItems.push({
  //       label: "Institutions Report",
  //       link: "/state-institution-report",
  //       icon: <Icon.FiCodesandbox />,
  //       showSubRoute: false,
  //       submenu: false,
  //     });
  //   }

  //   return sidebarData;
  // }, [currentUser]);
  // console.log(SidebarData,"data");
  return (
    <div>
      <div className="sidebar " id="sidebar">
        <Scrollbars>
          <div className="sidebar-inner slimscroll">
            <div id="sidebar-menu" className="sidebar-menu">
              <ul>
                {SidebarData?.map((mainLabel, index) => (
                  <li className="submenu-open" key={index}>
                    <h6 className="submenu-hdr">{mainLabel?.label}</h6>
                    <ul>
                      {mainLabel?.submenuItems?.map((title, i) => {
                        let link_array = [];
                        title?.submenuItems?.map((link) => {
                          link_array.push(link?.link);
                          if (link?.submenu) {
                            link?.submenuItems?.map((item) => {
                              link_array.push(item?.link);
                            });
                          }
                          return link_array;
                        });
                        title.links = link_array;
                        return (
                          <React.Fragment key={i}>
                            {" "}
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
                                    subOpen === title?.label ? "block" : "none",
                                }}
                              >
                                {title?.submenuItems?.map(
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
                                        {item?.submenuItems?.map(
                                          (items, subIndex) => (
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
                                          )
                                        )}
                                      </ul>
                                    </li>
                                  )
                                )}
                              </ul>
                            </li>
                          </React.Fragment>
                        );
                      })}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Scrollbars>
      </div>
      <HorizontalSidebar />
      <CollapsedSidebar />
    </div>
  );
};

export default Sidebar;
