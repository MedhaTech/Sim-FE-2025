/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React ,{ useState, useEffect,  } from "react";

import * as Icon from "react-feather";
import { useTranslation } from "react-i18next";
import { label } from "yet-another-react-lightbox";

import { encryptGlobal } from '../../constants/encryptDecrypt';
import { getCurrentUser } from '../../helpers/Utils';
import axios from 'axios';

const SidebarData = () => {
  const currentUser = getCurrentUser('current_user');
 
  const { t, i18n } = useTranslation();
  useEffect(() => {
    const localLang = JSON.parse(localStorage.getItem('s_language'));
    if (localLang && localLang.code) {
      i18n.changeLanguage(localLang.code);  
    }
  }, [i18n]);
  const TeamId = currentUser?.data[0]?.team_id;
  const [link, setLink] = useState('/instruction');
  const submittedApi = () => {
               // This function fetches idea submission details from the API //

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
      label:"Team",
      submenuOpen: true,
      showSubRoute: false,
      submenuHdr: "Inventory",
      role: "TEAM",
      submenuItems: [
        {
          label: "Team Dashboard",
          link: "/team-dashboard",
          icon: <Icon.Grid />,
          showSubRoute: false,
          role: "TEAM",
          submenu: false,
        },
        {
          label:"Resources",
          link: "/studentresource",
          icon: <Icon.FilePlus />,
          role: "TEAM",
          showSubRoute: false,
          submenu: false,
        },
      ],
    },
    {
      label: t("home.student"),

      submenuOpen: true,
      showSubRoute: false,
      submenuHdr: "Inventory",
      role: "STUDENT",
      submenuItems: [
        {
          label: t("home.pre_survey"),

          link: "/studentpresurvey",
          icon: <Icon.Edit />,
          showSubRoute: false,
          submenu: false,
        },
        {
          label: t("home.dashboard"),

          link: "/student-dashboard",
          icon: <Icon.Grid />,
          showSubRoute: false,
          role: "STUDENT",
          submenu: false,
        },
        {
          label: t("home.courses"),

          link: `/studentcourse/${1}`,
          icon: <Icon.Monitor />,
          showSubRoute: false,
          submenu: false,
        },
        
        {
          label: t("home.idea_submission"),

          link: link,
          icon: <Icon.Send />,
          role: "STUDENT",
          showSubRoute: false,
          submenu: false,
        },
        {
          label: t("home.post_survey"),

          link: "/studentpostsurvey",
          icon:<Icon.Edit3 />,
          role: "STUDENT",
          showSubRoute: false,
          submenu: false,
        },
        {
          label: t("home.resources"),

          link: "/studentresource",
          icon: <Icon.FilePlus />,
          role: "STUDENT",
          showSubRoute: false,
          submenu: false,
        },
        { 
          label: t("home.my_certificate"),
          link: "/certificate",
          icon: <Icon.Tag />,
          role: "STUDENT",
          showSubRoute: false,
          submenu: false,
        },
        {
          label: t("home.badges"),
          link:"/badges",
          icon: <Icon.Shield />,
          role: "STUDENT",
          showSubRoute: false,
          submenu: false,
        },
      ],
    },
  ]
);
};

export default SidebarData;
