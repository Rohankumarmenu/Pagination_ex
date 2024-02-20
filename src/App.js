import React, { useState, useEffect } from 'react';
import jsonData from './data.json'; 
import './style.css'

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5); 
  const [selectValue, setSelectValue] = useState(5); 

  useEffect(() => {
    setData(jsonData);
  }, []);

  useEffect(() => {
    
    setCurrentPage(1);
    setItemsPerPage(selectValue);
  }, [selectValue]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSelectChange = (event) => {
    setSelectValue(parseInt(event.target.value));
  };

  return (
    <div className="container">
      <div>
          <select id="perPage" value={selectValue} onChange={handleSelectChange} className='dropdown-content'>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </div>
      <div className=''>
        <div className='box' >
          {Array.from({ length: totalPages }).map((_, index) => (
            <button key={index} onClick={() => handleClick(index + 1)} style={{ backgroundColor: '#22d560' }} className={currentPage === index + 1 ? 'active' : ''}>
              {index + 1}
            </button>
          ))}
        </div>
      
      </div>
     
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th className="country-cell">Country</th>
              <th >Capital</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td className="country-cell">{item.country}</td>
                <td >{item.capital}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </div>
  );
};

const App = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh', 
    }}>
      <h1 style={{ marginBottom: '20px' }}>React Pagination</h1>
      <div style={{ maxWidth: '800px' }}>
        <Pagination />
      </div>
    </div>
    
  );
};

export default App;
