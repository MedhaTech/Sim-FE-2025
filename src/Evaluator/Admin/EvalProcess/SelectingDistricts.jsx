/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import { Row, Col, Label, Container, Card, } from 'reactstrap';
import { Button } from '../../../stories/Button';
import {
    getNormalHeaders,
    openNotificationWithIcon
} from '../../../helpers/Utils';
import axios from 'axios';
import {themesList} from "../../../Team/IdeaSubmission/themesData";
import {languageOptions} from "../../../RegPage/ORGData";
import { useLocation, useNavigate } from "react-router-dom";

import { URL, KEY } from '../../../constants/defaultValues';
import Check from './Pages/Check';
import { useDispatch, useSelector ,} from 'react-redux';
import { encryptGlobal } from '../../../constants/encryptDecrypt';
import { stateList, districtList } from "../../../RegPage/ORGData.js";
const EditEvalProcess = (props) => {
    const location = useLocation();
    const evalID = JSON.parse(localStorage.getItem('eavlId'));
    const dispatch = useDispatch();
    const [clickedValue, setclickedValue] = useState({});
     const [clickedValue1, setclickedValue1] = useState({});
        const [clickedValue2, setclickedValue2] = useState({});
    const [selectedStates, setselectedStates] = useState([]);
    const [selectedLang, setselectedLang] = useState([]);
        const [selectedTheme, setselectedTheme] = useState([]);
const navigate = useNavigate();
    const newstateList = ["All States", ...stateList];
    const fullStatesNames = newstateList;
    const allDataLanguages= ["All Languages",...languageOptions];
    const allDataThemes= ["All Themes",...themesList];
     useEffect(() => {
            if (evalID && evalID.theme) {
                if (
                    evalID.theme.split(',').length === allDataThemes.length - 1 &&
                    !evalID.theme.includes('All Themes')
                ) {
                    setselectedTheme(allDataThemes);
                } else {
                    setselectedTheme(evalID.theme.split(','));
                }
            }
        }, []);
        useEffect(() => {
            if (clickedValue1.name === 'All Themes') {
                if (selectedTheme.includes('All Themes')) {
                    setselectedTheme(allDataThemes);
                } else {
                    setselectedTheme([]);
                }
            } else if (
                clickedValue1.name &&
                clickedValue1.name !== 'All Themes' &&
                selectedTheme.length === allDataThemes.length - 1 &&
                !selectedTheme.includes('All Themes')
            ) {
                setselectedTheme(allDataThemes);
            } else if (clickedValue1.name && clickedValue1.name !== 'All Themes') {
                setselectedTheme(
                    selectedTheme?.filter((item) => item !== 'All Themes')
                );
            }
        }, [clickedValue1]);
        
        useEffect(() => {
            if (evalID && evalID.language) {
                if (
                    evalID.language.split(',').length === allDataLanguages.length - 1 &&
                    !evalID.language.includes('All Languages')
                ) {
                    setselectedLang(allDataLanguages);
                } else {
                    setselectedLang(evalID.language.split(','));
                }
            }
        }, []);
        useEffect(() => {
            if (clickedValue2.name === 'All Languages') {
                if (selectedLang.includes('All Languages')) {
                    setselectedLang(allDataLanguages);
                } else {
                    setselectedLang([]);
                }
            } else if (
                clickedValue2.name &&
                clickedValue2.name !== 'All Languages' &&
                selectedLang.length === allDataLanguages.length - 1 &&
                !selectedLang.includes('All Languages')
            ) {
                setselectedLang(allDataLanguages);
            } else if (clickedValue2.name && clickedValue2.name !== 'All Languages') {
                setselectedLang(
                    selectedLang?.filter((item) => item !== 'All Languages')
                );
            }
        }, [clickedValue2]);
    useEffect(() => {
       
        if (evalID && evalID.state) {
            if (
                evalID.state.split(',').length ===
                    fullStatesNames.length - 1 &&
                !evalID.state.includes('All States')
            ) {
                setselectedStates(fullStatesNames);
            } else {
                setselectedStates(evalID.state.split(','));
            }
        }
    }, []);

    useEffect(() => {
        if (clickedValue.name === 'All States') {
            if (selectedStates.includes('All States')) {
                setselectedStates(fullStatesNames);
            } else {
                setselectedStates([]);
            }
        } else if (
            clickedValue.name &&
            clickedValue.name !== 'All States' &&
            selectedStates.length === fullStatesNames.length - 1 &&
            !selectedStates.includes('All States')
        ) {
            setselectedStates(fullStatesNames);
        } else if (clickedValue.name && clickedValue.name !== 'All States') {
            setselectedStates(
                selectedStates?.filter((item) => item !== 'All States')
            );
        }
    }, [clickedValue]);

    async function handleStates(value) {
        //  handleStates Api where value = state //
        // where we can update the state //
        if(value.state===''){
            value.state = '-';
        }
        if(value.language===''){
            value.language = '-';
        }
        if(value.theme===''){
            value.theme = '-';
        }
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        const evalid = encryptGlobal(JSON.stringify(evalID.evaluation_process_id));
        await axios
            .put(
                `${URL.updateEvalProcess + evalid}`,
                JSON.stringify(value, null, 2),
                axiosConfig
            )
            .then((response) => {
                if (response.status == 200) {
                    openNotificationWithIcon(
                        'success',
                       'States,Themes and Languages Update Successfully'
                    );
                    navigate('/eadmin/evaluationProcess');
                }
            })
            .catch((err) => {
                return err.response;
            });
    }

    const handleclick = async () => {
        // where we can select  the States //
        const value = { state: '',
            language: '',
             theme: ''
       };
       value.state = selectedStates.includes('All States')
       ? selectedStates.filter((item) => item !== 'All States').toString()
       : selectedStates.toString();

   value.language = selectedLang.includes('All Languages')
       ? selectedLang.filter((item) => item !== 'All Languages').toString()
       : selectedLang.toString();
       
       value.theme = selectedTheme.includes('All Themes')
       ? selectedTheme.filter((item) => item !== 'All Themes').toString()
       : selectedTheme.toString();
        await handleStates(value);
    };

    return (
        <div className="page-wrapper">
          <div className="content">
            <Container>
            <Card className="m-3 p-3">
                    <Row>
                        <Col md={4}>
                        <Label className="mb-2 text-info">
                            Level Name :{' '}
                            <span className="text-muted">
                            {evalID && evalID.level_name}
                            </span>{' '}
                        </Label>
                        </Col>
                        <Col md={4}>
                        <Label className="mb-2 text-info">
                            No of Evaluators per idea :{' '}
                            <span className="text-muted">
                            {evalID && evalID.no_of_evaluation}
                            </span>
                        </Label>
                        </Col>
                        <Col md={4}>
                        <Label className="mb-2 text-info">
                            Evaluation Schema :{' '}
                            <span className="text-muted">
                            {evalID && evalID.eval_schema}
                            </span>
                        </Label>
                        </Col>
                    </Row>

                    
                    <hr />

                    <Row>
                        <Label className="mb-2 text-info">States:</Label>
                        <Check
                        list={fullStatesNames}
                        value={selectedStates}
                        setValue={setselectedStates}
                        selValue={setclickedValue}
                        />
                    </Row>
                </Card>
                <Card className="m-3 p-3">
                    <Row>
                        <Col md={4}>
                            <Label className="mb-2 text-info">
                            
                                <span className="text-muted">
                                </span>{' '}
                            </Label>
                        </Col>
                      
                    </Row>
                    <Row>
                        <Label className="mb-2 text-info form-label">Languages:</Label>
                        <Check
                            list={allDataLanguages}
                            value={selectedLang}
                            setValue={setselectedLang}
                            selValue={setclickedValue2}
                        />
                    </Row>
                </Card>
                <Card className="m-3 p-3">
                    <Row>
                        <Col md={4}>
                            <Label className="mb-2 text-info">
                            
                                <span className="text-muted">
                                </span>{' '}
                            </Label>
                        </Col>
                      
                    </Row>
                    <Row>
                        <Label className="mb-2 text-info form-label">Themes:</Label>
                        <Check
                            list={allDataThemes}
                            value={selectedTheme}
                            setValue={setselectedTheme}
                            selValue={setclickedValue1}
                            colSize={4}
                        />
                    </Row>
                </Card>
                <Row>
                    <Col className="col-xs-12 col-sm-6">
                       
                          <button
                            type="button"
                            onClick={() => navigate('/eadmin/evaluationProcess')}
                            className="btn btn-secondary"
                            style={{ marginLeft: "30px" }}
                            >
                            Discard
                            </button>

                    </Col>
                    <Col className="submit-btn col-xs-12 col-sm-6 text-right">
                        <Button
                        
                            label="Save"
                            onClick={() => handleclick()}
                            btnClass={'primary'}
                            size="small"
                        />
                    </Col>
                </Row> 
            </Container>
        </div>
        </div>
    );
};
export default EditEvalProcess;
