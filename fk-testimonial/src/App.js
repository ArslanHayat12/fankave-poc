import { useReducer, useMemo } from "react";
import { TestimonialApp } from "./pages";
import { TestimonialContext } from "./context/TestimonialContext";
import { initialState } from "./context/TestimonialContext";
import { reducer } from "./reducers/reducers";

import "./App.css";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <TestimonialContext.Provider value={value}>
      <section className="main-container">
        {!(window.MediaRecorder || window.webkitMediaRecorder) && (
          <div className="not-supported-container">
            <p>
              Unfortunately, this browser does not support the web technology
              that powers this app. We recommend desktop Chrome or Firefox.
            </p>
          </div>
        )}
        <article className="widget-wrapper">
          <TestimonialApp />
        </article>
      </section>
    </TestimonialContext.Provider>
  );
}

export default App;
