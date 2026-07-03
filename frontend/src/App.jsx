import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Reels from "./pages/Reels";
import CreatePost from "./components/CreatePost";
import Message from "./pages/Message";
import Chat from "./pages/chat";
import Notifications from "./pages/Notifications";
import Search from "./pages/Search";
import Followers from "./pages/Followers";
import Following from "./pages/Following";
import UserProfile from "./pages/UserProfile";
import Users from "./pages/Users";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/reels" element={<Reels />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/messages" element={<Message />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/search" element={<Search />} />
        <Route path="/followers" element={<Followers />} />
        <Route path="/following" element={<Following />} />
       <Route path="/user/:id" element={<UserProfile />} />
       <Route path="/users" element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;