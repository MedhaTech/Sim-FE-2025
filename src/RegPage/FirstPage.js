/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React from "react";
import ImageWithBasePath from "../core/img/imagewithbasebath";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/new-logo.png";
import { Row } from "reactstrap";
import { ArrowRight } from "feather-icons-react";
const FirstPage = () => {
  const navigate = useNavigate();

  return (
    <div className="main-wrapper">
      <div className="account-content">
        <div className="login-wrapper register-wrap bg-img">
          <div className="login-content">
            <form action="index">
              <div className="login-userset">
                <div className="login-logo logo-normal">
                  <img src={logo} alt="Logo" />
                </div>
               
                <div className="login-userheading text-center">
                  <h3> School Registration</h3>
                  <h4>Select your school type</h4>
                </div>
                <div className="form-login mb-3">
                  <div className="form-addons text-center">
                    <Row>
                      <Row>
                        <button
                          type="button"
                          className="btn btn-warning m-2"
                          onClick={() => navigate("/atl-register")}
                        >
                          ATL School
                          <span>
                            {" "}
                            <ArrowRight />
                          </span>
                        </button>
                      
                      </Row>
                      <Row>
                        <button
                          type="button"
                          className="btn btn-warning m-2"
                          onClick={() => navigate("/non-atl-register")}
                        >
                          Non-ATL School
                          <span>
                            {" "}
                            <ArrowRight />
                          </span>
                        </button>
                       
                      </Row>
                    </Row>
                  </div>
                </div>
                <div className="signinform">
                  <h4 className="text-center">
                    You Already Registered ?
                    <Link className="hover-a" to={"/login"}>
                      {" "}
                      Login Here
                    </Link>
                  </h4>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstPage;
