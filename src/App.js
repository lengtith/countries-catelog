import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './components/Modal';

const App = () => {
  const [sortDirection, setSortDirection] = useState('asc');
  const [allCountries, setAllCountries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const itemsPerPage = 25;
  // const paginationRange = 5;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      const data = response.data;
      setCountries(data);
      setAllCountries(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      // You can handle the error here, such as displaying an error message
    }
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };

  const handleCloseModal = () => {
    setSelectedCountry(null);
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const searchResults = query
      ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(query.toLowerCase().trim())
      )
      : allCountries;

    setCountries(searchResults);
  };

  const sortData = (key) => {
    const sortedCountries = [...countries];

    if (sortDirection === 'asc') {
      sortedCountries.sort((a, b) => a.name.common.localeCompare(b.name.common));
      setSortDirection('desc');
    } else {
      sortedCountries.sort((a, b) => b.name.common.localeCompare(a.name.common));
      setSortDirection('asc');
    }

    setCountries(sortedCountries);
  };

  const renderTableData = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = countries.slice(indexOfFirstItem, indexOfLastItem);

    return currentItems.map((country) => (
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
    ));
  };

  const renderTableHeader = () => {
    return (
      <tr>
        <th>Flags</th>
        <th onClick={() => sortData()}>
          Name
          {sortDirection === 'asc' ? <span> &uarr;</span> : <span> &darr;</span>}
        </th>
        <th>Country Code</th>
        <th>Country Code</th>
        <th>Native Name</th>
        <th>Alternative Name</th>
        <th>Calling Codes</th>
      </tr>
    );
  };



  const renderPagination = () => {

    const pageNumbers = Math.ceil(countries.length / itemsPerPage);

    const handlePreviousPage = () => {
      setCurrentPage((prevPage) => prevPage - 1);
    };

    const handleNextPage = () => {
      setCurrentPage((prevPage) => prevPage + 1);
    };

    return (
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={currentPage === pageNumbers}>
          Next
        </button>
      </div>
    );

    // const handlePagination = (pageNumber) => {
    //   setCurrentPage(pageNumber);
    // };

    // const pageNumbers = [];
    // const currentPageIndex = currentPage - 1;
    // const totalPages = Math.ceil(countries.length / itemsPerPage);

    // // Calculate the start and end page numbers for pagination range
    // let startPage = Math.max(0, currentPageIndex - Math.floor(paginationRange / 2));
    // let endPage = Math.min(totalPages - 1, startPage + paginationRange - 1);

    // // Adjust start and end page numbers if they exceed the pagination limits
    // if (endPage - startPage < paginationRange - 1) {
    //   startPage = Math.max(0, endPage - paginationRange + 1);
    // }

    // // Generate the page numbers to render
    // for (let i = startPage; i <= endPage; i++) {
    //   pageNumbers.push(i + 1);
    // }

    // return (
    //   <div>
    //     {currentPage > 1 && (
    //       <button onClick={() => handlePagination(currentPage - 1)}>Previous</button>
    //     )}

    //     {pageNumbers.map((pageNumber) => (
    //       <button
    //         key={pageNumber}
    //         onClick={() => handlePagination(pageNumber)}
    //         style={{ fontWeight: currentPage === pageNumber ? 'bold' : 'normal' }}
    //       >
    //         {pageNumber}
    //       </button>
    //     ))}

    //     {currentPage < totalPages && (
    //       <button onClick={() => handlePagination(currentPage + 1)}>Next</button>
    //     )}
    //   </div>
    // );
  };

  return (
    <div>
      <input type="text" value={searchQuery} onChange={handleSearch} placeholder="Search countries" />
      <table>
        <thead>{renderTableHeader()}</thead>
        <tbody>{renderTableData()}</tbody>
      </table>

      {renderPagination()}

      {selectedCountry && (
        <Modal country={selectedCountry} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;