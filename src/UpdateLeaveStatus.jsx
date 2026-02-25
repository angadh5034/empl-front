import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function UpdateLeaveStatus() {

    const [leave, setLeave] = useState([]);
    const [relode]=useState();
    
const app=process.env.REACT_APP_SERVER_IP;

    useEffect(() => {

        axios.get(`${app}/getallleave`)
            .then((res) => {
                setLeave(res.data);
            })
            .catch(() => {
                alert("Something wrong to get leave status");
            });

    }, [relode,app]); // important

    let update=(leaveid,status)=>{
        axios.put(`${app}/updateleavestatus/${leaveid}/${status}`)
        .then(()=>{
            if(Response.data==="Leave status updated successfully")
            {
                alert(Response.data)
            }

        })
        .catch((error)=>{
                alert(error)
        })
    }

    return (
        <div>

            <h2>Leave List</h2>

            <table className="table table-bordered table-hover shadow" >
                <thead className="table-dark">
                    <tr>
                        <th>Leaveid</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Empid</th>
                        <th>Fromdate</th>
                        <th>Todate</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>A/R</th>
                    </tr>
                </thead>

                <tbody>

                    {leave.map((l) => (

                        <tr key={l.leaveid}>
                            <td>{l.leaveid}</td>
                            <td>{l.firstname}</td>
                            <td>{l.lastname}</td>
                            <td>{l.employee?.empid}</td>
                            <td>{l.fromdate}</td>
                            <td>{l.todate}</td>
                            <td>{l.reason}</td>
                            <td>{l.status}</td>
                            <td>
                                <button className="but but-approve"
                                    onClick={() => update(l.leaveid,"approve")}>
                                    Approve
                                </button>

                                <button className="but but-reject"
                                    onClick={() => update(l.leaveid,"reject")}>
                                    Reject
                                </button>
                            </td>
                        </tr>
                    ))}

                </tbody>

            </table>

        </div>
    );
}
