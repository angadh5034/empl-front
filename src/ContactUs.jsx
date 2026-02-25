import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ContactUs() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [error, setError] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {

    let err = {};

    if (!form.name)
      err.name = "Name required";

    if (!form.email)
      err.email = "Email required";

    if (!form.phone)
      err.phone = "Phone required";

    if (!form.message)
      err.message = "Message required";

    return err;
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    let err = validate();

    if (Object.keys(err).length > 0) {
      setError(err);
    }
    else {
      alert("Message Sent Successfully");
      console.log(form);
    }
  };

  return (
    <div className="container mt-4">

      <h2>Contact Us</h2>

      <form onSubmit={handleSubmit} className="card p-4 shadow">

        <input
          className="form-control mb-2"
          name="name"
          placeholder="Enter Name"
          onChange={handleChange}
        />
        <span className="text-danger">{error.name}</span>


        <input
          className="form-control mb-2"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
        />
        <span className="text-danger">{error.email}</span>


        <input
          className="form-control mb-2"
          name="phone"
          placeholder="Enter Phone"
          onChange={handleChange}
        />
        <span className="text-danger">{error.phone}</span>


        <textarea
          className="form-control mb-2"
          name="message"
          placeholder="Enter Message"
          onChange={handleChange}
        />
        <span className="text-danger">{error.message}</span>


        <button className="btn btn-primary mt-3">
          Send
        </button>

      </form>

    </div>
  );
}
