// DriversList.jsx
import React, { useContext } from "react";
import { DriversContext } from "../../context/DriversContext";
import DriverItem from "./DriversItem";
import "../../App.css";

const DriversList = () => {
  // Henter driver fra DriversContext ved hjelp av useContext-hooken
  const { drivers } = useContext(DriversContext);
  // Funksjonen getDriversJSX mapper gjennom Drivers og genererer DriverItem-komponenter for hver sjåfør.
  const getDriversJSX = () => {
    return drivers.map((driver) => (
      <DriverItem
        key={driver.id}
        id={driver.id}
        name={driver.name}
        age={driver.age}
        nationality={driver.nationality}
        image={driver.image}
      />
    ));
  };

  return (
    <div className="container mt-4">
      <h3>Drivers</h3>
      <p> Number of drivers: {drivers.length}</p>
      <div className="row">{getDriversJSX()}</div>
    </div>
  );
};

export default DriversList;
