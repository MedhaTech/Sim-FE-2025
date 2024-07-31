/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "../InitialPage/Sidebar/Header";
import MentorHeader from "../InitialPage/Sidebar/TeacherHeader";
import StateHeader from "../InitialPage/Sidebar/stateHeader";
import TeamHeader from "../InitialPage/Sidebar/TeamHeader";
import TeamSidebar from "../InitialPage/Sidebar/teamSidebar";
import Sidebar from "../InitialPage/Sidebar/Sidebar";
import OneSidebar from "../InitialPage/Sidebar/OneSidebar";
import Condition from "../InitialPage/Sidebar/Conditon";


import HorizontalSidebar from "../InitialPage/Sidebar/horizontalSidebar";

import {
  pagesRoute,
  posRoutes,
  teamRoutes,
  publicRoutes,
  mentorRoutes,
  stateRoutes,
  eadminRoutes,
} from "./router.link";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import ThemeSettings from "../InitialPage/themeSettings";
import FirstPage from "../RegPage/FirstPage";
import LoginPage from "../RegPage/LoginPage";
import LogInTeacher from "../Teacher/LogInTeacher";
import AtlPage from "../RegPage/AtlPage";
import AdminLogin from "../Admin/AdminLogin";
import StateLogin from "../Coordinators/LogInNew";
import "../i18n";

import NonAtlPage from "../RegPage/NonAtlPage";
import AtlSucess from "../RegPage/AtlSucess";
import NonAtlSuccess from "../RegPage/NonAtlSuccess";
import { ProtectedRoute } from "../helpers/authHelper";
import AdminSidebar from "../InitialPage/Sidebar/adminSidebar";
import StateSidebar from "../InitialPage/Sidebar/stateSidebar";
import EadminLogin from "../Evaluator/Admin/EadminLogin";
import EadminHeader from "../InitialPage/Sidebar/eadminHeader";
import EadminSidebar from "../InitialPage/Sidebar/eadminSidebar";
import LogInTeam from "../Team/LogInTeam";
import TeacherPSW from "../Teacher/forgotPass";
import CollapsedSidebar from "../InitialPage/Sidebar/collapsedSidebar";
const AllRoutes = () => {
  const data = useSelector((state) => state?.admin?.toggle_header);
  const HeaderLayout = () => (
    <div className={`main-wrapper ${data ? "header-collapse" : ""}`}>
      <Header />
      <AdminSidebar />
      <Outlet />
      <ThemeSettings />
    </div>
  );
  const MentorHeaderLayout = () => (
    <div className={`main-wrapper ${data ? "header-collapse" : ""}`}>
      <MentorHeader />
      <HorizontalSidebar />

      <Outlet />
      <ThemeSettings />
    </div>
  );
  const TeamHeaderLayout = () => (
    <div className={`main-wrapper ${data ? "header-collapse" : ""}`}>
      <TeamHeader />
      {/* <TeamSidebar /> */}
      {/* <OneSidebar /> */}
      <Condition/>

      <Outlet />
      <ThemeSettings />
    </div>
  );
  const EadminHeaderLayout = () => (
    <div className={`main-wrapper ${data ? "header-collapse" : ""}`}>
      <EadminHeader />
      <EadminSidebar />

      <Outlet />
      <ThemeSettings />
    </div>
  );
  const StateHeaderLayout = () => (
    <div className={`main-wrapper ${data ? "header-collapse" : ""}`}>
      <StateHeader />
      <StateSidebar />

      <Outlet />
      <ThemeSettings />
    </div>
  );

  const Authpages = () => (
    <div className={data ? "header-collapse" : ""}>
      <Outlet />
      <ThemeSettings />
    </div>
  );

  // const Pospages = () => (
  //   <div>
  //     <Header />
  //     <Outlet />
  //     {/* <Loader /> */}
  //     <ThemeSettings />
  //   </div>
  // );
  function MyComponent() {
    window.location.href = `${process.env.REACT_APP_LANDING_PAGE_URL}`;
    return null;
}
  return (
    <div>
      <Routes>
        {/* <Route path="/pos" element={<Pospages />}>
          {posRoutes.map((route, id) => (
            <Route path={route.path} element={route.element} key={id} />
          ))} */}
        {/* </Route> */}

        <Route path="/" exact={true} element={<MyComponent />} />
        <Route path="/">
          <Route path="/registration" element={<AtlPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/atl-register" element={<AtlPage />} /> */}
          <Route path="/atl-success" element={<AtlSucess />} />
          <Route path="/non-atl-success" element={<NonAtlSuccess />} />

          <Route path="/non-atl-register" element={<NonAtlPage />} />
          <Route path="/teacher-forgot-psw" element={<TeacherPSW />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/state" element={<StateLogin />} />
          <Route path="/eadmin" element={<EadminLogin />} />
          <Route path="/team" element={<LogInTeam />} />
          <Route path="/teacher" element={<LogInTeacher />} />
        </Route>
        <Route path="/" element={<HeaderLayout />}>
          {publicRoutes.map((route, id) => (
            <Route
              key={id}
              path={route.path}
              element={
                route.protected ? (
                  <ProtectedRoute user="ADMIN">{route.element}</ProtectedRoute>
                ) : (
                  route.element
                )
              }
            />
          ))}
        </Route>
        <Route path="/" element={<MentorHeaderLayout />}>
          {mentorRoutes.map((route, id) => (
            <Route
              key={id}
              path={route.path}
              element={
                route.protected ? (
                  <ProtectedRoute user="MENTOR">{route.element}</ProtectedRoute>
                ) : (
                  route.element
                )
              }
            />
          ))}
        </Route>
        <Route path="/" element={<TeamHeaderLayout />}>
          {teamRoutes.map((route, id) => (
            <Route
              key={id}
              path={route.path}
              element={
                route.protected ? (
                  <ProtectedRoute user="TEAM">{route.element}</ProtectedRoute>
                ) : (
                  route.element
                )
              }
            />
          ))}
        </Route>
        <Route path="/" element={<EadminHeaderLayout />}>
          {eadminRoutes.map((route, id) => (
            <Route
              key={id}
              path={route.path}
              element={
                route.protected ? (
                  <ProtectedRoute user="EADMIN">{route.element}</ProtectedRoute>
                ) : (
                  route.element
                )
              }
            />
          ))}
        </Route>
        <Route path="/" element={<StateHeaderLayout />}>
          {stateRoutes.map((route, id) => (
            <Route
              key={id}
              path={route.path}
              element={
                route.protected ? (
                  <ProtectedRoute user="STATE">{route.element}</ProtectedRoute>
                ) : (
                  route.element
                )
              }
            />
          ))}
        </Route>
        <Route path={"/"} element={<Authpages />}>
          {pagesRoute.map((route, id) => (
            <Route path={route.path} element={route.element} key={id} />
          ))}
        </Route>
      </Routes>
    </div>
  );
};
export default AllRoutes;
