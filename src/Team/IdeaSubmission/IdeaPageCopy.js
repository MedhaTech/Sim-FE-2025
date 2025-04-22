/* eslint-disable no-useless-escape */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { Button } from "../../stories/Button";
// import { TextArea } from '../../../stories/TextArea/TextArea';
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
// import Layout from '../../Layout';
import { useSelector } from "react-redux";
import {
  getStudentChallengeQuestions,
  getStudentChallengeSubmittedResponse,
  updateStudentBadges,
} from "../../redux/studentRegistration/actions";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../../helpers/Utils";
import {
  getNormalHeaders,
  openNotificationWithIcon,
} from "../../helpers/Utils";
import axios from "axios";
import { KEY, URL } from "../../constants/defaultValues";
import CommonPage from "../../components/CommonPage";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import logout from "../../assets/img/logout.svg";
// import { cardData, subCategoryData } from './SDGData';
import moment from "moment";
// import { getLanguage } from "../../constants/languageOptions";

import { encryptGlobal } from "../../constants/encryptDecrypt";
import { themes, themesList, focusareasList } from "./themesData";
import {languageOptions} from "../../RegPage/ORGData";
import { use } from "i18next";
import { initiateIdea } from "../../redux/studentRegistration/actions";
import { setIn } from "formik";
import { getLanguage } from "../../constants/languageOptions";

