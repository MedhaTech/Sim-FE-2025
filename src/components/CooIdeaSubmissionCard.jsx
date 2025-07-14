/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import moment from "moment/moment";
import React, { useEffect, useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import { Card, CardBody, CardTitle } from "reactstrap";
import { Button } from "../stories/Button";
import { FaDownload } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import { CardText } from "reactstrap";
import { openNotificationWithIcon } from "../helpers/Utils";
import { getCurrentUser } from "../helpers/Utils";
import { getTeamMemberStatus } from "../Teacher/store/teams/actions";
import axios from "axios";
import { encryptGlobal } from "../constants/encryptDecrypt";
import { useDispatch } from "react-redux";
import Ideapdf from "../Teacher/Dashboard/DetailToDownload";
import FilePreviewModal from '../Evaluator/IdeaList/Modal';
import VideoPopup from "../Evaluator/IdeaList/Videopop";

const LinkComponent = ({ item }) => {
   const [selectedFile, setSelectedFile] = useState(null);
        const [showModal, setShowModal] = useState(false);
        const handlePreview = (url) => {
          setSelectedFile({ prototype_image: url });
          setShowModal(true);
        };
  return (
    <>
      {item &&
        item.length > 0 &&
        item.map((ans, i) => {
          let a_link = ans.split("/");
          let count = a_link.length - 1;
          let fileName = a_link[count];
          return (
            <a
              key={i}
              className="badge mb-2 bg-info p-3 ms-3 col-3"
              target="_blank"
              style={{ cursor: 'pointer' }}

               onClick={() => handlePreview(ans)}
              rel="noreferrer"
            >
             <span className="file-name">
                            {fileName}
                        </span>
            </a>
          );
        })}
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
const CooIdeaSubmissionCard = ({
  handleClose,
  show,
  response,
  setIdeaCount,
}) => {
  const submitted = response;
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
 const [images,setImages] = React.useState([]);

 
  const teamId = submittedResponse.team_id;

   useEffect(() => {
            if (submittedResponse) {
                setImages(JSON.parse(submittedResponse.prototype_image));
            }
        }, [submittedResponse]);

 
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
        team_id: teamId
      })
    );
    var config = {
      method: 'get',
      url:
        process.env.REACT_APP_API_BASE_URL +
        `/challenge_response/submittedDetailsforideapdf?Data=${ideaDataApi}`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${currentUser.data[0]?.token}`
      }
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
    content: () => componentRef.current
  });




  return (
    <div>
      <div style={{ display: 'none' }}>
        <Ideapdf
          ref={componentRef}
          ideaDetails={ideaPdfValues}
        />
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
           Theme : {response.theme}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <Card className="p-1">
            <CardBody>
              <label htmlFor="teams" className="" style={{ fontSize: "1rem" }}>
              Idea Submission Language 
              </label>
              <CardText>{response.language}</CardText>
            </CardBody>
          </Card>
          <Card className="p-1">
            <CardBody>
              <label htmlFor="teams" className="" style={{ fontSize: "1rem" }}>
                1. Focus Area
              </label>
              <CardText>{response.focus_area}</CardText>
            </CardBody>
          </Card>
          <Card className="p-1">
            <CardBody>
              <label htmlFor="teams" className="" style={{ fontSize: "1rem" }}>
                2. Title of your idea (Think of a proper name. Don't describe
                the solution or problem statement here.)
              </label>
              <CardText>{submittedResponse.title}</CardText>
            </CardBody>
          </Card>
          <Card className="p-1">
            <CardBody>
              <label htmlFor="teams" className="" style={{ fontSize: "1rem" }}>
                3. Write down your Problem statement
              </label>
              <CardText>{submittedResponse.problem_statement}</CardText>
            </CardBody>
          </Card>
          <Card className="p-1">
            <CardBody>
              <label htmlFor="teams" className="" style={{ fontSize: "1rem" }}>
                4. List the Causes of the problem
              </label>
              <CardText>{submittedResponse.causes}</CardText>
            </CardBody>
          </Card>
          <Card className="p-1">
            <CardBody>
              <label htmlFor="teams" className="" style={{ fontSize: "1rem" }}>
                5. List the Effects of the problem
              </label>
              <CardText>{submittedResponse.effects}</CardText>
            </CardBody>
          </Card>
          <Card className="p-1">
            <CardBody>
              <label htmlFor="teams" className="" style={{ fontSize: "1rem" }}>
                6. In which places in your community did you find this problem?
              </label>
              <CardText>{submittedResponse.community}</CardText>
            </CardBody>
          </Card>{" "}
          <Card className="p-1">
            <CardBody>
              <label htmlFor="teams" className="" style={{ fontSize: "1rem" }}>
                7. Who all are facing this problem?
              </label>
              <CardText>{submittedResponse.facing}</CardText>
            </CardBody>
          </Card>{" "}
          <Card className="p-1">
            <CardBody>
              <label htmlFor="teams" className="" style={{ fontSize: "1rem" }}>
                8. Describe the solution to the problem your team found. Explain
                your solution clearly - how does it work, who is it helping, and
                how will it solve the problem.
              </label>
              <CardText>{submittedResponse.solution}</CardText>
            </CardBody>
          </Card>
          <Card className="p-1">
            <CardBody>
              <label htmlFor="teams" className="" style={{ fontSize: "1rem" }}>
                9. Apart from your teacher, how many people/stakeholders did you
                speak to to understand or improve your problem or solution?
              </label>
              <CardText>{submittedResponse.stakeholders}</CardText>
            </CardBody>
          </Card>{" "}
          <Card className="p-1">
            <CardBody>
              <label htmlFor="teams" className="" style={{ fontSize: "1rem" }}>
                10. Pick the actions your team did in your problem solving
                journey (You can choose multiple options)
              </label>
              <CardText>
                {problemSolvingArray.join(", ")}
              </CardText>
            </CardBody>
          </Card>{" "}
          <Card className="p-1">
            <CardBody>
              <label htmlFor="teams" className="" style={{ fontSize: "1rem" }}>
                11. Mention the feedback that your team got and the changes you
                have made, if any, to your problem or solution.
              </label>
              <CardText>{submittedResponse.feedback}</CardText>
            </CardBody>
          </Card>
          <Card className="p-1">
            <CardBody>
              <label htmlFor="teams" className="" style={{ fontSize: "1rem" }}>
                12. Descriptive Document/Image of your prototype
              </label>
             
              <CardText>
               
                   <Card >  {
                                          <LinkComponent item={images} />
                                        }</Card>
               
              </CardText>
            </CardBody>
          </Card>
          <Card className="p-1">
            <CardBody>
              <label htmlFor="teams" className="" style={{ fontSize: "1rem" }}>
                13. Clear YouTube Video Explaining your Solution
              </label>
              <CardText>
              {submittedResponse?.prototype_link && (
  <VideoPopup videoUrl={submittedResponse.prototype_link} />
)}
                </CardText>
            </CardBody>
          </Card>
          <Card className="p-1">
            <CardBody>
              <label htmlFor="teams" className="" style={{ fontSize: "1rem" }}>
                14. Did your team complete and submit the workbook to your
                school Guide teacher?
              </label>
              <CardText>{submittedResponse.workbook}</CardText>
            </CardBody>
          </Card>
        </Modal.Body>
        <Modal.Footer>

          {submittedResponse?.status === "SUBMITTED" && (
            <div>
              <p style={{ fontSize: "1rem" }} className="fw-bold">
                Submitted By : {submittedResponse.initiated_name}
              </p>
            </div>
          )}
          {submittedResponse?.status === "DRAFT" && submittedResponse?.verified_status === null && (
            <div>
              <p style={{ fontSize: "1rem" }} className="fw-bold">
                Last Modified By : {submittedResponse.initiated_name}
              </p>
            </div>
          )}
          <Button
            size="small"
            label={"Download"}
            btnClass="primary ms-auto"
            onClick={ideaPdfDownload}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CooIdeaSubmissionCard;
