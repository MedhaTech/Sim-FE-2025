/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useEffect, useRef, useState } from "react";
import "./ViewSelectedChallenges.scss";
import DataTable, { Alignment } from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import ViewDetail from "./ViewDetail";
import axios from "axios";
import { KEY, URL } from "../../../constants/defaultValues";
import { Button } from "../../../stories/Button";
import Select from "./pages/Select";
import { Col, Container, Row } from "reactstrap";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { getNormalHeaders } from "../../../helpers/Utils";
import Spinner from "react-bootstrap/Spinner";
import { useReactToPrint } from "react-to-print";
import DetailToDownload from "./DetailToDownload";
import { encryptGlobal } from "../../../constants/encryptDecrypt.js";
import { stateList, districtList } from "../../../RegPage/ORGData";
import { themesList } from "../../../Team/IdeaSubmission/themesData";

const ViewSelectedIdea = () => {
  // here we can see the selected ideas in district wise and sdg //
  const dispatch = useDispatch();
  const [isDetail, setIsDetail] = React.useState(false);
  const [ideaDetails, setIdeaDetails] = React.useState({});
  const [tableData, settableData] = React.useState([]);
  ///
  const navigate = useNavigate();

  const [district, setdistrict] = React.useState("");
  const [selectstate, setSelectState] = React.useState("");
  const [sdg, setsdg] = React.useState("");
  //---for handle next idea---
  const [currentRow, setCurrentRow] = React.useState(1);
  const [tablePage, setTablePage] = React.useState(1);
  // eslint-disable-next-line no-unused-vars
  const [btnDisabler, setBtnDisabler] = React.useState(false);
  const [showspin, setshowspin] = React.useState(false);
  const newThemesList = ["All Themes", ...themesList];
  const newstateList = ["All States", ...stateList];
  const { search } = useLocation();
  const status = new URLSearchParams(search).get("status");
  const names =
    status === "ACCEPTED"
      ? "Mentor Accepted "
      : status === "DRAFT"
      ? "Draft "
      :  status === "SUBMITTED"
      ? "Submitted "
      :"" ;
  const fullStatesNames = newstateList;
  const allDistricts = {
    "All Districts": [...Object.values(districtList).flat()],
    ...districtList,
  };
  const fiterDistData =
    selectstate === "All States"
      ? []
      : ["All Districts", ...(allDistricts[selectstate] || [])];
 
  const filterParams =
    (selectstate && selectstate !== "All States"
      ? "&selectstate=" + selectstate
      : "") +
    (district && district !== "All Districts" ? "&district=" + district : "") +
    (sdg && sdg !== "All Themes" ? "&sdg=" + sdg : "");

  const handleclickcall = async () => {
    // where we can select district and sdg //
    // where we can see list of challenges districtwise //
    setshowspin(true);
    await handleideaList();
  };
  useEffect(() => {
    if (selectstate === "All States") {
      setdistrict("");
    }
  }, [selectstate]);
  async function handleideaList() {
    // handleideaList api //
    //where we can see all ideas in districtwise //
    settableData([]);
    const axiosConfig = getNormalHeaders(KEY.User_API_Key);
    const stat = status ? status : "ALL";
    const newParam = encryptGlobal(
      JSON.stringify({
        status: stat,
        state: selectstate !== "All States" ? selectstate : "",
        district: district !== "All Districts" ? district : "",
        theme: sdg !== "All Themes" ? sdg : "",
      })
    );
    
    await axios
      .get(`${URL.getidealist}Data=${newParam}`, axiosConfig)
      .then(function (response) {
        if (response.status === 200) {
          const updatedWithKey =
            response.data &&
            response.data.data[0] &&
            response.data.data[0].dataValues.map((item, i) => {
              const upd = { ...item };
              upd["key"] = i + 1;
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
  const evaluatedIdeaforsub = {
    data: tableData && tableData.length > 0 ? tableData : [],
    columns: [
      {
        name: "No",
        selector: (row) => row.key,
        cellExport: (row) => row.key,
        width: "6rem",
      },

      {
        name: "State",
        selector: (row) => row.state,
        width: "10rem",
      },
      {
        name: "District",
        selector: (row) => row.district,
        width: "10rem",
      },
      {
        name: "Udise Code",
        selector: (row) => row.organization_code,
        width: "9rem",
      },
      {
        name: "Team Name",
        selector: (row) => row.team_name,
        width: "10rem",
      },
      {
        name: "CID",
        selector: (row) => row.challenge_response_id,
        width: "5rem",
      },
    
      {
        name: "Theme",
        cell: (row) => (
          <div
            style={{
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
            }}
          >
            {row?.theme}
          </div>
        ),
        width: "11rem",
      },
    
      {
        name: "Idea Name",
        cell: (row) => (
          <div
            style={{
             
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {row?.title}
          </div>
        ),
        width: "15rem",
      },

     
      {
        name: "Actions",
        cellExport: (row) => "",
        cell: (params) => {
          return [
            <div className="d-flex" key={params}>
              <div
                className="btn btn-primary"
                onClick={() => {
                  setIdeaDetails(params);
                  setIsDetail(true);
                  let index = 0;
                  tableData?.forEach((item, i) => {
                    if (
                      item?.challenge_response_id ==
                      params?.challenge_response_id
                    ) {
                      index = i;
                    }
                  });
                  setCurrentRow(index + 1);
                }}
              >
                View
              </div>
             
            </div>,
          ];
        },
        width: "9rem",
        center: true,
      },
    ],
  };
  const showbutton = selectstate && sdg;

  const handleNext = () => {
    // here we can go for next page //
    if (tableData && currentRow < tableData?.length) {
      setIdeaDetails(tableData[currentRow]);
      setIsDetail(true);
      setCurrentRow(currentRow + 1);
    }
  };
  const handlePrev = () => {
    // here we can go for previous page //
    if (tableData && currentRow >= 1) {
      setIdeaDetails(tableData[currentRow - 2]);
      setIsDetail(true);
      setCurrentRow(currentRow - 1);
    }
  };

  ////////////////pdf////////////////
  const componentRef = useRef();
  const [pdfIdeaDetails, setPdfIdeaDetails] = useState("");
  const [pdfTeamResponse, setpdfTeamResponse] = useState("");
 
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${
      pdfIdeaDetails?.team_name ? pdfIdeaDetails?.team_name : "temp"
    }_IdeaSubmission`,
  });
  useEffect(() => {
    if (pdfIdeaDetails !== "" && pdfTeamResponse !== "") {
      handlePrint();
    }
  }, [pdfIdeaDetails, pdfTeamResponse]);
  const customStyles = {
    rows: {
      style: {
        fontSize: "13px",
      },
    },
    headCells: {
      style: {
        fontSize: "14px",
      },
    },
    cells: {
      style: {
        fontSize: "13px",
      },
    },
  };
  /////////////////
  return (
    <div className="page-wrapper">
      <div className="content">
        <div style={{ display: "none" }}>
          <DetailToDownload
            ref={componentRef}
            ideaDetails={pdfIdeaDetails}
            teamResponse={pdfTeamResponse}
            level={"Draft"}
          />
        </div>
        <div className="container evaluated_idea_wrapper pt-2">
          <div className="row">
            <div className="col-12 p-0">
              {!isDetail && (
                <div>
                  <h4>{names ? names : ""}Challenges</h4>

                  <Container fluid className="px-0">
                    <Row className="align-items-center">
                      <Col md={3}>
                        <div className="d-flex justify-content-center">
                          <Select
                            list={fullStatesNames}
                            setValue={setSelectState}
                            placeHolder={"Select State"}
                            value={selectstate}
                          />
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="my-2 d-md-block d-flex justify-content-center">
                          <Select
                            list={fiterDistData}
                            setValue={setdistrict}
                            placeHolder={"Select District"}
                            value={district}
                          />
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="my-2 d-md-block d-flex justify-content-center">
                          <Select
                            list={newThemesList}
                            setValue={setsdg}
                            placeHolder={"Select Theme"}
                            value={sdg}
                          />
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="text-center">
                          <Button
                            btnClass={showbutton ? "primary" : "default"}
                            size="small"
                            label="Search"
                            disabled={!showbutton}
                            onClick={() => handleclickcall()}
                          />
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="text-right">
                          <Button
                            btnClass="primary"
                            size="small"
                            label="Back"
                           
                            onClick={() => navigate(-1)}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </div>
              )}
              {showspin && (
                <div className="text-center mt-5">
                  <Spinner animation="border" variant="secondary" />
                </div>
              )}
              {!showspin &&
                (!isDetail ? (
                  <div className="bg-white border card pt-3 mt-5">
                    <DataTableExtensions
                      print={false}
                      export={false}
                      {...evaluatedIdeaforsub}
                      exportHeaders
                    >
                      <DataTable
                        data={tableData || []}
                        defaultSortField="id"
                        defaultSortAsc={false}
                        pagination
                        customStyles={customStyles}
                        highlightOnHover
                        fixedHeader
                        subHeaderAlign={Alignment.Center}
                        paginationRowsPerPageOptions={[10, 25, 50, 100]}
                        paginationPerPage={10}
                        onChangePage={(page) => setTablePage(page)}
                        paginationDefaultPage={tablePage}
                      />
                    </DataTableExtensions>
                  </div>
                ) : (
                  <ViewDetail
                    ideaDetails={ideaDetails}
                    setIsDetail={setIsDetail}
                    settableData={settableData}
                    setdistrict={setdistrict}
                    setsdg={setsdg}
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                    currentRow={currentRow}
                    names={names}
                    dataLength={tableData && tableData?.length}
                    handleclickcall={handleclickcall} 
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSelectedIdea;
