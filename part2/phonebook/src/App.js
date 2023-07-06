import React, { useState, useEffect, useRef } from 'react';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Name from  './components/Persons';
import Notification from './components/Notification';
import personService from './services/person';
import loginService from './services/login'
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';



const App = () => {
  
  const [persons, setPersons] = useState([])
  const [newSearch, setNewSearch] = useState('')
  const [alertMessage, setAlertMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const personFormRef = useRef()
  
  const hook = () => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }
  useEffect(hook, [])

  useEffect(() => {
    const loggedUserJSOn = window.localStorage.getItem('loggedUser')
    if (loggedUserJSOn){
      const loggedUser = JSON.parse(loggedUserJSOn)
      setUser(loggedUser)
      personService.setToken(loggedUser.token)
    }
  }, [])

  const updatePerson = ({newName, newNumber}) => {
    const thePerson = persons.find(p => p.name === newName)
    const id = thePerson.id
    const changedPerson = {...thePerson, number: newNumber}
    personService
    .update({id, changedPerson})
    .then(returnedPerson => setPersons(persons.map(p => p.id === id ? returnedPerson : p)))
    .catch(error =>{
      setErrorMessage(error.response.data.error)

      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setPersons(persons.filter(p => p.id !== id))
    })
  }

  const addPerson = (personObject) => {
    personFormRef.current.toggleVisibility()
    const newName = personObject.name
    const newNumber =  personObject.number
    const isIn = persons.map(person => person.name).includes(newName)
    const phoneExists = persons.map(person => person.number).includes(newNumber)
    isIn 
    ? phoneExists 
      ? alert(`${newName} ${newNumber} is already added to phonebook`)
      : window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
        ? updatePerson({newName, newNumber})
        : setPersons(persons)
    : personService
        .create(personObject)
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
        .then(() => {
          setAlertMessage(`Added ${newName}`)
          setTimeout(() => {
            setAlertMessage(null)}, 5000)
      })
      .catch(error => {
        // console.log("error", error.response.data)
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const deletePerson = (id) =>{
    const person = persons.find(p => p.id === id)
    const confirmed = (window.confirm(`Delete ${person.name} ?`))
    confirmed
      ? personService.deleteID(id).then(() => 
        setPersons(persons.filter(p => p.id !== id)))
      : setPersons(persons)
    }
    
  const handleNewSearch = (event) => {
    setNewSearch(event.target.value)
  }
  
  const personsToShow = (newSearch==="")
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(newSearch))

  const loginUser = async (userObject) => {
    
    try {
      const username = userObject.username
      const password = userObject.password
      const loggedInUser = await loginService.login({username, password})
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedInUser))
      personService.setToken(loggedInUser.token)
      setUser(loggedInUser)
    }
    catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={alertMessage} nameClass="success" />
      <Notification message={errorMessage} nameClass="error" />
     
      {!user &&
        <Togglable buttonLabel="log in">
        <LoginForm
              loginFunc={loginUser}
            />
      </Togglable>}
      {user &&
            <div>
              Hello, {user.name} 
              <button onClick={handleLogOut}>logout</button>
              <React.Fragment>
              <Filter search={newSearch} handleSearch={handleNewSearch} />
              <h2>Add new contact</h2>
              <Togglable buttonLabel="new contact" ref={ personFormRef }>
                <PersonForm 
                  createPerson={addPerson}
                />
              </Togglable>
              <h2>Numbers</h2>
              {personsToShow.forEach(
                person => 
                <Name key={person.id} person={person} deleteClick={()=>deletePerson(person.id)}/>
                )}
            </React.Fragment>
          </div>
        
      }
      
      
    </div>
  )
}

export default App;
