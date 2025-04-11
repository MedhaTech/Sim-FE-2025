/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Form, Label, Card } from "reactstrap";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { openNotificationWithIcon, getCurrentUser } from "../../helpers/Utils";
import { useDispatch } from "react-redux";
import { teacherCreateMultipleStudent } from "../store/teacher/actions";
import { useLocation } from "react-router-dom";
import { encryptGlobal } from "../../constants/encryptDecrypt";
import CreateMultipleMembers from "./CreateMultipleMembers";
import { useNavigate } from "react-router-dom";
import {teamLength} from "../../RegPage/ORGData";
import { useTranslation } from "react-i18next";

// import { all_routes } from "../../Router/all_routes";
const studentBody = {
  full_name: "",
  Age: "",
  Grade: "",
  Gender: "",
  disability: "",
  // username: "",
};
const grades = [6, 7, 8, 9, 10, 11, 12];
const allowedAge = [10, 11, 12, 13, 14, 15, 16, 17, 18];

// const CreateMultipleMembers = ({ id }) => {
//   const tempStudentData = {
//     team_id: id,
//     role: "STUDENT",
//     full_name: "",
//     Age: "",
//     Grade: "",
//     Gender: "",
//     disability: "",
//     // username: "",
//   };
//   const dispatch = useDispatch();
//   const [itemDataErrors, setItemDataErrors] = useState([studentBody]);
//   //   const history = useHistory();
//   const [isClicked, setIsClicked] = useState(false);
//   const [teamname, setTeamname] = useState("");
//   const [teamemail, setTeamemail] = useState("");
//   const handleteamname = (e) => {
//     const numericValue = e.target.value.replace(/\D/g, "");
//     const trimmedValue = numericValue.trim();

//     setTeamname(trimmedValue);
//   };
//   const handleteamemail = (e) => {
//     const numericValue = e.target.value;
//     const trimmedValue = numericValue.trim();

//     setTeamemail(trimmedValue);
//   };
//   const [studentData, setStudentData] = useState([
//     {
//       team_id: id,
//       role: "STUDENT",
//       full_name: "",
//       Age: "",
//       Grade: "",
//       Gender: "",
//       // username: "",
//       disability: "",
//     },
//     {
//       team_id: id,
//       role: "STUDENT",
//       full_name: "",
//       Age: "",
//       Grade: "",
//       Gender: "",
//       username: "",
//       disability: "",
//     },
//     {
//       team_id: id,
//       role: "STUDENT",
//       full_name: "",
//       Age: "",
//       Grade: "",
//       Gender: "",
//       // username: "",
//       disability: "",
//     },
//   ]);
//   let pattern = /[A-Za-z0-9\s]*$/;
//   // const emailRegex = /[A-Za-z-@+.-]*$/;
//   const emailRegex = /^[\w.]+@([\w-]+\.)+[\w-]{2,4}$/;
//   const handleChange = (e, i) => {
//     let newItem = [...studentData];
//     const dataKeys = Object.keys(studentBody);
//     if (e.target) {
//       dataKeys.some((item) => {
//         if (e.target.name === item) {
//           newItem[i][e.target.name] = e.target.value;
//           let errCopy = [...itemDataErrors];
//           if (item === "full_name") {
//             let check = e.target.value;
//             if (check && check.match(pattern)) {
//               const { index } = check.match(pattern);
//               if (index) {
//                 const foo = { ...errCopy[i] };
//                 foo[e.target.name] = "Only alphanumeric are allowed";
//                 errCopy[i] = { ...foo };
//                 setItemDataErrors(errCopy);
//                 return;
//               }
//             }
//           }
//           // if (item === "username") {
//           //   let check = e.target.value;
//           //   if (check && check.match(emailRegex)) {
//           //     const { index } = check.match(emailRegex);
//           //     if (index) {
//           //       const foo = { ...errCopy[i] };
//           //       foo[e.target.name] = "Enter Valid Mail Id";
//           //       errCopy[i] = { ...foo };
//           //       setItemDataErrors(errCopy);
//           //       return;
//           //     }
//           //   }
//           // }
//           const foo = { ...errCopy[i] };
//           foo[e.target.name] = "";
//           errCopy[i] = { ...foo };
//           setItemDataErrors(errCopy);
//         }
//         return;
//       });
//     }

