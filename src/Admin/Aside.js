/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

// import DashboardIcon1 from "../assets/media/DashboardIcon1.png";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";
import { FaBars } from "react-icons/fa";
import "react-pro-sidebar/dist/css/styles.css";
import { useLocation } from "react-router-dom";
import Logo from "../assets/media/UPSHIFT_BLACK.png";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { logout } from "../helpers/Utils";

const Aside = ({ rtl, toggled, handleToggleSidebar }) => {
  const location = useLocation();
  const history = useHistory();
  const { t } = useTranslation();

  const [menuCollapse, setMenuCollapse] = useState(false);

  const menuIconClick = (val) => {
    setMenuCollapse(val);
  };

  useEffect(() => {
    if (location.pathname === "/admin/playvideo") {
      setMenuCollapse(true);
    }
  });
  const handleLogout = (e) => {
    logout(history, t, "ADMIN");
    e.preventDefault();
  };

  return (
    <ProSidebar
      rtl={rtl}
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
      collapsed={menuCollapse}
    >
      <SidebarHeader>
        <div className="sidebar-header header-comp sticky-top">
          <div className="d-flex logo-section" style={{ height: "5rem" }}>
            {/* <Link to={"/admin/dashboard"} exact className="d-flex">
              {menuCollapse ? (
                <img
                  src={SmallLogo}
                  alt="logo"
                  className="img-fluid img-close p-2"
                />
              ) : (
                <>
                  <img
                    src={Logo}
                    alt="logo"
                    className="img-fluid img-open w-100"
                  />
                </>
              )}
            </Link> */}
          </div>
        </div>
        <div className="closemenu" style={{ paddingRight: "1rem" }}>
          {/* changing menu collapse icon on click */}
          {menuCollapse ? (
            <FaBars onClick={() => menuIconClick(false)} />
          ) : (
            <FaBars onClick={() => menuIconClick(true)} />
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem
            // icon={<img src={DashboardIcon1} style={{ width: "20px" }} />}
            className={
              location.pathname === "/admin/dashboard" && "sidebar-active"
            }
          >
            <NavLink
              exact={true}
              to={"/admin/dashboard"}
              style={{
                color: "black !important",
                "--override-color": "black",
              }}
            >
              <span style={{ color: "var(--override-color)" }}>Dashboard</span>
            </NavLink>
          </MenuItem>

          <MenuItem
            // icon={
            //   <img
            //     src={logoutIcon}
            //     style={{ width: "20px" }}
            //     className="img-fluid"
            //     alt="report"
            //   />
            // }
            className={location.pathname === "" && "sidebar-active"}
          >
            <NavLink
              exact={true}
              onClick={handleLogout}
              to={""}
              style={{
                color: "black !important",
                "--override-color": "black",
              }}
            >
              <span style={{ color: "var(--override-color)" }}>Logout</span>
            </NavLink>
          </MenuItem>
        </Menu>
      </SidebarContent>
    </ProSidebar>
  );
};

export default Aside;
