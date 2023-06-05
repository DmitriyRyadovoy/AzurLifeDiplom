import React from 'react'
import { useSearch } from '../../context/search'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import searchImg from '../../assets/Icons/Form/FormInputSearch.svg' 

const SearchInput = () => {
  const [values, setValues] = useSearch()
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.get(
        `http://localhost:4040/api/catalog/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <form role='search' onSubmit={handleSubmit} className='catalogPage__search'>
      <label className='catalogPage__search-block'>
        <div className='catalogPage__search-input-box'>
          <img className="search-img img" src={searchImg} alt="searchImg" />
          <input
            type="text"
            placeholder='ЖК, адрес, метро, район'
            className='catalogPage__search-input'
            value={values.keyword}
            onChange={(e) => setValues({...values, keyword:e.target.value})}
          />
        </div>
        <button
          type="submit"
          className='catalogPage__search-btn'
          >Поиск
        </button>
      </label>
    </form>
  )
}

export default SearchInput