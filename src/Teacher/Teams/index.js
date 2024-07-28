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
// import { Button } from "../../.stories/Button";

import {
  getAdminTeamMembersList,
  // studentResetPassword
} from "../../redux/actions";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { connect, useDispatch, useSelector } from "react-redux";
import "./tables.css";
import Select from "../../RegPage/Select";
import { Modal } from "react-bootstrap";
import { PlusCircle } from "feather-icons-react/build/IconComponents";
const Dashboard = (props) => {
  const teamsListData = useSelector((state) => state?.teams?.teamsMembersList);
  const navigate = useNavigate();
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

  useEffect(() => {
    if (currentUser?.data[0]?.mentor_id) {
      teamListbymentorid(currentUser?.data[0]?.mentor_id);
    }
  }, [currentUser?.data[0]?.mentor_id]);
  const ideaStatusfun = (id) => {
    console.log(id, "id");
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
          // console.log(response, "teamId");

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
      // ideaStatusfun(selectedTeam);
    }
  }, [selectedTeam]);
  const teamListbymentorid = (mentorid) => {
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
    navigate(`/addstudent`, {
      state: {
        team_id: item.team_id,
      },
    });
  };

  const handleViewClick = (teamId, stuCount) => {
    if (selectedTeam === teamId) {
      setSelectedTeam(null);
    } else {
      dispatch(getAdminTeamMembersList(teamId));
      setStuList(stuCount);
      // props.getAdminTeamMembersListAction(teamId);
      setDataFinal([]);
      setTimeout(() => {
        setSelectedTeam(teamId);
      }, 1000);
    }
  };
  // const handleViewClick = async (teamId) => {
  //   if (selectedTeam === teamId) {
  //     setSelectedTeam(null);
  //   } else {
  //     dispatch(getAdminTeamMembersList(teamId));
  //     setDataFinal([])
  //     // dispatch(getAdminTeamMembersList(teamId));

  //            setTimeout(() => {
  //         setSelectedTeam(teamId);
  //       }, 1000);
  //     }
  //   }
  // };
  const adminTeamsList = {
    data: teamsArray,
    columns: [
      {
        name: "#",
        selector: (row) => row.key,
        width: "10%",
      },
      {
        name: "Username",

        selector: (row) => <div>{row.username}<br /> {row.team_name}</div>,

        // sortable: true,
        width: "40%",
      },
      // {
      //   name: "Password",

      //   selector: (row) => row.team_name.toLowerCase(),

      //   // sortable: true,
      //   width: "10rem",
      // },
      // {
      //   name: "Team Name",
      //   selector: (row) => row.team_name,
      //   // sortable: true,
      //   width: "15rem",
      // },

      // {
      //   name: "Team Count",
      //   selector: (row) => row.StudentCount,
      //   width: "15rem",
      // },
      {
        name: "Actions",
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
                  {" "}
                  {selectedTeam === params.team_id ? <div className="btn btn-dark btn-sm m-2">{<i data-feather="eye-off" className="feather-eye-off" />} {"Hide"} </div> : <div className="btn btn-primary btn-sm m-2">{<i data-feather="eye" className="feather-eye" />} {"View"} </div>}
                </div>
              )}
            </div>,

            // <div
            //   key={params}
            //   onClick={() =>
            //     handleViewClick(
            //       selectedTeam === params.team_id ? null : params.team_id
            //     )
            //   }
            // >
            //   {!params.StudentCount < 4 && (
            //     <div className="btn btn-primary  mr-5 mx-2">
            //       {" "}
            //       {selectedTeam === params.team_id ? "Hide" : "View"}
            //     </div>
            //   )}
            // </div>,

            <div key={params} onClick={() => handleCreate(params)}>
              {process.env.REACT_APP_TEAM_LENGTH > params.StudentCount && (
                <div className="btn btn-success btn-sm btn-added"> <i data-feather="plus-circle" className="feather-plus-circle" /> Add</div>
              )}
            </div>,
          ];
        },
        width: "50%",
        left: true,
      },
    ],
  };

  const handleDeleteTeam = (student) => {
    // console.log(student);
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#00ff00",
      confirmButtonText: "Yes, delete it!",
      cancelButtonColor: "#ff0000",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const paramId = encryptGlobal(JSON.stringify(student));
        var config = {
          method: "delete",
          url: process.env.REACT_APP_API_BASE_URL + "/teams/" + paramId,
          headers: {
            "Content-Type": "application/json",
            // Accept: "application/json",
            Authorization: `Bearer ${currentUser?.data[0]?.token}`,
          },
        };
        axios(config)
          .then(function (response) {
            if (response.status === 200) {
              teamListbymentorid(currentUser?.data[0]?.mentor_id);
              // dispatch(getAdminTeamMembersList(selectedTeam));
              openNotificationWithIcon("success", "Team Deleted Successfully");

              navigate("/teacher-dashboard");
            } else {
              openNotificationWithIcon("error", "Opps! Something Wrong");
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        MySwal.fire("Cancelled", "Team not Deleted", "error");
      }
    });
  };
  const handleDeleteStudent = (item) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#00ff00",
      confirmButtonText: "Yes, delete it!",
      cancelButtonColor: "#ff0000",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const delparamId = encryptGlobal(JSON.stringify(item.student_id));
        var config = {
          method: "delete",
          url: process.env.REACT_APP_API_BASE_URL + "/students/" + delparamId,
          headers: {
            "Content-Type": "application/json",
            // Accept: "application/json",
            Authorization: `Bearer ${currentUser?.data[0]?.token}`,
          },
        };
        axios(config)
          .then(function (response) {
            if (response.status === 200) {
              teamListbymentorid(currentUser?.data[0]?.mentor_id);
              dispatch(getAdminTeamMembersList(selectedTeam));
              openNotificationWithIcon(
                "success",
                "Student Deleted Successfully"
              );
              // navigate("/teacher-dashboard");
            } else {
              openNotificationWithIcon("error", "Opps! Something Wrong");
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        MySwal.fire("Cancelled", "Student not Deleted", "error");
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
    if (teamsListData.length > 2) {
      teamListby();
      setselectedstudent(item);
    } else {
      openNotificationWithIcon("error", "Opps! Something Wrong");
    }
  };
  const teamListby = () => {
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
              if (item.StudentCount < 3 && item.ideaStatus === null) {
                teamlistobj[item.team_name] = item.team_id;
                return item.team_name;
              }
            })
            .filter(Boolean);
          if (Object.keys(teamlistobj).length > 0) {
            let index = listofteams.indexOf(selectedTeam.team_name);

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
          openNotificationWithIcon("success", "Successfully team changed");
          navigate({
            pathname: "/teacher-dashboard",
          });
        } else {
          openNotificationWithIcon("error", "Opps! Something Wrong");
        }
      })

      .catch(function (error) {
        console.log(error);
        if (error.message === "Request failed with status code 400") {
          openNotificationWithIcon(
            "error",
            "Same Name student already existed in seleted team"
          );
        }
      });
    setShow(false);
  };
  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-btn mb-2">
            <Link to="/createteam" className="btn btn-added btn-primary">
              <PlusCircle className="me-2" />
              Add Team & Students
            </Link>
          </div>
          {show && (
            <Modal
              show={show}
              // onHide={() => setShow(false)}
              //{...props}
              // size="sm"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              className="assign-evaluator ChangePSWModal teacher-register-modal"
              backdrop="static"
            // scrollable={true}
            >
              <Modal.Header closeButton onHide={() => setShow(false)}>
                <Modal.Title
                  id="contained-modal-title-vcenter"
                  className="w-100 d-block text-center"
                >
                  Teams Change
                </Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <div className="my-3 text-center ">
                  <h3 className="mb-sm-4 mb-3">
                    Please select Team to switch student
                  </h3>
                  <Select
                    list={teamlist}
                    setValue={setvalue}
                    placeHolder={"Please Select team"}
                    value={value}
                  />
                </div>

                <div className="text-center">
                  <button
                    label={"Submit"}
                    // btnClass={!value ? "default" : "primary"}
                    className="btn btn-warning"
                    onClick={() => handleChangeStudent(value)}
                    disabled={!value}
                  >
                    Submit
                  </button>
                </div>
              </Modal.Body>
            </Modal>
          )}
          <Row>
            <Col className="form-group"
              xs={12}
              sm={12}
              md={12}
              xl={4}>
              <h4>Teams List</h4>
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
            <Col className="form-group"
              xs={12}
              sm={12}
              md={12}
              xl={8}>
              <h4>Team Details</h4>
              {selectedTeam && (
                <div className="card mt-2 p-2" id="start">
                  <Row>
                    <Col>
                      <h5 className="table-title">
                        Team Name : ----
                      </h5>
                      <h5 className="table-title">
                        Team Email Address : ----
                      </h5>
                    </Col>
                    <Col>
                      <h5 className="table-title">
                        Login ID : ----
                      </h5>
                      <h5 className="table-title">
                        Password : ----
                      </h5>
                    </Col>
                  </Row>
                  <Row className="mb-2 mt-2">
                    <Col>
                      <h5 className="mt-1 mb-1"> Team Members </h5>
                    </Col>
                    <Col className="text-right">
                      {stuList == 2 && (
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteTeam(selectedTeam)}
                        >
                          <i data-feather="trash-2" className="feather-trash-2" />
                          {" Delete Team"}
                        </button>
                      )}
                    </Col>
                  </Row>
                  <div className="table-container">
                    <table className="student-table">
                      <thead>
                        <tr>
                          <th width="25%">Full Name</th>
                          <th width="10%">Age</th>
                          <th width="15%">Gender</th>
                          <th width="10%">Grade</th>
                          <th width="20%">Disability</th>
                          <th width="20%">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teamsListData.map((student, index) => (
                          <tr key={index}>
                            <td>{student.full_name}</td>
                            <td>{student.Age}</td>
                            <td>{student.Gender}</td>
                            <td>{student.Grade}</td>
                            <td>{student.disability}</td>
                            <td>
                              {/* <div className="edit-delete-action"> */}
                              <button
                                className="me-2 p-2 btn btn-info btn-sm"
                                onClick={() => handleEdit(student)}
                              >
                                <i data-feather="edit" className="feather-edit" />
                                {/* Edit */}
                              </button>
                              {stuList > 2 && (
                                <button
                                  className="me-2 p-2 btn btn-danger btn-sm"
                                  onClick={() => handleDeleteStudent(student)}
                                >
                                  <i
                                    data-feather="trash-2"
                                    className="feather-trash-2"
                                  />
                                </button>
                              )}
                              {stuList > 2 && (
                                // IdeaStatus === "No Idea" &&
                                <button
                                  className="me-2 p-2 btn btn-secondary btn-sm"
                                  onClick={() => handleSwitchTeam(student)}
                                >
                                  <FontAwesomeIcon
                                    icon={faUsers}
                                    data-bs-toggle="tooltip"
                                    title="fa fa-users"
                                  />
                                </button>
                              )}
                              {/* </div> */}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
