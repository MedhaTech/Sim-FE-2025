/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import Confetti from "react-confetti";
// import { useHistory } from "react-router-dom";
import ResultStar from "../../assets/img/quiz-result-star.png";
import { Button } from "../../stories/Button";
import succesImg from "../../assets/img/success1.jpeg";
import { useTranslation } from "react-i18next";
import { getStudentDashboardStatus } from "../../redux/studentRegistration/actions";
import { getCurrentUser } from "../../helpers/Utils";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState} from 'react';
import { encryptGlobal } from '../../constants/encryptDecrypt';
import axios from 'axios';

const CourseSuccessMessage = () => {
  const { t } = useTranslation();
  // const history = useHistory();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = getCurrentUser("current_user");
  const language = useSelector(
    (state) => state?.studentRegistration?.studentLanguage
  );
  const TeamId = currentUser?.data[0]?.team_id;
  const [initiate,setInitiate]=useState("");

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
            setInitiate(response.data.data[0].
              initiated_by);


          } 
        } 
      })
      .catch(function (error) {
        if (error.response.status === 404) {
        //   seterror4( true);
        } 

      });
  };
useEffect(() => {
    submittedApi();
}, []);
  const handleClick = () => {
    // alert("hii");
    // dispatch(
    //   getStudentDashboardStatus(currentUser?.data[0]?.user_id, language)
    // );
   
    setTimeout(() => {
      if (initiate === "" || initiate == null) {
        navigate("/instruction"); 
      } else {
        navigate("/idea"); 
      }
    }, 300); 
  };
  return (
    <div className="container new-result">
      <Confetti className="w-100" />
      <div className="row justify-content-md-center ">
        <div className="col col-lg-10">
          {/* <div className="results-heading"> */}

          {/* <img src={ResultStar} alt="star" /> */}
          {/* </div> */}
          <div className="congratulations text-center">
            <div className="success_img text-center w-100">
              <Confetti className="w-100" />
              <img src={succesImg} alt=".." />
              <br />
            </div>
            <h4 className="text-success">
              {t("student_course.course_completed_succ")}
            </h4>
            <h5>
              {t("student_course.continue_to_idea")}
            </h5>
          </div>
          <div className="d-sm-flex justify-content-center mb-3 text-center">
          {initiate === "" || initiate == null ?
          ( <Button
              label={t("student_course.go_idea_submission")}
              btnClass="primary mt-4 mx-4"
              className="btn btn-warning"
              size="small"
            onClick={handleClick}
            />)
            :
            ( <Button
              label={t("student_course.submission")}
              btnClass="primary mt-4 mx-4"
              className="btn btn-warning"
              size="small"
            onClick={handleClick}
            />)
          }
            {/* {t("student_course.go_idea_submission")}
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSuccessMessage;
