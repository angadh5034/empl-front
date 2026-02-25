import './App.css';

import AddEmployee from './Addemployee';
import ViewEmployee from './ViewEmployee';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import Services from './Services';
import EmployeeDashboard from './EmployeeDashboard';
import Navbar from './Navbar';
import Home from './Home'
import Registration from './Registration'
import EmpNav from './EmpNav';

import { Routes, Route } from 'react-router-dom';
import LeaveForm from './LeaveForm';
import UpdateLeaveStatus from './UpdateLeaveStatus';
import MyLeave from './MyLeave';
import HomeNavbar from './HomeNavbar';

function App() {

  return (
    <div className="App">

      

        <AppContent></AppContent>

     

    </div>
  );
}

export default App;


function AppContent()
{

  let user = JSON.parse(localStorage.getItem("userinfo"));

  // ✅ FIXED LINE (string key used)
  let isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

  

  return(
    <div>
      {/* ✅ Navbar logic */}
      {
        isLoggedIn === true
        ?
          (
            user && user.role === "Admin"
              ? <Navbar />
              : <EmpNav />
          )
        :
          <HomeNavbar />
      }
      {/* {
        isLoggedIn === true && location.pathname !== "/" &&
        (user && user.role === "Admin" ? <Navbar/> : <EmpNav></EmpNav>)
      } */}
      
      <Routes>

        <Route path="/" element={<Home/>}/>

        <Route path="/ViewEmployee" element={<ViewEmployee />} />

        <Route path="/addemployee" element={<AddEmployee />} />

        <Route path="/about" element={<AboutUs />} />

        <Route path="/contact" element={<ContactUs />} />

        <Route path="/services" element={<Services />} />
        <Route path='/leaveForm' element={<LeaveForm/>}/>

        <Route path="/dashboard" element={<EmployeeDashboard />} />

        <Route path="/registration" element={<Registration/>}/>
        <Route path="/UpdateLeaveStatus" element={<UpdateLeaveStatus/>}/>
        <Route path="/myleave" element={<MyLeave/>}/>

      </Routes>
    </div>
  )
}
