/* eslint-disable indent */
import React from "react";

import * as Icon from "react-feather";
// import { useTranslation } from "react-i18next";
// import { label } from "yet-another-react-lightbox";
// export const SidebarData = [
  
//   {
//     label: "TEAM",
//     submenuOpen: true,
//     showSubRoute: false,
//     submenuHdr: "Inventory",
//     role: "TEAM",
//     submenuItems: [
//       {
//         label: "Team Dashboard",
//         link: "/team-dashboard",
//         icon: <Icon.Box />,
//         showSubRoute: false,
//         role: "TEAM",
//         submenu: false,
//       },
//       {
//         label: "Ideas Submission",
//         link: "/idea",
//         icon: <Icon.PlusSquare />,
//         role: "TEAM",
//         showSubRoute: false,
//         submenu: false,
//       },
//       {
//         label: "Resources",
//         link: "/studentresource",
//         icon: <Icon.Codesandbox />,
//         role: "TEAM",
//         showSubRoute: false,
//         submenu: false,
//       },
     
//     ],
//   },
//  {
//     label: "STUDENT",
//     submenuOpen: true,
//     showSubRoute: false,
//     submenuHdr: "Inventory",
//     role: "STUDENT",
//     submenuItems: [
//       {
//         label: "Pre Survey",


//         link: "/studentpresurvey",
//         icon: <Icon.Bookmark />,
//         showSubRoute: false,
//         submenu: false,
//       },
//       {
//         label: "Student Dashboard",
//         // label:  `${t('home.dashboard')}`,

//         link: "/student-dashboard",
//         icon: <Icon.Box />,
//         showSubRoute: false,
//         role: "STUDENT",
//         submenu: false,
//       },
//       {
//         label: "Course",
//         link: `/studentcourse/${1}`,
//         icon: <Icon.Speaker />,
//         showSubRoute: false,
//         submenu: false,
//       },
//       {
//         label: "Resources",
//         link: "/studentresource",
//         icon: <Icon.Codesandbox />,
//         role: "STUDENT",
//         showSubRoute: false,
//         submenu: false,
//       },

     
//       {
//         label: "Ideas Submission",
//         link: "/idea",
//         icon: <Icon.PlusSquare />,
//         role: "STUDENT",
//         showSubRoute: false,
//         submenu: false,
//       },
//       // {
//       //   label: "Idea Submission",
//       //   link: "/sub-categories",
//       //   icon: <Icon.Speaker />,
//       //   showSubRoute: false,
//       //   submenu: false,
//       // },
//       {
//         label: "Post Survey",
//         link: "/studentpostsurvey",
//         icon: <Icon.Tag />,
//         role: "STUDENT",
//         showSubRoute: false,
//         submenu: false,
//       },
//       {
//         label: "My Certificate",
//         link: "/certificate",
//         icon: <Icon.Tag />,
//         role: "STUDENT",
//         showSubRoute: false,
//         submenu: false,
//       },

//       // {
//       //   label: "Resources",
//       //   link: "/variant-attributes",
//       //   icon: <Icon.Layers />,
//       //   showSubRoute: false,
//       //   submenu: false,
//       // },
//       // {
//       //   label: "Translation",
//       //   link: "/warranty",
//       //   icon: <Icon.Codepen />,
//       //   showSubRoute: false,
//       //   submenu: false,
//       // },
//       // {
//       //   label: "Reports",
//       //   link: "/barcode",
//       //   icon: <Icon.AlignJustify />,
//       //   showSubRoute: false,
//       //   submenu: false,
//       // },
//       // {
//       //   label: "Print QR Code",
//       //   link: "/qrcode",
//       //   icon: <Icon.Maximize />,
//       //   showSubRoute: false,
//       //   submenu: false,
//       // },
//     ],
//   },

// ];
const SidebarData = () => {
  // const { t } = useTranslation();
  const presurvey = localStorage.getItem("stupresurveystatus") ;
  console.log(presurvey,"status");

  return( [
    {
      // label: t("team"),
      label:"Team",
      submenuOpen: true,
      showSubRoute: false,
      submenuHdr: "Inventory",
      role: "TEAM",
      submenuItems: [
        {
          label: "Team Dashboard",
          // label: t("team_dashboard"),
          link: "/team-dashboard",
          icon: <Icon.Box />,
          showSubRoute: false,
          role: "TEAM",
          submenu: false,
        },
        // {
        //   label:"Idea Submission",

        //   link: "/idea",
        //   icon: <Icon.PlusSquare />,
        //   role: "TEAM",
        //   showSubRoute: false,
        //   submenu: false,
        // },
        {
          label:"Resources",
          // label: t("resources"),

          link: "/studentresource",
          icon: <Icon.Codesandbox />,
          role: "TEAM",
          showSubRoute: false,
          submenu: false,
        },
      ],
    },
    {
      // label: t("student"),
      label: "Student",

      submenuOpen: true,
      showSubRoute: false,
      submenuHdr: "Inventory",
      role: "STUDENT",
      submenuItems: [
        {
          label:"PreSurvey",
          // label: t("pre_survey"),

          link: "/studentpresurvey",
          icon: <Icon.Bookmark />,
          showSubRoute: false,
          submenu: false,
        },
        {
          label:"Student Dashboard",
          link: "/student-dashboard",
          icon: <Icon.Box />,
          showSubRoute: false,
          role: "STUDENT",
          submenu: false,
        },
        {
          label:"Course",
          link: `/studentcourse/${1}`,
          icon: <Icon.Speaker />,
          showSubRoute: false,
          submenu: false,
        },
        {
          label: "Resources",
          link: "/studentresource",
          icon: <Icon.Codesandbox />,
          role: "STUDENT",
          showSubRoute: false,
          submenu: false,
        },
        // {
        //   label: "Idea Submission",
        //   link: "/idea",
        //   icon: <Icon.PlusSquare />,
        //   role: "STUDENT",
        //   showSubRoute: false,
        //   submenu: false,
        // },
        // {
        //   label:"Post Survey",
        //   link: "/studentpostsurvey",
        //   icon:<Icon.Layers />,
        //   role: "STUDENT",
        //   showSubRoute: false,
        //   submenu: false,
        // },
        // {
        //   label:"My Certificate",
        //   link: "/certificate",
        //   icon: <Icon.Tag />,
        //   role: "STUDENT",
        //   showSubRoute: false,
        //   submenu: false,
        // },
      ],
    },
  ]
);
};

export default SidebarData;
