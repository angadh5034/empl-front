import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AboutUs() {
  return (
    <div className="container mt-4">

      <h2 className="text-center mb-4">About Our Company</h2>

      <div className="card shadow p-4">
        <h4>Company Introduction</h4>
        <p>
          We are a leading IT company providing modern software solutions.
          Our goal is to help businesses grow using technology.
        </p>

        <h4>Our Mission</h4>
        <p>
          Our mission is to deliver high quality software with best performance,
          security and user experience.
        </p>

        <h4>Our Vision</h4>
        <p>
          Our vision is to become a global leader in software development
          and innovation.
        </p>
      </div>

    </div>
  );
}
