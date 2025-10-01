import axios from "axios";

const DriverService = (() => {
  const DriverController = "http://localhost:5266/api/Drivers";
  const ImageUploadController = "http://localhost:5266/api/ImageUpload";

  // Henter alle drivere fra API-en
  const getall = async () => {
    try {
      const result = await axios.get(DriverController);
      return result.data;
    } catch (error) {
      console.error("En feil oppstod ved henting av sjåfører", error);
      throw error;
    }
  };
  // Legger til en ny driver sammen med bildeopplasting
  const postDrivers = async (newDrivers, imageFile) => {
    const result = await axios.post(DriverController, newDrivers);

    const formData = new FormData();
    formData.append("formfile", imageFile);

    // Utfører bildeopplasting
    const uploadResult = await axios({
      url: ImageUploadController,
      method: "POST",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    formData.delete("file");
  };
  // Henter en driver med spesifikk ID
  const getById = async (id) => {
    try {
      const result = await axios.get(`${DriverController}/${id}`);
      return result.data;
    } catch (error) {
      console.error(
        `En feil oppstod ved henting av sjåfør med ID ${id}`,
        error
      );
      throw error;
    }
  };
  // Henter en driver med spesifikt navn
  const getByName = async (name) => {
    try {
      const result = await axios.get(`${DriverController}/title/${name}`);
      return result.data;
    } catch (error) {
      console.error(
        `En feil oppstod ved henting av sjåfør med navn ${name}`,
        error
      );
      throw error;
    }
  };
  // Sletter en driver med spesifikk ID
  const deleteDriver = async (id) => {
    try {
      const response = await axios.delete(`${DriverController}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Feil ved sletting av sjåfør med ID ${id}`, error);
      throw error;
    }
  };
  // Oppdaterer en sjåfør
  const putDrivers = async (driverToUpdate) => {
    try {
      const result = await axios.put(`${DriverController}`, driverToUpdate);
      return result; // Returnerer Axios responsobjektet
    } catch (error) {
      console.error(`Feil ved oppdatering av sjåfør`, error);
      throw error;
    }
  };

  return {
    getall,
    postDrivers,
    getById,
    getByName,
    deleteDriver,
    putDrivers,
  };
})();

export default DriverService;
