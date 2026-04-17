import { useNavigate } from "react-router-dom";
import ReviewsSection from "../components/ReviewsSection";

function Home() {
  const navigate = useNavigate();

  const handleBook = () => {
    const token = localStorage.getItem("token");
    navigate(token ? "/booking" : "/login");
  };

  return (
    <div className="page homeBg">
      <div className="homeOverlay">

        <div className="container">
          {/* HERO */}
          <section className="homeHero">
            <div className="homeHeroInner">
              <span className="badge">Simple booking</span>
              <h1 className="homeHeroTitle">Car service bookings made easy.</h1>
              <p className="muted homeHeroSubtitle">
                Browse services, pick a slot, and track your booking — all in one place.
              </p>

              <div className="homeHeroActions">
                <button className="btn btnPrimary" onClick={handleBook}>
                  Book now
                </button>
                <button className="btn" onClick={() => navigate("/services")}>
                  View services
                </button>
              </div>
            </div>
          </section>

          {/* QUICK FEATURES */}
          <section className="homeQuick">
            <div className="homeQuickGrid">
              <div className="card cardPad homeQuickCard">
                <div className="homeQuickTitle">Browse</div>
                <div className="muted homeQuickText">See services and pricing.</div>
              </div>
              <div className="card cardPad homeQuickCard">
                <div className="homeQuickTitle">Book</div>
                <div className="muted homeQuickText">Choose date and time slot.</div>
              </div>
              <div className="card cardPad homeQuickCard">
                <div className="homeQuickTitle">Track</div>
                <div className="muted homeQuickText">Check status in Dashboard.</div>
              </div>
            </div>
          </section>
          {/* SERVICES SECTION */}
          <div className="servicesSection">
            <div className="sectionHeader" style={{ justifyContent: "center" }}>
              <h2 className="sectionTitle">Our Services</h2>
              <span className="badge">Popular</span>
            </div>
            <p className="muted" style={{ marginTop: 8, fontSize: 13 }}>
              A few of our most requested services. View full catalog for pricing and details.
            </p>

            <div className="homeServicesGrid">

              <div className="homeServiceCard">
                <img
                  src="https://images.pexels.com/photos/13065699/pexels-photo-13065699.jpeg"
                  alt="Oil Change"
                />
                <h4>Oil Change</h4>
                <p>Keep your engine running smoothly with regular oil service.</p>
              </div>

              <div className="homeServiceCard">
                <img
                  src="https://images.pexels.com/photos/31154194/pexels-photo-31154194.jpeg"
                  alt="Car Wash"
                />
                <h4>Car Wash</h4>
                <p>Complete exterior and interior cleaning service.</p>
              </div>

              <div className="homeServiceCard">
                <img
                  src="https://images.pexels.com/photos/8986047/pexels-photo-8986047.jpeg"
                  alt="Engine Repair"
                />
                <h4>Engine Repair</h4>
                <p>Professional engine diagnostics and repair solutions.</p>
              </div>

              <div className="homeServiceCard">
                <img
                  src="https://images.pexels.com/photos/34277926/pexels-photo-34277926.jpeg"
                  alt="Brake Service"
                />
                <h4>Brake Service</h4>
                <p>Ensure safety with reliable brake inspection and repair.</p>
              </div>

            </div>

          {/* WHY CHOOSE US */}
          <div className="extraSection">
            <div className="sectionHeader" style={{ justifyContent: "center" }}>
              <h2 className="sectionTitle">Why Choose Our Garage?</h2>
              <span className="badge">Quality first</span>
            </div>
            <p className="muted" style={{ marginTop: 8, fontSize: 13 }}>
              Professional standards, clear pricing, and an easy booking experience.
            </p>

            <div className="extraGrid">
              <div className="extraCard">
                <h4>Expert Mechanics</h4>
                <p>Highly skilled professionals for quality service.</p>
              </div>

              <div className="extraCard">
                <h4>Transparent Pricing</h4>
                <p>Transparent pricing with no hidden costs.</p>
              </div>

              <div className="extraCard">
                <h4>Fast Service</h4>
                <p>Quick turnaround with real-time updates.</p>
              </div>
            </div>
          </div>

          <ReviewsSection />

          </div>

        </div>

      </div>
    </div>
  );
}

export default Home;