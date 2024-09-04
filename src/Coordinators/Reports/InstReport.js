/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Table } from 'reactstrap';
import { Button } from '../../stories/Button';
import { CSVLink } from 'react-csv';
import { getCurrentUser } from '../../helpers/Utils';
import { useNavigate , Link } from 'react-router-dom';
// import {
//     getDistrictData,
//     getStateData,
//     getFetchDistData
// } from '../../../redux/studentRegistration/actions';
import { ArrowRight  } from "feather-icons-react/build/IconComponents";
import { useDispatch, useSelector } from 'react-redux';
import Select from './Select';
import axios from 'axios';
// import '../reports.scss';
import { Doughnut } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
// import { categoryValue } from '../../Schools/constentText';
import { notification } from 'antd';
import { encryptGlobal } from '../../constants/encryptDecrypt';
import { stateList, districtList } from "../../RegPage/ORGData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMale, faFemale, faChalkboardTeacher  } from '@fortawesome/free-solid-svg-icons';
import ReactApexChart from "react-apexcharts";
import {
    openNotificationWithIcon
} from '../../helpers/Utils';

const TeacherProgressDetailed = () => {
    const navigate = useNavigate();
    const [district, setdistrict] = React.useState('');
    const currentUser = getCurrentUser('current_user');

    const [selectstate, setSelectState] = React.useState(currentUser?.data[0]?.state_name);
    const [category, setCategory] = useState('');
    const [isDownload, setIsDownload] = useState(false);
    const categoryData = ['All Categories', 'ATL', 'Non ATL'];
    const categoryDataTn= ["Select All","Fully Aided-High School","Fully Aided-Higher Secondary School","Government-High School","Government-Higher Secondary School","Partially Aided-High School","Partially Aided-Higher Secondary School",];
    const newstateList = ["All States", ...stateList];
    // const categoryData =
    //     categoryValue[process.env.REACT_APP_LOCAL_LANGUAGE_CODE];
    const [mentorDetailedReportsData, setmentorDetailedReportsData] = useState(
        []
    );
    const [doughnutChartData, setDoughnutChartData] = useState(null);
    const csvLinkRef = useRef();
    const csvLinkRefTable = useRef();
    const dispatch = useDispatch();
    const [combinedArray, setCombinedArray] = useState([]);
    const [downloadTableData, setDownloadTableData] = useState([]);
    const [newFormat, setNewFormat] = useState('');
    const [atl, setAtl] = useState('');
    const [nonAtl, setNonAtl] = useState('');
    const [series1, setseries1] = useState([]);
    const [series2, setseries2] = useState([]);
    const [series3, setseries3] = useState([]);
    const [series4, setseries4] = useState([]);
    const [series5, setseries5] = useState([]);
    const [series6, setseries6] = useState([]);
    const [series7, setseries7] = useState([]);
    const [chartTableData, setChartTableData] = useState([]);
    const [downloadComplete, setDownloadComplete] = useState(false);
    

    const [barChart1Data, setBarChart1Data] = useState({
        labels: [],
        datasets: []
    });
    const [barChart3Data, setBarChart3Data] = useState({
        labels: [],
        datasets: []
    });
    const [barChart2Data, setBarChart2Data] = useState({
        labels: [],
        datasets: []
    });
    const fullStatesNames = newstateList ;
    const allDistricts = {
        "All Districts": [...Object.values(districtList).flat()], 
        ...districtList
      };
    const fiterDistData = [
        'All Districts',
        ...allDistricts[selectstate] || [] 
    ];
  
    const [totalCount, setTotalCount] = useState([]);
    

    const summaryHeaders = [
        
        {
            label: 'Institution Code',
            key: 'organization_code'
        },
        // {
        //     label: 'ATL CODE',
        //     key: 'organization_code'
        // },
        {
            label: 'Institution Name',
            key: 'organization_name'
        },
        {
            label: 'School Type/Category',
            key: 'category'
        },
        {
            label: 'State',
            key: 'state'
        },
        {
            label: 'District',
            key: 'district'
        },
        {
            label: 'City',
            key: 'city'
        },
        {
            label: 'Address',
            key: 'address'
        },
        {
            label: 'Pincode',
            key: 'pin_code'
        },
        {
            label: 'Principal Name',
            key: 'principal_name'
        },
        {
            label: 'Principal Mobile',
            key: 'principal_mobile'
        },
        {
            label: 'Principal Email',
            key: 'principal_email'
        },
       
       
       
    ];

 

 
  
    const handleDownload = () => {
        if (
            !selectstate ||
             !district  ||
            !category
        ) {
            notification.warning({
                message:
                    'Please select a district, category type before Downloading Reports.'
            });
            return;
        }
        setIsDownload(true);
        fetchData();
    };
    const fetchData = () => {
        const apiRes = encryptGlobal(
            JSON.stringify({
                state: selectstate,
                district: district,
                category: category
            })
        );
        const config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/reports/schoollistreport?Data=${apiRes}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                
                if (response.status === 200) {
                    // console.log(response,"22");
                    const chartTableData = response?.data?.data[0].rows || [];
                  
                    setChartTableData(chartTableData);
                    setDownloadTableData(chartTableData);
              
                    if(response?.data?.data[0].count > 0){
                        openNotificationWithIcon(
                                            'success',
                                            " Report Downloaded Successfully"
                                        );  
                    }else{
                        openNotificationWithIcon('error', 'No Data Found');
                    }
                    setIsDownload(false);
                }
            })
            .catch(function (error) {
                console.log(error);
                setIsDownload(false);
            });
    };
    useEffect(() => {
        if (chartTableData.length > 0) {
            setDownloadTableData(chartTableData);
          console.log("Performing operation with the updated data.");
          csvLinkRef.current.link.click();
    
        }
      }, [chartTableData]);
   

