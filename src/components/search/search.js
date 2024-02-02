import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((err) => console.error(err));
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "15px",
      boxShadow: state.isFocused ? "0 0 0 2px #3699FF" : null,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#41279d" : null,
      color: state.isFocused ? "#c1a7f9" : null,
      boxShadow: "0 0 2px #c1a7f9",
    }),
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTime={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
      styles={customStyles}
    />
  );
};

export default Search;
