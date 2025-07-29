/* eslint-disable no-undef */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { Button } from "../../stories/Button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2/dist/sweetalert2";
import logout from "../../assets/img/logout.png";
import { Card, CardBody, CardTitle } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, setCurrentUser } from "../../helpers/Utils";
import { getTeamMemberStatus } from "../../Teacher/store/teams/actions";
import axios from "axios";
import { encryptGlobal } from "../../constants/encryptDecrypt";

const InstructionsPage = (props) => {
  const [resList, setResList] = useState("");
  const { t } = useTranslation();
  const currentUser = getCurrentUser("current_user");
  const [showDefault, setshowDefault] = useState(true);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [ideaEnableStatus, setIdeaEnableStatus] = useState(0);
  const teamId = currentUser.data[0]?.team_id;
  const { teamsMembersStatus } = useSelector((state) => state.teams);
  useEffect(() => {
    if (teamId) {
      dispatch(getTeamMemberStatus(teamId, setshowDefault));
    }
  }, [teamId, dispatch]);
  const percentageBWNumbers = (a, b) => {
    return (((a - b) / a) * 100).toFixed(2);
  };
  useEffect(() => {
    handleResList();
  }, []);
  async function handleResList() {
    const fectchTecParam = encryptGlobal(
      JSON.stringify({
        state: currentUser?.data[0]?.state,
      })
    );

    //  handleResList Api where we can see list of  state specific //
    let config = {
      method: "get",
      url:
        process.env.REACT_APP_API_BASE_URL +
        `/states/specific?Data=${fectchTecParam}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.data[0]?.token}`,
      },
    };
    await axios(config)
      .then(function (response) {
        if (response.status === 200) {
          setResList(response.data.data[0].ideaSubmission);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
console.log(teamsMembersStatus,"team");
//   useEffect(() => {
//     if (
//       teamsMembersStatus.length >= minLength &&
//       teamsMembersStatus.length <= maxLength
//     ) {
//       localStorage.setItem(
//         "ideaSubStatus",
//         teamsMembersStatus[0].idea_submission
//       );
//       console.log(teamsMembersStatus[0], "muconsole");

//       if (Array.isArray(teamsMembersStatus)) {
//         let anyCompleted = false;

//         teamsMembersStatus.forEach((record) => {
//           let percent =
//             100 -
//             percentageBWNumbers(
//               record.all_topics_count,
//               record.topics_completed_count
//             );

//           if (percent === 100) {
//             anyCompleted = true;
//           }
//         });

//         const ideaStatus = anyCompleted ? 1 : 0;
//         setIdeaEnableStatus(ideaStatus);
//       }
//     }
//   }, [teamsMembersStatus, currentUser?.data[0]?.state]);

useEffect(() => {
  const state = currentUser?.data[0]?.state;
  const minLength = state === "Tamil Nadu" ? 2 : 2;
  const maxLength = state === "Tamil Nadu" ? 5 : 3;

  if (
    teamsMembersStatus.length >= minLength &&
    teamsMembersStatus.length <= maxLength &&
    Array.isArray(teamsMembersStatus)
  ) {
    localStorage.setItem(
      "ideaSubStatus",
      teamsMembersStatus[0]?.idea_submission
    );

    // Check if ALL members have completed the course
    const allCompleted = teamsMembersStatus.every(
      (record) => record.topics_completed_count === record.all_topics_count
    );

    const ideaStatus = allCompleted ? 1 : 0;
    setIdeaEnableStatus(ideaStatus);
  }
}, [teamsMembersStatus, currentUser?.data[0]?.state]);

  const handleNext = () => {
    navigate("/idea");
  };
  const handleideaenable = () => {
        // alert("course Not completed");
        console.log("course Not completed");
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-submit',
            },
            buttonsStyling: false
        });
      
        swalWithBootstrapButtons
            .fire({
                title: t('login.popinst'),
                // text: "You can access idea submission only after all your teammates complete course.",
                text:t('login.popcheck'),

                imageUrl: `${logout}`,
                confirmButtonText: t('login.ok'),
            });
        };
  const handlePopup = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-submit",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire({
      title: t("login.popdi"),
      // text: "You can access idea submission only after all your teammates complete course.",
      text: t("login.popcheckD"),

      imageUrl: `${logout}`,
      confirmButtonText: t("login.ok"),
    });
  };

  const pdfFileURL = "https://s3.ap-south-1.amazonaws.com/aim2.0/Themes.pdf";
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="courses-page">
          <div className="container-fluid">
            <Row>
              <Col xl={12}>
                <Fragment>
                  <Card className="course-sec-basic p-4">
                    <CardTitle className="text-center">
                      <h3
                        style={{
                          color: "orange",
                        }}
                      >
                        {" "}
                        {t("idea_page.main")}{" "}
                      </h3>
                    </CardTitle>
                    <CardBody>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: t("student_course.idea_ins_note"),
                        }}
                      ></div>

                      <div className="text-right">
                        {/* <a
                                                href={pdfFileURL}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="primary"
                                            >
                                                <Button
                                                    label={t(
                                                        'student.download_theme'
                                                    )}
                                                    btnClass="primary mt-4 mx-4 "
                                                    size="small"
                                                />
                                            </a>  */}

                        {/* {resList !== 1 ? (
                          <button
                            onClick={handlePopup}
                            className="btn btn-secondary"
                          >
                            {t("idea_page.next")}
                          </button>
                        ) : (
                          <Button
                            label={t("idea_page.next")}
                            btnClass="primary mt-4 mx-4"
                            size="small"
                            onClick={handleNext}
                          />
                        )} */}
                          {
                                              ideaEnableStatus !==1 ? 
                                           
                                                (<button onClick={handleideaenable} className='btn btn-secondary'>{t('idea_page.next')}</button>
                                            ):
                                            resList !==1 ?(
                                                <button onClick={handlePopup} className='btn btn-secondary'>{t('idea_page.next')}</button>

                                            ): <Button
                                            label={t('idea_page.next')}
                                            btnClass="primary mt-4 mx-4"
                                            size="small"
                                            onClick={handleNext}
                                        />}
                      </div>
                    </CardBody>
                  </Card>
                </Fragment>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionsPage;
