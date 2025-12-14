import { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { FiSearch, FiX } from 'react-icons/fi';

function SearchBar({ placeholder = 'Search...', onSearch, className = '' }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <InputGroup className={`search-bar ${className}`}>
      <InputGroup.Text>
        <FiSearch />
      </InputGroup.Text>
      <Form.Control
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
      />
      {searchTerm && (
        <InputGroup.Text onClick={handleClear} style={{ cursor: 'pointer' }}>
          <FiX />
        </InputGroup.Text>
      )}
    </InputGroup>
  );
}

export default SearchBar;
