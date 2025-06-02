import {Routes, Route} from "react-router-dom";
import Login from "./Pages/Login";
import DashboardLayout from "./Components/SdashboardLayout";
import Post from "./Pages/Posts";
import Editor from "./Components/PostEditor"
import Users from "./Pages/Users";
import Departments from "./Pages/Departments";
import Profile from "./Pages/Profile";
import Category from "./Components/Category";


function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Login />} />

      {/* Private Layout with Sidebar + Topbar */}
      <Route path="/dashboardLayout" element={<DashboardLayout />}>
        < Route path="new-post" element={<Post />} >
          <Route path="editor" element={<Editor />} />
          </Route>
        <Route path="users" element={<Users />} />
        <Route path="departments" element={<Departments />} />
        <Route path="profile" element={<Profile />} />
        <Route path="category" element={<Category />} />
      </Route>
    </Routes>
  );
}

export default App;
