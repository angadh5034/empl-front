import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function Myleave() {

    const [leave, setLeave] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [reason, setReason] = useState("");
    const [todate, setTodate] = useState("");
    const [fromdate, setFromdate] = useState("");
    const [selectedLeave, setSelectedLeave] = useState(null);

    // get empid from localStorage
    const emp = JSON.parse(localStorage.getItem("userinfo"));
    const empid = emp?.empid;

    
const app=process.env.REACT_APP_SERVER_IP;

    // load leave data
    useEffect(() => {

        axios.get(`${app}/getleave/${empid}`)
            .then((res) => {
                setLeave(res.data);
            })
            .catch(() => {
                alert("Failed to fetch leave data");
            });

    }, [empid,app]);


    // reload leave list
    const fetchLeaves = (empid) => {

        axios
            .get(`${app}/getleave/${empid}`)
            .then((res) => setLeave(res.data))
            .catch(() => alert("Failed to load leaves"));

    };


    // update leave status (cancel)
    const cancel = (leaveid) => {

        axios.put(`${app}/cancelleave/${leaveid}`)
            .then((res) => {

                alert(res.data);

                // reload leave list
                fetchLeaves(empid);

            })
            .catch(() => {
                alert("Status update failed");
            });
    };


    // open modal and set selected leave
    const openModal = (l) => {

        setSelectedLeave(l);

        setFromdate(l.fromdate);

        setTodate(l.todate);

        setReason(l.reason);

        setShowModal(true);

    };


    // update leave
    const updateLeave = () => {

        if (!selectedLeave) {
            alert("No leave selected");
            return;
        }

        axios
            .put(`${app}/updateleave/${selectedLeave.leaveid}`, {
                fromdate,
                todate,
                reason,
            })
            .then(() => {

                alert("Leave updated");

                setShowModal(false);

                setSelectedLeave(null);

                fetchLeaves(empid);

            })
            .catch(() => alert("Update failed"));
    };



    return (
        <div className="container mt-4">

            <h2 className="text-center mb-4">My Leave List</h2>

            <table className="table table-bordered table-hover shadow">

                <thead className="table-dark">
                    <tr>
                        <th>Leave ID</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Emp ID</th>
                        <th>From Date</th>
                        <th>To Date</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>

                    {leave.length > 0 ? (

                        leave.map((l) => (

                            <tr key={l.leaveid}>

                                <td>{l.leaveid}</td>

                                <td>{l.firstname}</td>

                                <td>{l.lastname}</td>

                                <td>{l.employee?.empid}</td>

                                <td>{l.fromdate}</td>

                                <td>{l.todate}</td>

                                <td>{l.reason}</td>

                                <td>

                                    <span className={
                                        l.status === "approve"
                                            ? "text-success fw-bold"
                                            : l.status === "reject"
                                                ? "text-danger fw-bold"
                                                : "text-warning fw-bold"
                                    }>
                                        {l.status}
                                    </span>

                                </td>

                                <td>

                                    <button
                                        className="btn btn-success btn-sm me-2"
                                        onClick={() => openModal(l)}
                                    >
                                        Update
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => cancel(l.leaveid)}
                                    >
                                        Cancel
                                    </button>

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>
                            <td colSpan="9" className="text-center">
                                No leave records found
                            </td>
                        </tr>

                    )}

                </tbody>

            </table>


            {/* Modal */}
            {showModal && (

                <div className="modal d-block" style={{ background: "#00000088" }}>

                    <div className="modal-dialog">

                        <div className="modal-content p-3">

                            <h4 className="text-primary">Update Leave</h4>

                            <label>From Date</label>

                            <input
                                type="date"
                                className="form-control mb-2"
                                value={fromdate}
                                onChange={(e) => setFromdate(e.target.value)}
                            />


                            <label>To Date</label>

                            <input
                                type="date"
                                className="form-control mb-2"
                                value={todate}
                                onChange={(e) => setTodate(e.target.value)}
                            />


                            <label>Reason</label>

                            <textarea
                                className="form-control mb-3"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            />


                            <button
                                className="btn btn-success me-2"
                                onClick={updateLeave}
                            >
                                Save
                            </button>


                            <button
                                className="btn btn-secondary"
                                onClick={() => {

                                    setShowModal(false);

                                    setSelectedLeave(null);

                                }}
                            >
                                Close
                            </button>


                        </div>

                    </div>

                </div>

            )}


        </div>
    );
}