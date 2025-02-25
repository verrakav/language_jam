import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

// components
import Layout from "./components/Layout";
import Home from "./components/Pages/Home";
import SignIn from "./components/Pages/SignIn";
import Dictionary from "./components/Pages/Dictionary";
import Study from "./components/Pages/Study";

export default function AppContainer() {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <div className="flex flex-grow p-4">
          <Layout>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/dictionary" element={<Dictionary />} />
              <Route path="/study" element={<Study />} />
            </Routes>
          </Layout>
        </div>
      </Router>
    </div>
  );
}
