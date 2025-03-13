/* eslint-disable indent */
import React from "react";

import * as Icon from "react-feather";

const AdminSidebarData = () => {
  return [
    {
      label: "Super Admin",
      submenuOpen: true,
      showSubRoute: false,
      submenuHdr: "Inventory",
      submenuItems: [
        {
          label: "Admin Dashboard",
          link: "/admin-dashboard",
          icon: <Icon.Grid />,
          showSubRoute: false,
          submenu: false,
        },
        {
          label: "Overall Schools",
          link: "/institution",
          icon: <Icon.Home />,
          showSubRoute: false,
          submenu: false,
        },

        {
          label: "PopUp",
          link: "/popup",
          icon: <Icon.Star />,
          showSubRoute: false,
          submenu: false,
        },
        {
          label: "Resource",
          link: "/adminresources",
          icon: <Icon.FilePlus />,
          showSubRoute: false,
          submenu: false,
        },
        {
          label: "Latest News",
          link: "/latest-news",
          icon: <Icon.Bell />,
          showSubRoute: false,
          submenu: false,
        },
        {
          label: "State Specific",
          link: "/state-wise",
          icon: <Icon.Settings />,
          showSubRoute: false,
          submenu: false,
        },
        {
          label: "Support",
          link: "/admin-support",
          icon: <Icon.Inbox />,
          showSubRoute: false,
          submenu: false,
          permission: "SUPPORT",
        },
        {
          label: "Mentors",
          link: "/mentors",
          icon: <Icon.Users />,
          showSubRoute: false,
          submenu: false,
        },
        {
          label: "Teams",
          link: "/teams",
          icon: <Icon.UserPlus />,
          showSubRoute: false,
          submenu: false,
        },
        {
          label: "Students",
          link: "/students",
          icon: <Icon.UserCheck />,
          showSubRoute: false,
          submenu: false,
        },
        {
          label: "Admins",
          link: "/admins",
          icon: <Icon.User />,
          showSubRoute: false,
          submenu: false,
        },
        {
          label: "Reports",
          link: "/reports",
          icon: <Icon.Database />,
          showSubRoute: false,
          submenu: false,
        },
       
        {
          label: "Bulk Email",
          link: "/emailList",
          icon: <Icon.Mail />,
          showSubRoute: false,
          submenu: false,
        }
      ],
    },
  ];
};

export default AdminSidebarData;
