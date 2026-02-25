import React from "react";
import Navbar from "./Navbar";
import EmpNav from "./EmpNav";

export default function Dashboard() {

  const user = JSON.parse(localStorage.getItem("userinfo"));

  if (!user) {
    return <h2>Please login first</h2>;
  }

  return (
    <div>

      {user.role === "Admin" ? <Navbar /> : <EmpNav />}

      <div className="container mt-4">
        <h2>Welcome, {user.username}</h2>
        <h4>Role: {user.role}</h4>
      </div>

    </div>
  );

}
