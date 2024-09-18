/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
//import "./style.scss";
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
// import { Button } from "../../stories/Button";
import { useFormik } from "formik";
import { URL, KEY } from "../../constants/defaultValues";
import { logout } from "../../helpers/Utils";
import logoutIcon from "../../assets/img/icons/log-out.svg";
import LanguageSelectorComp from '../../components/LanguageSelectorComp/index.js';
import {
  getPresurveyData,
  getStudentDashboardStatus,
  updateStudentBadges
} from '../../redux/studentRegistration/actions';
import {
  getCurrentUser,
  getNormalHeaders,
  openNotificationWithIcon,
} from "../../helpers/Utils";
import axios from "axios";
import getStart from "../../assets/img/survey1.png";
import { useNavigate } from "react-router-dom";
import Congo from "../../assets/img/chek.png";
import { useDispatch, useSelector } from "react-redux";
import { UncontrolledAlert } from "reactstrap";
import { useTranslation } from "react-i18next";
import { encryptGlobal } from "../../constants/encryptDecrypt";
import { config } from "exceljs";
import { getLanguage } from '../../constants/languageOptions';

const StuPreSurvey = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [preSurveyList, setPreSurveyList] = useState([]);
    const currentUser = getCurrentUser("current_user");
    const [quizSurveyId, setQuizSurveyId] = useState(0);
    const [count, setCount] = useState(0);
    const [preSurveyStatus, setPreSurveyStatus] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const [answerResponses, setAnswerResponses] = useState([]);
    const language = useSelector(
        (state) => state?.studentRegistration?.studentLanguage
    );
    //console.log(currentUser , "current user");
    const userID = currentUser?.data[0]?.user_id;
    // console.log(userID , " user");
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
        setShow(true);
        // dispatch(getPresurveyData(language));
      apiData(language);

        scroll();
    };
    const handleLogout = (e) => {
        logout(navigate, t, "TEAM");
        e.preventDefault();
    };
  //   useEffect(() => {
  //     dispatch(getPresurveyData(language));
  // }, [language]);

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
        //alert("hii");
        e.preventDefault();
    
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        let enParamDatas = encryptGlobal(
          JSON.stringify({
            locale: "en",
            user_id : userID,
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
          //console.log(quizSurveyIdParam , "pre check");
          return await axios
            .post(
              `${URL.getPostSurveyList}/${quizSurveyIdParam}/responses?Data=${enParamDatas}`,
              JSON.stringify(submitData, null, 2),
              axiosConfig
            )
            .then((preSurveyRes) => {
              if (preSurveyRes?.status == 200) {
                // console.log(preSurveyRes, "aaaaa");
                openNotificationWithIcon(
                  "success",
                  t('home.precong'),
                  ""
                );
    
                setCount(count + 1);
                localStorage.setItem("stupresurveystatus", "COMPLETED");
                // currentUser.data.data[0]=
                navigate("/student-dashboard");
                //window.location.reload();
                // formik.resetForm();
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
        window.addEventListener('popstate', handlePopState);
    
        // Cleanup function to remove the event listener
        return () => {
          window.removeEventListener('popstate', handlePopState);
        };
      }, []);

      useEffect(() => {
        console.log("pre page id");
      apiData(language);
      }, [count]);
    

      const apiData=(language)=>{
        const locale = getLanguage(language);
        let enDataone = encryptGlobal("2");
        let axiosConfig = getNormalHeaders(KEY.User_API_Key);
        // const lang = "locale=en";
        // const final = lang.split("=");
        let enParamData = encryptGlobal(
          JSON.stringify({
            role: "STUDENT",
            locale,
            user_id : userID,
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
        };



return (
      <div className="page-wrapper">
        <div className="content" >
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                  <h4>{t('home.pre_survey')}</h4>
                  <h6>{t('home.text')}</h6>
              </div>
              {/* <ul className="table-top-head">
            <li>
              <div>
              <LanguageSelectorComp module="student" />
              </div>
            </li>
          </ul> */}
            </div>
          </div>
          <Container className="presuervey" id="start">
            <Col>
              <Row className=" justify-content-center">
                <div className="aside  p-4">
               
                  {preSurveyStatus &&
                  preSurveyStatus !== "COMPLETED" &&
                  !show ? (
                    <CardBody>
                       <ul className="table-top-head">
            <li>
              <div>
              <LanguageSelectorComp module="student" />
              </div>
            </li>
          </ul>
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
                          <h2 className="text-primary">
                          {t('home.wel')}
                          </h2>
                          <br/>
                          {t('home.preinst')}
                          {/* <div
                            dangerouslySetInnerHTML={{
                              __html:
                                "We're happy to have you join us in this exciting learning adventure! </br></br> <b class='text-success'>Here's what you'll do during the program:</b></br></br><ol><li>1. Log in to the portal to get started.</li><li>2. Complete the pre-survey to share your thoughts before we begin.</li><li>3. Dive into the course and explore all the amazing videos.</li><li>4. Work with your teammates to identify a problem and work together to find a solution.</li><li>5. Submit your innovative idea to the Innovation Marathon and showcase your creativity.</li><li>6. Complete the post-survey to share your feedback and experience.</li><li>7. Download your certificates to celebrate your achievements!</li></br>We can't wait to see the incredible ideas you'll come up with. Have fun, learn a lot, and let's make this an unforgettable journey!",
                            }}
                          ></div> */}
                          <button
                            className="btn btn-primary m-3"
                            onClick={handleStart}
                          >
                             {t('home.startnow')}
                            {/* Start Now */}
                          </button>
                          <button
                              className="btn btn-secondary"
                              onClick={handleLogout}
                            >
                              <img src={logoutIcon} alt="LogoutIcon" />{" "}
                              {/* Do Later */}
                             {t('home.dolater')}

                          </button>
                        </Col>
                      </Row>
                    </CardBody>
                  ) : (
                    <CardBody>
                      {preSurveyStatus != "COMPLETED" && (
                        <Form
                          className="form-row"
                          // onSubmit={formik.handleSubmit}
                          // isSubmitting
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
                                  {/* <div className="answers">
                                                        <FormGroup
                                                            tag="fieldset"
                                                            className="w-100"
                                                            id="radioGroup1"
                                                            label="One of these please"
                                                            value={
                                                                formik
                                                                    .values
                                                                    .radioGroup1
                                                            }
                                                            error={
                                                                formik
                                                                    .errors
                                                                    .radioGroup1
                                                            }
                                                            touched={
                                                                formik
                                                                    .touched
                                                                    .radioGroup1
                                                            }
                                                            onChange={
                                                                formik.handleChange
                                                            }
                                                            onBlur={
                                                                formik.handleBlur
                                                            }
                                                        >
                                                            <FormGroup
                                                                check
                                                            >
                                                                <Label
                                                                    check
                                                                >
                                                                    <Input
                                                                        type="radio"
                                                                        name={`radioGroup${i}`}
                                                                        id="radioOption1"
                                                                        value={`${eachQuestion.quiz_survey_question_id} -- ${eachQuestion.option_a}`}
                                                                    />{' '}
                                                                    {
                                                                        eachQuestion.option_a
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup
                                                                check
                                                            >
                                                                <Label
                                                                    check
                                                                >
                                                                    <Input
                                                                        type="radio"
                                                                        name={`radioGroup${i}`}
                                                                        id="radioOption2"
                                                                        value={`${eachQuestion.quiz_survey_question_id} -- ${eachQuestion.option_b}`}
                                                                    />{' '}
                                                                    {
                                                                        eachQuestion.option_b
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup
                                                                check
                                                            >
                                                                <Label
                                                                    check
                                                                >
                                                                    <Input
                                                                        type="radio"
                                                                        name={`radioGroup${i}`}
                                                                        id="radioOption3"
                                                                        value={`${eachQuestion.quiz_survey_question_id} -- ${eachQuestion.option_c}`}
                                                                    />{' '}
                                                                    {
                                                                        eachQuestion.option_c
                                                                    }
                                                                </Label>
                                                            </FormGroup>

                                                            <FormGroup
                                                                check
                                                            >
                                                                <Label
                                                                    check
                                                                >
                                                                    <Input
                                                                        type="radio"
                                                                        name={`radioGroup${i}`}
                                                                        id="radioOption4"
                                                                        value={`${eachQuestion.quiz_survey_question_id} -- ${eachQuestion.option_d}`}
                                                                    />{' '}
                                                                    {
                                                                        eachQuestion.option_d
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                        </FormGroup>
                                                    </div> */}
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
                          <div >
                            <button
                              type="submit"
                              // btnClass={
                              //     !(
                              //         formik.dirty &&
                              //         formik.isValid
                              //     )
                              //         ? 'default'
                              //         : 'primary'
                              // }
                              // disabled={
                              //     !(
                              //         formik.dirty &&
                              //         formik.isValid
                              //     )
                              // }
                              //   size="small"
                              //   label="Submit"
                              className="btn btn-warning m-2"
                              onClick={(e) => handleOnSubmit(e)}
                            >
                               {t('teacher.submit')}
                              {/* SUBMIT */}
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
                            {t('home.presucess')}<br/> {t('home.precong')}
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
  );
};

export default StuPreSurvey;
