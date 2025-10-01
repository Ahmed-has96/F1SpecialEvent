const DriverItem = ({ id, name, age, nationality, image }) => {
  // DriverItem som brukes til å vise informasjon om en Drivers.
  return (
    <div className="col-12 col-md-6 col-lg-4 mb-4">
      <div className="card h-100 bg-danger text-white">
        <div className="card-body">
          <h5 className="card-number">ID: {id}</h5>
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{age} years old</p>
          <p className="card-text">{nationality}</p>
        </div>
        {image && (
          <img
            src={`http://localhost:5266/Images/${image}`}
            alt={`Bilde av ${name}`}
            className="card-img-bottom driver-img"
          />
        )}
      </div>
    </div>
  );
};

export default DriverItem;
