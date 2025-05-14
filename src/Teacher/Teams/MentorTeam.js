/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Form, Label, Card } from "reactstrap";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { openNotificationWithIcon, getCurrentUser } from "../../helpers/Utils";
import { useDispatch } from "react-redux";
import { teacherCreateMultipleStudent } from "../store/teacher/actions";
import { useLocation } from "react-router-dom";
import { encryptGlobal } from "../../constants/encryptDecrypt";
import CreateMultipleMembers from "./CreateMultipleMembers";
import { useNavigate } from "react-router-dom";
import {teamLength} from "../../RegPage/ORGData";
import { useTranslation } from "react-i18next";

const studentBody = {
  full_name: "",
  Age: "",
  Grade: "",
  Gender: "",
  disability: "",
  // username: "",
};
const grades = [6, 7, 8, 9, 10, 11, 12];
const allowedAge = [10, 11, 12, 13, 14, 15, 16, 17, 18];



export const CreateTeamMember = (props) => {
  const loc = useLocation();
  const params = loc.pathname.split("/");
  const pl = params.length;
  const { t } = useTranslation();
  const id = params[pl - 2];
  const studentCount = params[pl - 1];
  const currentUser = getCurrentUser("current_user");
  const [teamMemberData, setTeamMemberData] = useState({});
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  const loginState=currentUser?.data[0]?.state;
  const getTeamLength = (loginState) => {
    return loginState === "Tamil Nadu" ? teamLength["Tamil Nadu"] : teamLength.default;
  };
  
  const teamLengthValue = getTeamLength(loginState);
  
  

  async function handleCreateMemberAPI(teamId) {
    const creaParam = encryptGlobal(JSON.stringify(teamId));
    const param = encryptGlobal(
      JSON.stringify({
        status: "ACTIVE",
      })
    );

    var config = {
      method: "get",
      url: `${process.env.REACT_APP_API_BASE_URL}/teams/${creaParam}?Data=${param}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.data[0]?.token}`,
      },
    };
    await axios(config)
      .then(function (response) {
        if (response.status === 200) {
          setTeamMemberData(response.data && response.data.data[0]);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const formik = useFormik({
    initialValues: {
      fullName: "",
      age: "",
      grade: "",
      gender: "",
      disability: "",
      // username: "",
    },

    validationSchema: Yup.object({
      fullName: Yup.string()
        .required("Please Enter valid Full Name")
        .max(40)
        .required()
        .matches(
          /^[A-Za-z0-9\s]*$/,
          "Please enter only alphanumeric characters"
        )
        .trim(),
      age: Yup.number()
        .integer()
        .min(10, "Min age is 10")
        .max(18, "Max age is 18")
        .required("required"),
      gender: Yup.string().required("Please select valid gender"),
      disability: Yup.string().required("Please select disability"),
      grade: Yup.string()
        .matches("", "Please enter valid class")
        .max(40)
        .required("Please enter valid class"),
    }),

    onSubmit: (values) => {
      if (process.env.REACT_APP_TEAM_LENGTH == teamMemberData.student_count) {
        openNotificationWithIcon(
          "warning",
          "Team Members Maximum Count All Ready Exist"
        );
      } else {
        setIsClicked(true);
        const body = {
          team_id: id,
          role: "STUDENT",
          full_name: values.fullName,
          qualification: "",
          Age: values.age,
          Grade: values.grade,
          Gender: values.gender,
          disability: values.disability,
          
        };
        var config = {
          method: "post",
          url: process.env.REACT_APP_API_BASE_URL + "/students/addStudent",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser?.data[0]?.token}`,
          },
          data: body,
        };
        axios(config)
          .then(function (response) {
            if (response.status === 201) {
              openNotificationWithIcon(
                "success",
                t('teacherJourney.popup1'),
              );
              navigate("/mentorteams");
            } else {
              openNotificationWithIcon("error", "Opps! Something Wrong");
              setIsClicked(false);
            }
          })
          .catch(function (error) {
            if (error.response.status === 406) {
              openNotificationWithIcon("error", error?.response?.data?.message);
            } else {
              openNotificationWithIcon("error", "Opps! Something Wrong");
            }
            setIsClicked(false);
          });
      }
    },
  });
  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
         
                {studentCount && studentCount !== "new" && (
                  <CreateMultipleMembers id={id} teamLengthValue={teamLengthValue} />
                
                )}
           
        </div>
      </div>
    </div>
  );
};
export default CreateTeamMember;

