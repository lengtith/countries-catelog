const Modal = ({ country, onClose }) => (
    <div className="modal">
        <div className="modal-content">
            <span className="close" onClick={onClose}>&times;</span>
            <h2>{country.name.common}</h2>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <p>Region: {country.region}</p>
            {/* Add additional information here */}
        </div>
    </div>
);

export default Modal;