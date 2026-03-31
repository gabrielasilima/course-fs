import { useState, useEffect } from 'react'
import axios from 'axios'

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  // Busca inicial dos dados
  useEffect(() => {
    axios.get(baseUrl).then(response => {
      setResources(response.data)
    })
  }, [baseUrl])

  const create = async (newObject) => {
    const response = await axios.post(baseUrl, newObject)
    setResources(resources.concat(response.data))
    return response.data
  }

  const service = {
    create
  }

  return [resources, service]
}