/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React ,{ useState, useEffect,  } from "react";

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
import { encryptGlobal } from '../../constants/encryptDecrypt';
import { getCurrentUser } from '../../helpers/Utils';
import axios from 'axios';

const SidebarData = () => {
  const currentUser = getCurrentUser('current_user');
  const TeamId = currentUser?.data[0]?.team_id;
  const [link, setLink] = useState('/instruction');
  // const { t } = useTranslation();
  const submittedApi = () => {
    const Param = encryptGlobal(
      JSON.stringify({
        team_id: TeamId,
      })
    );
    var configidea = {
      method: "get",
      url:
        process.env.REACT_APP_API_BASE_URL +
        `/challenge_response/submittedDetails?Data=${Param}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${currentUser.data[0]?.token}`,
      },
    };
    axios(configidea)
      .then(function (response) {
        if (response.status === 200) {
          // console.log(response.data.data);
          if (response.data.data && response.data.data.length > 0) {
            const data = response.data.data[0];
            if (response.data.data[0].status === 'SUBMITTED') {
              setLink('/idea');
            } else {
              setLink('/instruction');
            } 

          } 
        } 
      })
      .catch(function (error) {
        if (error.response.status === 404) {
        //   seterror4( true);
        } 

      });
  };
useEffect(() => {
    submittedApi();
}, []);
 
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
        {
          label: "Idea Submission",
          link: link,
          icon: <Icon.PlusSquare />,
          role: "STUDENT",
          showSubRoute: false,
          submenu: false,
        },
        {
          label:"Post Survey",
          link: "/studentpostsurvey",
          icon:<Icon.Layers />,
          role: "STUDENT",
          showSubRoute: false,
          submenu: false,
        },
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
