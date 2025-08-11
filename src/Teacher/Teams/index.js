/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, List, Label, Card, Col } from "reactstrap";
import { encryptGlobal } from "../../constants/encryptDecrypt";
import DataTable, { Alignment } from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { getCurrentUser, openNotificationWithIcon } from "../../helpers/Utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { teamLength } from "../../RegPage/ORGData";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { Tooltip } from "react-bootstrap";

import { getAdminTeamMembersList } from "../../redux/actions";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { connect, useDispatch, useSelector } from "react-redux";
import "./tables.css";
import Select from "../../RegPage/Select";
import { useTranslation } from "react-i18next";

import { Modal } from "react-bootstrap";
import { PlusCircle } from "feather-icons-react/build/IconComponents";
const Dashboard = (props) => {
  const teamsListData = useSelector((state) => state?.teams?.teamsMembersList);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [teamsArray, setTeamsArray] = useState([]);
  const currentUser = getCurrentUser("current_user");
  const [teamsList, setTeamsList] = useState([]);
  const [show, setShow] = useState(false);
  const [teamlist, setteamlist] = useState([]);
  const [datafinal, setDataFinal] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [stuList, setStuList] = useState("");
  const [selectedstudent, setselectedstudent] = useState();
  const [IdeaStatus, setIdeaStatus] = useState("No Idea");
  const [teamchangeobj, setteamchangeObj] = useState({});
  const [value, setvalue] = useState("");
  const [ViewedTeam, setViewedTeam] = useState();
  const loginState = currentUser?.data[0]?.state;
  const getTeamLength = (loginState) => {
    // Use `teamLength` object to determine the team length.
    return loginState === "Tamil Nadu"
      ? teamLength["Tamil Nadu"]
      : teamLength.default;
  };

  const teamLengthValue = getTeamLength(loginState);

  useEffect(() => {
    if (currentUser?.data[0]?.mentor_id) {
      teamListbymentorid(currentUser?.data[0]?.mentor_id);
    }
  }, [currentUser?.data[0]?.mentor_id]);
  const ideaStatusfun = (id) => {
    // Function to fetch the Ideas Status from the API

    const ideaStatusparam = encryptGlobal(
      JSON.stringify({
        team_id: id,
      })
    );
    var config = {
      method: "get",
      url:
        process.env.REACT_APP_API_BASE_URL +
        `/challenge_response/ideastatusbyteamId?Data=${ideaStatusparam}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${currentUser.data[0]?.token}`,
      },
    };
    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          setIdeaStatus(response.data.data[0].ideaStatus);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    setDataFinal(teamsListData);
    if (selectedTeam) {
      ideaStatusfun(selectedTeam);
    }
  }, [selectedTeam]);

  const teamListbymentorid = (mentorid) => {
    // Function to fetch the all Teams List from the API

    const teamparam = encryptGlobal(
      JSON.stringify({
        mentor_id: mentorid,
      })
    );
    var config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + `/teams/list?Data=${teamparam}`,
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
  useEffect(() => {
    var teamsArrays = [];
    teamsList.map((teams, index) => {
      var key = index + 1;
      return teamsArrays.push({ ...teams, key });
    });
    setTeamsArray(teamsArrays);
  }, [teamsList]);
  const handleCreate = (item) => {
    // where item = team name //
    // where we can add team member details //
    localStorage.setItem("team_id", item.team_id);
    navigate(`/addstudent`, {
      state: {
        team_id: item.team_id,
      },
    });
  };

  const renderViewTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>
      {t("teacherJourney.option17")}
    </Tooltip>
  );
  const renderAddTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>
      {t("teacherJourney.option18")}
    </Tooltip>
  );
  const renderHideTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>
      {t("teacherJourney.option19")}
    </Tooltip>
  );
  const renderEditTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>
      {t("teacherJourney.option20")}
    </Tooltip>
  );
  const renderSwitchTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>
      {t("teacherJourney.option21")}
    </Tooltip>
  );

  const renderDelTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>
      {t("teacherJourney.option22")}
    </Tooltip>
  );

  const findTeamDetails = (id) => {
    const team = teamsList.find((item) => item.team_id === id);
    setViewedTeam(team);
  };

  const handleViewClick = (teamId, stuCount) => {
    if (selectedTeam === teamId) {
      setSelectedTeam(null);
    } else {
      findTeamDetails(teamId);
      dispatch(getAdminTeamMembersList(teamId));
      setStuList(stuCount);
      setDataFinal([]);
      setTimeout(() => {
        setSelectedTeam(teamId);
      }, 1000);
    }
  };

  const adminTeamsList = {
    data: teamsArray,
    columns: [
      {
        name: <b style={{ color: "crimson" }}>#</b>,
        selector: (row, index) => index + 1,
        width: "14%",
      },
      {
        name: (
          <b style={{ color: "crimson" }}>{t("teacherJourney.teamnames")}</b>
        ),

        selector: (row) => (
          <div>
            {row.username}
            <br />
            {row.team_name.toLowerCase().replace(/\s+/g, "")}
          </div>
        ),

        width: "40%",
      },

      {
        name: <b style={{ color: "crimson" }}>{t("teacherJourney.liststu")}</b>,
        selector: (row) => (
          <span
            style={{
              width: "15px",
              height: "15px",
              alignItems: "center",
              background: "#FF9F43",
              borderRadius: "50%",
              color: "white",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {row.StudentCount}
          </span>
        ),
        width: "18%",
      },
      {
        name: <b style={{ color: "crimson" }}>{t("teacherJourney.actions")}</b>,
        cell: (params) => {
          return [
            <div
              key={params}
              onClick={() =>
                handleViewClick(params.team_id, params.StudentCount)
              }
            >
              {!params.StudentCount < 4 && (
                <div>
                  {selectedTeam === params.team_id ? (
                    <OverlayTrigger placement="top" overlay={renderHideTooltip}>
                      <Link data-bs-toggle="tooltip" data-bs-placement="top">
                        <div className="btn btn-dark btn-sm m-2">
                          {
                            <i
                              data-feather="eye-off"
                              className="feather-eye-off"
                            />
                          }{" "}
                        </div>
                      </Link>
                    </OverlayTrigger>
                  ) : (
                    <OverlayTrigger placement="top" overlay={renderViewTooltip}>
                      <Link data-bs-toggle="tooltip" data-bs-placement="top">
                        <div className="btn btn-info btn-sm m-2">
                          {<i data-feather="eye" className="feather-eye" />}{" "}
                        </div>
                      </Link>
                    </OverlayTrigger>
                  )}
                </div>
              )}
            </div>,

            <div key={params} onClick={() => handleCreate(params)}>
              {teamLengthValue > params.StudentCount &&
                params.ideaStatus === null && (
                  <OverlayTrigger placement="top" overlay={renderAddTooltip}>
                    <Link data-bs-toggle="tooltip" data-bs-placement="top">
                      <div className="btn btn-success btn-sm btn-added">
                        {" "}
                        <i
                          data-feather="plus-circle"
                          className="feather-plus-circle"
                        />
                      </div>
                    </Link>
                  </OverlayTrigger>
                )}
            </div>,
          ];
        },
        width: "28%",
        left: true,
      },
    ],
  };

  const handleDeleteTeam = (student) => {
    // Function to fetch Delete The team from the API
    const btnLabel = t("general_req.btn_ok");
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: t("general_req.are_you_sure"),
      text: t("general_req.revert"),
      showCancelButton: true,
      confirmButtonColor: "#00ff00",
      //  confirmButtonText: t('general_req.btn_ok') ,
      confirmButtonText: btnLabel,
      cancelButtonColor: "#ff0000",
      cancelButtonText: t("general_req.btn_cancel"),
    }).then((result) => {
      if (result.isConfirmed) {
        const paramId = encryptGlobal(JSON.stringify(student));
        var config = {
          method: "delete",
          url: process.env.REACT_APP_API_BASE_URL + "/teams/" + paramId,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser?.data[0]?.token}`,
          },
        };
        axios(config)
          .then(function (response) {
            if (response.status === 200) {
              teamListbymentorid(currentUser?.data[0]?.mentor_id);

              openNotificationWithIcon("success", t("teacherJourney.popup12"));
              window.location.reload();
            } else {
              openNotificationWithIcon("error", "Opps! Something Wrong");
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        MySwal.fire({
          title: t("teacherJourney.option28"),
          text: t("teacherJourney.option29"),
          icon: "error",
          confirmButtonText: btnLabel,
        });
        // MySwal.fire(t('teacherJourney.option28'), t('teacherJourney.option29'), "error");
      }
    });
  };
  const handleDeleteStudent = (item) => {
    // Function to fetch Delete The Student from the API
    const btnLabel = t("general_req.btn_ok");
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: t("general_req.are_you_sure"),
      text: t("general_req.revert"),
      showCancelButton: true,
      confirmButtonColor: "#00ff00",
      confirmButtonText: btnLabel,
      cancelButtonColor: "#ff0000",
      cancelButtonText: t("general_req.btn_cancel"),
    }).then((result) => {
      if (result.isConfirmed) {
        const delparamId = encryptGlobal(JSON.stringify(item.student_id));
        var config = {
          method: "delete",
          url: process.env.REACT_APP_API_BASE_URL + "/students/" + delparamId,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser?.data[0]?.token}`,
          },
        };
        axios(config)
          .then(function (response) {
            if (response.status === 200) {
              teamListbymentorid(currentUser?.data[0]?.mentor_id);
              dispatch(getAdminTeamMembersList(selectedTeam));
              openNotificationWithIcon("success", t("teacherJourney.popup11"));
              window.location.reload();
            } else {
              openNotificationWithIcon("error", "Opps! Something Wrong");
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        MySwal.fire({
          title: t("teacherJourney.option28"),
          text: t("teacherJourney.popup14"),
          icon: "error",
          confirmButtonText: btnLabel,
        });
        // MySwal.fire({t('teacherJourney.option28'),  t('teacherJourney.popup14'), "error"});
      }
    });
  };
  const scroll = () => {
    const section = document.querySelector("#start");
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const handleEdit = (item) => {
    navigate("/studentedit", {
      state: {
        full_name: item.full_name,
        Age: item.Age,
        Gender: item.Gender,
        Grade: item.Grade,
        disability: item.disability,
        team_id: item.team_id,
        username: item?.user?.username,
        email: item.email,
        user_id: item.user_id,
        student_id: item.student_id,
      },
    });
  };
  const customStyles = {
    head: {
      style: {
        fontSize: "1em", // Adjust as needed
      },
    },
  };
  const handleSwitchTeam = (item) => {
    // Function to fetch Switch from one Team to another Team

    if (teamsListData.length > 1) {
      teamListby();
      setselectedstudent(item);
    } else {
      openNotificationWithIcon("error", "Opps! Something Wrong");
    }
  };
  const teamListby = () => {
    // Function to fetch all Teams list  from the API

    const teamListbymentorparam = encryptGlobal(
      JSON.stringify({
        mentor_id: currentUser?.data[0]?.mentor_id,
      })
    );

    var config = {
      method: "get",
      url:
        process.env.REACT_APP_API_BASE_URL +
        `/teams/listwithideaStatus?Data=${teamListbymentorparam}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${currentUser.data[0]?.token}`,
      },
    };
    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          const teamlistobj = {};
          const listofteams = response.data.data
            .map((item) => {
              if (loginState !== "Tamil Nadu") {
                if (item.StudentCount < 5 && item.ideaStatus === null) {
                  teamlistobj[item.team_name] = item.team_id;
                  return item.team_name;
                }
              } else {
                if (item.StudentCount < 5 && item.ideaStatus === null) {
                  teamlistobj[item.team_name] = item.team_id;
                  return item.team_name;
                }
              }
            })
            .filter(Boolean);

          if (Object.keys(teamlistobj).length > 0) {
            const matchingTeamKey = Object.entries(teamlistobj).find(
              ([key, value]) => value === selectedTeam
            )?.[0];
            let index = listofteams.indexOf(matchingTeamKey);

            if (index >= 0) {
              listofteams.splice(index, 1);
            }
          }
          setteamlist(listofteams);
          setteamchangeObj(teamlistobj);
          setShow(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleChangeStudent = (name) => {
    // Function to  change student from  one team to another team from the API

    const body = {
      team_id: teamchangeobj[name].toString(),
      full_name: selectedstudent.full_name,
    };
    const stuparamId = encryptGlobal(
      JSON.stringify(selectedstudent.student_id)
    );
    var config = {
      method: "PUT",
      url: process.env.REACT_APP_API_BASE_URL + "/students/" + stuparamId,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.data[0]?.token}`,
      },
      data: body,
    };
    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          setvalue("");
          teamListbymentorid(currentUser?.data[0]?.mentor_id);
          dispatch(getAdminTeamMembersList(selectedTeam));
          openNotificationWithIcon("success", t("teacherJourney.popup9"));
          navigate({
            pathname: "/mentorteams",
          });
          setSelectedTeam(null);
        } else {
          openNotificationWithIcon("error", t("teacherJourney.popup13"));
        }
      })

      .catch(function (error) {
        console.log(error);
        if (error.message === "Request failed with status code 400") {
          openNotificationWithIcon("error", t("teacherJourney.popup10"));
        }
      });
    setShow(false);
  };

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4> {t("teacherJourney.teamsmenu")}</h4>
                <h6>{t("teacherJourney.text")}</h6>
              </div>
            </div>
            <ul className="table-top-head">
              <li>
                <div className="page-btn mb-2">
                  <Link to="/createteam" className="btn btn-added btn-primary">
                    <PlusCircle style={{ color: "white" }} />
                    {t("teacherJourney.addteam")}
                  </Link>
                </div>
              </li>
            </ul>
          </div>

          {show && (
            <Modal
              show={show}
              aria-labelledby="contained-modal-title-vcenter"
              centered
              className="assign-evaluator ChangePSWModal teacher-register-modal"
              backdrop="static"
            >
              <Modal.Header closeButton onHide={() => setShow(false)}>
                <Modal.Title
                  id="contained-modal-title-vcenter"
                  className="w-100 d-block text-center"
                >
                  {t("teacherJourney.TeamsChange")}
                </Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <div className="my-3 text-center ">
                  <h5 className="mb-sm-4 mb-3">{t("teacherJourney.switch")}</h5>
                  <Select
                    list={teamlist}
                    setValue={setvalue}
                    placeHolder={t("teacherJourney.option24")}
                    value={value}
                  />
                </div>

                <div className="text-center">
                  <button
                    label={"Submit"}
                    className="btn btn-warning"
                    onClick={() => handleChangeStudent(value)}
                    disabled={!value}
                  >
                    {t("teacherJourney.submit")}
                  </button>
                </div>
              </Modal.Body>
            </Modal>
          )}
          <Row>
            <Col className="form-group" xs={12} sm={12} md={12} xl={4}>
              <div className="ticket-data">
                <div className="my-2">
                  <DataTableExtensions
                    print={false}
                    export={false}
                    filter={false}
                    {...adminTeamsList}
                  >
                    <DataTable
                      data={teamsArray}
                      defaultSortField="id"
                      filter={false}
                      customStyles={customStyles}
                      defaultSortAsc={false}
                      pagination={false}
                      highlightOnHover
                      fixedHeader
                      subHeaderAlign={Alignment.Center}
                      paginationRowsPerPageOptions={[25, 50, 100]}
                      paginationPerPage={25}
                    />
                  </DataTableExtensions>
                </div>
              </div>
            </Col>
            <Col className="form-group" xs={12} sm={12} md={12} xl={8}>
              {selectedTeam && (
                <div className="card mt-2 p-2" id="start">
                  <div style={{ padding: "10px" }}>
                    <Row className="modal-body-table">
                      <h5> {t("teacherJourney.teamdetails")}</h5>
                      <br />
                      <br />
                      <Col>
                        <p>
                          {t("teacherJourney.tname")} : {ViewedTeam.team_name}
                        </p>
                        <p>
                          {t("teacherJourney.temail")} :{" "}
                          {ViewedTeam.team_email ? ViewedTeam.team_email : "-"}
                        </p>
                      </Col>
                      <Col>
                        <p>
                          {t("teacherJourney.longinid")} : {ViewedTeam.username}
                        </p>
                        <p>
                          {t("teacherJourney.password")} :{" "}
                          {ViewedTeam.team_name
                            .toLowerCase()
                            .replace(/\s+/g, "")}
                        </p>
                      </Col>
                    </Row>
                  </div>

                  <div className="card flex-fill default-cover mb-4">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h4 className="card-title mb-0">
                        {t("teacherJourney.teammember")}
                      </h4>
                      <div className="view-all-link">
                        <Link
                          to="#"
                          className="view-all d-flex align-items-center"
                        >
                          {stuList === 2 && IdeaStatus === "No Idea" && (
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDeleteTeam(selectedTeam)}
                            >
                              <i
                                data-feather="trash-2"
                                className="feather-trash-2"
                              />
                              {t("teacherJourney.DeleteTeam")}
                            </button>
                          )}
                        </Link>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive dataview">
                        <table className="table dashboard-expired-products">
                          <thead>
                            <tr>
                              <th style={{ color: "crimson" }}>
                                {t("teacherJourney.tfullname")}
                              </th>
                              {/* <th style={{color:"crimson"}}>{t('teacherJourney.eamil')}</th> */}
                              <th style={{ color: "crimson" }}>
                                {t("teacherJourney.disability")}
                              </th>
                              <th style={{ color: "crimson" }}>
                                {t("teacherJourney.age")}
                              </th>
                              <th style={{ color: "crimson" }}>
                                {t("teacherJourney.class")}
                              </th>
                              <th style={{ color: "crimson" }}>
                                {t("teacherJourney.gender")}
                              </th>
                              <th style={{ color: "crimson" }}>
                                {t("teacherJourney.actions")}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {teamsListData.map((student, index) => (
                              <tr key={index}>
                                <td>{student.full_name}</td>
                                {/* <td>{student.email ? (student.email.length > 16 ? student.email.slice(0, 16) + "..." : student.email) : "-"}</td> */}

                                <td>{student.disability}</td>

                                <td>{student.Age}</td>
                                <td>{student.Grade}</td>
                                <td>{student.Gender}</td>
                                <td className="action-table-data">
                                  <div className="edit-delete-action">
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={renderEditTooltip}
                                    >
                                      <Link
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        className="me-2 p-2"
                                        to="#"
                                        onClick={(e) => {
                                          e.preventDefault(); // Prevent the default link behavior
                                          handleEdit(student);
                                        }}
                                      >
                                        <i
                                          data-feather="edit"
                                          className="feather-edit"
                                        />
                                      </Link>
                                    </OverlayTrigger>

                                    {stuList > 2 &&
                                      IdeaStatus === "No Idea" && (
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={renderSwitchTooltip}
                                        >
                                          <Link
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="top"
                                            className="p-2 me-2"
                                            to="#"
                                            onClick={() =>
                                              handleSwitchTeam(student)
                                            }
                                          >
                                            <FontAwesomeIcon
                                              icon={faUsers}
                                              title="fa fa-users"
                                            />
                                          </Link>
                                        </OverlayTrigger>
                                      )}

                                    {stuList > 2 &&
                                      IdeaStatus === "No Idea" && (
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={renderDelTooltip}
                                        >
                                          <Link
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="top"
                                            className="p-2"
                                            to="#"
                                            onClick={() =>
                                              handleDeleteStudent(student)
                                            }
                                          >
                                            <i
                                              data-feather="trash-2"
                                              className="feather-trash-2"
                                            />
                                          </Link>
                                        </OverlayTrigger>
                                      )}
                                  </div>

                                  {/* </div> */}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ teams }) => {
  const { teamsMembersList } = teams;
  return { teamsMembersList };
};

export default connect(mapStateToProps, {
  getAdminTeamMembersListAction: getAdminTeamMembersList,
})(Dashboard);
