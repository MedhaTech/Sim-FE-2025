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
          icon: <Icon.Box />,
          showSubRoute: false,
          submenu: false,
        },
        {
          label: "School Registration Report",
          link: "/state-institution-report",
          icon: <Icon.Codesandbox />,
          showSubRoute: false,
          submenu: false,
        },
        {
          label: "Teacher Registration Report",
          link: "/state-registration",
          icon: <Icon.Layers />,
          showSubRoute: false,
          submenu: false,
        },
        {
          label: "Teacher Progress Report",
          link: "/school-report",
          icon: <Icon.PlusSquare />,
          showSubRoute: false,
          submenu: false,
        },
        {
          label: "Student Progress Report",
          link: "/studentcoo-report",
          icon: <Icon.Database />,
          showSubRoute: false,
          submenu: false,
        },
        {
          label: "Support",
          link: "/state-support",
          icon: <Icon.Bookmark />,
          showSubRoute: false,
          submenu: false,
        },
  //         {
  //   label: "Reports",
  //   submenuOpen: true,
  //   // link: "/state-reports",
  //   icon: <Icon.Bookmark />,
  //   showSubRoute: false,
  //   submenuHdr: "Reports",
  //   role: "STATE",
  //   submenuItems: [
  //     {
  //       label: "Institutions",
  //       link: "/institution-report",
  //       icon: <Icon.Codesandbox />,
  //       showSubRoute: false,
  //       submenu: false,
  //     },
     
     
  //   ],
  // },
    
       
      ],
    },
   
  ]
);
};

export default StateSidebarData;
