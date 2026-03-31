import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const api_key = import.meta.env.VITE_WEATHER_KEY // Forma do Vite acessar o .env

  useEffect(() => {
    const capital = country.capital[0]
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`)
      .then(response => {
        setWeather(response.data)
      })
  }, [country, api_key])

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>

      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />

      {weather && (
        <div>
          <h3>Weather in {country.capital[0]}</h3>
          <p>temperature {weather.main.temp} Celsius</p>
          <img 
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
            alt="weather icon" 
          />
          <p>wind {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  )
}

const App = () => {
  const [query, setQuery] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [results, setResults] = useState([])

  // Busca inicial de todos os países
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  // Filtra os países conforme a busca muda
  useEffect(() => {
    const filtered = allCountries.filter(c => 
      c.name.common.toLowerCase().includes(query.toLowerCase())
    )
    setResults(filtered)
  }, [query, allCountries])

  return (
    <div>
      find countries <input value={query} onChange={(e) => setQuery(e.target.value)} />

      <div style={{ marginTop: '10px' }}>
        {results.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : results.length > 1 && results.length <= 10 ? (
          results.map(c => (
            <div key={c.cca3}>
              {c.name.common} 
              <button onClick={() => setQuery(c.name.common)}>show</button>
            </div>
          ))
        ) : results.length === 1 ? (
          <CountryDetail country={results[0]} />
        ) : query !== '' ? (
          <p>No matches found</p>
        ) : null}
      </div>
    </div>
  )
}

export default App