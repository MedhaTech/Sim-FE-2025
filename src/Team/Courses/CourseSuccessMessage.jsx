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

const CourseSuccessMessage = () => {
  const { t } = useTranslation();
  // const history = useHistory();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = getCurrentUser("current_user");
  const language = useSelector(
    (state) => state?.studentRegistration?.studentLanguage
  );

  const handleClick = (type) => {
    dispatch(
      getStudentDashboardStatus(currentUser?.data[0]?.user_id, language)
    );
    setTimeout(() => {
      type ? navigate("/instructions") : navigate("/idea");
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
            <Button
              label={t("student_course.go_idea_submission")}
              btnClass="primary mt-4 mx-4"
              className="btn btn-warning"
              size="small"
            // onClick={() => handleClick(true)}
            />
            {/* {t("student_course.go_idea_submission")}
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSuccessMessage;
