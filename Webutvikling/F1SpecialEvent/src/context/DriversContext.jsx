import { createContext, useState, useEffect } from "react";
import DriverService from "../Service/DriverService";

export const DriversContext = createContext();

export const DriverProvider = ({ children }) => {
  const [drivers, setDrivers] = useState([]);
  const [searchedDriver, setSearchedDriver] = useState(null);
  const [error, setError] = useState("");

  // Bruk useEffect for å hente drivere med et kort tidsavbrudd
  useEffect(() => {
    setTimeout(() => {
      getDriversFromService();
    }, 1000); // setTimeout bare inkludert for å skape et lite tidsavbrudd før info fra databasen vises;
  });

  // Funksjon for å hente sjåfører fra servicen
  const getDriversFromService = async () => {
    try {
      const driversFromService = await DriverService.getall();
      setDrivers(driversFromService);
    } catch (error) {
      console.error("En feil oppstod ved henting av drivers", error);
    }
  };
  // Funksjon for å hente en Driver basert på ID
  const getDriverById = async (id) => {
    try {
      const driver = await DriverService.getById(id);
      setSearchedDriver(driver); // Oppdaterer 'searchedDriver' tilstanden
      return driver; // Returnerer sjåføren for direkte bruk
    } catch (error) {
      console.error(`Feil ved henting av driver med ID ${id}`, error);
      setError(`Feil ved henting av driver med ID ${id}`);
      setSearchedDriver(null);
      return null;
    }
  };
  // Funksjon for å hente driver basert på navn
  const getDriversByName = async (name) => {
    try {
      const driver = await DriverService.getByName(name);
      setSearchedDriver(driver);
      setError(""); // Nullstill feilmelding ved vellykket søk
    } catch (error) {
      setError(`Feil ved henting av drivere med navn ${name}`);
      setSearchedDriver(null);
    }
  };
  // Funksjon for å legge til en ny Driver med bilde
  const addDriver = async (newDriver, imageFile) => {
    try {
      await DriverService.postDrivers(newDriver, imageFile);
      await getDriversFromService(); // Oppdaterer listen med drivere
    } catch (error) {
      console.error("En feil oppstod ved oppretting av ny driver", error);
    }
  };
  // Funksjon for å slette en sjåfør basert på ID
  const deleteDriver = async (id) => {
    try {
      await DriverService.deleteDriver(id);
      // Oppdater staten eller gjør noe annet etter suksessfull sletting
    } catch (error) {
      setError(`Feil ved sletting av sjåfør med ID ${id}`);
    }
  };
  // Funksjon for å redigere en sjåfør
  const editDriver = async (driver) => {
    try {
      await DriverService.putDrivers(driver);
      await getDriversFromService(); // Henter sjåførliste på nytt for å oppdatere UI
    } catch (error) {
      console.error("Feil ved oppdatering av sjåfør:", error);
      // Håndter feilen her - for eksempel, du kan oppdatere UI til å vise en feilmelding
    }
  };
  // Leverer kontekstverdier til underkommponent childeren
  return (
    <DriversContext.Provider
      value={{
        drivers,
        getDriversFromService,
        addDriver,
        getDriverById,
        getDriversByName,
        deleteDriver,
        editDriver,
        searchedDriver,
      }}
    >
      {children}
    </DriversContext.Provider>
  );
};
