/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
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
import { useFormik } from "formik";
import { URL, KEY } from "../../constants/defaultValues";
import { getLanguage } from '../../constants/languageOptions';
import i18n from 'i18next';
import { logout } from "../../helpers/Utils";
import logoutIcon from "../../assets/img/icons/log-out.svg";
import {
  getCurrentUser,
  getNormalHeaders,
  openNotificationWithIcon,
} from "../../helpers/Utils";
import axios from "axios";
import getStart from "../../assets/img/survey1.png";
import { useNavigate } from "react-router-dom";
import Congo from "../../assets/img/survey-success.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { encryptGlobal } from "../../constants/encryptDecrypt";

const PreSurvey = () => {
  const language = useSelector((state) => state?.mentors?.mentorLanguage);
  // here we can attempt all the questions then we are able to download the certificate //
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
   const [whatsappLink, setWhatsappLink] = useState("");
   const [hovered, setHovered] = useState(false);
  const [preSurveyList, setPreSurveyList] = useState([]);
  const currentUser = getCurrentUser("current_user");
  const [quizSurveyId, setQuizSurveyId] = useState(0);
  const [count, setCount] = useState(0);
  const [preSurveyStatus, setPreSurveyStatus] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [answerResponses, setAnswerResponses] = useState([]);
  const userID = currentUser?.data[0]?.user_id;
  const filterAnswers = (questionId) => {
    const data =
      answerResponses &&
      answerResponses.length > 0 &&
      answerResponses.filter(
        (item) => item.quiz_survey_question_id == questionId
      );
    return data && data.length > 0 && data[0].selected_option
      ? data[0].selected_option
      : "";
  };

  const handleStart = () => {
    // here we can start the teacher journey //
    // here we can see  22 questions  we can attempt all the Questions then  your pre survey is completed //
    setShow(true);
    scroll();
  };

  const handleLogout = (e) => {
    logout(navigate, t, "MENTOR");
    e.preventDefault();
  };
 
  const handleOnChange = (e) => {
    let newItems = [...answerResponses];
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
    setAnswerResponses(newItems);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const axiosConfig = getNormalHeaders(KEY.User_API_Key);
    let enParamDatas = encryptGlobal(
      JSON.stringify({
        locale: "en",
        user_id: userID,
      })
    );
    
    let submitData = {
      responses: answerResponses,
    };
    const nonEmptySelectedOptions = submitData.responses.filter(
      (item) => item.selected_option.length > 0
    );
    if (preSurveyList.length != nonEmptySelectedOptions.length) {
      openNotificationWithIcon(
        "warning",
            t('student.attempt_all_questions'),
            ""
      );
    } else {
      const quizSurveyIdParam = encryptGlobal(JSON.stringify(quizSurveyId));
      return await axios
        .post(
          `${URL.getPostSurveyList}/${quizSurveyIdParam}/responses?Data=${enParamDatas}`,
          JSON.stringify(submitData, null, 2),
          axiosConfig
        )
        .then((preSurveyRes) => {
          if (preSurveyRes?.status == 200) {
            openNotificationWithIcon(
                             "success",
                             t('home.precong'),
                             ""
                           );

            setCount(count + 1);
            localStorage.setItem("presurveystatus", "COMPLETED");
            navigate("/teacher-dashboard");
            window.location.reload();
          }
        })
        .catch((err) => {
          return err.response;
        });
    }
  };
 

  useEffect(() => {
    const handlePopState = (event) => {
      window.history.pushState(null, document.title, window.location.href);
    };

    // Add an entry to the browser history
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", handlePopState);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    let enDataone = encryptGlobal("1");
    let axiosConfig = getNormalHeaders(KEY.User_API_Key);
    // const lang = "locale=en";
    // const final = lang.split("=");
     const locale = getLanguage(language);
     console.log(locale,"tt");
    let enParamData = encryptGlobal(
      JSON.stringify({
        role: "MENTOR",
        locale,
        user_id: userID,
      })
    );
    axiosConfig["params"] = {
      Data: enParamData,
    };

    axios
      .get(`${URL.getPreSurveyList}/${enDataone}`, axiosConfig)
      .then((preSurveyRes) => {
        if (preSurveyRes?.status == 200) {
          setQuizSurveyId(preSurveyRes.data.data[0].quiz_survey_id);
          setPreSurveyStatus(preSurveyRes.data.data[0].progress);
          let allQuestions = preSurveyRes.data.data[0];
          setPreSurveyList(allQuestions.quiz_survey_questions);
        }
      })
      .catch((err) => {
        return err.response;
      });
  }, [count]);
  useEffect(() => {
    const linkEl = document.getElementById("whatsappLink");
    if (linkEl) {
      linkEl.style.cursor = "pointer"; 
      linkEl.addEventListener("click", fetchwhatsapplink);
    }
  
    return () => {
      if (linkEl) {
        linkEl.removeEventListener("click", fetchwhatsapplink); 
      }
    };
  }, []);
const fetchwhatsapplink = () => {
  // Function to fetch the WhatsApp link from the API
  const statenameApi = encryptGlobal(
    JSON.stringify({
      state_name: currentUser?.data[0]?.state,
    })
  );
  var config = {
    method: "get",
    url:
      process.env.REACT_APP_API_BASE_URL +
      `/dashboard/whatappLink?Data=${statenameApi}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${currentUser.data[0]?.token}`,
    },
  };
  axios(config)
    .then(function (response) {
      if (response.status === 200) {
        const responseData = response?.data?.data?.[0];
        const link = responseData?.whatapp_link;
        setWhatsappLink(link);
        
        setTimeout(()=>{
          if (link && typeof link === "string") {
            window.open(link, '_blank');
          } else {
            console.error("Invalid or missing WhatsApp link");
          }
        },1000);
       

       
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};


  return (
    <div>
      <div style={{ margin: "0px" }}>
        <div>
          <Container className="presuervey" id="start">
            <Col>
              <Row className=" justify-content-center">
                <div className="aside  p-4 bg-white">
                  {preSurveyStatus &&
                  preSurveyStatus !== "COMPLETED" &&
                  !show ? (
                    <CardBody>
                      <Row>
                        <Col md={4} style={{alignContent:"center"}}>
                          <figure>
                            <img
                              src={getStart}
                              className="img-fluid"
                              alt="get started"
                            />
                          </figure>
                        </Col>
                        <Col md={8}>
                          <h2 className="text-danger">
                         {t("teacherJourney.headings")}
                          </h2>
                         
                           <div>
      <br />
      <p>{t("teacherJourney.introText")}</p>

       <b className="text-success">{t("teacherJourney.milestoneIntro")}</b>
      <br />
      <p>
         {t("teacherJourney.whatsappInstruction")}{" "}
        <span
          onClick={fetchwhatsapplink}
          onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          color: hovered ? "green" : "black",
          cursor: "pointer",
          textDecoration: "none",
          fontWeight: "bold",
        }}
        >
          {t("teacherJourney.whatsappGroup")}
        </span>{" "}
         {t("teacherJourney.whatsappEndText")}
      </p>

      <ol>
         <li>{t("teacherJourney.step1")}</li>
      <li>{t("teacherJourney.step2")}</li>
      <li>{t("teacherJourney.step3")}</li>
      <li>{t("teacherJourney.step4")}</li>
      <li>{t("teacherJourney.step5")}</li>
      <li>{t("teacherJourney.step6")}</li>
      <li>{t("teacherJourney.step7")}</li>
      <li>{t("teacherJourney.step8")}</li>
      <li>{t("teacherJourney.step9")}</li>
      </ol>

      <br />
      <p>
         {t("teacherJourney.closingText")}
        <br />
         {t("teacherJourney.goodLuck")}
      </p>
    </div>
                          <button
                            className="btn btn-primary m-3"
                            onClick={handleStart}
                          >
                              {t("teacherJourney.startNow")}
                          </button>
                          <button
                            className="btn btn-secondary"
                            onClick={handleLogout}
                          >
                            <img src={logoutIcon} alt="LogoutIcon" /> {t("teacherJourney.doLater")}
                          </button>
                        </Col>
                      </Row>
                    </CardBody>
                  ) : (
                    <CardBody>
                      <h4> {t("teacherJourney.PreSurvey")}</h4>

                      {preSurveyStatus != "COMPLETED" && (
                        <Form
                          className="form-row"
                          
                        >
                          {preSurveyList.map((eachQuestion, i) => {
                            return (
                              <Row key={i}>
                                <Card className="card my-3 mt-2 comment-card px-0 px-5 py-1">
                                  <div className="question quiz mb-0 mt-2">
                                    <h6 style={{ marginBottom: "10px" }}>
                                      {i + 1}. {eachQuestion.question}
                                    </h6>
                                  </div>
                                 
                                  <div className="answers">
                                    <FormGroup
                                      tag="fieldset"
                                      className="w-100 challenges-fs"
                                      id="radioGroup1"
                                      label="One of these please"
                                    >
                                      <>
                                        {eachQuestion.type === "MRQ" && (
                                          <>
                                            {eachQuestion.option_a &&
                                              eachQuestion.option_a !== "" && (
                                                <FormGroup
                                                  check
                                                  //className="mx-1"
                                                >
                                                  <Label
                                                    check
                                                    style={{
                                                      fontSize: "1rem",
                                                      display: "flex",
                                                      alignItems: "center",
                                                    }}
                                                  >
                                                    <Input
                                                      type="radio"
                                                      name={`${eachQuestion.quiz_survey_question_id}`}
                                                      id="radioOption1"
                                                      disabled={isDisabled}
                                                      checked={
                                                        filterAnswers(
                                                          eachQuestion.quiz_survey_question_id
                                                        ) &&
                                                        filterAnswers(
                                                          eachQuestion.quiz_survey_question_id
                                                        ).includes(
                                                          eachQuestion.option_a
                                                        )
                                                      }
                                                      onChange={(e) =>
                                                        handleOnChange(e)
                                                      }
                                                      value={`${eachQuestion.option_a}`}
                                                    />
                                                    {eachQuestion.option_a}
                                                  </Label>
                                                </FormGroup>
                                              )}
                                            {eachQuestion.option_b &&
                                              eachQuestion.option_b !== "" && (
                                                <FormGroup
                                                  check
                                                  //className="mx-1"
                                                >
                                                  <Label
                                                    check
                                                    style={{
                                                      fontSize: "1rem",
                                                      display: "flex",
                                                      alignItems: "center",
                                                    }}
                                                  >
                                                    <Input
                                                      type="radio"
                                                      name={`${eachQuestion.quiz_survey_question_id}`}
                                                      id="radioOption2"
                                                      disabled={isDisabled}
                                                      checked={
                                                        filterAnswers(
                                                          eachQuestion.quiz_survey_question_id
                                                        ) &&
                                                        filterAnswers(
                                                          eachQuestion.quiz_survey_question_id
                                                        ).includes(
                                                          eachQuestion.option_b
                                                        )
                                                      }
                                                      onChange={(e) =>
                                                        handleOnChange(e)
                                                      }
                                                      value={`${eachQuestion.option_b}`}
                                                    />{" "}
                                                    {eachQuestion.option_b}
                                                  </Label>
                                                </FormGroup>
                                              )}
                                            {eachQuestion.option_c &&
                                              eachQuestion.option_c !== "" && (
                                                <FormGroup
                                                  check
                                                  //className="mx-1"
                                                >
                                                  <Label
                                                    check
                                                    style={{
                                                      fontSize: "1rem",
                                                      display: "flex",
                                                      alignItems: "center",
                                                    }}
                                                  >
                                                    <Input
                                                      type="radio"
                                                      onChange={(e) =>
                                                        handleOnChange(e)
                                                      }
                                                      name={`${eachQuestion.quiz_survey_question_id}`}
                                                      id="radioOption3"
                                                      disabled={isDisabled}
                                                      value={`${eachQuestion.option_c}`}
                                                    />{" "}
                                                    {eachQuestion.option_c}
                                                  </Label>
                                                </FormGroup>
                                              )}

                                            {eachQuestion.option_d &&
                                              eachQuestion.option_d !== "" && (
                                                <FormGroup
                                                  check
                                                  //className="mx-1"
                                                >
                                                  <Label
                                                    check
                                                    style={{
                                                      fontSize: "1rem",
                                                      display: "flex",
                                                      alignItems: "center",
                                                    }}
                                                  >
                                                    <Input
                                                      type="radio"
                                                      onChange={(e) =>
                                                        handleOnChange(e)
                                                      }
                                                      name={`${eachQuestion.quiz_survey_question_id}`}
                                                      disabled={isDisabled}
                                                      id="radioOption4"
                                                      value={`${eachQuestion.option_d}`}
                                                    />{" "}
                                                    {eachQuestion.option_d}
                                                  </Label>
                                                </FormGroup>
                                              )}
                                          </>
                                        )}
                                        {eachQuestion.type === "MCQ" && (
                                          <>
                                            <FormGroup
                                              check
                                              //className="mx-1"
                                            >
                                              <Label
                                                check
                                                style={{
                                                  fontSize: "1rem",
                                                  display: "flex",
                                                  alignItems: "center",
                                                }}
                                              >
                                                <Input
                                                  type="checkbox"
                                                  name={`${eachQuestion.quiz_survey_question_id}`}
                                                  disabled={isDisabled}
                                                  checked={
                                                    filterAnswers(
                                                      eachQuestion.quiz_survey_question_id
                                                    ) &&
                                                    filterAnswers(
                                                      eachQuestion.quiz_survey_question_id
                                                    ).includes(
                                                      eachQuestion.option_a
                                                    )
                                                  }
                                                  id={eachQuestion.option_a}
                                                  onChange={(e) =>
                                                    handleOnChange(e)
                                                  }
                                                  value={`${eachQuestion.option_a}`}
                                                />
                                                {eachQuestion.option_a}
                                              </Label>
                                            </FormGroup>
                                            <FormGroup
                                              check
                                              //className="mx-1"
                                            >
                                              <Label
                                                check
                                                style={{
                                                  fontSize: "1rem",
                                                  display: "flex",
                                                  alignItems: "center",
                                                }}
                                              >
                                                <Input
                                                  type="checkbox"
                                                  name={`${eachQuestion.quiz_survey_question_id}`}
                                                  disabled={isDisabled}
                                                  checked={
                                                    filterAnswers(
                                                      eachQuestion.quiz_survey_question_id
                                                    ) &&
                                                    filterAnswers(
                                                      eachQuestion.quiz_survey_question_id
                                                    ).includes(
                                                      eachQuestion.option_b
                                                    )
                                                  }
                                                  id={eachQuestion.option_b}
                                                  onChange={(e) =>
                                                    handleOnChange(e)
                                                  }
                                                  value={`${eachQuestion.option_b}`}
                                                />
                                                {eachQuestion.option_b}
                                              </Label>
                                            </FormGroup>
                                            <FormGroup
                                              check
                                              //className="mx-1"
                                            >
                                              <Label
                                                check
                                                style={{
                                                  fontSize: "1rem",
                                                  display: "flex",
                                                  alignItems: "center",
                                                }}
                                              >
                                                <Input
                                                  type="checkbox"
                                                  disabled={isDisabled}
                                                  name={`${eachQuestion.quiz_survey_question_id}`}
                                                  checked={
                                                    filterAnswers(
                                                      eachQuestion.quiz_survey_question_id
                                                    ) &&
                                                    filterAnswers(
                                                      eachQuestion.quiz_survey_question_id
                                                    ).includes(
                                                      eachQuestion.option_c
                                                    )
                                                  }
                                                  id={eachQuestion.option_c}
                                                  onChange={(e) =>
                                                    handleOnChange(e)
                                                  }
                                                  value={`${eachQuestion.option_c}`}
                                                />
                                                {eachQuestion.option_c}
                                              </Label>
                                            </FormGroup>

                                            {eachQuestion.option_d !== null && (
                                              <FormGroup
                                                check
                                                //className="mx-1"
                                              >
                                                <Label
                                                  check
                                                  style={{
                                                    fontSize: "1rem",
                                                    display: "flex",
                                                    alignItems: "center",
                                                  }}
                                                >
                                                  <Input
                                                    type="checkbox"
                                                    name={`${eachQuestion.quiz_survey_question_id}`}
                                                    disabled={isDisabled}
                                                    checked={
                                                      filterAnswers(
                                                        eachQuestion.quiz_survey_question_id
                                                      ) &&
                                                      filterAnswers(
                                                        eachQuestion.quiz_survey_question_id
                                                      ).includes(
                                                        eachQuestion.option_d
                                                      )
                                                    }
                                                    id={eachQuestion.option_d}
                                                    onChange={(e) =>
                                                      handleOnChange(e)
                                                    }
                                                    value={`${eachQuestion.option_d}`}
                                                  />
                                                  {eachQuestion.option_d}
                                                </Label>
                                              </FormGroup>
                                            )}
                                          </>
                                        )}
                                      </>
                                    </FormGroup>
                                  </div>
                                </Card>
                              </Row>
                            );
                          })}
                          <div>
                            <button
                              type="submit"
                             
                              className="btn btn-warning m-2"
                              onClick={(e) => handleOnSubmit(e)}
                            >
                              {t("teacherJourney.submit")}
                            </button>
                          </div>
                        </Form>
                      )}

                      {preSurveyStatus == "COMPLETED" && (
                        <div style={{ textAlign: "center" }}>
                          <figure>
                            <img
                              className="img-fluid imgWidthSize"
                              src={Congo}
                            ></img>
                          </figure>
                          <div>
                            <h4>
                               {t("teacherJourney.texts")}
                             
                            </h4>
                          </div>
                        </div>
                      )}
                    </CardBody>
                  )}
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
