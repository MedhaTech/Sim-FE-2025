/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React from "react";
import ImageWithBasePath from "../core/img/imagewithbasebath";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AtlSucess = () => {
  const navigate = useNavigate();
  const mentorDaTa = JSON.parse(localStorage.getItem("mentorData"));
  const orgDaTa = JSON.parse(localStorage.getItem("orgData"));
  const user = mentorDaTa.username;
  const myArray = user.split("@");
  const word = myArray;
  return (
    <div className="main-wrapper">
      <div className="login-wrapper bg-img">
        <div className="login-content">
          <div className="login-userset">
            <div className="login-logo logo-normal">
              <ImageWithBasePath src="assets/img/logo.png" alt="img" />
            </div>

            <div className="login-userheading ">
              <h3 style={{ color: "DarkGreen" }}> Congratulations.....</h3>

              <h4 className="mb-3"> You have successfully registered.</h4>
              <p
                style={{
                  color: "#404040",
                }}
              >
                UDISE Code :{" "}
                {orgDaTa.organization_code ? orgDaTa.organization_code : "-"}
              </p>
              <p
                style={{
                  color: "#404040",
                }}
              >
                School Name: {orgDaTa.organization_name}
              </p>
              <p
                style={{
                  color: "#404040",
                }}
              >
                District: {orgDaTa.district}
              </p>
              <p
                style={{
                  color: "#404040",
                }}
              >
                State: {orgDaTa.state}
              </p>
              <p
                style={{
                  color: "#404040",
                }}
              >
                Pin Code: {orgDaTa.pin_code}. {mentorDaTa.pin_code}
              </p>
              <p
                style={{
                  color: "#404040",
                }}
              >
                Faculty Name: {mentorDaTa.title}. {mentorDaTa.full_name}
              </p>
              <p
                style={{
                  color: "#404040",
                }}
              >
                Login ID: {mentorDaTa.username}
              </p>
              <p
                style={{
                  color: "#404040",
                }}
              >
                Password: {word}
              </p>
              <p
                style={{
                  color: "#404040",
                }}
              >
                Mobile Number: {mentorDaTa.mobile}
              </p>
              <p
                style={{
                  color: "#404040",
                }}
              >
                Whatsapp Number: {mentorDaTa.whatapp_mobile}
              </p>

              <p
                style={{
                  color: "#404040",
                }}
              >
                Gender: {mentorDaTa.gender}
              </p>
              <p
                style={{
                  color: "black",
                  marginBottom: "2rem",
                }}
              >
                Take a screenshot for future reference.
              </p>
            </div>

            <div className="signinform">
              <h4>
                You Already Registered ?
                <Link className="hover-a" to={"/teacher"}>
                  {" "}
                  Click Here
                </Link>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtlSucess;
