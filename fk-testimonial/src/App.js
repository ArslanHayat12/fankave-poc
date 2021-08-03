import React, { useReducer, useMemo } from "react";
import { TestimonialApp } from "./pages";
import { useLocation } from "react-router-dom";
import { TestimonialContext } from "./context/TestimonialContext";
import { initialState } from "./context/TestimonialContext";
import { reducer } from "./reducers/reducers";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import "./App.css";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  //get type from url
  const search = useLocation().search;
  const type = new URLSearchParams(search).get("type");

  return (
    <TestimonialContext.Provider value={value}>
      <Header />
      <video
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        className="background-video"
        autoplay="true"
        muted
        minWidth="100%"
        minHeight="100%"
        id="fk-bg-video"
      />
      <section className="main-container" id="fk-main-container">
        {!(window.MediaRecorder || window.webkitMediaRecorder) && (
          <div className="not-supported-container">
            <p>
              Unfortunately, this browser does not support the web technology
              that powers this app. We recommend desktop Chrome or Firefox.
            </p>
          </div>
        )}
        <article className="widget-wrapper" id="fk-widget-wrapper">
          <TestimonialApp />
        </article>
      </section>
      <Footer />
    </TestimonialContext.Provider>
  );
}

export default App;
