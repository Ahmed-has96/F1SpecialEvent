import React, { useState, useContext } from "react";
import { DriversContext } from "../../context/DriversContext";

const DeleteDriver = () => {
  // State for å lagre driverens ID og slettemelding
  const [driverId, setDriverId] = useState("");
  const [deleteMessage, setDeleteMessage] = useState(""); // For å holde meldingen som skal vises
  const { deleteDriver } = useContext(DriversContext);

  // Håndterer sletteoperasjonen
  const handleDelete = async () => {
    try {
      if (driverId) {
        await deleteDriver(driverId); // Vent på slettingen
        setDeleteMessage(`Du har slettet driver med ID ${driverId}`);
        setDriverId(""); // Tømmer inputfeltet etter en vellykket handling
      } else {
        setDeleteMessage("");
      }
    } catch (error) {
      console.error("Feil ved sletting:", error);
      setDeleteMessage(`Feil ved sletting: ${error.message}`);
    }
  };

  return (
    <div className="container mt-4">
      <input
        type="text"
        value={driverId}
        onChange={(e) => setDriverId(e.target.value)}
        placeholder="Skriv inn ID-en til driveren du ønsker å slette"
        className="form-control mb-2"
      />
      <button onClick={handleDelete} className="btn btn-danger">
        Slett Driver
      </button>
      {deleteMessage && <p className="text-danger mt-2">{deleteMessage}</p>}
    </div>
  );
};

export default DeleteDriver;
