import { useEffect, useState } from "react";
import axios from "axios";
import ServiceCard from "../components/ServiceCard";


function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const res = await axios.get("http://localhost:5000/api/services");
      setServices(res.data);
    };

    fetchServices();
  }, []);

  return (
    <div className="page servicesPage">
      <div className="container">

        {/* HEADER */}
        <div className="servicesHeader">
          <h2 className="sectionTitle">Our Services</h2>
          <span className="servicesCount">
            {services.length} available
          </span>
        </div>

        {/* EMPTY STATE */}
        {services.length === 0 ? (
          <div className="emptyState">No services found.</div>
        ) : (
          <div className="servicesGrid">
            {services.map((s) => (
              <div className="serviceWrapper" key={s._id}>
                <ServiceCard service={s} />
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Services;