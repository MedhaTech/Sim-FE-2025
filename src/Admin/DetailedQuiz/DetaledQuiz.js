/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import { Card, Row, Col, Table } from "reactstrap";
import { Fragment } from "react";
import Question from "./Question";
import { Button } from "../../stories/Button";
import "./quiz.scss";
import Confetti from "react-confetti";
import ResultStar from "../../assets/img/quiz-result-star.png";
import { connect, useDispatch, useSelector } from "react-redux";
import DoubleBounce from "../../components/Loaders/DoubleBounce";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { getCurrentUser } from "../../helpers/Utils";
import { CheckCircle } from 'react-feather';
import { FaTimesCircle } from 'react-icons/fa';
import {
  getAdminQuizQuestions,
  getAdminQuizResponce,
  getAdminCourseDetails,
} from "../../redux/actions";
import QuizResponse from "./QuizResponse";
import succesImg from "../../assets/img/success1.jpeg";
import failedImg from "../../assets/img/failedQ.png";
import { updateStudentBadges } from "../../redux/studentRegistration/actions";
import { encryptGlobal } from "../../constants/encryptDecrypt";
const DetaledQuiz = (props) => {
  const currentUser = getCurrentUser("current_user");
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const quizId = props.quizId;
  const [adminQst, SetAdminQst] = useState({});
  const [type, SetType] = useState("");
  const [loading, Setloading] = useState(false);
  const [selectOption, SetSelectOption] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [condition, SetCondition] = useState(true);
  const [video, SetVideo] = useState(true);
  const [qst, SetQst] = useState({});
  const [quizdata, setQuizData] = useState(0);
  const language = useSelector(
    (state) => state?.studentRegistration?.studentLanguage
  );
  const [isSubmitted, setSubmitted] = useState(false);
  const [attemptNumber, setAttemptNumber] = useState(0);
  const [currentScore, setCurrentScore] = useState({});
  const [currentRole, setCurrentRole] = useState("");
  const [totalQstCount, setTotalQstCount] = useState(0);
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const [startloader, setStartloader] = useState(false);
  useEffect(() => {
    setCurrentRole(currentUser?.data[0]?.role);
  }, [currentUser]);

  function resultdata() {
    const paramApi = encryptGlobal(
      JSON.stringify({
        user_id: currentUser?.data[0]?.user_id,
        quiz_id: quizId,
      })
    );
    var config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + `/quiz/result?Data=${paramApi}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${currentUser.data[0]?.token}`,
      },
    };
    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          if (response.data.count === null) {
            setAttemptNumber(1);
            props.getAdminQuizQuestionsActions(
              quizId,
              language,
              1,
              currentUser?.data[0]?.user_id
            );
          } else {
            setAttemptNumber(
              response?.data?.data[0].data[
                response?.data?.data[0].data.length - 1
              ]?.attempts
            );
            props.getAdminQuizQuestionsActions(
              quizId,
              language,
              response?.data?.data[0].data[
                response?.data?.data[0].data.length - 1
              ]?.attempts,
              currentUser?.data[0]?.user_id,

            );
            setCurrentScore(
              response?.data?.data[0].data[
              response?.data?.data[0].data.length - 1
              ]
            );
            setCurrentPercentage(
              Math.round(
                (response?.data?.data[0].data[
                  response?.data?.data[0].data.length - 1
                ]?.score /
                  response?.data?.data[0]?.all[0]?.allquestions) *
                100
              )
            );
          }
          setTotalQstCount(response?.data?.data[0]?.all[0]?.allquestions);
          setQuizData(response.data && response.data.data[0]);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    resultdata();
    setStartloader(true);
  }, []);

  useEffect(() => {
    SetAdminQst(props.adminCourseQst.data);
    SetQst(props.adminCourseQst.data);
  }, [props.adminCourseQst]);

  const handleSelect = (answer) => {
    SetSelectOption(answer);
  };
  const handleSelectType = (answer) => {
    SetType(answer);
  };

  const handleSubmit = () => {
    if (type === "DRAW") {
      const quiz_id = adminQst[0].quiz_id;
      const data = new FormData();
      data.append("quiz_question_id", adminQst[0].quiz_question_id);
      data.append("selected_option", "ok");
      data.append("attachment", selectOption);
      props.getAdminQuizResponceAction(
        quiz_id,
        data,
        language,
        currentUser.data[0].user_id
      );
      SetSelectOption("");
      SetType("");
    } else {
      const quiz_id = adminQst[0].quiz_id;
      const body = JSON.stringify({
        quiz_question_id: adminQst[0].quiz_question_id,
        selected_option: selectOption,
        attempts: attemptNumber,
      });
      const correctAnswer = adminQst[0].options.find(
        (option) => option === adminQst[0].correct_ans
      );
      setCorrectAnswer(correctAnswer);
      props.getAdminQuizResponceAction(
        quiz_id,
        body,
        language,
        currentUser.data[0].user_id
      );
      SetSelectOption("");
      SetType("");
      setSubmitted(true);
    }
  };


  // const goToTop = () => {
  //   window.scrollTo(0, 0);

  //   const section = document.querySelector("#start");
  //   section.scrollIntoView({
  //     behavior: "smooth",
  //     block: "start",
  //   });

  // };

  const goToTop = () => {
    // console.log("Scrolling to top...");

    // Scroll to the top of the page immediately
    window.scrollTo(0, 0);

    // Log after scrolling to top
    // console.log("Scrolled to top. Now scrolling to #start...");

    // Then, scroll to the element with id 'start' smoothly
    const section = document.querySelector('#start');

    // Check if the section exists
    if (section) {
      // console.log("Element found:", section);

      section.scrollIntoView({
        behavior: 'smooth', // Smooth scroll effect
        block: 'start'      // Aligns the top of the element with the top of the viewport
      });

      // console.log("Scroll initiated to #start with smooth behavior.");
    } else {
      console.warn("Element with id 'start' not found.");
    }
  };



  const handleNxtQst = () => {

    Setloading(true);
    setTimeout(() => {
      Setloading(false);
      SetCondition(true);
      props.getAdminQuizQuestionsActions(
        props.quizId,
        language,
        attemptNumber,
        currentUser?.data[0]?.user_id
      );
      SetSelectOption("");
      SetType("");
      goToTop();
      setSubmitted(false);
      resultdata();
    }, 500);
  };

  const handlevideo = (id) => {
    SetVideo(false);
    props.handleNxtVideo(id);
    props.setBackToQuiz(true);
    props.setHideQuiz(false);
    props.setQuizTopic(id?.title);
  };

  const handleRetest = () => {
    setAttemptNumber(attemptNumber + 1);
    props.getAdminQuizQuestionsActions(
      props.quizId,
      language,
      attemptNumber + 1,
      currentUser?.data[0]?.user_id
    );
  };
  setTimeout(() => {
    setStartloader(false);
  }, 500);

  return (
    <>
      {startloader ? (
        <DoubleBounce />
      ) : (
        <Fragment>
          {video === true &&
            props.adminCourseQst &&
            props.adminCourseQst.data ===
            "Quiz has been completed no more questions to display" && (
              <div>
                {currentRole === "MENTOR" ? (
                  <Confetti className="w-100" />
                ) : (
                  currentPercentage >= 60 && <Confetti className="w-100" />
                )}
              </div>
            )}

          {condition === true &&
            props.adminCourseQst &&
            props.adminCourseQst.status === 200 ? (
            <Fragment>
             
            </Fragment>
          ) : null}

          <Card className="quiz p-4">
            {video === true &&
              props.adminCourseQst &&
              props.adminCourseQst.data ===
              "Quiz has been completed no more questions to display" ? (
              <div className="container new-result">
                <div className="row justify-content-md-center ">
                  <div className="col col-lg-9">
                    <div className="mt-4 text-center">
                    
                      {currentRole === "MENTOR" && (
                        <>
                          <div className="success_img text-center w-100">
                            <img src={succesImg} alt=".." />
                            <br />
                          </div>
                          <h2>
                            Score:
                            {currentScore?.score ? currentScore?.score : "0"}/
                            {totalQstCount}
                          </h2>
                          <h4
                            style={{
                              color: "green",
                            }}
                          >
                            {t("student.quiz_completed")}
                          </h4>
                          <Button
                            label="continue"
                            btnClass="primary w-auto"
                            size="small"
                            type="submit"
                            onClick={() => {
                              props.handleQuiz();
                              props.setInstructions(true);
                              props.setHandbook(false);
                            }}
                          />
                        </>
                      )}
                    </div>
                    {currentRole === "STUDENT" && (
                      <>
                        {currentPercentage >= 60 ? (
                          <>
                            <div className="success_img text-center w-100">
                              <img src={succesImg} alt=".." />
                              <br />
                            </div>
                            <div className="table-responsive">
                              <Table>
                                <thead>
                                  <tr>
                                    <th width="10%" className="text-secondary">{t("student_course.quiz_score_attempts")}</th>
                                    <th width="30%" className="text-success">
                                      {t("student_course.quiz_score_correctanswers")}
                                    </th>
                                    <th width="30%" className="text-danger">
                                      {t("student_course.quiz_score_wronganswers")}
                                    </th>
                                    <th width="30%" className="text-secondary">{t("student_course.quiz_score_result")}</th>
                                  </tr>
                                </thead>
                                {quizdata.data.map((item, index) => {
                                  return (
                                    <tbody key={index}>
                                      <tr className="text-center">
                                        <td>{item.attempts}</td>
                                        <td>{item.score ? item.score : "0"} <CheckCircle size={20} color="#28C76F" /></td>
                                        <td>{totalQstCount - item.score} <FaTimesCircle size={20} color="#FF0000" /></td>
                                        <td>
                                          {Math.round(
                                            (item.score / totalQstCount) * 100
                                          )}
                                          %
                                        </td>
                                      </tr>
                                    </tbody>
                                  );
                                })}
                              </Table>
                            </div>
                            <div
                              style={{
                                textAlign: "center",
                                marginTop: "1rem",
                              }}
                            >
                              <h4
                                style={{
                                  color: "green",
                                }}
                              >
                                {t("student.quiz_completed")}
                              </h4>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="success_img text-center w-100">
                              <img src={failedImg} alt=".." />
                              <br />
                            </div>
                            <div className="table-responsive">
                              <Table>
                                <thead>
                                  <tr>
                                    <th className="text-secondary">{t("student_course.quiz_score_attempts")}</th>
                                    <th className="text-success">
                                      {t("student_course.quiz_score_correctanswers")}
                                    </th>
                                    <th className="text-danger">
                                      {t("student_course.quiz_score_wronganswers")}
                                    </th>
                                    <th className="text-secondary">{t("student_course.quiz_score_result")}</th>
                                  </tr>
                                </thead>
                                {quizdata.data.map((item, index) => {
                                  return (
                                    <tbody key={index}>
                                      <tr className="text-center">
                                        <td>{item.attempts}</td>
                                        <td>{item.score ? item.score : "0"} <CheckCircle size={20} color="#28C76F" /></td>
                                        <td>{totalQstCount - item.score} <FaTimesCircle size={20} color="#FF0000" /></td>
                                        <td>
                                          {Math.round(
                                            (item.score / totalQstCount) * 100
                                          )}
                                          %
                                        </td>
                                      </tr>
                                    </tbody>
                                  );
                                })}
                              </Table>
                            </div>
                            <div
                              style={{
                                textAlign: "center",
                                marginTop: "1rem",
                              }}
                            >
                              <h4
                                style={{
                                  color: "red",
                                }}
                              >
                                {t("student.cutoff")}
                              </h4>
                            </div>
                          </>
                        )}

                      </>
                    )}


                    <div className="results-heading">
                      <img src={ResultStar} alt="star" />
                    </div>
                    {currentRole === "STUDENT" && (
                      <div className="row d-flex justify-content-end">
                        {currentPercentage < 60 ? (
                          <div className="text-right">
                            <Button
                              label={t("student.retest")}
                              btnClass="primary w-auto"
                              size="small"
                              type="submit"
                              onClick={handleRetest}
                            />
                          </div>
                        ) : (
                          <div className="text-right">
                            <Button
                              label={t("student.continue")}
                              btnClass="primary w-auto"
                              size="small"
                              type="submit"
                              onClick={() => {
                                dispatch(
                                  updateStudentBadges(
                                    {
                                      badge_slugs: [props.badge],
                                    },
                                    currentUser.data[0].user_id,
                                    language,
                                    t
                                  )
                                );
                                props.handleQuiz();
                                props.handleNextCourse();
                              }}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : loading === true ? (
              <DoubleBounce />
            ) : (
              <Fragment>
                <div className="question-section" id="start">
                  <div className="score"></div>
                  <Row>
                    <Col xs={12}>
                      <h6 className="text-primary">
                        {t("teacher.question")}{" # "}
                        {props?.adminCourseQst?.data &&
                          props?.adminCourseQst?.data[0] &&
                          props?.adminCourseQst?.data[0]?.question_no}
                      </h6>
                    </Col>
                  </Row>

                  <Question
                    isSubmitted={isSubmitted}
                    responceData={props.adminQstResponce}
                    adminQuizDetails={qst}
                    quizId={quizId}
                    onSelectAnswer={handleSelect}
                    onSelectType={handleSelectType}
                    correctAnswer={correctAnswer}
                  />

                  {video === true &&
                    props.adminQstResponce &&
                    props.adminQstResponce.status === 200 ? (
                    <div>
                      <div className="score">
                        {props.adminQstResponce &&
                          props.adminQstResponce.data[0] &&
                          props.adminQstResponce.data[0].is_correct ===
                          true && (
                            <div className="w-100">
                              <QuizResponse
                                response={props.adminQstResponce.data[0]}
                              />
                            </div>
                          )}
                        {props.adminQstResponce &&
                          props.adminQstResponce.data[0] &&
                          props.adminQstResponce.data[0].is_correct ===
                          false && (
                            <QuizResponse
                              response={props.adminQstResponce.data[0]}
                            />
                          )}
                      </div>

                      <Row className="justify-content-between mt-3">
                        {props.adminQstResponce &&
                          props.adminQstResponce.data[0] &&
                          props.adminQstResponce.data[0].is_correct ===
                          true && (
                            <Col md={12} className="text-right">
                              <Button
                                btnClass="primary w-auto"
                                size="small"
                                label={t("student.continue")}
                                onClick={handleNxtQst}
                              />
                            </Col>
                          )}
                        {props.adminQstResponce &&
                          props.adminQstResponce.data[0] &&
                          props.adminQstResponce.data[0].is_correct ===
                          false && (
                            <Col md={12} className="text-right">
                              {props.adminQstResponce &&
                                props.adminQstResponce.data[0] &&
                                props.adminQstResponce.data[0].redirect_to !=
                                null && (
                                  <Button
                                    btnClass="primary px-5 mx-sm-3 mx-1 mb-3"
                                    size="small"
                                    label={t("teacher.refer_video")}
                                    onClick={() =>
                                      handlevideo(
                                        props.adminQstResponce &&
                                        props.adminQstResponce.data[0] &&
                                        props.adminQstResponce.data[0]
                                          .redirect_to
                                      )
                                    }
                                  />
                                )}
                              <Button
                                btnClass="primary w-auto"
                                size="small"
                                label={t("teacher.continue")}
                                onClick={handleNxtQst}
                              />
                            </Col>
                          )}
                      </Row>
                    </div>
                  ) : null}

                  {props.adminQstResponce &&
                    props.adminQstResponce.status === 200 ? null : (
                    <Row className="justify-content-between mt-3">
                      <Col md={12} className="text-right">
                        <Button
                          size="small"
                          label={t("teacher.submit")}
                          onClick={handleSubmit}
                          btnClass={!selectOption ? "default" : "primary"}
                          disabled={!selectOption}
                        />
                      </Col>
                    </Row>
                  )}
                </div>
              </Fragment>
            )}
          </Card>
        </Fragment>
      )}
    </>
  );
};

const mapStateToProps = ({ adminCourses }) => {
  const { adminCourseQst, adminQstResponce } = adminCourses;
  return { adminCourseQst, adminQstResponce };
};

export default connect(mapStateToProps, {
  getAdminQuizQuestionsActions: getAdminQuizQuestions,
  getAdminQuizResponceAction: getAdminQuizResponce,
  getAdminCourseDetailsActions: getAdminCourseDetails,
})(DetaledQuiz);
