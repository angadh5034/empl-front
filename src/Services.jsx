import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Services() {

  const services = [
    {
      title: "Web Development",
      desc: "We create modern websites using React and Spring Boot"
    },
    {
      title: "Mobile App Development",
      desc: "Android and iOS mobile applications"
    },
    {
      title: "Cloud Services",
      desc: "AWS cloud deployment and management"
    }
  ];

  return (
    <div className="container mt-4">

      <h2 className="text-center mb-4">Our Services</h2>

      <div className="row">

        {services.map((service, index) => (

          <div className="col-md-4" key={index}>

            <div className="card shadow mb-4">

              <div className="card-body">

                <h5>{service.title}</h5>

                <p>{service.desc}</p>

                <button className="btn btn-primary">
                  Learn More
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}
