import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './components/Modal';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [showCountries, setShowCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const countriesPerPage = 25;
  const paginationRange = 5; // Number of pagination buttons to show

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/all`);

        const data = response.data;
        const indexOfLastCountry = currentPage * countriesPerPage;
        const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;

        const searchResults = searchQuery
          ? data.filter(country => country.name.official.toLowerCase().includes(searchQuery.toLowerCase().trim()))
          : data;

        const slicedData = searchResults.slice(indexOfFirstCountry, indexOfLastCountry);

        setCountries(data);
        setShowCountries(slicedData);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    return () => {
      fetchData();
    }
  }, [currentPage, searchQuery]);

  const handlePageChange = (newPage) => {

    setCurrentPage(newPage);
  };

  const handleSort = () => {
    const sortedCountries = [...showCountries];

    if (sortOrder === 'asc') {
      sortedCountries.sort((a, b) => a.name.official.localeCompare(b.name.official));
      setSortOrder('desc');
    } else {
      sortedCountries.sort((a, b) => b.name.official.localeCompare(a.name.official));
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

  const totalPages = Math.ceil(countries.length / countriesPerPage);

  const handleSearch = event => {
    setSearchQuery(event.target.value);
  };

  const renderPagination = () => {
    const pageNumbers = [];
    const currentPageIndex = currentPage - 1;

    // Calculate the start and end page numbers for pagination range
    let startPage = Math.max(0, currentPageIndex - Math.floor(paginationRange / 2));
    let endPage = Math.min(totalPages - 1, startPage + paginationRange - 1);

    // Adjust start and end page numbers if they exceed the pagination limits
    if (endPage - startPage < paginationRange - 1) {
      startPage = Math.max(0, endPage - paginationRange + 1);
    }

    // Generate the page numbers to render
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i + 1);
    }

    return (
      <div>
        {currentPage > 1 && (
          <button onClick={() => handlePageChange(currentPage - 1)}>
            Previous
          </button>
        )}

        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            style={{ fontWeight: currentPage === pageNumber ? 'bold' : 'normal' }}
          >
            {pageNumber}
          </button>
        ))}

        {currentPage < totalPages && (
          <button onClick={() => handlePageChange(currentPage + 1)}>
            Next
          </button>
        )}
      </div>
    );
  };

  return (
    <div>
      <h1>Country List</h1>
      <input type="text" value={searchQuery} onChange={handleSearch} placeholder="Search countries" />
      <table border='1'>
        <thead>
          <tr>
            <th>Flags</th>
            <th onClick={handleSort}>
              Name{' '}
              {sortOrder === 'asc' ? <span>&uarr;</span> : <span>&darr;</span>}
            </th>
            <th>Country Code</th>
            <th>Country Code</th>
            <th>Native Name</th>
            <th>Alternative Name</th>
            <th>Calling Codes</th>
          </tr>
        </thead>
        <tbody>
          {showCountries.map((country) => (
            <tr key={country.name.official}>
              <td>
                <img src={country.flags.png} width={48} alt="" />
              </td>
              <td onClick={() => handleCountryClick(country)}>{country.name.official}</td>
              <td>{country.cca2}</td>
              <td>{country.cca3}</td>
              <td>{country.name.nativeName && Object.keys(country.name.nativeName).map(language => country.name.nativeName[language].official).join(', ')}</td>
              <td>{country.altSpellings.map(altSpelling => altSpelling).join(', ')}</td>
              <td>
                {country.idd && country.idd.root && country.idd.suffixes && country.idd.suffixes.map(suffix => country.idd.root + suffix).join(', ')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedCountry && (
        <Modal country={selectedCountry} onClose={handleCloseModal} />
      )}

      {renderPagination()}
    </div>
  );
};

export default App;