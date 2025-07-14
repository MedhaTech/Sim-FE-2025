/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import moment from "moment/moment";
import React, { useEffect, useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import { Card, CardBody, CardTitle ,Col,Row} from "reactstrap";
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
  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handlePreview = async (file, fileName) => {
    const parts = file.split("/");
    const path = parts.slice(3).join("/");
    const openParam = encryptGlobal(
      JSON.stringify({
        filePath: path,
      })
    );
    var config = {
      method: "get",
      url:
        process.env.REACT_APP_API_BASE_URL +
        `/admins/s3fileaccess?Data=${openParam}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.data[0]?.token}`,
      },
    };
    await axios(config)
      .then(function (response) {
        if (response.status === 200) {
          setTimeout(() => {
            setSelectedFile({
              prototype_image: response.data.data,
              fileName: fileName,
            });
            setShowModal(true);
          }, 500);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      {/* {item &&
        item.length > 0 &&
        item.map((ans, i) => {
          let a_link = ans.split("/");
          let count = a_link.length - 1;
          let fileName = a_link[count];
          return (
            <a
              key={i}
              className="badge mb-2 bg-info p-2 ms-3 col-3"
              style={{ cursor: "pointer", maxWidth: "100%",wordBreak: "break-word", whiteSpace: "normal", }}
              onClick={() => handlePreview(ans, fileName)}
              target="_blank"
              rel="noreferrer"

            >
              <span className="file-name">{fileName}</span>
            </a>
          );
        })} */}
        <Row className="g-2">
  {item &&
    item.length > 0 &&
    item.map((ans, i) => {
      let a_link = ans.split("/");
      let count = a_link.length - 1;
      let fileName = a_link[count];

      return (
        <Col xs={12} sm={6} md={4} key={i}>
          <a
            className="badge bg-info w-100 p-2 d-block"
            style={{
              cursor: "pointer",
              wordBreak: "break-word",
              whiteSpace: "normal",
              lineHeight: "1.2",
            }}
            onClick={() => handlePreview(ans, fileName)}
            target="_blank"
            rel="noreferrer"
          >
            <span className="file-name">{fileName}</span>
          </a>
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
          openNotificationWithIcon("success", "Idea Approved Successfully");
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
 "Building a Sustainable Future": "buildingtheme",
  "Technology for Learning and Growth": "technologytheme",
  "Health, Nutrition and Well-being": "healththeme",
  "Skills for Life and Livelihood": "skillstheme",
  "Smarter Communities, Safer Futures": "smartertheme",
  "Agriculture and Rural Transformation": "agriculturetheme",
  "Open Category - Think Beyond": "opentheme",
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
          <Card  className="mb-3 border-start border-4 border-primary rounded shadow-top  shadow-sm">
            <CardBody>
              <label className="fw-semibold">
                {t("ideaSubmission.language")}
              </label>
              <CardText className="mt-2 fw-semibold fs-6">{response.language}</CardText>
            </CardBody>
          </Card >
          <Card className="mb-3 border-start border-4 border-primary rounded shadow-sm">
            <CardBody>
              <label className="fw-semibold">
                {t("ideaSubmission.focusArea")}
              </label>
              <CardText className="mt-2 fw-semibold fs-6">{response.focus_area}</CardText>
            </CardBody>
          </Card>
          <Card className="mb-3 border-start border-4 border-primary rounded shadow-sm">
            <CardBody>
              <label className="fw-semibold">
                {t("ideaSubmission.ideaTitle")}
              </label>
              <CardText className="mt-2 fw-semibold fs-6">{submittedResponse.title}</CardText>
            </CardBody>
          </Card>
          <Card className="mb-3 border-start border-4 border-primary rounded shadow-sm">
            <CardBody>
              <label className="fw-semibold">
                {t("ideaSubmission.problemStatement")}
              </label>
              <CardText className="mt-2 fw-semibold fs-6">{submittedResponse.problem_statement}</CardText>
            </CardBody>
          </Card>
          <Card className="mb-3 border-start border-4 border-primary rounded shadow-sm">
            <CardBody>
              <label className="fw-semibold">
                {t("ideaSubmission.causes")}
              </label>
              <CardText className="mt-2 fw-semibold fs-6">{submittedResponse.causes}</CardText>
            </CardBody>
          </Card>
          <Card className="mb-3 border-start border-4 border-primary rounded shadow-sm">
            <CardBody>
              <label className="fw-semibold">
                {t("ideaSubmission.effects")}
              </label>
              <CardText className="mt-2 fw-semibold fs-6">{submittedResponse.effects}</CardText>
            </CardBody>
          </Card>
          <Card className="mb-3 border-start border-4 border-primary rounded shadow-sm">
            <CardBody>
              <label className="fw-semibold">
                {t("ideaSubmission.community")}
              </label>
              <CardText className="mt-2 fw-semibold fs-6">{submittedResponse.community}</CardText>
            </CardBody>
          </Card>{" "}
          <Card className="mb-3 border-start border-4 border-primary rounded shadow-sm">
            <CardBody>
              <label className="fw-semibold">
                {t("ideaSubmission.facing")}
              </label>
              <CardText className="mt-2 fw-semibold fs-6">{submittedResponse.facing}</CardText>
            </CardBody>
          </Card>{" "}
          <Card className="mb-3 border-start border-4 border-primary rounded shadow-sm">
            <CardBody>
              <label className="fw-semibold">
                {t("ideaSubmission.solution")}
              </label>
              <CardText className="mt-2 fw-semibold fs-6">{submittedResponse.solution}</CardText>
            </CardBody>
          </Card>
          <Card className="mb-3 border-start border-4 border-primary rounded shadow-sm">
            <CardBody>
              <label className="fw-semibold">
                {t("ideaSubmission.stakeholders")}
              </label>
              <CardText className="mt-2 fw-semibold fs-6">{submittedResponse.stakeholders}</CardText>
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
              <CardText className="mt-2 fw-semibold fs-6">{submittedResponse.feedback}</CardText>
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
              <CardText className="mt-2 fw-semibold fs-6">{submittedResponse.workbook}</CardText>
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
