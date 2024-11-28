import React, { useEffect, useState } from 'react';
import "./Navbar.css";

export default function Navbar({ onSearch }) {
  const [city, setCity] = useState('');
  // city არის ცვლადი, რომელიც ინახავს input ველში შეყვანილ ტექსტს.
  
  const handleSearch = (event) => {
    event.preventDefault();
    // ამის მეშვეობით აღარ მოხდება გვერდის ხელახალი ჩატვირთვა
    if (city.trim() !== "") {
      onSearch(city); // გადაცემს ქალაქის სახელს მთავარ კომპონენტში,
      // ანუ გადასცემს მშობელში, იმ მონაცემებს რა მონაცემებიც
      // შეიყვანა მომხმარებელმა ინფათში
      setCity(''); // სერჩ ველის გასუფთავება შემდეგი დასერჩვისთვის
    }else{
      alert("Please Enter Some City Name")
    }
  };


  return (
    <div className='Navbar'>
      <div className='WeatherTitle'><h1>WeatherWise</h1>
      </div>
    <nav className='InputSearch'>
      <form onSubmit={handleSearch} >
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <button type="submit" className='SearchButton'>
          Search
        </button>
      </form>
    </nav>
    </div>
  );
}

