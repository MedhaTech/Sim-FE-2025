/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import "../PostSurvey/style.scss";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
// import { Button } from '../../stories/Button';
import { useFormik } from "formik";
// import Layout from "../Layout";
import { URL, KEY } from "../../constants/defaultValues";
import {
  getNormalHeaders,
  openNotificationWithIcon,
} from "../../helpers/Utils";
import { encryptGlobal } from "../../constants/encryptDecrypt";
import axios from "axios";
import Congo from "../../assets/img/survey-success.jpg";
import getStart from "../../assets/img/survey-success.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getTeacherPresurveyStatus } from "../store/mentors/actions";
import { getLanguage } from "../../constants/languageOptions";
import { Modal } from "react-bootstrap";
import { getCurrentUser } from "../../helpers/Utils";

const PreSurvey = () => {
  // here we can start the presurvey journey //
  // here we can attempt all the questions //
  const { t } = useTranslation();
  const preSurveyStatus = useSelector(
    (state) => state?.mentors.teacherPresurveyStatus
  );
  // console.log(preSurveyStatus, "status");
  const language = useSelector(
    (state) => state?.studentRegistration?.studentLanguage
  );
  const quizSurveyId = useSelector((state) => state?.mentors.quizSurveyId);
  const preSurveyList = useSelector((state) => state?.mentors.preSurveyList);
  console.log(preSurveyList, "List");
  const [show, setShow] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const [answerResponse, setAnswerResponse] = useState([]);
  const [showsPopup, setShowsPopup] = useState(false);
  const currentUser = getCurrentUser("current_user");
  const [imgUrl, setImgUrl] = useState("");

  const dispatch = useDispatch();

  const filterAnswers = (questionId) => {
    const data =
      answerResponse &&
      answerResponse.length > 0 &&
      answerResponse.filter(
        (item) => item.quiz_survey_question_id == questionId
      );
    return data && data.length > 0 && data[0].selected_option
      ? data[0].selected_option
      : "";
  };

  const handleOnChange = (e) => {
    let newItems = [...answerResponse];
    let obj = {
      quiz_survey_question_id: e.target.name,
      selected_option:
        e.target.type === "checkbox" ? [e.target.value] : e.target.value,
    };
    const findExistanceIndex = newItems.findIndex(
      (item) =>
        parseInt(item?.quiz_survey_question_id) === parseInt(e.target.name)
    );
    if (findExistanceIndex === -1) {
      newItems.push(obj);
    } else {
      let temp = newItems[findExistanceIndex];
      if (e.target.type === "checkbox") {
        let options = [...temp.selected_option];
        let indexOfCheckedAnswers = options.indexOf(e.target.value);
        if (e.target.checked && indexOfCheckedAnswers === -1) {
          options.push(e.target.value);
        } else {
          options.splice(indexOfCheckedAnswers, 1);
        }
        newItems[findExistanceIndex] = {
          ...temp,
          selected_option: options,
        };
      } else {
        if (e.target.value === "") {
          newItems.splice(findExistanceIndex, 1);
        } else {
          newItems[findExistanceIndex] = {
            ...temp,
            selected_option: e.target.value,
          };
        }
      }
    }
    setAnswerResponse(newItems);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const axiosConfig = getNormalHeaders(KEY.User_API_Key);

    let submittedData = {
      responses: answerResponse,
    };
    const nonEmptySelectedOptions = submittedData.responses.filter(
      (item) => item.selected_option.length > 0
    );
    if (preSurveyList.length != nonEmptySelectedOptions.length) {
      openNotificationWithIcon(
        "warning",
        "Please Attempt All Questions..!!",
        ""
      );
    } else {
      return await axios
        .post(
          `${URL.getPreSurveyList}/${quizSurveyId}/responses?${getLanguage(
            language
          )}`,
          JSON.stringify(submittedData, null, 2),
          axiosConfig
        )
        .then((res) => {
          if (res?.status == 200) {
            dispatch(getTeacherPresurveyStatus());
            openNotificationWithIcon(
              "success",
              "Presurvey has been submitted successfully"
            );
            // setTimeout(() => {
            //   history.push("/teacher/dashboard");
            // }, 500);

            // formik.resetForm();
          }
        })
        .catch((err) => {
          return err.response;
        });
    }
  };

  const handleStart = () => {
    // here we can start the teacher journey //
    // here we can see  22 questions  we can attempt all the Questions then  your pre survey is completed //
    setShow(true);
    scroll();
  };
  const scroll = () => {
    const section = document.querySelector("#start");
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const handleClose = () => {
    setShowsPopup(false);
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <Container className="presuervey mb-50 mt-5 " id="start">
            <Col>
              <Row className=" justify-content-center">
                <div className="aside  p-4 bg-white">
                  <CardBody>
                    <Row>
                      <Col md={4}>
                        <figure>
                          <img
                            src={getStart}
                            className="img-fluid"
                            alt="get started"
                          />
                        </figure>
                      </Col>
                      <Col md={8}>
                        <h2 className="text-primary">Welcome Guide Teacher!</h2>
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              "<p>We are delighted that you have signed up for this program and have joined us on this journey of nurturing problem solving and innovation in youth. As you are already aware, you will be playing the role of a guide teacher to the students for the duration of the course.</p><p>The portal includes various information modules and resources that will help you and your students on their learning journeys.</p><p style='color:green'><b>Your journey as a guide teacher will include the following key milestones</b></p><ol><li>Register yourself on the portal and take the pre-survey.</li><li>Understand the program and the tech platform.</li><li>Identify teams and register them on the portal.</li><li>Arrange access to digital devices for students.</li><li>Support the students on their learning journey.</li><li>Ensure teams submit their final ideas on the portal.</li><li>Complete the post survey.</li><li>Download teacher’s certificate.</li><li>Instruct and support the students to download student certificates.</li></ol><p>We hope you and the students have a great time doing this program.</p><p>We wish you all the best!</p>",
                          }}
                        ></div>
                        <button
                          className="btn btn-primary m-3"
                          onClick={handleStart}
                        >
                          START
                        </button>
                      </Col>
                    </Row>
                  </CardBody>
                </div>
              </Row>
            </Col>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default PreSurvey;
