import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './components/Modal';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [showCountries, setShowCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedCountry, setSelectedCountry] = useState(null);

  const countriesPerPage = 25;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/all`);

        const data = response.data;
        const indexOfLastCountry = currentPage * countriesPerPage;
        const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
        const slicedData = data.slice(indexOfFirstCountry, indexOfLastCountry);

        setCountries(data);
        setShowCountries(slicedData);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSort = () => {
    const sortedCountries = [...countries];

    if (sortOrder === 'asc') {
      sortedCountries.sort((a, b) => a.name.common.localeCompare(b.name.common));
      setSortOrder('desc');
    } else {
      sortedCountries.sort((a, b) => b.name.common.localeCompare(a.name.common));
      setSortOrder('asc');
    }

    setShowCountries(sortedCountries);
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };

  const handleCloseModal = () => {
    setSelectedCountry(null);
  };

  const totalPages = Math.floor(countries.length / countriesPerPage);

  return (
    <div>
      <h1>Country List</h1>
      <table>
        <thead>
          <tr>
            <th onClick={handleSort}>
              Name{' '}
              {sortOrder === 'asc' ? <span>&uarr;</span> : <span>&darr;</span>}
            </th>
            <th>Capital</th>
            <th>Population</th>
            <th>Region</th>
          </tr>
        </thead>
        <tbody>
          {showCountries.map((country) => (
            <tr key={country.name.common}>
              <td onClick={() => handleCountryClick(country)}>{country.name.common}</td>
              <td>{country.capital}</td>
              <td>{country.population}</td>
              <td>{country.region}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedCountry && (
        <Modal country={selectedCountry} onClose={handleCloseModal} />
      )}

      <div>
        {currentPage > 1 && (
          <button onClick={() => handlePageChange(currentPage - 1)}>
            Previous
          </button>
        )}

        {currentPage < totalPages && (
          <button onClick={() => handlePageChange(currentPage + 1)}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default App;