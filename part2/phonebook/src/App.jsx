import { useState, useEffect } from 'react'
import personService from './services/persons' // Importa o serviço
// (Mantenha seus componentes Filter e PersonForm)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  // 2.11: Carregar dados iniciais
  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())

    // 2.15: Lógica de Atualização (PUT)
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
      }
      return
    }

    // 2.12: Criar novo contato (POST)
    const personObject = { name: newName, number: newNumber }

    personService.create(personObject).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
  }

  // 2.14: Função para deletar (DELETE)
  const deletePersonOf = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
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
      {/* 2.14: Passando a função de deletar para a lista */}
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