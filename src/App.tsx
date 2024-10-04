import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CampaignsPage from "./pages/CampaignsPage";
import CampaignDetailPage from "./pages/CampaignDetailPage";
import EmailDetailPage from "./pages/EmailDetailPage";
import { Header } from "./components/ui/Header";

function App() {
  return (
    <Router>
      <Header />
      <main className="flex-grow pt-8 pb-8 pr-12 pl-12 space-y-8">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/campaigns" element={<CampaignsPage />} />
          <Route path="/campaigns/:id" element={<CampaignDetailPage />} />
          <Route path="/campaigns/:id/:eid" element={<EmailDetailPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
