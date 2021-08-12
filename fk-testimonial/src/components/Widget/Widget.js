import React, {
  useReducer,
  useMemo,
  useContext,
  useState,
  useEffect,
} from "react";
import { ThemeContext } from "styled-components";

import { TestimonialApp } from "./../../pages";
import {
  TestimonialContext,
  initialState,
} from "./../../context/TestimonialContext";
import { reducer } from "./../../reducers/reducers";
import Footer from "./../Footer/Footer";

import { WidgetStyled } from "./style.js";

function Widget() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  const theme = useContext(ThemeContext);
  const [displayGif, setDisplayGif] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayGif(false);
    }, 5000);
    return () => clearTimeout(timer);
  });

  const {
    default: {
      widget: {
        background,
        logo: { position, url },
      },
    },
  } = theme;
  return (
    <TestimonialContext.Provider value={value}>
      <WidgetStyled className="main-container" id="fk-main-container">
        {!(window.MediaRecorder || window.webkitMediaRecorder) && (
          <div className="not-supported-container">
            <p>
              Unfortunately, this browser does not support the web technology
              that powers this app. We recommend desktop Chrome or Firefox.
            </p>
          </div>
        )}
        <article className="widget-wrapper" id="fk-widget-wrapper">
          <img src={background} className="widget-bg" />

          {displayGif ? (
            <img
              src={theme.default.widget.widgetGif.url}
              className="widget-gif"
            />
          ) : (
            <>
              <TestimonialApp />
              <Footer src={url} position={position} />
            </>
          )}
        </article>
      </WidgetStyled>
    </TestimonialContext.Provider>
  );
}

export default Widget;
