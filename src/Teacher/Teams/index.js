/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, List, Label, Card } from "reactstrap";
import { encryptGlobal } from "../../constants/encryptDecrypt";
import DataTable, { Alignment } from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { getCurrentUser } from "../../helpers/Utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// import { all_routes } from "../../Router/all_routes";
import { PlusCircle } from "feather-icons-react/build/IconComponents";
const Dashboard = () => {
  const navigate = useNavigate();

  // const route = all_routes;
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
          // console.log(response, '1');
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
    // history.push({
    //   pathname: `/createteam/${item.team_id}/${
    //     item.StudentCount ? item.StudentCount : "new"
    //   }`,
    // });
  };
  // console.log(teamsArray, '1');
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
        // maxlength: '5',
        width: "10rem",
      },
      {
        name: "Team Name",
        selector: (row) => row.team_name,
        // sortable: true,
        // maxlength: '5',
        width: "15rem",
      },
      // {
      //     name: 'MentorName',
      //     selector: 'moc_name',
      //     width: '20rem'
      // },
      // {
      //     name: 'Gender',
      //     selector: 'moc_gender',
      //     width: '10rem'
      // },
      // {
      //     name: 'Mobile No',
      //     selector: 'moc_phone',
      //     width: '20rem'
      // },
      // {
      //     name: 'Email Id',
      //     selector: 'moc_email',
      //     width: '20rem'
      // },
      {
        name: "Team Count",
        selector: (row) => row.StudentCount,
        width: "15rem",
      },
      {
        name: "Actions",
        cell: (params) => {
          return [
            // <div key={params}>
            //   {!params.StudentCount < 4 && (
            //     <div className="btn-group">
            //       <button
            //         className="btn btn-primary dropdown-toggle mr-5"
            //         type="button"
            //         data-bs-toggle="collapse"
            //         data-bs-target={`#collapseExample-${params.key}`}
            //         aria-expanded="false"
            //         aria-controls={`collapseExample-${params.key}`}
            //       >
            //         View
            //       </button>
            //       <div
            //         className="collapse"
            //         id={`collapseExample-${params.key}`}
            //       >
            //         <div className="card card-body">
            //           <p>
            //             Example content inside accordion for key: {params.key}
            //           </p>
            //           <p>Additional content can go here.</p>
            //         </div>
            //       </div>
            //     </div>
            //   )}
            // </div>,
            <div key={params}>
              {!params.StudentCount < 4 && (
                <div className="btn btn-primary  mr-5 mx-2">View</div>
              )}
            </div>,
            <div key={params} onClick={() => handleCreate(params)}>
              {process.env.REACT_APP_TEAM_LENGTH > params.StudentCount && (
                <div className="btn btn-success btn-added ">
                  Add
                  {/* {t('teacher_teams.create')} */}
                </div>
              )}
            </div>,
          ];
        },
        width: "15rem",
        left: true,
      },
    ],
  };

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-btn">
            <Link to="/createteam" className="btn btn-added btn-primary">
              <PlusCircle className="me-2" />
              Add Team & Students
            </Link>
          </div>
          <Row>
            <div className="ticket-data">
              <div className="my-2">
                <DataTableExtensions
                  print={false}
                  export={false}
                  {...adminTeamsList}
                >
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
                  />
                </DataTableExtensions>
              </div>
            </div>
          </Row>
          <Row className="pt-5">
            <Card className="w-100 p-5">
              <Label className="text-danger">
                Instructions for adding teams :
              </Label>
              <p>
                Adding student teams is the first and most important step as
                part of the project. Please ensure you are ready with the list
                of students and their details (Team Name,Student Full
                Name,Student Class,Student Age,Student Gender,Student
                Email,Student Disability Status) before you start creating
                teams. Please ensure you are selecting students who are
                interested and will benefit out of this program irrespective of
                their communication skills or academic performance.
              </p>
              <List>
                <li>
                  Go through the Team creation process video available in the
                  resource section before creating teams.
                </li>
                <li>Email id has to be unique for each student.</li>
                <li>Teacher email cannot be used for mentor & student.</li>
                <li>
                  Each team should have a minimum of 2 and maximum of 3
                  students.
                </li>
                <li>
                  Team name cannot be edited whereas student details can be
                  edited and they allow only alphanumeric characters.
                </li>
                <li>
                  Special characters (!,@,#,$...etc) are not allowed in team
                  name & student name.
                </li>
                <li>
                  Student delete button will be active only if the team has 3
                  students.
                </li>

                <li>
                  Change team option can be used only before initiating an idea.
                </li>
                <li>
                  If Idea is initiated by a team then
                  <ul>
                    <li>Students & Team cannot be deleted</li>
                    <li>Students cannot be changed / shifted to other teams</li>
                  </ul>
                </li>
              </List>
            </Card>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
