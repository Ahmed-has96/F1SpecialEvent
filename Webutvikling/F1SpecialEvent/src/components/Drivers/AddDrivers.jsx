import DriverService from "../../Service/DriverService";
import { useEffect, useState } from "react";

// Her definerer jeg komponenten som en funksjonell komponent
const AddDrivers = () => {
  // Opprett state-variabler for å lagre driverinformasjon
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [nationality, setNationality] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    switch (e.currentTarget.name) {
      case "name":
        setName(e.currentTarget.value);
        break;
      case "age":
        setAge(e.currentTarget.value);
        break;
      case "nationality":
        setNationality(e.currentTarget.value);
        break;
      case "image":
        setImage(e.currentTarget.files[0]);
        break;
      default:
        break;
    }
  };
  // Handler for å lagre en ny sjåfør
  const saveDrivers = () => {
    const newDrivers = {
      name: name,
      age: age,
      nationality: nationality,
      image: image.name,
    };

    // Kall på tjenesten for å legge til driveren
    DriverService.postDrivers(newDrivers, image)
      .then(() => {
        // Oppdater meldingen når driveren er lagt til
        setMessage("Driver has been added successfully.");
      })
      .catch((error) => {
        // Håndter feil her
        setMessage("Error adding driver: " + error.message);
      });
  };

  return (
    <section className="add-driver-section">
      <h3 className="add-driver-title">Add new driver</h3>
      <div>
        <label>Name</label>
        <input
          className="add-driver-input"
          name="name"
          value={name}
          onChange={handleChange}
          type="text"
        />
      </div>
      <div>
        <label>Age</label>
        <input
          className="add-driver-input"
          name="age"
          value={age}
          onChange={handleChange}
          type="number"
        />
      </div>
      <div>
        <label>Nationality</label>
        <input
          className="add-driver-input"
          name="nationality"
          value={nationality}
          onChange={handleChange}
          type="text"
        />
      </div>
      <div>
        <label>Image</label>
        <input
          className="add-driver-input"
          name="image"
          onChange={handleChange}
          type="file"
        />
      </div>
      <button className="btn btn-danger w-100 mb-1" onClick={saveDrivers}>
        Save Driver
      </button>
      {message && <p className="alert alert-success">{message}</p>}
    </section>
  );
};

export default AddDrivers;
