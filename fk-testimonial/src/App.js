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
          <article className="widget-wrapper">
            <TestimonialApp/>
          </article>
        </section>
    </TestimonialContext.Provider>
  );
}

export default App;
