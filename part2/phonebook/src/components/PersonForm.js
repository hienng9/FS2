import React, { useState } from 'react';

const PersonForm = ({ createPerson }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  
  const addPerson = (event) => {
    event.preventDefault()
    createPerson({
      name: newName,
      number: newNumber
    })
    setNewName('')
    setNewNumber('')
  }
  return (
    <div>
      <h2>Create new person</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={({ target }) => {
            // console.log("change name", target.value)
            setNewName(target.value)}} />
        </div>
        <div>
          number: <input value={newNumber} onChange={({ target }) => setNewNumber(target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
      
  )
}

export default PersonForm;