import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import DashboardLayout from './Components/SdashboardLayout';
import Sidebar from "./Components/Side"
import Topbar from './Components/Topbar';
import DadminDashboard from './Pages/DadminDashboard';
import UserDashboard from './Pages/UserDashboard';



function App() {
  const [user, setUser] = useState(null)

  return (
    <div >
      {user && <Sidebar />}
      
      <main>
        {user && <Topbar />} 
        {/* <Topbar /> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboardLayout" element={<DashboardLayout />} />
          <Route path="/dadmindashboard" element={<DadminDashboard />} />
          <Route path="/userdashboard" element={<UserDashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App
