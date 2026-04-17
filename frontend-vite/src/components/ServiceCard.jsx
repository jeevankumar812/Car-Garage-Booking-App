function ServiceCard({ service }) {
  return (
    <div className="card">
      <div className="cardPad">
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "baseline" }}>
          <h3 style={{ margin: 0, fontSize: 16, letterSpacing: "-0.2px" }}>{service.name}</h3>
          <span className="badge">₹{service.price}</span>
        </div>
        <p className="muted" style={{ margin: "10px 0 0", fontSize: 13 }}>
          {service.description}
        </p>
      </div>
    </div>
  );
}

export default ServiceCard;