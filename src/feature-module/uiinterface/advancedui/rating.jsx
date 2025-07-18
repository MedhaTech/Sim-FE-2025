/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState } from "react";
import ReactStarsRating from "react-awesome-stars-rating";
import { RotateCcw } from "react-feather";

const Rating = () => {
  const [rating1, setRating1] = useState(0); 
  const [rating2, setRating2] = useState(0); 
  const [rating3, setRating3] = useState(0); 
  const [rating4, setRating4] = useState(0); 
  const [rating5, setRating5] = useState(0); 
  const [hoverCount, setHoverCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const handleRatingChange = (newRating) => {
    // Set loading to true when the star rating is clicked
    setIsLoading(true);

    // Simulate backend operation with setTimeout
    setTimeout(() => {
      // After a simulated delay, set loading back to false
      setIsLoading(false);

      // You can perform other actions here after the rating is submitted
      // console.log('Rating submitted:', newRating);
    }, 2000); // Simulated delay of 2000 milliseconds (2 seconds)
  };
  const handleStarHover = () => {
    
    setHoverCount((prevCount) => Math.min(prevCount + 1, 5));
  };
  const handleRatingChange1 = (newRating) => {
    setRating1(newRating);
  };
  const handleReset = () => {
    
    setRating3(0);
  };

  const handleRatingChange2 = (newRating) => {
    setRating2(newRating);
  };
  const handleRatingChange3 = (newRating) => {
    setRating3(newRating);
  };
  const handleRatingChange4 = (newRating) => {
    setRating4(newRating);
  };
  const handleRatingChange5 = (newRating) => {
    setRating5(newRating);
  };
  return (
    <div className="page-wrapper cardhead">
      <div className="content">
        {/* Page Header */}
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Rating</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">Dashboard</a>
                </li>
                <li className="breadcrumb-item active">Rating</li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          <div className="col-xxl-4 col-xl-6">
            <div className="card custom-card">
              <div className="card-header">
                <div className="card-title">Basic Rater</div>
              </div>
              <div className="card-body">
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                  <p className="fs-14 mb-0 fw-semibold">
                    Show Some <span className="text-danger">❤</span> with rating
                    :
                  </p>
                  {/* <div id="rater-basic" /> */}

                  <ReactStarsRating
                    value={rating2}
                    onChange={handleRatingChange2} 
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-4 col-xl-6">
            <div className="card custom-card">
              <div className="card-header">
                <div className="card-title">5 star rater with steps</div>
              </div>
              <div className="card-body">
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                  <p className="fs-14 mb-0 fw-semibold">
                    Dont forget to rate the product :
                  </p>
                  {/* <div id="rater-steps" /> */}
                  <ReactStarsRating
                    value={rating1}
                    onChange={handleRatingChange1}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-4 col-xl-12">
            <div className="card custom-card">
              <div className="card-header">
                <div className="card-title">Custom messages</div>
              </div>
              <div className="card-body">
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                  <p className="fs-14 mb-0 fw-semibold">
                    Your rating is much appreciated👏 :
                  </p>
                  {/* <div id="custom-messages" /> */}
                  <ReactStarsRating  value={rating5}
                    onChange={handleRatingChange5}/>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-6 col-xl-6">
            <div className="card custom-card">
              <div className="card-header">
                <div className="card-title">
                  Unlimited number of stars readOnly
                </div>
              </div>
              <div className="card-body">
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                  <p className="fs-14 mb-0 fw-semibold">Thanks for rating :</p>
                  {/* <div id="stars-unlimited" /> */}
                  <ReactStarsRating value={6} count={10} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-6 col-xl-6">
            <div className="card custom-card">
              <div className="card-header">
                <div className="card-title">
                  5 Star rater with custom isBusyText and simulated backend
                </div>
              </div>
              <div className="card-body">
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                  <p className="fs-14 mb-0 fw-semibold">Thanks for rating :</p>
                  {/* Conditionally render loading indicator */}
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <ReactStarsRating
                onChange={handleRatingChange} // Call handleRatingChange when rating changes
              />
            )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-4 col-xl-6">
            <div className="card custom-card">
              <div className="card-header">
                <div className="card-title">On hover event</div>
              </div>
              <div className="card-body">
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                  <p className="fs-14 mb-0 fw-semibold">
                    Please give your valuable rating :
                  </p>
                  <div
                    className="d-flex flex-wrap align-items-center"
                    onMouseOver={handleStarHover}
                    style={{ fontSize: "24px", cursor: "pointer" }}
                  >
                    {/* <div id="stars-hover" /> */}

                    <ReactStarsRating value={rating4}
                    onChange={handleRatingChange4}
                    
                    />

                    <span className="live-rating badge bg-success-transparent ms-3">
                      {hoverCount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-4 col-xl-6">
            <div className="card custom-card">
              <div className="card-header">
                <div className="card-title">Clear/reset rater</div>
              </div>
              <div className="card-body">
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                  <p className="fs-14 mb-0 fw-semibold">
                    Thank You so much for your support :
                  </p>
                  <div className="d-flex flex-wrap align-items-center">
                    {/* <div id="rater-reset" /> */}
                    <ReactStarsRating  value={rating3}
                    onChange={handleRatingChange3}/>

                    <button
                      className="btn btn-icon btn-sm btn-danger-light ms-3"
                      id="rater-reset-button"
                      data-bs-toggle="tooltip"
                      
                      data-bs-placement="top"
                      data-bs-title="Reset"
                      onClick={handleReset} 
                    >
                      <RotateCcw className="feather-16" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rating;
