/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ImageWithBasePath from "../core/img/imagewithbasebath";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Bold } from "react-feather";
import success from "../assets/img/chek.png";
import logo from "../assets/img/new-logo.png";
import { encryptGlobal } from "../constants/encryptDecrypt";
import axios from "axios";
const NonAtlSuccess = () => {
  const navigate = useNavigate();
  const mentorDaTa = JSON.parse(localStorage.getItem("mentorData"));
   const [whatsappLink, setWhatsappLink] = useState("");
  const orgDaTa = JSON.parse(localStorage.getItem("orgData"));
  const user = mentorDaTa.username;
  const myArray = user.split("@");
  const word = myArray[0];
  const handleLogoClick = () => {
    navigate("/");
  };
  const [hovered, setHovered] = useState(false);
  const [hovered1, setHovered1] = useState(false);
 const fetchwhatsapplink = () => {
      // Function to fetch the WhatsApp link from the API
      const statenameApi = encryptGlobal(
        JSON.stringify({
          state_name: orgDaTa?.state,
        })
      );
      var config = {
        method: "get",
        url:
          process.env.REACT_APP_API_BASE_URL +
          `/dashboard/whatappLink?Data=${statenameApi}`,
        headers: {
          "Content-Type": "application/json",
          // Accept: "application/json",
          Authorization: "O10ZPA0jZS38wP7cO9EhI3jaDf24WmKX62nWw870",
        },
      };
      axios(config)
        .then(function (response) {
          if (response.status === 200) {
            const responseData = response?.data?.data?.[0];
        const link = responseData?.whatapp_link;
        setWhatsappLink(link);
        
        setTimeout(()=>{
          if (link && typeof link === "string") {
            window.open(link, '_blank');
          } else {
            console.error("Invalid or missing WhatsApp link");
            alert("WhatsApp link not found. Please try again later.");
          }
        },1000);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  return (
    <div className="main-wrapper">
      <div className="login-wrapper register-wrap bg-img">
        <div className="login-content">
          <div className="login-userset">
            <div className="login-logo logo-normal" onClick={handleLogoClick}>
              <img src={success} alt="Success" />
            </div>

            <div className="login-userheading">
              <div className="text-center">
                <h3 style={{ color: "DarkGreen" }}> Congratulations...</h3>

                <h4 className="mb-3">
                  {" "}
                  You have successfully registered for SIM 2025
                </h4>
                <h4 style={{ color: "black" }}>
                  <b>Teacher Login ID : </b>{" "}
                  <b style={{ color: "blue" }}>{mentorDaTa.username}</b>{" "}
                  <b>Password :</b> <b style={{ color: "blue" }}>{word}</b>
                </h4>
              </div>
              To ensure active participation and receive timely updates, joining
              the{" "}
              <Link
                style={{
                  color: hovered ? "green" : "black",
                  fontWeight: "bold",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                // to={"/login"}
                onClick={fetchwhatsapplink}
              >
                {" "}
                WhatsApp group
              </Link>{" "}
              is mandatory.
              <Container
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "20px",
                }}
              >
                <Row className="justify-content-center">
                  <Col
                    className="hover-a  col-md-6 col-sm-12"
                    style={{
                      // width: "50%",
                      border: "1px solid #ccc",
                      padding: "20px",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      borderRadius: "8px",
                      backgroundColor: "#f9f9f9",
                      // margin: "0 10px",
                    }}
                  >
                    <h4 className="mb-3 text-center">
                      <b>School Info</b>
                    </h4>
                    <p style={{ color: "#404040" }}>
                      UDISE Code :{" "}
                      {orgDaTa.organization_code
                        ? orgDaTa.organization_code
                        : "-"}
                    </p>
                    <p style={{ color: "#404040" }}>State : {orgDaTa.state}</p>
                    <p style={{ color: "#404040" }}>
                      District : {orgDaTa.district}
                    </p>
                    <p style={{ color: "#404040" }}>
                    Mandal / Taluka : {orgDaTa.mandal}
                    </p>
                    <p style={{ color: "#404040" }}>
                      PinCode : {orgDaTa.pin_code} {mentorDaTa.pin_code}
                    </p>
                    <p style={{ color: "#404040" }}>
                      School Name : {orgDaTa.organization_name}
                    </p>
                    <p style={{ color: "#404040" }}>
                      School Type : {orgDaTa.school_type}
                    </p> <p style={{ color: "#404040" }}>
                      School Board : {orgDaTa.board}
                    </p>
                    
                  </Col>
                  <Col
                    className="hover-a  col-md-6 col-sm-12 "
                    style={{
                      // width: "50%",
                      border: "1px solid #ccc",
                      padding: "20px",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      borderRadius: "8px",
                      backgroundColor: "#f9f9f9",
                      // margin: "0 10px",
                    }}
                  >
                    <h4 className="mb-3 text-center ">
                      <b>Teacher Info</b>
                    </h4>
                    <p style={{ color: "#404040" }}>
                      Teacher : {mentorDaTa.title}. {mentorDaTa.full_name}
                    </p>
                    <p style={{ color: "#404040" }}>
                      Mobile No : {mentorDaTa.mobile}
                    </p>
                    <p style={{ color: "#404040" }}>
                      WhatsApp No : {mentorDaTa.whatapp_mobile}
                    </p>
                    <p style={{ color: "#404040" }}>
                      Gender : {mentorDaTa.gender}
                    </p>
                  </Col>
                </Row>
              </Container>
            </div>
            <div className="text-center">
              <h4 className="mb-3">Take a screenshot for future reference.</h4>
              Please make sure you’ve joined the{" "}
              <Link
                style={{
                  color: hovered1 ? "green" : "black",
                  fontWeight: "bold",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={() => setHovered1(true)}
                onMouseLeave={() => setHovered1(false)}
                // to={"/login"}
                onClick={fetchwhatsapplink}
              >
                {" "}
                WhatsApp group
              </Link>{" "}
              at the earliest to stay informed and engaged.
              <br />
              <div className="signinform">
                <h4>
                  Click here to ?
                  <Link className="hover-a" to={"/teacher"}>
                    {" "}
                    Login
                  </Link>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NonAtlSuccess;
