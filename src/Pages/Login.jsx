import React, {useState} from "react";
import "./Login.css";
import Logo from "../assets/Group.png";
import {MdOutlineEmail} from "react-icons/md";
import {RiLockPasswordLine} from "react-icons/ri";
import Button from "../Props/Button";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
          body:JSON.stringify({email, password}),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Login successful!");
        //redirect user
      } else {
        alert(data.message || "Login failed.");
      }
    }
    catch (error) {
      console.error("Error:", error);
      alert("something went wrong, please try again");
    }
  };

  return (
    <div className="main">
      <div className="card">
        <div className="card-content">
          <h1 className="title">WE SHARE <span>WE GROW</span></h1>
          <div className="card-body">
            <div className="login">
              <h1>WELCOME</h1>
              <form action="">
                <label htmlFor="Email"> </label>
                <div className="email">
                  <MdOutlineEmail className="email-icon" />
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your Email"
                    required
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <label htmlFor="Email"> </label>
                <div className="password">
                  <RiLockPasswordLine className="password-icon" />
                  <input
                    type="password"
                    placeholder="password"
                    id="name"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button
                  label="Login"
                  onClick={handleLogin}
                  type="submit"
                  className="btn"
                />
              </form>
            </div>
            <div className="logo">
                          <img src={Logo} alt="" />
                          <p>"connect with your colleagues with ease"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
