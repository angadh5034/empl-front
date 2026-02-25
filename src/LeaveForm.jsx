import axios from "axios";
import React, { useEffect, useState } from "react";

export default function LeaveForm() {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [fromdate, setfromdate] = useState("");
  const [todate, settodate] = useState("");
  const [reason, setreason] = useState("");
  const [empid, setempid] = useState("");
  const today=new Date().toISOString().split("T")[0];
  
const app=process.env.REACT_APP_SERVER_IP;

  // ✅ load user only once
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userinfo"));
    if (user) {
      setfirstname(user.firstname);
      setlastname(user.lastname);
      setempid(user.empid);
      console.log(new Date().toISOString().split("T")[0])
    }
  }, []);

  const leaveapply = (event) => {
    event.preventDefault();

    if(fromdate>todate)
    {
        alert("formdate is less than To date")
        return;
    }

    // ✅ FIX: send employee object
    const leave = {
      firstname,
      lastname,
      fromdate,
      todate,
      reason,
      employee: { empid : empid}   // ← FIXED
    };

    axios.post(`${app}/applyleave/${empid}`, leave)


      .then((response) => {
        alert(response.data);
        console.log(empid);
      })
      .catch((err) => {
      console.error(err);
      alert("Failed to apply leave: " + err.response?.data);
    });
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h3 className="text-center text-primary mb-4">
          Leave Application Form
        </h3>

        <form onSubmit={leaveapply}>
          <div className="mb-3">
            <label>First Name</label>
            <input type="text" value={firstname} readOnly className="form-control"/>
          </div>

          <div className="mb-3">
            <label>Last Name</label>
            <input type="text" value={lastname} readOnly className="form-control"/>
          </div>

          <div className="mb-3">
            <label>Emp Id</label>
            <input type="number" value={empid} readOnly className="form-control"/>
          </div>

          <div className="mb-3">
            <label>From Date</label>
            <input
              type="date"
              className="form-control" min={today}
              onChange={(e) => setfromdate(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>To Date</label>
            <input
              type="date"
              className="form-control"
              onChange={(e) => settodate(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Reason</label>
            <textarea
              className="form-control"
              onChange={(e) => setreason(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary w-100">
            Apply for Leave
          </button>
        </form>
      </div>
    </div>
  );
}