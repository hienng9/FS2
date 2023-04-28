import React, { useState, useEffect } from 'react';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Name from  './components/Persons';
import Notification from './components/Notification';
import personService from './services/person';


const App = () => {
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [alertMessage, setAlertMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const hook = () => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }
  useEffect(hook, [])

  const updatePerson = ({newName, newNumber}) => {
    const thePerson = persons.find(p => p.name === newName)
    const id = thePerson.id
    const changedPerson = {...thePerson, number: newNumber}
    personService
    .update({id, changedPerson})
    .then(returnedPerson => setPersons(persons.map(p => p.id === id ? returnedPerson : p)))
    .catch(error =>{
      setErrorMessage(`Information of ${newName} has already been removed from server`)

      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setPersons(persons.filter(p => p.id !== id))
    })
  }
  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    
    const isIn = persons.map(person => person.name).includes(newName)
    const phoneExists = persons.map(person => person.number).includes(newNumber)
    isIn 
    ? phoneExists 
      ? alert(`${newName} ${newNumber} is already added to phonebook`)
      : window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
        ? updatePerson({newName, newNumber})
        : setPersons(persons)
    : personService
        .create(nameObject)
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
        .then(() => {
          setAlertMessage(`Added ${newName}`)
          setTimeout(() => {
            setAlertMessage(null)}, 5000)
      })
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) =>{
    const person = persons.find(p => p.id === id)
    const confirmed = (window.confirm(`Delete ${person.name} ?`))
    confirmed
      ? personService.deleteID(id).then(() => 
        setPersons(persons.filter(p => p.id !== id)))
      : setPersons(persons)
    }
    
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChage = (event) => {
    setNewNumber(event.target.value)
  }
  const handleNewSearch = (event) => {
    setNewSearch(event.target.value)
  }
  
  const personsToShow = (newSearch==="")
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(newSearch))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={alertMessage} nameClass="success" />
      <Notification message={errorMessage} nameClass="error" />
      <Filter search={newSearch} handleSearch={handleNewSearch} />
      <h2>Add new contact</h2>
      <PersonForm 
        newName={newName} 
        newNumber={newNumber} 
        handleName={handleNameChange} 
        handleNumber={handleNumberChage}
        addName={addName}
      />
      <h2>Numbers</h2>
      {personsToShow.map(
        person => 
        <Name key={person.id} person={person} deleteClick={()=>deletePerson(person.id)}/>
        )}
    </div>
  )
}

export default App;