//     setStudentData(newItem);
//   };
//   const validateItemData = () => {
//     const errors = studentData.map((item, i) => {
//       let err = {};
//       if (!item.full_name.trim()) err["full_name"] = "Full name is Required";
//       if (item.full_name && item.full_name.match(pattern)) {
//         const { index } = item.full_name.match(pattern);
//         if (index) {
//           err["full_name"] = "Only alphanumeric are allowed";
//         }
//       }

//       // if (!item.username.trim()) err["username"] = "Email is Required";
//       // if (item.username) {
//       //     const start = item.username.indexOf('@');
//       //     const main = item.username.substring(start);
//       //     const checkarry = ['@gmail.com', '@outlook.com', '@yahoo.com'];
//       //     const text = checkarry.includes(main);
//       //     if (!text) {
//       //         err['username'] = 'Enter Valid Mail Id';
//       //     }
//       // }

//       if (!item.Age) err["Age"] = "Age is Required";

//       if (!item.disability) err["disability"] = " Status is Required";
//       if (!item.Grade) err["Grade"] = "Class is Required";
//       if (!item.Gender) err["Gender"] = "Gender is Required";
//       if (Object.values(err).length === 0) {
//         return { ...studentBody, i };
//       }
//       return { ...err, i };
//     });
//     setItemDataErrors(errors.filter((item) => Object.values(item).length > 0));
//     const filterEmpty = errors.filter((item) => {
//       const ce = { ...item };
//       delete ce.i;
//       return Object.values(ce).filter(Boolean).length > 0;
//     });
//     if (filterEmpty.length > 0) {
//       return false;
//     } else {
//       return true;
//     }
//   };
//   const addItem = () => {
//     if (!validateItemData()) {
//       return;
//     } else {
//       setStudentData([...studentData, tempStudentData]);
//     }
//   };
//   const containsDuplicates = (array) => {
//     if (array.length !== new Set(array).size) {
//       return true;
//     }
//     return false;
//   };
//   const removeItem = (i) => {
//     let newItems = [...studentData];
//     newItems.splice(i, 1);
//     setStudentData(newItems);
//   };
//   const handleSumbit = () => {
//     if (!validateItemData()) return;
//     setIsClicked(true);
//     const checkDuplicateName = containsDuplicates(
//       studentData.map((item) => item.full_name)
//     );
//     if (checkDuplicateName) {
//       openNotificationWithIcon("error", "Student already exists");
//       setIsClicked(false);
//       return;
//     }
//     dispatch(teacherCreateMultipleStudent(studentData, history, setIsClicked));
//   };
//   return (
//     <div className="page-wrapper">
//       <div className="content">
//         {/* <div className="page-header"> */}
//         <div className="page-title">
//           <h3 style={{ marginBottom: "1rem" }}>Team And Student Creation</h3>
//           <div />
//           <Row>
//             <Col md={6}>
//               <Label className="form-label">
//                 Team Name
//                 <span required className="p-1">
//                   *
//                 </span>
//               </Label>
//               <input
//                 className="form-control"
//                 placeholder="Please Enter Your Team Name"
//                 id="teamname"
//                 name="teamname"
//                 onChange={(e) => handleteamname(e)}
//                 value={teamname}
//               />
//             </Col>
//             <Col md={6} className="mb-xl-0">
//               <Label className="form-label">
//                 Team Email Address
//                 <span required className="p-1">
//                   *
//                 </span>
//               </Label>
//               <input
//                 className="form-control"
//                 placeholder="Please Enter Your Email Address"
//                 id="teamemail"
//                 name="teamemail"
//                 type="email"
//                 onChange={(e) => handleteamemail(e)}
//                 value={teamemail}
//               />
//               {/* {foundErrObject?.username ? (
//                           <small className="error-cls">
//                             {foundErrObject.username}
//                           </small>
//                         ) : null} */}
//             </Col>
//           </Row>
//           {studentData.map((item, i) => {
//             const foundErrObject = { ...itemDataErrors[i] };
//             return (
//               <div key={i + item} className="mb-5">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <h6 className="mt-2">Student {i + 1} Details</h6>
//                   {/* {i > 1 && (
//                       <button
//                         //   label={"Remove"}
//                         onClick={() => removeItem(i)}
//                         //   btnClass={"secondary float-end"}
//                         className="btn btn-primary "
//                       >
//                         Remove
//                       </button>
//                     )} */}
//                 </div>
//                 <hr />
//                 <Row className="mb-3">
//                   {/* <Row> */}
//                   <Col md={3}>
//                     <Label className="form-label">
//                       Full Name
//                       <span required className="p-1">
//                         *
//                       </span>
//                     </Label>
//                     <input
//                       className="form-control"
//                       placeholder="Please Enter Your Full Name"
//                       id="full_name"
//                       name="full_name"
//                       onChange={(e) => {
//                         handleChange(e, i);
//                       }}
//                       value={item.full_name}
//                     />
//                     {foundErrObject?.full_name ? (
//                       <small className="error-cls">
//                         {foundErrObject.full_name}
//                       </small>
//                     ) : null}
//                   </Col>
//                   {/* <Col md={6} className="mb-xl-0">
//                         <Label className="form-label">
//                           Email Address
//                           <span required className="p-1">
//                             *
//                           </span>
//                         </Label>
//                         <input
//                           className="form-control"
//                           placeholder="Enter Email Id"
//                           id="username"
//                           name="username"
//                           onChange={(e) => {
//                             handleChange(e, i);
//                           }}
//                           value={item.username}
//                         />
//                         {foundErrObject?.username ? (
//                           <small className="error-cls">
//                             {foundErrObject.username}
//                           </small>
//                         ) : null}
//                       </Col> */}
//                   {/* </Row> */}
//                   <Col md={2} className="mb-xl-0">
//                     <Label htmlFor="inputState" className="form-label">
//                       Age
//                       <span required className="p-1">
//                         *
//                       </span>
//                     </Label>
//                     <select
//                       id="inputState"
//                       className="form-select"
//                       name="Age"
//                       value={item.Age}
//                       onChange={(e) => handleChange(e, i)}
//                     >
//                       <option value={""}>Select Age</option>
//                       {allowedAge.map((item) => (
//                         <option key={item} value={item}>
//                           {item}
//                         </option>
//                       ))}
//                     </select>
//                     {foundErrObject?.Age ? (
//                       <small className="error-cls">{foundErrObject.Age}</small>
//                     ) : null}
//                   </Col>
//                   <Col md={3} className="mb-xl-0">
//                     <Label htmlFor="inputState" className="form-label">
//                       Disability
//                       <span required className="p-1">
//                         *
//                       </span>
//                     </Label>
//                     <select
//                       id="inputState"
//                       className="form-select"
//                       name="disability"
//                       value={item.disability}
//                       onChange={(e) => handleChange(e, i)}
//                     >
//                       <option value="">Select Status</option>
//                       <option value="No">No</option>
//                       <option value="Physically Challenged">
//                         Physically Challenged
//                       </option>
//                       <option value="Visually Challenged">
//                         Visually Challenged
//                       </option>
//                       <option value="Locomotor Disability">
//                         Locomotor Disability
//                       </option>
//                       <option value="Intellectual Disability">
//                         Intellectual Disability
//                       </option>
//                       <option value="Learning Disability">
//                         Learning Disability
//                       </option>
//                       <option value="Hearing Impaired">Hearing Impaired</option>
//                       <option value="Autism/Cerebral Palsy/Other">
//                         Autism/Cerebral Palsy/Other
//                       </option>
//                       <option value="Others">Others</option>
//                     </select>
//                     {foundErrObject?.disability ? (
//                       <small className="error-cls">
//                         {foundErrObject.disability}
//                       </small>
//                     ) : null}
//                   </Col>

