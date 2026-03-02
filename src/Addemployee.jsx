import React from "react";
import {useState} from "react";
import axios from "axios";

function AddEmployee() {
   const [firstname, setFirstname] = useState("");
const [middelname, setMiddelname] = useState("");
const [lastname, setLastname] = useState("");
const [gender, setGender] = useState("");
const [email, setEmail] = useState("");
const [dob, setDob] = useState("");
const [contactno, setContactno] = useState("");
const [adharno, setAdharno] = useState("");
const [panno, setPanno] = useState("");
const [address, setAddress] = useState("");
const [profile, setProfile] = useState(null);
const [exp, setExp] = useState(0);
const [salary, setSalary] = useState(0);
const [joiningdate, setJoiningdate] = useState("");
const [designation, setDesignation] = useState("");
const [worklocatin, setWorklocatin] = useState("");
const [status, setStatus] = useState("");
const [reportingmaneger, setReportingmaneger] = useState("");
const [department, setDepartment] = useState("");
const[error, setError] = useState({});

const app=process.env.REACT_APP_SERVER_IP;


const validatation = () => {
  let newErrors = {};
  let today = new Date();

  // First Name (required, min 3 chars)
  if (!firstname || firstname.trim().length < 3) {
    newErrors.firstname = "First Name must be at least 3 characters";
    // alert(newErrors.firstname);
  }
// Middle Name (optional, if provided min 3 chars)
    if (middelname && middelname.trim().length < 3) {
    newErrors.middelname = "Middle Name must be at least 3 characters";
    }

  // Last Name (required)
  if (!lastname || lastname.trim() === "") {
    newErrors.lastname = "Last Name is required";
  }

  // Email (required + valid format)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    newErrors.email = "Email is required";
  } else if (!emailRegex.test(email)) {
    newErrors.email = "Invalid email format";
  }

  // Mobile (required, 10 digits)
  const mobileRegex = /^[0-9]{10}$/;
  if (!contactno) {
    newErrors.contactno = "Mobile number is required";
  } else if (!mobileRegex.test(contactno)) {
    newErrors.contactno = "Mobile must be 10 digits";
  }

  // Salary (>0)
  if (!salary || salary <= 0) {
    newErrors.salary = "Salary must be greater than 0";
  }

  // DOB (required, not future)
  if (!dob) {
    newErrors.dob = "Date of Birth is required";
  } else if (new Date(dob) > today) {
    newErrors.dob = "DOB cannot be future date";
  }

  // Joining Date (required, after DOB)
  if (!joiningdate) {
    newErrors.joiningdate = "Joining Date is required";
  } else if (dob && new Date(joiningdate) <= new Date(dob)) {
    newErrors.joiningdate = "Joining Date must be after DOB";
  }

  setError(newErrors);
  return Object.keys(newErrors).length === 0;
};




let handleprofile = (e) => {

  const files = e.target.files;

  if (!files || files.length === 0) {
    console.log("No file selected");
    return;
  }

  const file = files[0];

  if (!file.type.startsWith("image/")) {
    alert("Please select a valid image file");
    return;
  }

  const imageUrl = URL.createObjectURL(file);

  setProfile(imageUrl);

};
let addemp=(e) => {
    e.preventDefault();

     if (!validatation()) {
    return;
     // stop if validation fails
  }
    let employee = {firstname, middelname, lastname, gender, email, dob, contactno, adharno, panno, address, profile, exp, salary, joiningdate, designation, worklocatin, status, reportingmaneger, department}
    console.log(employee);
    axios.post(`${app}/Employee/addemp`,employee)

    .then((response) => {
        if(response.data === "Employee added successfully"){

        alert(response.data);
        alert("Employee Added Successfully");
        }
    })

    .catch((error) => {
        alert("Error adding employee. Please try again.");
    })
}
  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">
          <h4 className="text-center mb-4">Add Employee</h4>

          <form onSubmit={addemp}>

            {/* Personal Details */}
            <h5 className="mb-3">Personal Details</h5>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">First Name</label>
                <input type="text" className="form-control" onChange={(e) => setFirstname(e.target.value)} name="firstname" />
                {error.firstname && (<small className="text-danger">{error.firstname}</small>)}
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Middle Name</label>
                <input type="text" className="form-control" onChange={(e) => setMiddelname(e.target.value)} name="middlename" />
               
                
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Last Name</label>
                <input type="text" className="form-control" onChange={(e) => setLastname(e.target.value)} name="lastname" />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Gender</label>
                <select className="form-control" name="gender" onChange={(e) => setGender(e.target.value)}>
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} name="email" />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Date of Birth</label>
                <input type="date" className="form-control" onChange={(e) => setDob(e.target.value)} name="dob" />
                <small className="text-muted">Format: YYYY-MM-DD</small>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Contact Number</label>
                <input type="text" className="form-control" onChange={(e) => setContactno(e.target.value)} name="contactno" />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Aadhar Number</label>
                <input type="text" className="form-control" onChange={(e) => setAdharno(e.target.value)} name="adharno" />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">PAN Number</label>
                <input type="text" className="form-control" onChange={(e) => setPanno(e.target.value)} name="panno" />
              </div>
            </div>

          

            <div className="mb-3">
              <label className="form-label">Address</label>
              <textarea className="form-control" rows="2" onChange={(e) => setAddress(e.target.value)} name="address"></textarea>
            </div>

            {/* Professional Details */}
            <h5 className="mt-4 mb-3">Professional Details</h5>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Experience (Years)</label>
                <input type="number" className="form-control" onChange={(e) => setExp(e.target.value)} name="exp" />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Salary</label>
                <input type="number" className="form-control" onChange={(e) => setSalary(e.target.value)} name="salary" />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Joining Date</label>
                <input type="date" className="form-control" onChange={(e) => setJoiningdate(e.target.value)} name="joiningdate" />
                <small className="text-muted">Format: YYYY-MM-DD</small>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Department</label>
                <input type="text" className="form-control" onChange={(e) => setDepartment(e.target.value)} name="department" />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Designation</label>
                <input type="text" className="form-control" onChange={(e) => setDesignation(e.target.value)} name="designation" />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Reporting Manager</label>
                <input type="text" className="form-control" onChange={(e) => setReportingmaneger(e.target.value)} name="reportingmanager" />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Status</label>
                <select className="form-control" onChange={(e) => setStatus(e.target.value)} name="status">
                  <option value="">Select Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Work Location</label>
                <input type="text" className="form-control" onChange={(e) => setWorklocatin(e.target.value)} name="worklocation" />
              </div>
            </div>
  {/* Profile Image Upload */}
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Profile Photo</label>
                <input
                  type="file"
                  className="form-control"
                  name="profileImage"
                  accept="image/*"
                  onChange={(e) => handleprofile(e)}
                />
              </div>
              <div className="col-md-8 mb-3">
                  <label>Your profile look like this</label>
                  <br />

                  {profile && (
                    <img
                      src={profile}
                      alt="Employee Profile"
                      style={{ height: "120px" }}
                    />
                  )}

                </div>
            </div>
            <div className="text-center mt-3">
              <button type="submit" className="btn btn-primary px-4">
                Save Employee
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;