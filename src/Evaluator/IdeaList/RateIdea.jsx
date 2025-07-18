/* eslint-disable indent */
import React from "react";
import { Button } from "../../stories/Button";
import NumberScale from "./NumberScale";
import axios from "axios";
import { getCurrentUser, openNotificationWithIcon } from "../../helpers/Utils";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useDispatch } from "react-redux";
import { getSubmittedIdeaList } from "../store/evaluator/action";

const RateIdea = (props) => {
  const currentUser = getCurrentUser("current_user");
  const dispatch = useDispatch();
  const ratingParams = [
    "novelty",
    "usefulness",
    "feasability",
    "scalability",
    "sustainability",
  ];
  const [novelityScore, setNovelityScore] = React.useState(0);
  const [usefulnessScore, setUsefulnessScore] = React.useState(0);
  const [feasabilityScore, setFeasabilityScore] = React.useState(0);
  const [scalabilityScore, setScalabilityScore] = React.useState(0);
  const [sustainabilityScore, setSustainabilityScore] = React.useState(0);
  const [comments, setComments] = React.useState("");

  React.useEffect(() => {
    reset();
  }, [props]);
  const reset = () => {
    setNovelityScore(0);
    setUsefulnessScore(0);
    setFeasabilityScore(0);
    setScalabilityScore(0);
    setSustainabilityScore(0);
    setComments("");
  };

  const validate = () => {
    if (
      !ratingParams ||
      !novelityScore ||
      !usefulnessScore ||
      !feasabilityScore ||
      !scalabilityScore ||
      !sustainabilityScore
    ) {
      openNotificationWithIcon(
        "error",
        "Please rate this idea with all scale."
      );
    } else if (!comments) {
      openNotificationWithIcon("error", "Please add your comments");
    } else {
      handleAlert();
    }
  };

  // ------function to get Occurrence----
  const getOccurrence = (array, value) => {
    return array.filter((v) => v === value).length;
  };
  // ---------------------------------

  const handleSubmit = () => {
    // ------to get overal rating score----
    const scale = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let totalWeight = 0;
    let ratedPrams = [
      novelityScore,
      usefulnessScore,
      feasabilityScore,
      scalabilityScore,
      sustainabilityScore,
    ];
    scale?.forEach((item) => {
      totalWeight += getOccurrence(ratedPrams, item) * item;
    });
    let overAll = Number((totalWeight / 5)?.toFixed(1));
    // -------------------------
    let param = {
      evaluator_id: props?.evaluator_id,
      challenge_response_id: props?.challenge_response_id,
      level: props?.level,
      param_1: novelityScore,
      param_2: usefulnessScore,
      param_3: feasabilityScore,
      param_4: scalabilityScore,
      param_5: sustainabilityScore,
      overall: overAll,
      comments: comments,
    };
    const body = JSON.stringify({ ...param });
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_API_BASE_URL + "/evaluatorRating"}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.data[0]?.token}`,
      },
      data: body,
    };
    axios(config)
      .then(function (response) {
        openNotificationWithIcon(
          "success",
          response?.data?.message == "OK"
            ? "Idea processed successfully!"
            : response?.data?.message
        );
        setTimeout(() => {
          dispatch(getSubmittedIdeaList("L2"));
          props?.topRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      })
      .catch(function (error) {
        openNotificationWithIcon("error", error?.response?.data?.message);
      });
  };

  const handleAlert = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
      allowOutsideClick: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You are attempting to Rate this Idea",
        showCloseButton: true,
        confirmButtonText: "Confirm",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        reverseButtons: false,
      })
      .then((result) => {
        if (result.isConfirmed) {
          if (result.isConfirmed) {
            handleSubmit();
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire("Cancelled", "", "error");
        }
      });
  };

  return (
    <div className="rating_card mt-3 card p-md-4 p-4">
      <h4 className="mb-3">Evaluation Rating Scale:</h4>
      <div className="row mt-1 ps-4">
        {ratingParams?.map((item, index) => {
          return (
            <div className="col-12 mb-lg-4 mb-5 p-0" key={index}>
              <div className="">
                <label htmlFor="novelty" className="form-label text-capitalize">
                  <b style={{ fontSize: "1.2rem" }}>{item} score - </b>
                  <span
                    style={{ fontSize: "1.5rem" }}
                    className={
                      (item === "novelty"
                        ? novelityScore
                        : item === "usefulness"
                        ? usefulnessScore
                        : item === "feasability"
                        ? feasabilityScore
                        : item === "scalability"
                        ? scalabilityScore
                        : sustainabilityScore) == 0
                        ? "text-muted "
                        : "text-primary"
                    }
                  >
                    {item === "novelty"
                      ? novelityScore
                      : item === "usefulness"
                      ? usefulnessScore
                      : item === "feasability"
                      ? feasabilityScore
                      : item === "scalability"
                      ? scalabilityScore
                      : sustainabilityScore}
                  </span>
                </label>
                {item === "novelty" ? (
                  <NumberScale
                    name={item}
                    setScore={
                      item === "novelty"
                        ? setNovelityScore
                        : item === "usefulness"
                        ? setUsefulnessScore
                        : item === "feasability"
                        ? setFeasabilityScore
                        : item === "scalability"
                        ? setScalabilityScore
                        : setSustainabilityScore
                    }
                    text1={"Not Novel"}
                    text2={"Inspired"}
                    text3={"Novel & Original"}
                  />
                ) : item === "usefulness" ? (
                  <NumberScale
                    name={item}
                    setScore={
                      item === "novelty"
                        ? setNovelityScore
                        : item === "usefulness"
                        ? setUsefulnessScore
                        : item === "feasability"
                        ? setFeasabilityScore
                        : item === "scalability"
                        ? setScalabilityScore
                        : setSustainabilityScore
                    }
                    text1={"Does Not Solve"}
                    text2={"Useful but not effective"}
                    text3={"Solve Problem Effectively"}
                  />
                ) : item === "feasability" ? (
                  <NumberScale
                    name={item}
                    setScore={
                      item === "novelty"
                        ? setNovelityScore
                        : item === "usefulness"
                        ? setUsefulnessScore
                        : item === "feasability"
                        ? setFeasabilityScore
                        : item === "scalability"
                        ? setScalabilityScore
                        : setSustainabilityScore
                    }
                    text1={"Not Feasible/Out of Scope"}
                    text2={"Feasible but Difficult"}
                    text3={"Feasible, Resourceful & Simple"}
                  />
                ) : item === "scalability" ? (
                  <NumberScale
                    name={item}
                    setScore={
                      item === "novelty"
                        ? setNovelityScore
                        : item === "usefulness"
                        ? setUsefulnessScore
                        : item === "feasability"
                        ? setFeasabilityScore
                        : item === "scalability"
                        ? setScalabilityScore
                        : setSustainabilityScore
                    }
                    text1={"Not Scalable, No Impact"}
                    text2={"Scaleable, Impacts only a Few "}
                    text3={"Scaleable, Benefits Large Group"}
                  />
                ) : (
                  <NumberScale
                    name={item}
                    setScore={
                      item === "novelty"
                        ? setNovelityScore
                        : item === "usefulness"
                        ? setUsefulnessScore
                        : item === "feasability"
                        ? setFeasabilityScore
                        : item === "scalability"
                        ? setScalabilityScore
                        : setSustainabilityScore
                    }
                    text1={"Not Sustainable"}
                    text2={"Difficult to Sustain"}
                    text3={"Sustainable and Environment friendly"}
                  />
                )}
              </div>
            </div>
          );
        })}
        <div className="row">
          <div className="col-md-12 mb-md-6 mb-4 p-0">
            <h4 className="my-2">
              Please add comments/reason for your scoring{" "}
              <span required style={{ color: "red" }}>
                *
              </span>
            </h4>
            <div className="form-floating">
              <textarea
                className="form-control lh-sm"
                maxLength={250}
                placeholder="Leave a comment here"
                id="ComentTextarea"
                style={{ height: "10rem" }}
                value={comments}
                onChange={(e) => {
                  setComments(e.target.value);
                }}
              ></textarea>
            </div>
          </div>
        </div>
       
       

       

      </div>
       <div className="col-12 d-flex">
  <div className="d-flex justify-content-start w-50">
    <Button
      btnClass="primary"
      size="small"
      label="Submit"
      onClick={() => {
        validate();
      }}
    />
  </div>
  <div className="d-flex justify-content-end w-50">
    <Button
      btnClass="primary"
      size="small"
      label="Skip"
      onClick={() => {
        props?.handleSkip();
      }}
    />
  </div>
</div>
    </div>
  );
};

export default RateIdea;