//                   <Col md={2}>
//                     <Label htmlFor="inputState" className="form-label">
//                       Class
//                       <span required className="p-1">
//                         *
//                       </span>
//                     </Label>
//                     <select
//                       id="inputState"
//                       className="form-select"
//                       name="Grade"
//                       value={item.Grade}
//                       onChange={(e) => handleChange(e, i)}
//                     >
//                       <option value="">Select Class</option>
//                       {grades.map((item) => (
//                         <option key={item} value={item}>
//                           Class {item}
//                         </option>
//                       ))}
//                     </select>
//                     {foundErrObject?.Grade ? (
//                       <small className="error-cls">
//                         {foundErrObject?.Grade}
//                       </small>
//                     ) : null}
//                   </Col>
//                   <Col md={2} className="mb-5 mb-xl-0">
//                     <Label htmlFor="inputState" className="form-label">
//                       Gender
//                       <span required className="p-1">
//                         *
//                       </span>
//                     </Label>

//                     <select
//                       id="inputState"
//                       className="form-select"
//                       name="Gender"
//                       value={item.Gender}
//                       onChange={(e) => handleChange(e, i)}
//                     >
//                       <option value="">Select Gender</option>
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                       <option value="OTHERS">Prefer not to mention</option>
//                     </select>
//                     {foundErrObject?.Gender ? (
//                       <small className="error-cls">
//                         {foundErrObject?.Gender}
//                       </small>
//                     ) : null}
//                   </Col>
//                 </Row>
//               </div>
//             );
//           })}
//           <Row>
//             <Col className="mt-2" xs={12} sm={6} md={6} xl={6}>
//               <button
//                 type="Submit"
//                 className="btn btn-primary m-2"
//                 // label="Discard"
//                 // btnClass="secondary "
//                 // size="small"
//                 // onClick={() => history.push("/teacher/teamlist")}
//               >
//                 Submit
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-secondary m-2"
//                 // label="Discard"
//                 // btnClass="secondary "
//                 // size="small"
//                 // onClick={() => history.push("/teacher/teamlist")}
//               >
//                 Discard
//               </button>
//             </Col>
//             <Col className="mt-2" xs={12} sm={6} md={6} xl={6}>
//               {/* {!isClicked ? (
//             <button
//             //   label={t("teacher_teams.submit")}
//               type="submit"
//               onClick={handleSumbit}
//             //   btnClass={"primary float-end"}
//               // btnClass={'btn btn-warning text-right'}
//             >
//                 Submit
//             </button>
//           ) : (
//             <button
//               label={t("teacher_teams.submit")}
//               type="button"
//               btnClass={"default float-end"}
//               // btnClass={'btn btn-default'}
//               size="small"
//               disabled={true}
//             />
//           )} */}
//               {/* {studentData.length < 4 && (
//                   <div className="">
//                     <button
//                       // label={"Add More"}
//                       onClick={addItem}
//                       // btnClass={
//                       //   studentData.length != 3 ? "primary" : "default"
//                       // }
//                       // size="small"
//                       disabled={studentData.length === 3}
//                     >
//                       Add More
//                     </button>
//                   </div>
//                 )} */}
//             </Col>
//           </Row>
//           {/* </div> */}
//         </div>
//         {/* </div> */}
//       </div>
//     </div>
//   );
// };
// export default CreateMultipleMembers;

