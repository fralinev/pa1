import "./global.css";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Users from "./Users";
import User from "./User";
import Home from "./Home";
import Layout from "./Layout";
import NoMatch from "./NoMatch";
import { UserContext } from "./context/userContext";
import { useState } from "react";
import Test from "./Test";
import Images from "./Images";
import ContactApp from "./Contact/ContactApp";

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  return (
    <div>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/test" element={<Test />} />
            <Route path="/images" element={<Images />} />
            <Route path="/contacts" element={<ContactApp />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Layout>
      </UserContext.Provider>
    </div>
  );
};
export default App;
