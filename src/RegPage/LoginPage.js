/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React from "react";
import ImageWithBasePath from "../core/img/imagewithbasebath";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/new-logo.png";
import { Row } from "reactstrap";
import { ArrowRight } from "feather-icons-react";
const LoginPage = () => {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className="main-wrapper">
      <div className="account-content">
        <div className="login-wrapper forgot-pass-wrap bg-img">
          <div className="login-content">
            <form action="index">
              <div className="login-userset">
                <div className="login-logo logo-normal" onClick={handleLogoClick}>
                  <img src={logo} alt="Logo" />
                </div>
               
                <div className="login-userheading text-center">
                  <h3> School Innovation Marathon</h3>
                  <h4>Login As ?</h4>
                </div>
                <div className="form-login mb-3">
                  <div className="form-addons text-center">
                  <Row>
                      <Row>
                        <button
                          type="button"
                          className="btn btn-warning m-2"
                          onClick={() => navigate("/teacher")}
                        >
                          Teacher Login
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
                          onClick={() => navigate("/team")}
                        >
                          Student Team Login
                          <span>
                            {" "}
                            <ArrowRight />
                          </span>
                        </button>
                      </Row>
                    </Row>
                  </div>
                </div>
                <div className="signinform text-center">
                  <h4>
                    Not Yet Registered ?
                    <Link className="hover-a" to={"/registration"}>
                      {" "}
                      Register Here
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

export default LoginPage;
