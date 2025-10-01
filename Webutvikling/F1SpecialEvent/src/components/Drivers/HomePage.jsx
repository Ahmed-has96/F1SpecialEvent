import React from "react";

const HomePage = () => {
  return (
    <div className="image-container">
      <span className="badge bg-danger fs-2 d-inline-block px-3 mt-4 overlay-text ms-auto">
        Welcome to Formel 1
      </span>
      <img
        src="/images/formel-gof.gif"
        alt="Formel 1 racing bil"
        className="img-fluid"
      />
    </div>
  );
};

export default HomePage;
