/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState } from "react";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

import signuplogo from "../assets/media/UPSHIFT_BLACK.png";
import image_1 from "../assets/media/unisolve_slider1.png";
import image_2 from "../assets/media/aim_Slider.png";
import { Carousel } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Button } from "../stories/Button";

import { useHistory } from "react-router-dom";
import { isDisabled } from "@testing-library/user-event/dist/utils";

function RegisterNew() {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <div
      className="container-fluid align-items center"
      style={{ margin: "2rem", padding: "2rem" }}
    >
      <Row className="row-flex  ">
        <Col xs={12} sm={12} md={12} xl={6}>
          <div className="row">
            <a href={process.env.REACT_APP_LANDING_PAGE_URL}>
              <Col md={12} className="mr-auto text-center">
                <h2 className="text-white">
                  <img
                    style={{ margin: "1rem" }}
                    src={signuplogo}
                    alt="Signup logo"
                    className="img-fluid w-50"
                  />
                </h2>
              </Col>
            </a>
          </div>

          <Row className=" mb-4 mt-4 text-center p-5">
            <h4 className="mb-4" style={{ margin: "2rem" }}>
              <span className="color-black">TEACHER REGISTRATION</span>
            </h4>
          </Row>
          <Row className=" mb-4 mt-4 text-center">
            <h3 className="mb-4">
              <span
                className="color-blue text-center "
                style={{ margin: "2rem" }}
              >
                Register As ?
              </span>
            </h3>
          </Row>

          <Row className="mt-5">
            <Col md={12}>
              <div className="form-row row mb-5">
                <Col className="form-row row mb-5">
                  <Col className="form-group" xs={12} sm={12} md={12} xl={12}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Button
                        label={"ATL School"}
                        btnClass="primary tex-center my-0 py-0 mx-3 px-3 "
                        style={{
                          borderRadius: "0px",
                          margin: "0.5rem",
                          height: "45px",
                        }}
                        size="small"
                        onClick={() => history.push("/atl-register")}
                      />
                      <div style={{ width: "10px" }} />{" "}
                      <Button
                        btnClass="primary tex-center my-0 py-0 mx-3 px-3"
                        style={{
                          borderRadius: "0px",
                          margin: "0.5rem",
                          height: "45px",
                        }}
                        label={"NON-ATL School"}
                        size="small"
                        onClick={() => history.push("/register/non-atl")}
                      />
                    </div>

                    <div className="form-row row mb-5 mt-5 text-center">
                      <p>
                        {" "}
                        Already a member ?
                        <Link
                          to={"/teacher"}
                          exact
                          className=" m-3 text-center"
                          style={{
                            color: "blue",
                            margin: "20px",
                          }}
                        >
                          Login Here
                        </Link>
                      </p>
                    </div>
                    <div className="form-row row mb-5 mt-5 text-left">
                      <p>
                        {" "}
                        <span style={{ color: "red" }}>Note : &nbsp;</span>
                        Kindly note that only one teacher per school can
                        register here. Additional teachers guiding teams can be
                        mentioned as mentors while creating student teams.
                      </p>
                    </div>
                  </Col>
                </Col>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default RegisterNew;
