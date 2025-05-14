/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'reactstrap';
import { Button } from '../../stories/Button';

import axios from 'axios';
import { URL, KEY } from '../../constants/defaultValues.js';

import { getNormalHeaders } from '../../helpers/Utils';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
    const [tableData, settableData] = React.useState([]);
   
    const district = localStorage.getItem('dist');
    
const updateStatesList=["All States",...stateList];


    const [studentDist, setstudentDist] = useState(district ? district : '');
    const [mentorDist, setmentorDist] = useState('');
    const [fetchData, setFetchData] = useState(false);
    const [state,setState]=useState("");


    const handleclickcall = async () => {
        setFetchData(true);
        // where we can select district and sdg //
        // where we can see list of challenges districtwise //
        setshowspin(true);
        await handleideaList();
    };
  
    async function handleideaList() {
        // handleideaList api //
        //where we can see all ideas in districtwise //
        settableData([]);
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
       
        const resparam = encryptGlobal(
            JSON.stringify({
                status: "ALL",
                state: state ,
                
            })
        );
        await axios
        .get(`${URL.getStudents}?Data=${resparam}`, axiosConfig)
            .then(function (response) {
                if (response.status === 200) {
                    setFetchData(false);
                    const updatedWithKey =
                        response.data &&
                        response.data.data[0] &&
                        response.data.data[0].dataValues.map((item, i) => {
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
    const handleSelect = (item, num) => {
        // where item = student id / mentor id //
        localStorage.removeItem('dist');
        localStorage.removeItem('num');
        if (num == '1') {
            navigate("/student-view",{state:{ data: item,
                num: num}}
               
            );
           
            localStorage.setItem('studentId', item.user_id);
            localStorage.setItem('studentData', JSON.stringify(item));
        } 
           
    };
 
    

   
 
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
                selector: (row) => row?.team?.mentor?.organization?.organization_code,
                cell: (row) => (
                    <div
                        style={{
                            whiteSpace: 'pre-wrap',
                            wordWrap: 'break-word'
                        }} 
                    >
                        {row?.team?.mentor?.organization?.organization_code}
                    </div>
                ),
                sortable: true,
                cellExport: (row) => row?.team?.mentor?.organization?.organization_code,
                width: '9rem'
            },
            {
                name: 'State',
                selector: (row) => row?.team?.mentor?.organization.
                state,
                sortable: true,
                width: '8rem'
            },
            {
                name: 'Category',
                selector: (row) => row?.team?.mentor?.organization?.category,
                cellExport: (row) => row?.team?.mentor?.organization?.category,
                sortable: true,
                width: '6rem'
            },
          
            {
                name: 'Organization Name',
                cell: (row) => (
                    <div
                        style={{
                            whiteSpace: 'pre-wrap',
                            wordWrap: 'break-word'
                        }}
                    >
                        {row?.team?.mentor?.organization?.organization_name
}
                    </div>
                ),
                selector: (row) => row?.team?.mentor?.organization?.organization_name,
                cellExport: (row) => row?.team?.mentor?.organization.
                organization_name,
                width: '10rem'
            },

            {
                name: 'Student Name',
                selector: (row) => row?.full_name,
                cellExport: (row) => row?.sfull_name,
                width: '8rem'
            },
            {
                name: 'Age',
                selector: (row) => row?.Age,
                width: '5rem'
            },

            {
                name: 'Gender',
                selector: (row) => row?.Gender,
                width: '6rem'
            },
            {
                name: 'Team Name',
                selector: (row) => row?.team?.team_name,
                width: '8rem'
            },
            {
                name: 'Team User Id',
                selector: (row) => row?.team?.user?.username,
                sortable: true,
                width: '9rem'
            },

          
          
            {
                name: 'Actions',
                sortable: false,
                width: '10rem',
                cell: (record) => [
                    <div
                        key={record.id}
                        onClick={() => handleSelect(record, '1')}
                        style={{ marginRight: '10px' }}
                    >
                        <div className="btn btn-primary  mr-5">View</div>
                    </div>
                  
                ]
            }
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
                        <h4>Students</h4>
                        <h6>State wise Registered Students list</h6>
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
