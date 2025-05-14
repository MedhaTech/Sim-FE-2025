/* eslint-disable indent */
import React, { useState } from "react";
import { Row, Col, FormGroup, Label, Form } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "../../stories/Button";
import { getCurrentUser, openNotificationWithIcon } from "../../helpers/Utils";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { stateList, userList, navList } from "../../RegPage/ORGData";
import { encryptGlobal } from '../../constants/encryptDecrypt';

const Createpopup = () => {
  const { t } = useTranslation();
  const currentUser = getCurrentUser("current_user");
  const [path, setPath] = useState([]);
  const allData = ["All States", ...stateList];
  const navigate = useNavigate();
 

  const fileHandler = (e) => {
    // Handles file selection and reads the selected file //

    let file = e.target.files[0];

    if (!file) {
      return;
    }

    let pattern = /^[a-zA-Z0-9_-\s]{0,}$/;
    const fileName = file.name.split(".").slice(0, -1).join(".");
    const isValidFileName = pattern.test(fileName);

    const maxFileSize = 10000000;
    const isOverMaxSize = file.size > maxFileSize;
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "application/msword",
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      openNotificationWithIcon(
        "error",
        t("Accepting only png,jpg,jpeg,pdf,doc,docx Only")
      );
      return;
    }

    if (isOverMaxSize) {
      openNotificationWithIcon("error", t("student.less_10MB"));
      return;
    }

    if (!isValidFileName) {
      openNotificationWithIcon(
        "error",
        "Only alphanumeric and '_' are allowed"
      );
      return;
    }

    formik.setFieldValue("file_name", file);
  };
  const fileHandler1 = (e) => {
    // Handles file selection and reads the selected file //

    let file = e.target.files[0];

    if (!file) {
      return;
    }

    let pattern = /^[a-zA-Z0-9_-\s]{0,}$/;
    const fileName1 = file.name.split(".").slice(0, -1).join(".");
    const isValidFileName = pattern.test(fileName1);

    const maxFileSize = 10000000;
    const isOverMaxSize = file.size > maxFileSize;
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      openNotificationWithIcon("error", t("Accepting only png,jpg,jpeg Only"));
      return;
    }

    if (isOverMaxSize) {
      openNotificationWithIcon("error", t("student.less_10MB"));
      return;
    }

    if (!isValidFileName) {
      openNotificationWithIcon(
        "error",
        "Only alphanumeric and '_' are allowed"
      );
      return;
    }

    formik.setFieldValue("image", file);
  };
 

  const formik = useFormik({
    initialValues: {
      role: "",
      navigate: "",
      youtube: "",
      state: "",
      file_name: "",
      url: "",
      image: "",
    },
    validationSchema: Yup.object({
      role: Yup.string().required("Role is Required"),

      navigate: Yup.string().optional(),
      state: Yup.string().required("Please Select State"),
      file_name: Yup.mixed(),
      image: Yup.mixed(),

      url: Yup.string(),
      youtube: Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
       
const getFileParam = (type) => encryptGlobal(JSON.stringify({ type }));

if (values.file_name !== "") {
    const fileData = new FormData();
    fileData.append("file", values.file_name);

    const fileParam = getFileParam("file");

    const fileResponse = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/popup/popupFileUpload?Data=${fileParam}`,
        fileData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${currentUser?.data[0]?.token}`,
            },
        }
    );

    values.file_name = fileResponse?.data?.data[0]?.attachments[0]?.toString();
}

if (values.image !== "") {
    const imageData = new FormData();
    imageData.append("image", values.image);

    const imageParam = getFileParam("image");

    const imageResponse = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/popup/popupFileUpload?Data=${imageParam}`,
        imageData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${currentUser?.data[0]?.token}`,
            },
        }
    );

    values.image = imageResponse?.data?.data[0]?.attachments[0]?.toString();
}

        const body = {
          role: values.role,
          state: values.state,
          on_off: "0",
        };
        if (values.file_name !== "") {
          body["file"] = values.file_name;
        }
        if (values.image !== "") {
          body["image"] = values.image;
        }
        if (values.url !== "") {
          body["url"] = values.url;
        }
        if (values.youtube !== "") {
          body["youtube"] = values.youtube;
        }
        if (values.navigate !== "") {
          body["navigate"] = values.navigate;
        }
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/popup`,
          body,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentUser?.data[0]?.token}`,
            },
          }
        );

        if (response.status === 201) {
          navigate("/popup");
          openNotificationWithIcon("success", "PopUp Created Successfully");
        }
      } catch (error) {
        if (error.response.status === 420) {
          openNotificationWithIcon(
            "error",
            "PopUp for this State & Role already exists"
          );
        }
      }
    },
   
  });

 
  const handleStateChange = (event) => {
    const state = event.target.value;
    formik.setFieldValue("state", state);
  };
  const handleroleChange = (event) => {
    const role = event.target.value;
    formik.setFieldValue("role", role);
    formik.setFieldValue("navigate", "");
    setPath(navList[role] || []);
  };
  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };
  return (
    <div className="page-wrapper">
      <h4
        className="m-2"
        style={{
          position: "sticky",
          top: "70px",
          zIndex: 1000,
          padding: "10px",
          backgroundColor: "white",
          display: "inline-block",
          color: "#fe9f43",
          fontSize: "16px",
        }}
      >
        PopUp
      </h4>
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>Add PopUp</h4>
              <h6>You can add new PopUp by submitting details here</h6>
            </div>
          </div>
        </div>
        <div className="EditPersonalDetails new-member-page">
          <Row>
            <Col className="col-xl-10 offset-xl-1 offset-md-0">
              <div>
                <Form onSubmit={formik.handleSubmit} isSubmitting>
                  <div className="create-ticket register-block">
                    <FormGroup className="form-group" md={12}>
                      <Row className="mb-3 modal-body-table search-modal-header">
                        <Col md={4}>
                          <Label className="mb-2" htmlFor="role">
                            Role
                            <span required>*</span>
                          </Label>
                          <select
                            name="role"
                            id="role"
                            className="form-select"
                            onChange={(e) => handleroleChange(e)}
                            onBlur={formik.handleBlur}
                          >
                            <option value="">Select role</option>
                            {userList.map((state) => (
                              <option key={state} value={state}>
                                {state}
                              </option>
                            ))}
                          </select>
                          {formik.touched.role && formik.errors.role && (
                            <small
                              className="error-cls"
                              style={{ color: "red" }}
                            >
                              {formik.errors.role}
                            </small>
                          )}
                        </Col>
                        <Col md={5}>
                          <Label className="form-label" htmlFor="state">
                            State
                            <span required>*</span>
                          </Label>
                          <select
                            id="inputState"
                            className="form-select"
                            onChange={(e) => handleStateChange(e)}
                          >
                            <option value="">Select State</option>
                            {allData.map((state) => (
                              <option key={state} value={state}>
                                {state}
                              </option>
                            ))}
                          </select>

                          {formik.touched.state && formik.errors.state ? (
                            <small
                              className="error-cls"
                              style={{ color: "red" }}
                            >
                              {formik.errors.state}
                            </small>
                          ) : null}
                        </Col>
                        <Col md={3}>
                          <Label className="mb-2" htmlFor="navigate">
                            Navigate Menu
                          </Label>
                          <select
                            id="inputState"
                            className="form-select"
                            value={formik.values.navigate}
                            onChange={(e) => {
                              const selectedDistrict = e.target.value;
                              formik.setFieldValue(
                                "navigate",
                                selectedDistrict
                              );
                            }}
                          >
                            <option value="">Select Path</option>
                            {path.map((path) => (
                              <option key={path} value={path}>
                                {path}
                              </option>
                            ))}
                          </select>
                          {formik.touched.navigate &&
                            formik.errors.navigate && (
                              <small
                                className="error-cls"
                                style={{ color: "red" }}
                              >
                                {formik.errors.navigate}
                              </small>
                            )}
                        </Col>
                      </Row>
                      <Row className="mb-3 modal-body-table search-modal-header">
                        
                        <Col md={6}>
                          <Label className="mb-2 mt-4" htmlFor="file_name">
                            File
                          </Label>
                          {/* <div> */}
                          <input
                            type="file"
                            id="file_name"
                            className="form-control"
                            name="file_name"
                            style={{
                              display: "none",
                            }}
                            accept="image/jpeg,image/png,application/msword,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            onChange={(e) => fileHandler(e)}
                            onBlur={formik.handleBlur}
                          />
                          <Button
                            label="Upload File"
                            btnClass="primary m-2"
                            size="small"
                            onClick={() => {
                              document.getElementById("file_name").click();
                            }}
                          />
                          {formik.values.file_name &&
                          formik.values.file_name.name ? (
                            <span className="ml-2 p-3">
                              {formik.values.file_name.name}
                            </span>
                          ) : (
                            <span className="ml-2 p-3">
                              {formik.initialValues.file_name &&
                                formik.initialValues.file_name.name}
                            </span>
                          )}
                          {/* </div> */}
                          {formik.touched.file_name &&
                            formik.errors.file_name && (
                              <small
                                className="error-cls"
                                style={{ color: "red" }}
                              >
                                {formik.errors.file_name}
                              </small>
                            )}
                        </Col>
                        <Col md={6}>
                          <Label className="mb-2 mt-4" htmlFor="file_name">
                            Image
                          </Label>
                          {/* <div> */}
                          <input
                            type="file"
                            id="image"
                            className="form-control"
                            name="image"
                            style={{
                              display: "none",
                            }}
                            accept="image/jpeg,image/png"
                            onChange={(e) => fileHandler1(e)}
                            onBlur={formik.handleBlur}
                          />
                          <Button
                            label="Upload Image"
                            btnClass="primary m-2"
                            size="small"
                            onClick={() => {
                              document.getElementById("image").click();
                            }}
                          />
                          {formik.values.image && formik.values.image.name ? (
                            <span className="ml-2 p-3">
                              {formik.values.image.name}
                            </span>
                          ) : (
                            <span className="ml-2 p-3">
                              {formik.initialValues.image &&
                                formik.initialValues.image.name}
                            </span>
                          )}
                          {/* </div> */}
                          {formik.touched.image && formik.errors.image && (
                            <small
                              className="error-cls"
                              style={{ color: "red" }}
                            >
                              {formik.errors.image}
                            </small>
                          )}
                        </Col>
                        <Col md={12}>
                          <Label className="mb-2 mt-4" htmlFor="youtube">
                            Video
                          </Label>
                          <input
                            type="text"
                            name="youtube"
                            id="youtube"
                            className="form-control"
                            placeholder="Please share the video link"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.youtube}
                          />
                          {formik.touched.youtube && formik.errors.youtube && (
                            <small
                              className="error-cls"
                              style={{ color: "red" }}
                            >
                              {formik.errors.youtube}
                            </small>
                          )}
                        </Col>
                        <Col md={12}>
                          <Label className="mb-2 mt-4" htmlFor="attachments">
                            Link
                          </Label>
                          <input
                            type="text"
                            name="url"
                            id="url"
                            className="form-control"
                            placeholder="Please share your Link"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.url}
                          />
                          {formik.touched.url && formik.errors.url && (
                            <small
                              className="error-cls"
                              style={{ color: "red" }}
                            >
                              {formik.errors.url}
                            </small>
                          )}
                        </Col>
                      </Row>
                    </FormGroup>
                  </div>

                  
                  <Row>
                    <div style={buttonContainerStyle} className="mt-3">
                      <button
                        label="Submit details"
                        type="submit"
                        className={`btn btn-warning ${
                          !(formik.dirty && formik.isValid)
                            ? "default"
                            : "warning"
                        }`}
                        disabled={!formik.dirty}
                      >
                        Submit details
                      </button>

                      <button
                        type="cancel"
                        className="btn btn-secondary"
                        onClick={() => navigate("/popup")}
                      >
                        Discard
                      </button>
                    </div>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Createpopup;
