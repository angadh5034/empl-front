import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function ViewEmployee() {

  // ================= STATE =================

  const [employee, setemployee] = useState([]);
  const [reload, setreload] = useState(false);
  const [showform, setshowform] = useState(false);

  // employee fields
  const [empid, setempid] = useState(0);
  const [firstname, setfirstname] = useState("");
  const [middelname, setmiddelname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [gender, setgender] = useState("");
  const [profile, setprofile] = useState("");
  const [contactno, setcontactno] = useState("");
  const [panno, setpanno] = useState("");
  const [adharno, setadharno] = useState("");
  const [dob, setdob] = useState("");
  const [address, setaddress] = useState("");
  const [department, setdepartment] = useState("");
  const [designation, setdesignation] = useState("");
  const [exp, setexp] = useState("");
  const [joiningdate, setjoiningdate] = useState("");
  const [worklocatin, setworklocatin] = useState("");
  const [status, setstatus] = useState("");
  const [salary, setsalary] = useState("");
  const [reportingmaneger, setreportingmaneger] = useState("");

  // search state
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
  }, [reload,app]);

  // ================= DELETE =================

  const deleteemp = (empid) => {

    if (!window.confirm("Do you want to permanently delete this record?"))
      return;

    axios.delete(`${app}/Employee/delete/${empid}`)
      .then((response) => {

        if (response.data === "Employee deleted successfully") {

          alert(response.data)
          setreload(!reload)
          setshowform(false);

        }
      })
      .catch(() => {
        alert("Error deleting employee");
      });

  };

  // ================= READY TO UPDATE =================

  const readytoupdate = (e) => {

    setshowform(true);

    setempid(e.empid);
    setfirstname(e.firstname);
    setmiddelname(e.middelname);
    setlastname(e.lastname);
    setemail(e.email);
    setgender(e.gender);
    setprofile(e.profile);
    setcontactno(e.contactno);
    setpanno(e.panno);
    setadharno(e.adharno);
    setdob(e.dob);
    setaddress(e.address);
    setdepartment(e.department);
    setdesignation(e.designation);
    setexp(e.exp);
    setjoiningdate(e.joiningdate);
    setworklocatin(e.worklocatin);
    setstatus(e.status);
    setsalary(e.salary);
    setreportingmaneger(e.reportingmaneger);

  };

  // ================= UPDATE =================

  const updateemp = (event) => {

    event.preventDefault();

    const newemp = {

      firstname,
      middelname,
      lastname,
      email,
      gender,
      contactno,
      panno,
      dob,
      adharno,
      address,
      department,
      designation,
      joiningdate,
      exp,
      worklocatin,
      status,
      salary,
      reportingmaneger,
      profile

    };

    axios.put(
      `${app}/Employee/update/${empid}`,
      newemp
    )
      .then((response) => {

        if (response.data ==="Employee updated successfully") {

          alert(response.data);
          setreload(!reload);
          setshowform(false);
          

        }

      })
      .catch(() => {
        alert("Error updating employee");
      });

  };

  // ================= PROFILE IMAGE =================

  const handleprofile = (event) => {

    const file = event.target.files[0];

    if (!file) return;

    const filepath = `./img/${file.name}`;

    setprofile(filepath);

  };

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
                    <p>EmpID: {e.empid}</p>
                  <p>Email: {e.email}</p>

                  <p>Contact: {e.contactno}</p>

                  <p>Department: {e.department}</p>

                  <p>Designation: {e.designation}</p>

                  <div className="d-flex gap-2">

                    <button
                      className="btn btn-primary"
                      onClick={() => readytoupdate(e)}
                    >
                      Update
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={() => deleteemp(e.empid)}
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))}

      </div>

      {/* UPDATE MODAL */}

      {showform && (

        <div className="modal show d-block">

          <div className="modal-dialog modal-lg">

            <div className="modal-content">

              <div className="modal-header">

                <h5>Update Employee</h5>

                <button
                  className="btn-close"
                  onClick={() => setshowform(false)}
                />

              </div>

              <div className="modal-body">

                <form onSubmit={updateemp}>

                  <div className="row">

                    <div className="col-md-4">

                      <label>First Name</label>

                      <input
                        className="form-control"
                        value={firstname}
                        onChange={(e) =>
                          setfirstname(e.target.value)}
                      />

                    </div>

                    <div className="col-md-4">

                      <label>Last Name</label>

                      <input
                        className="form-control"
                        value={lastname}
                        onChange={(e) =>
                          setlastname(e.target.value)}
                      />

                    </div>

                    <div className="col-md-4">

                      <label>Email</label>

                      <input
                        className="form-control"
                        value={email}
                        onChange={(e) =>
                          setemail(e.target.value)}
                      />

                    </div>
                    <div className="row mt-3">

                    <div className="col-md-4">
                      <label>Middle Name</label>
                      <input
                        className="form-control"
                        value={middelname}
                        onChange={(e) => setmiddelname(e.target.value)}
                      />
                    </div>

                    <div className="col-md-4">
                      <label>Gender</label>
                      <input
                        className="form-control"
                        value={gender}
                        onChange={(e) => setgender(e.target.value)}
                      />
                    </div>

                    <div className="col-md-4">
                      <label>Contact No</label>
                      <input
                        className="form-control"
                        value={contactno}
                        onChange={(e) => setcontactno(e.target.value)}
                      />
                    </div>

                  </div>


                  <div className="row mt-3">

                    <div className="col-md-4">
                      <label>PAN No</label>
                      <input
                        className="form-control"
                        value={panno}
                        onChange={(e) => setpanno(e.target.value)}
                      />
                    </div>

                    <div className="col-md-4">
                      <label>Adhar No</label>
                      <input
                        className="form-control"
                        value={adharno}
                        onChange={(e) => setadharno(e.target.value)}
                      />
                    </div>

                    <div className="col-md-4">
                      <label>DOB</label>
                      <input
                        type="date"
                        className="form-control"
                        value={dob}
                        onChange={(e) => setdob(e.target.value)}
                      />
                    </div>

                  </div>


                  <div className="row mt-3">

                    <div className="col-md-4">
                      <label>Address</label>
                      <input
                        className="form-control"
                        value={address}
                        onChange={(e) => setaddress(e.target.value)}
                      />
                    </div>

                    <div className="col-md-4">
                      <label>Department</label>
                      
                      <input
                        className="form-control"
                        value={department}
                        onChange={(e) => setdepartment(e.target.value)}
                        
                      />
                    </div>

                    <div className="col-md-4">
                      <label>Designation</label>
                      <input
                        className="form-control"
                        value={designation}
                        onChange={(e) => setdesignation(e.target.value)}
                      />
                    </div>

                  </div>


                  <div className="row mt-3">

                    <div className="col-md-4">
                      <label>Experience</label>
                      <input
                        className="form-control"
                        value={exp}
                        onChange={(e) => setexp(e.target.value)}
                      />
                    </div>

                    <div className="col-md-4">
                      <label>Joining Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={joiningdate}
                        onChange={(e) => setjoiningdate(e.target.value)}
                      />
                    </div>

                    <div className="col-md-4">
                      <label>Work Location</label>
                      <input
                        className="form-control"
                        value={worklocatin}
                        onChange={(e) => setworklocatin(e.target.value)}
                      />
                    </div>

                  </div>


                  <div className="row mt-3">

                    <div className="col-md-4">
                      <label>Status</label>
                      <input
                        className="form-control"
                        value={status}
                        onChange={(e) => setstatus(e.target.value)}
                      />
                    </div>

                    <div className="col-md-4">
                      <label>Salary</label>
                      <input
                        className="form-control"
                        value={salary}
                        onChange={(e) => setsalary(e.target.value)}
                      />
                    </div>

                    <div className="col-md-4">
                      <label>Reporting Manager</label>
                      <input
                        className="form-control"
                        value={reportingmaneger}
                        onChange={(e) => setreportingmaneger(e.target.value)}
                      />
                    </div>

                  </div>


                  </div>

                  <div className="mt-3">

                    <label>Profile Image</label>

                    <input
                      type="file"
                      className="form-control"
                      onChange={handleprofile}
                    />

                    <img
                      src={profile}
                      alt="preview"
                      style={{ height: "120px" }}
                      className="mt-2"
                    />

                  </div>

                  <button
                    type="submit"
                    onClick={(event)=> updateemp(event)}
                    className="btn btn-success mt-3"
                  >
                  Update Employee
                  </button>

                </form>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}
