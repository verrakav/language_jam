import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

// components
import Layout from "./components/Layout";
import HomePage from "./components/Pages/HomePage";
import SignInPage from "./components/Pages/SignInPage";
import DictionaryPage from "./components/Pages/DictionaryPage";
import StudyPage from "./components/Pages/StudyPage";
// context
import {WordContextProvider} from "./context/WordsContext.tsx";

export default function AppContainer() {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <WordContextProvider>
          <div className="flex flex-grow p-4">
            <Layout>
              <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/dictionary" element={<DictionaryPage />} />
                <Route path="/study" element={<StudyPage />} />
              </Routes>
            </Layout>
          </div>
        </WordContextProvider>
      </Router>
    </div>
  );
}
