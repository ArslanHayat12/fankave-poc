import { React } from "react";

import PageWrapper from "./components/PageWrapper/PageWrapper";
import Widget from "./components/Widget/Widget";

import "./App.css";

function App() {
  return <PageWrapper children={<Widget />} />;
}

export default App;
