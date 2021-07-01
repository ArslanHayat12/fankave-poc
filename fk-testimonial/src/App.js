import { useReducer, useMemo, useState, useEffect } from "react";
import { TestimonialApp } from "./pages";
import { TestimonialContext } from "./context/TestimonialContext";
import { initialState } from "./context/TestimonialContext";
import { reducer } from "./reducers/reducers";
import {
  isSafari, isIOS
} from "react-device-detect";

import "./App.css";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  const [isNotSupported, setIsNotSupported] = useState(false)

  useEffect(()=>{
    if(isSafari || isIOS) {
      setIsNotSupported(true)
    }
  }, [])
  return (
    <TestimonialContext.Provider value={value}>
        <section className="main-container">
          {isNotSupported && (
          <div className="not-supported-container">
            <p>Unfortunately, this browser does not support the web technology that powers this app. We recommend desktop Chrome or Firefox.</p>
          </div>)}
          <article className="widget-wrapper">
            <TestimonialApp/>
          </article>
        </section>
    </TestimonialContext.Provider>
  );
}

export default App;
