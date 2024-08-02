/* eslint-disable indent */
import React from "react";

import * as Icon from "react-feather";

const AdminSidebarData = () => {
 

  return( [
    {
      label:"Admin",
      submenuOpen: true,
      showSubRoute: false,
      submenuHdr: "Inventory",
      submenuItems: [
        {
          label: "Admin Dashboard",
          link: "/admin-dashboard",
          icon: <Icon.Box />,
          showSubRoute: false,
          submenu: false,
        },
        {
          label:"Users",
          // link: "/idea",
          icon: <Icon.PlusSquare />,
          showSubRoute: false,
          submenu: false,
        },
        {
          label:"Institution",
          // link: "/studentresource",
          icon: <Icon.Codesandbox />,
          showSubRoute: false,
          submenu: false,
        },
      ],
    },
   
  ]
);
};

export default AdminSidebarData;
