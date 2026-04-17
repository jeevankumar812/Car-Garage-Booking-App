import { useState } from "react";
import ReviewForm from "../components/ReviewForm";
import ReviewsSection from "../components/ReviewsSection";

function Reviews() {
  const [reloadToken, setReloadToken] = useState(0);

  return (
    <div className="page">
      <div className="container" style={{ display: "grid", gap: 16 }}>
        <div className="sectionHeader">
          <h1 className="sectionTitle">Reviews</h1>
          <span className="muted" style={{ fontSize: 13 }}>
            See what customers say and leave your own rating.
          </span>
        </div>

        <ReviewForm onSubmitted={() => setReloadToken((t) => t + 1)} />
        <ReviewsSection variant="page" reloadToken={reloadToken} />
      </div>
    </div>
  );
}

export default Reviews;
