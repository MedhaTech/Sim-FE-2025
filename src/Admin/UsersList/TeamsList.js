/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'reactstrap';
import { Button } from '../../stories/Button';

import axios from 'axios';
import { URL, KEY } from '../../constants/defaultValues.js';

import { getNormalHeaders } from '../../helpers/Utils';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import logout from '../../assets/img/logout.png';
import DataTable, { Alignment } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import ClipLoader from 'react-spinners/ClipLoader';


import { useDispatch } from 'react-redux';
import { encryptGlobal } from '../../constants/encryptDecrypt.js';
import { stateList } from '../../RegPage/ORGData.js';

const TicketsPage = (props) => {
    const dispatch = useDispatch();
    const [tableData, settableData] = React.useState([]);
    const [showspin, setshowspin] = React.useState(false);
    const district = localStorage.getItem('dist');
const updateStatesList=["All States",...stateList];


    const [studentDist, setstudentDist] = useState(district ? district : '');
    const [mentorDist, setmentorDist] = useState('');
    const [fetchData, setFetchData] = useState(false);
    const [state,setState]=useState("");
  
    const handleclickcall = async () => {
        // where we can select district and sdg //
        // where we can see list of challenges districtwise //
        setshowspin(true);
        await handleideaList();
    };
  
    async function handleideaList() {
        setFetchData(true);
        // handleideaList api //
        //where we can see all ideas in districtwise //
        settableData([]);
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
       
        const resparam = encryptGlobal(
            JSON.stringify({
                state: state ,
                
            })
        );
        await axios
        .get(`${URL.getTeamsList}?Data=${resparam}`, axiosConfig)
            .then(function (response) {
                if (response.status === 200) {
                    setFetchData(false);

                    const updatedWithKey =
                        response.data &&
                        response.data.data.
                        map((item, i) => {
                            const upd = { ...item };
                            upd['key'] = i + 1;
                            return upd;
                        });
                    settableData(updatedWithKey);
                    setshowspin(false);
                }
            })
            .catch(function (error) {
                console.log(error);
                setshowspin(false);
            });
    }
  

   
   

  
 
    const StudentsData = {
        data: tableData && tableData.length > 0 ? tableData : [],
        columns: [
            {
                name: 'No',
                selector: (row, key) => key + 1,
                cellExport: (row) => row.index,
                width: '4rem'
            },
              {
                name: 'UDISE Code',
                selector: (row) => row?.
                mentor.organization.
                organization_code,
                cellExport: (row) => row?.mentor.
                organization.
                organization_code,
                sortable: true,
                width: '8rem'
            },
            {
                name: 'State',
                selector: (row) =>  row?.
                mentor.organization.state,
                cell: (row) => (
                    <div
                        style={{
                            whiteSpace: 'pre-wrap',
                            wordWrap: 'break-word'
                        }}
                    >
                        {row?.
                mentor.organization.state}
                    </div>
                ),
                cellExport: (row) => row?.
                mentor.organization.state,
                sortable: true,
                width: '9rem'
            },
            {
                name: 'District',
                selector: (row) =>  row?.
                mentor.organization.district,
                cell: (row) => (
                    <div
                        style={{
                            whiteSpace: 'pre-wrap',
                            wordWrap: 'break-word'
                        }}
                    >
                        {row?.
                mentor.organization.district}
                    </div>
                ),
                sortable: true,
                cellExport: (row) => row?.
                mentor.organization.district,
                width: '9rem'
            },
            {
                name: 'Organization Name',
                selector: (row) =>row?.
                mentor.organization.organization_name,
                cellExport: (row) => row.mentor.organization.organization_name,
                cell: (row) => (
                    <div
                        style={{
                            whiteSpace: 'pre-wrap',
                            wordWrap: 'break-word'
                        }}
                    >
                        {row.mentor.organization.organization_name}
                    </div>
                ),
                width: '13rem'
            },
            {
                name: 'Mentor Name',
                cell: (row) => (
                    <div
                        style={{
                            whiteSpace: 'pre-wrap',
                            wordWrap: 'break-word'
                        }}
                    >
                        {row.mentor
.full_name
                        }
                    </div>
                ),
                selector: (row) => row.mentor
                .full_name
                ,
                cellExport: (row) => row.mentor
                .full_name
                ,
                width: '10rem'
            },
            {
                name: 'User Id',
                selector: (row) => row.user.username,
                sortable: true,
                width: '9rem'
            },
            {
                name: 'Team Name',
                selector: (row) => row?.team_name
                ,
                cellExport: (row) => row?.team_name
                ,
                width: '9rem'
            },
           

           
            {
                name: 'Students Count',
                selector: (row) => row.
                student_count
                ,
                cellExport: (row) => row.
                student_count
                ,
                sortable: true,
                width: '9rem'
            },
          

           
          
          
        ]
    };
    const customStyles = {
        head: {
          style: {
            fontSize: "1em", // Adjust as needed
          },
        },
      };
    const showbutton =state ;
    const handleStateChange = (event) => {
        const state = event.target.value;
        setState(state);
      };
    return (
        <div className="page-wrapper">
        <div className="content">
        <div className="page-header">
                <div className="add-item d-flex">
                    <div className="page-title">
                        <h4>Teams</h4>
                        <h6>State wise Registered Teams list</h6>
                    </div>
                </div>
                <div className="page-btn">
                    <div className="d-flex justify-content-end">
                        <select
                                className="form-select mx-2"
                                onChange={(e) => handleStateChange(e)}
                            >
                                <option value="">Select State</option>
                                {updateStatesList.map((state) => (
                                <option key={state} value={state}>
                                    {state}
                                </option>
                                ))}
                            </select>
                            <Button
                                    btnClass={
                                        showbutton
                                            ? 'primary'
                                            : 'default'
                                    }
                                    size="small"
                                    label="Search"
                                    disabled={!showbutton}
                                    onClick={() =>
                                        handleclickcall()
                                    }
                                />
                    </div>
                    
                </div>
            </div>
            
            <Container className="ticket-page mb-50 userlist">
                <Row className="mt-0">
                    <Container fluid className="px-0">
                    {fetchData ? (
                                    <ClipLoader

                                        color={'blue'}
                                        size={20}
                                    />
                                ) : (    
                                        <div className="bg-white border card pt-3 mt-3">
                                        <DataTableExtensions
                                            print={false}
                                            export={false}
                                            {...StudentsData}
                                        >
                                            <DataTable
                                                data={tableData || []}
                                                defaultSortField="id"
                                    customStyles={customStyles}

                                                defaultSortAsc={false}
                                                pagination
                                                highlightOnHover
                                                fixedHeader
                                                subHeaderAlign={
                                                    Alignment.Center
                                                }
                                            />
                                        </DataTableExtensions>
                                    </div>
                                      )}
                                    </Container>
                </Row>
            </Container>
          
        </div>
        </div>
    );
};


export default TicketsPage;
