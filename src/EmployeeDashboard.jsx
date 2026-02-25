import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function EmployeeDashboard() {

  // ================= STATE =================

  const [employee, setemployee] = useState([]);

  const [searchby, setsearchby] = useState("");
  const [keyword, setkeyword] = useState("");
  const [serachresult, setserachresult] = useState([]);
  
const app=process.env.REACT_APP_SERVER_IP;

  // ================= LOAD EMPLOYEES =================

  useEffect(() => {
    axios.get(`${app}/Employee/getemp`)
      .then((response) => {
        console.log(response.data);
        setemployee(response.data);
      })
      .catch(() => {
        alert("Error loading employees");
      });
  }, [app]);

  // ================= SEARCH =================

  const serachemployee = () => {

    let url = "";
  
    if (searchby === "firstname")
      url = `${app}/Employee/firstname/${keyword}`;
  
    else if (searchby === "lastname")
      url = `${app}/Employee/lastname/${keyword}`;
  
    else if (searchby === "designation")
      url = `${app}/Employee/designation/${keyword}`;
  
    else if (searchby === "department")
      url = `${app}/Employee/department/${keyword}`;
  
    else {
      alert("Please select search type");
      return;
    }
  
    axios.get(url)
      .then((response) => {
  
        if (response.data.length === 0) {
  
          alert("No matching record found");
          setserachresult([]);
  
        } else {
  
          setserachresult(response.data);
  
        }
  
      })
      .catch((error) => {
  
        console.log(error);
        alert("Search failed");
  
      });
  
  };
  

  // ================= UI =================

  return (

    <div className="container mt-3">

      <h3 className="text-center mb-4">Employee List</h3>

      {/* SEARCH */}

      <div className="d-flex gap-3 mb-4">

        <select
          className="form-select w-auto"
          onChange={(e) => setsearchby(e.target.value)}
        >
          <option value="">Search By</option>
          <option value="firstname">First Name</option>
          <option value="lastname">Last Name</option>
          <option value="designation">Designation</option>
          <option value="department">Department</option>
        </select>

        {searchby && (

          <>
            <input
              className="form-control w-auto"
              type="text"
              placeholder={`Enter ${searchby}`}
              onChange={(e) => setkeyword(e.target.value)}
            />

            <button
              className="btn btn-warning"
              onClick={serachemployee}
            >
              Search
            </button>
          </>

        )}

      </div>

      {/* EMPLOYEE CARDS */}

      <div className="row">

        {(serachresult.length > 0 ? serachresult : employee)
          .map((e) => (

            <div className="col-md-3 mb-3" key={e.empid}>

              <div className="card">

                <img
                  src={e.profile}
                  className="card-img-top"
                  alt="profile"
                />

                <div className="card-body">

                  <h5>
                    {e.firstname} {e.middelname} {e.lastname}
                  </h5>

                  <p>Email: {e.email}</p>

                  <p>Contact: {e.contactno}</p>

                  <p>Department: {e.department}</p>

                  <p>Designation: {e.designation}</p>


                </div>

              </div>

            </div>

          ))}

      </div>

    </div>

  );

}
