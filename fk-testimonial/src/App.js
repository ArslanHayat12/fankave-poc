import ThankYouScreen from "./pages/ThankYouScreen/ThankYouScreen";
import HomeScreen from "./pages/HomeScreen/HomeScreen";
import RecordScreen from "./pages/RecordScreen/RecordScreen";
import PreviewTestimonialScreen from "./pages/PreviewTestimonialScreen/PreviewTestimonialScreen";
import TestimonialScreen from "./pages/TestimonialScreen/TestimonialScreen";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { TestimonialContext } from "./context/TestimonialContext";
import { useReducer, useMemo } from "react";
import { initialState } from "./context/TestimonialContext";
import { reducer } from "./reducers/reducers";

import "./App.css";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <TestimonialContext.Provider value={value}>
      <Router>
        <section className="main-container">
          <article className="widget-wrapper">
            <Route path="/" exact component={HomeScreen} />
            <Route path="/RecordScreen" exact component={RecordScreen} />
            <Route
              path="/PreviewTestimonialScreen"
              exact
              component={PreviewTestimonialScreen}
            />
            <Route
              path="/TestimonialScreen"
              exact
              component={TestimonialScreen}
            />
            <Route path="/ThankYouScreen" exact component={ThankYouScreen} />
          </article>
        </section>
      </Router>
    </TestimonialContext.Provider>
  );
}

export default App;
