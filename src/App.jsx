import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import { TaskProvider } from "./contexts/TaskContext";
import Landing from "./pages/Landing";
import {DomainRecordProvider} from "./contexts/DomainRecordContext";
import Records from "./components/Record";
import Container from "./components/UI/Container";
import SideBar from "./components/SideBar";
import RecordTypeDistributionChart from "./components/Charts/RecordTypeDistributionChart";
import DomainRecordChart from "./components/Charts/DomainRecordChart";

function App() {
  return (
    <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/" element={<Landing />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/dashboard/record" element={
            <Container>
              <ProtectedRoute>
                <SideBar/>
                <Records />
              </ProtectedRoute>
            </Container>
          } />
          <Route path="/dashboard/domain/chart" element={
            <Container>
              <ProtectedRoute>
              <SideBar/>
              <DomainRecordChart/>
              </ProtectedRoute>
            </Container>
          } />
          <Route path="/dashboard/record/chart" element={
            <Container>
              <ProtectedRoute>
              <SideBar/>
              <RecordTypeDistributionChart/>
              </ProtectedRoute>
            </Container>
          } />
        </Routes>
    </AuthProvider>
  );
}

export default App;