export const CreateTeamMember = (props) => {
  const loc = useLocation();
  const params = loc.pathname.split("/");
  const pl = params.length;
  const { t } = useTranslation();
  const id = params[pl - 2];
  const studentCount = params[pl - 1];
  const currentUser = getCurrentUser("current_user");
  const [teamMemberData, setTeamMemberData] = useState({});
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  const loginState=currentUser?.data[0]?.state;
  console.log(loginState,"sss");
  const getTeamLength = (loginState) => {
    // Use `teamLength` object to determine the team length.
    return loginState === "Tamil Nadu" ? teamLength["Tamil Nadu"] : teamLength.default;
  };
  
  const teamLengthValue = getTeamLength(loginState);
  
  console.log(teamLengthValue, "11");
  // const getTeamLength = (loginState) => {
  //   if (loginState === "Tamil Nadu") {
  //     return teamLength["Tamil Nadu"];
  //   } else {
  //     return teamLength.default;
  //   }
  // };
  // const teamLengthValue = getTeamLength(loginState);
  // console.log(teamLengthValue,"11");
  // const headingDetails = {
  //   title: t("teacher_teams.create_team_members"),

  //   options: [
  //     {
  //       title: t("teacher_teams.teamslist"),
  //       path: "/teacher/teamlist",
  //     },
  //     {
  //       title: t("teacher_teams.create_team_members"),
  //     },
  //   ],
  // };
  // useEffect(async () => {
  //   await handleCreateMemberAPI(id);
  // }, [id]);

  async function handleCreateMemberAPI(teamId) {
    const creaParam = encryptGlobal(JSON.stringify(teamId));
    const param = encryptGlobal(
      JSON.stringify({
        status: "ACTIVE",
      })
    );

    var config = {
      method: "get",
      url: `${process.env.REACT_APP_API_BASE_URL}/teams/${creaParam}?Data=${param}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.data[0]?.token}`,
      },
    };
    await axios(config)
      .then(function (response) {
        if (response.status === 200) {
          setTeamMemberData(response.data && response.data.data[0]);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const formik = useFormik({
    initialValues: {
      fullName: "",
      age: "",
      grade: "",
      gender: "",
      disability: "",
      // username: "",
    },

    validationSchema: Yup.object({
      fullName: Yup.string()
        .required("Please Enter valid Full Name")
        .max(40)
        .required()
        .matches(
          /^[A-Za-z0-9\s]*$/,
          "Please enter only alphanumeric characters"
        )
        .trim(),
      age: Yup.number()
        .integer()
        .min(10, "Min age is 10")
        .max(18, "Max age is 18")
        .required("required"),
      gender: Yup.string().required("Please select valid gender"),
      // username: Yup.string().email("Must be a valid email").max(255),
      disability: Yup.string().required("Please select disability"),
      grade: Yup.string()
        .matches("", "Please enter valid class")
        .max(40)
        .required("Please enter valid class"),
    }),

    onSubmit: (values) => {
      if (process.env.REACT_APP_TEAM_LENGTH == teamMemberData.student_count) {
        openNotificationWithIcon(
          "warning",
          "Team Members Maximum Count All Ready Exist"
        );
      } else {
        setIsClicked(true);
        const body = {
          team_id: id,
          role: "STUDENT",
          full_name: values.fullName,
          qualification: "",
          Age: values.age,
          Grade: values.grade,
          Gender: values.gender,
          disability: values.disability,
          // username: values.username,
          // country: values.country,
        };
        var config = {
          method: "post",
          url: process.env.REACT_APP_API_BASE_URL + "/students/addStudent",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser?.data[0]?.token}`,
          },
          data: body,
        };
        axios(config)
          .then(function (response) {
            if (response.status === 201) {
              openNotificationWithIcon(
                "success",
                t('teacherJourney.popup1'),
              );
              navigate("/mentorteams");
            } else {
              openNotificationWithIcon("error", "Opps! Something Wrong");
              setIsClicked(false);
            }
          })
          .catch(function (error) {
            if (error.response.status === 406) {
              openNotificationWithIcon("error", error?.response?.data?.message);
            } else {
              openNotificationWithIcon("error", "Opps! Something Wrong");
            }
            setIsClicked(false);
          });
      }
    },
  });
  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          {/* <div className="EditPersonalDetails new-member-page">
            <Row>
              <Col className="col-xl-10 offset-xl-1 offset-md-0"> */}
                {/* <BreadcrumbTwo {...headingDetails} /> */}
                {studentCount && studentCount !== "new" && (
                  <CreateMultipleMembers id={id} teamLengthValue={teamLengthValue} />
                  // ) : (
                  //   <>
                  //     <h3 className="m-4">Team and Student Creation</h3>
                  //     <div>
                  //       <Form onSubmit={formik.handleSubmit} isSubmitting>
                  //         <div className="create-ticket register-blockt">
                  //           <Row>
                  //             <Col md={3}>
                  //               <Label className="form-label">
                  //                 Full Name
                  //                 <span required className="p-1">
                  //                   *
                  //                 </span>
                  //               </Label>
                  //               <input
                  //                 className="form-control"
                  //                 placeholder="Please Enter Your Full Name"
                  //                 id="fullName"
                  //                 name="fullName"
                  //                 onChange={formik.handleChange}
                  //                 onBlur={formik.handleBlur}
                  //                 value={formik.values.fullName}
                  //               />
                  //               {formik.touched.fullName &&
                  //               formik.errors.fullName ? (
                  //                 <small className="error-cls">
                  //                   {formik.errors.fullName}
                  //                 </small>
                  //               ) : null}
                  //             </Col>
                  //             <Col md={2}>
                  //               <Label
                  //                 htmlFor="inputState"
                  //                 className="form-label"
                  //               >
                  //                 Age
                  //                 <span required className="p-1">
                  //                   *
                  //                 </span>
                  //               </Label>
                  //               <div className="dropdown CalendarDropdownComp ">
                  //                 <select
                  //                   id="inputState"
                  //                   className="form-select"
                  //                   name="age"
                  //                   onChange={formik.handleChange}
                  //                   onBlur={formik.handleBlur}
                  //                   value={formik.values.age}
                  //                 >
                  //                   <option value={""}>Select Age</option>
                  //                   {allowedAge.map((item) => (
                  //                     <option key={item} value={item}>
                  //                       {item}
                  //                     </option>
                  //                   ))}
                  //                 </select>
                  //               </div>
                  //               {formik.touched.age && formik.errors.age ? (
                  //                 <small className="error-cls">
                  //                   {formik.errors.age}
                  //                 </small>
                  //               ) : null}
                  //             </Col>

                  //             <Col md={2} className="mb-5 mb-xl-0">
                  //               <Label
                  //                 className="name-req-create-member"
                  //                 htmlFor="gender"
                  //               >
                  //                 Gender
                  //                 <span required className="p-1">
                  //                   *
                  //                 </span>
                  //               </Label>

                  //               <select
                  //                 name="gender"
                  //                 className="form-control custom-dropdown"
                  //                 value={formik.values.gender}
                  //                 onChange={formik.handleChange}
                  //               >
                  //                 <option value="">Select Gender</option>
                  //                 <option value="Male">Male</option>
                  //                 <option value="Female">Female</option>
                  //                 <option value="OTHERS">
                  //                   Prefer not to mention
                  //                 </option>
                  //               </select>

                  //               {formik.touched.gender && formik.errors.gender ? (
                  //                 <small className="error-cls">
                  //                   {formik.errors.gender}
                  //                 </small>
                  //               ) : null}
                  //             </Col>

                  //             <Col md={3}>
                  //               <Label
                  //                 htmlFor="inputState"
                  //                 className="form-label"
                  //               >
                  //                 Disability
                  //                 <span required className="p-1">
                  //                   *
                  //                 </span>
                  //               </Label>
                  //               <select
                  //                 id="inputState"
                  //                 className="form-select"
                  //                 name="disability"
                  //                 value={formik.values.disability}
                  //                 onChange={formik.handleChange}
                  //               >
                  //                 <option value="">Select Status</option>
                  //                 <option value="No">No</option>
                  //                 <option value="Physically Challenged">
                  //                   Physically Challenged
                  //                 </option>
                  //                 <option value="Visually Challenged">
                  //                   Visually Challenged
                  //                 </option>
                  //                 <option value="Locomotor Disability">
                  //                   Locomotor Disability
                  //                 </option>
                  //                 <option value="Intellectual Disability">
                  //                   Intellectual Disability
                  //                 </option>
                  //                 <option value="Learning Disability">
                  //                   Learning Disability
                  //                 </option>
                  //                 <option value="Hearing Impaired">
                  //                   Hearing Impaired
                  //                 </option>
                  //                 <option value="Autism/Cerebral Palsy/Other">
                  //                   Autism/Cerebral Palsy/Other
                  //                 </option>
                  //                 <option value="Others">Others</option>
                  //               </select>
                  //               {formik.touched.disability &&
                  //               formik.errors.disability ? (
                  //                 <small className="error-cls">
                  //                   {formik.errors.disability}
                  //                 </small>
                  //               ) : null}
                  //             </Col>
                  //             <Col md={2}>
                  //               <Label
                  //                 htmlFor="inputState"
                  //                 className="form-label"
                  //               >
                  //                 Class
                  //                 <span required className="p-1">
                  //                   *
                  //                 </span>
                  //               </Label>
                  //               <select
                  //                 id="inputState"
                  //                 className="form-select"
                  //                 name="grade"
                  //                 value={formik.values.grade}
                  //                 onChange={formik.handleChange}
                  //               >
                  //                 <option value="">Select Class..</option>
                  //                 <option value="6">Class 6</option>
                  //                 <option value="7">Class 7</option>
                  //                 <option value="8">Class 8</option>
                  //                 <option value="9">Class 9</option>
                  //                 <option value="10">Class 10</option>
                  //                 <option value="11">Class 11</option>
                  //                 <option value="12">Class 12</option>
                  //               </select>
                  //               {formik.touched.grade && formik.errors.grade ? (
                  //                 <small className="error-cls">
                  //                   {formik.errors.grade}
                  //                 </small>
                  //               ) : null}
                  //             </Col>
                  //           </Row>
                  //         </div>

                  //         <hr className="mt-4 mb-4"></hr>
                  //         <Row>
                  //           <Col className="mt-2" xs={12} sm={6} md={6} xl={6}>
                  //             {!isClicked && (
                  //               <button
                  //                 // label={t("teacher_teams.submit")}
                  //                 type="submit"
                  //                 className="btn btn-warning"
                  //               >
                  //                 Submit
                  //               </button>
                  //               // ) : (
                  //               //   <button
                  //               //     // label={t("teacher_teams.submit")}
                  //               //     type="button"
                  //               //     className="btn btn-secondary"
                  //               //   >
                  //               //     Discard
                  //               //   </button>
                  //             )}
                  //           </Col>
                  //           <Col className="mt-2" xs={12} sm={6} md={6} xl={6}>
                  //             <button
                  //               // label={t("teacher_teams.discard")}
                  //               // btnClass="secondary"
                  //               // size="small"
                  //               onClick={() => navigate("/mentorteams")}
                  //               type="button"
                  //               className="btn btn-secondary"
                  //             >
                  //               Discard
                  //             </button>
                  //           </Col>
                  //         </Row>
                  //       </Form>
                  //     </div>
                  //   </>
                )}
              {/* </Col>
            </Row>
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default CreateTeamMember;

// export default CreateTeamMember;
