import React, { useContext, useState } from "react";
import { DriversContext } from "../../context/DriversContext";
import DriverItem from "./DriversItem";

const EditDrivers = () => {
  // Hent nødvendige funksjoner  fra DriversContext
  const { getDriverById, editDriver } = useContext(DriversContext);

  // Opprett tilstander for driverId og driver-objektet
  const [driverId, setDriverId] = useState("");
  const [driver, setDriver] = useState({
    name: "",
    age: "",
    nationality: "",
    image: "",
  });
  const [successMessage, setSuccessMessage] = useState(""); // Tilstand for suksessmelding

  // Hendelseshåndterer for endringer i input-feltene
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "driverId") {
      setDriverId(value);
    } else {
      setDriver((prevDriver) => ({
        ...prevDriver,
        [name]: value,
      }));
    }
  };

  // handler for å søke etter en driver basert på ID
  const handleSearch = async () => {
    try {
      const fetchedDriver = await getDriverById(driverId);
      if (fetchedDriver) {
        setDriver(fetchedDriver);
        setSuccessMessage(""); // Fjern suksessmeldingen
      } else {
        console.error(`Ingen sjåfør funnet med ID: ${driverId}`);
        // Sett eventuell feilmelding i UI her
      }
    } catch (error) {
      console.error("Feil ved henting av sjåfør:", error);
      setErrorMessage("Error while fetching driver.");
    }
  };

  // Handeler for å lagre endringer i driver
  const handleSubmit = async () => {
    try {
      await editDriver({ ...driver, id: driverId });
      setSuccessMessage("Driver updated successfully.");
      console.log("Driver oppdatert");
    } catch (error) {
      console.error("Feil ved oppdatering av sjåfør:", error);
    }
  };

  return (
    <div className="centered-container d-flex align-items-center justify-content-center">
      <div>
        <h3>Edit Driver</h3>

        {/* Input-felt for å skrive inn drivers id */}
        <input
          onChange={handleChange}
          name="driverId"
          value={driverId}
          placeholder="Skriv inn sjåfør ID"
          type="text"
        />

        {/* Knapp for å søke etter drivers basert på id */}
        <button className="btn btn-danger" onClick={handleSearch}>
          Get Driver by ID
        </button>

        {/* Input-felt og knapper for redigering av drivers  */}
        <div>
          <input
            onChange={handleChange}
            name="name"
            value={driver.name}
            placeholder="Name"
            type="text"
          />
          <input
            onChange={handleChange}
            name="age"
            value={driver.age}
            placeholder="Age"
            type="text"
          />
          <input
            onChange={handleChange}
            name="nationality"
            value={driver.nationality}
            placeholder="Nationality"
            type="text"
          />

          {/* Knapp for å lagre endringer i driveren */}
          <button className="btn btn-danger" onClick={handleSubmit}>
            Save changes
          </button>
        </div>

        {/* tilbake medling på at du har endret */}
        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}

        {driver && driver.id && (
          <div style={{ maxWidth: "800px", margin: "auto", marginTop: "20px" }}>
            <DriverItem
              id={driver.id}
              name={driver.name}
              age={driver.age}
              nationality={driver.nationality}
              image={driver.image}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EditDrivers;
