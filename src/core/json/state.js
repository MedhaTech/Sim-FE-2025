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
    label: "Reports",
    submenuOpen: true,
    // link: "/state-reports",

    showSubRoute: false,
    submenuHdr: "Reports",
    role: "STATE",
    submenuItems: [
      {
        label: "Institutions",
        link: "/institution-report",
        icon: <Icon.Codesandbox />,
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "Registration",
        link: "/state-registration",
        icon: <Icon.Box />,
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "School Progress",
        link: "/school-report",
        icon: <Icon.PlusSquare />,
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "Students Progress",
        link: "/studentcoo-report",
        icon: <Icon.Codesandbox />,
        showSubRoute: false,
        submenu: false,
      },
     
    ],
  },
    
       
      ],
    },
   
  ]
);
};

export default StateSidebarData;
