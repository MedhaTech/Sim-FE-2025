/* eslint-disable indent */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
// import { base_path } from "./environment.jsx";
import "../src/style/css/feather.css";
import "../src/style/css/line-awesome.min.css";
import "../src/style/scss/main.scss";
import "../src/style/icons/fontawesome/css/fontawesome.min.css";
import "../src/style/icons/fontawesome/css/all.min.css";
import { createRoot } from "react-dom/client";
// import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
// import store from "../src/redux/store";
import { configureStore } from "../src/redux/store";
import AllRoutes from "./Router/router.jsx";
// import Routes from "../src/Routes";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    // <React.StrictMode>
    <Provider store={configureStore()}>
      <BrowserRouter
      // basename={base_path}
      >
        {/* <I18nextProvider locale="en">
            <Routes />
          </I18nextProvider> */}
        <AllRoutes />
        {/* <Routes /> */}
      </BrowserRouter>
    </Provider>
    // </React.StrictMode>
  );
} else {
  console.error("Element with id 'root' not found.");
}
