import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { configureStore } from "./redux/store";
import reportWebVitals from "./reportWebVitals";
// import { StrictMode } from "react";

import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
const App = React.lazy(() => import(/* webpackChunkName: "App" */ "./App"));

const Main = () => {
  return (
    <Provider store={configureStore()}>
      {/* <Suspense fallback={<div className="loading" />}> */}
      <BrowserRouter>
        {/* <StrictMode> */}

        <App />
        {/* </StrictMode> */}
      </BrowserRouter>
      {/* </Suspense> */}
    </Provider>
  );
};

// createRoot.render(<Main />, document.getElementById("root"));
const root = createRoot(document.getElementById("root"));
root.render(<Main />);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
