import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../Shared/Navbar";

// Importe ruter
import AddDrivers from "../Drivers/AddDrivers";
import DriversList from "../Drivers/DriverList";
import SearchDriver from "../Drivers/SearchDriver";
import EditDrivers from "../Drivers/EditDrivers";
import HomePage from "../Drivers/HomePage";
import QuizGame from "../Drivers/QuizGame";
import DeleteDriver from "../Drivers/DeleteDriver";

const AppRouter = () => {
  return (
    <Router>
      <Navbar />

      {/* Definer ruoter */}
      <Routes>
        <Route path="/add-driver" element={<AddDrivers />} />
        <Route path="/drivers-list" element={<DriversList />} />
        <Route path="/search-drivers" element={<SearchDriver />} />
        <Route path="/edit-drivers" element={<EditDrivers />} />
        <Route path="/quiz-game" element={<QuizGame />} />
        <Route path="/delete-driver" element={<DeleteDriver />} />

        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
