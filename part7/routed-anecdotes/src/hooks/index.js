import { useState, useEffect } from 'react'
import axios from 'axios'

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (!name) return

    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then(response => {
        setCountry({ data: response.data, found: true })
      })
      .catch(() => {
        setCountry({ found: false })
      })
  }, [name]) // O efeito roda sempre que o 'name' mudar

  return country
}