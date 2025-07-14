/* eslint-disable indent */
import React from "react";

import * as Icon from "react-feather";

const StateSidebarData = () => {
 

  return( [
    {
      label:"State Coordinator",
      submenuOpen: true,
      showSubRoute: false,
      submenuHdr: "Inventory",
      submenuItems: [
        {
          label: "State Dashboard",
          link: "/state-dashboard",
          icon: <Icon.Grid />,
          showSubRoute: false,
          submenu: false,
        },
         {
                  label: "Resource",
                  link: "/stateresources",
                  icon: <Icon.FilePlus />,
                  showSubRoute: false,
                  submenu: false,
                },
        {
          label: "School Registration Report",
          link: "/state-institution-report",
          icon: <Icon.Home />,
          showSubRoute: false,
          submenu: false,
        },
        {
          label: "Teacher Registration Report",
          link: "/state-registration",
          icon: <Icon.LogIn />,
          showSubRoute: false,
          submenu: false,
        },
        {
          label: "Teacher Progress Report",
          link: "/school-report",
          icon: <Icon.UserCheck />,
          showSubRoute: false,
          submenu: false,
        },
        {
          label: "Student Progress Report",
          link: "/studentcoo-report",
          icon: <Icon.TrendingUp />,
          showSubRoute: false,
          submenu: false,
        },
        {
          label: "Support",
          link: "/state-support",
          icon: <Icon.Inbox />,
          showSubRoute: false,
          submenu: false,
        },
 
    
       
      ],
    },
   
  ]
);
};

export default StateSidebarData;
