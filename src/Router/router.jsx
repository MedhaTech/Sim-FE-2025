/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "../InitialPage/Sidebar/Header";
import Sidebar from "../InitialPage/Sidebar/Sidebar";
import { pagesRoute, posRoutes, publicRoutes } from "./router.link";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import ThemeSettings from "../InitialPage/themeSettings";
import FirstPage from "../RegPage/FirstPage";
import LoginPage from "../RegPage/LoginPage";
import LogInTeacher from "../Teacher/LogInTeacher";
import AtlPage from "../RegPage/AtlPage";
import AdminLogin from "../Admin/AdminLogin";
import NonAtlPage from "../RegPage/NonAtlPage";
import AtlSucess from "../RegPage/AtlSucess";
import NonAtlSuccess from "../RegPage/NonAtlSuccess";
import { ProtectedRoute } from "../helpers/authHelper";
const AllRoutes = () => {
  const data = useSelector((state) => state?.admin?.toggle_header);
  // console.log(data, "data");
  const HeaderLayout = () => (
    <div className={`main-wrapper ${data ? "header-collapse" : ""}`}>
      {/* <Loader /> */}
      <Header />
      <Sidebar />
      <Outlet />
      <ThemeSettings />
    </div>
  );

  const Authpages = () => (
    <div className={data ? "header-collapse" : ""}>
      <Outlet />
      {/* <Loader /> */}
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

  return (
    <div>
      <Routes>
        {/* <Route path="/pos" element={<Pospages />}>
          {posRoutes.map((route, id) => (
            <Route path={route.path} element={route.element} key={id} />
          ))} */}
        {/* </Route> */}
        <Route path="/" element={<Navigate to="/teacher" />} />
        <Route path="/">
          <Route path="/registration" element={<FirstPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/atl-register" element={<AtlPage />} />
          <Route path="/atl-success" element={<AtlSucess />} />
          <Route path="/non-atl-success" element={<NonAtlSuccess />} />

          <Route path="/non-atl-register" element={<NonAtlPage />} />

          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/teacher" element={<LogInTeacher />} />

          {/* <Route
          path="/admin/dashboard"
          element={
            <>
              <ProtectedRoute user="ADMIN" element={<HeaderLayout />}>
                <Dashboard />
              </ProtectedRoute>
            </>
          }
        /> */}

          {/* <Route
            path="/admin/profile"
            element={
              <ProtectedRoute user="ADMIN" element={<Authpages />}>
                <AdminProfile />
              </ProtectedRoute>
            }
          /> */}
        </Route>
        <Route path={"/"} element={<HeaderLayout />}>
          {/* {publicRoutes.map((route, id) => (
            <>
              <ProtectedRoute
                user="ADMIN"
                path={route.path}
                element={route.element}
                key={id}
              />
            </>
          ))} */}
          {/* {publicRoutes.map((route, id) => (
            <Route
              key={id}
              path={route.path}
              element={
                <ProtectedRoute user="ADMIN">{route.element}</ProtectedRoute>
              }
            />
          ))} */}
          <Route path="/" element={<HeaderLayout />}>
            {publicRoutes.map((route, id) => (
              <Route
                key={id}
                path={route.path}
                element={
                  route.protected ? (
                    <ProtectedRoute user="ADMIN">
                      {route.element}
                    </ProtectedRoute>
                  ) : (
                    route.element
                  )
                }
              />
            ))}
          </Route>
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
