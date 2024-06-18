/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React from "react";
import ImageWithBasePath from "../core/img/imagewithbasebath";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";
const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="main-wrapper">
      <div className="account-content">
        <div className="login-wrapper bg-img">
          <div className="login-content">
            <form action="index">
              <div className="login-userset">
                <div className="login-logo logo-normal">
                  <img src={logo} alt="Logo" />
                  {/* <ImageWithBasePath src="assets/img/logo.png" alt="img" /> */}
                </div>
                {/* <Link className="login-logo logo-white">
                  <ImageWithBasePath src="assets/img/logo-white.png" alt />
                </Link> */}
                <div className="login-userheading text-center">
                  <h3> School Innovation Marathon</h3>
                  <h4>
                    Login As ?
                  </h4>
                </div>
                <div className="form-login mb-3">
                  <div className="form-addons text-center">
                    <button
                      type="button"
                      className="btn btn-warning m-2"
                      onClick={() => navigate("/teacher")}
                    >
                      Teacher
                    </button>

                    <button
                      type="button"
                      className="btn btn-warning m-2"
                      onClick={() => navigate("/")}
                    >
                      Student Team
                    </button>
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
