import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
// import {WordContextProvider} from "./context/WordsContext.tsx";
import AppContainer from "./AppContainer.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <WordContextProvider> */}
    <AppContainer />
    {/* </WordContextProvider> */}
  </StrictMode>
);