return (
<div className="page-wrapper">
    <div className="content">
        <div className="page-header">
            <div className="add-item d-flex">
                <div className="page-title">
                    <h4>Institutions /Organizations /Schools List</h4>
                    {/* <h6>Institution </h6> */}
                </div>
            </div>
            {/* <div className="page-btn">
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate("/reports")}
                >
                    <i className="fas fa-arrow-left"></i> Back
                </button>
            </div> */}
        </div>

        <Container className="RegReports userlist">
            <div className="reports-data mt-2 mb-2">
                <Row className="align-items-center mt-3 mb-2">
                    <Col md={3}>
                        <div className="my-2 d-md-block d-flex justify-content-center">
                        <p>{selectstate}</p>
                            {/* <Select
                                list={fullStatesNames}
                                setValue={setSelectState}
                                placeHolder={'Select State'}
                                value={selectstate}
                            /> */}
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="my-2 d-md-block d-flex justify-content-center">
                            <Select
                                list={fiterDistData}
                                setValue={setdistrict}
                                placeHolder={'Select District'}
                                value={district}
                            />
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="my-2 d-md-block d-flex justify-content-center">
                           {selectstate === "Tamil Nadu"?( 
                            <Select
                                list={categoryDataTn}
                                setValue={setCategory}
                                placeHolder={'Select Category'}
                                value={category}
                            />):(  <Select
                                list={categoryData}
                                setValue={setCategory}
                                placeHolder={'Select Category'}
                                value={category}
                            />)}
                        </div>
                    </Col>
                    <Col
                        md={3}
                        className="d-flex align-items-center justify-content-center"
                    >
                        <button
                            onClick={handleDownload}
                            type="button"
                            disabled={isDownload}
                            className="btn btn-primary"
                        >
                            {
                                isDownload
                                    ? 'Downloading'
                                    : 'Download Report'
                            }
                        </button>
                       
                        {downloadTableData && (
                                <CSVLink
                                    data={downloadTableData}
                                    headers={summaryHeaders}
                                    filename={`InstitutionSummaryTable_${newFormat}.csv`}
                                    className="hidden"
                                    ref={csvLinkRef}
                                    // onDownloaded={() => {
                                    //     setIsDownload(false);
                                    //     setDownloadComplete(true);
                                    // }}
                                >
                                    Download Table CSV
                                </CSVLink>
                            )}
                    </Col>
                </Row>
              


            </div>
        </Container>

    </div>
</div>

);
};

export default TeacherProgressDetailed;