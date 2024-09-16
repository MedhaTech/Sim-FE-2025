/* eslint-disable no-undef */
/* eslint-disable indent */
import { notification } from "antd";
import { userLogout } from "../Admin/store/admin/actions";
// import Swal from "sweetalert2/dist/sweetalert2.js";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

export const getCurrentUser = () => {
  let user = null;
  try {
    user =
      localStorage.getItem("current_user") != null
        ? JSON.parse(localStorage.getItem("current_user"))
        : null;
  } catch (error) {
    console.log(">>>>: src/helpers/Utils.js  : getCurrentUser -> error", error);
    user = null;
  }
  return user;
};

export const setCurrentUser = (user) => {
  try {
    if (user) {
      localStorage.setItem("current_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("current_user");
    }
  } catch (error) {
    console.log(">>>>: src/helpers/Utils.js : setCurrentUser -> error", error);
  }
};

export const getNormalHeaders = (apiKey) => {
  // it receive api_key argument if not it will assign null to it.
  const loginUser = getCurrentUser();
  let axiosConfig = {};
  if (loginUser) {
    axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loginUser.data[0].token}`,
      },
    };
  } else {
    axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-api-key": apiKey,
        Authorization: apiKey,
      },
    };
  }
  return axiosConfig;
};

export const openNotificationWithIcon = (type, msg, des) => {
  notification[type]({
    message: msg,
    description: des,
  });
};

export const compareDates = (filterDate) => {
  const date = moment().format("yyyy-MM-DD");
  return (
    moment(date).isSameOrAfter(filterDate.start_date) &&
    moment(date).isSameOrBefore(filterDate.end_date)
  );
};
export const logout = (navigate, t, module, dispatch) => {
  const MySwal = withReactContent(Swal);
  MySwal.fire({
    title:  t('general_req.attempt_logout'),
    text:  t('general_req.are_you_sure'),
    showCancelButton: true,
    confirmButtonColor: "#00ff00",
    confirmButtonText: t('general_req.btn_logout'),
    cancelButtonColor: "#ff0000",
    cancelButtonText:  t('general_req.btn_cancel'),
  }).then((result) => {
    if (result.isConfirmed) {
      if (result.isConfirmed) {
        if (dispatch) dispatch(getlogout());
        localStorage.clear();
        if (module) localStorage.removeItem("module");
        if (dispatch) dispatch(userLogout());
        switch (module) {
          case "EVALUATOR":
            navigate("/evaluator");
            break;
          case "ADMIN":
            navigate("/admin");
            break;
          case "EADMIN":
            navigate("/eadmin");
            break;
          case "REPORT":
            navigate("/report");
            break;
          case "TEAM":
            navigate("/team");
            break;
          case "STATE":
            navigate("/state");
            break;
          default:
            navigate("/");
        }
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      MySwal.fire(  t('general_req.cancelled'),
      t('general_req.logged_in'), "error");
    }
  });
};
