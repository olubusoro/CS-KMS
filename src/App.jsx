import {Routes, Route} from "react-router-dom";
import Login from "./Pages/Login";
import DashboardLayout from "./Components/SdashboardLayout";
import Post from "./Pages/Posts";
import Editor from "./Components/PostEditor"

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Login />} />

      {/* Private Layout with Sidebar + Topbar */}
      <Route path="/dashboardLayout" element={<DashboardLayout />}>
        <Route path="new-post" element={<Post />} >
          <Route path="editor" element={<Editor />} />
          </Route>
          <Route path="/user" element={<User/>} />
      </Route>
    </Routes>
  );
}

export default App;
