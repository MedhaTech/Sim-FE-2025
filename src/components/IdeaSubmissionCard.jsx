/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import moment from "moment/moment";
import React, { useEffect, useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import { Button } from "../stories/Button";
import { useReactToPrint } from "react-to-print";
import { CardText } from "reactstrap";
import { openNotificationWithIcon } from "../helpers/Utils";
import { getCurrentUser } from "../helpers/Utils";
import { getTeamMemberStatus } from "../Teacher/store/teams/actions";
import axios from "axios";
import { encryptGlobal } from "../constants/encryptDecrypt";
import { useDispatch } from "react-redux";
import Ideapdf from "../Teacher/Dashboard/DetailToDownload";
import logout from "../assets/img/logout.png";
import Swal from "sweetalert2/dist/sweetalert2";
import VideoPopup from "../Evaluator/IdeaList/Videopop";
import FilePreviewModal from "../Evaluator/IdeaList/Modal";
import { useTranslation } from "react-i18next";

const LinkComponent = ({ item, currentUser }) => {
  const [showModal, setShowModal] = useState(false);
   const [selectedFile, setSelectedFile] = useState(null);

   const handlePreview = (url) => {
          setSelectedFile({ prototype_image: url });
          setShowModal(true);
        };
  return (
    <>
      {/* {item &&
        item.length > 0 &&
        item.map((ans, i) => {
          let a_link = ans.split("/");
          let count = a_link.length - 1;
          const fileName = a_link[count]?.split('?')[0]; 
          return (
            <a
              key={i}
              className="badge mb-2 bg-info p-3 ms-3"
              href={ans}
              target="_blank"
              onClick={() => handlePreview(ans)}
              rel="noreferrer"
            >
              {fileName}
            </a>
          );
        })} */}
       <Row>
        {item &&
          item.length > 0 &&
          item.map((ans, i) => {
            let fileName = '';
            try {
              const url = new URL(ans);
              const segments = url.pathname.split('/');
              fileName = segments[segments.length - 1];
            } catch (err) {
              fileName = `File_${i + 1}`;
            }
      
            return (
              <Col key={i} xs={12} sm={6} md={4}>
                <span
                  className="badge bg-info w-100 p-3 mb-3 d-block text-center"
                  style={{ cursor: "pointer" }}
                  onClick={() => handlePreview(ans)}
                >
                  {fileName}
                </span>
              </Col>
            );
          })}
      </Row>

{selectedFile && (
  <FilePreviewModal
    show={showModal}
    onHide={() => setShowModal(false)}
    teamResponse={selectedFile}
  />
)}

      {selectedFile && (
        <FilePreviewModal
          show={showModal}
          onHide={() => setShowModal(false)}
          teamResponse={selectedFile}
        />
      )}
    </>
  );
};
const IdeaSubmissionCard = ({ handleClose, show, response, setIdeaCount }) => {
  const submitted = response;
  const { t } = useTranslation();

  const [showDefault, setshowDefault] = useState(true);
  const currentUser = getCurrentUser("current_user");
  const dispatch = useDispatch();
  const mentorId = currentUser?.data[0]?.user_id;
  const [hide, setHide] = useState(true);
  const [submittedResponse, setIdeaSubmittedData] = React.useState(submitted);
  const Id = submittedResponse.challenge_response_id;
  const problemSolvingArray = JSON.parse(submittedResponse.problem_solving);
  const files = submittedResponse?.prototype_image
    ? JSON.parse(submittedResponse.prototype_image)
    : [];
  const [images, setImages] = React.useState([]);

  const teamId = submittedResponse.team_id;
  useEffect(() => {
    if (submittedResponse) {
      setImages(JSON.parse(submittedResponse.prototype_image));
    }
  }, [submittedResponse]);

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
            ? t("teacherJourney_accept_title")
            : t("teacherJourney.confirm_reject_title"),
        text: t("teacherJourney.are_you_sure"),
        imageUrl: `${logout}`,
        confirmButtonText: t("teacherJourney.approve"),
        showCancelButton: true,
        cancelButtonText: t("teacherJourney.cancel"),
        reverseButtons: false,
      })
      .then((result) => {
        if (result.isConfirmed) {
          if (result.isConfirmed) {
            handleAccept();
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire("Cancelled", "", "error");
        }
      });
  };
  const handleAccept = () => {
    // this function update the status

    const currentTime = new Date().toLocaleString();

    const body = JSON.stringify({
      verified_status: "ACCEPTED",
    });
    const ideaID = encryptGlobal(JSON.stringify(Id));
    var config = {
      method: "put",
      url:
        process.env.REACT_APP_API_BASE_URL +
        `/challenge_response/updateEntry/${ideaID}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.data[0]?.token}`,
      },
      data: body,
    };
    axios(config)
      .then(async function (response) {
        if (response.status === 200) {
          openNotificationWithIcon("success", t("teacherJourney.app"));
          setHide(false);
          handleClose();
          ideaSubmittedApi(teamId);
          dispatch(getTeamMemberStatus(teamId, setshowDefault));
          window.location.reload();

          mentorIdeaCount();
        }
      })
      .catch(function (error) {
        console.log(error);
        openNotificationWithIcon("error", "Something went wrong");
      });
  };
  const ideaSubmittedApi = (teamId) => {
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
            setIdeaSubmittedData(response.data.data[0]);
          }
        }
      })
      .catch(function (error) {
        if (error.response.status === 404) {
          //   seterror4( true);
        }
      });
  };

  const mentorIdeaCount = async () => {
    const ideaApi = encryptGlobal(
      JSON.stringify({
        mentor_id: currentUser?.data[0]?.mentor_id,
      })
    );
    var config = {
      method: "get",
      url:
        process.env.REACT_APP_API_BASE_URL +
        `/dashboard/ideaCount?Data=${ideaApi}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${currentUser.data[0]?.token}`,
      },
    };
    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          setIdeaCount(response.data.data[0].idea_count);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  ///idea pdf
  const [ideaPdfValues, setIdeaPdfValues] = useState();
  const ideaDataforPDF = () => {
    const ideaDataApi = encryptGlobal(
      JSON.stringify({
        team_id: teamId,
      })
    );
    var config = {
      method: "get",
      url:
        process.env.REACT_APP_API_BASE_URL +
        `/challenge_response/submittedDetailsforideapdf?Data=${ideaDataApi}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${currentUser.data[0]?.token}`,
      },
    };
    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          setIdeaPdfValues(response?.data?.data[0]);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    if (ideaPdfValues !== undefined) {
      handlePrint();
    } else {
      // console.log("Some PDF printing related api's are failing");
    }
  }, [ideaPdfValues]);

  const ideaPdfDownload = () => {
    ideaDataforPDF();
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const labelToKeyMap = {
    "Health & Wellness": "healthwellnesstheme",
    "Women & Child Development": "womenchildtheme",
    Water: "watertheme",
    "Lifestyle for Environment (LiFE)": "lifestyletheme",
    "Cultural Pride": "culturaltheme",
    "Tribal Empowerment": "tribaltheme",
    "Future-Ready Skills": "futuretheme",
    "Local Community Problems (Open Innovation)": "localtheme",
  };
  const themeKey = labelToKeyMap[response.theme];
  return (
    <div>
      <div style={{ display: "none" }}>
        <Ideapdf ref={componentRef} ideaDetails={ideaPdfValues} />
      </div>

      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="assign-evaluator ChangePSWModal teacher-register-modal"
        backdrop="static"
      >
        <Modal.Header closeButton onHide={handleClose}>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="w-100 d-block text-center"
          >
            {t("ideaSubmission.theme")} : {t(`theme.${themeKey}`)}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* <Card className="mb-3 border-start border-4 border-primary rounded shadow-sm">
            <CardBody>
              <label className="fw-semibold">
                {t("ideaSubmission.language")}
              </label>
              <CardText style={{ fontSize: "1rem" }}>{response.language}</CardText>
            </CardBody>
          </Card> */}
          <Card className="mb-3 border-start border-4 border-primary rounded shadow-top  shadow-sm">
            <CardBody>
              <label className="fw-semibold">
                {t("ideaSubmission.language")}
              </label>
              <CardText className="mt-2 fw-semibold fs-6">
                {response.language}
              </CardText>
            </CardBody>
          </Card>
          <Card className="mb-3 border-start border-4 border-primary rounded shadow-sm">
            <CardBody>
              <label className="fw-semibold">
                {t("ideaSubmission.focusArea")}
              </label>
              <CardText className="mt-2 fw-semibold fs-6">
                {response.focus_area}
              </CardText>
            </CardBody>
          </Card>
          <Card className="mb-3 border-start border-4 border-primary rounded shadow-sm">
            <CardBody>
              <label className="fw-semibold">
                {t("ideaSubmission.ideaTitle")}
              </label>
              <CardText className="mt-2 fw-semibold fs-6">
                {submittedResponse.title}
              </CardText>
            </CardBody>
          </Card>
          <Card className="mb-3 border-start border-4 border-primary rounded shadow-sm">
            <CardBody>
              <label className="fw-semibold">
                {t("ideaSubmission.problemStatement")}
              </label>
              <CardText className="mt-2 fw-semibold fs-6">
                {submittedResponse.problem_statement}
              </CardText>
            </CardBody>
          </Card>
          <Card className="mb-3 border-start border-4 border-primary rounded shadow-sm">
            <CardBody>
              <label className="fw-semibold">
                {t("ideaSubmission.causes")}
              </label>
              <CardText className="mt-2 fw-semibold fs-6">
                {submittedResponse.causes}
              </CardText>
            </CardBody>
          </Card>
          <Card className="mb-3 border-start border-4 border-primary rounded shadow-sm">
            <CardBody>
              <label className="fw-semibold">
                {t("ideaSubmission.effects")}
              </label>
              <CardText className="mt-2 fw-semibold fs-6">
                {submittedResponse.effects}
              </CardText>
            </CardBody>
          </Card>
          <Card className="mb-3 border-start border-4 border-primary rounded shadow-sm">
            <CardBody>
              <label className="fw-semibold">
                {t("ideaSubmission.community")}
              </label>
              <CardText className="mt-2 fw-semibold fs-6">
                {submittedResponse.community}
              </CardText>
            </CardBody>
          </Card>{" "}
          <Card className="mb-3 border-start border-4 border-primary rounded shadow-sm">
            <CardBody>
              <label className="fw-semibold">
                {t("ideaSubmission.facing")}
              </label>
              <CardText className="mt-2 fw-semibold fs-6">
                {submittedResponse.facing}
              </CardText>
            </CardBody>
          </Card>{" "}
          <Card className="mb-3 border-start border-4 border-primary rounded shadow-sm">
            <CardBody>
              <label className="fw-semibold">
                {t("ideaSubmission.solution")}
              </label>
              <CardText className="mt-2 fw-semibold fs-6">
                {submittedResponse.solution}
              </CardText>
            </CardBody>
          </Card>
          <Card className="mb-3 border-start border-4 border-primary rounded shadow-sm">
            <CardBody>
              <label className="fw-semibold">
                {t("ideaSubmission.stakeholders")}
              </label>
              <CardText className="mt-2 fw-semibold fs-6">
                {submittedResponse.stakeholders}
              </CardText>
            </CardBody>
          </Card>{" "}
          <Card className="mb-3 border-start border-4 border-primary rounded shadow-sm">
            <CardBody>
              <label className="fw-semibold">
                {t("ideaSubmission.problemSolving")}
              </label>
              <CardText className="mt-2 fw-semibold fs-6">
                {/* {submittedResponse.problem_solving} */}
                {problemSolvingArray.join(", ")}
              </CardText>
            </CardBody>
          </Card>{" "}
          <Card className="mb-3 border-start border-4 border-primary rounded shadow-sm">
            <CardBody>
              <label className="fw-semibold">
                {t("ideaSubmission.feedback")}
              </label>
              <CardText className="mt-2 fw-semibold fs-6">
                {submittedResponse.feedback}
              </CardText>
            </CardBody>
          </Card>
          <Card className="mb-3 border-start border-4 border-primary rounded shadow-sm">
            <CardBody>
              <label className="fw-semibold">
                {t("ideaSubmission.prototypeDoc")}
              </label>

              <CardText className="mt-2 fw-semibold fs-6">
                <Card>
                  {" "}
                  {<LinkComponent item={images} currentUser={currentUser} />}
                </Card>
              </CardText>
            </CardBody>
          </Card>
          <Card className="mb-3 border-start border-4 border-primary rounded shadow-sm">
            <CardBody>
              <label className="fw-semibold">
                {t("ideaSubmission.prototypeVideo")}
              </label>
              <CardText className="mt-2 fw-semibold fs-6">
                {submittedResponse?.prototype_link && (
                  <VideoPopup videoUrl={submittedResponse.prototype_link} />
                )}
              </CardText>
            </CardBody>
          </Card>
          <Card className="mb-3 border-start border-4 border-primary rounded shadow-sm">
            <CardBody>
              <label className="fw-semibold">
                {t("ideaSubmission.workbook")}
              </label>
              <CardText className="mt-2 fw-semibold fs-6">
                {submittedResponse.workbook}
              </CardText>
            </CardBody>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          {hide &&
          submittedResponse?.status === "SUBMITTED" &&
          submittedResponse?.verified_status !== "REJECTED" &&
          submittedResponse?.verified_status !== "ACCEPTED" ? (
            <Button
              size="small"
              label={t("teacherJourney.approve")}
              btnClass="primary text-left"
              onClick={handleAlert}
            />
          ) : (
            <>
              {submittedResponse?.verified_status == "ACCEPTED" && (
                <div>
                  <p style={{ fontSize: "1rem" }} className="fw-bold">
                    {t("ideaSubmission.acceptedAt")}:{" "}
                    {submittedResponse.verified_at
                      ? moment(submittedResponse.verified_at).format(
                          "DD-MM-YYYY"
                        )
                      : "-"}
                  </p>
                </div>
              )}
              {submittedResponse?.verified_status === "REJECTED" && (
                <div>
                  <p style={{ fontSize: "1rem" }} className="fw-bold">
                    {t("ideaSubmission.lastModifiedBy")}:{" "}
                    {submittedResponse?.initiated_name}
                  </p>
                  <p style={{ fontSize: "1rem" }} className="fw-bold">
                    {t("ideaSubmission.rejectedAt")}:{" "}
                    {submittedResponse.verified_at
                      ? moment(submittedResponse.verified_at).format(
                          "DD-MM-YYYY"
                        )
                      : "-"}
                  </p>
                  <p style={{ fontSize: "1rem" }} className="fw-bold">
                    {t("ideaSubmission.rejectedReason")} :{" "}
                    {submittedResponse?.mentor_rejected_reason}
                  </p>
                </div>
              )}
            </>
          )}
          {submittedResponse?.status === "SUBMITTED" && (
            <div>
              <p style={{ fontSize: "1rem" }} className="fw-bold">
                {t("ideaSubmission.submittedBy")} :{" "}
                {submittedResponse.initiated_name}
              </p>
            </div>
          )}
          {submittedResponse?.status === "DRAFT" &&
            submittedResponse?.verified_status === null && (
              <div>
                <p style={{ fontSize: "1rem" }} className="fw-bold">
                  {t("ideaSubmission.lastModifiedBy")} :{" "}
                  {submittedResponse.initiated_name}
                </p>
              </div>
            )}
          <Button
            size="small"
            label={t("teacherJourney.download_file")}
            btnClass="primary ms-auto"
            onClick={ideaPdfDownload}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default IdeaSubmissionCard;
