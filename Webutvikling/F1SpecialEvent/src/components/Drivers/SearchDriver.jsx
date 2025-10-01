import React, { useState, useContext } from "react";
import { DriversContext } from "../../context/DriversContext";
import DriverItem from "./DriversItem";
// Tilstanden for søking etter ID og navn
const SearchDriver = () => {
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const { getDriverById, getDriversByName, searchedDriver, error } =
    useContext(DriversContext);

  // Funksjon for å søke etter driver med ID
  const handleSearchById = async () => {
    setHasSearched(true);
    setSearchName(""); // Tømmer søkefeltet for navn
    try {
      await getDriverById(searchId.trim());
    } catch (err) {
      console.error(
        `Feil ved henting av driver med ID ${searchId.trim()}:`,
        err
      );
    }
  };

  // Funksjon for å søke etter driver med navn
  const handleSearchByName = async () => {
    setHasSearched(true);
    setSearchId(""); // Tømmer søkefeltet for id
    try {
      await getDriversByName(searchName.trim());
    } catch (err) {
      console.error(
        `Feil ved henting av driver med navn ${searchName.trim()}:`,
        err
      );
    }
  };

  return (
    <div className="container h-100 d-flex flex-column justify-content-center mt-5">
      <div className="row justify-content-center mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control mb-2"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Skriv inn ID"
          />
        </div>
      </div>
      <div className="row justify-content-center mb-3">
        <div className="col-md-6">
          <button className="btn btn-danger w-100" onClick={handleSearchById}>
            Søk etter ID
          </button>
        </div>
      </div>
      <div className="row justify-content-center mt-1 mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control mb-2"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Skriv inn Navn"
          />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <button className="btn btn-danger w-100" onClick={handleSearchByName}>
            Søk etter navn
          </button>
        </div>
      </div>
      {/* Vis feilmelding hvis det oppstår en feil */}
      {error && <p className="text-center mx-auto">{error}</p>}
      {/* Vis søkeresultatet hvis det er funnet en driver */}
      {searchedDriver ? (
        <div className="row justify-content-center mt-2">
          <DriverItem {...searchedDriver} />
        </div>
      ) : (
        // Vis melding hvis ingen driver ble funnet etter søk
        hasSearched &&
        !error && (
          <p className="row justify-content-center">Ingen driver funnet.</p>
        )
      )}
    </div>
  );
};

export default SearchDriver;
