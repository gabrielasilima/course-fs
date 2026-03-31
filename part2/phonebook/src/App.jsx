import { useState, useEffect } from 'react'
import personService from './services/person.js'

// Componentes auxiliares (caso você os tenha em arquivos separados, importe-os)
const Filter = ({ value, onChange }) => (
  <div>
    filter shown with <input value={value} onChange={onChange} />
  </div>
)

const PersonForm = ({ onSubmit, nameValue, nameChange, numberValue, numberChange }) => (
  <form onSubmit={onSubmit}>
    <div>name: <input value={nameValue} onChange={nameChange} /></div>
    <div>number: <input value={numberValue} onChange={numberChange} /></div>
    <div><button type="submit">add</button></div>
  </form>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())

    if (existingPerson) {
      if (window.confirm(`${newName} já está na lista, substituir o número antigo pelo novo?`)) {
        const changedPerson = { ...existingPerson, number: newNumber }
        
        personService
          .update(existingPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== existingPerson.id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            // 3.19: Captura erro de validação no PUT (Update)
            alert(error.response.data.error)
          })
      }
      return
    }

    const personObject = { name: newName, number: newNumber }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        // 3.19 & 3.20: Captura erro de validação no POST (Create)
        // O backend envia a mensagem em error.response.data.error
        alert(error.response.data.error)
        console.log(error.response.data.error)
      })
  }

  const deletePersonOf = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(error => {
          alert(`The person '${name}' was already removed from server`)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const personsToDisplay = filter === ''
    ? persons
    : persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={(e) => setFilter(e.target.value)} />
      
      <h3>Add a new</h3>
      <PersonForm 
        onSubmit={addPerson}
        nameValue={newName} nameChange={(e) => setNewName(e.target.value)}
        numberValue={newNumber} numberChange={(e) => setNewNumber(e.target.value)}
      />
      
      <h3>Numbers</h3>
      {personsToDisplay.map(person => 
        <p key={person.id}>
          {person.name} {person.number} 
          <button onClick={() => deletePersonOf(person.id, person.name)}>delete</button>
        </p>
      )}
    </div>
  )
}

export default App