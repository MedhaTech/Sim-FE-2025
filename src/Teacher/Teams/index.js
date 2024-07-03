/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, List, Label, Card } from "reactstrap";
import { encryptGlobal } from "../../constants/encryptDecrypt";
import DataTable, { Alignment } from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { getCurrentUser, openNotificationWithIcon } from "../../helpers/Utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  getAdminTeamMembersList,
  // studentResetPassword
} from "../../redux/actions";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { connect, useDispatch, useSelector } from "react-redux";
import "./tables.css";
import { PlusCircle } from "feather-icons-react/build/IconComponents";
const Dashboard = (props) => {
  const teamsListData = useSelector((state) => state?.teams?.teamsMembersList);
  // console.log(teamsListData, "ddd");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [teamsArray, setTeamsArray] = useState([]);
  const currentUser = getCurrentUser("current_user");
  const [teamsList, setTeamsList] = useState([]);
  useEffect(() => {
    if (currentUser?.data[0]?.mentor_id) {
      teamListbymentorid(currentUser?.data[0]?.mentor_id);
    }
  }, [currentUser?.data[0]?.mentor_id]);

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
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleViewClick = (teamId) => {
    if (selectedTeam === teamId) {
      setSelectedTeam(null);
    } else {
      setSelectedTeam(teamId);
      dispatch(getAdminTeamMembersList(teamId));
      // setTimeout(() => {
      // }, 1000);
      // props.getAdminTeamMembersListAction(teamId);
    }
    // scroll();
  };

  const adminTeamsList = {
    data: teamsArray,
    columns: [
      {
        name: "S.No",
        selector: (row) => row.key,
        width: "6rem",
      },
      {
        name: "Team Id",
        selector: (row) => row.team_id,
        // sortable: true,
        width: "10rem",
      },
      {
        name: "Team Name",
        selector: (row) => row.team_name,
        // sortable: true,
        width: "15rem",
      },

      {
        name: "Team Count",
        selector: (row) => row.StudentCount,
        width: "15rem",
      },
      {
        name: "Actions",
        cell: (params) => {
          return [
            <div key={params} onClick={() => handleViewClick(params.team_id)}>
              {!params.StudentCount < 4 && (
                <div className="btn btn-primary  mr-5 mx-2">
                  {" "}
                  {selectedTeam === params.team_id ? "Hide" : "View"}
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
                <div className="btn btn-success btn-added ">Add</div>
              )}
            </div>,
          ];
        },
        width: "15rem",
        left: true,
      },
    ],
  };
  // const handleDeleteTeamMember = (student) => {
  //   alert("hii");
  //   console.log(student, "student");
  // };
  const handleDeleteTeamMember = (student) => {
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
              openNotificationWithIcon("success", "Team Delete Successfully");
              history.push({
                pathname: "/teacher/teamlist",
              });
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
          <Row>
            {/* <div className="card-container mt-5"> */}
            {/* <div className="card"> */}
            {selectedTeam && (
              <div className="card mt-2" id="start">
                <h3 className="table-title">
                  Team Id :{selectedTeam} Students Details
                </h3>
                <div className="table-container">
                  <table className="student-table">
                    <thead>
                      <tr>
                        <th>Full Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Grade</th>
                        <th>Disability</th>
                        <th>Actions</th>
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
                            <div className="edit-delete-action">
                              <button
                                className="me-2 p-2"
                                // to="#"
                                // data-bs-toggle="modal"
                                // data-bs-target="#edit-units"
                                onClick={() => handleEdit(student)}
                              >
                                <i
                                  data-feather="edit"
                                  className="feather-edit"
                                />
                              </button>
                              {/* <Link
                                className=" confirm-text p-2"
                              >
                                {teamsListData && teamsListData.length > 2 && (
                                  <i
                                    key={student.team_id}
                                    data-feather="trash-2"
                                    className="feather-trash-2"
                                  />
                                )}
                                
                              </Link> */}
                            </div>
                          </td>
                          {/* <td>
                            <button
                              // onClick={() => handleEdit(student)}
                              // className="me-2 p-2"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-units"
                            >
                              <i data-feather="edit" className="feather-edit" />
                            </button>
                            <button
                              // onClick={() => handleDelete(student)}
                              className="delete-button"
                            >
                              <i
                                data-feather="trash-2"
                                className="feather-trash-2"
                              />
                            </button>
                          </td> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {/* </div> */}
            {/* </div> */}
            <div className="ticket-data">
              <div className="my-2">
                <DataTableExtensions
                  print={false}
                  export={false}
                  {...adminTeamsList}
                >
                  {/* {selectedTeam && (
                    <div>
                      <h3>Students in Team {selectedTeam}</h3>
                      <table>
                        <thead>
                          <tr>
                            <th>Student ID</th>
                            <th>User ID</th>
                            <th>Full Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                          </tr>
                        </thead>
                        <tbody>
                          {teamsListData
                            .filter(
                              (student) => student.team_id === selectedTeam
                            )
                            .map((student) => (
                              <tr key={student.student_id}>
                                <td>{student.student_id}</td>
                                <td>{student.user_id}</td>
                                <td>{student.full_name}</td>
                                <td>{student.Age}</td>
                                <td>{student.gender}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  )} */}
                  <DataTable
                    data={teamsArray}
                    defaultSortField="id"
                    defaultSortAsc={false}
                    pagination
                    highlightOnHover
                    fixedHeader
                    subHeaderAlign={Alignment.Center}
                    paginationRowsPerPageOptions={[25, 50, 100]}
                    paginationPerPage={25}
                    // expandableRows
                    // expandableRowsComponent={ExpandedComponent}
                    // expandOnRowClicked
                    // expandableRowExpanded={(row) =>
                    //   expandedRows.includes(row.team_id)
                    // }
                  />
                </DataTableExtensions>
              </div>
            </div>
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
