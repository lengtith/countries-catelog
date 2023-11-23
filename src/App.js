import React, { useState, useEffect } from 'react';
import Modal from './components/Modal';

const App = () => {
  const [sortDirection, setSortDirection] = useState('asc');
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const itemsPerPage = 25;

  // Run function to get data when page render
  useEffect(() => {
    fetchData();
  }, []);

  // Get countries from api url
  const fetchData = async () => {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/all`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setCountries(data);
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Get specific country data for modal popup
  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };

  // Close modal popup
  const handleCloseModal = () => {
    setSelectedCountry(null);
  };

  //Get data from input search
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter countries when have search query
  const filteredCountries = countries.filter(country =>
    country.name.official.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lastCountry = currentPage * itemsPerPage; // Find index of last country in current page
  const firstCountry = lastCountry - itemsPerPage; // Find index of first country in current page
  const currentCountries = filteredCountries.slice(firstCountry, lastCountry); // Get countries for current page
  const totalPage = Math.ceil(filteredCountries.length / itemsPerPage); //Get the total number of pages

  // Sort countries function by name
  const sortCountries = () => {
    const sortedCountries = [...filteredCountries];

    if (sortDirection === 'asc') {
      sortedCountries.sort((a, b) => a.name.official.localeCompare(b.name.official));
      setSortDirection('desc');
    } else {
      sortedCountries.sort((a, b) => b.name.official.localeCompare(a.name.official));
      setSortDirection('asc');
    }

    setCountries(sortedCountries);
  };

  // Back to previous page function
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // Goto the next page function
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className='container m-auto'>
      <div className='w-full my-5 bg-white border-2 border-gray-100 rounded-lg'>

        {/* Header */}
        <div className='flex justify-between items-center p-5 border-bottom-2 border-gray-100'>
          <h3>Countries Catalog</h3>
          <input className='w-1/5' type="text" name='search' value={searchQuery} onChange={handleSearch} placeholder="Search here ..." />
        </div>

        {/* Table */}
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Flags</th>
              <th className='whitespace-nowrap cursor-pointer' onClick={() => sortCountries()}>
                <span>Official Name</span>
                {sortDirection === 'asc' ? <span> &uarr;</span> : <span> &darr;</span>}
              </th>
              <th>CCA2</th>
              <th>CCA3</th>
              <th className='whitespace-nowrap'>Native Name</th>
              <th className='whitespace-nowrap'>Alternative Name</th>
              <th className='whitespace-nowrap'>Calling Codes</th>
            </tr>
          </thead>
          <tbody>
            {countries.length === 0
              ? <tr>
                <td colSpan={8} className='p-5'>Data loading...</td>
              </tr>
              : <>
                {currentCountries.length === 0
                  ? <tr>
                    <td colSpan={8} className='p-5'>Countries not found</td>
                  </tr>
                  : currentCountries.map((country, index) => (
                    <tr key={country.name.official}>
                      <td>{(currentPage - 1) * 25 + (index + 1)}</td>
                      <td>
                        <img className='rounded object-cover' src={country.flags.png} width={32} height={24} alt={country.name.common} title={country.name.common} />
                      </td>
                      <td onClick={() => handleCountryClick(country)}>
                        <span className='line-clamp-1 cursor-pointer'>{country.name.official}</span>
                      </td>
                      <td>
                        <span>{country.cca2}</span>
                      </td>
                      <td>
                        <span>{country.cca3}</span>
                      </td>
                      <td>
                        <span className='line-clamp-1'>
                          {country.name.nativeName && Object.keys(country.name.nativeName).map(language => country.name.nativeName[language].official).join(', ')}
                        </span>
                      </td>
                      <td>
                        <span className='line-clamp-1'>
                          {country.altSpellings.map(altSpelling => altSpelling).join(', ')}
                        </span>
                      </td>
                      <td>
                        <span className='line-clamp-1'>
                          {country.idd && country.idd.root && country.idd.suffixes && country.idd.suffixes.map(suffix => country.idd.root + suffix).join(', ')}
                        </span>
                      </td>
                    </tr>
                  ))
                }
              </>
            }
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center p-5">
          <div>
            <p>Showing {(currentPage * 25) - 25 + 1} to {(currentPage * 25) > filteredCountries.length ? filteredCountries.length : currentPage * 25} of {filteredCountries.length} results</p>
          </div>

          <div>
            <p>Per page 25</p>
          </div>

          <div className='flex gap-2'>
            <button className={`px-3 py-2 border-none rounded " ${currentPage === 1 ? "bg-mint-cream text-black" : "bg-electric-blue text-white cursor-pointer"} `} onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            <button className={`px-3 py-2 text-white border-none rounded " ${currentPage === totalPage ? "bg-mint-cream text-black" : "bg-electric-blue text-white cursor-pointer"}`} onClick={handleNextPage} disabled={currentPage === totalPage}>
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modal popup */}
      {selectedCountry && (
        <Modal country={selectedCountry} onClose={handleCloseModal} />
      )}

    </div>
  );
};

export default App;