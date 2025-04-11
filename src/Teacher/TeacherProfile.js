/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState ,useLayoutEffect,} from "react";
// import ImageWithBasePath from "../core/img/imagewithbasebath";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../helpers/Utils";
import edit from "../assets/img/icons/edit-set.svg";
// import customer from "../assets/img/customer/customer5.jpg";
import { useNavigate } from "react-router-dom";
import female from "../assets/img/Female_Profile.png";
import male from "../assets/img/Male_Profile.png";
import { useDispatch, useSelector } from 'react-redux';
import { getTeacherByID } from '../redux/actions';
import user from "../assets/img/user.png";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaPlay } from 'react-icons/fa';
import VideoModal from '../HelpVideo/VideoModal';
import { useTranslation } from "react-i18next";

import axios from "axios";
const TeacherProfile = () => {
   const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentUser = getCurrentUser("current_user");
  // console.log(currentUser,"currentuser");
  const { teacher } = useSelector((state) => state.teacher);
  // console.log(teacher,"11");
  const navigate = useNavigate();
  const [show , setShow] = useState(false);
  const [video , setVideo] = useState("");
const [data,setData]=useState({});
  const handleEdit = () => {
    navigate("/mentoreditprofile", {
      state: {
        full_name:currentUser?.data[0]?.full_name,
        mentor_id: currentUser?.data[0]?.mentor_id,
        // mobile: teacher?.mobile,
        username: currentUser?.data[0]?.name,
        title:currentUser?.data[0]?.title,
        gender: currentUser?.data[0]?.gender,
        whatapp_mobile: teacher?.whatapp_mobile,
        principal_email: teacher?.organization?.principal_email,
        principal_mobile : teacher?.organization?.principal_mobile,
        principal_name : teacher?.organization?.principal_name,
        organization_name : teacher?.organization?.organization_name,
        organization_id : teacher?.organization?.organization_id,
        organization_code : teacher?.organization?.organization_code,
        state:teacher?.organization?.state,
        district:teacher?.organization?.district,

        status :teacher?.status

      },
    });
  };
  useLayoutEffect(() => {
    if (currentUser?.data[0]?.mentor_id) {
        dispatch(getTeacherByID(currentUser?.data[0]?.mentor_id));
    }
}, [currentUser?.data[0]?.mentor_id]);

const renderTooltip = (props) => (
  <Tooltip id="pdf-tooltip" {...props} >
    Watch Demo
  </Tooltip>
);

const handleShow = () => {
  setVideo("https://www.youtube.com/embed/Go8alatAXhE?si=QUtgk5bWg3160RpS");
  setShow(true);
};

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>{t('teacherJourney.tectext')}
            {" "}
            <div className="action-table-data" style={{"display": "inline-block"}}>
                <div className="edit-delete-action">
                  <OverlayTrigger placement="top" overlay={renderTooltip}>
                    <Link
                        to="#"
                        className="me-2 p-2"
                        onClick={() => handleShow()}
                        {...(show ? { 'data-bs-toggle': 'modal', 'data-bs-target': '#add-units' } : {})}
                        
                    >
                      <FaPlay  style={{color:"red"}} />
                    </Link>
                  </OverlayTrigger>
                </div>
              </div>
            </h4>
            {/* <h6>User Profile</h6> */}
          </div>
          <div>
          <button onClick={() => handleEdit() }className={"btn btn-primary"}>
                        <img src={edit} alt="Edit" />
                      </button>
                        {/* <h4>Update Personal Details.</h4> */}
                      </div>
        </div>
        {/* /product list */}
        <div className="card">
          <div className="card-body">
            <div className="profile-set">
              <div className="profile-head"></div>
              <div className="profile-top">
                <div className="profile-content">
                  <div className="profile-contentimg">
                    {/* <ImageWithBasePath
                      src="assets/img/customer/customer5.jpg"
                      alt="img"
                      id="blah"
                    /> */}
                    {/* <img src={customer} alt="Customer" id="blah" /> */}
                    {teacher?.gender === "Male" || teacher?.gender === "MALE" ? (
                      <img src={male} alt="Male" id="blah" />
                    ) : ((teacher?.gender === "Female" || teacher?.gender === "FEMALE")?(
                      <img src={female} alt="Female" id="blah" />):(<img src={user} alt="user" id="blah" />)
                    )}
                    <div className="profileupload">
                      {/* <input type="file" id="imgInp" /> */}
                      
                    </div>
                    
                  </div>
                  <div className="profile-contentname">
                    <h2>
                      {teacher?.title +
                        "." +
                        teacher?.full_name}
                    </h2>
                    {/* <h4>Update Personal Details.</h4> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <h4 style={{color:"crimson"}}>{t('teacherJourney.tecinfo')}</h4><br/><br/>
              <div className="col-lg-6 col-sm-12">
                <div className="input-blocks">
                  <label className="form-label">{t('teacherJourney.tecname')}</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={
                      currentUser?.data[0]?.title +
                      "." +
                      currentUser?.data[0]?.full_name
                    }
                    readOnly="readonly"
                  />
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="input-blocks">
                  <label>{t('teacherJourney.eamil')}</label>
                  <input
                    type="email"
                    className="form-control"
                    defaultValue={teacher?.username_email
                    }
                    readOnly="readonly"
                  />
                </div>
              </div>
              <div className="col-lg-4 col-sm-12">
                <div className="input-blocks">
                  <label className="form-label">{t('teacherJourney.gender')}</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={
                      currentUser?.data[0]?.gender
                    }
                    readOnly="readonly"
                  />
                </div>
              </div>
              <div className="col-lg-4 col-sm-12">
                <div className="input-blocks">
                  <label className="form-label">{t('teacherJourney.mobile')}</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={
                      teacher?.mobile
                    }
                    readOnly="readonly"
                  />
                </div>
              </div>
              <div className="col-lg-4 col-sm-12">
                <div className="input-blocks">
                  <label className="form-label">{t('teacherJourney.WhatsappNumber')}</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={
                      teacher?.whatapp_mobile
                    }
                    readOnly="readonly"
                  />
                </div>
              </div>
              <h4 style={{color:"crimson"}}>{t('teacherJourney.SchoolInfo')}</h4><br/><br/>
              <div className="col-lg-6 col-sm-12">
                <div className="input-blocks">
                  <label className="form-label">{t('teacherJourney.udise')}</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={
                      teacher?.organization?.organization_code


                    }
                    readOnly="readonly"
                  />
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="input-blocks">
                  <label className="form-label">{t('teacherJourney.sname')}</label>
                  <input
                    type="text"
                    defaultValue={teacher?.organization?.organization_name}
                    readOnly="readonly"
                  />
                </div>
              </div>
              <div className="col-lg-4 col-sm-12">
                <div className="input-blocks">
                  <label className="form-label">{t('teacherJourney.Category')}</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={teacher?.organization?.category}
                    readOnly="readonly"
                  />
                </div>
              </div>
              <div className="col-lg-4 col-sm-12">
                <div className="input-blocks">
                  <label className="form-label">{t('teacherJourney.State')}</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={teacher?.organization?.state}
                    readOnly="readonly"
                  />
                </div>
              </div>
              <div className="col-lg-4 col-sm-12">
                <div className="input-blocks">
                  <label className="form-label">{t('teacherJourney.District')}</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={teacher?.organization?.district}
                    readOnly="readonly"
                  />
                </div>
              </div>
              <div className="col-lg-4 col-sm-12">
                <div className="input-blocks">
                  <label className="form-label">{t('teacherJourney.Mandal')}</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={teacher?.organization?.mandal ? teacher?.organization?.mandal :"-"}
                    readOnly="readonly"
                  />
                </div>
              </div>
              <div className="col-lg-4 col-sm-12">
                <div className="input-blocks">
                  <label className="form-label">{t('teacherJourney.PinCode')}</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={teacher?.organization?.pin_code ? teacher?.organization?.pin_code :"-"}
                    readOnly="readonly"
                  />
                </div>
              </div>
             
              <div className="col-lg-4 col-sm-12">
                <div className="input-blocks">
                  <label className="form-label">{t('teacherJourney.SchoolType')}</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={teacher?.organization?.school_type ? teacher?.organization?.school_type :"-"}
                    readOnly="readonly"
                  />
                </div>
              </div>
              <div className="col-lg-3 col-sm-12">
                <div className="input-blocks">
                  <label className="form-label">{t('teacherJourney.SchoolBoard')}</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={teacher?.organization?.board ? teacher?.organization?.board :"-" }
                    readOnly="readonly"
                  />
                </div>
              </div>
             
              <div className="col-lg-3 col-sm-12">
                <div className="input-blocks">
                  <label className="form-label">{t('teacherJourney.PrincipalName')}</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={teacher?.organization?.principal_name ? teacher?.organization?.principal_name :"-"}
                    readOnly="readonly"
                  />
                </div>
              </div>
              <div className="col-lg-3 col-sm-12">
                <div className="input-blocks">
                  <label className="form-label">{t('teacherJourney.PrincipalMobileNo')}</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={teacher?.organization?.principal_mobile ? teacher?.organization?.principal_mobile :"-"}
                    readOnly="readonly"
                  />
                </div>
              </div>
              <div className="col-lg-3 col-sm-12">
                <div className="input-blocks">
                  <label className="form-label">{t('teacherJourney.PrincipalEmailID')}</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={teacher?.organization?.principal_email ? teacher?.organization?.principal_email :"-"}
                    readOnly="readonly"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /product list */}
        {show &&  <VideoModal v={video} setShow={setShow}/>}
      </div>
    </div>
  );
};

export default TeacherProfile;
