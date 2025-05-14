/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import Table from "../../core/pagination/datatable";

////////////////////New Code//////////////////////////
import { getCurrentUser } from "../../helpers/Utils";
import axios from "axios";
import { Mail } from "feather-icons-react/build/IconComponents";
import { IoHelpOutline } from "react-icons/io5";
import { CheckCircle } from "react-feather";
import { useEffect } from "react";
import { encryptGlobal } from "../../constants/encryptDecrypt";
import { getTeamMemberStatus } from "../store/teams/actions";
import { openNotificationWithIcon } from "../../helpers/Utils";
import team from "../../assets/img/icons/team.svg";
import { Row, Col } from "reactstrap";
import { Card, Progress } from "reactstrap";
import { Button } from "../../stories/Button";
import { Modal } from "react-bootstrap";
import Selects from "./Select";
import Swal from "sweetalert2/dist/sweetalert2";
import logout from "../../assets/img/logout.png";
import IdeaSubmissionCard from "../../components/IdeaSubmissionCard";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaPlay } from 'react-icons/fa';
import VideoModal from '../../HelpVideo/VideoModal';
import { useTranslation } from "react-i18next";

const TeamsProgDD = ({ user, setApproval, setIdeaCount }) => {
  const [ideaShow, setIdeaShow] = useState(false);
  const [ChangeShow, setChangeShow] = useState(false);
   const { t } = useTranslation();
  const [show , setShow] = useState(false);
  const [video , setVideo] = useState("");
  //////////////New Code/////////////////////////
  const dispatch = useDispatch();
  const currentUser = getCurrentUser("current_user");

  const { teamsMembersStatus, teamsMembersStatusErr } = useSelector(
    (state) => state.teams
  );
  const [isEvlCom, setIsEvlCom] = useState(false);
  const [isideadisable, setIsideadisable] = useState(false);

  const [formData, setFormData] = useState({});
  const [teamId, setTeamId] = useState(null);
  const [mentorid, setmentorid] = useState("");
  const [showDefault, setshowDefault] = useState(true);
  const [ideaStatusEval, setIdeaStatusEval] = useState("-");
  const [isReject, setIsreject] = React.useState(false);
  const [reason, setReason] = React.useState("");
  const [noData,setNoData]=useState(false);
  const selectData = [
    "Not novel - Idea and problem common and already in use.",
    "Not novel - Idea has been 100% plagiarized.",
    "Not useful - Idea does not solve the problem identified / problem & solution not connected.",
    "Not understandable - Idea Submission does not have proper details to make a decision.",
    "Not clear (usefulness)",
    "Not filled - Inaccurate data (form is not filled properly)",
  ];
  useEffect(() => {
    if (teamId) {
      dispatch(getTeamMemberStatus(teamId, setshowDefault));
      submittedApi(teamId);
    }
  }, [teamId, dispatch]);
  const percentageBWNumbers = (a, b) => {
    return (((a - b) / a) * 100).toFixed(2);
  };
  useEffect(() => {
    if (user) {
      setmentorid(user[0].mentor_id);
    }
  }, [user]);
  const [teamsList, setTeamsList] = useState([]);
  useEffect(() => {
    if (mentorid) {
      setshowDefault(true);
      teamNameandIDsbymentorid(mentorid);
    }
  }, [mentorid]);

  const teamNameandIDsbymentorid = (mentorid) => {
    const teamApi = encryptGlobal(
      JSON.stringify({
        mentor_id: mentorid,
      })
    );
    var config = {
      method: "get",
      url:
        process.env.REACT_APP_API_BASE_URL +
        `/teams/namebymenterid?Data=${teamApi}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${currentUser.data[0]?.token}`,
      },
    };
    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          setTeamsList(response.data.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const columns = [
    {
      // title: "Name",
      title: t("teacherJourney.Name"), 
      dataIndex: "full_name",
      width: "15rem",
    },
    {
      title: t("teacherJourney.PreSurvey"),
      dataIndex: "pre_survey_status",
      align: "center",
      width: "15rem",
      render: (_, record) =>
        record?.pre_survey_status ? (
          <CheckCircle size={20} color="#28C76F" />
        ) : (
          <IoHelpOutline size={20} color="#FF0000" />
        ),
    },
    {
      title: t("teacherJourney.leasson"),
      dataIndex: "address",
      align: "center",
      width: "30rem",
      render: (_, record) => {
        let percent =
          100 -
          percentageBWNumbers(
            record.all_topics_count,
            record.topics_completed_count
          );
        return (
         
          <div
            className="progress progress-sm progress-custom progress-animate"
            role="progressbar"
            aria-valuenow={Math.round(percent) ? Math.round(percent) : "0"}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              style={{ width: `${percent}%` }}
              className={
                percent
                  ? percent <= 25
                    ? "progress-bar bg-danger"
                    : percent > 25 && percent <= 50
                    ? "progress-bar bg-primary"
                    : percent > 50 && percent <= 75
                    ? "progress-bar bg-info"
                    : "progress-bar bg-success"
                  : "progress-bar bg-danger"
              }
            >
              <div
                className={
                  percent
                    ? percent <= 25
                      ? "progress-bar-value bg-danger"
                      : percent > 25 && percent <= 50
                      ? "progress-bar-value bg-primary"
                      : percent > 50 && percent <= 75
                      ? "progress-bar-value bg-info"
                      : "progress-bar-value bg-success"
                    : "progress-bar-value bg-danger"
                }
              >
                {Math.round(percent) ? Math.round(percent) : "0"}%
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: t("teacherJourney.dashIdea"),
      dataIndex: "idea_submission",
      align: "center",
      width: "20rem",
      render: (_, record) =>
        record?.idea_submission ? (
          <CheckCircle size={20} color="#28C76F" />
        ) : (
          <IoHelpOutline size={20} color="#FF0000" />
        ),
    },
    {
      title: t("teacherJourney.post"),
      dataIndex: "post_survey_status",
      align: "center",
      width: "10rem",
      render: (_, record) =>
        record?.post_survey_status ? (
          <CheckCircle size={20} color="#28C76F" />
        ) : (
          <IoHelpOutline size={20} color="#FF0000" />
        ),
    },
    {
      title: t("teacherJourney.coursecertificate"),
      dataIndex: "certificate",
      align: "center",
      width: "15rem",
      render: (_, record) =>
        record?.certificate ? (
          <CheckCircle size={20} color="#28C76F" />
        ) : (
          <IoHelpOutline size={20} color="#FF0000" />
        ),
    },
  ];
  const submittedApi = (teamId) => {
               // This function fetches idea submission details from the API //

    const Param = encryptGlobal(
      JSON.stringify({
        team_id: teamId,
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
            setFormData(response.data.data[0]);
            setNoData(false);

          }
        }
      })
      .catch(function (error) {
        if (error.response.status === 404) {
            setNoData(true);
        }
      });
  };

  const customer = teamsList.map((team) => ({
    value: team.team_id,
    label: team.team_name,
  }));

  const handleSelectChange = (selectedOption) => {
    setTeamId(selectedOption ? selectedOption.value : "");
  };

  const handleemailapi = () => {
    emailTeamCredentials();
  };
  useEffect(() => {
    const popaddParam = encryptGlobal("3");
    var config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + `/popup/${popaddParam}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${currentUser.data[0]?.token}`,
      },
    };
    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          if (response.data.data[0]?.on_off === "0") {
            setIsEvlCom(true);
          } else {
            setIsEvlCom(false);
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  ////////Email Team Credentisl////////////
  const emailTeamCredentials = () => {
    const teamCredMailApi = encryptGlobal(
      JSON.stringify({
        mentor_id: currentUser?.data[0]?.mentor_id,
        email: currentUser?.data[0]?.name,
      })
    );
    var config = {
      method: "get",
      url:
        process.env.REACT_APP_API_BASE_URL +
        `/dashboard/teamCredentials?Data=${teamCredMailApi}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${currentUser.data[0]?.token}`,
      },
    };
    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          openNotificationWithIcon(
            "success",
            t('teacherJourney.alerrt'),
          );
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
 
  
  const handleAlert = (handledText) => {
    // here we can delete the team //
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-submit",
        cancelButton: "btn btn-cancel",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title:
          handledText === "accept"
            ? "You are attempting to accept this Idea"
            : "You are attempting to reject this Idea",
        text: "Are you sure?",
        imageUrl: `${logout}`,
        confirmButtonText: "Reject",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        reverseButtons: false,
      })
      .then((result) => {
        if (result.isConfirmed) {
          if (result.isConfirmed) {
            handleL1Round(handledText);
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire("Cancelled", "", "error");
        }
      });
  };
  const handleL1Round = (handledText) => {
    // this function accept / reject the Idea //

   
    const body = JSON.stringify({
      verified_status: "REJECTED",
      status: "DRAFT",
      mentor_rejected_reason: handledText == "reject" ? reason : "",
    });
    const ideaID = encryptGlobal(
      JSON.stringify(
        formData.challenge_response_id
      )
    );
    var config = {
      method: "put",
      url: `${
        process.env.REACT_APP_API_BASE_URL +
        "/challenge_response/updateEntry/" +
        ideaID
      }`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.data[0]?.token}`,
      },
      data: body,
    };
    axios(config)
      .then(function (response) {
        openNotificationWithIcon(
          "success",
          response?.data?.message == "OK"
            ? t('teacherJourney.textnoti')
            : response?.data?.message
        );
        dispatch(getTeamMemberStatus(teamId, setshowDefault));
        submittedApi(teamId);
        window.location.reload();

      })
      .catch(function (error) {
        openNotificationWithIcon("error", error?.response?.data?.message);
      });
  };
  const handleReject = () => {
    if (reason) {
      handleAlert("reject");
      setIsreject(false);
    }
  };

  const renderTooltip = (props) => (
    <Tooltip id="pdf-tooltip" {...props} >
      Watch Demo
    </Tooltip>
  );

  const handleShow = () => {
    setVideo("https://www.youtube.com/embed/e0S4PRXLo0U?si=2-Avy3FT6Ryj_xIi");
    setShow(true);
  };
  

  return (
    <div>
      <div className="card table-list-card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h4 className="card-title mb-0">
            {" "}
            <img
              src={team}
              style={{
                marginRight: "6px",
                width: "7%",
                verticalAlign: "middle",
              }}
            />
            {t('teacherJourney.teamprog')} {" "}
            <div className="action-table-data" style={{"display": "inline-block"}}>
                <div className="edit-delete-action">
                  <OverlayTrigger placement="top" overlay={renderTooltip}>
                    <Link
                        to="#"
                        className="me-2 p-2"
                        onClick={() => handleShow()}
                        {...(show ? { 'data-bs-toggle': 'modal', 'data-bs-target': '#add-units' } : {})}
                        
                    >
                      <FaPlay  style={{color:"red"}} />
                    </Link>
                  </OverlayTrigger>
                </div>
              </div>
          </h4>
          <button
            className="btn btn-secondary d-flex align-items-center"
            onClick={handleemailapi}
          >
            <Mail
              className="feather-mail"
              size={20}
              style={{ marginRight: "5px" }}
            />{" "}
             {t('teacherJourney.logins')}
          </button>
        </div>
        <div className="card-body">
          <div className="table-top">
            <div className="form-sort select-bluk">
              <Select
                classNamePrefix="react-select"
                options={customer}
                placeholder="Choose a team"
                onChange={handleSelectChange}
                value={customer.find((option) => option.value === teamId)}
              />
            </div>
          
          {teamId && (
            <>
              <Row>
                <div className="singlediv">
                    <span className="fw-bold text-info"> {t('teacherJourney.IDEASTATUS')}</span>
                    <span style={{ paddingLeft: "1rem" }}>
                      {noData
          ? <span className="text-warning"> {t('teacherJourney.NOTSTARTED')}</span>
          : formData?.verified_status === "ACCEPTED"
          ? <span className="text-success">{t('teacherJourney.ACCEPTED')}</span>
          : formData?.verified_status === "REJECTED"
          ?  <span className="text-danger">{t('teacherJourney.REJECTED')}</span>
          : formData?.status || <span className="text-warning">{t('teacherJourney.NOTSTARTED')}</span>}
                    </span>
                </div>
              </Row>
              <>
                <div>
                  {!noData && (formData?.status === "SUBMITTED" || formData?.status === "DRAFT" ) && (
                    <button
                      className="btn btn-primary d-flex align-items-center"
                      
                      onClick={() => setIdeaShow(true)}
                    >{t('teacherJourney.ViewIdea')}</button>
                  )}
                </div>
                <div>
                  {!noData &&(formData?.status === "SUBMITTED" && formData?.verified_status !=="REJECTED" &&
                 (formData?.verified_status === null  || formData?.verified_status !== "ACCEPTED" )) ?(
                    <button
                      className="btn btn-danger d-flex align-items-center"
                      onClick={() => {
                        setIsreject(true);
                        setReason("");
                      }}
                    >
                      {t('teacherJourney.RejectSubmission')}
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </>
            </>
          )}
          </div>
          <div className="table-responsive">
            {showDefault && (
              <div className="d-flex justify-content-center align-items-center">
                <h4 className="text-primary">
                {t('teacherJourney.default')}
                </h4>
              </div>
            )}
            {teamsMembersStatus.length > 0 && !showDefault ? (
              <Table
                pagination={false}
                dataSource={teamsMembersStatus}
                columns={columns}
              />
            ) : teamsMembersStatusErr ? (
              <div className="d-flex justify-content-center align-items-center">
                <h4 className="text-danger">
                </h4>
              </div>
            ) : null}
          </div>
          {ideaShow && (
            <IdeaSubmissionCard
              show={ideaShow}
              handleClose={() => setIdeaShow(false)}
              response={formData}
              setIdeaCount={setIdeaCount}
            />
          )}
          {isReject && (
            <Modal
              show={isReject}
              onHide={() => setIsreject(false)}
              // {...props}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              className="assign-evaluator ChangePSWModal teacher-register-modal"
              backdrop="static"
              scrollable={true}
            >
              <Modal.Header closeButton onHide={() => setIsreject(false)}>
                <Modal.Title
                  id="contained-modal-title-vcenter"
                  className="w-100 d-block text-center"
                >
                   {t('teacherJourney.RejectIdeasubmission')}
                </Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <div className="my-3 text-center">
                  <h4> {t('teacherJourney.drop')}</h4>
                  <Col>
                    <Col className="m-5">
                      <Selects
                        list={selectData}
                        setValue={setReason}
                        placeHolder={"Please Select Reject Reason"}
                        value={reason}
                      />
                    </Col>
                  
                  </Col>
                </div>
                <div className="text-center">
                  <Button
                    label={t("teacherJourney.submit")}
                    btnClass={!reason ? "default" : "primary"}
                    size="small "
                    onClick={() => handleReject()}
                    disabled={!reason}
                  />
                </div>
              </Modal.Body>
            </Modal>
          )}
        </div>
        {show &&  <VideoModal v={video} setShow={setShow}/>}
      </div>
    </div>
  );
};

export default TeamsProgDD;