const LinkComponent = ({ original, item, url, removeFileHandler, i }) => {
  let a_link;
  let count;
  if (url) {
    a_link = item.split("/");
    count = a_link.length - 1;
  }
  return (
    <>
      {original ? (
        <div className="badge mb-2 bg-info ms-3">
          <span className="p-2">{item.name}</span>
          {original && (
            <span className="pointer" onClick={() => removeFileHandler(i)}>
              <AiOutlineCloseCircle size={20} />
            </span>
          )}
        </div>
      ) : (
        <a
          className="badge mb-2 bg-info p-3 ms-3"
          href={item}
          target="_blank"
          rel="noreferrer"
        >
          {a_link[count]}
        </a>
      )}
    </>
  );
};
const IdeasPageNew = ({ showChallenges, ...props }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const initialSizeData = {
    data: formData,
  };
  const dispatch = useDispatch();
  // dispatch(
  //     initiateIdea(
  //         currentUser?.data[0]?.team_id,
  //         language,
  //         initialSizeData,
  //         // setShowChallenges,
  //         t
  //     )
  // );
  const showPage = false;
  //   const language = useSelector(
  //     (state) => state?.studentRegistration?.studentLanguage
  // );
  const [isDisabled, setIsDisabled] = useState(false);
  const initialLoadingStatus = { draft: false, submit: false };
  const [loading, setLoading] = useState(initialLoadingStatus);
  const currentUser = getCurrentUser("current_user");
const[extractId,setExtractId]=useState("");
  const TeamId = currentUser?.data[0]?.team_id;

  const [currentSection, setCurrentSection] = useState(1);
  const goToNext = () => setCurrentSection(currentSection + 1);
  const goToBack = () => setCurrentSection(currentSection - 1);
  const [theme, setTheme] = useState(
    props?.theme !== "" && props?.theme !== undefined
      ? props?.theme
      : formData?.theme
  );

  const[verfiySubmitt,setVerifySubmitt]=useState(false);

  const [focusarea, setFocusArea] = useState(formData?.focus_area);
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState(formData?.title);
  // Add on
  const [language, setLanuage] = useState(formData?.language);

  const [problemStatement, setProblemStatement] = useState(
    formData?.problemStatement
  );
  const [causes, setCauses] = useState(formData?.causes);
  const [effects, setEffects] = useState(formData?.effects);
  const [community, setCommunity] = useState(formData?.community);
  const [facing, setFacing] = useState(formData?.facing);
  const [solution, setSolution] = useState(formData?.solution);
  const [stakeholders, setStakeholders] = useState(formData?.stakeholders);
  const [problemSolving, setProblemSolving] = useState(
    formData?.problemSolving || []
  );
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [error4, seterror4] = useState(false);
  const [ideaInitiation, setIdeaInitiation] = useState("");
  const [feedback, setFeedback] = useState(formData?.feedback);
  const [prototypeImage, setPrototypeImage] = useState(
    formData.prototype_image || []
  );
  const [focus, setFocus] = useState([]);
  const [id, setId] = useState("");
  const [prototypeLink, setPrototypeLink] = useState(formData?.prototype_link);
  const [workbook, setWorkbook] = useState(formData?.workbook);
  const [tempLink, setTempLink] = useState("");
  // const people = ["None", "2-4 people", "5+ people", "10+ people"];
  // const people = [
  //   t("ideaform_questions.stakeholdersop1"),
  //   t("ideaform_questions.stakeholdersop2"),
  //   t("ideaform_questions.stakeholdersop3"),
  //   t("ideaform_questions.stakeholdersop4"),
  // ];

  // const submit = [
  //   t("ideaform_questions.workbookyes"),
  //   t("ideaform_questions.workbookno"),
  // ];
  // const journey = [
  //   t("ideaform_questions.probsoljourneyop1"),
  //   t("ideaform_questions.probsoljourneyop2"),

  //   t("ideaform_questions.probsoljourneyop3"),

  //   t("ideaform_questions.probsoljourneyop4"),
  // ];
  // const place = [
  //   t("ideaform_questions.communityop1"),
  //   t("ideaform_questions.communityop2"),
  //   t("ideaform_questions.communityop3"),
  //   t("ideaform_questions.communityop4"),
  // ];
    const submit = [
    { value:"YES", label:  t("ideaform_questions.workbookyes") },
    { value: "NO", label : t("ideaform_questions.workbookno") },
  ];
    const people = [
    { value:"None", label: t("ideaform_questions.stakeholdersop1") },
    { value: "2-4 people", label : t("ideaform_questions.stakeholdersop2") },
    { value: "5+ people", label: t("ideaform_questions.stakeholdersop3") },
    { value:  "10+ people", label: t("ideaform_questions.stakeholdersop4") },
  ];
    const journey = [
    { value: "We did the full problem solving journey by ourselves." , label: t("ideaform_questions.probsoljourneyop1") },
    { value:"We got feedback on our problem and modified it",  label : t("ideaform_questions.probsoljourneyop2") },
    { value: "We got feedback on our idea and modified it", label: t("ideaform_questions.probsoljourneyop3") },
    { value: "We got feedback on our prototype and modified it", label: t("ideaform_questions.probsoljourneyop4") },
  ];
  const place = [
    { value: "School", label: t("ideaform_questions.communityop1") },
    { value: "Home", label: t("ideaform_questions.communityop2") },
    {
      value: "Other places in the surroundings (Market/Park/Playground etc.)",
      label: t("ideaform_questions.communityop3"),
    },
    {
      value: "Others(Read in newspapers,saw on the internet, etc.)",
      label: t("ideaform_questions.communityop4"),
    },
  ];

  const initiatedBy = formData?.initiated_by;
  const handleThemeChange = (e) => {
    const selectedTheme = e.target.value;
    setTheme(selectedTheme);
    if (selectedTheme === "Others") {
      setFocus([]);
      setFocusArea("");
    } else {
      setFocus(focusareasList[selectedTheme] || []);
    }
  };
  const handleFocusAreaChange = (e) => {
    setFocusArea(e.target.value);
  };
  const handleLanguageChange = (e) => {
    setLanuage(e.target.value);
  };
  // useEffect(() => {
  //   setFocus(
  //     focusareasList[
  //       props?.theme !== "" && props?.theme !== undefined
  //         ? props?.theme
  //         : formData?.theme
  //     ] || []
  //   );
  // }, [formData.theme]);
  useEffect(() => {
    const activeTheme =
      props?.theme !== "" && props?.theme !== undefined
        ? props?.theme
        : formData?.theme;

    if (activeTheme === "Others") {
      setFocus([]);
    } else {
      setFocus(focusareasList[activeTheme] || []);
    }
  }, [formData.theme]);
  useEffect(() => {
    setTheme(
      props?.theme !== "" && props?.theme !== undefined
        ? props?.theme
        : formData?.theme
    );
    setTitle(formData?.title);
    setProblemStatement(formData?.problem_statement);
    setCauses(formData?.causes);
    setLanuage(formData?.language);

    setEffects(formData?.effects);
    setCommunity(formData?.community);
    setFacing(formData?.facing);
    setSolution(formData?.solution);
    setStakeholders(formData?.stakeholders);
    setFeedback(formData?.feedback);
    setPrototypeImage(formData?.prototype_image);
    setPrototypeLink(formData?.prototype_link);

    setWorkbook(formData?.workbook);
    if (formData?.prototype_link) {
      setIsButtonDisabled(true);
    }
  }, [formData]);

  useEffect(() => {
    if (formData?.problem_solving) {
      setProblemSolving(JSON.parse(formData.problem_solving));
    } else {
      setProblemSolving([]);
    }

    if (formData?.prototype_image) {
      setPrototypeImage(JSON.parse(formData.prototype_image));
    } else {
      setPrototypeImage([]);
    }
  }, [formData?.problem_solving, formData?.theme, formData?.prototype_image]);

  const handleCheckboxChange = (item) => {
    if (Array.isArray(problemSolving) && problemSolving.includes(item)) {
      setProblemSolving(problemSolving.filter((i) => i !== item));
    } else {
      setProblemSolving([...(problemSolving || []), item]);
    }
  };
  const [immediateLink, setImmediateLink] = useState(null);
  const handleUploadFiles = (addedFiles) => {
    const upload = [...files];

    addedFiles.some((item) => {
      if (upload.findIndex((i) => i.name === item.name) === -1)
        upload.push(item);
    });
    setFiles(upload);
    setImmediateLink(null);
  };
  const removeFileHandler = (i) => {
    const fileAdded = [...files];
    fileAdded.splice(i, 1);
    setFiles(fileAdded);
  };
  let maxFileSize = 10000000;
  const fileHandler = (e) => {
    let choosenFiles = Array.prototype.slice.call(e.target.files);
    // e.target.files = null;
    let pattern = /^[a-zA-Z0-9_-\s]{0,}$/;
    const checkPat = choosenFiles.filter((item) => {
      let pat = item.name.split(".");
      pat.pop();
      return pat.join().search(pattern);
    });
    if (checkPat.length > 0) {
      openNotificationWithIcon("error", t("home.condition"));
      return;
    }
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
    ];
    if (
      choosenFiles.filter((item) => allowedTypes.includes(item.type) === false)
        .length > 0
    ) {
      openNotificationWithIcon("error", t("Choose .png/.jpg/.jpeg/.pdf Only"));
      return;
    }
    if (choosenFiles.filter((item) => item.size > maxFileSize).length > 0) {
      openNotificationWithIcon("error", t("student.less_10MB"));
      return;
    }
    handleUploadFiles(choosenFiles);
  };

  useEffect(() => {
    submittedApi();
  }, []);
  const submittedApi = () => {
    const Param = encryptGlobal(
      JSON.stringify({
        team_id: TeamId,
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
            const data = response.data.data[0];
            data && setIsDisabled(true);
            setFormData(data);
            setFocusArea(response.data.data[0].focus_area);
            setId(response.data.data[0].challenge_response_id);
          }
        }
      })
      .catch(function (error) {
        if (error.response.status === 404) {
          seterror4(true);
        }
      });
  };
  const apiCall = () => {
    const challengeParamID = encryptGlobal("1");
    const queryObj = JSON.stringify({
      team_id: TeamId,
    });
    const queryObjEn = encryptGlobal(queryObj);

    const body = {
      theme: theme,
      focus_area: focusarea,
      title: title,
      problem_statement: problemStatement,
      district:currentUser?.data[0]?.district,
      state:currentUser?.data[0]?.state,

      initiated_by: currentUser?.data[0]?.user_id,
    };
    if (causes !== "") {
      body["causes"] = causes;
    }
    if (language !== "") {
      body["language"] = language;
    }
    if (effects !== "") {
      body["effects"] = effects;
    }
    if (community !== "") {
      body["community"] = community;
    }
    if (facing !== "") {
      body["facing"] = facing;
    }
    if (solution !== "") {
      body["solution"] = solution;
    }
    if (stakeholders !== "") {
      body["stakeholders"] = stakeholders;
    }
    if (problemSolving !== "") {
      body["problem_solving"] = JSON.stringify(problemSolving);
    }
    if (feedback !== "") {
      body["feedback"] = feedback;
    }
    if (prototypeLink !== "") {
      body["prototype_link"] = prototypeLink;
    }
    if (workbook !== "") {
      body["workbook"] = workbook;
    }
    var config = {
      method: "post",
      url:
        process.env.REACT_APP_API_BASE_URL +
        `/challenge_response/${challengeParamID}/initiate?Data=${queryObjEn}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.data[0]?.token}`,
      },
      data: JSON.stringify(body),
    };

    axios(config)
      .then(async function (response) {
        if (response.status == 200) {
          setIdeaInitiation(response?.data?.data[0]?.initiated_by);
          openNotificationWithIcon("success", t("home.ideaInitPop"));
          submittedApi();
          seterror4(false); 
        }
      })
      .catch(function (error) {
        openNotificationWithIcon("error", t("home.firstfour"));
        console.log(error);
      });
  };
  const handleSubmit = async (item, stats) => {
    setIsDisabled(true);

    if (error4) {
      apiCall();
      return;
    } else {
      if (stats) {
        setLoading({ ...loading, draft: true });
      } else {
        setLoading({ ...loading, submit: true });
      }
      if (files.length > 0) {
        const formsData = new FormData();
        for (let i = 0; i < files.length; i++) {
          formsData.append(`file${i}`, files[i]);
        }

        for (let [key, value] of formsData.entries()) {
          console.log(`${key}:`, value);
        }

        const axiosConfig = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${currentUser?.data[0]?.token}`,
          },
        };

        const subId = encryptGlobal(
          JSON.stringify({ team_id: currentUser?.data[0]?.team_id })
        );

        const result = await axios
          .post(`${URL.uploadFile}?Data=${subId}`, formsData, axiosConfig)
          .then((res) => res)
          .catch((err) => {
            return err.response;
          });
        if (result && result.status === 200) {
          setImmediateLink(result.data?.data[0]?.attachments);
          setPrototypeImage(result.data?.data[0]?.attachments);
          // setLoading(initialLoadingStatus);
          handleSubmitAll(item, stats, result.data?.data[0]?.attachments);
        } else {
          openNotificationWithIcon("error", `${result?.data?.message}`);
          setLoading(initialLoadingStatus);

          return;
        }
      } else {
        handleSubmitAll(item, stats);
      }
    }
  };
 
  const handleSubmitAll = async (item, stats, file) => {
    setLoading(initialLoadingStatus);

    let attachmentsList = "";
    if (file) {
      attachmentsList = file.join(", ");
    }
    const body = {
      team_id: TeamId,
      theme: theme,
      focus_area: focusarea,
      title: title,
      problem_statement: problemStatement,
      status: stats,
      initiated_by: currentUser?.data[0]?.user_id,
    };

    if (causes !== null) {
      body["causes"] = causes;
    }
    if (language !== null) {
      body["language"] = language;
    }
    if (effects !== null) {
      body["effects"] = effects;
    }
    if (community !== null) {
      body["community"] = community;
    }
    if (facing !== null) {
      body["facing"] = facing;
    }
    if (solution !== null) {
      body["solution"] = solution;
    }
    if (stakeholders !== null) {
      body["stakeholders"] = stakeholders;
    }
    if (problemSolving !== null) {
      body["problem_solving"] = JSON.stringify(problemSolving);
    }
    if (feedback !== null) {
      body["feedback"] = feedback;
    }
    if (prototypeLink !== null && verfiySubmitt) {
      body["prototype_link"] = prototypeLink;
    }

    if (workbook !== null) {
      body["workbook"] = workbook;
    }
    if (attachmentsList !== "") {
      body["prototype_image"] = JSON.stringify(file);
    }
    var allques = true;
    if (stats === "SUBMITTED") {
      if (
        theme === "" ||
        theme === null ||


        focusarea === "" ||
        focusarea === null ||


        problemStatement === "" ||
        problemStatement === null ||

        title === "" ||
        title ===  null ||

        causes === "" ||
        causes === null ||

        language === "" ||
        language === null ||

        effects === "" ||
        effects === null ||

        community === "" ||
        community === null ||

        facing === "" ||
        facing === null ||

        solution === "" ||
        solution === null ||

        stakeholders === "" ||
        stakeholders === null ||

        problemSolving === "" ||
        problemSolving === null ||

        feedback === "" ||
        feedback === null ||

        prototypeLink === "" ||
        prototypeLink == null ||

        workbook === "" ||
        workbook == null
      ) {
        allques = false;
      }

      if (
        (attachmentsList?.length === 0 ||
          attachmentsList === null ||
          attachmentsList === undefined) &&
        (prototypeImage?.length === 0 ||
          prototypeImage === null ||
          prototypeImage === undefined)
      ) {
        allques = false;
      }
      if(verfiySubmitt === false){
        allques= false ;
        openNotificationWithIcon("error", t("home.ideaVerify"));
            }
    }
   
    if (allques || stats === "DRAFT") {
      const editParam = encryptGlobal(JSON.stringify(id));
      var config = {
        method: "put",
        url: `${
          process.env.REACT_APP_API_BASE_URL +
          "/challenge_response/updateEntry/" +
          editParam
        }`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser?.data[0]?.token}`,
        },
        data: JSON.stringify(body),
      };
      axios(config)
        .then(function (response) {
          if (response.status === 200) {
            if (stats === "SUBMITTED") {
              openNotificationWithIcon("success", t("home.ideaSubPop"));
              setTimeout(function () {
                window.location.reload();
              }, 500);
              // window.location.reload();

              localStorage.setItem("ideaSubStatus", 1);
              onclick();
            } else {
              openNotificationWithIcon("success", t("home.ideaDraPop"));
              setIsDisabled(true);
              scroll();
            }
          }
        })
        .catch(function (error) {
          // openNotificationWithIcon(
          //     'error',
          //     error?.response?.data?.message
          // );
          console.log(error);
        });
    } else {
      openNotificationWithIcon("error", t("home.ideaFullPop"));
    }
  };
  const onclick = () => {
    if (typeof showChallenges === "function") {
      showChallenges();
    } else {
      console.error("showChallenges is not a function");
    }
  };
  const scroll = () => {
    const section = document.querySelector("#start");
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const handleEdit = () => {
    setIsDisabled(false);
    scroll();
  };

  useEffect(()=>{
    if(prototypeLink !== formData?.prototype_link){
      setVerifySubmitt(false);
    }
      },[prototypeLink]);

  useEffect(()=>{
    if(formData?.prototype_link !== null && formData?.prototype_link !== undefined ){
      setVerifySubmitt(true);
    }
  },[formData?.prototype_link]);   

  const comingSoonText = t("dummytext.student_idea_sub");
  // const acceptedParamfileTypes =>
  //     'Accepting only png,jpg,jpeg,pdf,mp4,doc,docx Only, file size should be below 10MB';
  const enableSaveBtn =
    theme?.length > 0 &&
    focusarea?.length > 0 &&
    title?.length > 0 &&
    problemStatement?.length > 0;

    useEffect(()=>{
if(formData?.verified_status === "ACCEPTED"){
  console.log("Badge Enable");
  dispatch(
    updateStudentBadges(
        { badge_slugs: ['the_change_maker'] },
        currentUser?.data[0]?.user_id,
        language,
        t
    )
);
}
    },[formData]);
   
      const handleVideoApi=(videoId)=> {
          const fectchTecParam = encryptGlobal(
              JSON.stringify({
                id: videoId,
              })
            );
        
          let config = {
              method: 'get',
              url: process.env.REACT_APP_API_BASE_URL + `/challenge_response/checkyoutubeurl?Data=${fectchTecParam}`,
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${currentUser?.data[0]?.token}`
              }
          };
          axios(config)
              .then(function (response) {
                  if (response.status === 200) {
                      if (response.data.data === "INVALID") {
                        // console.log(response.data.data,"response.data.data");
                        setPrototypeLink("");
                        setVerifySubmitt(false);

                        openNotificationWithIcon("error", response.data.message);
                      }else{
                        // setPrototypeLink(item); 
                        openNotificationWithIcon("success", response.data.message);
                        setIsButtonDisabled(true);
                        setVerifySubmitt(true);
                      }
                      
                  }
              })
              .catch(function (error) {
                  console.log(error);
              });
      };
  const getYouTubeVideoId = (url) => {
    const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:shorts\/|watch\?v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleInputChange = (e) => {
    const link = e.target.value;
    // setTempLink(link);
    setPrototypeLink(link);
    setIsButtonDisabled(false);
    const videoId = getYouTubeVideoId(link);
    setExtractId(videoId);
    console.log("Extracted Video ID:", videoId);
  };
  const handleVerify=(e)=>{
    e.preventDefault();
    handleVideoApi(extractId);
  };
  
  return (
    <>
      {/* <div className='content'> */}
      {showPage ? (
        <CommonPage text={comingSoonText} showButton={true} />
      ) : (
        <div className="presuervey mt-1 container" id="start">
          <Col>
            <div className=" justify-content-center">
              <div className="aside p-4">
              {/* <h4 className="m-2" 
        style={{ position: 'sticky', top: '70px', zIndex: 1000, padding: '10px',backgroundColor: 'white', display: 'inline-block' , color: '#fe9f43',fontSize:"14px" }}
        >Idea Submission
        </h4> */}
                <CardBody>
                  <Form className="form-row row" isSubmitting>
                 
                    {formData?.verified_status !== null && (
                      <>
                        {formData?.verified_status === "REJECTED" ? (
                          <div className="d-md-flex justify-content-end px-4">
                            <Card className="p-3 card-bg-warning">
                              <h5 className="text-white p-1">
                              {t("idea_page.modified")} : {formData?.initiated_name}{" "}
                              </h5>
                              <h5 className="text-white p-1">
                              {t("idea_page.date")} :{" "}
                                {moment(formData?.verified_at).format(
                                  "DD-MM-YYYY"
                                )}{" "}
                              </h5>
                              <h5 className="text-white p-1">
                              {t("idea_page.reject")} :{" "}
                                {formData?.mentor_rejected_reason}{" "}
                              </h5>
                            </Card>
                          </div>
                        ) : (
                          ""
                        )}
                      </>
                    )}

                    {formData?.status === "SUBMITTED" && (
                      <div className="d-md-flex justify-content-end px-4">
                        <Card className="p-3 card-bg-info">
                          <h5 className="text-white p-1">
                            {t("student_course.idea_submission_msg1")}
                            {formData?.status === "DRAFT"
                              ? t("student_course.idea_status1")
                              : t("student_course.idea_status2")}
                            {formData?.initiated_by !==
                              currentUser?.data[0]?.user_id &&
                              t("student_course.idea_submission_msg2")}
                            {formData?.initiated_name}
                            {formData?.status === "DRAFT"
                              ? moment(formData?.created_at).format(
                                  "DD-MM-YYYY H:I A"
                                )
                              : formData?.submitted_at
                              ? " On " +
                                moment(formData?.submitted_at).format(
                                  "DD-MM-YYYY HH:MM A"
                                )
                              : ""}
                          </h5>
                          <h5 className="text-white p-1">
                          {t("idea_page.review")}  :
                            {formData?.verified_status === null ||
                            formData?.verified_status === ""
                              ? " Yet to be Reviewed"
                              : formData?.verified_status === "ACCEPTED"
                              ? ` Accepted on ${moment(
                                  formData?.verified_at
                                ).format("DD-MM-YYYY HH:MM A")}`
                              : formData?.verified_status === "REJECTED"
                              ? ` Rejected on ${moment(
                                  formData?.verified_at
                                ).format("DD-MM-YYYY HH:MM A")} - Reason: ${
                                  formData?.mentor_rejected_reason
                                }`
                              : moment(formData?.verified_at).format(
                                  "DD-MM-YYYY HH:MM A"
                                )}
                          </h5>
                        </Card>
                      </div>
                    )}
                    {/* <div className="text-right">
                                                        { (
                                                            <>
                                                                <Button
                                                                    type="button"
                                                                    btnClass="me-3 btn btn-info"
                                                                    onClick={
                                                                        handleEdit
                                                                    }
                                                                    size="small"
                                                                    label={t(
                                                                        'teacher_teams.edit_idea'
                                                                    )}
                                                                    style={{ marginRight: '1rem' }}
                                                                />
                                                                <Button
                                                    type="button"
                                                    btnClass="primary"
                                                    onClick={(e) =>
                                                        handleSubmit(
                                                            e,
                                                            'SUBMITTED'
                                                        )
                                                    }
                                                    size="small"
                                                    label={t(
                                                        'teacher_teams.submit'
                                                    )}
                                                />
                                                            </>)}
                                                      
                                                    </div> */}
                                                   
                    <div className="text-right">
                      {!isDisabled && (
                        <Button
                          type="button"
                          btnClass="me-3 btn btn-warning"
                          // backgroundColor="#067DE1"
                          onClick={(e) => handleSubmit(e, "DRAFT")}
                          size="small"
                          label={`${
                            loading.draft
                              ? t("teacher_teams.loading")
                              : t("teacher_teams.draft")
                          }`}
                          disabled={!enableSaveBtn}
                        />
                      )}
                      {
                        //         initiatedBy &&
                        // initiatedBy ===
                        //     currentUser?.data[0]
                        //         ?.user_id &&
                        formData.status !== "SUBMITTED" && isDisabled && (
                          <>
                            <Button
                              type="button"
                              btnClass="me-3 btn btn-info"
                              onClick={handleEdit}
                              size="small"
                              label={t("teacher_teams.edit_idea")}
                              style={{ marginRight: "1rem" }}
                            />
                            <Button
                              type="button"
                              btnClass="primary"
                              onClick={(e) => handleSubmit(e, "SUBMITTED")}
                              size="small"
                              label={t("teacher_teams.submit")}
                            />
                          </>
                        )
                      }
                    </div>
                    {currentSection === 1 && (
                      <div className="d-md-flex justify-content-end px-0">
                        <Row>
                          <Row>
                            <h5 className="py-2 text-warning text-uppercase">
                              {" "}
                              {t("home.section1")}:{" "}
                              {t("ideaform_questions.section1")}
                            </h5>
                          </Row>
                          <div className="card comment-card">
                            <div className="question quiz mb-0">
                              <b
                                style={{
                                  fontSize: "1rem",
                                }}
                              >
                                {t("ideaform_questions.themeq")}
                              </b>
                            </div>

                            <div className=" answers row flex-column p-4">
                              <select
                                className="form-control"
                                onChange={handleThemeChange}
                                disabled={isDisabled}
                                name="theme"
                                id="theme"
                              >
                                <option value={""}>
                                  Please select the Theme
                                </option>
                                {themesList.map((item, i) => (
                                  <option
                                    key={i}
                                    value={item}
                                    selected={item === theme}
                                  >
                                    {item}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="card comment-card">
                            <div className="question quiz mb-0">
                              <b
                                style={{
                                  fontSize: "1rem",
                                }}
                              >
                                {t("ideaform_questions.focusareaq")}
                              </b>
                            </div>
                            {theme === "Others" ? (
                              <div className=" answers row flex-column p-4">
                                <textarea
                                  disabled={isDisabled}
                                  placeholder={t("home.ideaFoc")}
                                  value={focusarea}
                                  maxLength={500}
                                  onChange={(e) => setFocusArea(e.target.value)}
                                  className="form-control"
                                />
                                <div className="text-end">
                                  {t("student_course.chars")} :
                                  {500 - (focusarea ? focusarea.length : 0)}
                                </div>
                              </div>
                            ) : (
                              <div className=" answers row flex-column p-4">
                                <select
                                  // onChange={(e) => setFocusArea(e.target.value)}
                                  className="form-control"
                                  onChange={handleFocusAreaChange}
                                  disabled={isDisabled}
                                  name="focusarea"
                                  id="focusarea"
                                >
                                  <option value={""}>
                                    Please select the Focus Area
                                  </option>
                                  {focus.map((item, i) => (
                                    <option
                                      key={i}
                                      value={item}
                                      selected={item === focusarea}
                                    >
                                      {item}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            )}
                          </div>
                          <div className="card comment-card">
                            <div className="question quiz mb-0">
                              <b
                                style={{
                                  fontSize: "1rem",
                                }}
                              >
                                {t("home.addLanguage")}
                              </b>
                            </div>

                            <div className=" answers row flex-column p-4">
                              <select
                                className="form-control"
                                onChange={handleLanguageChange}
                                disabled={isDisabled}
                                name="theme"
                                id="theme"
                              >
                                <option value={""}>
                                  Please select the Language
                                </option>
                                {languageOptions.map((item, i) => (
                                  <option
                                    key={i}
                                    value={item}
                                    selected={item === language}
                                  >
                                    {item}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="card comment-card">
                            <div className="question quiz mb-0">
                              <b
                                style={{
                                  fontSize: "1rem",
                                }}
                              >
                                {t("ideaform_questions.ideatitleq")}
                              </b>
                            </div>
                            <div className="answers row flex-column p-4">
                              <textarea
                                className="form-control"
                                disabled={isDisabled}
                                placeholder={t("home.ideatit")}
                                // {t("student_course.chars")}
                                value={title}
                                rows={4}
                                maxLength={500}
                                onChange={(e) => setTitle(e.target.value)}
                              />
                              <div className="text-end">
                                {t("student_course.chars")} :
                                {500 - (title ? title.length : 0)}
                              </div>
                            </div>
                          </div>
                          <div className="card comment-card">
                            <div className="question quiz mb-0">
                              <b
                                style={{
                                  fontSize: "1rem",
                                }}
                              >
                                {t("ideaform_questions.problemstatementq")}
                              </b>
                            </div>
                            <div className="answers row flex-column p-4">
                              <textarea
                                className="form-control"
                                disabled={isDisabled}
                                rows={6}
                                placeholder={t("home.ideaprob")}
                                value={problemStatement}
                                maxLength={1000}
                                onChange={(e) =>
                                  setProblemStatement(e.target.value)
                                }
                              />
                              <div className="text-end">
                                {t("student_course.chars")} :
                                {1000 -
                                  (problemStatement
                                    ? problemStatement.length
                                    : 0)}
                              </div>
                            </div>
                          </div>
                          <div className="card comment-card">
                            <div className="question quiz mb-0">
                              <b
                                style={{
                                  fontSize: "1rem",
                                }}
                              >
                                {t("ideaform_questions.causesq")}
                              </b>
                            </div>
                            <div className="answers row flex-column p-4">
                              <textarea
                                className="form-control"
                                disabled={isDisabled}
                                placeholder={t("home.ideaList")}
                                rows={4}
                                value={causes}
                                maxLength={500}
                                onChange={(e) => setCauses(e.target.value)}
                              />
                              <div className="text-end">
                                {t("student_course.chars")} :
                                {500 - (causes ? causes.length : 0)}
                              </div>
                            </div>
                          </div>
                          <div className="card comment-card">
                            <div className="question quiz mb-0">
                              <b
                                style={{
                                  fontSize: "1rem",
                                }}
                              >
                                {t("ideaform_questions.effectsq")}
                              </b>
                            </div>
                            <div className="answers row flex-column p-4">
                              <textarea
                                className="form-control"
                                disabled={isDisabled}
                                placeholder={t("home.ideaEff")}
                                value={effects}
                                rows={4}
                                maxLength={500}
                                onChange={(e) => setEffects(e.target.value)}
                              />
                              <div className="text-end">
                                {t("student_course.chars")} :
                                {500 - (effects ? effects.length : 0)}
                              </div>
                            </div>
                          </div>
                          <div className="card comment-card">
                            <div className="question quiz mb-0">
                              <b
                                style={{
                                  fontSize: "1rem",
                                }}
                              >
                                {t("ideaform_questions.communityq")}
                              </b>
                            </div>
                            <div className=" answers row flex-column">
                              <div>
                                {place.map((item,i) => (
                                  <div key={i}>
                                     <label
                                    style={{
                                      margin: "1rem",
                                      fontSize: "1rem",
                                    }}
                                  >
                                    <input
                                      type="radio"
                                      value={item.value}
                                      disabled={isDisabled}
                                      checked={item.value === community}
                                      onChange={(e) =>
                                        setCommunity(e.target.value)
                                      }
                                    />
                                   
                                      {item.label}
                                    </label>
                                  </div>
                                ))}
                                {/* {place.map((item, i) => (
                                  <>
                                    <label
                                      key={i}
                                      style={{
                                        margin: "1rem",
                                        fontSize: "1rem",
                                      }}
                                    >
                                      <input
                                        type="radio"
                                        value={item}
                                        disabled={isDisabled}
                                        checked={item === community}
                                        onChange={(e) =>
                                          setCommunity(e.target.value)
                                        }
                                      />{" "}
                                      {item}
                                    </label>
                                    <br />
                                  </>
                                ))} */}
                              </div>
                            </div>
                          </div>
                          <div className="card comment-card">
                            <div className="question quiz mb-0">
                              <b
                                style={{
                                  fontSize: "1rem",
                                }}
                              >
                                {t("ideaform_questions.facingq")}
                              </b>
                            </div>
                            <div className=" answers row flex-column p-4">
                              <textarea
                                className="form-control"
                                disabled={isDisabled}
                                placeholder={t("home.ideafacing")}
                                value={facing}
                                rows={4}
                                maxLength={500}
                                onChange={(e) => setFacing(e.target.value)}
                              />
                              <div className="text-end">
                                {t("student_course.chars")} :
                                {500 - (facing ? facing.length : 0)}
                              </div>
                            </div>
                          </div>
                          <div>
                            <Col className="d-flex justify-content-end">
                              <button
                                className="btn btn-secondary"
                                onClick={goToNext}
                              >
                                {/* {t("student_course.chars")} */}
                                {/* NEXT */}
                                {t("idea_page.next")}
                              </button>
                            </Col>
                          </div>
                        </Row>
                      </div>
                    )}

                    {currentSection === 2 && (
                      <div className="d-md-flex justify-content-end px-0">
                        <Row>
                          <Row>
                            <h5 className="py-2 text-warning text-uppercase">
                              {t("home.section2")}:{" "}
                              {t("ideaform_questions.section2")}
                            </h5>
                          </Row>
                          <div className="card comment-card">
                            <div className="question quiz mb-0">
                              <b
                                style={{
                                  fontSize: "1rem",
                                }}
                              >
                                {t("ideaform_questions.solutiondetailsq")}
                              </b>
                            </div>
                            <div className="answers row flex-column p-4">
                              <textarea
                                className="form-control"
                                disabled={isDisabled}
                                placeholder={t("home.ideaSol")}
                                value={solution}
                                rows={6}
                                maxLength={1000}
                                onChange={(e) => setSolution(e.target.value)}
                              />
                              <div className="text-end">
                                {t("student_course.chars")} :
                                {1000 - (solution ? solution.length : 0)}
                              </div>
                            </div>
                          </div>
                          <div className="card comment-card">
                            <div className="question quiz mb-0 p-4">
                              <b
                                style={{
                                  fontSize: "1rem",
                                }}
                              >
                                {t("ideaform_questions.stakeholdersq")}
                              </b>
                            </div>
                            <div className=" answers row flex-column">
                              {/* <div>
                                {people.map((item, i) => (
                                  <>
                                    <label
                                      key={i}
                                      style={{
                                        margin: "1rem",
                                        fontSize: "1rem",
                                      }}
                                    >
                                      <input
                                        type="radio"
                                        value={item}
                                        disabled={isDisabled}
                                        checked={item === stakeholders}
                                        onChange={(e) =>
                                          setStakeholders(e.target.value)
                                        }
                                      />{" "}
                                      {item}
                                    </label>
                                    <br />
                                  </>
                                ))}
                              </div> */}
                              <div>
                                {people.map((item,i) => (
                                  <div key={i}>
                                     <label
                                    style={{
                                      margin: "1rem",
                                      fontSize: "1rem",
                                    }}
                                  >
                                    <input
                                      type="radio"
                                      value={item.value}
                                      disabled={isDisabled}
                                      checked={item.value === stakeholders}
                                      onChange={(e) =>
                                        setStakeholders(e.target.value)
                                      }
                                    />
                                   
                                      {item.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="card comment-card">
                            <div className="question quiz mb-0">
                              <b
                                style={{
                                  fontSize: "1rem",
                                }}
                              >
                                {t("ideaform_questions.probsoljourneyq")}
                              </b>
                            </div>
                            <div className=" answers row flex-column">
                              {/* <div>
                                {journey.map((item, i) => (
                                  <>
                                    <label
                                      key={i}
                                      style={{
                                        margin: "1rem",
                                        fontSize: "1rem",
                                      }}
                                    >
                                      <input
                                        type="checkbox"
                                        value={item}
                                        checked={
                                          Array.isArray(problemSolving) &&
                                          problemSolving.includes(item)
                                        }
                                        // checked={problemSolving.includes(item)}
                                        disabled={isDisabled}
                                        // checked={
                                        //     item ===
                                        //     problemSolving
                                        // }
                                        onChange={() =>
                                          handleCheckboxChange(item)
                                        }
                                      />{" "}
                                      {item}
                                    </label>
                                    <br />
                                  </>
                                ))}
                              </div> */}
                              <div>
                                {journey.map((item, i) => (
                                  <div key={i}>
                                    <label
                                      style={{
                                        margin: "1rem",
                                        fontSize: "1rem",
                                      }}
                                    >
                                      <input
                                        type="checkbox"
                                        value={item.value} 
                                        checked={
                                          Array.isArray(problemSolving) &&
                                          problemSolving.includes(item.value)
                                        }
                                        disabled={isDisabled}
                                        onChange={() =>
                                          handleCheckboxChange(item.value)
                                        } 
                                      />{" "}
                                      {item.label}
                                    </label>
                                    <br />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="card comment-card">
                            <div className="question quiz mb-0">
                              <b
                                style={{
                                  fontSize: "1rem",
                                }}
                              >
                                {t("ideaform_questions.feedbackq")}
                              </b>
                            </div>
                            <div className=" answers row flex-column p-4">
                              <textarea
                                className="form-control"
                                disabled={isDisabled}
                                rows={6}
                                placeholder={t("home.ideaFee")}
                                value={feedback}
                                maxLength={500}
                                onChange={(e) => setFeedback(e.target.value)}
                              />
                              <div className="text-end">
                                {t("student_course.chars")} :
                                {500 - (feedback ? feedback.length : 0)}
                              </div>
                            </div>
                          </div>
                          <Row>
                            <Col className="d-flex justify-content-start">
                              <button
                                className="btn btn-info"
                                onClick={goToBack}
                              >
                                {/* {t("student_course.chars")} */}
                                {/* BACK */}
                                {t("idea_page.back")}
                              </button>
                            </Col>
                            <Col className="d-flex justify-content-end">
                              <button
                                className="btn btn-secondary"
                                onClick={goToNext}
                              >
                                {t("idea_page.next")}
                                {/* NEXT */}
                              </button>
                            </Col>
                          </Row>
                        </Row>
                      </div>
                    )}
                    {currentSection === 3 && (
                      <div className="d-md-flex justify-content-end px-0">
                        <Row>
                          <Row>
                            <h5 className="py-2 text-warning text-uppercase">
                              {t("home.section3")}:{" "}
                              {t("ideaform_questions.section3")}
                            </h5>
                          </Row>
                          <div className="card comment-card">
                            <div className="question quiz mb-0">
                              <b
                                style={{
                                  fontSize: "1rem",
                                }}
                              >
                                {t("ideaform_questions.uploadq")}
                              </b>
                            </div>
                            <div>
                            <b
                                style={{
                                  fontSize: "1rem",
                                }}
                              >
                                {t("ideaform_questions.image")}
                              </b>
                            <div className=" answers row flex-column p-4 pb-0">
                              {/* <FormGroup check className="answers"> */}
                              <div className="wrapper my-1 common-flex">
                               
                                {!isDisabled && (
                                  <Button
                                    label={t("home.ideaFi")}
                                    // btnClass="primary"
                                    btnClass={`${
                                      isDisabled ? "secondary" : "primary"
                                    } me-3 pointer `}
                                    size="small"
                                    onClick={() => {
                                      document.getElementById("file").click();
                                    }}
                                  />
                                )}
                                <input
                                  type="file"
                                  name="file"
                                  className="form-control"
                                  id="file"
                                  style={{
                                    display: "none",
                                  }}
                                  disabled={isDisabled}
                                  accept="image/jpeg,image/jpg,image/png,application/pdf"
                                  multiple
                                  // className="hidden"
                                  // style='display: none'
                                  onChange={(e) => fileHandler(e)}
                                />
                              </div>
                              {/* </FormGroup> */}
                              <div className="mx-4">
                              {isDisabled && prototypeImage.length < 1 ? (
      <p className="text-danger">
         {t("ideaform_questions.filetext")}
      </p>
    ):null}
                                {immediateLink &&
                                  immediateLink.length > 0 &&
                                  immediateLink.map((item, i) => (
                                    <LinkComponent
                                      item={item}
                                      url={true}
                                      key={i}
                                    />
                                  ))}
                                {!immediateLink &&
                                  files.length > 0 &&
                                  files.map((item, i) => (
                                    <LinkComponent
                                      original={true}
                                      item={item}
                                      i={i}
                                      key={i}
                                      removeFileHandler={removeFileHandler}
                                    />
                                  ))}

                                {!immediateLink &&
                                  files.length === 0 &&
                                  Array.isArray(prototypeImage) &&
                                  prototypeImage.map((item, i) => (
                                    <LinkComponent
                                      item={item}
                                      url={true}
                                      key={i}
                                    />
                                  ))}
                              </div>
                            </div>
                            </div>
                            <div className="m-3">
                            <b
                                style={{
                                  fontSize: "1rem",
                                }}
                              >
                                {t("ideaform_questions.link")} {t("ideaform_questions.linkadd")}
                              </b>
                            <div className="answers row flex-column p-3 pt-2">
                            <div className="row g-0 align-items-center">
                            <div className="col-10 pe-3">
                              <textarea
                                className="form-control"
                                disabled={isDisabled}
                                placeholder={t("home.ideaUp")}
                                value={prototypeLink}
                                
                                maxLength={300}
                                // onChange={(e) =>
                                //   setPrototypeLink(e.target.value)
                                // }
                                onChange={handleInputChange}
                                style={{ height: "150px"}} 
                              />
                              <div className="text-end">
                                {t("student_course.chars")} :
                                {300 -
                                  (prototypeLink ? prototypeLink.length : 0)}
                              </div>
                              {prototypeLink && !isButtonDisabled && (
    <div className="text-warning mt-2">
      Please click <strong>Verify & Upload</strong> to validate and Upload your URL.
    </div>
  )}
                            </div>
                            <div className="col-2 d-flex align-items-center pe-3">
                            <button
                              className="btn btn-info "
                              onClick={handleVerify}
                              disabled={isDisabled || isButtonDisabled || !prototypeLink}
                            >
                              {/* Verify */}
                              {t("idea_page.verify")}
                              {/* BACK */}
                            </button>
    </div>
                            </div>
                            </div>

                            </div>
                            <b
                                style={{
                                  fontSize: "1rem",
                                }}
                              >
                                {t("ideaform_questions.note")}
                              </b>
                          </div>
                          <div className="card comment-card">
                            <div className="question quiz mb-0">
                              <b
                                style={{
                                  fontSize: "1rem",
                                }}
                              >
                                {t("ideaform_questions.workbookq")}
                              </b>
                            </div>
                            <div className=" answers row flex-column">
                            
                              <div>
                                {submit.map((item,i) => (
                                  <div key={i}>
                                  <label
                                    style={{
                                      margin: "1rem",
                                      fontSize: "1rem",
                                    }}
                                  >
                                    <input
                                      type="radio"
                                      value={item.value}
                                      disabled={isDisabled}
                                      checked={item.value === workbook}
                                      onChange={(e) =>
                                        setWorkbook(e.target.value)
                                      }
                                    />
                                      {item.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="d-flex justify-content-start">
                            <button
                              className="btn btn-info "
                              onClick={goToBack}
                            >
                              {t("idea_page.back")}
                              {/* BACK */}
                            </button>
                          </div>
                        </Row>
                      </div>
                    )}
                  </Form>
                  {/* <div className="d-flex justify-content-start">
                    {!isDisabled && (
                      <Button
                        type="button"
                        btnClass="me-3 btn btn-warning"
                        // backgroundColor="#067DE1"
                        onClick={(e) => handleSubmit(e, "DRAFT")}
                        size="small"
                        label={`${loading.draft
                          ? t("teacher_teams.loading")
                          : t("teacher_teams.draft")
                          }`}
                        disabled={!enableSaveBtn}
                      />
                    )}
                  </div> */}
                </CardBody>
              </div>
            </div>
          </Col>
        </div>
      )}
      {/* </div> */}
    </>
  );
};

export default IdeasPageNew;
